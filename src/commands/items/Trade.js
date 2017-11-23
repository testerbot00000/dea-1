const patron = require('patron.js');
const db = require('../../database');
const Random = require('../../utility/Random.js');
const StringUtil = require('../../utility/StringUtil.js');
const Sender = require('../../utility/Sender.js');
const pluralize = require('pluralize');

class Trade extends patron.Command {
  constructor() {
    super({
      names: ['trade'],
      groupName: 'items',
      description: 'Trade an item with a member in this guild!',
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
    const user = msg.client.users.get(args.member.user.id);

    await Sender.send(args.member.user, '**Offer:** ' + args.givenQuantity + ' ' + pluralize(StringUtil.capitializeWords(args.item.names[0]), args.givenQuantity) + '\n**Request:** ' + args.wantedQuantity + ' ' + pluralize(StringUtil.capitializeWords(args.wantedItem.names[0]), args.wantedQuantity) + '\n\nPlease respond with ' + key + ' within 5 minutes to accept this trade.\nTrade Request from ' + StringUtil.boldify(msg.author.tag), { guild: msg.guild });

    await sender.reply('You\'ve successfully informed ' + args.member.user.tag + ' of your trade request.');

    console.log('checking if dm\'s are null.');
    if (user.dmChannel === null) {
      console.log('creating dm\'s with user.');
      await user.createDM();
      console.log('successfully created dm\'s.');
    }

    console.log('awaiting dmChannel.');
    const result = await user.dmChannel.awaitMessages((m) => m.author.id === args.member.user.id && m.content.includes(key), { time: 300000, maxMatches: 1 });
    console.log('successfully awaited dmChannel.');

    if (result.size >= 1) {
      console.log('checking if item\'s exist for author.');
      if (await db.any('items', '(data_id, user_id, guild_id) = ($1, $2, $3) AND quantity >= $4', [args.item.id, msg.author.id, msg.guild.id, args.givenQuantity]) === false) {
        console.log('author items dont exist');
        return Sender.send(args.member.user, msg.author.tag + ' does not own ' + args.givenQuantity + pluralize(StringUtil.capitializeWords(args.item.names[0]), args.givenQuantity) + ' anymore.');
      } 

      console.log('checking if arg\'d user has items.');
      if (await db.any('items', '(data_id, user_id, guild_id) = ($1, $2, $3) AND quantity >= $4', [args.wantedItem.id, args.member.user.id, msg.guild.id, args.wantedQuantity]) === false) {
        console.log('args user doesnt own items.');
        return Sender.send(args.member.user, 'You do not own ' + args.wantedQuantity + pluralize(StringUtil.capitializeWords(args.wantedItem.names[0]), args.wantedQuantity) + ' anymore.');
      }

      console.log('modifying author inv');

      await db.items.modifyInventory(msg.author.id, msg.guild.id, args.wantedItem.id, args.wantedQuantity);
      await db.items.modifyInventory(msg.author.id, msg.guild.id, args.item.id, -args.givenQuantity);

      console.log('modifying arg\'d user\'s inv.');
      await db.items.modifyInventory(args.member.id, msg.guild.id, args.item.id, args.givenQuantity);
      await db.items.modifyInventory(args.member.id, msg.guild.id, args.wantedItem.id, -args.wantedQuantity);

      console.log('we at the message const nigga');
      const message = (tag) => '**Offer:** ' + args.givenQuantity + ' ' + pluralize(StringUtil.capitializeWords(args.item.names[0]), args.givenQuantity) + '\n**Request:** ' + args.wantedQuantity + ' ' + pluralize(StringUtil.capitializeWords(args.wantedItem.names[0]), args.wantedQuantity) + '\n\nCompleted trade with ' + StringUtil.boldify(tag) + '.';

      console.log('sending successful dm\'s');
      await Sender.send(args.member.user, message(msg.author.tag), { guild: msg.guild });
      return Sender.send(msg.author, message(args.member.user.tag), { guild: msg.guild });
    }

    return Sender.send(msg.author, StringUtil.boldify(args.member.user.tag) + ' did not respond to your trade offer.', { guild: msg.guild });    
  }
}

module.exports = new Trade();
