const patron = require('patron.js');
const registry = require('./registry.js');

module.exports = new patron.Handler(registry);
