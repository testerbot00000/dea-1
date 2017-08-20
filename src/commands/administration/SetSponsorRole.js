const patron = require('patron.js');
const db = require('../../database');
const Hierarchy = require('../../preconditions/Hierarchy.js');

class SetSponsorRole extends patron.Command {
  constructor() {
    super({
      names: ['setsponsorrole', 'setsponsor'],
      groupName: 'administration',
      description: 'Sets the sponsor role.',
      botPermissions: ['MANAGE_ROLES'],
      args: [
        new patron.Argument({
          name: 'role',
          key: 'role',
          type: 'role',
          example: 'Sponsor',
          preconditions: [Hierarchy],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    await db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'roles.sponsor': args.role.id } });
    return msg.createReply('You have successfully set the sponsor role to ' + args.role + '.');
  }
}

module.exports = new SetSponsorRole();
