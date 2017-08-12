const patron = require('patron.js');
const db = require('../database');
const Random = require('../utility/Random.js');
const NumberUtil = require('../utility/NumberUtil.js');
const Constants = require('../utility/Constants.js');
const Cash = require('../preconditions/Cash.js');
const MinimumCash = require('../preconditions/MinimumCash.js');

class Gambling extends patron.Command {
  constructor(names, description, odds, payoutMultiplier) {
    super({
      names: names,
      groupName: 'gambling',
      description: description,
      args: [
        new patron.Argument({
          name: 'bet',
          key: 'bet',
          type: 'currency',
          example: '500',
          preconditions: [Cash, new MinimumCash(Constants.config.gambling.minBet)]
        })
      ]
    });

    this.odds = odds;
    this.payoutMultiplier = payoutMultiplier;
  }

  async run(msg, args) {
    const roll = Random.roll();

    if (roll >= this.odds) {
      const winnings = args.bet * this.payoutMultiplier;

      const newDbUser = await db.userRepo.modifyCash(msg.dbGuild, msg.member, winnings);

      return msg.createReply('You rolled: ' + roll.toFixed(2) + '. Congrats, you won ' + winnings.USD() + '. Balance: ' + NumberUtil.format(newDbUser.cash) + '.');
    }
    const newDbUser = await db.userRepo.modifyCash(msg.dbGuild, msg.member, -args.bet);

    return msg.createReply('You rolled: ' + roll.toFixed(2) + '. Unfortunately, you lost ' + args.bet.USD() + '. Balance: ' + NumberUtil.format(newDbUser.cash) + '.');
  }
}

module.exports = Gambling;
