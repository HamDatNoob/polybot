const { findBestMatch } = require("string-similarity");

module.exports = {
	name: 'linkageAutocomplete',
	async execute(interaction){
		const input = interaction.options._hoistedOptions[0].value.toLowerCase();

		if(input == '') return;

		
		
		
	}
}