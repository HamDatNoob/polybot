const { SlashCommandBuilder } = require('discord.js');
const db = require('quick.db');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('clear')
	.setDescription('Clears all current cooldowns, useful if the bot goes down'),
	async execute(interaction){
		if(['767933568940638248', '880330557014294631', '461683459484549121', '875943961146032158', '891386997271298069'].some(v => interaction.member._roles.includes(v))){ // mod, supermod, dev, robotics
			const channels = Array.from(interaction.guild.channels.cache.filter(v => ![2, 4].includes(v.type)), ([id, value]) => ({ id, value }));

			for(let i in channels){
				db.delete(`${channels[i].id}.cooldown`);
			}
			await interaction.reply({ content: `Cleared cooldowns from ${channels.length} channels.`, ephemeral: true });
		}else{
			return interaction.reply({ content: 'You do not have the adequate permissions to perform this action!', ephemeral: true });
		}
	}
}