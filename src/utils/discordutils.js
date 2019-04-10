const Discord = require("discord.js");
const { color }  = require("../../config.json");
const path = require("path")
const utils = {
    postChatImage: function(message, command, url) {
        const embed = new Discord.RichEmbed()
        .setImage(url)
        .setTitle(message.author.username + ": " + command.split(" ").slice(1).join(" ")) //Make comment in description field
        .setThumbnail(message.author.displayAvatarURL)
        .setColor(color);
        message.delete(1000);
        message.channel.send({ embed })
    },
    postLocalImage: function(channelObj, pathName) {
        const embed = new Discord.RichEmbed().attachFiles([pathName]).setImage("attachment://" + path.basename(pathName)).setColor(color);
        channelObj.send({ embed });
    },
    postMessage: function(channelObj, title, md) {
        channelObj.send({
            embed: {
                color: color,
                fields: [{
                    name: title,
                    value: md
                }]
            }
        });
    },
    postEmbed: function(channelObj, embedObj) {
        embedObj.color = color;
        channelObj.send({embed: embedObj});
    }
}

exports.utils = utils;