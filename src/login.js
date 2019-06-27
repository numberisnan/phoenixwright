const Discord = require('discord.js');
const {token} = require('../config.json');

const client = new Discord.Client();

client.login(token)
    .then(() => {
        console.log("Logged in")
    })
    .catch(function (err) {
        console.log("Error with logging in", err)
    });

exports.client = client;