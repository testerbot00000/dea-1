const db = require('../database');
const client = require('../structures/client.js');
const Logger = require('../utility/Logger.js');

client.on('guildMemberUpdate', (oldMember, newMember) => {
  (async function () {
    if (newMember.guild.member(newMember) === null) {
      return;
    }

    const dbGuild = await db.guildRepo.getGuild(newMember.guild.id);

    if (dbGuild.roles.muted !== null && oldMember.roles.has(dbGuild.roles.muted) === true && newMember.roles.has(dbGuild.roles.muted) === false && await db.muteRepo.anyMute(newMember.id, newMember.guild.id)) {
      return db.muteRepo.deleteMute(newMember.id, newMember.guild.id);
    }
  })()
    .catch((err) => Logger.handleError(err));
});
