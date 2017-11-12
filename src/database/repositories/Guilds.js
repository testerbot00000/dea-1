class Guilds {
  constructor(db) {
    this.db = db;
  }

  async getGuild(guildId, columns) {
    const result = await this.db.select('guilds', columns, '"guildId" = $1', guildId);

    return result.rowCount === 0 ? (await this.db.query('INSERT INTO guilds("guildId") VALUES($1) RETURNING ' + columns + ';', [guildId])).rows[0] : result.rows[0];
  }

  upsertGuild(guildId, column, value) {
    return this.db.query('INSERT INTO guilds("guildId", "' + column + '") VALUES($1, $2) ON CONFLIT ON CONSTRAINT "guildPk" DO UPDATE SET "' + column + '" = $2;', [guildId, value]);
  }
}

module.exports = Guilds;
