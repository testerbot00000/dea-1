const patron = require('patron.js');
const StringUtil = require('../../utility/StringUtil.js');
const Constants = require('../../utility/Constants.js');

class Modules extends patron.Command {
  constructor() {
    super({
      names: ['modules', 'module', 'groups', 'group'],
      groupName: 'system',
      description: 'View all modules or a modules information.',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'module',
          key: 'module',
          type: 'string',
          defaultValue: '',
          example: 'administrator'
        })
      ]
    });
  }

  async run(msg, args, sender) {
    if (StringUtil.isNullOrWhiteSpace(args.module) === true) {
      let message = '';

      for (let i = 0; i < msg.client.registry.groups.length; i++) {
        message += StringUtil.upperFirstChar(msg.client.registry.groups[i].name) + ', ';
      }

      return sender.reply(message.substring(0, message.length - 2) + '.');
    } else {
      const lowerInput = args.module.toLowerCase();

      const module = msg.client.registry.groups.find((x) => x.name === lowerInput);

      if (module === undefined) {
        return sender.reply('This module does not exist.', { color: Constants.errorColor });
      }

      let message = '**Description**: ' + module.description + '\n**Commands:** ';

      for (let i = 0; i < module.commands.length; i++) {
        message += StringUtil.upperFirstChar(module.commands[i].names[0]) + ', ';
      }

      return sender.send(message.substring(0, message.length - 2) + '.', { title: StringUtil.upperFirstChar(module.name) });
    }
  }
}

module.exports = new Modules();
