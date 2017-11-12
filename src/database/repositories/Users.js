const RankService = require('../../services/RankService.js');
const Decimal = require('decimal.js');

class Users {
  constructor(db) {
    this.db = db;
  }

  async getUser(userId, guildId, columns) {
    let result = await this.db.select('users', columns, '("userId", "guildId") = ($1, $2)', userId, guildId);

    if (result.rowCount === 0) {
      result = await this.db.query('INSERT INTO users("userId", "guildId") VALUES($1, $2) RETURNING ' + columns + ';', [userId, guildId]);
    }

    if (result.rows[0].cash !== undefined) {
      result.rows[0].cash = new Decimal(result.rows[0].cash);
    }

    return result.rows[0];
  }

  async modifyCash(member, change) {
    const result = await this.db.query('INSERT INTO users("userId", "guildId", cash) VALUES($1, $2, $3) ON CONFLICT ON CONSTRAINT "userPk" DO UPDATE SET cash = users.cash + $3 RETURNING cash;', [member.id, member.guild.id, change]);

    const parsedCash = new Decimal(result.rows[0].cash);

    RankService.handle(member, parsedCash, (await this.db.select('ranks', '"roleId", "cashRequired"', '"guildId" = $1', member.guild.id)).rows);

    return parsedCash;
  }

  upsertUser(userId, guildId, column, value) {
    return this.db.query('INSERT INTO users("userId", "guildId", "' + column + '") VALUES($1, $2, $3) ON CONFLICT ON CONSTRAINT "userPk" DO UPDATE SET "' + column + '" = $3;', [userId, guildId, value]);
  }
}

module.exports = Users;
