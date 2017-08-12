const db = require('../database');
const Constants = require('../utility/Constants.js');
const util = require('../utility');

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

      if (Constants.config.lottery.odds >= util.Random.roll()) {
        const winnings = util.Random.nextFloat(Constants.config.lottery.min, Constants.config.lottery.max);
        await db.userRepo.modifyCash(msg.dbGuild, msg.member, winnings);
        return util.Messenger.tryReply(msg.channel, msg.author, util.StringUtil.format(util.Random.arrayElement(Constants.data.messages.lottery), util.NumberUtil.USD(winnings)));
      }

      return db.userRepo.modifyCash(msg.dbGuild, msg.member, Constants.config.misc.cashPerMessage);
    }
  }
}

module.exports = new ChatService();
