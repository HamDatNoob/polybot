const fs = require('fs');
const weeklies = require('../json/weeklies.json');
const package = require('../package.json');
const puppeteer = require('puppeteer');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    async execute(client){
        async function doWeekly(){
            await fetch('https://pb3game.s3.us-east-2.amazonaws.com/weeklies/manifest').then(res => { // refreshes weekly json file
                return res.arrayBuffer();
            }).then(buffer => {
                let arr = Buffer.from(buffer).toString().split('\n');
                arr.pop()
            
                let weeks = [];
                for(let i in arr){
                    weeks.push(arr[i].split('\t'));
                }
            
                fs.writeFileSync('./json/weeklies.json', JSON.stringify(weeks));
            }); // ----------
            
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
            
            const steam = await scrape(`https://steamcommunity.com/sharedfiles/filedetails/?id=${weeklies.at(-1)[0]}`, `https://steamcommunity.com/profiles/${weeklies.at(-1)[1]}`); // scrapes steam workshop and user profile
        
            const image = steam.rawSrc; // converts object into usable strings --------
            const title = steam.rawTitle.replace(/<.+?>/gmi, '');
            const mats = steam.rawDesc.split('_')[0].split(',');
            const desc = convertFormatting(steam.rawDesc.split('_')[1]);
            const user = steam.rawUser.replace(/<.+?>/gmi, ''); // ---------

            return { image, title, mats, desc, user };
        }

        async function interval(){
            const now = new Date; // finds date of next weekly --------
            let day = now.getUTCDay();
            let today = now.getUTCDate();
            let nextWeeklyDay = today + (7 - day) - 1; // days until next weekly
            let timeOfNextWeekly = new Date(now.getUTCFullYear(), now.getUTCMonth(), nextWeeklyDay, 20, 1, 10, 0); // 12am sunday utc
            let timeUntilNextWeekly = timeOfNextWeekly.getTime() - now.getTime(); // ---------

            console.log(timeOfNextWeekly)
    
            setTimeout(async () => {
                const data = await doWeekly();
                const weekNum = weeklies.at(-1)[2] - 1;
    
                for(let i in data.mats){ // remove when v2 metadata --------
                    if(data.mats[i] == 1){
                        data.mats[i] = '✅';
                    }else{
                        data.mats[i] = '❌';
                    }
                } // ----------

    
                let embed = new EmbedBuilder()
                .setTitle(`Weekly Challenge: Season ${Math.floor(weekNum / 10) + 1}, Week ${weekNum % 10 + 1}`)
                .setColor('#9BAEFE')
                .setFooter({ text: `Polybot v${package.version}, by @ha_m`, iconURL: 'https://cdn.discordapp.com/attachments/1054531526030799038/1125659991957844038/icon.png' })
                .setImage(data.image)
                .addFields(
                    { name: data.title, value: data.desc },
                    { name: 'Budget', value: `$${data.mats[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, inline: true },
                    { name: 'Author', value: data.user, inline: true },
                    { name: 'Allowed Materials', value: `<:road:1125659532547334214>: ${data.mats[1]} | <:wood:1125659581356445696>: ${data.mats[2]} | <:steel:1125659535865032714>: ${data.mats[3]} | <:hydraulic:1125659530651512963>: ${data.mats[4]}\n<:rope:1125659534304747641>: ${data.mats[5]} | <:cable:1125659528021676043>: ${data.mats[6]} | <:spring:1125659535072313395>: ${data.mats[7]} | <:foundation:1125659529762324542>: ${data.mats[8]}`}
                );
                
                client.channels.cache.get('1127479241689272340').send({ embeds: [embed] }); // sends to weekly channel *******UNCOMMMENT WHEN CLOSER TO RELEASE***********

                interval(); // now do it again
            }, timeUntilNextWeekly ); // wait for weekly drop
        }

        interval();
    }
}