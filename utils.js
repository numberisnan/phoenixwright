const Discord = require("discord.js")
const utils = {
    postImage: function(channelObj, url) {
        const embed = new Discord.RichEmbed().setImage(url);
        channelObj.send({ embed })
    },
    postMessage: function(channelObj, title, md) {
        channelObj.send({
            embed: {
                fields: [{
                    name: title,
                    value: md
                }]
            }
        })
    },
    postEmbed: function(channelObj, embedObj) {
        channelObj.send({embed: embedObj});
    }
}

exports.utils = utils;