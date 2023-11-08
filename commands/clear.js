const { SlashCommandBuilder } = require('discord.js');
const db = require('quick.db');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('clear')
	.setDescription('Clears all current cooldowns and nominations')
	.addBooleanOption(option => option
		.setName('nominations')
		.setDescription('Whether to delete nominations as well as cooldowns (defaults false)')
		.setRequired(false)
	),
	async execute(interaction){
		if(['767933568940638248', '461683459484549121', '875943961146032158', '891386997271298069', '891386997271298069'].some(v => interaction.member._roles.includes(v))){ // mod, supermod, dev, robotics
			const channels = Array.from(interaction.guild.channels.cache.filter(v => ![2, 4].includes(v.type)), ([id, value]) => ({ id, value }));
			const delNoms = interaction.options.getBoolean('nominations') || false;

			for(let i in channels){
				db.delete(`${channels[i].id}.cooldown`);
			}

			if(delNoms){
				let dbLength = await db.get('nominations') || {};
				dbLength = Object.values(dbLength).length;
	
				db.delete(`nominations`);

				return interaction.reply({ content: `Cleared cooldowns from ${channels.length} channels and ${dbLength} nominations.`, ephemeral: true });
			}else{
				return interaction.reply({ content: `Cleared cooldowns from ${channels.length} channels.`, ephemeral: true });
			}
		}else{
			return interaction.reply({ content: 'You do not have the adequate permissions to perform this action!', ephemeral: true });
		}
	}
}