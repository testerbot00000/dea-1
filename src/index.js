const client = require('./structures/client.js');
const registry = require('./structures/registry.js');
const path = require('path');
const requireAll = require('require-all');
const db = require('./database');
const Documentation = require('./services/Documentation.js');
const credentials = require('./credentials.json');

registry.registerDefaultTypeReaders();
registry.registerGroupsIn(path.join(__dirname, 'groups'));
registry.registerCommandsIn(path.join(__dirname, 'commands'));

requireAll(path.join(__dirname, 'extensions'));
requireAll(path.join(__dirname, 'events'));

async function initiate() {
  await db.connect(credentials.mongodbConnectionURL);
  await client.login(credentials.token);
  await Documentation.createAndSave(registry);
  requireAll(path.join(__dirname, 'intervals'));
}

initiate();
