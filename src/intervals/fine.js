const db = require('../database');
const Random = require('../utility/Random.js');
const NumberUtil = require('../utility/NumberUtil.js');
const Constants = require('../utility/Constants.js');

module.exports = async (client) => {
  client.setInterval(async () => {
    const users = await db.userRepo.findMany({ cash: { $gte: Constants.config.fine.minRich * 100 } });

    for (const dbUser of users) {
      const dbGuild = await db.guildRepo.getGuild(dbUser.guildId);

      if (dbGuild.settings.fines === false) {
        continue;
      }

      const additionalOdds = dbUser.cash * Constants.config.fine.additionalOdds;

      if (Constants.config.fine.odds + additionalOdds >= Random.roll()) {
        const user = client.users.get(dbUser.userId);

        const guild = client.guilds.get(dbUser.guildId);

        if (user === undefined || guild === undefined) {
          continue;
        }

        const member = guild.member(user);

        if (member === null) {
          continue;
        }

        const fine = NumberUtil.realValue(dbUser.cash) * Constants.config.fine.cut;

        await db.userRepo.modifyCash(dbGuild, member, -fine);

        await user.tryDM(Random.arrayElement(Constants.data.messages.fines).format(NumberUtil.USD(fine)), guild);
      }
    }
  }, Constants.config.intervals.fine);
};
