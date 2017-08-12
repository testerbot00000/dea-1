const patron = require('patron.js');

class Ranks extends patron.Command {
  constructor() {
    super({
      names: ['ranks'],
      groupName: 'general',
      description: 'View all ranks in this guild.'
    });
  }

  async run(msg, args) {
    if (msg.dbGuild.roles.rank.length === 0) {
      return msg.createErrorReply('There are no rank roles yet!');
    }

    const sortedRanks = msg.dbGuild.roles.rank.sort((a, b) => a.cashRequired - b.cashRequired);

    let description = '';
    for (let i = 0; i < sortedRanks.length; i++) {
      const rank = msg.guild.roles.find((x) => x.id === sortedRanks[i].id);

      description+= rank + ': ' + sortedRanks[i].cashRequired.USD() + '\n';
    }

    return msg.channel.createMessage(description, { title: 'Ranks' });
  }
}

module.exports = new Ranks();
