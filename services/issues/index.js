const makeServer = require('../../lib/make_server');
makeServer(require('./schema'), 'issues', 4001);