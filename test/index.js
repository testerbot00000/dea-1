require('../src/extensions');
const path = require('path');
const { Registry } = require('patron.js');
const { Client } = require('discord.js');
const db = require('../src/database');
const Constants = require('../src/utility/Constants.js');
const credentials = require('../src/credentials.json');
const Documentation = require('../src/services/Documentation.js');

async function initiate() {
  const client = new Client({ fetchAllMembers: true, messageCacheMaxSize: 5, messageCacheLifetime: 30, messageSweepInterval: 1800, disabledEvents: Constants.data.misc.disabledEvents, restTimeOffset: 100 });
  const registry = new Registry();

  registry.registerDefaultTypeReaders();
  registry.registerGroupsIn(path.join(__dirname, '../src/groups'));
  registry.registerCommandsIn(path.join(__dirname, '../src/commands'));

  await Documentation.createAndSave(registry);
  await db.connect(credentials.mongodbConnectionURL);
  await client.login(credentials.token);
}

initiate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
