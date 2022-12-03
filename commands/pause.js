const { SlashCommandBuilder } = require('discord.js');
const db = require('quick.db');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('pause')
	.setDescription('Pauses public chat responses to the level command in the current channel'),
	async execute(interaction){
		if(['767933568940638248', '880330557014294631', '461683459484549121', '875943961146032158'].some(v => interaction.member._roles.includes(v))){ // mod, supermod, dev, robotics
			const channel = interaction.channelId;
			
			if(await db.get(`${channel}.paused`) == false){
				await db.set(`${channel}.paused`, true);
				await interaction.reply('Paused resposnses to the level command in this channel. Responses are still accessible via the /level command');
			}else{
				await db.set(`${channel}.paused`, false);
				await interaction.reply('Unpaused responses to the level command in this channel.');
			}
		}else{
			return interaction.reply({ content: 'You do not have the adequate permissions to perform this action!', ephemeral: true });
		}
	}
}