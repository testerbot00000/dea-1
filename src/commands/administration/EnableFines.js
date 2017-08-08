const db = require('../../database');
const patron = require('patron.js');
const util = require('../../utility');

class EnableFines extends patron.Command {
  constructor() {
    super({
      names: ['enablefines'],
      groupName: 'administration',
      description: 'Enable fines.'
    });
  }

  async run(msg) {
    if (msg.dbGuild.settings.fines === false) {
      return util.Messenger.replyError(msg.channel, msg.author, 'Fines are already enabled.');
    }

    await db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'settings.fines': true } });

    return util.Messenger.reply(msg.channel, msg.author, 'You have successfully enabled fines.');
  }
}

module.exports = new EnableFines();
