const path = require('path');
const db = require('./database');
const client = require('./structures/client.js');
const RequireAll = require('patron.js').RequireAll;
const Logger = require('./utility/Logger.js');
const credentials = require('./credentials.json');

RequireAll(path.join(__dirname, 'extensions'));
RequireAll(path.join(__dirname, 'events'));

(async function () {
  await db.connect(credentials.mongodbConnectionURL);
  return client.login(credentials.token);
})()
  .catch((err) => Logger.handleError(err));
