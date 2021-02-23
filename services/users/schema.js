const { makeExecutableSchema } = require('@graphql-tools/schema');
const NotFoundError = require('../../lib/not_found_error');
const readFileSync = require('../../lib/read_file_sync');
const typeDefs = readFileSync(__dirname, 'schema.graphql');

// data fixtures
const users = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Macmillan'},
];

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      user: (root, { id }) => users.find(m => m.id === id) || new NotFoundError(),
    }
  }
});
