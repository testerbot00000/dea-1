const patron = require('patron.js');
const db = require('../../database');
const USD = require('../../utility/USD.js');
const StringUtil = require('../../utility/StringUtil.js');

class Item extends patron.Command {
  constructor() {
    super({
      names: ['item', 'iteminfo', 'damage', 'accuracy', 'crate', 'gun', 'knife', 'weapon', 'food', 'fish', 'meat'],
      groupName: 'items',
      description: 'View all information of an item.',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: 'glock',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    if (args.item.type === 'crate') {
      args.item.items = '`' + StringUtil.listItems(await db.items.crateItems(args.item.id)) + '`';
    } else if (args.item.type === 'gun') {
      args.item.bullets = '`' + StringUtil.listItems(await db.items.gunBullets(args.item.id)) + '`';
    }

    let description = '';

    for (const key in args.item) {
      if (args.item[key] !== null) {
        switch (key) {
          case 'price':
            description += '**Price:** ' + USD(args.item[key]) + '\n';
            break;
          case 'damage_reduction':
            description += '**Damage Reduction:** ' + (args.item[key] * 100) + '%\n';
            break;
          case 'names':
          case 'id':
          case 'type':
            break;
          default:
            description += '**' + StringUtil.capitializeWords(key) + ':** ' + args.item[key] + '\n';
        }
      }
    }

    return sender.send(description, { title: StringUtil.capitializeWords(args.item.names[0]) });
  }
}

module.exports = new Item();
