const db = require('../database');
const Constants = require('../utility/Constants.js');
const Random = require('../utility/Random.js');

class ChatService {
  constructor() {
    this.messages = new Map();
  }

  async applyCash(msg) {
    const lastMessage = this.messages.get(msg.author.id);
    const isMessageCooldownOver = lastMessage === undefined || Date.now() - lastMessage > Constants.config.misc.messageCooldown;
    const isLongEnough = msg.content.length >= Constants.config.misc.minCharLength;

    if (isMessageCooldownOver && isLongEnough) {
      this.messages.set(msg.author.id, Date.now());

      if (Constants.config.lottery.odds >= Random.roll()) {
        const winnings = Random.nextFloat(Constants.config.lottery.min, Constants.config.lottery.max);
        await db.userRepo.modifyCash(msg.dbGuild, msg.member, winnings);
        return msg.tryCreateReply(Random.arrayElement(Constants.data.messages.lottery).format(winnings.USD()));
      }

      return db.userRepo.modifyCash(msg.dbGuild, msg.member, Constants.config.misc.cashPerMessage);
    }
  }
}

module.exports = new ChatService();
