const patron = require('patron.js');
const db = require('../database');

class GunTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'gun'
    });
  }

  async read(command, message, argument, args, input, custom) {
    const result = await db.select('item_data', '*', '$1 = ANY(names) AND type = $2', [input.toLowerCase(), 'gun']);

    if (result.rowCount === 1) {
      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This gun does not exist.');
  }
}

module.exports = new GunTypeReader();
