const patron = require('patron.js');

class Top extends patron.Precondition {
  constructor(numb) {
    super();

    this.numb = numb;
  }

  async run(command, msg) {
    if (msg.member.roles.has(msg.dbGuild.roles['top' + this.numb]) === true) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You must be one of the top ' + this.numb + ' richest users in order to use this command.');
  }
}

module.exports = Top;
