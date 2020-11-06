# pheonix-wright
This is a Discord chat bot I built after playing the first game of the Ace Attorney Series! This bot preforms simple bots tasks such as posting iages and gifs, but also has the complicated task of managing a debate/course case on a Discord Server!

## Commands
Start all of your commands with the prefix detaile in config.json.
| Command | Description |
| ------- | ------------ |
help      | Display help message
oof, takethat, holdit, obj | Chat comands that display a gif
debate @defender topic | Debate another mentioned user on a given topic. Simply follow the instrucitons on screen

## Setup
1. Clone the repository
2. In the main repository, add the config.json, and add the following to it:
```
{
    token: <Your custom bot token>,
    maxCredibility: 3,
    prefix: "pr ",
    color: 0x000000
}
```
Remember that you need to add your bot to a server first before the next step.

3. Run either of the ```run.bat```s. The bot should mow be good to go!
