const patron = require('patron.js');
const db = require('../../database');

class SetPointsRequired extends patron.Command {
  constructor() {
    super({
      names: ['setpointsrequired', 'setpoints', 'setpoint'],
      groupName: 'administration',
      description: 'Sets the amount of points required per day of sponsorship.',
      args: [
        new patron.Argument({
          name: 'daily points required',
          key: 'points',
          type: 'int',
          example: '3',
          preconditions: [new patron.preconditions.Between(1, 10)]
        })
      ]
    });
  }

  async run(msg, args) {
    await db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'settings.sponsorPointsRequired': args.points } });
    return msg.createReply('You have successfully set the amount of points required for each day of sponsorship to ' + args.points + '.');
  }
}

module.exports = new SetPointsRequired();
