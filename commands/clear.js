const { SlashCommandBuilder } = require('discord.js');
const db = require('quick.db');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('clear')
	.setDescription('Clears all current cooldowns and nominations'),
	async execute(interaction){
		if(['767933568940638248', '461683459484549121', '875943961146032158', '891386997271298069', '891386997271298069'].some(v => interaction.member._roles.includes(v))){ // mod, supermod, dev, robotics
			const channels = Array.from(interaction.guild.channels.cache.filter(v => ![2, 4].includes(v.type)), ([id, value]) => ({ id, value }));

			for(let i in channels){
				db.delete(`${channels[i].id}.cooldown`);
			}

			let dbLength = await db.get('nominations') || {};
			dbLength = Object.values(dbLength).length;

			db.delete(`nominations`);

			await interaction.reply({ content: `Cleared cooldowns from ${channels.length} channels and ${dbLength} nominations.`, ephemeral: true });
		}else{
			return interaction.reply({ content: 'You do not have the adequate permissions to perform this action!', ephemeral: true });
		}
	}
}