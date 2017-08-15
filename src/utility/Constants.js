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
        ],
        stores: [
          '7-Eleven', 'Speedway', 'Couche-Tard', 'QuikTrip', 'Kroger', 'Circle K', 'Admiral Petroleum', 'Big Apple', 'Bucky\'s Express'
        ],
        scam: [
          'You ripped some grass off the ground, went up to some gangster and sold it to him as weed. He gave you {0} for it, and you got out of there before he noticed anything.',
          'You knocked on your neighbor\'s door, asked for some flour to bake a cake, and you sold it to your other neighbor as cocaine. You managed to make {0}.',
          'You bought a Monopoly board game, took the fake cash, went to the bank and traded it for USD. You walked away with {0}, moved to Cuba, while the US government was chasing you down.',
          'You waited in line for some new Adidas Yeezys, bought 10 pairs and sold them to your idiot friends for {0}. Hopefully they won\'t notice your scam.'
        ],
        jump: [
          'You were walking down the street when some homeless guy walked up to you, and then as you were giving him 17 cents you see the cracker has {0} worth of extra large socks stacked up behind him, so you jacked them.',
          'After a nice bust at the local strip club, you were walking home when you spotted Judge Woody, the cracker who fined you last week, sitting on a bench. You decided to jump his fatass, snipe {0} from his wallet, and walk away unharmed.',
          'You jump some dick that got you in court last month, stole his pants and ran. Turns out those pants were worth {0}.',
          'You decide to waltz over to Compton to show your strength. Fortunately, you found some wallet some guy dropped in a gang fight. The wallet didn\'t have jack inside of it, but the it turns out the leather it was made of was worth {0}.'
        ],
        steal: [
          'You and a couple of buddies decide to go bust out the fake nerf guns, stroll over to your local {0}, and rob their asses. You got {1} for your share.',
          'While you were shopping at {0}, you thought it was a good idea to nut all over the counter. The owner decided to sauce you {1} because he assumed the cum was toxic.'
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
        minCharLength: 7,
        bullyCost: 500
      },

      mute: {
        defaultLength: 24
      },

      transfer: {
        cut: 0.1,
        min: 5
      },

      scam: {
        cooldown: 7200000,
        fine: 1000,
        max: 1000,
        min: 500,
        odds: 90
      },

      jump: {
        cooldown: 1.44e7,
        fine: 2000,
        max: 5000,
        min: 2500,
        odds: 85
      },

      steal: {
        cooldown: 2.16e7,
        fine: 5000,
        max: 10000,
        min: 5000,
        odds: 80
      }

    };
  }
}

module.exports = new Constants();
