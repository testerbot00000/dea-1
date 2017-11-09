const patron = require('patron.js');
const discord = require('discord.js');
const path = require('path');
const credentials = require('../credentials.json');
const Logger = require('./utility/Logger.js');
const registry = require('./structures/registry.js');
const Documentation = require('./services/Documentation.js');
const shardingManager = new discord.ShardingManager(path.join(__dirname, '../bot.js'), { token: credentials.token });

patron.RequireAll(path.join(__dirname, 'extensions'));

(async function () {
  await Documentation.createAndSave(registry);
  return shardingManager.spawn(shardingManager.totalShards, 3000);
})()
  .catch((err) => Logger.handleError(err));
