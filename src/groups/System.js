const patron = require('patron.js');

class SystemGroup extends patron.Group {
  constructor() {
    super({
      name: 'system',
      description: 'System commands to explain stuff, etc.'
    });
  }
}

module.exports = new SystemGroup();
