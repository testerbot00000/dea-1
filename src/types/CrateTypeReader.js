const patron = require('patron.js');
const db = require('../database');

class CrateTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'crate'
    });
  }

  async read(command, message, argument, args, input, custom) {
    let lowerInput = input.toLowerCase();

    if (lowerInput.endsWith('crate') === false) {
      lowerInput += ' crate';
    }

    const result = await db.select('item_data', '*', '$1 = ANY(names) AND type = $2', [lowerInput, 'crate']);

    if (result.rowCount === 1) {
      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This crate does not exist.');
  }
}

module.exports = new CrateTypeReader();
