const { findBestMatch } = require('string-similarity');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const pb1Levels = require('../json/pb1Levels.json');
const pb2Levels = require('../json/pb2Levels.json');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('match')
	.setDescription('Searches for the level with the most similarity to the inputted string')
	.addStringOption(option =>
		option
		.setName('input')
		.setDescription('The string to match to level names')
		.setRequired(true)
	),
	async execute(interaction){
		const input = interaction.options.getString('input');

		const pb1Query = findBestMatch(input.toLowerCase(), pb1Levels.map(a => a.name.toLowerCase()));
		const pb2Query = findBestMatch(input.toLowerCase(), pb2Levels.map(a => a.name.toLowerCase()));

		let pb1MatchRating = pb1Query.bestMatch.rating.toFixed(2).substring(2).concat('%');
		const pb1Index = pb1Query.bestMatchIndex;

		let pb2MatchRating = pb2Query.bestMatch.rating.toFixed(2).substring(2).concat('%');
		const pb2Index = pb2Query.bestMatchIndex;

		if(pb1MatchRating == '00%') pb1MatchRating = '1'.concat(pb1MatchRating);
		if(pb2MatchRating == '00%') pb2MatchRating = '1'.concat(pb2MatchRating);

		const matchEmbed = new EmbedBuilder()
		.setTitle(`Level matches for '${input}'`)
		.setColor('#f9db44')
		.setThumbnail('https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png')
		.addFields(
			{ name: '\u200b', value: `PB1: ${pb1Levels[pb1Index].code}: ${pb1Levels[pb1Index].name}, ${pb1MatchRating} match!` },
			{ name: '\u200b', value: `PB2: ${pb2Levels[pb2Index].code}: ${pb2Levels[pb2Index].name}, ${pb2MatchRating} match!` }
		)

		await interaction.reply({ embeds: [matchEmbed], ephemeral: true })
	}
}