const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const terms = require('../json/terms.json');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('define')
    .setDescription('Translates Poly Bridge jargon to layman\'s terms')
    .addStringOption(option =>
        option
        .setName('term')
        .setDescription('The specific term you don\'t understand (start typing to find the term you want)')
        .setRequired(true)
        .setAutocomplete(true)
    ),
	async execute(interaction){
        const option = interaction.options._hoistedOptions[0].value;

        const embed = new MessageEmbed()
        .setTitle(terms[option].name)
        .setDescription(terms[option].description)
        .setImage(terms[option]?.image)
        .setColor('#f9db44')
        .setThumbnail('https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png')

        return interaction.reply({ embeds: [embed] });
	},
};