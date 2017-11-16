const patron = require('patron.js');
const db = require('../database');

class ItemTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'item'
    });
  }

  async read(command, message, argument, args, input, custom) {
    const originResult = await db.select('item_data', 'id, tableoid::regclass AS origin', 'name = $1', [input.toLowerCase()]);

    if (originResult.rowCount === 1) {
      const result = await db.select(originResult.rows[0].origin, '*', 'id = $1', [originResult.rows[0].id]);
      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This item does not exist.');
  }
}

module.exports = new ItemTypeReader();
