const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment, MessageActionRow, MessageSelectMenu } = require('discord.js');
const text = require('../json/guideEmbeds.json');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('guide')
    .setDescription('Displays information and help on concepts in the game')
    .addStringOption(option =>
        option
        .setName('input')
        .setDescription('The name of the concept you need assistance with')
        .setRequired(false)
    ),
	async execute(interaction){
        const icon = new MessageAttachment('./images/icon.png');
        
        if(interaction.options.getString('input')){
            const option = interaction.options.getString('input');
            const text = require('../json/guideEmbeds.json');

            const guideEmbed = new MessageEmbed()
            .setColor('#f9db44')
            .setTitle('Guide')
            .setThumbnail('attachment://icon.png')
            .setDescription(`${text[option].title}`)
            //.addFields(
            //    { name: text[option].fields.heading1, value: text[option].fields.body1 }
            //)

            await interaction.reply({ embeds: [guideEmbed], files: [icon], ephemeral: true });
        }else{
            const startEmbed = new MessageEmbed()
            .setColor('#f9db44')
            .setTitle('Guide')
            .setThumbnail('attachment://icon.png')
            .setDescription('To get help on specific concepts in the game,\nuse the select menu below to choose a section.')
            const guideMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId('guideMenu')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    { label: 'a', value: '0' },
                    { label: 'b', value: '1' },
                    { label: 'c', value: '2' }
                ]),
            );
            

            await interaction.reply({ embeds: [startEmbed], files: [icon], components: [guideMenu], ephemeral: true });
        }
	},
};