const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const weeklies = require('../json/weeklies.json');
const puppeteer = require('puppeteer')
const package = require('../package.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('weekly')
    .setDescription('Displays current or past weeklies')
    .addIntegerOption(option => option
        .setName('season')
        .setDescription('The season of the weekly')
        .setRequired(false)
    )
    .addIntegerOption(option => option
        .setName('week')
        .setDescription('The week of the weekly')
        .setRequired(false) 
    ),
    async execute(interaction){
        await interaction.deferReply();

        const season = interaction.options._hoistedOptions[0]?.value - 1 || -1;
        const week = interaction.options._hoistedOptions[1]?.value - 1 || -1;

        let weekIndex = season * 10 + week;
        if(weekIndex < 0) weekIndex = -1;

        async function scrape(url, url2){
            const browser = await puppeteer.launch({ headless: "new" });
            const page = await browser.newPage();
            await page.goto(url);
        
            const [e] = await page.$x('//*[@id="previewImage"]');
            const src = await e.getProperty('src');
            const rawSrc = await src.jsonValue();
        
            const [e2] = await page.$x('/html/body/div[1]/div[7]/div[5]/div[1]/div[4]/div[5]/div[2]');
            const title = await e2.getProperty('textContent');
            const rawTitle = await title.jsonValue();
        
            const [e3] = await page.$x('//*[@id="highlightContent"]');
            const desc = await e3.getProperty('textContent');
            const rawDesc = await desc.jsonValue();
    
            await page.goto(url2);
    
            const [e4] = await page.$x('/html/body/div[1]/div[7]/div[6]/div[1]/div[1]/div/div/div/div[1]/div[1]/span[1]');
            const user = await e4.getProperty('textContent');
            const rawUser = await user.jsonValue();
        
            browser.close();
            
            return { rawSrc, rawTitle, rawDesc, rawUser };
        }

        function convertFormatting(input){
            let output = input;
        
            if(input.match(/<i>(.+?)<\/i>/gmi)) output = output.replace(/<i>(.+?)<\/i>/gmi, '*$1*'); // italic
            if(input.match(/<b>(.+?)<\/b>/gmi)) output = output.replace(/<b>(.+?)<\/b>/gmi, '**$1**'); // bold
            if(input.match(/<u>(.+?)<\/u>/gmi)) output = output.replace(/<u>(.+?)<\/u>/gmi, '__$1__'); // underline
            if(input.match(/<s>(.+?)<\/s>/gmi)) output = output.replace(/<s>(.+?)<\/s>/gmi, '~~$1~~'); // striketrough
            
            output = output.replace(/<.+?>/gmi, ''); // remove other tags
            
            return output;
        }
        
        const steam = await scrape(`https://steamcommunity.com/sharedfiles/filedetails/?id=${weeklies.at(weekIndex)[0]}`, `https://steamcommunity.com/profiles/${weeklies.at(weekIndex)[1]}`); // scrapes steam workshop and user profile
    
        const image = steam.rawSrc; // converts object into usable strings --------
        const title = steam.rawTitle.replace(/<.+?>/gmi, '');
        const mats = steam.rawDesc.split('_')[0].split(',');
        const desc = convertFormatting(steam.rawDesc.split('_')[1]);
        const user = steam.rawUser.replace(/<.+?>/gmi, ''); // ---------

        const weekNum = weeklies.at(weekIndex)[2] - 1;

        for(let i in mats){ // remove when v2 metadata --------
            if(mats[i] == 1){
                mats[i] = '✅';
            }else if(mats[i] == 0){
                mats[i] = '❌';
            }
        } // ----------

        let embed = new EmbedBuilder()
        .setTitle(`Weekly Challenge: Season ${Math.floor(weekNum / 10) + 1}, Week ${weekNum % 10 + 1}`)
        .setColor('#9BAEFE')
        .setFooter({ text: `Polybot v${package.version}, by @ha_m`, iconURL: 'https://cdn.discordapp.com/attachments/1054531526030799038/1125659991957844038/icon.png' })
        .setImage(image)
        .addFields(
            { name: title, value: desc },
            { name: 'Budget', value: `$${mats[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, inline: true },
            { name: 'Author', value: user, inline: true },
            { name: 'Allowed Materials', value: `<:road:1125659532547334214>: ${mats[1]} | <:wood:1125659581356445696>: ${mats[2]} | <:steel:1125659535865032714>: ${mats[3]} | <:hydraulic:1125659530651512963>: ${mats[4]}\n<:rope:1125659534304747641>: ${mats[5]} | <:cable:1125659528021676043>: ${mats[6]} | <:spring:1125659535072313395>: ${mats[7]} | <:foundation:1125659529762324542>: ${mats[8]}`}
        );

        return interaction.editReply({ embeds: [embed] });
    }
}