const {RicherEmbed} = require("richer-embed");
const {Debate} = require("./classes/Debate");
const { color } = require("../config");

const commands = [
    // Chat Commands
    {
        name: ["objection", "obj"],
        execute: function (message, command) {
            new RicherEmbed(message.channel, { color }).chat(message.author, command, "https://i.kym-cdn.com/photos/images/newsfeed/000/171/527/objection-vector.png?1315394911").replace(message);
        }
    },
    {
        name: ["takethat", "tt"],
        execute: function (message, command) {
            new RicherEmbed(message.channel, { color }).chat(message.author, command, "https://vignette.wikia.nocookie.net/aceattorney/images/0/02/SoJ_Take_that%21.png/revision/latest?cb=20160910210405").replace(message);
        }
    },
    {
        name: ["holdit", "hi"],
        execute: function (message, command) {
            new RicherEmbed(message.channel, { color }).chat(message.author, command, "https://vignette.wikia.nocookie.net/aceattorney/images/4/48/SoJ_Hold_it%21.png/revision/latest?cb=20160911003100").replace(message)
        }
    },
    {
        name: ["oof"],
        execute: function (message, command) {
            new RicherEmbed(message.channel, { color }).chat(message.author, command, "https://media.giphy.com/media/IaxkRjESRHSLe/giphy.gif").replace(message)
        }
    },
    {
        name: ["help"],
        execute: function (message) {
            new RicherEmbed(message.channel, {
                title: "Help",
                color,
                fields: [
                    {
                        name: "Chat commands",
                        value: "pr oof\npr takethat or pr tt\npr holdit or pr hi\npr objection or pr obj"
                    },
                    {
                        name: "Debate",
                        value: "pr debate @defender topic - Initiate debate program for topic"
                    }
                ]
            }).replace(message);
        }
    },
    {
        name: ["debate"],
        execute: async function (message, command, client) {
            const commandArray = command.split(" ");
            commandArray.shift();
            commandArray[0] = commandArray[0].includes("!") ? commandArray[0].slice(3, -1) : commandArray[0].slice(2, -1);

            const debate = new Debate({
                prosecutor: message.author,
                defender: await client.fetchUser(commandArray[0]),
                topic: commandArray.slice(1, commandArray.length).join(" "),
                client: client,
                channelObj: message.channel,
            });

            await debate.init();
        }
    },
    {
        name: ["rey"],
        execute: function (message, command) {
            new RicherEmbed(message.channel, { color }).chat(message.author, command, "https://cdn.discordapp.com/attachments/540896409780617237/651548856026136596/unknown.png").replace(message);
        }
    }
];

exports.commands = commands;