class User {
  constructor(userId, guildId) {
    this.userId = userId;
    this.guildId = guildId;
    this.cash = 0;
    this.points = 0;
    this.referredBy = null;
    this.referralCode = null;
    this.commands = [];
    this.sponsorExpiresAt = null;
  }
}

module.exports = User;
