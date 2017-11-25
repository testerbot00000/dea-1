All commands are catagorized by groups. Each of the following sections is a group.

The syntax of the command usage is:

`Optional paramater: []`

`Required paramater: <>`

##Table Of Contents
- [Administration](#administration)
- [Botowners](#botowners)
- [Crime](#crime)
- [Gambling](#gambling)
- [General](#general)
- [Items](#items)
- [System](#system)

### Administration

These commands may only be used by the administrators of the server.

Command | Description | Usage
---------------- | -------------- | -------
Addrank|Add a rank.|`$addrank <@role> <cashRequired>`
Modifycash|Allows you to modify the cash of any member.|`$modifycash <amount> [@member]`
Modifyhealth|Allows you to modify the health of any member.|`$modifyhealth <amount> [@member]`
Modifyinventory|Add an item to your inventory.|`$modifyinventory <item> [quantity] [@member]`
Removerank|Remove a rank role.|`$removerank <@role>`
Reset|Resets all user data in your server.|`$reset`
Resetcooldowns|Reset any member's cooldowns|`$resetcooldowns [@member]`
Resetuser|Reset any member's data.|`$resetuser [@member]`

### Botowners

These commands may only be used by the owners of DEA.

Command | Description | Usage
---------------- | -------------- | -------
Addcrateitem|Add an item to a crate.|`$addcrateitem <item> <crate>`
Addgunbullet|Allow a gun to use a certain type of ammunition.|`$addgunbullet <gun> <bullet>`
Additem|Add an item to the database.|`$additem <columns> <values>`
Dm|DM any user.|`$dm <@user> <message>`
Eval|Evalute JavaScript code.|`$eval <code>`
Massannounce|Mass announce a message accross all guilds.|`$massannounce <message>`
Modifyitem|Add an item to the database.|`$modifyitem <item> <column> <value>`
Removecrateitem|Remove an item from a crate.|`$removecrateitem <item> <crate>`
Removegunbullet|Disallow the use of a type of ammunition by a gun.|`$removegunbullet <gun> <bullet>`
Send|Send a message in any channel.|`$send <channel> <message>`

### Crime

These commands are for committing crimes.

Command | Description | Usage
---------------- | -------------- | -------
Bully|Bully any user by changing their nickname.|`$bully <@member> <nickname>`
Shoot|Shoot a user with specified gun.|`$shoot <@member> <gun>`
Stab|Stab a user with specified knife.|`$stab <@member> <knife>`
Suicide|Commit suicide|`$suicide`

### Gambling

These commands are used for gambling your money.

Command | Description | Usage
---------------- | -------------- | -------
25+|Roll 25.00 or higher on a 100.00 sided die to win 0.2X your bet.|`$25+ <bet>`
55x2|Roll 55.0 or higher on a 100.00 sided die to win your bet.|`$55x2 <bet>`
75+|Roll 75.00 or higher on a 100.00 sided die to win 2.6X your bet.|`$75+ <bet>`
99+|Roll 99.00 or higher on a 100.00 sided die to win 90X your bet.|`$99+ <bet>`
Double|Double your cash scam free.|`$double <bet>`

### General

These are the general commands, always used.

Command | Description | Usage
---------------- | -------------- | -------
Cash|View the wealth of anyone.|`$cash [@member]`
Cooldowns|View all command cooldowns of a member|`$cooldowns [@member]`
Eat|Eat some food.|`$eat <food>`
Fish|Fish those fatass fishies.|`$fish <tool>`
Hunt|Hunt using specified gun.|`$hunt <gun>`
Leaderboards|View the richest Drug Traffickers.|`$leaderboards`
Rank|View the rank of anyone.|`$rank [@member]`
Ranks|View all ranks in this guild.|`$ranks`
Transfer|Transfer money to any member.|`$transfer <@member> <transfer>`

### Items

These are the commands involving items.

Command | Description | Usage
---------------- | -------------- | -------
Buy|Buy a crate!|`$buy [crate] [quantity]`
Inventory|View the inventory of anyone.|`$inventory [@member]`
Item|View all information of an item.|`$item <item>`
Itemleaderboards|View the users with the highest quantity of items.|`$itemleaderboards`
Items|View a list of all items.|`$items`
Opencrate|Open a crate!|`$opencrate <crate> [quantity]`

### System

System commands to explain stuff, etc.

Command | Description | Usage
---------------- | -------------- | -------
Help|All command information.|`$help [command]`
Invite|Add DEA to your server.|`$invite`
Modules|View all modules or a modules information.|`$modules [module]`
Statistics|Statistics about DEA.|`$statistics`
