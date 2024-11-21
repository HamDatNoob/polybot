const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js")

module.exports = {
    name: 'nomintations_list_search_button',
    async execute(interaction){
        const modal = new ModalBuilder()
            .setCustomId('nominations_list_search_modal')
            .setTitle('Nominations Page Search');

        const pageInput = new TextInputBuilder()
            .setCustomId('nominations_list_search_modal_pageInput')
            .setLabel('Page Number')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const row = new ActionRowBuilder()
            .addComponents(pageInput);

        modal.addComponents(row);

        await interaction.showModal(modal);
    }
}