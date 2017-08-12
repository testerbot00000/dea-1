const patron = require('patron.js');
const util = require('../../utility');
const Constants = require('../../utility/Constants.js');

class Help extends patron.Command {
  constructor() {
    super({
      names: ['help', 'commands', 'command', 'cmd', 'cmds', 'support', 'docs'],
      groupName: 'system',
      description: 'All command information.',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'command',
          key: 'command',
          type: 'string',
          defaultValue: '',
          example: 'money'
        })
      ]
    });
  }

  async run(msg, args) {
    if (util.StringUtil.isNullOrWhiteSpace(args.command)) {
      await util.Messenger.DM(msg.author,
        'DEA is **THE** cleanest bot around, and you can have it in **YOUR** server simply by clicking here: ' + Constants.data.links.botInvite + '.\n\nFor all information about command usage and setup on your Discord Sever, view the official documentation: ' + Constants.data.links.documentation + '.\n\nThe `' + Constants.data.misc.prefix + 'help <command>` command may be used for view the usage and an example of any command.\n\nIf you have **ANY** questions, you may join the **Official DEA Discord Server:** ' + Constants.data.links.serverInvite + ' for instant support along with a great community.');

      if (msg.channel.type !== 'dm') {
        return util.Messenger.reply(msg.channel, msg.author, 'You have been DMed with all the command information!');
      }
    } else {
      args.command = args.command.startsWith(Constants.data.misc.prefix) ? args.command.slice(Constants.data.misc.prefix.length) : args.command;

      const lowerInput = args.command.toLowerCase();

      const command = msg.client.registry.commands.find((x) => x.names.some((y) => y === lowerInput));

      if (command === undefined) {
        return util.Messenger.replyError(msg.channel, msg.author, 'This command does not exist.');
      }

      return util.Messenger.send(msg.channel, '**Description:** ' + command.description + '\n**Usage:** `' + Constants.data.misc.prefix + command.getUsage() + '`\n**Example:** `' + Constants.data.misc.prefix + command.getExample() + '`', util.StringUtil.upperFirstChar(command.names[0]));
    }
  }
}

module.exports = new Help();
