const Constants = require('../utility/Constants.js');
const Logger = require('../utility/Logger.js');

module.exports = (client) => {
  client.on('ready', async () => {
    Logger.log('DEA has successfully connected.');
    await client.user.setPresence({ game: { name: Constants.data.misc.game, type: 0 } });
  });
};
