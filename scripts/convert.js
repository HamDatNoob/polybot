const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment, MessageButtonStyle, MessageButton, MessageActionRow } = require('discord.js');
const { Deserializer, Serializer, SlotDeserializer, SlotSerializer } = require('./polyparser.js');
const axios = require("axios");


async function handleConvert(message) {
    // Make sure the user isn't a bot
    if (message.author.bot) return;

    if (message.attachments.size >= 1) {
        // Get the first attachment
        let a = message.attachments.values().next().value;

        let type;

        // Check if the name is .layout, .layout.json, .slot, or .slot.json
        if (a.name.endsWith(".layout")) {
            type = 0;
        } else if (a.name.endsWith(".layout.json")) {
            type = 1;
        } else if (a.name.endsWith(".slot")) {
            type = 2;
        } else if (a.name.endsWith(".slot.json")) {
            type = 3;
        } else {
            // we don't care about it
            return;
        }

        // Add the reaction to the message
        await message.react('♻️');

        // Add a collector to wait for a reaction on the emoji
        const filter = (r, u) => r.emoji.name === "recycle";
        const collector = message.createReactionCollector(filter, {time: 300000});  // listen for 5 minutes
        collector.on('collect', (r, u) => {
            // make sure the user is not a bot (including self)
            if (u.bot) return;

            // remove the reaction
            r.remove();

            // remove the listener (to prevent it from executing when somebody tries to re-add a recycle reaction)
            collector.removeAllListeners();

            // Handle conversion

            // first, get the attachment
            const a = r.message.attachments.values().next().value
            const url = a.url;

            axios.get(url, {responseType: "arraybuffer"}).then(async (resp) => {
                let buffer, attachment;
                if (type === 0) {  // .layout
                    const o = new Deserializer(resp.data);
                    o.deserializeLayout();
                    const j = o.dumpJSON();
                    // For message
                    buffer = Buffer.from(j);
                    attachment = new MessageAttachment(buffer, a.name + ".json");
                } else if (type === 1) {  // .layout.json
                    const o = new Serializer(resp.data.toString());
                    o.serializeLayout();
                    attachment = new MessageAttachment(o.buffer, a.name + ".layout");
                } else if (type === 2) {  // .slot
                    const o = new SlotDeserializer(resp.data);
                    o.deserializeSlot();
                    const j = o.dumpJSON();
                    // For message
                    buffer = Buffer.from(j);
                    attachment = new MessageAttachment(buffer, a.name + ".json");
                } else if (type === 3) {  // .slot.json
                    const o = new SlotSerializer(resp.data.toString());
                    o.serializeSlot();
                    attachment = new MessageAttachment(o.buffer, a.name + ".slot");
                }


                await message.reply(
                    {
                        content: "<@" + u.id + ">, Done!",
                        files: [attachment]
                    }
                ).then((msg) => {
                    // React with an '❌'
                    msg.react("❌");

                    const filter2 = (r, u) => r.emoji.name === "x";
                    const collector2 = msg.createReactionCollector(filter2, {time: 300000});  // 5 minute timeout
                    collector2.on('collect', async (r, u) => {
                        if (u.bot) return;

                        await r.message.delete();
                    });
                });
            });
        });  // On reaction add
    }
}

module.exports = {
    handleConvert
};
