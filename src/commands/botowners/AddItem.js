const patron = require('patron.js');
const db = require('../../database');

class AddItem extends patron.Command {
  constructor() {
    super({
      names: ['additem', 'insertitem'],
      groupName: 'botowners',
      description: 'Add an item to the database.',
      args: [
        new patron.Argument({
          name: 'columns',
          key: 'columns',
          type: 'string',
          example: '"name, description, type, crate_odds"'
        }),
        new patron.Argument({
          name: 'values',
          key: 'values',
          type: 'string',
          example: 'karambit "Slit ur nan and she won\'t even know it." gun 5',
          infinite: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    await db.insert('item_data', args.columns, args.values);
    return sender.reply('You have successfully added an item to the database.');
  }
}

module.exports = new AddItem();
