const patron = require('patron.js');
const db = require('../../database');
const NumberUtil = require('../../utility/NumberUtil.js');
const Constants = require('../../utility/Constants.js');
const NoSelf = require('../../preconditions/NoSelf.js');
const NoSponsor = require('../../preconditions/NoSponsor.js');
const MaximumLength = require('../../preconditions/MaximumLength.js');
const NoModerator = require('../../preconditions/NoModerator.js');
const Purcahsed = require('../../preconditions/Purchased.js');

class Bully extends patron.Command {
  constructor() {
    super({
      names: ['bully'],
      groupName: 'crime',
      description: 'Bully any user by changing their nickname.',
      coooldown: Constants.config.bully.cooldown,
      preconditions: [Purcahsed],
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: '"Johnny Boy#7052"',
          preconditions: [NoSelf, NoModerator, NoSponsor]
        }),
        new patron.Argument({
          name: 'nickname',
          key: 'nickname',
          type: 'string',
          example: 'ass hat',
          preconditions: [new MaximumLength(Constants.config.bully.maxLength)],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    if (msg.member.roles.has(msg.dbGuild.roles.sponsor) === false) {
      if (NumberUtil.realValue(msg.dbUser.cash) < Constants.config.bully.cost) {
        return msg.createErrorReply('You do not have ' + Constants.config.bully.cost.USD() + '. Balance: ' + NumberUtil.format(msg.dbUser.cash) + '.');
      }

      await db.userRepo.modifyCash(msg.dbGuild, msg.member, -Constants.config.bully.cost);
    }

    await args.member.setNickname(args.nickname);

    return msg.createReply('You just __BULLIED__ ' + args.member.user.tag.boldify() + ' to ' + args.nickname.boldify() + '.');
  }
}

module.exports = new Bully();
