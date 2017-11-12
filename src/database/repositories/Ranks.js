class Ranks {
  constructor(db) {
    this.db = db;
  }

  upsertRank(roleId, guildId, column, value) {
    return this.db.query('INSERT INTO ranks("roleId", "guildId", "' + column + '") VALUES($1, $2, $3) ON CONFLICT ON CONSTRAINT "rankPk" DO UPDATE SET "' + column + '" = $3;', [roleId, guildId, value]);
  }
}

module.exports = Ranks;
