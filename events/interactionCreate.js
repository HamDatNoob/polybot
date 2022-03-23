const fs = require('fs');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        if(interaction.isCommand()){ //commands
            const command = interaction.client.commands.get(interaction.commandName);

            if(!command) return;

            try{
                await command.execute(interaction);
            }catch(error){
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }else if(interaction.isSelectMenu()){ //select menus
            const selectMenuFiles = fs.readdirSync('./components/selectMenus').filter(file => file.endsWith('.js'));
            for(const file of selectMenuFiles){
	            const component = require(`../components/selectMenus/${file}`);

                if(component.name != interaction.customId) return;
                
                try{
                    await component.execute(interaction);
                }catch(error){
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        }else if(interaction.isButton()){ //buttons
            const buttonFiles = fs.readdirSync('./components/buttons').filter(file => file.endsWith('.js'));
            for(const file of buttonFiles){
	            const component = require(`../components/buttons/${file}`);
                
                if(component.name != interaction.customId) return;
                
                try{
                    await component.execute(interaction);
                }catch(error){
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        }else{ //nothing found
            return await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}; 