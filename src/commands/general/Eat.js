const patron = require('patron.js');
const db = require('../../database');
const StringUtil = require('../../utility/StringUtil.js');

class Eat extends patron.Command {
  constructor() {
    super({
      names: ['eat'],
      groupName: 'general',
      description: 'Eat some food.',
      args: [
        new patron.Argument({
          name: 'food',
          key: 'food',
          type: 'food',
          example: 'bear',
          preconditions: ['ownitem'],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    const dbUser = await db.users.getUser(msg.author.id, msg.guild.id, 'health');
    let increase = args.food.health;

    if (increase + dbUser.health > 100) {
      increase = 100 - dbUser.health;
    }

    await db.items.modifyInventory(msg.author.id, msg.guild.id, args.food.id, -1);
    const newHealth = await db.users.modifyHealth(msg.member.id, msg.guild.id, increase < 0 ? args.food.health : increase);

    return sender.reply('You ate one ' + StringUtil.capitializeWords(args.food.name) + ' increasing your health to ' + newHealth + '.');
  }
}

module.exports = new Eat();
