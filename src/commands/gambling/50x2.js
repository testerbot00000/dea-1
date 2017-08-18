const Gambling = require('../../templates/Gambling.js');
const Sponsor = require('../../preconditions/Sponsor.js');

module.exports = new Gambling(['50x2'], 'Roll 50.0 or higher on a 100.00 sided die to win your bet.', 50, 1, [Sponsor]);
