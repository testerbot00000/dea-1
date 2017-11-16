const RankService = require('../../services/RankService.js');
const Decimal = require('decimal.js');

class Users {
  constructor(db) {
    this.db = db;
  }

  async getUser(userId, guildId, columns) {
    // TODO: Better select or insert query.
    const result = await this.db.pool.query('INSERT INTO users(user_id, guild_id) VALUES($1, $2) ON CONFLICT ON CONSTRAINT user_pk DO UPDATE SET cash = users.cash RETURNING ' + columns + ';', [userId, guildId]);

    if (result.rows[0].cash !== undefined) {
      result.rows[0].cash = new Decimal(result.rows[0].cash);
    }

    return result.rows[0];
  }

  async modifyCash(member, change) {
    const result = await this.db.pool.query('INSERT INTO users(user_id, guild_id, cash) VALUES($1, $2, $3) ON CONFLICT ON CONSTRAINT user_pk DO UPDATE SET cash = users.cash + $3 RETURNING cash;', [member.id, member.guild.id, change]);

    const parsedCash = new Decimal(result.rows[0].cash);

    this.db.select('ranks', 'role_id, cash', 'guild_id = $1', [member.guild.id])
      .then((res) => {
        RankService.handle(member, parsedCash, res.rows);
      });

    return parsedCash;
  }
}

module.exports = Users;
