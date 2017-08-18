const patron = require('patron.js');
const db = require('../../database');
const NoSelf = require('../../preconditions/NoSelf.js');
const NoTop10 = require('../../preconditions/NoTop10.js');
const NoSponsor = require('../../preconditions/NoSponsor.js');
const Top10 = require('../../preconditions/Top10.js');
const Constants = require('../../utility/Constants.js');

class Kill extends patron.Command {
  constructor() {
    super({
      names: ['kill', 'murder'],
      groupName: 'crime',
      description: 'Kill a nigga.',
      cooldown: Constants.config.kill.cooldown,
      preconditions: [Top10],
      args: [
        new patron.Argument({
          name: 'member',
          type: 'member',
          key: 'member',
          example: 'Black Billy#9834',
          preconditions: [NoSelf, NoSponsor, NoTop10],
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    await db.userRepo.deleteUser(args.member.id, msg.guild.id);
    await args.member.tryDM('Unfortunately, ' + msg.author.tag.boldify() + ' has killed you.');
    return msg.createReply('You have successfully killed ' + args.member.user.tag.boldify() + '.');
  }
}

module.exports = new Kill();
