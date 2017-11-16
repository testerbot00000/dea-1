const db = require('../../database');
const Constants = require('../../utility/Constants.js');
const patron = require('patron.js');
const StringUtil = require('../../utility/StringUtil.js');
const USD = require('../../utility/USD.js');

class Leaderboards extends patron.Command {
  constructor() {
    super({
      names: ['leaderboards', 'lb', 'highscores', 'highscore', 'leaderboard'],
      groupName: 'general',
      description: 'View the richest Drug Traffickers.'
    });
  }

  async run(msg, args, sender) {
    const result = await db.select('users', 'user_id, cash', 'guild_id = $1', [msg.guild.id], 'cash DESC', 15);

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

      message += (position++) + '. ' + StringUtil.boldify(user.tag) + ': ' + USD(result.rows[i].cash) + '\n';
    }

    if (StringUtil.isNullOrWhiteSpace(message) === true) {
      return sender.reply('There is nobody on the leaderboards.', { color: Constants.errorColor });
    }

    return sender.send(message, { title: 'The Richest Criminals' });
  }
}

module.exports = new Leaderboards();
