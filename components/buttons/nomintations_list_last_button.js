const db = require('quick.db');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const package = require('../../package.json');

module.exports = {
    name: 'nomintations_list_last_button',
	async execute(interaction){
        const noms = Object.values(await db.get("nominations"));
        noms.sort((a, b) => b.date - a.date);

        async function list(page){
            let set = noms.slice(page * 5, Math.min(page * 5 + 5, noms.length));

            const linkButtons = [];
            const rows = [];
            const embedFields = [];
            for(let i in set){
                let levelNum = noms.indexOf(set[i]) + 1;
                let s = '';
                if(set[i].count != 1) s = 's';
                
                linkButtons.push(new ButtonBuilder()
                    .setLabel(`${levelNum}`)
                    .setURL(noms[i].link)
                    .setStyle(ButtonStyle.Link)
                );

                embedFields.push({
                    name: `${levelNum}: ${set[i].title} - \`${set[i].id}\` | Suggested \`${set[i].count}\` time${s}`, 
                    value: `Status: \`${set[i].status}\`, Suggested on: <t:${Math.round(set[i].date / 1000)}:f>` 
                });
            }

            
            const embed = [
                new EmbedBuilder()
                    .setTitle(`Weekly Nominations: Page ${page + 1}`)
                    .setColor('#9BAEFE')
                    .setFooter({ text: `Polybot v${package.version}, by @ha_m  | Use \"/nominations add\" to nominate a level!`, iconURL: 'https://cdn.discordapp.com/attachments/1054531526030799038/1125659991957844038/icon.png' })
                    .addFields(embedFields)
            ];

            if(set.length > 0){
                rows.push(
                    new ActionRowBuilder()
                        .addComponents(linkButtons)
                )
            }

            let disabledButtons = [false, false, false];
            if(page == 0) disabledButtons[0] = true;
            if(Math.floor(noms.length / 5) == 0) disabledButtons[1] = true;
            if(page == Math.floor(noms.length / 5)) disabledButtons[2] = true;
    
            const navButtons = [
                new ButtonBuilder()
                    .setEmoji('⏮️')
                    .setCustomId('nomintations_list_first_button')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(disabledButtons[0]),
    
                new ButtonBuilder()
                    .setEmoji('◀️')
                    .setCustomId('nomintations_list_backward_button')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(disabledButtons[0]),
    
                new ButtonBuilder()
                    .setEmoji('#️⃣')
                    .setCustomId('nomintations_list_search_button')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(disabledButtons[1]),
    
                new ButtonBuilder()
                    .setEmoji('▶️')
                    .setCustomId('nomintations_list_forward_button')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(disabledButtons[2]),
    
                new ButtonBuilder()
                    .setEmoji('⏭️')
                    .setCustomId('nomintations_list_last_button')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(disabledButtons[2]),
            ];

            rows.push(
                new ActionRowBuilder()
                    .addComponents(navButtons)
            );
                
            return interaction.reply({ embeds: embed, components: rows });
        }

        list(Math.floor(noms.length / 5));
    }
}