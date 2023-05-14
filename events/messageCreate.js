module.exports = {
	name: 'messageCreate',
	async execute(message){
		if(!message.author.bot){
			const interaction = undefined;
			
			require('../commands/level.js').execute(interaction, message);
		}
	}
}