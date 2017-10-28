const patron = require('patron.js');

class DM extends patron.Command {
  constructor() {
    super({
      names: ['dm', 'directmessage'],
      groupName: 'botowners',
      description: 'DM any user.',
      args: [
        new patron.Argument({
          name: 'user',
          key: 'user',
          type: 'user',
          example: '"Jimmy Jammer#3457"'
        }),
        new patron.Argument({
          name: 'message',
          key: 'message',
          type: 'string',
          example: 'lmao i own this bot kys kid',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    await args.user.tryDM(args.message);
    return msg.createReply('You have successfully DMed ' + args.user.tag.boldify() + '.');
  }
}

module.exports = new DM();
