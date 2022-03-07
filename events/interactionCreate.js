const fs = require('fs');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        if(interaction.isCommand()){
            const command = interaction.client.commands.get(interaction.commandName);

            if(!command) return;

            try{
                await command.execute(interaction);
            }catch(error){
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }else if(interaction.isSelectMenu()){
            const componentFiles = fs.readdirSync('./components').filter(file => file.endsWith('.js'));
            for(const file of componentFiles){
	            const component = require(`../components/${file}`);
                try{
                    await component.execute(interaction);
                }catch(error){
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        }else{
            return await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); ;
        }
    }
}; 