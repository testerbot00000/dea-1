const db = require('../../database');
const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');

class RemoveRank extends patron.Command {
  constructor() {
    super({
      names: ['removerank', 'disablerank', 'deleterank'],
      groupName: 'botowners',
      description: 'Remove a rank role.',
      args: [
        new patron.Argument({
          name: 'role',
          key: 'role',
          type: 'role',
          example: 'Sicario',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    await db.removeRank(args.role.id, msg.guild.id);

    return sender.reply('You have successfully removed the rank role ' + args.role + '.');
  }
}

module.exports = new RemoveRank();
