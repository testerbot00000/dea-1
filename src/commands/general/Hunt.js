const patron = require('patron.js');
const db = require('../../database');
const Random = require('../../utility/Random.js');
const Constants = require('../../utility/Constants.js');
const StringUtil = require('../../utility/StringUtil.js');

class Hunt extends patron.Command {
  constructor() {
    super({
      names: ['hunt'],
      groupName: 'general',
      description: 'Hunt using specified gun.',
      cooldown: Constants.hunt.cooldown,
      args: [
        new patron.Argument({
          name: 'gun',
          key: 'gun',
          type: 'gun',
          example: 'intervention',
          preconditions: ['ownitem', 'ownweakestbullet'],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    const roll = Random.nextInt(1, 101);

    if (roll <= args.gun.accuracy) {
      const meat = await db.select('item_data', '*', 'type = $1', ['meat']);
      const totalFoodOdds = meat.rows.reduce((sum, x) => sum + x.acquire_odds, 0);
      const won = Random.weighted(meat.rows, 'acquire_odds', totalFoodOdds);

      await db.items.modifyInventory(msg.author.id, msg.guild.id, msg.bullet.data_id, -1);

      await db.items.modifyInventory(msg.author.id, msg.guild.id, won.id, 1);

      return sender.reply('Clean kill. Boss froth. Smooth beans. You got: ' + StringUtil.capitializeWords(won.names[0]) + '.');
    }

    return sender.reply('Nigga you just about had that deer but then he did that hoof kick thing and fucked up your buddy Chuck, so then you had to go bust a nut all over him and the GODDAMN deer got away.');
  }
}

module.exports = new Hunt();
