const db = require('../../database');
const patron = require('patron.js');
const StringUtil = require('../../utility/StringUtil.js');

class ModifyHealth extends patron.Command {
  constructor() {
    super({
      names: ['modifyhealth', 'modhealth'],
      groupName: 'administration',
      description: 'Allows you to modify the health of any member.',
      args: [
        new patron.Argument({
          name: 'amount',
          key: 'amount',
          type: 'quantity',
          example: '500'
        }),
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          defaultValue: patron.ArgumentDefault.Member,
          example: 'Supa Hot Fire#0911',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    const newHealth = await db.users.modifyHealth(args.member.id, msg.guild.id, args.amount);

    return sender.reply('You have successfully modifed ' + (args.member.id === msg.author.id ? 'your' : StringUtil.boldify(args.member.user.tag) + '\'s') + ' health to ' + newHealth + '.');
  }
}

module.exports = new ModifyHealth();
