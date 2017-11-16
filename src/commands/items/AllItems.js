const patron = require('patron.js');
const USD = require('../../utility/USD.js');
const StringUtil = require('../../utility/StringUtil.js');

class Items extends patron.Command {
  constructor() {
    super({
      names: ['items', 'allitems'],
      groupName: 'items',
      description: 'View a list of all items.',
      guildOnly: false
    });
  }

  run(msg, args, sender) {
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
            description += '**' + StringUtil.capitializeWords(key) + ':** ' + args.item[key] + '\n';
        }
      }
    }

    return sender.send(description, { title: StringUtil.capitializeWords(args.item.name) });
  }
}

module.exports = new Items();
