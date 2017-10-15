const patron = require('patron.js');

class NoSponsor extends patron.ArgumentPrecondition {
  async run(command, msg, argument, args, value) {
    if (value.roles.has(msg.dbGuild.roles.sponsor) === false) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You may not use this command on a sponsor.');
  }
}

module.exports = new NoSponsor();
