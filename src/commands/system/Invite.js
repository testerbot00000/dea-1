const patron = require('patron.js');
const util = require('../../utility');
const Constants = require('../../utility/Constants.js');

class Invite extends patron.Command {
  constructor() {
    super({
      names: ['invite', 'join', 'add'],
      groupName: 'system',
      description: 'Add DEA to your server.',
      guildOnly: false
    });
  }

  async run(msg) {
    return util.Messenger.reply(msg.channel, msg.author, 'You may add cleanest bot around by clicking here: ' + Constants.data.links.botInvite + '.\n\nIf you have any questions or concerns, you may always join the **Official DEA Support Server:** ' + Constants.data.links.serverInvite);
  }
}

module.exports = new Invite();
