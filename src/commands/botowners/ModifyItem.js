const patron = require('patron.js');
const StringUtil = require('../../utility/StringUtil.js');
const db = require('../../database');

class ModifyItem extends patron.Command {
  constructor() {
    super({
      names: ['modifyitem', 'updateitem', 'edititem', 'moditem'],
      groupName: 'botowners',
      description: 'Add an item to the database.',
      args: [
        new patron.Argument({
          name: 'item',
          key: 'item',
          type: 'item',
          example: '"m9 bayonnet"'
        }),
        new patron.Argument({
          name: 'column',
          key: 'column',
          type: 'string',
          example: 'description'
        }),
        new patron.Argument({
          name: 'value',
          key: 'value',
          type: 'string',
          example: 'A highly sensational item.',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    await db.set('item_data', args.column + ' = $1', 'id = $2;', [args.value, args.item.id]);

    return sender.reply('You have successfully modified the item: ' + StringUtil.capitializeWords(args.item.name) + '.');
  }
}

module.exports = new ModifyItem();
