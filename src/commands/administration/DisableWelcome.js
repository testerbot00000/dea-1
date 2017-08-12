const patron = require('patron.js');
const db = require('../../database');

class DisableWelcome extends patron.Command {
  constructor() {
    super({
      names: ['disablewelcome', 'disablewelcomemessage'],
      groupName: 'administration',
      description: 'Disables the welcome message.'
    });
  }

  async run(msg) {
    await db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'settings.welcomeMessage': null } });

    return msg.createReply('You have successfully disabled the welcome message.');
  }
}

module.exports = new DisableWelcome();
