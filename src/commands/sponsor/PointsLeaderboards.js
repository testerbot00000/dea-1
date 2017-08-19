const db = require('../../database');
const Constants = require('../../utility/Constants.js');
const patron = require('patron.js');

class PointsLeaderboards extends patron.Command {
  constructor() {
    super({
      names: ['pointsleaderboards', 'pointslb', 'pointlb', 'highpoints', 'highestpoints'],
      groupName: 'sponsor',
      description: 'View the best referrers.'
    });
  }

  async run(msg) {
    const users = await db.userRepo.findMany({ guildId: msg.guild.id });

    users.sort((a, b) => b.points - a.points);

    let message = '';

    for (let i = 0; i < users.length; i++) {
      if (i + 1 > Constants.config.misc.leaderboardCap) {
        break;
      }

      const user = msg.client.users.get(users[i].userId);

      if (user === undefined) {
        continue;
      }

      message += (i + 1) + '. ' + user.tag.boldify() + ': ' + users[i].points + '\n';
    }

    if (String.isNullOrWhiteSpace(message) === true) {
      return msg.createErrorReply('There is nobody on the leaderboards.');
    }

    return msg.channel.createMessage(message, { title: 'The Best Referrers' });
  }
}

module.exports = new PointsLeaderboards();
