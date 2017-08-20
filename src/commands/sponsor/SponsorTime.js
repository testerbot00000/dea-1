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
    const same = msg.author.id === args.member.id;
    const dbUser = same === true ? msg.dbUser : await db.userRepo.getUser(args.member.id, msg.guild.id);
    const boldMember = args.member.user.tag.boldify();

    if (dbUser.sponsorExpiresAt === null) {
      return msg.channel.createErrorMessage((same === true ? 'You aren\'t' : boldMember + ' isn\'t') + ' a sponsor.');
    }

    const remainingInMs = dbUser.sponsorExpiresAt - Date.now();

    if (remainingInMs < 0) {
      return msg.createReply((same === true ? 'Your' : boldMember + '\'s') + ' sponsorship will be ending very soon.');
    }

    const remaining = NumberUtil.msToTime(remainingInMs);

    return msg.channel.createMessage('Days: ' + remaining.days + '\nHours: ' + remaining.hours + '\nMinutes: ' + remaining.minutes + '\nSeconds: ' + remaining.seconds, { title: args.member.user.tag + '\'s Sponsorship Time' });
  }
}

module.exports = new SponsorTime();
