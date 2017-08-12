const Constants = require('../utility/Constants.js');
const Logger = require('../utility/Logger.js');

module.exports = (client) => {
  client.on('ready', async () => {
    Logger.log('DEA has successfully connected.');
    await client.user.setGame(Constants.data.misc.game);
  });
};
