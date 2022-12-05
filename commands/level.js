const { SlashCommandBuilder } = require('discord.js');
const pb1Levels = require('../json/pb1Levels.json');
const pb2Levels = require('../json/pb2Levels.json');
const db = require('quick.db');
const { sleep } = require('../scripts/sleep');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('level')
	.setDescription('Displays the corresponding level name to a level code')
	.addStringOption(option =>
		option
		.setName('code')
		.setDescription('Input a level code, ex: 1-1')
		.setRequired(true)
	),
	async execute(interaction, message){
		let msg;
		if(interaction){
			msg = interaction.options.getString('code').match(/(?:[1-6]-(?:(?!1[7-9])1[0-6]|(?![1-9]\d)0?[1-9])c?|[78]-(?:(?!1[6-9])1[0-5]|0?[1-9]))/gmi);
		}else if(message){
			msg = message.content.match(/(?:[1-6]-(?:(?!1[7-9])1[0-6]|(?![1-9]\d)0?[1-9])c?|[78]-(?:(?!1[6-9])1[0-5]|0?[1-9]))/gmi);
		}

		if(!msg) return;

		let replyNum = 0;
		function levelName(i){
			let c = msg[i].toLowerCase();

			const pb1Worlds = ["Alpine Meadows", "Desert Winds", "Snow Drift", "Ancient Ruins", "80s Fun Land", "Zen Gardens", "Tropical Paradise", "Area 52"];
			const pb2Worlds = ["Pine Mountains", "Glowing Gorge", "Tranquil Oasis", "Sanguine Gulch", "Serenity Valley", "Steamtown"];

			c = c.replace(/^([1-8]-)([1-9]c?)$/gmi, `$10$2`);  //adds extra 0

			const w = c.slice(0, 1) - 1;
			const l = parseInt(c.slice(2, 4), 10) - 1;

			const li1 = w * 15 + l;
			let li2;
			if(!c.match(/[1-6]-[01]\dc/gmi)){
			 	li2 = w * 16 + l;
			}else{
				li2 = w * 16 + l + 96;
			}

			if(message){
				if(db.get(`${message.channelId}.paused`) == false && db.has(`${message.channelId}.cooldown.${c}`) == false){				
					db.push(`${message.channelId}.cooldown.${c}`, c);

					let sm;
					if(c.match(/[1-6]-16c/gmi)){
						sm = message.channel.send(`Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}\nChallenge: ||${pb2Levels[li2].detail}||`);
					}else if(c.match(/[1-6]-[01]\dc/gmi)){
						sm = message.channel.send(`Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}\nChallenge: ||${pb2Levels[li2].detail}||`);
					}else if(c.match(/[1-6]-16/gmi)){
						sm = message.channel.send(`Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}`);
					}else if(c.match(/[1-6]-[01]\d/gmi)){
						sm = message.channel.send(`Level Names for \`${c}\`:\nPB1: ${pb1Worlds[w]} - ${pb1Levels[li1].name}\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}`);
					}else if(c.match(/[78]-[01]\d/gmi)){
						sm = message.channel.send(`Level Names for \`${c}\`:\nPB1: ${pb1Worlds[w]} - ${pb1Levels[li1].name}`);
					}


					if(sm){
						sm.then(async botMessage => {
							await botMessage.react('❌');
							if(i != 0) await botMessage.react('⬅️');
							if(i < msg.length - 1) await botMessage.react('➡️');

							const filter = (reaction, user) => {
								if(user.bot == true) return;
								if(user.id != message.author) return;

								return ['❌', '⬅️', '➡️'].includes(reaction.emoji.name);
							};
							
							let cancelReactions = true;
							await botMessage.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] }).then(collected => {
								const reaction = collected.first();

								switch(reaction.emoji.name){
									case '❌':
										botMessage.delete(1);
										cancelReactions = false;

										return;
									case '⬅️':
										replyNum--;
										cancelReactions = false;
										newMsg = false;

										db.delete(`${message.channelId}.cooldown.${c}`);
										
										return levelName(replyNum);
									case '➡️':
										replyNum++;
										cancelReactions = false;
										newMsg = false;

										db.delete(`${message.channelId}.cooldown.${c}`);

										return levelName(replyNum);
								}
							}).catch(collected => {}).then(v => {
								if(cancelReactions == true){
									botMessage.reactions.removeAll();
								}
							}).catch(error => console.error(error));
						});
					}

					async function del(){
						await sleep(300);
						db.delete(`${message.channelId}.cooldown.${c}`);
					};

					del();
				}
			}else{
				if(c.match(/[1-6]-16c/gmi)){
					interaction.reply({ content: `Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}\nChallenge: ||${pb2Levels[li2].detail}||`, ephemeral: true });
				}else if(c.match(/[1-6]-[01]\dc/gmi)){
					interaction.reply({ content: `Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}\nChallenge: ||${pb2Levels[li2].detail}||`, ephemeral: true });
				}else if(c.match(/[1-6]-16/gmi)){
					interaction.reply({ content: `Level Names for \`${c}\`:\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}`, ephemeral: true });
				}else if(c.match(/[1-6]-[01]\d/gmi)){
					interaction.reply({ content: `Level Names for \`${c}\`:\nPB1: ${pb1Worlds[w]} - ${pb1Levels[li1].name}\nPB2: ${pb2Worlds[w]} - ${pb2Levels[li2].name}`, ephemeral: true });
				}else if(c.match(/[78]-[01]\d/gmi)){
					interaction.reply({ content: `Level Names for \`${c}\`:\nPB1: ${pb1Worlds[w]} - ${pb1Levels[li1].name}`, ephemeral: true });
				}
			}
		}

		levelName(replyNum);
	}
}