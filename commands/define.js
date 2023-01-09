const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getTerm } = require('../scripts/termEmbeds.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('define')
	.setDescription('Displays information and help on concepts in the game')
	.addStringOption(option =>
		option
		.setName('category')
		.setDescription('Category for the thing help is needed with')
		.setRequired(true) 
		.addChoices(
			{ name: 'Exploits', value: 'exploits' },
			{ name: 'Bugs', value: 'bugs' },
			{ name: 'Budgeting Techniques', value: 'bt' },
			{ name: 'Other', value: 'other' }
		)
	)
	.addStringOption(option =>
		option
		.setName('term')
		.setDescription('The specific thing help is needed with')
		.setRequired(true)
		.setAutocomplete(true)
	),
	async execute(interaction){
		const category = interaction.options._hoistedOptions[0].value;
		const group = interaction.options._hoistedOptions[1].value;
		
		const data = getTerm(category, group);

		let guideEmbed = new EmbedBuilder()
		.setTitle(data.name)
		.setColor('#f9db44')
		.setThumbnail('https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png')
		.setDescription(data.description)
		.setImage(data.image)

		return interaction.reply({ embeds: [guideEmbed] });
	}
}