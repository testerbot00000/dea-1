const patron = require('patron.js');
const db = require('../../database');
const Constants = require('../../utility/Constants.js');

class Claim extends patron.Command {
  constructor() {
    super({
      names: ['claim'],
      groupName: 'sponsor',
      description: 'Claim a reward for being referred.',
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
    const difference = Date.now() - Constants.config.claim.timespan;

    if (msg.member.joinedTimestamp < difference) {
      return msg.createErrorReply('Only users who recently joined this server may claim a referral reward.');
    } else if (msg.author.createdTimestamp > difference) {
      return msg.createErrorReply('For security reasons, recently created discord accounts may not claim referral rewards.');
    } else if (msg.dbUser.referredBy !== null) {
      return msg.createErrorReply('You have already been referred in this server.');
    }

    const codeRegex = new RegExp(args.code.replace(Constants.data.regexes.escape, '\\$&'), 'i');

    if (codeRegex.test(msg.dbUser.referralCode) === true) {
      return msg.createErrorReply('You may not claim a referral reward using your own code.');
    }

    const referredBy = await db.userRepo.findOne({ guildId: msg.guild.id, referralCode: { $regex: codeRegex } });

    if (referredBy === null) {
      return msg.createErrorReply('This referral code does not exist.');
    }

    await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $set: { referredBy: referredBy.userId, probation: true } });
    await db.userRepo.updateById(referredBy._id, { $inc: { points: 1 } });
    await db.userRepo.modifyCash(msg.dbGuild, msg.member, Constants.config.claim.reward);
    await msg.createReply('You have successfully claimed ' + Constants.config.claim.reward.USD() + ' using code ' + referredBy.referralCode + '.');
    await msg.client.tryDM(referredBy.userId, msg.author.tag.boldify() + ' has used your referral code, granting you one point.', { guild: msg.guild });

    msg.client.setTimeout(() => {
      db.userRepo.updateUser(msg.author.id, msg.guild.id, { $unset: { probation: '' } }).catch(() => null);
    }, Constants.config.claim.probationTimeout);
  }
}

module.exports = new Claim();
