const db = require('../../database');
const patron = require('patron.js');

class EnableFines extends patron.Command {
  constructor() {
    super({
      names: ['enablefines'],
      groupName: 'administration',
      description: 'Enable fines.'
    });
  }

  async run(msg) {
    if (msg.dbGuild.settings.fines === true) {
      return msg.createErrorReply('Fines are already enabled.');
    }

    await db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'settings.fines': true } });

    return msg.createReply('You have successfully enabled fines.');
  }
}

module.exports = new EnableFines();
