const path = require('path');
const requireAll = require('require-all');

class EventService {
  initiate(client) {
    const obj = requireAll(path.join(__dirname, '../events'));

    for (const key in obj) {
      if (obj.hasOwnProperty(key) === true) {
        obj[key](client);
      }
    }
  }
}

module.exports = new EventService();
