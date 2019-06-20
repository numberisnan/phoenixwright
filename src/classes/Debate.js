const dicord = require("discord.js");
const config = require("../../config");
const { Judge } = require("./Judge");
const { RicherEmbed }  = require("./RicherEmbed");
const { setTimeoutAsync, idFromMention } = require("../lib/debateUtils");

class Debate {
    constructor({client, channelObj, prosecutor, defender, topic}) {
        this.client = client;
        this.channel = channelObj;
        this.prosecutor = prosecutor;
        this.defender = defender;
        this.topic = topic;

        this.prosecutor.credibility = config.maxCredibility;
        this.defender.credibility = config.maxCredibility;

        this.Judge = new Judge(channelObj);
    }

    async init() {
        const self = this;
        await new RicherEmbed(this.channel)
            .setLocalImage("../assets/images/court.jpg")
            .setTitle("*Murmuring*")
            .send();
        await this.Judge.speak("Court is now in session for the trial of " + this.topic, {localImage: "../assets/images/gavel.png"});

        const readyMessage = await this.Judge.speak(`Prosecutor <@${this.prosecutor.id}>, are you ready?\nDefense <@${this.defender.id}>, are you ready?\n(React with thumbs up within 30 seconds to continue)`);

        await Promise.race([
            Promise.all([
                this.awaitReaction(readyMessage, ["👍"], this.prosecutor),
                this.awaitReaction(readyMessage, ["👍"], this.defender)
            ]),
            setTimeoutAsync(1000 * 30)
        ])
            .then(async function(data) {
                if (data) {
                    // Reactions!
                    await self.start();
                } else {
                    // No reactions
                    self.Judge.speak("As the defense and prosecution are not present, the trial is hereby suspended.")
                }
            });
    }
    async start() {
        await this.Judge.speak("Prosecutor <@" + this.prosecutor.id + ">, please give the court your opening statement.\n(Send only one message)");

        await this.awaitMessage(this.prosecutor);

        while (this.prosecutor.credibility > 0 && this.defender.credibility > 0) {
            await this.Judge.speak("Very well. You may call up a witness.\n(@mention someone to make them a witness.)");

            // For each witness
            const witness = await this.awaitMessage(this.prosecutor);
            const witnessId = idFromMention(witness.content);

            await this.Judge.speak(witness.cleanContent + ". Testify to court what you know about " + this.topic);

            await this.show(false, false, "../assets/images/testimony.gif");

            await this.awaitMessage(witnessId);

            await this.Judge.speak("The defense may now cross examine the witness.\n(A DM was sent to you containing instructions)");

            // Send instructions
            if (!this.defender.dmChannel) {
                await this.defender.createDM();
            }

            this.defender.username !== "Number.isNaN" && new RicherEmbed(this.defender.dmChannel, { // TODO: Remove for production
                title: "Cross Examinations",
                fields: [
                    {
                        name: "What it is",
                        value: "A series of questions (up to 3) attempting to find a contradiction in or discredit a witness testimony. Successfully doing so will either expose lies that the witness is saying and make them lose credibility."
                    },
                    {
                        name: "Procedure",
                        value: "When the Judge says so, either ask a question, or point out an objection. To make an objection, first enter 'objection', creating an objection dialogue. Then, in one message, write your objection. Feel free to use other chat commands at you see fit. (They don't count as your three questions!)"
                    }
                ]
            }).send();


            for (var j = 1; j <= config.crossExamination.questions; j++) {
                await this.awaitMessage(this.defender);

                const lastMessage = this.channel.lastMessage;
                if (lastMessage.content.startsWith("objection")) {
                    await new RicherEmbed(lastMessage.channel)
                        .setImage("https://i.kym-cdn.com/photos/images/newsfeed/000/171/527/objection-vector.png?1315394911")
                        .send();
                    break;
                } else {
                    await this.awaitMessage(witnessId); // Response to question
                    await this.Judge.speak("You have " + (config.crossExamination.questions - j) + " questions remaining.")
                }
            }

            await this.objection();
        }
    }
    async objection() {
        await this.Judge.speak("You have an objection? Please state the objection.");

        var objection = await this.awaitMessage(this.defender);

        await this.Judge.speak("What do you think, Ladies and Gentlemen of the Jury? Is this objection valid?\n(React with thumbs up or down to the objection)");

        var objectionResponse = await objection.awaitReactions(
            reaction => ["👍","👎"].includes(reaction.emoji.name),
            { time: 30 * 1000 });

        if (
            (function() {
                var up = 0, down = 0;
                for (var [key, value] of objectionResponse) {
                    if (value._emoji.name === "👍") {
                        up++;
                    } else if (value._emoji.name === "👎") {
                        down++;
                    }
                }
                return up >= down;
            })()
        ) {
            // Sustained
            await this.Judge.speak("Objection sustained.\nProsecution, explain this.");
            this.prosecutor.credibility--;
            await this.show(this.prosecutor.username + " has " + this.prosecutor.credibility + " credibility left.", this.prosecutor.username + "'s Credibility", "../assets/images/credibility.png");

            return true;
        } else {
            // Overruled
            await this.Judge.speak("Objection overruled.");
            this.defender.credibility--;
            await this.show(this.defender.username + " has " + this.defender.credibility + " credibility left.", this.defender.username + "'s Credibility", "../assets/images/credibility.png");

            return false;
        }
    }
    awaitReaction(message, reaction, user) {
        const self = this;
        return new Promise(function (resolve) {
            self.client.on('messageReactionAdd', function checkReaction(r, u) {
                if (r.message !== message) return;

                if ((user === "any" || user.id === u.id) && (reaction === "any" || reaction.includes(r.emoji.name))) {
                    // Success
                    self.client.removeListener('messageReactionAdd', checkReaction);
                    resolve(reaction);
                }
            });
        });
    };
    awaitMessage(user) {
        const self = this;
        return new Promise(function(resolve) {
            self.client.on("message", function checkForMessage(message) {
                if (((typeof message.valueOf() === "object" && (message.author.id === user.id || user === "any")) || message.author.id === user) && !message.content.startsWith(config.prefix)) {
                    // Success
                    self.client.removeListener("message", checkForMessage);
                    resolve(message);
                }

            })
        })
    }
    show(text, title, image) {
        const embed = new RicherEmbed(this.channel);
        text && embed.setDescription(text);
        title && embed.setTitle(title);
        image && (image.startsWith("http") ? embed.setImage(image) : embed.setLocalImage(image));
        return embed.send()
    }
}

exports.Debate = Debate;