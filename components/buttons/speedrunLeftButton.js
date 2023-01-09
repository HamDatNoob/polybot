const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const api = require('../../json/api.json');

module.exports = {
	name: 'speedrunLeftButton',
	async execute(interaction){
		let page = parseInt(interaction.message.embeds[0].title.slice(18)) - 1;

		let data;
		const res = await fetch(`https://www.speedrun.com/api/v1/runs?game=9d3rjx0d&status=verified&orderby=verify-date&direction=desc&max=1&offset=${page - 1}`);
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
		let user = (data2?.name || data2?.names.international || data2?.names.japanese);
		let submitted = data1.date;

		if(time == undefined) return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		if(comment == undefined) comment = 'No comment provided';
		if(user == undefined) user = 'Guest';
		if(submitted == undefined) submitted = 'No date';

		const recordDataEmbed = new EmbedBuilder() 
		.setTitle(`Recent Runs, Page ${page}`)
		.setColor('#f9db44')
		.setThumbnail('https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png')
		.addFields(
			{ name: 'Run', value: run },
			{ name: 'Time', value: time },
			{ name: 'Comment', value: comment },
			{ name: 'User', value: user },
			{ name: 'Submitted', value: submitted }
		)

		let dis;
		if(page == 1){
			dis = true;
		}else{
			dis = false;
		}

		const arrows = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
			.setCustomId('speedrunLeftButton')
			.setLabel('⬅️')
			.setStyle(ButtonStyle.Primary)
			.setDisabled(dis),
			new ButtonBuilder()
			.setCustomId('speedrunRightButton')
			.setLabel('➡️')
			.setStyle(ButtonStyle.Primary)
		)

		let videoLinkButton;
		if(data1.videos?.links[0]?.uri != undefined){
			videoLinkButton = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
				.setLabel('Video')
				.setStyle(ButtonStyle.Link)
				.setURL(data1.videos?.links[0]?.uri),
				new ButtonBuilder()
				.setLabel('Website')
				.setStyle(ButtonStyle.Link)
				.setURL(data1.weblink)
			)
		}else{
			videoLinkButton = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
				.setLabel('Video')
				.setStyle(ButtonStyle.Link)
				.setURL('https://www.speedrun.com/polybridge2')
				.setDisabled(true),
				new ButtonBuilder()
				.setLabel('Website')
				.setStyle(ButtonStyle.Link)
				.setURL('https://www.speedrun.com/polybridge2')
				.setDisabled(true)
			)
		}

		return interaction.update({ embeds: [recordDataEmbed], components: [videoLinkButton, arrows], ephemeral: true });
	}
}