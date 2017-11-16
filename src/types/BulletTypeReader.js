const patron = require('patron.js');
const db = require('../database');

class BulletTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'bullet'
    });
  }

  async read(command, message, argument, args, input, custom) {
    const result = await db.select('bullet_data', '*', 'name = $1', [input.toLowerCase()]);

    if (result.rowCount === 1) {
      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This bullet does not exist.');
  }
}

module.exports = new BulletTypeReader();
