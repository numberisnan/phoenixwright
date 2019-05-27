const { RicherEmbed } = require("./classes/RicherEmbed");
const commands = [
    // Chat Commands
    {
        name: ["objection","obj"],
        execute: function(message, command) {
            new RicherEmbed().chat(message.author, command, "https://i.kym-cdn.com/photos/images/newsfeed/000/171/527/objection-vector.png?1315394911").replace(message);
        }
    },
    {
        name: ["takethat","tt"],
        execute: function(message, command) {
            new RicherEmbed().chat(message.author, command, "https://vignette.wikia.nocookie.net/aceattorney/images/0/02/SoJ_Take_that%21.png/revision/latest?cb=20160910210405").replace(message);
        }
    },
    {
        name: ["holdit","hi"],
        execute: function(message, command) {
            new RicherEmbed().chat(message.author, command, "https://vignette.wikia.nocookie.net/aceattorney/images/4/48/SoJ_Hold_it%21.png/revision/latest?cb=20160911003100").replace(message)
        }
    },
    {
        name: ["oof"],
        execute: function(message, command) {
            new RicherEmbed().chat(message.author, command, "https://media.giphy.com/media/IaxkRjESRHSLe/giphy.gif").replace(message)
        }
    },
    {
        name: ["help"],
        execute: function(message) {
            new RicherEmbed({
                title: "Help",
                fields: [
                    {
                        name: "Chat commands",
                        value: "pr!oof\npr!takethat or pr!tt\npr!holdit or pr!hi\npr!objection or pr!obj"
                    }
                ]
            }).replace(message);
        }
    },
    {
        name: ["debate"],
        execute: function(message) {
                 new RicherEmbed()
                     .attachLocalImage("../assets/images/court.jpg")
                     .replace(message);
        }
    }
];

exports.commands = commands;