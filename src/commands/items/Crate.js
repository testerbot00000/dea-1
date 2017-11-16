const patron = require('patron.js');
const db = require('../../database');
const USD = require('../../utility/USD.js');
const StringUtil = require('../../utility/StringUtil.js');

class Crate extends patron.Command {
  constructor() {
    super({
      names: ['crate', 'crateinfo'],
      groupName: 'items',
      description: 'View all information of a crate.',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'crate',
          key: 'crate',
          type: 'crate',
          example: 'bronze crate',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    const items = await db.items.crateItems(args.crate.id);

    let description = '**Description:** ' + args.crate.description + '\n**Price:** ' + USD(args.crate.price);

    for (let i = 0; i < items.length; i++) {
      if (i === 0) {
        description += '\n**Items:** `';
      }

      description += StringUtil.capitializeWords(items[i].name);

      if (i !== items.length - 1) {
        description += ', ';
      } else {
        description += '`\n';
      }
    }

    return sender.send(description, { title: StringUtil.capitializeWords(args.crate.name) });
  }
}

module.exports = new Crate();
