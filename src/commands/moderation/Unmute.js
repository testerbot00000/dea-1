const patron = require('patron.js');
const util = require('../../utility');
const Constants = require('../../utility/Constants.js');
const ModerationService = require('../../services/ModerationService.js');

class Unmute extends patron.Command {
  constructor() {
    super({
      names: ['unmute'],
      groupName: 'moderation',
      description: 'Unmute any member.',
      botPermissions: ['MANAGE_ROLES'],
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: '"Jimmy Johnson#3636"'
        }),
        new patron.Argument({
          name: 'reason',
          key: 'reason',
          type: 'string',
          defaultValue: '',
          example: 'bribed me 50k',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    if (msg.dbGuild.roles.muted === null) {
      return util.Messenger.replyError(msg.channel, msg.author, 'You must set a muted role with the `' + Constants.data.misc.prefix + 'setmute @Role` command before you can unmute users.');
    } else if (args.member.roles.has(msg.dbGuild.roles.muted) === false) {
      return util.Messenger.replyError(msg.channel, msg.author, 'This user is not muted.');
    }

    const role = msg.guild.roles.get(msg.dbGuild.roles.muted);

    if (role === undefined) {
      return util.Messenger.replyError(msg.channel, msg.author, 'The set muted role has been deleted. Please set a new one with the `' + Constants.data.misc.prefix + 'setmute Role` command.');
    }

    await args.member.removeRole(role);
    await util.Messenger.reply(msg.channel, msg.author, 'You have successfully unmuted ' + args.member.user.tag + '.');
    await ModerationService.tryInformUser(msg.guild, msg.author, 'unmuted', args.member.user, args.reason);
    return ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Unmute', Constants.data.colors.unmute, args.reason, msg.author, args.member.user);
  }
}

module.exports = new Unmute();
