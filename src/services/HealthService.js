const db = require('../database');

class HealthService {
  async reduceDamage(memberId, guildId, damage) {
    const armour = await db.items.getUserArmour(memberId, guildId);
    let reduce = damage;

    if (armour.length !== 0) {
      for (let i = 0; i < armour.length; i++) {
        reduce *= (100 - armour[i].damage_reduction) / 100;
      }
    }
    return reduce;
  }
}

module.exports = new HealthService();
