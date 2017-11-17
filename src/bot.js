const path = require('path');
const db = require('./database');
const client = require('./singletons/client.js');
const RequireAll = require('patron.js').RequireAll;
const Logger = require('./utility/Logger.js');
const credentials = require('./credentials.json');
const registry = require('./singletons/registry.js');
const pluralize = require('pluralize');

pluralize.addPluralRule(/^ar15$/i, 'Ar15s');

client.registry = registry;

RequireAll(path.join(__dirname, 'events'));

(async () => {
  await db.pool.connect();
  return client.login(credentials.token);
})()
  .catch((err) => Logger.handleError(err));
