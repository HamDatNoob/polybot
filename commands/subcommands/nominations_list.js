const db = require('quick.db');
const { EmbedBuilder } = require('discord.js');


module.exports = {
	async execute(interaction){
        let a = await db.get("nominations");

        console.log(a)
    }
}