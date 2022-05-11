const { SlashCommandBuilder } = require('@discordjs/builders')
const db = require('quick.db')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears all current cooldowns, useful if the bot goes down'),
  async execute (interaction) {
    const channels = Array.from(interaction.guild.channels.cache.keys())

    for (const i in channels) {
      if (!interaction.guild.channels.resolve(channels[i]).isText()) {
        channels.splice(i, 1)
      }
    }

    channels.shift()

    const state = []
    for (const i in channels) {
      state.push(db.get(`${channels[i]}.paused`))
      db.delete(channels[i])
      db.set(`${channels[i]}.paused`, state[i])
    }

    await interaction.reply({ content: 'Cleared all level command cooldowns in all channels', ephemeral: true })
  }
}
