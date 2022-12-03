const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const pb2Levels = require('../json/pb2Levels.json');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('world')
	.setDescription('Displays the entire world of the number inputted')
	.addIntegerOption(option =>
		option
		.setName('input')
		.setDescription('The world to return data of')
		.addChoices(
			{ name: '1', value: 1 },
			{ name: '2', value: 2 },
			{ name: '3', value: 3 },
			{ name: '4', value: 4 },
			{ name: '5', value: 5 },
			{ name: '6', value: 6 },
			{ name: '7', value: 7 },
			{ name: '8', value: 8 }
		)
		.setRequired(true)
	),
	async execute(interaction){		
		const option = interaction.options.getInteger('input');
		
		let title;
		let color;
		switch(option){
			case 1:
				title = 'Pine Mountains';
				color = '#379937';
				break;
			case 2:
				title = 'Glowing Gorge';
				color = '#bf6e3f';
				break;
			case 3:
				title = 'Tranquil Oasis';
				color = '#7db861';
				break;
			case 4: 
				title = 'Sanguine Gulch';
				color = '#f2d68f';
				break;
			case 5:
				title = 'Serenity Valley';
				color = '#d14e49';
				break; 
			case 6:
				title = 'Steamtown';
				color = '#6b4314';
				break;
			case 7:
				require('../components/buttons/worldButton.js').execute(interaction);
				return;
			case 8:
				require('../components/buttons/worldButton.js').execute(interaction);
				return;
		}

		let levels = [];
		for(let i = 0; i < 16; i++){
			levels.push({ code: pb2Levels[(option - 1) * 16 + i].code, name: pb2Levels[(option - 1) * 16 + i].name });
		}

		const worldEmbed = new EmbedBuilder()
		.setColor(color)
		.setTitle(title)
		.setThumbnail('https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png')
		.addFields(
			{ name: '\u200b', value: `\`${levels[0].code}\`: ${levels[0].name}\n\`${levels[1].code}\`: ${levels[1].name}\n\`${levels[2].code}\`: ${levels[2].name}\n\`${levels[3].code}\`: ${levels[3].name}\n\`${levels[4].code}\`: ${levels[4].name}\n\`${levels[5].code}\`: ${levels[5].name}\n\`${levels[6].code}\`: ${levels[6].name}\n\`${levels[7].code}\`: ${levels[7].name}\n\`${levels[8].code}\`: ${levels[8].name}\n\`${levels[9].code}\`: ${levels[9].name}\n\`${levels[10].code}\`: ${levels[10].name}\n\`${levels[11].code}\`: ${levels[11].name}\n\`${levels[12].code}\`: ${levels[12].name}\n\`${levels[13].code}\`: ${levels[13].name}\n\`${levels[14].code}\`: ${levels[14].name}\n\`${levels[15].code}\`: ${levels[15].name}` }
		)

		const worldButton = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
			.setCustomId('worldButton')
			.setLabel('PB1 World')
			.setStyle(ButtonStyle.Primary)
		)

		await interaction.reply({ embeds: [worldEmbed], components: [worldButton], ephemeral: true });
	}
}