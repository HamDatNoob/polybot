const { SlashCommandBuilder } = require('@discordjs/builders');
const pb1Levels = require('../json/pb1Levels.json');
const pb2Levels = require('../json/pb2Levels.json');
const db = require('quick.db');
const { sleep } = require('../scripts/sleep');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Displays the complete name of a level.')
		.addStringOption(option =>
			option.setName('code')
			.setDescription('Input a level code. Ex: 1-1')
			.setRequired(true)
		),
	async execute(interaction, message){
		let msg;
		if(interaction){
			msg = interaction.options.getString('code').match(/[1-8]-\d[\dc]?c?/gmi);
		}else if(message){
			msg = message.content.match(/[1-8]-\d[\dc]?c?/gmi);
		}else{
			console.error(error);
		}

		function levelName(i){
			let c = msg[i].toLowerCase();

			const pb1Worlds = ["Alpine Meadows", "Desert Winds", "Snow Drift", "Ancient Ruins", "80s Fun Land", "Zen Gardens", "Tropical Paradise", "Area 52"];
			const pb2Worlds = ["Pine Mountains", "Glowing Gorge", "Tranquil Oasis", "Sanguine Gulch", "Serenity Valley", "Steamtown"];

			if(c.match(/[1-8]-[01]\dc?/gmi) == null){ // adds extra 0
				let codeSplit = c.split('');
				codeSplit.splice(2, 0, 0);
				c = codeSplit.join('');
			}

			const w = c.slice(0, 1) - 1;
			const l = parseInt(c.slice(2, 4), 10) - 1;

			const li1 = w * 15 + l;
			let li2;
			if(!c.match(/[1-5]-[01]\dc/gmi)){
			 	li2 = w * 16 + l;
			}else{
				li2 = w * 16 + l + 96;
			}

			if(message){
				if(db.get(`${message.channelId}.paused`) == false && db.has(`${message.channelId}.cooldown.${c}`) == false){				
					db.push(`${message.channelId}.cooldown.${c}`, c);

					if(c.match(/[1-5]-16c/gmi)){
						message.channel.send(`Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}\nChallenge: ${pb2Levels[li2].detail}`);
					}else if(c.match(/[1-5]-[01]\dc/gmi)){
						message.channel.send(`Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}\nChallenge: ${pb2Levels[li2].detail}`);
					}else if(c.match(/[1-6]-16/gmi)){
						message.channel.send(`Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}`);
					}else if(c.match(/[1-6]-[01]\d/gmi)){
						message.channel.send(`Level Names for \`${c}\`:\nPB1: ${pb1Worlds[w]} - ${pb1Levels[li1].name}\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}`);
					}else if(c.match(/[78]-[01]\d/gmi)){
						message.channel.send(`Level Names for \`${c}\`:\nPB1: ${pb1Worlds[w]} - ${pb1Levels[li1].name}`);
					}

					async function del(){
						await sleep(300);
						db.delete(`${message.channelId}.cooldown.${c}`);
					};

					del();
				}
			}else{
				if(c.match(/[1-5]-16c/gmi)){
					interaction.reply({ content: `Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}\nChallenge: ${pb2Levels[li2].detail}`, ephemeral: true });
				}else if(c.match(/[1-5]-[01]\dc/gmi)){
					interaction.reply({ content: `Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}\nChallenge: ${pb2Levels[li2].detail}`, ephemeral: true });
				}else if(c.match(/[1-6]-16/gmi)){
					interaction.reply({ content: `Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}`, ephemeral: true });
				}else if(c.match(/[1-6]-[01]\d/gmi)){
					interaction.reply({ content: `Level Names for \`${c}\`:\nPB1: ${pb1Worlds[w]} - ${pb1Levels[li1].name}\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}`, ephemeral: true });
				}else if(c.match(/[78]-[01]\d/gmi)){
					interaction.reply({ content: `Level Names for \`${c}\`:\nPB1: ${pb1Worlds[w]} - ${pb1Levels[li1].name}`, ephemeral: true });
				}
			}
		}

		levelName(0);
	}
}