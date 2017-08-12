class Guild {
  constructor(guildId) {
    this.guildId = guildId;
    this.roles = {
      mod: [],
      rank: [],
      muted: null
    };
    this.channels = {
      gambling: null,
      modLog: null,
      welcome: null
    };
    this.settings = {
      fines: false,
      welcomeMessage: null
    };
    this.misc = {
      caseNumber: 1
    };
  }
}

module.exports = Guild;
