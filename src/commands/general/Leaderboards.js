const db = require('../../database');
const Constants = require('../../utility/Constants.js');
const patron = require('patron.js');
const util = require('../../utility');

class Leaderboards extends patron.Command {
  constructor() {
    super({
      names: ['leaderboards', 'lb', 'highscores', 'highscore', 'leaderboard'],
      groupName: 'general',
      description: 'View the richest Drug Traffickers.'
    });
  }

  async run(msg) {
    const users = await db.userRepo.findMany({ guildId: msg.guild.id });

    users.sort((a, b) => b.cash - a.cash);

    let message = '';

    for (let i = 0; i < users.length; i++) {
      if (i + 1 > Constants.config.misc.leaderboardCap) {
        break;
      }

      const user = msg.client.users.get(users[i].userId);

      if (user === undefined) {
        continue;
      }

      message += (i + 1) + '. ' + util.StringUtil.boldify(user.tag) + ': ' + util.NumberUtil.format(users[i].cash) + '\n';
    }

    if (util.StringUtil.isNullOrWhiteSpace(message) === true) {
      return util.Messenger.replyError(msg.channel, msg.author, 'There is nobody on the leaderboards.');
    }

    return util.Messenger.send(msg.channel, message, 'The Richest Traffickers');
  }
}

module.exports = new Leaderboards();
