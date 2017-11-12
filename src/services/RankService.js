const db = require('../database');

class RankService {
  async handle(memberId, guildId, member) {
    await member.guild.fetchMember(member.client.user);
    const ranks = (await db.query('SELECT "roleId" FROM ranks'));

    if (member.guild.me.hasPermission('MANAGE_ROLES') === false) {
      return;
    }

    const highsetRolePosition = member.guild.me.highestRole.position;
    const rolesToAdd = [];
    const rolesToRemove = [];

    for (const rank of ranks) {
      const role = member.guild.roles.get(rank.roleId);

      if (role !== undefined && role.position < highsetRolePosition) {
        if (member.roles.has(role.id) === false) {
          if (dbUser.cash >= rank.cashRequired) {
            rolesToAdd.push(role);
          }
        } else if (dbUser.cash < rank.cashRequired) {
          rolesToRemove.push(role);
        }
      }
    }

    if (rolesToAdd.length > 0) {
      return member.addRoles(rolesToAdd);
    } else if (rolesToRemove.length > 0) {
      return member.removeRoles(rolesToRemove);
    }
  }

  async getRank(userId, guildId, guild) {
    const sortedRanks = (await db.query('SELECT "roleId", "cashRequired" FROM ranks ORDER BY "cashRequired" ASC;')).rows;
    const dbUser = await db.getUser(userId, guildId);

    for (let i = 0; i < sortedRanks.length; i++) {
      if (dbUser.cash >= sortedRanks[i].cashRequired) {
        var role = await guild.roles.get(sortedRanks[i].roleId);
      }
    }

    return role;
  }
}

module.exports = new RankService();
