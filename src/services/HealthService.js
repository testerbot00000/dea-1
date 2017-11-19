const db = require('../database');

class HealthService {
  async reduceDamage(memberId, guildId, damage) {
    // TODO Reduce all the armor damage reduction into one var.
    const armour = await db.items.armour(memberId, guildId);
    let reduce = damage;

    if (armour.length !== 0) {
      for (let i = 0; i < armour.length; i++) {
        reduce *= 1 - armour[i].damage_reduction;
      }
    }

    return Math.round(reduce);
  }
}

module.exports = new HealthService();
