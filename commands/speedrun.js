const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const api = require('../json/api.json');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('speedrun')
	.setDescription('Get speedrunning information from speedrun.com')
	.addSubcommand(subcommand => subcommand
		.setName('recent')
		.setDescription('Sort by the most recently verified runs')
	)
	.addSubcommand(subcommand => subcommand
		.setName('search')
		.setDescription('Search for a specific run')
		.addNumberOption(option => //option 0
			option
			.setName('run')
			.setDescription('The specific category of run to look for')  
			.setRequired(true)
			.setAutocomplete(true)
		)
		.addNumberOption(option => //option 1
			option
			.setName('type')
			.setDescription('The type of run')
			.addChoices([
				[ 'any%', 0 ],
				[ 'any% nma', 1 ],
				[ '100% nma', 2 ]
			])
			.setRequired(true)
		)
		.addNumberOption(option => //option 2
			option
			.setName('mode')
			.setDescription('The mode of the run, ignore \"both\" if not a f4w or full run')
			.addChoices([
				[ 'normal', 0 ],
				[ 'challenge', 1 ],
				[ 'both', 2 ]
			])
			.setRequired(true)
		)
	),
	// .addSubcommand(subcommand => subcommand
	// 	.setName('player')
	// 	.setDescription('View runs by a certain player')
	// 	.addStringOption(option => //option 0
	// 		option
	// 		.setName('user')
	// 		.setDescription('The specific player to search for (speedrun.com username)')  
	// 		.setRequired(true)
	// 	)
	// ),
	async execute(interaction){
		const options = interaction.options._hoistedOptions;
		const subcommand = interaction.options._subcommand;

		if(subcommand == 'player'){
			let data;
			const res = await fetch(`https://www.speedrun.com/api/v1/users?lookup=${options[0].value}`);
			if(res.ok) data = await res.json();
			data = data?.data;

			if(data.length == 0){
				return interaction.reply({ content: 'No player was found under this username!', ephemeral: true });
			}

			let data1;
			const res1 = await fetch(data[0].links[3].uri);
			if(res1.ok) data1 = await res1.json();
			data1 = data1?.data;

			let wrs = 0;
			let pbwrs = 0;
			for(let i in data1){
				if(data1[i].place == 1){
					wrs++;
					
					if(data1[i].run.game == '9d3rjx0d'){
						pbwrs++;
					}
				}
			}

			wrs = `${wrs}`;
			pbwrs = `${pbwrs}`;

			let country = data[0].location.country.names.international;
			if(country == null || country == '') country = 'No country provided';

			let pronouns = data[0].pronouns;
			if(pronouns == null || pronouns == '') pronouns = 'No pronouns provided';

			const joined = data[0].signup.substring(0, 10);

			let thumbnail = data[0].assets.image.uri;
			if(thumbnail == null || thumbnail == '') thumbnail = 'https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png';

			const recordDataEmbed = new MessageEmbed()
			.setTitle(`${data[0].names.international}'s Profile`)
			.setColor('#f9db44')
			.setThumbnail(thumbnail)
			.setFields(
				{ name: 'Pronouns', value: pronouns },
				{ name: 'World Records', value: wrs },
				{ name: 'Poly Bridge World Records', value: pbwrs },
				{ name: 'Joined', value: joined }
			)

			let weblink = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setLabel('Website')
				.setStyle('LINK')
				.setURL(data[0].weblink),
			)
				
			return interaction.reply({ embeds: [recordDataEmbed], components: [weblink], ephemeral: true });
		}else if(subcommand == 'search'){
			let run = options[0].value;
			let type = options[1].value;
			let mode = options[2].value;
		
			let url = 'https://www.speedrun.com/api/v1/leaderboards/9d3rjx0d/';
			
			if(run <= 1){// adds category/level of run
				url = url.concat(`level/${api.data.levels.data[run].id}/`);
			}else if(run <= 3){
				run += 4;
				url = url.concat(`category/${api.data.categories.data[run].id}?var-onvj7gwn=`);
			}else if(run <= 99){
				run -= 2;
				url = url.concat(`level/${api.data.levels.data[run].id}/`);
			}else if(run >= 100){
				run -= 100;
				url = url.concat(`category/${api.data.categories.data[run].id}?var-onvj7gwn=`);
			}else{
				return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
	
			const types = ['p12kv471', '21dr0e5q', '5q85y93q']// any%, any% nma, 100% nma
	
			let name;
			if(url.match(/category/gmi)){// run type and mode
				url = url.concat(`${types[type]}&var-${api.data.categories.data[run].variables.data[0].id}=${Object.keys(api.data.categories.data[run].variables.data[0].values.choices)[mode]}&top=1`);
				name = api.data.categories.data[run].name;
			}else{
				url = url.concat(`${api.data.levels.data[run].categories.data[mode].id}?var-onvj7gwn=${types[type]}&top=1`);
				name = api.data.levels.data[run].name;
			}
	
			let data1;
			const res1 = await fetch(url);
			if(res1.ok) data1 = await res1.json();
			data1 = data1?.data;
	
			if(data1.runs[0] == undefined) return interaction.reply({ content: 'There was an error while executing this command! (Most likely no run exists for this category)', ephemeral: true });
	
			let data2;
			const res2 = await fetch(data1.runs[0].run.players[0].uri);
			if(res2.ok) data2 = await res2.json();
			data2 = data2?.data;
	
			const typeNames = ['Any%', 'Any% NMA', '100% NMA'];
			const modeNames = ['Normal', 'Challenge', 'Both'];
	
			let time = new Date(data1.runs[0]?.run.times.primary_t * 1000).toISOString().slice(11, 23);
			let comment = data1.runs[0]?.run.comment;
			let user = data2?.names.international;
			let submitted = data1.runs[0]?.run.date;
	
			if(time == undefined) return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			if(comment == undefined) comment = '';
			if(user == undefined) user = 'Guest';
			if(submitted == undefined) submitted = '';
	
			const recordDataEmbed = new MessageEmbed()
			.setTitle(`World record for ${name}, ${typeNames[type]}, ${modeNames[mode]}`)
			.setColor('#f9db44')
			.setThumbnail('https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png')
			.setFields(
				{ name: 'Time', value: time },
				{ name: 'Comment', value: comment },
				{ name: 'User', value: user },
				{ name: 'Submitted', value: submitted }
			)
	
			let videoLinkButton;
			if(data1.runs[0]?.run.videos?.links[0]?.uri != undefined){
				videoLinkButton = new MessageActionRow()
				.addComponents(
					new MessageButton()
					.setLabel('Video')
					.setStyle('LINK')
					.setURL(data1.runs[0]?.run.videos?.links[0]?.uri),
					new MessageButton()
					.setLabel('Website')
					.setStyle('LINK')
					.setURL(data1.runs[0]?.run.weblink)
				)
			}else{
				videoLinkButton = new MessageActionRow()
				.addComponents(
					new MessageButton()
					.setLabel('Video')
					.setStyle('LINK')
					.setURL('https://www.speedrun.com/polybridge2')
					.setDisabled(true),
					new MessageButton()
					.setLabel('Website')
					.setStyle('LINK')
					.setURL('https://www.speedrun.com/polybridge2')
					.setDisabled(true)
				)
			}
	
			return interaction.reply({ embeds: [recordDataEmbed], components: [videoLinkButton], ephemeral: true });
		}else if(subcommand == 'recent'){
			let data;
			const res = await fetch('https://www.speedrun.com/api/v1/runs?game=9d3rjx0d&status=verified&orderby=verify-date&direction=desc');
			if(res.ok) data = await res.json();
			data = data?.data;

			let data1;
			const res1 = await fetch(data[0].links[0].uri);
			if(res1.ok) data1 = await res1.json();
			data1 = data1?.data;

			let data2;
			const res2 = await fetch(data1.players[0].uri);
			if(res2.ok) data2 = await res2.json();
			data2 = data2?.data;
			
			let run;
			if(data1.level){
				let name = api.data.levels.data.filter(v => v.id == data1.level)[0].name;
				let type = api.data.levels.data.filter(v => v.id == data1.level)[0].categories.data.filter(v => v.id == data1.category)[0].name;
				let mode = api.data.levels.data.filter(v => v.id == data1.level)[0].variables.data[0].values.choices[Object.keys(api.data.levels.data.filter(v => v.id == data1.level)[0].variables.data[0].values.choices).filter(v => Object.values(data1.values).filter(k => k == v) == v)];
	
				run = [name, type, mode].join(', ');
			}else{
				let name = api.data.categories.data.filter(v => v.id == data1.category)[0].name;
				let type = api.data.categories.data.filter(v => v.id == data1.category)[0].variables.data[0].values.choices[Object.keys(api.data.categories.data.filter(v => v.id == data1.category)[0].variables.data[0].values.choices).filter(v => Object.values(data1.values).filter(k => k == v) == v)];
				let mode = api.data.categories.data.filter(v => v.id == data1.category)[0].variables.data[1].values.choices[Object.keys(api.data.categories.data.filter(v => v.id == data1.category)[0].variables.data[1].values.choices).filter(v => Object.values(data1.values).filter(k => k == v) == v)];
				
				run = [name, type, mode].join(', ');
			}

			let time = new Date(data1.times.primary_t * 1000).toISOString().slice(11, 23);
			let comment = data1.comment;
			let user = data2?.names.international;
			let submitted = data1.date;
	
			if(time == undefined) return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			if(comment == undefined) comment = 'No comment provided';
			if(user == undefined) user = 'Guest';
			if(submitted == undefined) submitted = 'No date';
	
			const recordDataEmbed = new MessageEmbed() 
			.setTitle(`Recent Runs, Page 1`)
			.setColor('#f9db44')
			.setThumbnail('https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png')
			.setFields(
				{ name: 'Run', value: run },
				{ name: 'Time', value: time },
				{ name: 'Comment', value: comment },
				{ name: 'User', value: user },
				{ name: 'Submitted', value: submitted }
			)

			const arrows = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setCustomId('speedrunLeftButton')
				.setLabel('⬅️')
				.setStyle('PRIMARY')
				.setDisabled(true),
				new MessageButton()
				.setCustomId('speedrunRightButton')
				.setLabel('➡️')
				.setStyle('PRIMARY')
			)
	
			let videoLinkButton;
			if(data1.videos?.links[0]?.uri != undefined){
				videoLinkButton = new MessageActionRow()
				.addComponents(
					new MessageButton()
					.setLabel('Video')
					.setStyle('LINK')
					.setURL(data1.videos?.links[0]?.uri),
					new MessageButton()
					.setLabel('Website')
					.setStyle('LINK')
					.setURL(data1.weblink)
				)
			}else{
				videoLinkButton = new MessageActionRow()
				.addComponents(
					new MessageButton()
					.setLabel('Video')
					.setStyle('LINK')
					.setURL('https://www.speedrun.com/polybridge2')
					.setDisabled(true),
					new MessageButton()
					.setLabel('Website')
					.setStyle('LINK')
					.setURL('https://www.speedrun.com/polybridge2')
					.setDisabled(true)
				)
			}

			return interaction.reply({ embeds: [recordDataEmbed], components: [videoLinkButton, arrows], ephemeral: true });
		}
	}
}