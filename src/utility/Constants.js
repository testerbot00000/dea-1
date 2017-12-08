class Constants {
  constructor() {
    this.defaultColors = [
      0xff269a,
      0x00ff00,
      0x00e828,
      0x08f8ff,
      0xf226ff,
      0xff1C8e,
      0x68ff22,
      0xffbe11,
      0x2954ff,
      0x9624ed,
      0xa8ed00
    ];
    this.errorColor = 0xff0000;

    this.botInvite = 'https://discordapp.com/oauth2/authorize?client_id=383998740685520906&scope=bot&permissions=8';
    this.documentation = 'https://vim2meta.github.io/dea/commands/';
    this.serverInvite = 'https://discord.gg/gvyma7H';

    this.disabledEvents = [
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
    ];

    this.game = '$help';

    this.prefix = '$';

    this.regexes = {
      capital: /([A-Z])/g,
      capitalize: /\w\S*/g,
      first: /^./,
      markdown: /(\*|~|`|_)+/g,
      prefix: /^\$/
    };

    this.cashPerMessage = 100;
    this.leaderboardCap = 10;
    this.messageCooldown = 30000;
    this.minCharLength = 7;

    this.commandSimilarity = 0.66;

    this.bully = {
      cooldown: 60000,
      maxLength: 32
    };

    this.shoot = {
      cooldown: 14400000
    };

    this.stab = {
      cooldown: 14400000
    };

    this.hunt = {
      cooldown: 3600000
    };

    this.fish = {
      cooldown: 3600000
    };

    this.gambling = {
      minBet: 5
    };

    this.buyCrate = {
      min: 1
    };

    this.openCrate = {
      max: 1000,
      cooldown: 60000
    };

    this.double = {
      odds: 30,
      max: 0.7
    };

    this.transfer = {
      cut: 0.1,
      min: 5
    };

    this.suicideTools = ['high quality noose', 'silver axe', 'leather dildo', 'chipotle burger'];
  }
}

module.exports = new Constants();
