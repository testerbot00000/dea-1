const Logger = require('../utility/Logger.js');
const client = require('../structures/client.js');
const db = require('../database');
const discord = require('discord.js');
const patron = require('patron.js');
const Constants = require('../utility/Constants.js');
const NumberUtil = require('../utility/NumberUtil.js');
const ChatService = require('../services/ChatService.js');
const handler = require('../structures/handler.js');

client.on('message', (msg) => {
  (async function () {
    if (msg.author.bot === true) {
      return;
    }

    const inGuild = msg.guild !== null;

    if (inGuild === true) {
      msg.dbUser = await db.userRepo.getUser(msg.author.id, msg.guild.id);
      msg.dbGuild = await db.guildRepo.getGuild(msg.guild.id);
    }

    if (Constants.data.regexes.prefix.test(msg.content) === false) {
      return inGuild ? ChatService.applyCash(msg) : null;
    }

    await Logger.log('Message Id: ' + msg.id + ' | User Id: ' + msg.author.id + (inGuild === true ? ' | Guild Id: ' + msg.guild.id : '') + ' | User: ' + msg.author.tag + (inGuild ? ' | Guild: ' + msg.guild.name : '') + ' | Content: ' + msg.content, 'DEBUG');

    const result = await handler.run(msg, Constants.data.misc.prefix);

    if (result.success === false) {
      let message;

      switch (result.commandError) {
        case patron.CommandError.CommandNotFound:
          return;
        case patron.CommandError.Cooldown: {
          const cooldown = NumberUtil.msToTime(result.remaining);

          return msg.channel.tryCreateErrorMessage('Hours: ' + cooldown.hours + '\nMinutes: ' + cooldown.minutes + '\nSeconds: ' + cooldown.seconds, { title: result.command.names[0].upperFirstChar() + ' Cooldown' });
        }
        case patron.CommandError.Exception:
          if (result.error instanceof discord.DiscordAPIError) {
            if (result.error.code === 400) {
              message = 'There seems to have been a bad request. Please report this issue with context to John#0969.';
            } else if (result.error.code === 0 || result.error.code === 404 || result.error.code === 50013) {
              message = 'DEA does not have permission to do that. This issue may be fixed by moving the DEA role to the top of the roles list, and giving DEA the "Administrator" server permission.';
            } else if (result.error.code === 50007) {
              message = 'DEA does not have permission to DM this user. Enabling the DM Privacy Settings for this server may solve this issue.';
            } else if (result.error.code >= 500 && result.error.code < 600) {
              message = 'Looks like Discord fucked up. An error has occurred on Discord\'s part which is entirely unrelated with DEA. Sorry, nothing we can do.';
            } else {
              message = result.errorReason;
            }
          } else {
            message = result.errorReason;
            await Logger.handleError(result.error);
          }
          break;
        case patron.CommandError.InvalidArgCount:
          message = 'You are incorrectly using this command.\n**Usage:** `' + Constants.data.misc.prefix + result.command.getUsage() + '`\n**Example:** `' + Constants.data.misc.prefix + result.command.getExample() + '`';
          break;
        default:
          message = result.errorReason;
          break;
      }

      await Logger.log('Unsuccessful command result: ' + msg.id + ' | Reason: ' + result.errorReason, 'DEBUG');

      return msg.tryCreateErrorReply(message);
    }

    return Logger.log('Successful command result: ' + msg.id, 'DEBUG');
  })()
    .catch((err) => Logger.handleError(err));
});
