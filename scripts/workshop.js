const puppeteer = require('puppeteer');

module.exports = {
    async execute(message){
        if('692977026176647218' != message.channelId) return;

        let [id] = message.content.match(/(?:(?<=\s)|^)`?\d{10}`?(?:(?=\s)|$)/gmi);

        if(id[0] == '`') id = id.replace(/(?:(?<=\s)|^)`?(\d{10})`?(?:(?=\s)|$)/gmi, '$1');

        try{
            const browser = await puppeteer.launch({ headless: "new", executablePath: '/bin/chromium-browser', args: ['--no-sandbox', '--disable-setuid-sandbox'] }); // extra for pi; remove executable path and args for windows
            const page = await browser.newPage();
            const response = await page.goto(`https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`);
    
            if(!response.ok()) return browser.close();
    
            const [e] = await page.$x('/html/body/div[1]/div[7]/div[5]/div[1]/div[1]/div[1]/div[2]/div[2]');
            const gameCheck = await e.getProperty('textContent');
            const rawGameCheck = await gameCheck.jsonValue();
    
            if(rawGameCheck != 'Poly Bridge 3') return browser.close();
        
            browser.close();

            return message.reply(`Steam page: <https://steamcommunity.com/sharedfiles/filedetails/?id=${id}>`);
        }catch(err){}
    }
}