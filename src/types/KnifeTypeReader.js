const patron = require('patron.js');
const db = require('../database');

class KnifeTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'knife'
    });
  }

  async read(command, message, argument, args, input) {
    const result = await db.select('item_data', '*', '$1 = ANY(names) AND type = $2', [input.toLowerCase(), 'knife']);

    if (result.rowCount === 1) {
      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This knife does not exist.');
  }
}

module.exports = new KnifeTypeReader();
