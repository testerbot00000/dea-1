class Constants {
  constructor() {
    this.data = {
      colors: {
        defaults: [
          [255, 38, 154],
          [0, 255, 0],
          [0, 232, 40],
          [8, 248, 255],
          [242, 38, 255],
          [255, 28, 142],
          [104, 255, 34],
          [255, 190, 17],
          [41, 84, 255],
          [150, 36, 237],
          [168, 237, 0]
        ],
        error: [255, 0, 0]
      },

      links: {
        botInvite: 'https://discordapp.com/oauth2/authorize?client_id=290823959669374987&scope=bot&permissions=8',
        documentation: 'https://vim2meta.github.io/dea/commands/',
        serverInvite: 'https://discord.gg/gvyma7H'
      },

      misc: {
        disabledEvents: [
          'CHANNEL_PINS_UPDATE',
          'MESSAGE_UPDATE',
          'MESSAGE_REACTION_ADD',
          'MESSAGE_REACTION_REMOVE',
          'MESSAGE_REACTION_REMOVE_ALL',
          'VOICE_STATE_UPDATE',
          'TYPING_START',
          'VOICE_SERVER_UPDATE',
          'RELATIONSHIP_ADD',
          'RELATIONSHIP_REMOVE'
        ],
        game: '$help',
        prefix: '$'
      },

      regexes: {
        prefix: /^\$/
      }
    };

    this.config = {
      bully: {
        cooldown: 60000,
        cost: 500,
        maxLength: 32
      },

      gambling: {
        minBet: 5
      },

      misc: {
        cashPerMessage: 50,
        leaderboardCap: 10,
        messageCooldown: 30000,
        minCharLength: 7
      },

      transfer: {
        cut: 0.1,
        min: 5
      }
    };
  }
}

module.exports = new Constants();
