const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('quick.db');
const { sleep } = require('../scripts/sleep.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('shutup')
	.setDescription('Pauses public chat responses to the level command in the current channel for 15 minutes'),
	async execute(interaction){
		const channel = interaction.channelId;
	
		await db.set(`${channel}.paused`, true);
		await interaction.reply('Temporarily paused responses to the level command in this channel for 15 minutes. Responses are still accessible via the /level command');

		await sleep(885); // waits 14.75 minutes (short so interaction doesn't expire)

		await db.set(`${channel}.paused`, false);
		await interaction.followUp('Unpaused level responses in this channel.');
	}
}