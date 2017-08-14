const MemberService = require('../services/MemberService.js');

module.exports = (client) => {
  client.on('guildMemberAdd', (member) => {
    return MemberService.join(member);
  });
};
