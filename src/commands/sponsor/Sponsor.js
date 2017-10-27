const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');

class Sponsor extends patron.Command {
  constructor() {
    super({
      names: ['sponsor', 'benefits', 'sponsorship'],
      groupName: 'sponsor',
      description: 'View all the sponsorship benefits.'
    });
  }

  run(msg) {
    const p = Constants.data.misc.prefix;

    return msg.channel.createMessage('- ' + Constants.config.sponsorship.messageMultiplier + 'X more cash per message.\n- ' + Constants.config.sponsorship.lotteryOddsMultiplier + 'X more likely to win the lottery.\n- Unique role.\n- Ability to use `' + p + 'scam`, `' + p + 'jump`, `' + p + 'steal` and `' + p + '50x2`.\n- Immunity to `' + p + 'bully` and `' + p + 'kill`.', { title: 'Sponsor Benefits' });
  }
}

module.exports = new Sponsor();
