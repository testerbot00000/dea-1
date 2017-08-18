const patron = require('patron.js');
const Constants = require('../../utility/Constants.js');

class Refer extends patron.Command {
  constructor() {
    super({
      names: ['refer', 'referralcode', 'code', 'refercode'],
      groupName: 'sponsor',
      description: 'View your referral code along with an invite link to this server.',
      botPermissions: ['CREATE_INSTANT_INVITE']
    });
  }

  async run(msg) {
    if (msg.dbUser.referralCode === null) {
      return msg.createErrorReply('You have not set your referral code. You may do so with `$setreferralcode <code>`.');
    }

    const invite = await msg.guild.getDefaultInvite();

    return msg.channel.createMessage('**Referral code:** ' + msg.dbUser.referralCode + '\n\n**Invite link:** ' + invite.url + '\n\nShare this invite link with your friends, and when they join this server, tell them to use the `$claim <code>` command using your code.\n\nIt will give them ' + Constants.config.claim.reward.USD() + ' and it will award you with one referral point, which can be used to purchase sponsorship. Use `' + Constants.data.misc.prefix + 'Sponsor` for more information.');
  }
}

module.exports = new Refer();
