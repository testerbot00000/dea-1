const pg = require('pg');
const Items = require('./repositories/Items.js');
const Ranks = require('./repositories/Ranks.js');
const Users = require('./repositories/Users.js');
const StringUtil = require('../utility/StringUtil.js');
const credentials = require('../credentials.json');

class Database {
  constructor(connection) {
    this.pool = new pg.Pool(connection);
    this.items = new Items(this);
    this.ranks = new Ranks(this);
    this.users = new Users(this);
  }

  async any(table, condition = null, values = []) {
    return (await this.pool.query('SELECT 1 FROM ' + table + (condition === null ? '' : ' WHERE ' + condition) + ';', values)).rowCount !== 0;
  }

  set(table, update, condition = null, values = []) {
    return this.pool.query('UPDATE ' + table + ' SET ' + update + (condition === null ? '' : ' WHERE ' + condition) + ';', values);
  }

  insert(table, columns, values) {
    return this.pool.query('INSERT INTO ' + table + '(' + columns + ') VALUES(' + StringUtil.insertValues(values) + ');', values);
  }

  select(table, columns, condition = null, values = [], sort = null, limit = null) {
    return this.pool.query('SELECT ' + columns + ' FROM ' + table + (condition === null ? '' : ' WHERE ' + condition) + (sort === null ? '' : ' ORDER BY ' + sort) + (limit === null ? '' : ' LIMIT ' + limit) + ';', values);
  }

  delete(table, condition = null, values = []) {
    return this.pool.query('DELETE FROM ' + table + (condition === null ? '' : ' WHERE ' + condition) + ';', values);
  }
}

module.exports = new Database(credentials.postgresqlConnection);
