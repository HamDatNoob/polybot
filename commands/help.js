const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays information about the bot')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The name of the command you need help with')
                .addChoice('name', 'nameChoice')
                .addChoice('guide', 'guideChoice')
                .setRequired(false)),
	async execute(interaction){
        const icon = new MessageAttachment('./images/icon.png');
        if(interaction.options.getString('input')){
            const option = interaction.options.getString('input')
            const text = require('../json/helpMenu.json')

            const helpEmbed = new MessageEmbed()
            .setColor('#f9db44')
            .setTitle('Help')
            .setThumbnail('attachment://icon.png')
            .setDescription(`${text[option].title}`)
            .addFields(
                { name: text[option].fields.heading1, value: text[option].fields.body1 }
            )

            await interaction.reply({ embeds: [helpEmbed], files: [icon], ephemeral: true });
        }else{
            const startEmbed = new MessageEmbed()
                .setColor('#f9db44')
                .setTitle('Help')
                .setThumbnail('attachment://icon.png')
                .setDescription('To get help on specific parts of the bot,\nuse the select menu below to choose a section.')
            const helpMenu = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('helpMenu')
                        .setPlaceholder('Nothing selected')
                        .addOptions([
                            {
                                label: 'guide',
                                description: 'Displays help about the guide command',
                                value: 'guideChoice',
                            },
                            {
                                label: 'name',
                                description: 'Displays help about the name command',
                                value: 'nameChoice',
                            },
                        ]),
                );
            

            await interaction.reply({ embeds: [startEmbed], files: [icon], components: [helpMenu], ephemeral: true });
        }
	},
};