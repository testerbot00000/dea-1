const patron = require('patron.js');
const USD = require('../../utility/USD.js');
const StringUtil = require('../../utility/StringUtil.js');

class Item extends patron.Command {
  constructor() {
    super({
      names: ['item', 'iteminfo', 'damage'],
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

  run(msg, args, sender) {
    // TODO: Display usuable bullets, items in crate.
    let description = '';

    for (const key in args.item) {
      if (args.item[key] !== null) {
        switch (key) {
          case 'price':
            description += '**Price:** ' + USD(args.item[key]) + '\n';
            break;
          case 'name':
          case 'id':
            break;
          default:

            description += '**' + StringUtil.capitializeWords(key) + ':** ' + (typeof args.item[key] === 'string' ? StringUtil.capitializeWords(args.item[key]) : args.item[key]) + '\n';
        }
      }
    }

    return sender.send(description, { title: StringUtil.capitializeWords(args.item.name) });
  }
}

module.exports = new Item();
