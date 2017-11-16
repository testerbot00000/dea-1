class RankService {
  handle(member, cash, ranks) {
    if (member.guild.me.hasPermission('MANAGE_ROLES') === false) {
      return;
    }

    const highsetRolePosition = member.guild.me.highestRole.position;
    const rolesToAdd = [];
    const rolesToRemove = [];

    for (let i = 0; i < ranks.length; i++) {
      const role = member.guild.roles.get(ranks[i].role_id);

      if (role !== undefined && role.position < highsetRolePosition) {
        if (member.roles.has(role.id) === false) {
          if (cash.gte(ranks[i].cash)) {
            rolesToAdd.push(role);
          }
        } else if (cash.lt(ranks[i].cash)) {
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

  getRank(member, cash, sortedRanks) {
    for (let i = 0; i < sortedRanks.length; i++) {
      if (cash.gte(sortedRanks[i].cash)) {
        var rankId = sortedRanks[i].role_id;
      }
    }

    return member.guild.roles.get(rankId);
  }
}

module.exports = new RankService();
