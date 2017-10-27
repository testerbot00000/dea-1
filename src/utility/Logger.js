const DateUtil = require('./DateUtil.js');
const fs = require('fs');
const util = require('util');
const path = require('path');
const appendFile = util.promisify(fs.appendFile);
const logsPath = path.join(__dirname, '../../logs');

class Logger {
  constructor() {
    if (fs.existsSync(logsPath) === false) {
      fs.mkdirSync(logsPath);
    }
  }

  log(message, level) {
    const date = new Date();
    const formattedMessage = DateUtil.UTCTime(date) + ' [' + level + '] ' + message;

    console.log(formattedMessage);
    return appendFile(logsPath + DateUtil.UTCDate(date) + '.txt', formattedMessage + '\n');
  }

  handleError(err) {
    return this.log(err.stack, 'ERROR');
  }
}

module.exports = new Logger();
