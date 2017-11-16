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
Command | Description | Usage
---------------- | -------------- | -------
Addrank|Add a rank.|`$addrank <@role> <cashRequired>`
Modifycash|Allows you to modify the cash of any member.|`$modifycash <amount> [@member]`
Modifyinventory|Add an item to your inventory.|`$modifyinventory <item> [quantity] [@member]`
Removerank|Remove a rank role.|`$removerank <@role>`
Reset|Resets all user data in your server.|`$reset`
Resetuser|Reset any member's data.|`$resetuser [@member]`

### Botowners

These commands may only be used by the owners of DEA.

Command | Description | Usage
---------------- | -------------- | -------
Addcrateitem|Add an item to a crate.|`$addcrateitem <item> <crate>`
Addgunbullet|Allow a gun to use a certain type of ammunition.|`$addgunbullet <gun> <bullet>`
Additem|Add an item to the database.|`$additem <table> <columns> <values>`
Dm|DM any user.|`$dm <@user> <message>`
Eval|Evalute JavaScript code.|`$eval <code>`
Massannounce|Mass announce a message accross all guilds.|`$massannounce <message>`
Modifyitem|Add an item to the database.|`$modifyitem <table> <item> <column> <value>`
Removecrateitem|Remove an item from a crate.|`$removecrateitem <item> <crate>`
Removegunbullet|Disallow the use of a type of ammunition by a gun.|`$removegunbullet <gun> <bullet>`
Send|Send a message in any channel.|`$send <channel> <message>`

### Crime
Command | Description | Usage
---------------- | -------------- | -------
Bully|Bully any user by changing their nickname.|`$bully <@member> <nickname>`

### Gambling
Command | Description | Usage
---------------- | -------------- | -------
25+|Roll 25.00 or higher on a 100.00 sided die to win 0.2X your bet.|`$25+ <bet>`
55x2|Roll 55.0 or higher on a 100.00 sided die to win your bet.|`$55x2 <bet>`
75+|Roll 75.00 or higher on a 100.00 sided die to win 2.6X your bet.|`$75+ <bet>`
99+|Roll 99.00 or higher on a 100.00 sided die to win 90X your bet.|`$99+ <bet>`

### General
Command | Description | Usage
---------------- | -------------- | -------
Buy|Buy a crate!|`$buy [crate] [quantity]`
Cash|View the wealth of anyone.|`$cash [@member]`
Leaderboards|View the richest Drug Traffickers.|`$leaderboards`
Rank|View the rank of anyone.|`$rank [@member]`
Ranks|View all ranks in this guild.|`$ranks`
Transfer|Transfer money to any member.|`$transfer <@member> <transfer>`

### Items
Command | Description | Usage
---------------- | -------------- | -------
Crate|View all information of a crate.|`$crate <crate>`
Inventory|View the inventory of anyone.|`$inventory [@member]`
Item|View all information of an item.|`$item <item>`
Itemleaderboards|View the users with the highest quantity of items.|`$itemleaderboards`
Items|View a list of all items.|`$items`
Opencrate|Open a crate!|`$opencrate <crate> [quantity]`

### System
Command | Description | Usage
---------------- | -------------- | -------
Help|All command information.|`$help [command]`
Invite|Add DEA to your server.|`$invite`
Statistics|Statistics about DEA.|`$statistics`
