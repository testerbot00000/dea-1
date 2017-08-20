const patron = require('patron.js');
const db = require('../../database');
const Minimum = require('../../preconditions/Minimum.js');
const Maximum = require('../../preconditions/Maximum.js');

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
          preconditions: [new Minimum(1), new Maximum(10)]
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
