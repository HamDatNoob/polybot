const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const linkageData = require('../json/linkage.json');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('linkage')
	.setDescription('Finds and displays a certain linkage from the Planar Linkage Repository')
	.addNumberOption(option =>
		option
		.setName('category')
		.setDescription('The type of linkage')
		.setRequired(true)
		.addChoices(
			{ name: 'Core Mechanisms and Essential Constructions', value: 1 },
			{ name: 'More Rotational Mechanisms', value: 2 },
			{ name: 'Approximate Linear Linkages and Walker Linkages', value: 3 },
			{ name: 'Exact Linear Linkages', value: 4 },
			{ name: 'Linkages for Dilation, Amplification / Reduction', value: 5 },
			{ name: 'Dwell Linkages', value: 6 },
			{ name: 'Advanced Engines', value: 7 },
			{ name: 'Stepper Motors', value: 8 },
			{ name: 'Miscellaneous Linkages and Constructions', value: 9 },
			{ name: 'Polygonal Constructions', value: 10 }
		)
	).addStringOption(option =>
		option
		.setName('linkage')
		.setDescription('The linkage to display')
		.setRequired(true)
		.setAutocomplete(false)
	),
	async execute(interaction){
		let text = linkageData.data.body.content.filter(v => v.paragraph.elements[0].textRun.content == interaction.options._hoistedOptions[0].name)
		console.log(text)
	},
};