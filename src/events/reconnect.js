const Logger = require('../utility/Logger.js');
const client = require('../singletons/client.js');

client.on('reconnecting', () => Logger.log('Shard #' + client.shard.id + ' is attempting to reconnect...', 'INFO'));
