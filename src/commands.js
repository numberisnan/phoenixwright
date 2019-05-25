const { utils } = require("./utils/discordutils.js");
const commands = [
    // Chat Commands
    {
        name: ["objection","obj"],
        execute: function(message, command) {
            utils.postEmbed(message, utils.ChatEmbed(message, {chat: command.split(" ").slice(1).join(" "), url: "https://i.kym-cdn.com/photos/images/newsfeed/000/171/527/objection-vector.png?1315394911"}));
        }
    },
    {
        name: ["takethat","tt"],
        execute: function(message, command) {
            utils.postEmbed(message, utils.ChatEmbed(message, {chat: command.split(" ").slice(1).join(" "), url: "https://vignette4.wikia.nocookie.net/aceattorney/images/b/be/TakeThat%21_HD.png/revision/latest?cb=20160415091349"}));
        }
    },
    {
        name: ["holdit","hi"],
        execute: function(message, command) {
            utils.postEmbed(message, utils.ChatEmbed(message, {chat: command.split(" ").slice(1).join(" "), url: "https://vignette.wikia.nocookie.net/aceattorney/images/4/48/SoJ_Hold_it%21.png/revision/latest?cb=20160911003100"}));
        }
    },
    {
        name: ["oof"],
        execute: function(message, command) {
            utils.postEmbed(message, utils.ChatEmbed(message, {chat: command.split(" ").slice(1).join(" "), url: "https://media.giphy.com/media/IaxkRjESRHSLe/giphy.gif"}));
        }
    },
    {
        name: ["help"],
        execute: function(message) {
            utils.postEmbed(message, {
                title: "Help",
                fields: [
                    {
                        name: "Chat commands",
                        value: "pr!oof\npr!takethat or pr!tt\npr!holdit or pr!hi\npr!objection or pr!obj"
                    }
                ]
            });
        }
    },
    {
        name: ["debate"],
        execute: function(message) {
            utils.postEmbed(message, utils.attachLocalImage(utils.ChatEmbed(message, {anonymous: true}), "../assets/images/court.jpg"))
        }
    }
];

exports.commands = commands;