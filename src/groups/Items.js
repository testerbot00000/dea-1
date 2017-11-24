const patron = require('patron.js');

class Items extends patron.Group {
  constructor() {
    super({
      name: 'items',
      description: 'The are the commands involving items.'
    });
  }
}

module.exports = new Items();
