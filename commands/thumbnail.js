const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('thumbnail')
		.setDescription('Displays information about the bot')
}