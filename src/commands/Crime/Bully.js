const patron = require('patron.js');
const db = require('../../database');
const Constants = require('../../utility/Constants.js');
const NoSelf = require('../../preconditions/NoSelf.js');
const CashRequired = require('../../preconditions/CashRequired.js');
const NoModerator = require('../../preconditions/NoModerator.js');

class Bully extends patron.Command {
  constructor() {
    super({
      names: ['bully'],
      groupName: 'crime',
      description: 'Bully any user by changing their nickname.',
      preconditions: [new CashRequired(Constants.config.misc.bullyCost)],
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'JohnnyBoy#7052',
          preconditions: [NoSelf, NoModerator]
        }),
        new patron.Argument({
          name: 'nickname',
          key: 'nickname',
          type: 'string',
          example: 'Fat ass',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    if (args.nickname.length > 32) {
      return msg.createErrorReply('You cannot bully someone\'s nickname to over 32 characters.');
    }

    await args.member.setNickname(args.nickname);
    await db.userRepo.modifyCash(msg.dbGuild, msg.member, -Constants.config.misc.bullyCost);

    return msg.createReply('You just ***BULLIED*** ' + args.member.user.tag.boldify() + ' to ' + args.nickname.boldify() + '.');
  }
}

module.exports = new Bully();
