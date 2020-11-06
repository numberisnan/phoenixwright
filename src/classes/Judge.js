const {RicherEmbed} = require("richer-embed");

class Judge {
    constructor(channelObj) {
        this.channel = channelObj;
    }

    speak(text, options = {}) {
        const embed = new RicherEmbed(this.channel);

        if (options.image) {
            embed.setImage(options.image);
        } else if (options.localImage) {
            embed.setLocalImage(options.localImage);
        }

        return embed
            .setLocalThumbnail("../assets/images/judge.jpg")
            .setContent("Judge", text)
            .send();
    }
}

exports.Judge = Judge;
