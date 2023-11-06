module.exports = {
	name: 'messageCreate',
	async execute(message){
		if(!message.author.bot && !message.system){
			const regex = /(?:(?<=\s)|^|,|\.)(?:[1-6]-(?:[1-9]|1[0-6]|0[1-9])c?|[78]-(?:[1-9]|1[0-5]|0[1-9])|[a-z]{2,3}-(?:[1-9]|1[0-4]|0[1-9])|b[12]-(?:[1-9]|1[0-6]|0[1-9]))(?:(?=\s)|$|,|\.)/gmi;

			if(message.content.match(regex) || message.attachments.map(v => v.name)[0]?.split('_')[0]?.match(regex)){
				require('../commands/level.js').execute(undefined, message);
			}else if(message.content.match(/(?:(?<=\s)|^)`?\d{10}`?(?:(?=\s)|$)/gmi)){
				require('../scripts/workshop.js').execute(message);
			}else{
				return;
			}
		}
	}
}