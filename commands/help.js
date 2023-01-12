const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getHelp } = require('../scripts/helpEmbeds.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('help')
	.setDescription('Get specialized help for a certain level')
	.addStringOption(option =>
		option
		.setName('level')
		.setDescription('level code of the level that help is needed with')
		.setRequired(true) 
	)
    .addNumberOption(option =>
		option
		.setName('num')
		.setDescription('If a level has more than one prompt, skip to that one')
		.setRequired(false) 
	),
	async execute(interaction){
		let level = interaction.options._hoistedOptions[0].value;
		let num = (interaction.options._hoistedOptions[1]?.value - 1 || 0);

        level = level.replace(/^([1-6]-)([1-9]c?)$/gmi, `$10$2`);  // adds extra 0

        const w = level.slice(0, 1) - 1;
        const l = parseInt(level.slice(2, 4)) - 1;
		
		const data = getHelp(w, l);

        let first = true;

        function response(num){
            async function reactions(botMessage){
                if(num != 0) await botMessage.react('⬅️');
                if(num < data.length - 1) await botMessage.react('➡️');

                const filter = (reaction, user) => {
                    if(user.bot == true) return;
                    if(user.id != interaction.user.id && interaction.member.roles.cache.some(v => !['767933568940638248', '880330557014294631', '461683459484549121', '875943961146032158', '891386997271298069'].includes(v.id))) return;

                    return ['⬅️', '➡️'].includes(reaction.emoji.name);
                };
                
                await botMessage.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] }).then(collected => {
                    const reaction = collected.first();

                    switch(reaction.emoji.name){
                        case '⬅️':
                            botMessage.reactions.removeAll();

                            num--;
                            first = false;
                            
                            return response(num);
                        case '➡️':				
                            botMessage.reactions.removeAll();
                        
                            num++;
                            first = false;

                            return response(num);
                    }
                }).catch(collected => {});

                if(botMessage.createdTimestamp + 60000 <= Date.now()){
                    botMessage.reactions.removeAll();
                }
            }

            let helpEmbed = new EmbedBuilder()
                .setTitle(data[num].name)
                .setColor('#f9db44')
                .setThumbnail('https://cdn.discordapp.com/attachments/965424891786563654/975932690639511572/icon.png')
                .setDescription(data[num].description)
                .setImage(data[num].image)
                .setFooter({ text: `[${num + 1}/${data.length}]` });

            if(first){
                interaction.reply({ embeds: [helpEmbed], fetchReply: true }).then(bm => reactions(bm));
            }else{
                interaction.editReply({ embeds: [helpEmbed], fetchReply: true  }).then(bm => reactions(bm));
            }
        }

        response(num);
	}
}