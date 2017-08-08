const db = require('../../database');
const patron = require('patron.js');
const util = require('../../utility');

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
      return util.Messenger.replyError(msg.channel, msg.author, 'Fines are already disabled.');
    }

    await db.guildRepo.upsertGuild(msg.guild.id, new db.updates.Set('settings.fines', false));

    return util.Messenger.reply(msg.channel, msg.author, 'You have successfully disabled fines.');
  }
}

module.exports = new DisableFines();
