const db = require('../../database');
const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const StringUtil = require('../../utility/StringUtil.js');

class Inventory extends patron.Command {
  constructor() {
    super({
      names: ['inventory', 'inv'],
      groupName: 'general',
      description: 'View the inventory of anyone.',
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          defaultValue: patron.ArgumentDefault.Member,
          example: 'You tell em boss#2121',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    const inventory = await db.items.inventory(args.member.id, msg.guild.id);

    if (inventory.length === 0) {
      return sender.reply((args.member.id === msg.author.id ? 'You do not have any items in your inventory.' : 'This user does not have any items in their inventory.'), { color: Constants.errorColor });
    }

    let description = '';

    for (let i = 0; i < inventory.length; i++) {
      description += '**' + StringUtil.capitializeWords(inventory[i].name) + ':** ' + inventory[i].quantity + '\n';
    }

    return sender.send(description, { title: args.member.user.tag + '\'s Inventory' });
  }
}

module.exports = new Inventory();
