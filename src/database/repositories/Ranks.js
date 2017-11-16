class Ranks {
  constructor(db) {
    this.db = db;
  }

  upsertRank(roleId, guildId, cash) {
    return this.db.pool.query('INSERT INTO ranks(role_id, guild_id, cash) VALUES($1, $2, $3) ON CONFLICT ON CONSTRAINT rank_pk DO UPDATE SET cash = $3;', [roleId, guildId, cash]);
  }
}

module.exports = Ranks;
