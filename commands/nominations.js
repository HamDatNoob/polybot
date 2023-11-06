const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('nominations')
	.setDescription('Level nominations for the Weekly Challenge')
    .addSubcommand(subcommand => subcommand
        .setName('add')
        .setDescription('Nominate a level for the Weekly Challenge')
        .addStringOption(option => option
            .setName('workshop-id')
            .setDescription('The workshop ID of the level you want to nominate')
            .setRequired(true)    
        )
    )
    .addSubcommand(subcommand => subcommand
        .setName('get')
        .setDescription('Get a level\'s nomination status')
        .addStringOption(option => option
            .setName('workshop-id')
            .setDescription('The workshop ID of the level you want to check')
            .setRequired(true)    
        )
    )
    .addSubcommand(subcommand => subcommand
        .setName('list')
        .setDescription('Prints a list of the currently nominated levels')
    )
    .addSubcommand(subcommand => subcommand
        .setName('set')
        .setDescription('Sets the nomination\'s status (mod-only)')
        .addStringOption(option => option
            .setName('workshop-id')
            .setDescription('The workshop ID of the level you want to set the status of')
            .setRequired(true)    
        )
        .addStringOption(option => option
            .setName('value')
            .setDescription('The status to change to')
            .setRequired(true)
            .addChoices(
                { name: 'Suggested', value: 'suggested' },
                { name: 'Rejected', value: 'rejected' },
                { name: 'Accepted', value: 'weekly-' }
            )
        )
    )
}

// dummy command for subcommands, see /subcommands/nominations_...