const patron = require('patron.js');
const db = require('../../database');
const Random = require('../../utility/Random.js');
const StringUtil = require('../../utility/StringUtil.js');
const Sender = require('../../utility/Sender.js');
const pluralize = require('pluralize');
const Try = require('../../utility/Try.js');

class Trade extends patron.Command {
  constructor() {
    super({
      names: ['trade'],
      groupName: 'items',
      description: 'Trade items with a member.',
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'Luner#0059',
          preconditions: ['noself']
        }),
        new patron.Argument({
          name: 'given item',
          key: 'item',
          type: 'item',
          example: '"huntsman knife"'
        }),
        new patron.Argument({
          name: 'give amount',
          key: 'givenQuantity',
          type: 'quantity',
          example: '5',
          preconditions: ['ownquantity']
        }),
        new patron.Argument({
          name: 'wanted item',
          key: 'wantedItem',
          type: 'item',
          example: 'intervention',
        }),
        new patron.Argument({
          name: 'wanted amount',
          key: 'wantedQuantity',
          type: 'quantity',
          example: '5',
          preconditions: ['userownsquantity']
        })
      ]
    });
  }

  async run(msg, args, sender) {
    const key = Random.nextInt(0, 2147000000).toString();
    const user = await msg.client.users.get(args.member.user.id);

    Try(Sender.send(args.member.user, '**Offer:** ' + args.givenQuantity + ' ' + pluralize(StringUtil.capitializeWords(args.item.names[0]), args.givenQuantity) + '\n**Request:** ' + args.wantedQuantity + ' ' + pluralize(StringUtil.capitializeWords(args.wantedItem.names[0]), args.wantedQuantity) + '\n\nPlease respond with ' + key + ' within 5 minutes to accept this trade.\nTrade Request from ' + StringUtil.boldify(msg.author.tag), { guild: msg.guild }));

    await sender.reply('You\'ve successfully informed ' + args.member.user.tag + ' of your tade request.');
    
    if (user.dmChannel === null) {
      await user.createDM();
    }

    const result = await user.dmChannel.awaitMessages((m) => m.author.id === user.id && m.content.includes(key), { time: 300000, maxMatches: 1 });

    if (result.size >= 1) {
      if (await db.any('items', '(data_id, user_id, guild_id) = ($1, $2, $3) AND quantity >= $4', [args.item.id, msg.author.id, msg.guild.id, args.givenQuantity]) === false) {
        return Try(Sender.send(args.member.user, msg.author.tag + ' does not own ' + args.givenQuantity + pluralize(StringUtil.capitializeWords(args.item.names[0]), args.givenQuantity) + ' anymore.'));
      } else if (await db.any('items', '(data_id, user_id, guild_id) = ($1, $2, $3) AND quantity >= $4', [args.wantedItem.id, args.member.id, msg.guild.id, args.wantedQuantity]) === false) {
        return Try(Sender.send(args.member.user, 'You do not own ' + args.wantedQuantity + pluralize(StringUtil.capitializeWords(args.wantedItem.names[0]), args.wantedQuantity) + ' anymore.'));
      }

      await db.items.modifyInventory(msg.author.id, msg.guild.id, args.wantedItem.id, args.wantedQuantity);
      await db.items.modifyInventory(msg.author.id, msg.guild.id, args.item.id, -args.givenQuantity);

      await db.items.modifyInventory(args.member.id, msg.guild.id, args.item.id, args.givenQuantity);
      await db.items.modifyInventory(args.member.id, msg.guild.id, args.wantedItem.id, -args.wantedQuantity);

      const message = (tag) => '**Offer:** ' + args.givenQuantity + ' ' + pluralize(StringUtil.capitializeWords(args.item.names[0]), args.givenQuantity) + '\n**Request:** ' + args.wantedQuantity + ' ' + pluralize(StringUtil.capitializeWords(args.wantedItem.names[0]), args.wantedQuantity) + '\n\nCompleted trade with ' + StringUtil.boldify(tag) + '.';

      Try(Sender.send(args.member.user, message(msg.author.tag), { guild: msg.guild }));
      return Try(Sender.send(msg.author, message(args.member.user.tag), { guild: msg.guild }));
    }

    return Try(Sender.send(msg.author, StringUtil.boldify(args.member.user.tag) + ' did not respond to your trade offer.', { guild: msg.guild }));    
  }
}

module.exports = new Trade();
