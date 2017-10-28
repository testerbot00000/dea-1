const patron = require('patron.js');
const db = require('../../database');
const Random = require('../../utility/Random.js');
const NumberUtil = require('../../utility/NumberUtil.js');

class SellReferralPoints extends patron.Command {
  constructor() {
    super({
      names: ['sellpoints', 'sellreferralpoints', 'sellpoint'],
      groupName: 'sponsor',
      description: 'Sell referral points to your buddies.',
      args: [
        new patron.Argument({
          name: 'number of points',
          key: 'points',
          type: 'int',
          example: '5',
          preconditions: [new patron.preconditions.Minimum(1)]
        }),
        new patron.Argument({
          name: 'price',
          key: 'price',
          type: 'currency',
          example: '10000',
          preconditions: [new patron.preconditions.Minimum(0)]
        }),
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'Jimbo Steve#6666',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const key = Random.nextInt(0, 2147000000).toString();
    const referralPoints = args.points + ' referral point' + (args.points === 1 ? '' : 's');
    const price = args.price.USD();
    const boldSeller = msg.author.tag.boldify();
    const boldBuyer = args.member.user.tag.boldify();

    await args.member.DM(boldSeller + ' has offered you ' + referralPoints + ' in exchange for ' + price + '. To accept this offer, reply with "' + key + '" within the next 5 minutes.', { guild: msg.guild });
    await msg.createReply('You have successfully informed ' + args.member.user.tag.boldify() + ' of your offer.');

    const result = await args.member.user.dmChannel.awaitMessages((m) => m.author.id === args.member.id && m.content.includes(key), { time: 300000, maxMatches: 1 });

    if (result.size >= 1) {
      const seller = await db.userRepo.findById(msg.dbUser._id);
      const buyer = await db.userRepo.getUser(args.member.id, msg.guild.id);

      if (seller.points < args.points) {
        return args.member.DMError(boldSeller + ' does not have ' + referralPoints + '.', { guild: msg.guild });
      } else if (NumberUtil.realValue(buyer.cash) < args.price) {
        return args.member.DMError('You do not have ' + price + '. Balance: ' + NumberUtil.format(buyer.cash) + '.', { guild: msg.guild });
      }

      await db.userRepo.modifyCash(msg.dbGuild, args.member, -args.price);
      await db.userRepo.modifyCash(msg.dbGuild, msg.member, args.price);
      await db.userRepo.updateById(seller._id, { $inc: { points: -args.points } });
      await db.userRepo.updateById(buyer._id, { $inc: { points: args.points } });

      await args.member.DM('You have successfully purchased ' + referralPoints + ' in exchange for ' + price + ' from ' + boldSeller + '.', { guild: msg.guild });
      return msg.author.tryDM('You have successfully sold ' + referralPoints + ' for ' + price + ' to ' + boldBuyer +'.', { guild: msg.guild });
    }

    return msg.author.tryDM(boldBuyer + ' has not responded to your referral points offer.', { guild: msg.guild });
  }
}

module.exports = new SellReferralPoints();
