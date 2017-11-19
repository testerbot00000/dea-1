const patron = require('patron.js');
const db = require('../../database');
const StringUtil = require('../../utility/StringUtil.js');

class OwnItem extends patron.ArgumentPrecondition {
  constructor() {
    super({
      name: 'ownitem'
    });
  }

  async run(command, msg, argument, args, value) {
    if (await db.any('items', '(data_id, user_id, guild_id) = ($1, $2, $3) AND quantity >= 1', [value.id, msg.author.id, msg.guild.id]) === true) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You do not own a ' + StringUtil.capitializeWords(value.names[0]) + '.');
  }
}

module.exports = new OwnItem();
