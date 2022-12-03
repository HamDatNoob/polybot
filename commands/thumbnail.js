const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('thumbnail')
	.setDescription('Displays the level thumbnail for the code inputted')
	.addStringOption(option =>
		option
		.setName('code')
		.setDescription('Input a level code. Ex: 1-1')
		.setRequired(true)
	)
	.addStringOption(option =>
		option
		.setName('type')
		.setDescription('Input a level type, defaults to PB2 levels')
		.addChoices(
			{ name: 'pb1', value: 'pb1Choice' },
			{ name: 'pb2', value: 'pb2Choice' }
		)
		.setRequired(false)
	),
	async execute(interaction){
		let code = interaction.options.getString('code').toLowerCase();
		
		//if(!code.match(/[1-8]-\d[[1-6]c]?c?/gmi)) await interaction.reply({ content: 'Input a valid level code!', ephemeral: true }); for some reason this doesnt work

		let type;
		if(interaction.options.getString('type')){
			type = interaction.options.getString('type');
		}else{
			type = 'pb2Choice';
		}

		code = code.replace(/^([1-8]-)([1-9]c?)$/gmi, `$10$2`);  //adds extra 0

		//pb1 thumbnails to be implemented later when i get the images

		const thumbnail = new AttachmentBuilder(`./images/thumbnails/${code}.png`)

		const thumbnailEmbed = new EmbedBuilder()
		.setColor('#f9db44')
		.setTitle(`Thumbnail for ${code}`)
		.setImage(`attachment://${code}.png`)

		await interaction.reply({ embeds: [thumbnailEmbed], files: [thumbnail], ephemeral: true })
	}
}