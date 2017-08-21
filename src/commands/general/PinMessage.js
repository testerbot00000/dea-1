const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const Purcahsed = require('../../preconditions/Purchased.js');

class PinMessage extends patron.Command {
  constructor() {
    super({
      names: ['pinmessage', 'pin'],
      groupName: 'general',
      description: 'Pin the last message sent by any member in this channel.',
      botPermissions: ['MANAGE_MESSAGES'],
      preconditions: [Purcahsed],
      coooldown: Constants.config.pinMessage.cooldown,
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'Long Shlong#0293',
          defaultValue: patron.ArgumentDefault.Member,
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const messages = await msg.channel.fetchMessages({ limit: 100 });
    const sorted = messages.sort((a, b) => b.createdTimestamp - a.createdTimestamp);
    const m = sorted.findValue((v) => v.author.id === args.member.id && v.content.startsWith(Constants.data.misc.prefix + 'pin') === false);
    await m.pin();
    return msg.createReply('You have successfully pinned ' + args.member.user.tag.boldify() + '\'s most recent message.');
  }
}

module.exports = new PinMessage();
