const patron = require('patron.js');
const db = require('../../database');
const Random = require('../../utility/Random.js');
const Constants = require('../../utility/Constants.js');
const USD = require('../../utility/USD.js');
const Sender = require('../../utility/Sender.js');
const StringUtil = require('../../utility/StringUtil.js');
const HealthService = require('../../services/HealthService.js');
const Try = require('../../utility/Try.js');

class Shoot extends patron.Command {
  constructor() {
    super({
      names: ['shoot'],
      groupName: 'crime',
      description: 'Shoot a user with specified gun.',
      cooldown: Constants.shoot.cooldown,
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          preconditions: ['noself'],
          example: 'fku#0059'
        }),
        new patron.Argument({
          name: 'gun',
          key: 'gun',
          type: 'gun',
          example: 'intervention',
          preconditions: ['ownitem', 'ownstrongestbullet'],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    const dbUser = await db.users.getUser(args.member.id, msg.guild.id, 'cash');
    const damage = await HealthService.reduceDamage(args.member.id, msg.guild.id, args.gun.damage + msg.bullet.damage);
    const roll = Random.nextInt(1, 101);

    if (roll <= args.gun.accuracy) {
      const newHealth = await db.users.modifyHealth(args.member.id, msg.guild.id, -damage, msg.member);

      if (newHealth === 0) {
        await sender.reply('Woah, you just killed ' + StringUtil.boldify(args.member.user.tag) + '. You just earned ' + USD(dbUser.cash) + ' **AND** their inventory, congrats.');
        Try(Sender.send(args.member.user, 'Unfortunately, you were killed by ' + StringUtil.boldify(msg.author.tag) + '. All your data has been reset.', { guild: msg.guild }));
      } else {
        await sender.reply('Nice shot, you just dealt ' + damage + ' damage to ' + StringUtil.boldify(args.member.user.tag) + '.');
        Try(Sender.send(args.member.user, StringUtil.boldify(msg.author.tag) + ' tried to kill you, but nigga you *AH, HA, HA, HA, STAYIN\' ALIVE*. -' + damage + ' health. Current health: ' + newHealth, { guild: msg.guild }));
      }
    } else {
      await sender.reply('The nigga fucking dodged the bullet, literally. What in the sac of nuts.');
      Try(Sender.send(args.member.user, 'This fatass ' + StringUtil.boldify(msg.author.tag) + ' just tried to shoot you and fucking **MISSED** LMFAO :joy: :joy:! What a fat retard ammirite, up top!', { guild: msg.guild }));
    }

    return db.items.modifyInventory(msg.author.id, msg.guild.id, msg.bullet.data_id, -1);
  }
}

module.exports = new Shoot();
