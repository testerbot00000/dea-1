const patron = require('patron.js');
const db = require('../database');
const StringUtil = require('../utility/StringUtil.js');

class ItemTypeReader extends patron.TypeReader {
  constructor() {
    super({
      type: 'item'
    });
  }

  async read(command, message, argument, args, input, custom) {
    const originResult = await db.select('item_data', 'id, tableoid::regclass AS origin', 'name = $1', [input.toLowerCase()]);

    if (originResult.rowCount === 1) {
      const result = await db.select(originResult.rows[0].origin, '*', 'id = $1', [originResult.rows[0].id]);

      // TODO: Redo. Terrible hotfix for production, go figure.
      if (originResult.rows[0].origin === 'gun_data') {
        const bullets = await db.items.gunBullets(originResult.rows[0].id);
        let value = '`';

        for (let i = 0; i < bullets.length; i++) {
          value += StringUtil.capitializeWords(bullets[i].name);

          if (i !== bullets.length - 1) {
            value += ', ';
          } else {
            value += '`\n';
          }
        }

        result.rows[0].bullets = value;
      }

      return patron.TypeReaderResult.fromSuccess(result.rows[0]);
    }

    return patron.TypeReaderResult.fromError(command, 'This item does not exist.');
  }
}

module.exports = new ItemTypeReader();
