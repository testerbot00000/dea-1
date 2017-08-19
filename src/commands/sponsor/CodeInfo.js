const patron = require('patron.js');
const db = require('../../database');
const Constants = require('../../utility/Constants.js');

class CodeInfo extends patron.Command {
  constructor() {
    super({
      names: ['codeinfo', 'codeinformation', 'referralcodeinfo', 'referinfo', 'refercodeinfo'],
      groupName: 'sponsor',
      description: 'View the information of any referral code.',
      args: [
        new patron.Argument({
          name: 'code',
          key: 'code',
          type: 'string',
          example: 'KEEM',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const codeRegex = new RegExp(args.code.replace(Constants.data.regexes.escape, '\\$&'), 'i');

    const codeOwner = await db.userRepo.findOne({ guildId: msg.guild.id, referralCode: { $regex: codeRegex } });
    const user = msg.client.users.get(codeOwner.userId);

    if (codeOwner === null || user === undefined) {
      return msg.createErrorReply('This referral code does not exist.');
    }

    const uses = await db.userRepo.count({ guildId: msg.guild.id, referredBy: user.id });

    return msg.channel.createMessage('**Uses:** ' + uses + '\n**Owner:** ' + user.tag, { title: 'Code Information: ' + codeOwner.referralCode });
  }
}

module.exports = new CodeInfo();
