const db = require('../../database');
const patron = require('patron.js');

class DisableFines extends patron.Command {
  constructor() {
    super({
      names: ['disablefines'],
      groupName: 'administration',
      description: 'Disable fines.'
    });
  }

  async run(msg) {
    if (msg.dbGuild.settings.fines === false) {
      return msg.createErrorReply('Fines are already disabled.');
    }

    await db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'settings.fines': false } });

    return msg.createReply('You have successfully disabled fines.');
  }
}

module.exports = new DisableFines();
