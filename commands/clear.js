const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('quick.db');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('clear')
	.setDescription('Clears all current cooldowns, useful if the bot goes down'),
	async execute(interaction){
		let channel = interaction.channelId;

		let state = db.get(`${channel}.paused`);
		db.delete(channel);
		db.set(`${channel}.paused`, state);

		await interaction.reply({ content: 'Cleared all level command cooldowns in all channels', ephemeral: true });
	}
}