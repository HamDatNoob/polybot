const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('quick.db');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('pause')
	.setDescription('Pauses public chat responses to the level command in the current channel.'),
	async execute(interaction){
		const channel = interaction.channelId;
		
		if(await db.get(`${channel}.paused`) == false){
			await db.set(`${channel}.paused`, true);
			await interaction.reply('Paused resposnses to the level command in this channel. Responses are still accessible via the /level command');
		}else{
			await db.set(`${channel}.paused`, false);
			await interaction.reply('Unpaused responses to the level command in this channel.');
		}
	}
}