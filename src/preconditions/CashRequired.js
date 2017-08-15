const patron = require('patron.js');

class CashRequired extends patron.Precondition {
  constructor(minimum) {
    super();
    this.minimum = minimum;
  }

  async run(command, msg) {
    if (msg.dbUser.cash >= this.minimum) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You need ' + this.minimum.USD() + ' to run this command.');
  }
}

module.exports = CashRequired;
