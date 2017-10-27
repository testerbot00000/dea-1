const Logger = require('../utility/Logger.js');
const client = require('../structures/client.js');

client.on('reconnect', () => {
  return Logger.log('DEA has disconnected.', 'INFO');
});
