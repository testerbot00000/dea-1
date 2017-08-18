const patron = require('patron.js');

class Sponsor extends patron.Precondition {
  async run(command, msg) {
    if (msg.member.roles.has(msg.dbGuild.roles.sponsor) === true) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You must be a sponsor in order to use this command.');
  }
}

module.exports = new Sponsor();
