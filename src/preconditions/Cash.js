const patron = require('patron.js');
const NumberUtil = require('../utility/NumberUtil.js');

class Cash extends patron.ArgumentPrecondition {
  async run(command, msg, argument, value) {
    const realValue = NumberUtil.realValue(msg.dbUser.cash);

    if (value <= realValue) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You do not have enough money. Balance: ' + realValue.USD() + '.');
  }
}

module.exports = new Cash();
