const patron = require('patron.js');
const NumberUtil = require('../utility/NumberUtil.js');

class CashRequired extends patron.Precondition {
  constructor(required) {
    super();
    this.required = required;
  }

  async run(command, msg) {
    const realValue = NumberUtil.realValue(msg.dbUser.cash);

    if (realValue >= this.required) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You do not have ' + this.required.USD() + '. Balance: ' + realValue.USD() + '.');
  }
}

module.exports = CashRequired;
