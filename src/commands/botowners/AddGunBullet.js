const patron = require('patron.js');
const db = require('../../database');
const StringUtil = require('../../utility/StringUtil.js');

class AddGunBullet extends patron.Command {
  constructor() {
    super({
      names: ['addgunbullet', 'insertgunbullet'],
      groupName: 'botowners',
      description: 'Allow a gun to use a certain type of ammunition.',
      args: [
        new patron.Argument({
          name: 'gun',
          key: 'gun',
          type: 'gun',
          example: 'intervention'
        }),
        new patron.Argument({
          name: 'bullet',
          key: 'bullet',
          type: 'bullet',
          example: 'sniper ammunition',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    await db.insert('gun_bullets', 'gun_id, bullet_id', [args.gun.id, args.bullet.id]);
    return sender.reply('You have successfully added ' + StringUtil.capitializeWords(args.bullet.names[0]) + ' to the ' + StringUtil.capitializeWords(args.gun.names[0]) + '\'s usable ammunition.');
  }
}

module.exports = new AddGunBullet();
