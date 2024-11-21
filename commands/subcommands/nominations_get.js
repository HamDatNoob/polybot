const db = require('quick.db');
const { check } = require('../../scripts/check.js');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const package = require('../../package.json')

module.exports = {
	async execute(interaction){
        const nomId = interaction.options.getString('workshop-id');

        await interaction.deferReply();

        if(await check(interaction, nomId)) return;

        if(db.has(`nominations.${nomId}`)){
            const res = await db.get(`nominations.${nomId}`);

            let s = '';
            if(res.count != 1) s = 's';

            const embedField = [{
                name: `${res.title} - \`${res.id}\` | Suggested \`${res.count}\` time${s}`, 
                value: `Status: \`${res.status}\`, Suggested on: <t:${Math.round(res.date / 1000)}:f>` 
            }];

            const embed = [
                new EmbedBuilder()
                    .setColor('#9BAEFE')
                    .setFooter({ text: `Polybot v${package.version}, by @ha_m  | Use \"/nominations add\" to nominate a level!`, iconURL: 'https://cdn.discordapp.com/attachments/1054531526030799038/1125659991957844038/icon.png' })
                    .addFields(embedField)
            ];

            const link = [
                new ButtonBuilder()
                    .setLabel(`Steam Page`)
                    .setURL(res.link)
                    .setStyle(ButtonStyle.Link)
            ];

            const row = [
                new ActionRowBuilder()
                    .addComponents(link)
            ];

            return interaction.followUp({ embeds: embed, components: row });
        }else{
            return interaction.followUp({ content: `\`${nomId}\` has not been suggested!` });
        } 
    }
}