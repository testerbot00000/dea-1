const patron = require('patron.js');
const db = require('../../database');
const Constants = require('../../utility/Constants.js');
const MaximumLength = require('../../preconditions/MaximumLength.js');

class SetReferralCode extends patron.Command {
  constructor() {
    super({
      names: ['setreferralcode', 'setrefercode', 'setcode', 'changereferralcode', 'changerefercode', 'changecode'],
      groupName: 'sponsor',
      description: 'Set your referral code.',
      args: [
        new patron.Argument({
          name: 'code',
          key: 'code',
          type: 'string',
          example: 'KEEM',
          preconditions: [new MaximumLength(Constants.config.setReferralCode.maxLength)],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const codeRegex = new RegExp(args.code.replace(Constants.data.regexes.escape, '\\$&'), 'i');

    if (codeRegex.test(msg.dbUser.referralCode) === true) {
      return msg.createErrorReply('This is already your referral code.');
    } else if (await db.userRepo.any({ guildId: msg.guild.id, referralCode: { $regex: codeRegex } })) {
      return msg.createErrorReply('This referral code has already been taken.');
    }

    await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $set: { referralCode: args.code } });
    return msg.createReply('You have successfully set your referral code to ' + args.code + '.');
  }
}

module.exports = new SetReferralCode();
