const db = require('quick.db');
const { check } = require('../../scripts/check.js');
const { EmbedBuilder } = require("discord.js");
const puppeteer = require('puppeteer')
const package = require('../../package.json');

module.exports = {
	async execute(interaction){
        const nomId = interaction.options.getString('workshop-id');

        await interaction.deferReply();

        if(await check(interaction, nomId)) return; 

        if(db.has(`nominations.${nomId}`)){
            return interaction.followUp({ content: `\`${nomId}\` has already been suggested!` });
        }

        await db.set(`nominations.${nomId}.status`, 'suggested');

        await interaction.followUp({ content: `\`${nomId}\` was added to the nominations!` });

        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto(`https://steamcommunity.com/sharedfiles/filedetails/?id=${nomId}`);
    
        const [e] = await page.$x('/html/body/div[1]/div[7]/div[5]/div[1]/div[4]/div[5]/div[2]');
        const title = await e.getProperty('textContent');
        const rawTitle = await title.jsonValue();

        browser.close();

        let date = new Date();

        await db.set(`nominations.${nomId}.title`, rawTitle);
        await db.set(`nominations.${nomId}.id`, nomId);
        await db.set(`nominations.${nomId}.link`, `https://steamcommunity.com/sharedfiles/filedetails/?id=${nomId}`);
        return db.set(`nominations.${nomId}.date`, date.getTime());
	}
}