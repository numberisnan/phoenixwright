const Discord = require('discord.js');
const { prefix, token } = require('../config.json')
const { commands } = require('./commands')

const client = new Discord.Client();

client.on('ready', () => {
    console.log('ready');
});

client.on('message', message => {
    var args = message.content.split(prefix);
    if (args.length > 1) {
        args[0] == "" && args.shift();
        var command = args[0] //Full command
        console.log(command);
        var commandName = command.split(" ")[0];
        commands.forEach(function(v, i) {
            if (v.name.includes(commandName)) {
                v.execute(message, command);
            }
        })
    }
});

client.login(token);