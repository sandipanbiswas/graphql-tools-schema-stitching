const { makeExecutableSchema } = require('@graphql-tools/schema');
const NotFoundError = require('../../lib/not_found_error');
const readFileSync = require('../../lib/read_file_sync');
const typeDefs = readFileSync(__dirname, 'schema.graphql');

const issues = [
  { id: '1', description: 'description1', assignee: {id: '1'}},
  { id: '2', description: 'description2', assignee: {id: '1'}},
];

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      issue: (root, { id }) => issues.find( issue => issue.id == id) || new NotFoundError()
    }
  }
});
