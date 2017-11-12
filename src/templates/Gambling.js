const patron = require('patron.js');
const db = require('../database');
const Random = require('../utility/Random.js');
const USD = require('../utility/USD.js');
const Constants = require('../utility/Constants.js');

class Gambling extends patron.Command {
  constructor(names, description, odds, payoutMultiplier, preconditions = []) {
    super({
      names: names,
      groupName: 'gambling',
      description: description,
      preconditions: preconditions,
      args: [
        new patron.Argument({
          name: 'bet',
          key: 'bet',
          type: 'currency',
          example: '500',
          preconditions: ['cash', { name: 'minimumcash', options: { minimum: Constants.gambling.minBet } }]
        })
      ]
    });

    this.odds = odds;
    this.payoutMultiplier = payoutMultiplier;
  }

  async run(msg, args, sender) {
    const roll = Random.roll();

    if (roll >= this.odds) {
      const winnings = args.bet * this.payoutMultiplier;

      const newDbUser = await db.modifyCashR(msg.author.id, msg.guild.id, winnings)

      return sender.reply('You rolled: ' + roll.toFixed(2) + '. Congrats, you won ' + USD(winnings) + '. Balance: ' + USD(newDbUser) + '.');
    }

    const newDbUser = await db.modifyCash(msg.author.id, msg.guild.id, -args.bet);

    return sender.reply('You rolled: ' + roll.toFixed(2) + '. Unfortunately, you lost ' + USD(args.bet) + '. Balance: ' + USD(newDbUser) + '.');
  }
}

module.exports = Gambling;
