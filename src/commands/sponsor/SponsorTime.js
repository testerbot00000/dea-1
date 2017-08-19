const patron = require('patron.js');
const NumberUtil = require('../../utility/NumberUtil.js');
const Sponsor = require('../../preconditions/Sponsor.js');

class SponsorTime extends patron.Command {
  constructor() {
    super({
      names: ['sponsortime', 'sponsorremaining', 'sponsorleft', 'sponsortimeleft'],
      groupName: 'sponsor',
      description: 'View the time remaining on your sponsorship.',
      preconditions: [Sponsor]
    });
  }

  run(msg) {
    if (msg.dbUser.sponsorExpiresAt === null) {
      return msg.createErrorReply('You shouldn\'t even be a sponsor.');
    }

    const remainingInMs = msg.dbUser.sponsorExpiresAt - Date.now();

    if (remainingInMs < 0) {
      return msg.createReply('Your sponsorship will be ending very soon.');
    }

    const remaining = NumberUtil.msToTime(remainingInMs);

    return msg.channel.createMessage('Days: ' + remaining.days + '\nHours: ' + remaining.hours + '\nMinutes: ' + remaining.minutes + '\nSeconds: ' + remaining.seconds, { title: 'Sponsorship Time' });
  }
}

module.exports = new SponsorTime();
