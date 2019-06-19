const {RichEmbed} = require("discord.js");
const {basename} = require("path");
const { color }  = require("../../config.json");

class RicherEmbed extends RichEmbed {
    constructor(channelObj, embedObj) {
        super();
        this.color = color;
        this.channel = channelObj;

        if (embedObj) {
            for (var prop in embedObj) { //Merge in all embed object props
                this[prop] = embedObj[prop];
            }
        }
    };
    personalise(authorObj) {
        this
            .setThumbnail(authorObj.displayAvatarURL)
            .setTitle(authorObj.username);
        return this;
    };

    setLocalThumbnail(pathName) {
        this
            .attachFiles([pathName])
            .setThumbnail("attachment://" + basename(pathName));
        return this;
    };

    setLocalImage(pathName) {
        this
            .attachFiles([pathName])
            .setImage("attachment://" + basename(pathName));
        return this;
    };

    setContent(title, chat) {
        this
            .setTitle(title)
            .setDescription(chat);
        return this;
    };

    replace(messageToReplace) {
        return messageToReplace.channel.send({embed: this})
            .then(res => messageToReplace.delete(1000))
            .catch(console.log);
    };

    send() {
        return this.channel.send({embed: this});
    }

    chat(authorObj, command, url) {
        this.personalise(authorObj).setImage(url).setDescription(command.split(" ").slice(1).join(" "));
        return this;
    };
}

exports.RicherEmbed = RicherEmbed;