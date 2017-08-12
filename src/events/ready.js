const Constants = require('../utility/Constants.js');
const util = require('../utility');

module.exports = (client) => {
  client.on('ready', async () => {
    util.Logger.log('DEA has successfully connected.');
    await client.user.setGame(Constants.data.misc.game);
  });
};
