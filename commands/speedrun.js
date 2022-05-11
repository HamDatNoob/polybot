const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js')
const api = require('../json/api.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('speedrun')
    .setDescription('Get speedrunning information from speedrun.com')
    .addNumberOption(option => // option 0
      option
        .setName('run')
        .setDescription('The specific category of run to look for')
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addNumberOption(option => // option 1
      option
        .setName('type')
        .setDescription('The type of run')
        .addChoices([
          ['any%', 0],
          ['any% nma', 1],
          ['100% nma', 2]
        ])
        .setRequired(true)
    )
    .addNumberOption(option => // option 2
      option
        .setName('mode')
        .setDescription('The mode of the run, defaults to normal, ignore \"both\" if not a f4w or full run')
        .addChoices([
          ['normal', 0],
          ['challenge', 1],
          ['both', 2]
        ])
        .setRequired(true)
    ),
  async execute (interaction) {
    const options = interaction.options._hoistedOptions

    let run = options[0].value
    const type = options[1].value
    const mode = options[2].value

    let url = 'https://www.speedrun.com/api/v1/leaderboards/9d3rjx0d/'

    if (run <= 1) { // adds category/level of run
      url = url.concat(`level/${api.data.levels.data[run].id}/`)
    } else if (run <= 3) {
      run += 4
      url = url.concat(`category/${api.data.categories.data[run].id}?var-onvj7gwn=`)
    } else if (run <= 99) {
      run -= 2
      url = url.concat(`level/${api.data.levels.data[run].id}/`)
    } else if (run >= 100) {
      run -= 100
      url = url.concat(`category/${api.data.categories.data[run].id}?var-onvj7gwn=`)
    } else {
      return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }

    const types = ['p12kv471', '21dr0e5q', '5q85y93q']// any%, any% nma, 100% nma

    let name
    if (url.match(/category/gmi)) { // run type and mode
      url = url.concat(`${types[type]}&var-${api.data.categories.data[run].variables.data[0].id}=${Object.keys(api.data.categories.data[run].variables.data[0].values.choices)[mode]}&top=1`)
      name = api.data.categories.data[run].name
    } else {
      url = url.concat(`${api.data.levels.data[run].categories.data[mode].id}?var-onvj7gwn=${types[type]}&top=1`)
      name = api.data.levels.data[run].name
    }

    let data1
    const res1 = await fetch(url)
    if (res1.ok) data1 = await res1.json()
    data1 = data1?.data

    if (data1.runs[0] == undefined) return interaction.reply({ content: 'There was an error while executing this command! (Most likely no run exists for this category)', ephemeral: true })

    let data2
    const res2 = await fetch(data1.runs[0].run.players[0].uri)
    if (res2.ok) data2 = await res2.json()
    data2 = data2?.data

    const typeNames = ['Any%', 'Any% NMA', '100% NMA']
    const modeNames = ['Normal', 'Challenge', 'Both']

    const time = new Date(data1.runs[0]?.run.times.primary_t * 1000).toISOString().slice(11, 23)
    let comment = data1.runs[0]?.run.comment
    let user = data2?.names.international
    let submitted = data1.runs[0]?.run.date

    if (time == undefined) return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    if (comment == undefined) comment = ''
    if (user == undefined) user = 'Guest'
    if (submitted == undefined) submitted = ''

    const icon = new MessageAttachment('./images/icon.png')
    const recordDataEmbed = new MessageEmbed()
      .setTitle(`World record for ${name}, ${typeNames[type]}, ${modeNames[mode]}`)
      .setColor('#f9db44')
      .setThumbnail('attachment://icon.png')
      .setFields(
        { name: 'Time', value: time },
        { name: 'Comment', value: comment },
        { name: 'User', value: user },
        { name: 'Submitted', value: submitted }
      )

    let videoLinkButton
    if (data1.runs[0]?.run.videos?.links[0]?.uri != undefined) {
      videoLinkButton = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Video')
            .setStyle('LINK')
            .setURL(data1.runs[0]?.run.videos?.links[0]?.uri),
          new MessageButton()
            .setLabel('Website')
            .setStyle('LINK')
            .setURL(data1.runs[0]?.run.weblink)
        )
    } else {
      videoLinkButton = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Video')
            .setStyle('LINK')
            .setURL('https://www.speedrun.com/polybridge2')
            .setDisabled(true),
          new MessageButton()
            .setLabel('Website')
            .setStyle('LINK')
            .setURL('https://www.speedrun.com/polybridge2')
            .setDisabled(true)
        )
    }

    return interaction.reply({ embeds: [recordDataEmbed], files: [icon], components: [videoLinkButton], ephemeral: false })
  }
}
