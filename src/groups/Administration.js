const patron = require('patron.js');

class Administration extends patron.Group {
  constructor() {
    super({
      name: 'administration',
      description: 'These commands may only be used by the administrators of the server.',
      preconditions: ['administrator']
    });
  }
}

module.exports = new Administration ();
