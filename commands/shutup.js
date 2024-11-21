const { SlashCommandBuilder } = require('discord.js');
const db = require('quick.db');
const { sleep } = require('../scripts/sleep.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('shutup')
	.setDescription('Pauses public chat responses to the level command in the current channel for 15 minutes'),
	async execute(interaction){
		if(['715954939330953317', '461375699337609216', '767933422432682054', '461371349986836491', '767933568940638248', '880330557014294631', '461683459484549121', '875943961146032158', '891386997271298069'].some(v => interaction.member._roles.includes(v))){ // classic, masters 1 & 2, grandmaster, mod, supermod, dev, robotics
			const channel = interaction.channelId;
	
			await db.set(`${channel}.paused`, true);
			await interaction.reply('Temporarily paused responses to the level command in this channel for 15 minutes. Responses are still accessible via the /level command');
	
			await sleep(885); // waits 14.75 minutes (short so interaction doesn't expire)
	
			await db.set(`${channel}.paused`, false);
			return interaction.followUp('Unpaused level responses in this channel.');
		}else{
			return interaction.reply({ content: 'You do not have the adequate permissions to perform this action!', ephemeral: true });
		}
	}
}