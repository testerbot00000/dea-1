const Logger = require('../utility/Logger.js');

module.exports = (client) => {
  client.on('reconnect', () => {
    Logger.log('DEA has disconnected.');
  });
};
