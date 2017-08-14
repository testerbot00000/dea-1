const MemberService = require('../services/MemberService.js');
const PromiseUtil = require('../utility/PromiseUtil.js');

module.exports = (client) => {
  client.on('guildMembersChunk', async (members) => {
    for (const member of members.values()) {
      await MemberService.join(member);
      await PromiseUtil.delay(250);
    }
  });
};
