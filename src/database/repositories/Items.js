class Items {
  constructor(db) {
    this.db = db;
  }

  async crateItems(crateId) {
    const result = await this.db.pool.query('SELECT d.name, d.crate_odds, d.id FROM crate_items i JOIN crate_item_data d ON d.id = i.item_id WHERE i.crate_id = $1;', [crateId]);

    return result.rows;
  }

  async modifyInventory(userId, guildId, dataId, quantity) {
    const result = await this.db.pool.query('INSERT INTO items(user_id, guild_id, data_id, quantity) VALUES($1, $2, $3, $4) ON CONFLICT ON CONSTRAINT item_pk DO UPDATE SET quantity = items.quantity + $4 RETURNING quantity;', [userId, guildId, dataId, quantity]);

    if (result.rows[0].quantity <= 0) {
      await this.db.delete('items', '(user_id, guild_id, data_id) = ($1, $2, $3)', [userId, guildId, dataId]);
      return 0;
    }

    return result.rows[0].quantity;
  }

  async inventory(userId, guildId) {
    const result = await this.db.pool.query('SELECT d.name, quantity FROM items i JOIN item_data d ON d.id = i.data_id WHERE (user_id, guild_id) = ($1, $2);', [userId, guildId]);

    return result.rows;
  }
}

module.exports = Items;
