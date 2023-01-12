const levels = [
    [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ],
    [
        [],
        [],
        [],
        [
            {
                name: "2-4: Buggy Bouncer",
                num: 0,
                description: "Avoid using springs as a catch, as they greatly decrease momentum.",
                image: null
            },
            {
                name: "2-4: Buggy Bouncer",
                num: 1,
                description: "Try using two smaller jumps, rather than one.",
                image: null
            },
            {
                name: "2-4: Buggy Bouncer",
                num: 2,
                description: "Try laying out the roads like this.",
                image: "https://media.discordapp.net/attachments/692975906117124116/1061582616995844216/SPOILER_SPOILER_unknown.png?width=1440&height=393"
            }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ],
    [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ],
    [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ],
    [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ],
    [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]
];

function getHelp(world, level){
	return levels[world][level];
}

module.exports = { getHelp };