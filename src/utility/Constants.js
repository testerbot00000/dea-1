class Constants {
  constructor() {
    this.data = {
      colors: {
        ban: [234, 12, 0],
        clear: [0, 29, 255],
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
        error: [255, 0, 0],
        kick: [232, 81, 31],
        mute: [255, 114, 14],
        unban: [19, 255, 25],
        unmute: [109, 237, 94],
        warn: [255, 182, 32]
      },

      links: {
        botInvite: 'https://discordapp.com/oauth2/authorize?client_id=290823959669374987&scope=bot&permissions=8',
        documentation: 'https://realblazeit.github.io/dea/commands/',
        serverInvite: 'https://discord.gg/gvyma7H'
      },

      messages: {
        fines: [
          'So you think you can get away with laundering thousands of dollars in dirty drug money, and the fucking DEA wouldn\'t know about it? I will let you off with a {0} fine this time, but next time you are behind bars pal.',
          'Listen buddy, I have been watching you for a while, and I finally got everything I need to prove you are a drug smuggler. Lucky you Judge Red Forman was a softie, you are walking away with only a {0} fine.',
          '**FREEZE!** DON\'T MOVE ONE GODDAMN MUSCLE OR YOU KNOW WHATS GONNA HAPPEN!\n\n*Steve, we need back up, just caught this nobody dealing some drugs. Was talking with Judge Hard Richard earlier, and he said next dealer I catch gets a {0} fine.*',
          'Thinking you can hide thousands in drug money from a DEA agent? ***THINK AGAIN BUDDY!*** Here is a goddamn {0} fine.',
          'Well, I got you right where I want you. Enough proof to lock you away for 15 years. Don\'t you worry sonny, I like you. I talked to Judge Stiffwood and he said we can let you off with a {0} fine.',
          'Here\'s what pal, I would lock you away for 15 years for smuggling all those drugs, but me and Judge Woody made a deal to split your {0} fine.'
        ],
        lottery: [
          'CONGRATS MY MAN, you just won {0} in the goddamn lottery! Use `$info` for more information.',
          'Hot fucking pockets, you just won {0} in the lottery! Use `$info` for more information.',
          'Well sonny, looks like today is your goddamn lucky day, you just won {0} in the lottery! Use `$info` for more information.',
          'Jiminy Crickets, you made some bank! You just won {0} from the lottery! Use `$info` for more information.',
          'Sweet Baby Jesus you just won {0} in the fucking lottery! Use `$info` for more information.',
          'Well I\'ll be damned, you just won {0} in the goddamn lottery! Use `$info` for more information.'
        ]
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
      chill: {
        max: 3600,
        min: 5
      },

      clear: {
        max: 100,
        min: 2
      },

      gambling: {
        minBet: 5
      },

      fine: {
        additionalOdds: 0.0000025,
        cut: 0.25,
        minRich: 25000,
        odds: 0.35
      },

      intervals: {
        autoUnmute: 60000,
        fine: 450000
      },

      lottery: {
        max: 10000,
        min: 2500,
        odds: 1.25
      },

      misc: {
        cashPerMessage: 50,
        leaderboardCap: 10,
        messageCooldown: 30000,
        minCharLength: 7
      },

      mute: {
        defaultLength: 24
      },

      transfer: {
        cut: 0.1,
        min: 5
      },

      whore: {
        cooldown: 7200000,
        fine: 1000,
        max: 500,
        min: 50,
        odds: 90
      }
    };
  }
}

module.exports = new Constants();
