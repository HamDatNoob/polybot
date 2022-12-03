const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const linkages = require('../json/linkages.json');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('linkages')
	.setDescription('Gives a diagram for linkages to help build them')
	.addStringOption(option =>
		option
		.setName('linkages')
		.setDescription('The specific linkage thingy dkjfjsalgjlakjfgj arglins the only one that\'ll ever read this anyways')
		.setRequired(true)
		.setAutocomplete(true)
	),
	async execute(interaction){
		const option = interaction.options._hoistedOptions[0].value;

		const embed = new EmbedBuilder()
		.setTitle(linkages[option].name)
		.setDescription(linkages[option].description)
		.setImage(linkages[option].image)
		.setColor('#f9db44')
		.setThumbnail('https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png')

		return interaction.reply({ embeds: [embed] });
	},
};