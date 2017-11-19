const db = require('../../database');
const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');
const StringUtil = require('../../utility/StringUtil.js');
const num = require('../../utility/num.js');
const pluralize = require('pluralize');
const pad = require('pad');

class Inventory extends patron.Command {
  constructor() {
    super({
      names: ['inventory', 'inv'],
      groupName: 'items',
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

    const max = inventory.reduce((a, b) => Math.max(a, num(b.quantity).length), 0);
    let description = '```';

    for (let i = 0; i < inventory.length; i++) {
      description += pad(num(inventory[i].quantity), max) + ' ' + pluralize(StringUtil.capitializeWords(inventory[i].names[0]), parseInt(inventory[i].quantity)) + '\n';
    }

    return sender.send(description + '```', { title: args.member.user.tag + '\'s Inventory' });
  }
}

module.exports = new Inventory();
