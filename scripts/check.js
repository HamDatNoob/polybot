const puppeteer = require('puppeteer');

async function check(interaction, id){
    try{
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        const response = await page.goto(`https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`);

        if(!response.ok()) return browser.close();

        const [e] = await page.$x('/html/body/div[1]/div[7]/div[5]/div[1]/div[1]/div[1]/div[2]/div[2]');
        const gameCheck = await e?.getProperty('textContent');
        const rawGameCheck = await gameCheck?.jsonValue();

        if(rawGameCheck != 'Poly Bridge 3'){
            await interaction.followUp({ content: `\`${id}\` is not a valid workshop ID for Poly Bridge 3!` });
            await browser.close();

            return true;
        }

        await browser.close();

        return false;
    }catch(err){
        console.error(err);
        await interaction.followUp({ content: 'There was an error while executing this command!' });

        return true;
    }
}

module.exports = { check };