const patron = require('patron.js');
const db = require('../../database');
const USD = require('../../utility/USD.js');

class CashForCrate extends patron.ArgumentPrecondition {
  constructor() {
    super({
      name: 'cashforcrate'
    });
  }

  async run(command, msg, argument, args, value) {
    if (args.crate === null) {
      return patron.PreconditionResult.fromSuccess();
    }

    const dbUser = await db.users.getUser(msg.author.id, msg.guild.id, 'cash');
    const required = args.crate.price * value;

    if (dbUser.cash.gte(required)) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You do not have ' + USD(required) + '. Balance: ' + USD(dbUser.cash) + '.');
  }
}

module.exports = new CashForCrate();
