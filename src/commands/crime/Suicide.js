const db = require('../../database');
const patron = require('patron.js');
const Random = require('../../utility/Random.js');
const USD = require('../../utility/USD.js');
const Constants = require('../../utility/Constants.js');

class Suicide extends patron.Command {
  constructor() {
    super({
      names: ['suicide', 'kms', 'killmyself'],
      groupName: 'crime',
      description: 'Commit suicide'
    });
  }

  async run(msg, args, sender) {
    const dbUser = await db.users.getUser(msg.author.id, msg.guild.id, 'cash');
    const cost = Random.nextFloat(500, 5000);

    if (dbUser.cash < cost) {
      return sender.reply('You need ' + USD(cost) + ' to be able to buy a ' + Random.arrayElement(Constants.suicideTools) + '. Balance: ' + USD(dbUser.cash) + '.', { color: Constants.errorColor });
    }

    await db.delete('users', '(user_id, guild_id) = ($1, $2)', [msg.author.id, msg.guild.id]);
    await db.delete('items', '(user_id, guild_id) = ($1, $2)', [msg.author.id, msg.guild.id]);

    return sender.reply('You have successfully killed yourself.');
  }
}

module.exports = new Suicide();
