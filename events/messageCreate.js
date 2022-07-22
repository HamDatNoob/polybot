const { handleConvert } = require("../scripts/convert");


module.exports = {
    name: 'messageCreate',
    async execute(message){
        if(message.content.match(/[1-8]-\d[\dc]?c?/gmi) && !message.author.bot){
            const interaction = undefined;

            require('../commands/level.js').execute(interaction, message);
        }

        await handleConvert(message);
    }
}