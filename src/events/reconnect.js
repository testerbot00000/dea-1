const Logger = require('../utility/Logger.js');

module.exports = (client) => {
  client.on('reconnect', () => {
    Logger.log('Attempting to reconnect...');
  });
};
