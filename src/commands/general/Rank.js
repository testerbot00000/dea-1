const db = require('../../database');
const patron = require('patron.js');
const USD = require('../../utility/USD.js');
const RankService = require('../../services/RankService.js');

class Rank extends patron.Command {
  constructor() {
    super({
      names: ['rank', 'points', 'point', 'referralpoints', 'referpoints'],
      groupName: 'general',
      description: 'View the rank of anyone.',
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          defaultValue: patron.ArgumentDefault.Member,
          example: 'Blast It Baby#6969',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    const sortedUsers = (await db.query('SELECT "userId", cash FROM users ORDER BY cash DESC;')).rows;
    const rank = RankService.getRank(args.member.id, msg.guild.id, msg.guild);
    const dbUser = await db.getUser(args.member.id, msg.guild.id);

    return sender.send('**Balance:** ' + USD(dbUser.cash) + '\n**Health:** ' + dbUser.health + '\n**Position:** #' + (sortedUsers.findIndex((v) => v.userId === dbUser.userId) + 1) + '\n' + (rank !== undefined ? '**Rank:** ' + rank + '\n' : ''), { title: args.member.user.tag + '\'s Rank' });
  }
}

module.exports = new Rank();
