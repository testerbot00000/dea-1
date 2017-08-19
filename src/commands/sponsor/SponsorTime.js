const patron = require('patron.js');
const db = require('../../database');
const NumberUtil = require('../../utility/NumberUtil.js');

class SponsorTime extends patron.Command {
  constructor() {
    super({
      names: ['sponsortime', 'sponsorremaining', 'sponsorleft', 'sponsortimeleft'],
      groupName: 'sponsor',
      description: 'View the time remaining on your sponsorship.',
      args: [
        new patron.Argument({
          key: 'member',
          name: 'member',
          type: 'member',
          example: 'Willy Wonka#9123',
          defaultValue: patron.ArgumentDefault.Member,
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const dbUser = msg.author.id === args.member.id ? msg.dbUser : await db.userRepo.getUser(args.member.id, msg.guild.id);

    if (dbUser.sponsorExpiresAt === null) {
      return msg.channel.createErrorMessage(args.member.user.tag.boldify() + ' isn\'t a sponsor.');
    }

    const remainingInMs = msg.dbUser.sponsorExpiresAt - Date.now();

    if (remainingInMs < 0) {
      return msg.createReply('Your sponsorship will be ending very soon.');
    }

    const remaining = NumberUtil.msToTime(remainingInMs);

    return msg.channel.createMessage('Days: ' + remaining.days + '\nHours: ' + remaining.hours + '\nMinutes: ' + remaining.minutes + '\nSeconds: ' + remaining.seconds, { title: args.member.user.tag + '\'s Sponsorship Time' });
  }
}

module.exports = new SponsorTime();
