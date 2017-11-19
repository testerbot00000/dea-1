const patron = require('patron.js');
const db = require('../../database');
const StringUtil = require('../../utility/StringUtil.js');

class Items extends patron.Command {
  constructor() {
    super({
      names: ['items', 'allitems', 'itemlist'],
      groupName: 'items',
      description: 'View a list of all items.',
      guildOnly: false
    });
  }

  async run(msg, args, sender) {
    const result = await db.select('item_data', 'name', null, [], 'name');

    let description = '';

    for (let i = 0; i < result.rows.length; i++) {
      description += StringUtil.capitializeWords(result.rows[i].names[0]) + ', ';
    }

    return sender.send(description.slice(0, -2) + '.', { title: 'Items' });
  }
}

module.exports = new Items();
