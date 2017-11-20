const patron = require('patron.js');
const db = require('../../database');
const StringUtil = require('../../utility/StringUtil.js');

class OwnStrongestBullet extends patron.ArgumentPrecondition {
  constructor() {
    super({
      name: 'ownstrongestbullet'
    });
  }

  async run(command, msg, argument, args, value) {
    const bullet = await db.pool.query('SELECT data_id, d.damage FROM items i JOIN gun_bullets g ON g.bullet_id = i.data_id JOIN item_data d ON d.id = i.data_id WHERE (g.gun_id, i.user_id, i.guild_id) = ($1, $2, $3) ORDER BY d.damage DESC;', [value.id, msg.author.id, msg.guild.id]);

    if (bullet.rowCount === 1) {
      msg.bullet = bullet.rows[0];
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You do not own any bullets suitable for the ' + StringUtil.capitializeWords(value.names[0]) + '.');
  }
}

module.exports = new OwnStrongestBullet();
