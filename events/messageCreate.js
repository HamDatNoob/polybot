module.exports = {
    name: 'messageCreate',
    async execute(message){
        if(message.content.match(/[1-8]-\d[\dc]?c?/gmi)){
            const interaction = undefined;
            
            require('../commands/level.js').execute(interaction, message);
        }
    }
}