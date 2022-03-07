module.exports = {
    name: 'messageCreate',
    async execute(message){
        const args = message.content.split(' ');
    
        const pb1Levels = require('../json/pb1Levels.json');
        const pb2Levels = require('../json/pb2Levels.json');
    
        let codesIndex = [];
        for(let i in pb1Levels){
            let code = pb1Levels[i].short_name;
    
            codesIndex.push(code)            
        }  
        for(let i in pb2Levels){
            let code = pb2Levels[i].short_name;
    
            codesIndex.push(code)            
        }
    
        let codes = codesIndex.filter((i, index) => {
            return codesIndex.indexOf(i) === index;
        })
    
        let output;
        for(let i in codes){
            if(args.includes(codes[i])){
                const pb1Worlds = ["Alpine Meadows", "Desert Winds", "Snow Drift", "Ancient Ruins", "80s Fun Land", "Zen Gardens", "Tropical Paradise", "Area 52"];
                const pb2Worlds = ["Pine Mountains", "Glowing Gorge", "Tranquil Oasis", "Sanguine Gulch", "Serenity Valley", "Steamtown", "N/A", "N/A"];
                
                const world = codes[i].slice(0, 1) - 1;

                let challenge;
                if(codes[i].slice(3, 4) == 'c') challenge = true; else challenge = false;

                if(challenge == false){
                    message.reply(`Level Names for \`${codes[i]}\`:\nPB1: ${pb1Worlds[world]} - ${pb1Levels[i].name}\nPB2: ${pb2Worlds[world]} - ${pb2Levels[i].name}`);
                }else{
                    message.reply(`Level Names for \`${codes[i]}\`:\nPB2: ${pb2Worlds[world]} - ${pb2Levels[i].name}\nChallenge: ${pb2Levels[i].detail}`)
                }
            }
        }
    }
}