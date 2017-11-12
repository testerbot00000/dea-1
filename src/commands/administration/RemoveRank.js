const db = require('../../database');
const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');

class RemoveRank extends patron.Command {
  constructor() {
    super({
      names: ['removerank', 'disablerank', 'deleterank'],
      groupName: 'administration',
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
    const result = await db.delete('ranks', '"roleId" = $1', args.role.id);

    if (result.rowCount === 0) {
      return sender.reply('There is no rank associated to this role.', { color: Constants.errorColor });
    }

    return sender.reply('You have successfully removed the rank role ' + args.role + '.');
  }
}

module.exports = new RemoveRank();
