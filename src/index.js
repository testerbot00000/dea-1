require('./extensions');
global.Promise = require('bluebird');
const path = require('path');
const { Registry, Handler } = require('patron.js');
const { Client } = require('discord.js');
const db = require('./database');
const EventService = require('./services/EventService.js');
const IntervalService = require('./services/IntervalService.js');
const CommandService = require('./services/CommandService.js');
const Documentation = require('./services/Documentation.js');
const Constants = require('./utility/Constants.js');
const credentials = require('./credentials.json');
const client = new Client({ fetchAllMembers: true, messageCacheMaxSize: 5, messageCacheLifetime: 30, messageSweepInterval: 1800, disabledEvents: Constants.data.misc.disabledEvents, restTimeOffset: 100 });
const registry = new Registry();

registry.registerDefaultTypeReaders();
registry.registerGroupsIn(path.join(__dirname, 'groups'));
registry.registerCommandsIn(path.join(__dirname, 'commands'));

client.registry = Object.freeze(registry);

EventService.initiate(client);
IntervalService.initiate(client);

CommandService.run(client, new Handler(registry));

async function initiate() {
  await db.connect(credentials.mongodbConnectionURL);
  db.userRepo.updateMany({}, { $unset: { reputation: '' } }).catch(() => null);
  db.guildRepo.updateMany({}, { $unset: { 'misc.trivia': '', 'settings.globalChattingMultiplier': '' } }).catch(() => null);
  await client.login(credentials.token);
  await Documentation.createAndSave(registry);
}

initiate();
