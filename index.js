const waitOn = require('wait-on');
const { stitchSchemas } = require('@graphql-tools/stitch');
const { introspectSchema } = require('@graphql-tools/wrap');
const makeServer = require('./lib/make_server');
const makeRemoteExecutor = require('./lib/make_remote_executor');

async function makeGatewaySchema() {
  const issuesExec = makeRemoteExecutor('http://localhost:4001/graphql');
  const usersExec = makeRemoteExecutor('http://localhost:4002/graphql');

  return stitchSchemas({
    subschemas: [
      {
        schema: await introspectSchema(usersExec),
        executor: usersExec,
        batch: true,
        merge: {
          User: {
            selectionSet: '{ id }',
            fieldName: 'user',
            args: ({ id }) => ({ id }),
          },
        }
      },
      {
        schema: await introspectSchema(issuesExec),
        executor: issuesExec,
        batch: true,
      }
    ]
  });
}

waitOn({ resources: ['tcp:4001', 'tcp:4002'] }, async () => {
  makeServer(await makeGatewaySchema(), 'gateway', 4000);
});
