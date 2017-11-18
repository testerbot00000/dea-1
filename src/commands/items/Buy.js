const db = require('../../database');
const patron = require('patron.js');
const USD = require('../../utility/USD.js');
const StringUtil = require('../../utility/StringUtil.js');
const pluralize = require('pluralize');

class Buy extends patron.Command {
  constructor() {
    super({
      names: ['buy', 'shop', 'buycrate', 'crates'],
      groupName: 'general',
      description: 'Buy a crate!',
      args: [
        new patron.Argument({
          name: 'crate',
          key: 'crate',
          type: 'crate',
          defaultValue: null,
          example: 'gold'
        }),
        new patron.Argument({
          name: 'quantity',
          key: 'quantity',
          type: 'quantity',
          example: '500',
          preconditions: ['cashforcrate'],
          defaultValue: 1
        })
      ]
    });
  }

  async run(msg, args, sender) {
    if (args.crate === null) {
      const result = await db.select('crate_data', 'name, description, price');

      let description = '';

      for (let i = 0; i < result.rows.length; i++) {
        description += USD(result.rows[i].price) + ': `$buy "' + StringUtil.capitializeWords(result.rows[i].name) + '"` - ' + result.rows[i].description + '\n';
      }

      return sender.send(description, { title: 'Crates' });
    }

    await db.users.modifyCash(msg.member, -args.crate.price * args.quantity);
    await db.items.modifyInventory(msg.author.id, msg.guild.id, args.crate.id, args.quantity);

    return sender.send('You have successfully purchased ' + pluralize(StringUtil.capitializeWords(args.crate.name), args.quantity, true) +'.');
  }
}

module.exports = new Buy();
