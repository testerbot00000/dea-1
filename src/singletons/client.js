const discord = require('discord.js');
const Constants = require('../utility/Constants.js');

module.exports = new discord.Client({ fetchAllMembers: true, messageCacheMaxSize: 5, messageCacheLifetime: 30, messageSweepInterval: 1800, disabledEvents: Constants.disabledEvents });
