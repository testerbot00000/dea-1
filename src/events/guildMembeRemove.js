const db = require('../database');

module.exports = (client) => {
  client.on('guildMemberRemove', async (member) => {
    const dbUser = await db.userRepo.getUser(member.id, member.guild.id);

    if (dbUser.probation === true) {
      await db.userRepo.updateUser(dbUser.referredBy, member.guild.id, { $inc: { points: -1 } });
      await db.userRepo.updateById(dbUser._id, { $unset: { probation: '' } });
      return client.tryDM(dbUser.referredBy, 'One point has been removed from your account as ' + member.user.tag.boldify() + ' has left shortly after using your referral code. If you refer users to join a server, at least get them to stay.', { guild: member.guild });
    }
  });
};
