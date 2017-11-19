const db = require('../database');

class HealthService {
  async reduceDamage(memberId, guildId, damage) {
    const armor = await db.items.armour(memberId, guildId);
    const left = 1 - armor.reduce((a, b) => a + b.damage_reduction, 0);

    return Math.round(damage * left);
  }
}

module.exports = new HealthService();
