const patron = require('patron.js');
const db = require('../../database');
const Minimum = require('../../preconditions/Minimum.js');
const Constants = require('../../utility/Constants.js');
const SponsorRole = require('../../preconditions/SponsorRole.js');

class BuySponsor extends patron.Command {
  constructor() {
    super({
      names: ['buysponsor', 'getsponsor', 'purchasesponsor'],
      groupName: 'sponsor',
      description: 'Gain access to all the sponsorship benfits.',
      preconditions: [SponsorRole],
      botPermissions: ['MANAGE_ROLES'],
      args: [
        new patron.Argument({
          name: 'number of days',
          key: 'days',
          type: 'int',
          example: '5',
          preconditions: [new Minimum(1)],
          defaultValue: 1
        })
      ]
    });
  }

  async run(msg, args) {
    const pointsRequired = args.days * msg.dbGuild.settings.sponsorPointsRequired;

    if (msg.dbUser.points < pointsRequired) {
      return msg.createErrorReply('You do not have ' + pointsRequired + ' points. Points: ' + msg.dbUser.points + '.');
    }

    const timeInMs = args.days * Constants.conversions.dayInMs;
    const update = msg.dbUser.sponsorExpiresAt === null ? { $set: { sponsorExpiresAt: Date.now() + timeInMs } } : { $inc: { sponsorExpiresAt: timeInMs } };

    await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $inc: { points: -pointsRequired } });
    await db.userRepo.updateById(msg.dbUser._id, update);
    await msg.member.addRole(msg.dbGuild.roles.sponsor);

    return msg.createReply('You have successfully purchased ' + args.days + ' day' + (args.days > 1 ? 's' : '') + ' worth of sponsorship.');
  }
}

module.exports = new BuySponsor();
