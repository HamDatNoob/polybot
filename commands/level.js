const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Displays the complete name of a level')
		.addStringOption(option =>
			option.setName('code')
				.setDescription('Input a level code. Ex: 1-1')
				.setRequired(true)
		),
	async execute(interaction, message){
		const pb1Levels = require('../json/pb1Levels.json');
		const pb2Levels = require('../json/pb2Levels.json');

		let msg;
		if(interaction){
			msg = interaction.options.getString('code').match(/[1-8]-\d[\dc]?c?/gmi);
			interaction.deferReply();
		}else if(message){
			msg = message.content.match(/[1-8]-\d[\dc]?c?/gmi);
		}else{
			console.error(error);
		}
		
		console.log(msg)

		for(let i in msg){
			let c = msg[i].toLowerCase();
			
			const pb1Worlds = ["Alpine Meadows", "Desert Winds", "Snow Drift", "Ancient Ruins", "80s Fun Land", "Zen Gardens", "Tropical Paradise", "Area 52"];
			const pb2Worlds = ["Pine Mountains", "Glowing Gorge", "Tranquil Oasis", "Sanguine Gulch", "Serenity Valley", "Steamtown"];

			if(c.match(/[1-8]-0\dc?/gmi) != null){ //removes extra 0
				let codeSplit = c.split('');
				codeSplit.splice(2, 1);
				c = codeSplit.join('');
			}

			const w = c.slice(0, 1) - 1;

			const li1 = 'bruh'
			const li2 = 'am dum'
			
			console.log(li1, li2)

			

			if(c.match(/[1-6]-\d\d?c{0}/gmi) != null){
				message.reply(`Level Names for \`${c}\`:\nPB1: ${pb1Worlds[w]} - ${pb1Levels[li1].name}\nPB2: ${pb2Worlds[world]} - ${pb2Levels[li2].name}`);
			}else if(c.match(/[78]-\d\d?/gmi) != null){
				message.reply(`Level Names for \`${c}\`:\nPB1: ${pb1Worlds[w]} - ${pb1Levels[li1].name}`);
			}else if(c.match(/[1-6]-16c?/) != null){
				message.reply(`Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li1].name}`);
			}else{
				message.reply(`Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}\nChallenge: ${pb2Levels[li2].detail}`)
			}
		}
	}
}