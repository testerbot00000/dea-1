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

      let messageMultiplier = 1;
      let lotteryOddsMultiplier = 1;

      if (msg.member.roles.has(msg.dbGuild.roles.sponsor) === true) {
        messageMultiplier = Constants.config.sponsorship.messageMultiplier;
        lotteryOddsMultiplier = Constants.config.sponsorship.lotteryOddsMultiplier;
      } else if (msg.member.roles.has(msg.dbGuild.roles.top50) === true) {
        messageMultiplier = Constants.config.top50.messageMultiplier;
      }

      if (Constants.config.lottery.odds * lotteryOddsMultiplier >= Random.roll()) {
        const winnings = Random.nextFloat(Constants.config.lottery.min, Constants.config.lottery.max);
        await db.userRepo.modifyCash(msg.dbGuild, msg.member, winnings);
        return msg.tryCreateReply(Random.arrayElement(Constants.data.messages.lottery).format(winnings.USD()));
      }

      return db.userRepo.modifyCash(msg.dbGuild, msg.member, Constants.config.misc.cashPerMessage * messageMultiplier);
    }
  }
}

module.exports = new ChatService();
