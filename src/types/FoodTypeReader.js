const patron = require('patron.js');
const db = require('../database');

class FoodTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'food'
    });
  }

  async read(command, message, argument, args, input, custom) {
    const result = await db.select('item_data', '*', '$1 = ANY(names) AND (type = $2 OR type = $3)', [input.toLowerCase(), 'fish', 'meat']);

    if (result.rowCount === 1) {
      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This food does not exist.');
  }
}

module.exports = new FoodTypeReader();
