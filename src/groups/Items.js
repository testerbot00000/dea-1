const patron = require('patron.js');

class Items extends patron.Group {
  constructor() {
    super({
      name: 'items'
    });
  }
}

module.exports = new Items();
