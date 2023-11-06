const db = require('quick.db');
const { check } = require('../../scripts/check.js');

module.exports = {
	async execute(interaction){
        const nomId = interaction.options.getString('workshop-id');

        await interaction.deferReply();

        if(await check(interaction, nomId)) return;

        if(db.has(`nominations.${nomId}`)){
            const value = await db.get(`nominations.${nomId}.status`);

            return interaction.followUp({ content: `The status of \`${nomId}\` is \`${value}\`!` });
        }else{
            return interaction.followUp({ content: `\`${nomId}\` has not been suggested!` });
        }
    }
}