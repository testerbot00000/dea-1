const patron = require('patron.js');
const db = require('../database');

class FishingToolTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'fishing_tool'
    });
  }

  async read(command, message, argument, args, input) {
    const result = await db.select('item_data', '*', '$1 = ANY(names) AND type = $2', [input.toLowerCase(), 'fishing_tool']);

    if (result.rowCount === 1) {
      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This fishing tool does not exist.');
  }
}

module.exports = new FishingToolTypeReader();
