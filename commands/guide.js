const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getGuide } = require('../scripts/guideEmbeds.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('guide')
	.setDescription('Displays information and help on concepts in the game')
	.addStringOption(option =>
		option
		.setName('category')
		.setDescription('Category for the thing help is needed with')
		.setRequired(true)
		.addChoices(
			{ name: 'Basics', value: 'basics' },
			{ name: 'Hydraulics', value: 'hydraulics' },
			{ name: 'Sandbox', value: 'sandbox' },
			{ name: 'Shortcuts', value: 'shortcuts' },
			{ name: 'Budgeting', value: 'budgeting' }
		)
	)
	.addStringOption(option =>
		option
		.setName('group')
		.setDescription('The specific thing help is needed with')
		.setRequired(true)
		.setAutocomplete(true)
	),
	async execute(interaction){
		const category = interaction.options._hoistedOptions[0].value;
		const group = interaction.options._hoistedOptions[1].value;
		
		const data = getGuide(category, group);

		let guideEmbed;
		if(category != 'budgeting'){
			guideEmbed = new EmbedBuilder()
			.setTitle(data.name)
			.setColor('#f9db44')
			.setThumbnail('https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png')
			.setDescription(data.description)
			.setImage(data.image)

			return interaction.reply({ embeds: [guideEmbed] })
		}else{
			guideEmbed = new EmbedBuilder()
			.setTitle(data.name)
			.setColor('#f9db44')
			.setThumbnail('https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png')
			.setDescription(data.description)

			const link = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
				.setLabel('Handbook')
				.setStyle(ButtonStyle.Link)
				.setURL('https://docs.google.com/document/d/1NmuRDXXJFX5ayPbg6WuFwQYK7uYn8Aajpt2dA1rDnt8/edit?usp=sharing')
			)
			return interaction.reply({ embeds: [guideEmbed], components: [link] })
		}
	}
};