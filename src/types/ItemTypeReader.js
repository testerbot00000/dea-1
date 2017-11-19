const patron = require('patron.js');
const db = require('../database');

class ItemTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'item'
    });
  }

  async read(command, message, argument, args, input, custom) {
    const result = await db.select('item_data', '*', '$1 = ANY(names)', [input.toLowerCase()]);

    if (result.rowCount === 1) {
      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This item does not exist.');
  }
}

module.exports = new ItemTypeReader();
