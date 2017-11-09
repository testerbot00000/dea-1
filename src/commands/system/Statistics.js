const patron = require('patron.js');
const NumberUtil = require('../../utility/NumberUtil.js');

class Statistics extends patron.Command {
  constructor() {
    super({
      names: ['statistics', 'stats'],
      groupName: 'system',
      description: 'Statistics about DEA.',
      guildOnly: false
    });
  }

  async run(msg, args) {
    const uptime = NumberUtil.msToTime(msg.client.uptime);

    await msg.author.DMFields(
      [
        'Author', 'vim2meta#3630',
        'Framework', 'patron.js',
        'Memory', (process.memoryUsage().rss / 1048576).toFixed(2) + ' MB',
        'Servers', (await msg.client.shard.fetchClientValues('guilds.size')).reduce((a, b) => a + b, 0),
        'Users', (await msg.client.shard.fetchClientValues('users.size')).reduce((a, b) => a + b, 0),
        'Uptime', 'Days: ' + uptime.days + '\nHours: '+ uptime.hours + '\nMinutes: ' + uptime.minutes
      ]);

    if (msg.channel.type !== 'dm') {
      return msg.createReply('You have been DMed with all DEA Statistics!');
    }
  }
}

module.exports = new Statistics();
