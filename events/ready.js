const db = require('quick.db');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		
		let channels = [];
		client.guilds.cache.forEach(e => {
			channels.push(Array.from(e.channels.cache.filter(v => ![2, 4].includes(v.type)), ([id, value]) => ({ id, value })));
		});
		
		channels = channels.flat();
		
		for(let i in channels){
			db.delete(`${channels[i].id}.cooldown`);
		}

		console.log(`Cleared cooldowns from ${channels.length} channels.`);
	},
};