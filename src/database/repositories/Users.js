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

  async modifyHealth(memberId, guildId, change, killer = null) {
    const result = await this.db.pool.query('INSERT INTO users(user_id, guild_id, health) VALUES($1, $2, $3) ON CONFLICT ON CONSTRAINT user_pk DO UPDATE SET health = users.health + $3 RETURNING health;', [memberId, guildId, change]);

    if (result.rows[0].health <= 0 && killer !== null) {
      const inventory = await this.db.pool.query('DELETE FROM items WHERE (user_id, guild_id) = ($1, $2) RETURNING data_id, quantity;', [memberId, guildId]);
      const cash = await this.db.delete('users', '(user_id, guild_id) = ($1, $2) RETURNING cash', [memberId, guildId]);

      for (let i = 0; i < inventory.rows.length; i++) {
        await this.db.items.modifyInventory(killer.id, guildId, inventory.rows[i].data_id, inventory.rows[i].quantity);
      }

      await this.db.users.modifyCash(killer, cash.rows[0].cash);

      return 0;
    }

    return result.rows[0].health;
  }
}

module.exports = Users;
