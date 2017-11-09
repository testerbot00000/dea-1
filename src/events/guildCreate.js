const Constants = require('../utility/Constants.js');
const client = require('../structures/client.js');
const Logger = require('../utility/Logger.js');

// TODO: Update welcome message to something better.

client.on('guildCreate', async (guild) => {
  (async function () {
    const mainChannel = guild.mainChannel;

    if (mainChannel !== undefined) {
      return mainChannel.tryCreateMessage('Hey! I am DEA, ya know, the slickest bot in town.\n\nJust wanted to let you know that you can use the `' + Constants.data.misc.prefix +'help` command to get all the command info a man\'s heart could desire.\n\nAlso, you can setup automatic welcome messages with the `' + Constants.data.misc.prefix + 'welcome <message>` command. Unsourceable studies have shown that new users are more likely to stay if they are instantly welcomed!\n\nIf you don\'t like it, no problem! You can disable it at any time with the `' + Constants.data.misc.prefix + 'disablewelcome` command. If you have any questions or concerns, you may always join the **Official DEA Support Server:** ' + Constants.data.links.serverInvite + '.');
    }
  })()
    .catch((err) => Logger.handleError(err));
});
