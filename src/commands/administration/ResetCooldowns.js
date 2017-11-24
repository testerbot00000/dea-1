const patron = require('patron.js');
const StringUtil = require('../../utility/StringUtil.js');

class ResetCooldowns extends patron.Command {
  constructor() {
    super({
      names: ['resetcooldowns', 'deletecooldowns', 'resetcds', 'resetcd'],
      groupName: 'administration',
      description: 'Reset any member\'s cooldowns',
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'Big Willy#1234',
          defaultValue: patron.ArgumentDefault.Member,
          remainder: true
        })
      ]
    });
  }

  run(msg, args, sender) {
    const commands = msg.client.registry.commands.filter((command) => command.hasCooldown === true);

    for (let i = 0; i < commands.length; i++) {
      delete commands[i].cooldowns[args.member.id + '-' + msg.guild.id];
    }

    return sender.reply('You have successfully reset all of ' + (args.member.id === msg.author.id ? 'your' : StringUtil.boldify(args.member.user.tag) + '\'s') + ' cooldowns.');
  }
}

module.exports = new ResetCooldowns();
