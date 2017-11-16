const patron = require('patron.js');
const db = require('../../database');
const Constants = require('../../utility/Constants.js');
const USD = require('../../utility/USD.js');

class Ranks extends patron.Command {
  constructor() {
    super({
      names: ['ranks', 'roles'],
      groupName: 'general',
      description: 'View all ranks in this guild.'
    });
  }

  async run(msg, args, sender) {
    const result = await db.select('ranks', 'role_id, cash', 'guild_id = $1', [msg.guild.id], 'cash');

    if (result.rows.length === 0) {
      return sender.reply('There are no rank roles yet!', { color: Constants.errorColor });
    }

    let description = '';

    for (let i = 0; i < result.rows.length; i++) {
      const rank = msg.guild.roles.get(result.rows[i].role_id);

      if (rank === undefined) {
        continue;
      }

      description += rank + ': ' + USD(result.rows[i].cash) + '\n';
    }

    return sender.send(description, { title: 'Ranks' });
  }
}

module.exports = new Ranks();
