const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { getTerm } = require('../scripts/termEmbeds.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('define')
    .setDescription('Displays information and help on concepts in the game')
    .addStringOption(option =>
        option
        .setName('category')
        .setDescription('Category for the thing help is needed with')
        .setRequired(true)
        .addChoices([
            [ 'Exploits', 'exploits' ],
            [ 'Bugs', 'bugs' ],
            [ 'Budgeting Techniques', 'bt' ],
            [ 'Challenges', 'challenges' ]
        ])
    )
    .addStringOption(option =>
        option
        .setName('term')
        .setDescription('The specific thing help is needed with')
        .setRequired(true)
        .setAutocomplete(true)
    ),
	async execute(interaction){
        const category = interaction.options._hoistedOptions[0].value;
        const group = interaction.options._hoistedOptions[1].value;
        
        const data = getTerm(category, group);

        let guideEmbed = new MessageEmbed()
        .setTitle(data.name)
        .setColor('#f9db44')
        .setThumbnail('https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png')
        .setDescription(data.description)
        .setImage(data.image)

        return interaction.reply({ embeds: [guideEmbed] });
    }
}