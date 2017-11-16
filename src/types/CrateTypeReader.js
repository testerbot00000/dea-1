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

    const result = await db.select('crate_data', '*', 'name = $1;', [lowerInput]);

    if (result.rowCount === 1) {
      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This crate does not exist.');
  }
}

module.exports = new CrateTypeReader();
