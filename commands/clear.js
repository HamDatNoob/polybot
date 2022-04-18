const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('quick.db');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('clear')
	.setDescription('Clears all current cooldowns. Useful if the bot goes down.'),
	async execute(interaction){
		let channels = Array.from(interaction.guild.channels.cache.keys());

		for(let i in channels){
			if(!interaction.guild.channels.resolve(channels[i]).isText()){
				channels.splice(i, 1);
			}
		}

		channels.shift();

		let state = [];
		for(let i in channels){
			state.push(db.get(`${channels[i]}.paused`));
			db.delete(channels[i]);
			db.set(`${channels[i]}.paused`, state[i]);
		}

		await interaction.reply({ content: 'Clearned all level command cooldowns in all channels', ephemeral: true });
	}
}