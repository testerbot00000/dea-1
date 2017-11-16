const db = require('../database');
const client = require('../singletons/client.js');
const Logger = require('../utility/Logger.js');

client.on('roleDelete', (role) => {
  return db.delete('ranks', 'role_id = $1', [role.id])
    .catch((err) => Logger.handleError(err));
});
