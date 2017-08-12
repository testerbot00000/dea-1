All commands are catagorized by groups. Each of the following sections is a group.

The syntax of the command usage is:

`Optional paramater: []`

`Required paramater: <>`

##Table Of Contents
- [Administration](#administration)
- [Botowners](#botowners)
- [Gambling](#gambling)
- [General](#general)
- [Moderation](#moderation)
- [Owners](#owners)
- [System](#system)

### Administration

These commands may only be used by a user with the set mod role with a permission level of 2 or the Administrator permission.

Command | Description | Usage
---------------- | --------------| -------
Addrank|Add a rank.|`$addrank <@role> <cashRequired>`
Disablefines|Disable fines.|`$disablefines`
Disablewelcome|Disables the welcome message.|`$disablewelcome`
Enablefines|Enable fines.|`$enablefines`
Removerank|Remove a rank role.|`$removerank <@role>`
Setmodlog|Sets the mod log channel.|`$setmodlog <#channel>`
Setmutedrole|Sets the muted role.|`$setmutedrole <@role>`
Setwelcome|Sets the welcome message.|`$setwelcome <message>`

### Botowners

These commands may only be used by the owners of DEA.

Command | Description | Usage
---------------- | --------------| -------
Eval|Allows you to modify the cash of any member.|`$eval <code>`
Modifycash|Allows you to modify the cash of any member.|`$modifycash <amount> [@member]`

### Gambling
Command | Description | Usage
---------------- | --------------| -------
25+|Roll 25.00 or higher on a 100.00 sided die to win 0.2X your bet.|`$25+ <bet>`
55x2|Roll 55.0 or higher on a 100.00 sided die to win your bet.|`$55x2 <bet>`
75+|Roll 75.00 or higher on a 100.00 sided die to win 2.6X your bet.|`$75+ <bet>`
99+|Roll 99.00 or higher on a 100.00 sided die to win 90X your bet.|`$99+ <bet>`

### General
Command | Description | Usage
---------------- | --------------| -------
Cash|View the wealth of anyone.|`$cash [@member]`
Leaderboards|View the richest Drug Traffickers.|`$leaderboards`
Modroles|View all mod roles in this guild.|`$modroles`
Rank|View the rank of anyone.|`$rank [@member]`
Ranks|View all ranks in this guild.|`$ranks`
Transfer|Transfer money to any member.|`$transfer <@member> <transfer>`

### Moderation

These commands may only be used by a user with the set mod role with a permission level of 1 or the Administrator permission.

Command | Description | Usage
---------------- | --------------| -------
Ban|Swing the ban hammer on any member.|`$ban <@user> [reason]`
Clear|Clear up to 2 messages in any text channel.|`$clear <quantity> [reason]`
Kick|Kick any member.|`$kick <@member> [reason]`
Mute|Mute any member.|`$mute <@member> [quantity of hours] [reason]`
Unban|Lift the ban hammer on any member.|`$unban <user> [reason]`
Unmute|Unmute any member.|`$unmute <@member> [reason]`
Warn|Warn any member.|`$warn <@member> [reason]`

### Owners

These commands may only be used by a user with the set mod role with a permission level of 3 or the ownership of the server.

Command | Description | Usage
---------------- | --------------| -------
Addmodrole|Add a mod role.|`$addmodrole <@role> <permissionLevel>`
Removemodrole|Remove a mod role.|`$removemodrole <@role>`
Reset|Resets all user data in your server.|`$reset`
Resetuser|Reset any member's data.|`$resetuser [@member]`

### System
Command | Description | Usage
---------------- | --------------| -------
Help|All command information.|`$help [command]`
Info|All the information about the DEA cash system.|`$info`
Invite|Add DEA to your server.|`$invite`
Statistics|Statistics about DEA.|`$statistics`
