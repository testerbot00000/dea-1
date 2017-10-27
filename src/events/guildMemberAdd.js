const MemberService = require('../services/MemberService.js');
const client = require('../structures/client.js');
const Logger = require('../utility/Logger.js');

client.on('guildMemberAdd', (member) => {
  return MemberService.join(member)
    .catch((err) => Logger.handleError(err));
});
