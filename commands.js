const { utils } = require("./utils");
const commands = [
    // Chat Commands
    {
        name: "objection",
        execute: function(message) {
            utils.postImage(message.channel, "https://i.kym-cdn.com/photos/images/newsfeed/000/171/527/objection-vector.png?1315394911");
        }
    },
    {
        name: "takethat",
        execute: function(message) {
            utils.postImage(message.channel, "http://www.shinmh.com/blog/octubre2012/phonixwrightDS/phoenix-wright-take-that-a.png");
        }
    },
    {
        name: "holdit",
        execute: function(message) {
            utils.postImage(message.channel, "https://vignette.wikia.nocookie.net/aceattorney/images/4/48/SoJ_Hold_it%21.png/revision/latest?cb=20160911003100");
        }
    },
    {
        name: "oof",
        execute: function(message) {
            utils.postImage(message.channel, "https://media.giphy.com/media/IaxkRjESRHSLe/giphy.gif");
        }
    },
    {
        name: "help",
        execute: function(message) {
            utils.postEmbed(message.channel, {
                title: "Help",
                fields: [
                    {
                        name: "Chat commands",
                        value: "pr!oof\npr!takethat\npr!holdit\npr!objection"
                    },
                    {
                        name: "Utilities",
                        value: "pr!m - Execute multiple commands with no arguments e.g. pr!m oof takethat"
                    }
                ]
            });
        }
    },
    // Multiple commands command
    {
        name: "m",
        execute: function(message, command) {
            const args = command.split(" ").filter(arg => arg != "");
            for (var i = 1; i < args.length; i++) {
                currentCommand = args[i];
                commands.forEach(function(v, i) {
                    if (v.name == currentCommand) {
                        v.execute(message, currentCommand);
                    }
                });
            }
        }
    }
];

exports.commands = commands;