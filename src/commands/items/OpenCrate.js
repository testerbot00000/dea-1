const patron = require('patron.js');
const db = require('../../database');
const Random = require('../../utility/Random.js');
const Constants = require('../../utility/Constants.js');
const StringUtil = require('../../utility/StringUtil.js');
const Sender = require('../../utility/Sender.js');

class OpenCrate extends patron.Command {
  constructor() {
    super({
      names: ['opencrate', 'open'],
      groupName: 'items',
      description: 'Open a crate!',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'crate',
          key: 'crate',
          type: 'crate',
          example: 'silver crate'
        }),
        new patron.Argument({
          name: 'quantity',
          key: 'quantity',
          type: 'int',
          example: '500',
          defaultValue: 1,
          preconditions: ['ownquantity', { name: 'maximum', options: { maximum: Constants.openCrate.max } }]
        })
      ]
    });
  }

  async run(msg, args) {
    const items = await db.items.crateItems(args.crate.id);
    const totalCrateOdds = items.reduce((sum, x) => sum + x.crate_odds, 0);
    const won = new Map();

    for (let i = 0; i < args.quantity; i++) {
      const item = Random.weighted(items, 'crate_odds', totalCrateOdds);

      won.set(item, 1 + (won.has(item) === true ? won.get(item) : 0));
    }

    await db.items.modifyInventory(msg.author.id, msg.guild.id, args.crate.id, -args.quantity);

    let description = '';

    for (const [key, value] of won) {
      await db.items.modifyInventory(msg.author.id, msg.guild.id, key.id, value);

      description += StringUtil.capitializeWords(key.name) + ': ' + value + '\n';
    }

    return Sender.send(msg.channel, description, { title: 'Items Won' });
  }
}

module.exports = new OpenCrate();
