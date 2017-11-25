const Logger = require('../utility/Logger.js');
const client = require('../singletons/client.js');

client.on('disconnect', () => Logger.log('Shard #' + client.shard.id + ' has disconnected.', 'WARNING'));
