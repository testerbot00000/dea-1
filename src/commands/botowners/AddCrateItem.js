const patron = require('patron.js');
const db = require('../../database');

class AddCrateItem extends patron.Command {
  constructor() {
    super({
      names: ['addcrateitem', 'insertcrateitem'],
      groupName: 'botowners',
      description: 'Add an item to a crate.',
      args: [
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: 'karambit'
        }),
        new patron.Argument({
          name: 'crate',
          key: 'crate',
          type: 'crate',
          example: 'gold crate',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    await db.insert('crate_items', 'item_id, crate_id', [args.item.id, args.crate.id]);
    return sender.reply('You have successfully added an item to the ' + args.crate.name + '.');
  }
}

module.exports = new AddCrateItem();
