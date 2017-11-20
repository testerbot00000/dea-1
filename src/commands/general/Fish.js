const patron = require('patron.js');
const db = require('../../database');
const Random = require('../../utility/Random.js');
const Constants = require('../../utility/Constants.js');
const StringUtil = require('../../utility/StringUtil.js');

class Fish extends patron.Command {
  constructor() {
    super({
      names: ['fish'],
      groupName: 'general',
      description: 'Fish those fatass fishies.',
      cooldown: Constants.fish.cooldown,
      args: [
        new patron.Argument({
          name: 'tool',
          key: 'tool',
          type: 'fishing_tool',
          example: 'intervention',
          preconditions: ['ownitem'],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    const roll = Random.nextInt(1, 101);

    if (roll <= args.tool.accuracy) {
      const fish = await db.select('item_data', '*', 'type = $1', ['fish']);
      const totalFoodOdds = fish.rows.reduce((sum, x) => sum + x.acquire_odds, 0);
      const won = Random.weighted(fish.rows, 'acquire_odds', totalFoodOdds);

      await db.items.modifyInventory(msg.author.id, msg.guild.id, won.id, 1);

      return sender.reply('RIP NEMO LMFAO. Finding nemo, more like EATING NEMO ROFL! Good buddy, you got: ' + StringUtil.capitializeWords(won.names[0]) + '.');
    }

    return sender.reply('You had the fucking fish in your pocket on the way to the supermarket to get some spices, and the nigga flipping fish jumped into the sink and pulled some goddamn Finding Nemo shit and bounced.');
  }
}

module.exports = new Fish();
