const patron = require('patron.js');
const db = require('../../database');

class RemoveCrateItem extends patron.Command {
  constructor() {
    super({
      names: ['removecrateitem', 'deletecrateitem'],
      groupName: 'botowners',
      description: 'Remove an item from a crate.',
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
    await db.delete('crate_items', '(item_id, crate_id) = ($1, $2)', [args.item.id, args.crate.id]);
    return sender.reply('You have successfully remove an item from the ' + args.crate.name + '.');
  }
}

module.exports = new RemoveCrateItem();
