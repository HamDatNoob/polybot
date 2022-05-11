const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
  name: 'guideMenu',
  async execute (interaction) {
    const option = interaction.values
    const text = require('../../json/helpMenu.json')

    const icon = new MessageAttachment('./images/icon.png')
    const helpEmbedEdit = new MessageEmbed()
      .setColor('#f9db44')
      .setTitle('Help')
      .setThumbnail('attachment://icon.png')
      .setDescription(`${text[option].title}`)
      .addFields(
        { name: text[option].fields.heading1, value: text[option].fields.body1 }
      )

    await interaction.update({ embeds: [helpEmbedEdit], files: [icon], components: [] })
  }
}
