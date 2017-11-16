const patron = require('patron.js');
const db = require('../../database');
const StringUtil = require('../../utility/StringUtil.js');

class Own extends patron.ArgumentPrecondition {
  constructor() {
    super({
      name: 'ownquantity'
    });
  }

  async run(command, msg, argument, args, value) {
    if (await db.any('items', '(data_id, user_id, guild_id) = ($1, $2, $3) AND quantity >= $4', [args.crate.id, msg.author.id, msg.guild.id, value]) === true) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You do not own ' + value + ' ' + StringUtil.capitializeWords(args.crate.name) + (value > 1 ? 's' : '') + '.');
  }
}

module.exports = new Own();
