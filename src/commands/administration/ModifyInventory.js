const patron = require('patron.js');
const db = require('../../database');
const StringUtil = require('../../utility/StringUtil.js');
const num = require('../../utility/num.js');

class ModifyInventory extends patron.Command {
  constructor() {
    super({
      names: ['modifyinventory', 'modifyinv', 'modinv'],
      groupName: 'administration',
      description: 'Add an item to your inventory.',
      args: [
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: '"gold crate"'
        }),
        new patron.Argument({
          name: 'quantity',
          key: 'quantity',
          type: 'quantity',
          example: '54',
          defaultValue: 1
        }),
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'Marry Poppmyass#3413',
          defaultValue: patron.ArgumentDefault.Member,
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    const result = await db.items.modifyInventory(args.member.id, msg.guild.id, args.item.id, args.quantity);

    return sender.reply('You have successfully modified ' + (msg.author.id === args.member.id ? 'your' : StringUtil.boldify(args.member.user.tag)) + ' ' + StringUtil.capitializeWords(args.item.name) + ' count to ' + num(result) + '.');
  }
}

module.exports = new ModifyInventory();
