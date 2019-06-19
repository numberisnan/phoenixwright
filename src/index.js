const { commands } = require('./commands');
const { prefix, token } = require('../config.json');
const Discord = require('discord.js');

const client = new Discord.Client();

client.login(token)
    .then(() => {
        console.log("Logged in")
    })
    .catch(function(err) {
        console.log("Error with logging in", err)
    });

client.once('ready', () => {
    console.log('Bot up and running!');
});

client.on('message', message => {
    const args = message.content.split(prefix);
    if (args.length > 1) {
        args[0] == "" && args.shift();
        const command = args[0]; //Full command
        console.log(command);
        const commandName = command.split(" ")[0];
        commands.forEach(function(v) {
            if (v.name.includes(commandName)) {
                v.execute(message, command, client);
            }
        })
    }
});

exports.client = client;