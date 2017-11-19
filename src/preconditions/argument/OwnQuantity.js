const patron = require('patron.js');
const db = require('../../database');
const StringUtil = require('../../utility/StringUtil.js');
const num = require('../../utility/num.js');
const pluralize = require('pluralize');

class Own extends patron.ArgumentPrecondition {
  constructor() {
    super({
      name: 'ownquantity'
    });
  }

  async run(command, msg, argument, args, value) {
    const item = args.item !== undefined ? args.item : args.crate !== undefined ? args.crate : null;

    if (await db.any('items', '(data_id, user_id, guild_id) = ($1, $2, $3) AND quantity >= $4', [item.id, msg.author.id, msg.guild.id, value]) === true) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You do not own ' + num(value) + ' ' + pluralize(StringUtil.capitializeWords(args.crate.names[0]), value) + '.');
  }
}

module.exports = new Own();
