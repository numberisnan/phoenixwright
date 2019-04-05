const Discord = require('discord.js');
const { prefix, token } = require('./config.json')
const { commands } = require('./commands')

const client = new Discord.Client();

client.on('ready', () => {
    console.log('ready');
});

client.on('message', message => {
    var args = message.content.split(prefix);
    if (args.length > 1) {
        args[0] == "" && args.shift();
        console.log( args.join(",").replace(/ /g, ""));
        var currentCommand, commandName;
        for (var i = 0; i < args.length; i++) {
            currentCommand = args[i];
            commandName = currentCommand.split(" ")[0];
            commands.forEach(function(v, i) {
                if (v.name == commandName) {
                    v.execute(message, currentCommand);
                }
            })
        }

    }
});

client.login(token);