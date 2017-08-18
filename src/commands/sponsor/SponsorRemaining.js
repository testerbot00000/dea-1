const patron = require('patron.js');
const NumberUtil = require('../../utility/NumberUtil.js');
const Sponsor = require('../../preconditions/Sponsor.js');

class SponsorRemaining extends patron.Command {
  constructor() {
    super({
      names: ['sponsorremaining', 'sponsortime', 'sponsorleft', 'sponsortimeleft'],
      groupName: 'sponsor',
      description: 'View the time remaining on your sponsorship.',
      preconditions: [Sponsor]
    });
  }

  run(msg) {
    const remainingInMs = msg.dbUser.sponsorExpiresAt - Date.now();

    if (remainingInMs < 0) {
      return msg.channel.createReply('Your sponsorship will be ending very soon.');
    }

    const remaining = NumberUtil.msToTime(remainingInMs);

    return msg.channel.createMessage('Days: ' + remaining.days + '\nHours: ' + remaining.hours + '\nMinutes: ' + remaining.minutes + '\nSeconds: ' + remaining.seconds, { title: 'Sponsorship Remaining' });
  }
}

module.exports = new SponsorRemaining();
