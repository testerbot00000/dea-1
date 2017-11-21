const patron = require('patron.js');
const db = require('../../database');
const Random = require('../../utility/Random.js');
const Constants = require('../../utility/Constants.js');
const USD = require('../../utility/USD.js');
const Sender = require('../../utility/Sender.js');
const StringUtil = require('../../utility/StringUtil.js');
const HealthService = require('../../services/HealthService.js');
const Try = require('../../utility/Try.js');

class Stab extends patron.Command {
  constructor() {
    super({
      names: ['stab'],
      groupName: 'crime',
      description: 'Stab a user with specified knife.',
      cooldown: Constants.stab.cooldown,
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          preconditions: ['noself'],
          example: 'johnsucc#0059'
        }),
        new patron.Argument({
          name: 'knife',
          key: 'knife',
          type: 'knife',
          example: 'karambit',
          preconditions: ['ownitem'],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    const dbUser = await db.users.getUser(args.member.id, msg.guild.id, 'cash');
    const damage = await HealthService.reduceDamage(args.member.id, msg.guild.id, args.knife.damage);
    const roll = Random.nextInt(1, 101);

    if (roll <= args.knife.accuracy) {
      const newHealth = await db.users.modifyHealth(args.member.id, msg.guild.id, -damage, msg.member);

      if (newHealth === 0) {
        await sender.reply('Woah, you just killed ' + StringUtil.boldify(args.member.user.tag) + '. You just earned ' + USD(dbUser.cash) + ' **AND** their inventory, congrats.');
        return Try(Sender.send(args.member.user, 'Unfortunately, you were killed by ' + StringUtil.boldify(msg.author.tag) + '. All your data has been reset.', { guild: msg.guild }));
      }

      await sender.reply('You stabbed that nigga in the heart, you just dealt ' + damage + ' damage to ' + StringUtil.boldify(args.member.user.tag) + '.');
      return Try(Sender.send(args.member.user, StringUtil.boldify(msg.author.tag) + ' tried to kill you, but nigga you *AH, HA, HA, HA, STAYIN\' ALIVE*. -' + damage + ' health. Current health: ' + newHealth, { guild: msg.guild }));
    }

    await sender.reply('This nigga actually did some acrobatics shit and bounced out of the way before you stabbed him.');
    return Try(Sender.send(args.member.user, 'This fucking faggot ' + StringUtil.boldify(msg.author.tag) + ' tried to stab you and you fucking weaved his shit :joy: :joy: WHAT A SLOW BASTARD AMIRITE!', { guild: msg.guild }));
  }
}

module.exports = new Stab();
