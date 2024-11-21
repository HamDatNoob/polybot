const db = require('quick.db');
const { check } = require('../../scripts/check.js');

module.exports = {
	async execute(interaction){
		if(['767933568940638248', '461683459484549121', '875943961146032158', '891386997271298069', '891386997271298069'].some(v => interaction.member._roles.includes(v))){ // mod, supermod, dev, robotics
            const nomId = interaction.options.getString('workshop-id');
            let value = interaction.options.getString('value');

            await interaction.deferReply();

            if(await check(interaction, nomId)) return;

            if(value == 'weekly-'){
                value = value.concat(parseInt(await db.get('currentWeek') + 1));
            } 

            if(db.has(`nominations.${nomId}`)){
                await db.set(`nominations.${nomId}.status`, value);
 
                return interaction.followUp({ content: `The status of \`${nomId}\` has been changed to \`${value}\`!` });
            }else{
                return interaction.followUp({ content: `\`${nomId}\` has not been suggested!` });
            }

        }else{
            return interaction.reply({ content: 'You do not have the adequate permissions to perform this action!', ephemeral: true });
        }
    }
}