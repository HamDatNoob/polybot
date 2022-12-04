const { SlashCommandBuilder } = require('discord.js');
const db = require('quick.db');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('clear')
	.setDescription('Clears all current cooldowns, useful if the bot goes down'),
	async execute(interaction){
		//if(['767933568940638248', '880330557014294631', '461683459484549121', '875943961146032158'].some(v => interaction.member._roles.includes(v))){ // mod, supermod, dev, robotics
			let channel = interaction.channelId;

			let state = db.get(`${channel}.paused`);
			db.delete(channel);
			db.set(`${channel}.paused`, state);

			await interaction.reply({ content: 'Cleared all level command cooldowns in all channels', ephemeral: true });
		//}else{
		//	return interaction.reply({ content: 'You do not have the adequate permissions to perform this action!', ephemeral: true });
		//}
	}
}