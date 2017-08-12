const patron = require('patron.js');
const util = require('../../utility');
const Constants = require('../../utility/Constants.js');
const ModerationService = require('../../services/ModerationService.js');
const NoModerator = require('../../preconditions/NoModerator.js');

class Warn extends patron.Command {
  constructor() {
    super({
      names: ['warn'],
      groupName: 'moderation',
      description: 'Warn any member.',
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: '"Killa Nigga#2222"',
          preconditions: [NoModerator]
        }),
        new patron.Argument({
          name: 'reason',
          key: 'reason',
          type: 'string',
          example: 'stop jerking off in public like cmon man',
          defaultValue: '',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    await util.Messenger.reply(msg.channel, msg.author, 'You have successfully warned ' + args.member.user.tag + '.');
    await ModerationService.tryInformUser(msg.guild, msg.author, 'warned', args.member.user, args.reason);
    return ModerationService.tryModLog(msg.dbGuild, msg.guild, 'Warn', Constants.data.colors.warn, args.reason, msg.author, args.member.user);
  }
}

module.exports = new Warn();
