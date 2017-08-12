const patron = require('patron.js');
const util = require('../../utility');
const Constants = require('../../utility/Constants.js');

class Info extends patron.Command {
  constructor() {
    super({
      names: ['info', 'information', 'cashinfo', 'cashhelp'],
      groupName: 'system',
      description: 'All the information about the DEA cash system.',
      guildOnly: false
    });
  }

  async run(msg) {
    await util.Messenger.DM(msg.author, 'The DEA cash system is based around **CHATTING**. For every message that you send every ' + (Constants.config.misc.cashPerMessage / 1000) + ' seconds that is at least ' + Constants.config.misc.minCharLength + ' characters long, you will get ' + util.NumberUtil.USD(Constants.config.misc.cashPerMessage) + '.\n\nIf you are extra lucky, when sending messages you can win up to ' + util.NumberUtil.USD(Constants.config.lottery.max) + ' in the **lottery**! The odds of winning the lottery are very low, but the more you chat, the higher chance you have of winning it!\n\nYou can watch yourself climb the `' + Constants.data.misc.prefix + 'leaderboards` or you can just view your own cash with the `' + Constants.data.misc.prefix + 'cash [user]` command.\n\nUse the `' + Constants.data.misc.prefix + 'ranks` command to view the current ranks of a server. Whenever you reach the cash required for a rank, DEA will automatically give you the role.\n\nFor all the other DEA related command information, use the `$help` command which will provide you with everything you need to know!');

    if (msg.channel.type !== 'dm') {
      return util.Messenger.reply(msg.channel, msg.author, 'You have been DMed all the information about the DEA Cash System!');
    }
  }
}

module.exports = new Info();
