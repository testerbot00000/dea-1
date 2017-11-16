const db = require('../../database');
const patron = require('patron.js');
const USD = require('../../utility/USD.js');
const RankService = require('../../services/RankService.js');

class Rank extends patron.Command {
  constructor() {
    super({
      names: ['rank'],
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
    const dbUser = await db.users.getUser(args.member.id, msg.guild.id, 'user_id, cash, health');
    const sortedUsers = await db.select('users', 'user_id', 'guild_id = $1', [msg.guild.id], 'cash DESC');
    const sortedRanks = await db.select('ranks', 'role_id, cash', 'guild_id = $1', [msg.guild.id], 'cash');
    const rank = RankService.getRank(args.member, dbUser.cash, sortedRanks.rows);

    return sender.send('**Balance:** ' + USD(dbUser.cash) + '\n**Health:** ' + dbUser.health + '\n**Position:** #' + (sortedUsers.rows.findIndex((v) => v.user_id === dbUser.user_id) + 1) + '\n' + (rank !== undefined ? '**Rank:** ' + rank + '\n' : ''), { title: args.member.user.tag + '\'s Rank' });
  }
}

module.exports = new Rank();
