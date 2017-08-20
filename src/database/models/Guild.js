class Guild {
  constructor(guildId) {
    this.guildId = guildId;
    this.roles = {
      mod: [],
      rank: [],
      muted: null,
      sponsor: null,
      top10: null,
      top25: null,
      top50: null
    };
    this.channels = {
      gambling: null,
      modLog: null,
      welcome: null
    };
    this.settings = {
      sponsorPointsRequired: 2,
      welcomeMessage: null
    };
    this.misc = {
      caseNumber: 1
    };
  }
}

module.exports = Guild;
