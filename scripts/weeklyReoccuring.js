const package = require('../package.json');
const puppeteer = require('puppeteer');
const { EmbedBuilder } = require('discord.js');
const { steamKey } = require('../config.json');
const schedule = require('node-schedule');
const db = require('quick.db');

module.exports = {
    async execute(client){
        const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = 1;
        rule.hour = 0;
        rule.minute = 0;
        rule.tz = 'Etc/UTC';

        const job = schedule.scheduleJob(rule, async function(){
            await fetch('https://pb3game.s3.us-east-2.amazonaws.com/weeklies/manifest').then(res => { // refreshes weekly json file
                return res.arrayBuffer();
            }).then(buffer => {
                let arr = Buffer.from(buffer).toString().split('\n');
                
                for(let i in arr){
                    arr[i] = arr[i].split('\t');
                }

                arr.pop();

                let currentWeek = parseInt(arr.shift());
                let weeks = arr.sort((a, b) => a[2] - b[2]);

                db.set(`currentWeek`, currentWeek);
                for(let i in weeks){
                    db.set(`${weeks[i][2]}.level`, weeks[i][0]);
                    db.set(`${weeks[i][2]}.user`, weeks[i][1]);
                }
            }); // ----------
            
            weekIndex = await db.get('currentWeek');

            async function scrape(url, url2){
                const browser = await puppeteer.launch({ headless: "new", executablePath: '/bin/chromium-browser', args: ['--no-sandbox', '--disable-setuid-sandbox'] }); // extra for pi; remove executable path and args for windows
                const page = await browser.newPage();
                await page.goto(url);
            
                const [e] = await page.$x('//*[@id="previewImage"]');
                const src = await e.getProperty('src');
                const rawSrc = await src.jsonValue();
            
                const [e2] = await page.$x('/html/body/div[1]/div[7]/div[5]/div[1]/div[4]/div[5]/div[2]');
                const title = await e2.getProperty('textContent');
                const rawTitle = await title.jsonValue();
            
                const [e3] = await page.$x('//*[@id="highlightContent"]');
                const desc = await e3.getProperty('innerHTML');
                const rawDesc = await desc.jsonValue();

                browser.close();

                let rawUser;
                await fetch(url2).then(res => {
                    return res.arrayBuffer();
                }).then(buffer => {
                    let user = JSON.parse(Buffer.from(buffer).toString());

                    rawUser = user.response.players[0].personaname;
                });
                    
                return { rawSrc, rawTitle, rawDesc, rawUser };
            }

            function convertFormatting(input){
                input = input.replace(/&lt;(\/?.+?)&gt;/gmi, '<$1>'); // converts &lt;&gt; to <>
    
                input = input.replace(/<br>/gmi, '\n'); // line break
                input = input.replace(/<i>(.+?)<\/i>/gmi, '*$1*'); // italic
                input = input.replace(/<b>(.+?)<\/b>/gmi, '**$1**'); // bold
                input = input.replace(/<u>(.+?)<\/u>/gmi, '__$1__'); // underline
                input = input.replace(/<s>(.+?)<\/s>/gmi, '~~$1~~'); // striketrough
                
                input = input.replace(/<.+?>/gmi, ''); // remove other tags
                
                return input;
            }
            
            let steam;
            try{
                steam = await scrape(`https://steamcommunity.com/sharedfiles/filedetails/?id=${await db.get(`${weekIndex}.level`)}`, `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamKey}&steamids=${await db.get(`${weekIndex}.user`)}`); // scrapes steam workshop and user profile
            }catch(err){
                console.error(err);
                return client.channels.cache.get('1127479241689272340').send({ content: "Something went wrong while displaying the Weekly Challenge!" });
            }
        
            let v2;
            if(steam.rawDesc.split(',')[0] == 'v2'){
                v2 = true;
                steam.rawDesc.replace(/v2,/gmi, '');
            }else{
                v2 = false;
            }
            
            const image = steam.rawSrc; // converts object into usable strings --------
            const title = steam.rawTitle.replace(/<.+?>/gmi, '');
            const mats = steam.rawDesc.split('_')[0].split(',');
            let desc = convertFormatting(steam.rawDesc.split('_')[1]);
            const user = steam.rawUser.replace(/<.+?>/gmi, ''); // ---------

            const weekNum = weekIndex - 1;

            for(let i in mats){
                if(mats[i] == 1 && v2 == false){
                    mats[i] = '✅';
                }else if(mats[i] == 0){
                    mats[i] = '❌';
                }else if(mats[i] == 100){
                    mats[i] = '∞';
                }
            }

            let budget;
            let fixedMats;
            if(v2 == true){
                budget = `$${mats[1].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                fixedMats = `<:road:1125659532547334214>: ${mats[2]} | <:wood:1125659581356445696>: ${mats[3]} | <:steel:1125659535865032714>: ${mats[4]} | <:hydraulic:1125659530651512963>: ${mats[5]}\n<:rope:1125659534304747641>: ${mats[6]} | <:cable:1125659528021676043>: ${mats[7]} | <:spring:1125659535072313395>: ${mats[8]} | <:foundation:1125659529762324542>: ${mats[9]}`;
            }else{
                budget = `$${mats[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                fixedMats = `<:road:1125659532547334214>: ${mats[1]} | <:wood:1125659581356445696>: ${mats[2]} | <:steel:1125659535865032714>: ${mats[3]} | <:hydraulic:1125659530651512963>: ${mats[4]}\n<:rope:1125659534304747641>: ${mats[5]} | <:cable:1125659528021676043>: ${mats[6]} | <:spring:1125659535072313395>: ${mats[7]} | <:foundation:1125659529762324542>: ${mats[8]}`
            }

            if(desc === ''){
                desc = 'No description.';
            }

            let embed = new EmbedBuilder()
            .setTitle(`Weekly Challenge: Season ${Math.floor(weekNum / 10) + 1}, Week ${weekNum % 10 + 1}`)
            .setColor('#9BAEFE')
            .setFooter({ text: `Polybot v${package.version}, by @ha_m | Use \"/nominations add\" to nominate a level!`, iconURL: 'https://cdn.discordapp.com/attachments/1054531526030799038/1125659991957844038/icon.png' })
            .setImage(image)
            .addFields(
                { name: title, value: desc },
                { name: 'Budget', value: budget, inline: true },
                { name: 'Author', value: user, inline: true },
                { name: 'Allowed Materials', value: fixedMats }
            );

            client.channels.cache.get('1127479241689272340').send({ content: "A new Weekly Challenge has begun!", embeds: [embed] }); // sends to weekly channel

            console.log(`Next Weekly: ${job.nextInvocation().toISOString()}`);
        });

        console.log(`Next Weekly: ${job.nextInvocation().toISOString()}`);
    }
}

        