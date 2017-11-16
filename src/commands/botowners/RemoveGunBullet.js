const patron = require('patron.js');
const db = require('../../database');
const StringUtil = require('../../utility/StringUtil.js');

class RemoveGunBullet extends patron.Command {
  constructor() {
    super({
      names: ['removegunbullet', 'deletegunbullet'],
      groupName: 'botowners',
      description: 'Disallow the use of a type of ammunition by a gun.',
      args: [
        new patron.Argument({
          name: 'gun',
          key: 'gun',
          type: 'gun',
          example: 'glock'
        }),
        new patron.Argument({
          name: 'bullet',
          key: 'bullet',
          type: 'bullet',
          example: 'pistol ammunition',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args, sender) {
    await db.delete('gun_bullets', '(gun_id, bullet_id) = ($1, $2)', [args.gun.id, args.bullet.id]);
    return sender.reply('You have successfully removed ' + StringUtil.capitializeWords(args.bullet.name) + ' from the ' + StringUtil.capitializeWords(args.gun.name) + '\'s usable ammunition.');
  }
}

module.exports = new RemoveGunBullet();
