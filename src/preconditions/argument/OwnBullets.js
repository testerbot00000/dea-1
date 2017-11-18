const patron = require('patron.js');
const db = require('../../database');
const StringUtil = require('../../utility/StringUtil.js');

class OwnBullets extends patron.ArgumentPrecondition {
  constructor() {
    super({
      name: 'ownbullets'
    });
  }

  async run(command, msg, argument, args, value) {
    const bullet = await db.pool.query('SELECT data_id, b.damage FROM items i JOIN gun_bullets g ON g.bullet_id = i.data_id JOIN bullet_data b ON b.id = i.data_id WHERE (g.gun_id, i.user_id, i.guild_id) = ($1, $2, $3) ORDER BY b.damage DESC;', [value.id, msg.author.id, msg.guild.id]);

    if (bullet.rowCount === 1) {
      msg.bullet = bullet.rows[0];
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'You do not own any bullets suitable for the ' + StringUtil.capitializeWords(value.name) + '.');
  }
}

module.exports = new OwnBullets();
