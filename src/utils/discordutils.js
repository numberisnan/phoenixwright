const Discord = require("discord.js");
const { color }  = require("../../config.json");
const path = require("path");
const utils = {
    ChatEmbed: function(messageObj, {
        chat="", url, anonymous=false
    }) {
        const embed = new Discord.RichEmbed()
        .setDescription(chat || "")
        .setColor(color || "WHITE");

        if (!anonymous) {
            embed
                .setThumbnail(messageObj.author.displayAvatarURL)
                .setTitle(messageObj.author.username)
        }

        if (url) {
            embed.setImage(url);
        }
        
        return embed;
    },
    postMessage: function(messageObj, title, chat) {
        messageObj.send({
            embed: {
                color: color,
                fields: [{
                    name: title,
                    value: chat
                }]
            }
        });
    },
    postEmbed: function(messageObj, embedObj) {
        messageObj.delete(1000);
        embedObj.color = color;
        messageObj.channel.send({embed: embedObj});
    },
    attachLocalImage: function(embed, pathName) {
        embed.attachFiles([pathName]).setImage("attachment://" + path.basename(pathName)).setColor(color);
        return embed;
    }
};

exports.utils = utils;