const patron = require('patron.js');

class Items extends patron.Group {
  constructor() {
    super({
      name: 'items',
      description: 'These are the commands involving items.'
    });
  }
}

module.exports = new Items();
