const patron = require('patron.js');
const db = require('../../database');
const Random = require('../../utility/Random.js');
const Constants = require('../../utility/Constants.js');
const Counts = new Map();

class Double extends patron.Command {
  constructor() {
    super({
      names: ['double', 'doubling', 'dublin'],
      groupName: 'gambling',
      description: 'Double your cash scam free.',
      args: [
        new patron.Argument({
          name: 'bet',
          key: 'bet',
          type: 'quantity',
          example: '500',
          preconditions: ['cash', { name: 'minimumcash', options: { minimum: Constants.gambling.minBet } }]
        })
      ]
    });
  }

  async run(msg, args, sender) {
    const roll = Random.roll();
    const key = msg.author.id + '-' + msg.guild.id;
    const count = Counts.get(key) || 0;

    if (roll >= Constants.double.odds && args.bet <= msg.cash * Constants.double.max && count < 5) {
      Counts.set(key, count + 1);
      await db.users.modifyCash(msg.member, args.bet);
    } else {
      Counts.set(key, 0);
      await db.set('users', 'cash = $1', '(user_id, guild_id) = ($2, $3)', [0, msg.author.id, msg.guild.id]);
    }

    return sender.reply('I have doubled your money! Congratulations good fellow! You may have recieved the money now, or you may recieve it in 15 minutes. It depends on the circumstances. If your balance drops to zero, no worries, it will replenish itself over time.');
  }
}

module.exports = new Double();
