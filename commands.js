const { utils } = require("./utils");
const commands = [
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
                color: 2573160,
                fields: [
                    {
                        name: "Chat commands",
                        value: "pr!oof\npr!takethat\npr!holdit\npr!objection"
                    }
                ]
            });
        }
    }
];

exports.commands = commands;