const db = require('../../database');
const patron = require('patron.js');

class Reset extends patron.Command {
  constructor() {
    super({
      names: ['reset'],
      groupName: 'administration',
      description: 'Resets all user data in your server.'
    });
  }

  async run(msg, args, sender) {
    await sender.reply('Are you sure you wish to reset all user data within your server? Reply with "yes" to continue.');

    const result = await msg.channel.awaitMessages((x) => x.content.toLowerCase() === 'yes' && x.author.id === msg.author.id, { max: 1, time: 30000 });

    if (result.size === 1) {
      await db.delete('users', 'guild_id = $1', [msg.guild.id]);
      await db.delete('items', 'guild_id = $1', [msg.guild.id]);
      return sender.reply('You have successfully reset all data in your server.');
    }
  }
}

module.exports = new Reset();
