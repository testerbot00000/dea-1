const patron = require('patron.js');
const Constants = require('../utility/Constants.js');

class SponsorRole extends patron.Precondition {
  async run(command, msg) {
    if (msg.guild.roles.has(msg.dbGuild.roles.sponsor) === true) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'The sponsor role must be set with the `' + Constants.data.misc.prefix +'SetSponsorRole` in order to use this command.');
  }
}

module.exports = new SponsorRole();
