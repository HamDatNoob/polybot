const { SlashCommandBuilder } = require('discord.js');
const pb1Levels = require('../json/pb1Levels.json');
const pb2Levels = require('../json/pb2Levels.json');
const pb3Levels = require('../json/pb3Levels.json');
const codes = require('../json/codes.json');
const db = require('quick.db');
const { sleep } = require('../scripts/sleep.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('level')
	.setDescription('Displays the corresponding level name to a level code')
	.addStringOption(option =>
		option
		.setName('code')
		.setDescription('Input a level code, ex: 1-1, 4-08, CR-1')
		.setRequired(true)
	),
	async execute(interaction, message){
		const msg = (interaction?.options._hoistedOptions[0].value || message.content);

		const match = msg.match(/(?:(?<=\s)|^)(?:[1-6]-(?:[1-9]|1[0-6]|0[1-9])c?|[78]-(?:[1-9]|1[0-5]|0[1-9])|[a-z]{2,3}-(?:[1-9]|1[0-4]|0[1-9])|b[12]-(?:[1-9]|1[0-6]|0[1-9]))(?:(?=\s)|$)/gmi);

		if(!match){
			if(message) return;
			if(interaction) return interaction.reply({ content: `Invalid level code! Examples: 1-1, 4-08, CR-7\n\nYou entered: \`${msg}\``, ephemeral: true });
		}

		const fixedMatch = [];
		for(let i in match){
			fixedMatch.push(match[i].split("-"));
			fixedMatch[i][0] = fixedMatch[i][0].toUpperCase();
			fixedMatch[i][1] = fixedMatch[i][1].toLowerCase();
			if(fixedMatch[i][1].length == 1 || fixedMatch[i][1].charAt(1) == "c") fixedMatch[i][1] = "0".concat(fixedMatch[i][1]);
		}

		let first = true;
		let reply;

		async function getCode(l){
			const code = fixedMatch[l].join("-");

			if(message && first){
				if(db.has(`${message.channelId}.cooldown.${code}`) || db.get(`${message.channelId}.paused`)) return;
	
				db.push(`${message.channelId}.cooldown.${code}`, code);
			}
	
			if(!codes.includes(code)){
				if(message) return;
				if(interaction) return interaction.reply({ content: `Invalid level code! Examples: 1-1, 4-08, CR-7\n\nYou entered: \`${msg}\``, ephemeral: true });
			}
	
			const pb1Worlds = { 1: "Alpine Meadows", 2: "Desert Winds", 3: "Snow Drift", 4: "Ancient Ruins", 5: "80s Fun Land", 6: "Zen Gardens", 7: "Tropical Paradise", 8: "Area 52"};
			const pb2Worlds = { 1: "Pine Mountains", 2: "Glowing Gorge", 3: "Tranquil Oasis", 4: "Sanguine Gulch", 5: "Serenity Valley", 6: "Steamtown"};
			const pb3Worlds = { CR: "Classic Rock", MM: "Miner Mountains", BB: "Bifrost Bend", RB: "Rustic Barrens", VT: "Vaulty Towers", LL: "Lava Lagoon", RMT: "Radical Melt-Town", SC: "Serene Cyclades", DS: "Desert Springs", TT: "Twisted Turnpike", AT: "Arctic Tundra", FR: "Forgotten Realm" }
	
			let res = "";
	
			if(interaction) res = res.concat("interaction.reply({ content: ");
			if(message && first) res = res.concat("message.channel.send(");
			if(!first) res = res.concat("reply.edit(");
			res = res.concat("\`Level Names for \\\`${fixedMatch[l].join(\"-\")}\\\`\\n");
			
			if(isNaN(fixedMatch[l][0])){ // checks for whether or not the world code is numeric, distinguishing pb1 and 2 from 3
				res = res.concat("PB3: ${pb3Worlds[fixedMatch[l][0]]} - ${pb3Levels[fixedMatch[l][0]][fixedMatch[l][1]].name}")
			}else{
				try{
					if(pb1Levels[fixedMatch[l][0]][fixedMatch[l][1]] != undefined){
						res = res.concat("PB1: ${pb1Worlds[fixedMatch[l][0]]} - ${pb1Levels[fixedMatch[l][0]][fixedMatch[l][1]].name}\\n");
					}
				}catch(err){}
				try{
					if(pb2Levels[fixedMatch[l][0]][fixedMatch[l][1]] != undefined){
						res = res.concat("PB2: ${pb2Worlds[fixedMatch[l][0]]} - ${pb2Levels[fixedMatch[l][0]][fixedMatch[l][1]].name}\\n");
					}
				}catch(err){}
				try{
					if(fixedMatch[l][1].charAt(2) == "c"){
						res = res.concat("Challenge: ||${pb2Levels[fixedMatch[l][0]][fixedMatch[l][1]].detail}||");
					}
				}catch(err){}
			}
	
			if(message) res = res.concat("\`);");
			if(interaction) res = res.concat("\`, ephemeral: true });");
	
			reply = await eval(res); // dont hurt me its in a controlled env

			if(first){
				sleep(30).then(() => {
					db.delete(`${message.channelId}.cooldown.${code}`);
				});
			}

			first = false;

			if(interaction) return;

			try{
				await reply.react('❌');
				if(l > 0) await reply.react('⬅️');
				if(fixedMatch.length > l + 1) await reply.react('➡️');

				const collectorFilter = (reaction, user) => {
					return ['❌', '⬅️', '➡️'].includes(reaction.emoji.name) && !user.bot;
				};

				reply.awaitReactions({ filter: collectorFilter, max: 1, time: 60000, errors: ['time'] }).then(collected => {
					const reaction = collected.first();

					if(reaction.emoji.name === '❌'){
						return reply.delete();
					}else if(reaction.emoji.name === '➡️'){
						reply.reactions.removeAll();
						getCode(l + 1);
					}else if(reaction.emoji.name === '⬅️'){
						reply.reactions.removeAll();
						getCode(l - 1);
					}
				})
				.catch(() => {
					reply.reactions.removeAll();
				});
			}catch(err){
				console.error(err);
			}
		}

		getCode(0);
	}
}