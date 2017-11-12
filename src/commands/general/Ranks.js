const patron = require('patron.js');
const db = require('../../database');
const Constants = require('../../utility/Constants.js');
const USD = require('../../utility/USD.js');

class Ranks extends patron.Command {
  constructor() {
    super({
      names: ['ranks'],
      groupName: 'general',
      description: 'View all ranks in this guild.'
    });
  }

  async run(msg, args, sender) {
    const sortedRanks = (await db.query('SELECT "roleId", "cashRequired" FROM ranks ORDER BY "cashRequired" DESC;')).rows;

    if (sortedRanks.length === 0) {
      return sender.reply('There are no rank roles yet!', { color: Constants.errorColor });
    }

    let description = '';

    for (let i = 0; i < sortedRanks.length; i++) {
      const rank = msg.guild.roles.get(sortedRanks[i].roleId);

      description += rank + ': ' + USD(sortedRanks[i].cashRequired) + '\n';
    }

    return sender.send(description, { title: 'Ranks' });
  }
}

module.exports = new Ranks();
