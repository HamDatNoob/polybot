const { MessageEmbed, MessageAttachment } = require('discord.js')
const pb1Levels = require('../../json/pb1Levels.json')

module.exports = {
  name: 'worldButton',
  async execute (interaction) {
    const file = new MessageAttachment('./images/icon.png')
    let option
    if (interaction.message) {
      option = interaction.message.embeds[0].title
    } else {
      option = interaction.options.getInteger('input')
    }

    let title
    let color
    let num
    switch (option) {
      case 'Pine Mountains':
        title = 'Alpine Meadows'
        color = '#379937'
        num = 1
        break
      case 'Glowing Gorge':
        title = 'Desert Winds'
        color = '#d6ca7e'
        num = 2
        break
      case 'Tranquil Oasis':
        title = 'Snow Drift'
        color = '#82e8e1'
        num = 3
        break
      case 'Sanguine Gulch':
        title = 'Ancient Ruins'
        color = '#82e8ba'
        num = 4
        break
      case 'Serenity Valley':
        title = '80s Fun Land'
        color = '#5da0c2'
        num = 5
        break
      case 'Steamtown':
        title = 'Zen Gardens'
        color = '#a7e8c3'
        num = 6
        break
      case 7:
        title = 'Tropical Paradise'
        color = '#e5e892'
        num = 7
        break
      case 8:
        const levels = []
        for (let i = 0; i < 10; i++) {
          levels.push({ code: pb1Levels[105 + i].code, name: pb1Levels[105 + i].name })
        }

        const w8Embed = new MessageEmbed()
          .setColor('#ab75bf')
          .setTitle('Area 52')
          .setThumbnail('attachment://icon.png')
          .setFields(
            { name: '\u200b', value: `\`${levels[0].code}\`: ${levels[0].name}\n\`${levels[1].code}\`: ${levels[1].name}\n\`${levels[2].code}\`: ${levels[2].name}\n\`${levels[3].code}\`: ${levels[3].name}\n\`${levels[4].code}\`: ${levels[4].name}\n\`${levels[5].code}\`: ${levels[5].name}\n\`${levels[6].code}\`: ${levels[6].name}\n\`${levels[7].code}\`: ${levels[7].name}\n\`${levels[8].code}\`: ${levels[8].name}\n\`${levels[9].code}\`: ${levels[9].name}` }
          )

        return interaction.reply({ embeds: [w8Embed], files: [file], ephemeral: true })
    }

    const levels = []
    for (let i = 0; i < 15; i++) {
      levels.push({ code: pb1Levels[(num - 1) * 15 + i].code, name: pb1Levels[(num - 1) * 15 + i].name })
    }

    const worldEmbedEdit = new MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setThumbnail('attachment://icon.png')
      .setFields(
        { name: '\u200b', value: `\`${levels[0].code}\`: ${levels[0].name}\n\`${levels[1].code}\`: ${levels[1].name}\n\`${levels[2].code}\`: ${levels[2].name}\n\`${levels[3].code}\`: ${levels[3].name}\n\`${levels[4].code}\`: ${levels[4].name}\n\`${levels[5].code}\`: ${levels[5].name}\n\`${levels[6].code}\`: ${levels[6].name}\n\`${levels[7].code}\`: ${levels[7].name}\n\`${levels[8].code}\`: ${levels[8].name}\n\`${levels[9].code}\`: ${levels[9].name}\n\`${levels[10].code}\`: ${levels[10].name}\n\`${levels[11].code}\`: ${levels[11].name}\n\`${levels[12].code}\`: ${levels[12].name}\n\`${levels[13].code}\`: ${levels[13].name}\n\`${levels[14].code}\`: ${levels[14].name}` }
      )

    if (option == 7) {
      await interaction.reply({ embeds: [worldEmbedEdit], files: [file], ephemeral: true })
    } else {
        	await interaction.update({ embeds: [worldEmbedEdit], files: [file], components: [] })
    }
  }
}
