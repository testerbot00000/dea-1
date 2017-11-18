const patron = require('patron.js');
const db = require('../database');

class FoodTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'food'
    });
  }

  async read(command, message, argument, args, input, custom) {
    const result = await db.select('food_data', '*', 'name = $1', [input.toLowerCase()]);

    if (result.rowCount === 1) {
      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This food does not exist.');
  }
}

module.exports = new FoodTypeReader();
