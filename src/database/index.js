const pg = require('pg');
const Guilds = require('./repositories/Guilds.js');
const Ranks = require('./repositories/Ranks.js');
const Users = require('./repositories/Users.js');
const StringUtil = require('../utility/StringUtil.js');
const credentials = require('../credentials.json');

class Database extends pg.Client {
  constructor(connection) {
    super(connection);

    this.guilds = new Guilds(this);
    this.ranks = new Ranks(this);
    this.users = new Users(this);
  }

  async any(table, condition, ...values) {
    return (await this.query('SELECT 1 FROM ' + table + ' WHERE ' + condition + ';', values)).rowCount !== 0;
  }

  insert(table, columns, ...values) {
    return this.query('INSERT INTO ' + table + '(' + columns + ') VALUES( ' + StringUtil.insertValues(values) + ');', values);
  }

  select(table, columns, condition, ...values) {
    return this.query('SELECT ' + columns + ' FROM ' + table + ' WHERE ' + condition + ';', values);
  }

  delete(table, condition, ...values) {
    return this.query('DELETE FROM ' + table + ' WHERE ' + condition + ';', values);
  }
}

module.exports = new Database(credentials.postgresqlConnection);
