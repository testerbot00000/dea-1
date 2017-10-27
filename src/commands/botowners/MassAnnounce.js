const patron = require('patron.js');
const discord = require('discord.js');
const PromiseUtil = require('../../utility/PromiseUtil.js');

class MassAnnounce extends patron.Command {
  constructor() {
    super({
      names: ['massannounce'],
      groupName: 'botowners',
      description: 'Mass announce a message accross all guilds.',
      args: [
        new patron.Argument({
          name: 'message',
          key: 'message',
          type: 'string',
          example: 'me gusta gusta gusta gusta',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const sortedGuilds = msg.client.guilds.sort((a, b) => b.memberCount - a.memberCount);

    for (let i = 0; i < sortedGuilds.length; i++) {
      await PromiseUtil.delay(2500);

      const announcementsChannel = sortedGuilds[i].announcementsChannel;

      if (announcementsChannel !== undefined) {
        announcementsChannel.send(args.message)
          .catch(async (err) => {
            if ((err instanceof discord.DiscordApiError) === true && err.code === 429) {
              await PromiseUtil.delay(60000);
            }
          });
      }
    }
  }
}

module.exports = new MassAnnounce();
