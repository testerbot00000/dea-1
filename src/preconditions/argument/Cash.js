const patron = require('patron.js');
const db = require('../../database');
const USD = require('../../utility/USD.js');

class Cash extends patron.ArgumentPrecondition {
  constructor() {
    super({
      name: 'cash'
    });
  }

  async run(command, msg, argument, args, value) {
    const dbUser = await db.users.getUser(msg.author.id, msg.guild.id, 'cash');

    if (dbUser.cash >= value) {
      msg.cash = dbUser.cash;
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You do not have ' + USD(value) + '. Balance: ' + USD(dbUser.cash) + '.');
  }
}

module.exports = new Cash();
