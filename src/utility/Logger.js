const DateUtil = require('./DateUtil.js');
const fs = require('fs');
const util = require('util');
const appendFile = util.promisify(fs.appendFile);

class Logger {
  constructor() {
    if (fs.existsSync('logs/') === false) {
      fs.mkdirSync('logs');
    }
  }

  log(message, level) {
    const date = new Date();
    const formattedMessage = DateUtil.UTCTime(date) + ' [' + level + '] ' + message;

    console.log(formattedMessage);
    return appendFile('logs/' + DateUtil.UTCDate(date) + '.txt', formattedMessage + '\n');
  }

  handleError(err) {
    return this.log(err.stack, 'ERROR');
  }
}

module.exports = new Logger();
