const db = require('../../database');
const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');

class BuyCommand extends patron.Command {
  constructor() {
    super({
      names: ['buycommand', 'buycmd'],
      groupName: 'general',
      description: 'Buy a command.',
      args: [
        new patron.Argument({
          name: 'command',
          key: 'command',
          type: 'string',
          example: 'bully'
        })
      ]
    });
  }

  async run(msg, args) {
    const lowerInput = args.command.toLowerCase();
    const cmd = Constants.data.purchasableCommands.find((x) => x.names.some((y) => y === lowerInput));

    if (cmd === undefined) {
      return msg.createErrorReply('This command either does not exist or is not purchasable.');
    } else if (msg.dbUser.points < cmd.price) {
      return msg.createErrorReply('You do not have ' + cmd.price + ' points. Points: ' + msg.dbUser.points + '.');
    }

    await db.userRepo.updateUser(msg.author.id, msg.guild.id, { $push: { commands: cmd.names[0] }, $inc: { points: -cmd.price } });
    return msg.createReply('You have successfully purchased the `' + Constants.data.misc.prefix + cmd.names[0] + '` command.');
  }
}

module.exports = new BuyCommand();
