const patron = require('patron.js');
const db = require('../database');

class BulletTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'bullet'
    });
  }

  async read(command, message, argument, args, input, custom) {
    const result = await db.select('item_data', '*', '(name, type) = ($1, $2)', [input.toLowerCase(), 'bullet']);

    if (result.rowCount === 1) {
      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This bullet does not exist.');
  }
}

module.exports = new BulletTypeReader();
