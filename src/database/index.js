const pg = require('pg');
const credentials = require('../credentials.json');

class Database extends pg.Client {
  async any(table, condition, ...values) {
    return (await this.query('SELECT 1 FROM' + table + condition + ';', ...values)).rowCount !== 0;
  }

  async insert(table, columns, ...values) {
    return this.query('SELECT 1 FROM' + table + '(' + columns + ');', ...values);
  }

  async getUser(userId, guildId, columns = '*') {
    const result = await this.query('SELECT ' + columns + ' FROM users WHERE("userId", "guildId") = ($1, $2);', [userId, guildId]);

    return result.rowCount === 0 ? (await this.query('INSERT INTO users("userId", "guildId") VALUES($1, $2) RETURNING ' + columns + ';', [userId, guildId])).rows[0] : result.rows[0];
  }

  async getGuild(guildId, columns = '*') {
    const result = await this.query('SELECT ' + columns + ' FROM guilds WHERE "guildId" = $1', [guildId]);

    return result.rowCount === 0 ? (await this.query('INSERT INTO guilds("guildId") VALUES($1) RETURNING ' + columns + ';', [guildId])).rows[0] : result.rows[0];
  }

  addRank(roleId, guildId, cashRequired) {
    return this.query('INSERT INTO ranks("roleId", "guildId", "cashRequired") VALUES($1, $2, $3)', [roleId, guildId, cashRequired]);
  }

  removeRank(roleId, guildId) {
    return this.query('DELETE FROM ranks WHERE "roleId" = $1;', [roleId]);
  }

  modifyCash(userId, guildId, change) {
    return this.query('INSERT INTO users("userId", "guildId", cash) VALUES($1, $2, $3) ON CONFLICT ON CONSTRAINT "userPk" DO UPDATE SET cash = users.cash + $3;', [userId, guildId, change]);
  }

  async modifyCashR(userId, guildId, change) {
    return (await this.query('INSERT INTO users("userId", "guildId", cash) VALUES($1, $2, $3) ON CONFLICT ON CONSTRAINT "userPk" DO UPDATE SET cash = users.cash + $3 RETURNING cash;', [userId, guildId, change])).rows[0].cash;
  }

  deleteUser(userId, guildId) {
    return this.query('DELETE FROM users WHERE("userId", "guildId") = ($1, $2);', [userId, guildId]);
  }

  deleteUsers(guildId) {
    return this.query('DELETE FROM users WHERE "guildId" = $1;', [guildId]);
  }

  upsertUser(userId, guildId, column, value) {
    return this.query('INSERT INTO users("userId", "guildId", ' + column + ') VALUES($1, $2, $3) ON CONFLICT ON CONSTRAINT "userPk" DO UPDATE SET ' + column + ' = $3;', [userId, guildId, value]);
  }

  upsertGuild(guildId, column, value) {
    return this.query('INSERT INTO guilds("guildId", ' + column + ') VALUES($1, $2) ON CONFLIT ON CONSTRAINT "guildPk" DO UPDATE SET ' + column + ' = $2;', [guildId, value]);
  }
}

module.exports = new Database(credentials.postgresqlConnection);
