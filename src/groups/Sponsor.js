const patron = require('patron.js');

class Sponsor extends patron.Group {
  constructor() {
    super({
      name: 'sponsor'
    });
  }
}

module.exports = new Sponsor();
