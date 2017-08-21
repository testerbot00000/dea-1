const patron = require('patron.js');
const Constants = require('../utility/Constants.js');

class Purchased extends patron.Precondition {
  async run(command, msg) {
    if (msg.dbUser.commands.some((v) => v === command.names[0]) === true) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'In order to use this command, you must purchase it with `' + Constants.data.misc.prefix +'buycommand <command name>` using referral points.');
  }
}

module.exports = new Purchased();
