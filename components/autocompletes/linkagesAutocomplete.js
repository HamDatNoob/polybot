const { findBestMatch } = require("string-similarity");
const linkages = require('../../json/linkages.json');

module.exports = {
    name: 'termAutocomplete',
    async execute(interaction){
        const input = interaction.options._hoistedOptions[0].value.toLowerCase();

        if(input == '') return;

        const arrays = linkages.map(v => v.name.toLowerCase().split(' / '));
        const examples = [].concat.apply([], arrays);
        
        const match = findBestMatch(input, examples);

        for(let i in arrays){
            if(arrays[i].includes(match.bestMatch.target)){
                return interaction.respond([{ name: linkages[i].name, value: i }]);
            }
        }
    }
}