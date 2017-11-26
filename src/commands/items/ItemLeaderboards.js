const db = require('../../database');
const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const num = require('../../utility/num.js');
const StringUtil = require('../../utility/StringUtil.js');

class ItemLeaderboards extends patron.Command {
  constructor() {
    super({
      names: ['itemleaderboards', 'itemlb', 'itemleaderboard', 'invlb'],
      groupName: 'items',
      description: 'View the users with the highest quantity of items.'
    });
  }

  async run(msg, args, sender) {
    const result = await db.pool.query('SELECT user_id, SUM(quantity) AS total_quantity FROM items WHERE guild_id = $1 GROUP BY user_id ORDER BY total_quantity DESC LIMIT 15;', [msg.guild.id]);
    let message = '';
    let position = 1;

    for (let i = 0; i < result.rows.length; i++) {
      if (position > Constants.leaderboardCap) {
        break;
      }

      const user = msg.client.users.get(result.rows[i].user_id);

      if (user === undefined) {
        continue;
      }

      message += position++ + '. ' + StringUtil.boldify(user.tag) + ': ' + num(result.rows[i].total_quantity) + '\n';
    }

    if (StringUtil.isNullOrWhiteSpace(message) === true) {
      return sender.reply('There is nobody on the leaderboards.', { color: Constants.errorColor });
    }

    return sender.send(message, { title: 'The Item Leaderboards' });
  }
}

module.exports = new ItemLeaderboards();
