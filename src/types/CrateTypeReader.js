const patron = require('patron.js');
const db = require('../database');

class CrateTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'crate'
    });
  }

  async read(command, message, argument, args, input, custom) {
    if (input.endsWith('crate') === false) {
      input += ' crate';
    }

    const result = await db.select('crate_data', '*', 'name = $1;', [input.toLowerCase()]);

    if (result.rowCount === 1) {
      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This crate does not exist.');
  }
}

module.exports = new CrateTypeReader();
