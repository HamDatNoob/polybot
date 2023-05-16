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

		const code = fixedMatch[0].join("-");

		if(message){
			if(db.has(`${message.channelId}.cooldown.${code}`) || db.get(`${message.channelId}.paused`)) return;

			db.push(`${message.channelId}.cooldown.${code}`, code);
		}

		if(!codes.includes(code)){
			if(message) return;
			if(interaction) return interaction.reply({ content: `Invalid level code! Examples: 1-1, 4-08, CR-7\n\nYou entered: \`${msg}\``, ephemeral: true });
		}

		const pb1Worlds = { 1: "Alpine Meadows", 2: "Desert Winds", 3: "Snow Drift", 4: "Ancient Ruins", 5: "80s Fun Land", 6: "Zen Gardens", 7: "Tropical Paradise", 8: "Area 52" };
		const pb2Worlds = { 1: "Pine Mountains", 2: "Glowing Gorge", 3: "Tranquil Oasis", 4: "Sanguine Gulch", 5: "Serenity Valley", 6: "Steamtown", B1: "Glittering Gorge", B2: "Gleamtown" };
		const pb3Worlds = { CR: "Classic Rock", MM: "Miner Mountains", BB: "Bifrost Bend", RB: "Rustic Barrens", VT: "Vaulty Towers", LL: "Lava Lagoon", RMT: "Radical Melt-Town", SC: "Serene Cyclades", DS: "Desert Springs", TT: "Twisted Turnpike", AT: "Arctic Tundra", FR: "Forgotten Realm" }

		let res = "";

		if(interaction) res = res.concat("interaction.reply({ content: ");
		if(message) res = res.concat("message.reply(");
		res = res.concat("\`Level Names for \\\`${fixedMatch[0].join(\"-\")}\\\`\\n");
		
		if(isNaN(fixedMatch[0][0].charAt(1))){ // checks for whether or not the world code is numeric, distinguishing pb1 and 2 from 3, ignoring the first character cause bonus worlds
			res = res.concat("PB3: ${pb3Worlds[fixedMatch[0][0]]} - ${pb3Levels[fixedMatch[0][0]][fixedMatch[0][1]].name}")
		}else{
			try{
				if(pb1Levels[fixedMatch[0][0]][fixedMatch[0][1]] != undefined){
					res = res.concat("PB1: ${pb1Worlds[fixedMatch[0][0]]} - ${pb1Levels[fixedMatch[0][0]][fixedMatch[0][1]].name}\\n");
				}
			}catch(err){}
			try{
				if(pb2Levels[fixedMatch[0][0]][fixedMatch[0][1]] != undefined){
					res = res.concat("PB2: ${pb2Worlds[fixedMatch[0][0]]} - ${pb2Levels[fixedMatch[0][0]][fixedMatch[0][1]].name}\\n");
				}
			}catch(err){}
			try{
				if(fixedMatch[0][1].charAt(2) == "c"){
					res = res.concat("Challenge: ||${pb2Levels[fixedMatch[0][0]][fixedMatch[0][1]].detail}||");
				}
			}catch(err){}
		}

		if(message) res = res.concat("\`);");
		if(interaction) res = res.concat("\`, ephemeral: true });");

		eval(res); // dont hurt me its in a controlled env

		sleep(900).then(() => {
			db.delete(`${message.channelId}.cooldown.${code}`);
		});

		// tackle pagnitaion later
	}
}