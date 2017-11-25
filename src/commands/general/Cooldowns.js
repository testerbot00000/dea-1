const patron = require('patron.js');
const StringUtil = require('../../utility/StringUtil.js');
const NumberUtil = require('../../utility/NumberUtil.js');

class Cooldowns extends patron.Command {
  constructor() {
    super({
      names: ['cooldowns', 'cd'],
      groupName: 'general',
      description: 'View all command cooldowns of a member',
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'b1nzy#1337',
          defaultValue: patron.ArgumentDefault.Member,
          remainder: true
        })
      ]
    });
  }

  run(msg, args, sender) {
    const commands = msg.client.registry.commands.filter((command) => command.hasCooldown === true);
    let cooldowns = '';

    for (let i = 0; i < commands.length; i++) {
      const cooldown = commands[i].cooldowns[args.member.id + '-' + msg.guild.id];

      if (cooldown !== undefined) {
        const remaining = cooldown - Date.now();

        if (remaining > 0) {
          const formattedCooldown = NumberUtil.msToTime(remaining);

          cooldowns += StringUtil.boldify(StringUtil.upperFirstChar(commands[i].names[0])) + ': ' + NumberUtil.pad(formattedCooldown.hours, 2) + ':' + NumberUtil.pad(formattedCooldown.minutes, 2) + ':' + NumberUtil.pad(formattedCooldown.seconds, 2) + '\n';
        }
      }
    }

    if (StringUtil.isNullOrWhiteSpace(cooldowns) === true) {
      return sender.reply('All of ' + (args.member.id === msg.author.id ? 'your' : args.member.user.tag + '\'s') + ' commands are ready for use.');
    }

    return sender.send(cooldowns, { title: args.member.user.tag + '\'s Cooldowns' });
  }
}

module.exports = new Cooldowns();
