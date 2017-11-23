const patron = require('patron.js');
const db = require('../../database');
const StringUtil = require('../../utility/StringUtil.js');
const num = require('../../utility/num.js');
const pluralize = require('pluralize');

class UserOwnsQuantity extends patron.ArgumentPrecondition {
  constructor() {
    super({
      name: 'userownsquantity'
    });
  }

  async run(command, msg, argument, args, value) {
    const user = args.member.user !== undefined ? args.member.user : args.user !== undefined ? args.user : null;

    if (await db.any('items', '(data_id, user_id, guild_id) = ($1, $2, $3) AND quantity >= $4', [args.wantedItem.id, user.id, msg.guild.id, value]) === true) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'User ' + user.tag + ' does not own ' + num(value) + ' ' + pluralize(StringUtil.capitializeWords(args.wantedItem.names[0]), value) + '.');
  }
}

module.exports = new UserOwnsQuantity();
