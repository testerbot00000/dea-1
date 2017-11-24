const db = require('../../database');
const patron = require('patron.js');

class Suicide extends patron.Command {
  constructor() {
    super({
      names: ['suicide', 'kms', 'killmyself'],
      groupName: 'crime',
      description: 'Commit suicide',
    });
  }

  async run(msg, args, sender) {
    await db.delete('users', '(user_id, guild_id) = ($1, $2)', [msg.author.id, msg.guild.id]);
    await db.delete('items', '(user_id, guild_id) = ($1, $2)', [msg.author.id, msg.guild.id]);

    return sender.reply('You have successfully killed yourself.');
  }
}

module.exports = new Suicide();
