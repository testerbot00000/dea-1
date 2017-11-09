const Constants = require('../utility/Constants.js');
const Logger = require('../utility/Logger.js');
const client = require('../structures/client.js');

client.on('ready', async () => {
  (async function () {
    await Logger.log('Shard #' + client.shard.id + ' has successfully connected.', 'INFO');
    await client.user.setGame(Constants.data.misc.game);
  })()
    .catch((err) => Logger.handleError(err));
});
