const categories = {
    basics: {
        triangles: {
            name: 'Basics: Triangles',
            description: 'Triangles are a fundemental part of building structurally sound bridges, as they have no way to collapse in on themselves; other than the materials themselves breaking. To construct structurally sound triangles, follow the guide in the gif below.',
            image: 'https://cdn.discordapp.com/attachments/872600292586303490/975127280592506950/basics.triangles.gif?size=4096'
        },
        steeltriangles: {
            name: 'Basics: Steel Triangles',
            description: 'Steel triangles shouldn\'t use the same formula as wooden triangles. Proper steel triangles should stretch over two roads instead of just one, as steel is longer than wood. Refer to the gif below to construct proper steel triangles.',
            image: 'https://cdn.discordapp.com/attachments/872600292586303490/975127279883649024/basics.steeltriangles.gif?size=4096'
        },
        springs: {
            name: 'Basics: Springs',
            description: 'Springs are a new addition to the game and can compress and expand accordingly. Springs are practical for making catches for jumps and launch pads. If you hover over the middle of the spring, an icon will appear that you can drag to adjust the compression or stretch amount of the spring. Refer to the gif below for a visual representation.',
            image: 'https://cdn.discordapp.com/attachments/872600292586303490/975138533889175562/basics.springs.gif?size=4096'
        },
        muscles: {
            name: 'Basics: Muscles/Diamonds',
            description: 'Muscles, or Diamonds, the name \"muscle\" popularized by the YouTuber \"Aliensrock,\" or the production name given by the developers: \"diamond,\" are a way to make materials longer and/or stronger. The method includes two triangles stacked opposing each other to create a diamond-shaped quadrilateral. This is stronger because it distributes the load between two beams, as opposed to one. If the diamonds arent perfectly symetrical, it isn\'t the end of the world, just less robust. Refer to the gif below to build diamonds correctly.',
            image: 'https://cdn.discordapp.com/attachments/872600292586303490/975146504140492910/basics.muscles.gif?size=4096'
        },
        wallbracing: {
            name: 'Basics: Wall Bracing',
            description: 'Wall bracing is a technique used to support something with only one anchor (red node), or give extra support to something. You do not need to go off-grid to get the perfect wall brace; the game\'s grid perfectly lines up with the collider of the wall. Wall bracing cannot be used on platforms; as they do not have a collision for nodes. Follow the gif below to wall brace correctly.',
            image: 'https://cdn.discordapp.com/attachments/872600292586303490/975157862215090176/basics.wallbracing.gif?size=4096'
        },
        cvst: {
            name: 'Basics: Compression vs Tension',
            description: 'Compression is when the forces on the material are pushing towards each other, crushing it. Tension is when the forces on the material are pulling away from each other, tearing it. Both types of building strategies have their advantages and disadvantages, and both are incredibly useful in their circumstances. Some materials are better in tension or compression; for example, cable and rope are exceptional in tension but do not work in compression at all, but roads are great at it. Refer to the gif below to observe the differences between the two types of force.',
            image: 'https://cdn.discordapp.com/attachments/965424891786563654/975935555810508820/basics.cvst.gif?size=4096'
        }
    },
    hydraulics: {
        drawbridge: {
            name: 'Hydraulics: Basic Drawbridge',
            description: 'Even a basic drawbridge can be complex to those who do not entirely understand the fundamentals of drawbridges. The gif below should guide you through the process of building a basic drawbridge on the level: \"1-6: First Drawbridge\".',
            image: 'https://cdn.discordapp.com/attachments/965424891786563654/975961541490917376/hydraulics.drawbridge.gif?size=4096'
        },
        mistakes: {
            name: 'Hydraulics: Common Mistakes',
            description: 'Hydraulics can be confusing at times, often leading to seemingly simple mistakes. No worries! We\'re here to help, and here are some simple fixes that might apply to your current situation. Refer to the gif below to get started on fixing your mistakes! Just remember, mistakes are an opportunity to learn from, and you shouldn\'t feel disheartened by them.',
            image: 'https://cdn.discordapp.com/attachments/965424891786563654/976601480121438288/hydraulics.mistakes.gif?size=4096'
        },
        splitjoints: {
            name: 'Hydraulics: Split Joints',
            description: 'Split joints: a crucial part of building operational drawbridges. Without them, your bridges would implode upon themselves while they\'re trying to do their job. Split joints can be complex to understand, so refer to the gif below to better understand them.',
            image: 'https://cdn.discordapp.com/attachments/965424891786563654/977007091749355530/hydraulics.splitjoints.gif?size=4096'
        },
        threeway: {
            name: 'Hydraulics: 3-Way Split Joints',
            description: 'Three-way split joints: a new addition to the game in the latest sequel, are an excellent way to help bring your more complex bridges to life. They can be intimidating at first, as having to deal with tons of joints and three possible ways for them to split is a daunting task. To help with three-way split joints, follow the gif below.',
            image: 'https://cdn.discordapp.com/attachments/965424891786563654/978120657483210852/hydraulics.threeway.gif?size=4096'
        },
        hydrauliccontroller: {
            name: 'Hydraulics: Hydraulic Controller',
            description: 'The hydraulic controller: a critical component to building drawbridges and completing levels in the later worlds, can be hard to understand at first. It\'s actually quite simple! The hydraulics and split joints outlined in yellow will activate, and those with a white dashed outline will hold their positions. Refer to the gif below to better understand the hydraulic controller.',
            image: 'https://cdn.discordapp.com/attachments/965424891786563654/978120658011713576/hydraulics.hydrauliccontroller.gif?size=4096'
        }
    },
    sandbox: {
        hydraulicphases: {
            name: 'Sandbox: Hydraulic Phases',
            description: 'A common issue that people have is not being able to make split joints/hydraulics move in sandbox mode. This is intentional! Refer to the gif below for instructions.',
            image: 'https://cdn.discordapp.com/attachments/754824436561084486/981744504140857394/sandbox.hydraulicphases.gif?size=4096'
        },
        submitting: {
            name: 'Sandbox: Submitting to Workshop',
            description: 'Once you\'ve made your impeccable and ingenious level, you may want to upload it to the workshop for others to play. Access the sandbox mode and click on the \"Upload to workshop\" button to begin the uploading process. Further instruction continues in the gif below.',
            image: 'https://cdn.discordapp.com/attachments/965424891786563654/981745541044125746/sandbox.submitting.gif?size=4096'
        },
        eventeditor: {
            name: "Sandbox: Event Editor",
            description: "The event editor is a crucial part of creating levels and may seem complex at first. But it's much more straightforward than it may seem! It works just as a basic flow chart would; and also works in alphabetical order. Refer to the gif for further information on how it functions.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/986107594072539187/sandbox.eventeditor.gif?size=4096"
        },
        checkpoints: {
            name: "Sandbox: Checkpoints",
            description: "Checkpoints are hidden away in the depths of the sandbox menus, so some people might be unable to find them and use them. Checkpoints also have a few options that might be a bit confusing to some people. Refer to the gif below for further elaboration.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/986359559939575878/sandbox.checkpoints.gif?size=4096"
        },
        stats: {
            name: "Sandbox: Vehicle Stats",
            description: "The vehicles in the game can have their stats changed! To accomplish this, navigate into the vehicle's menu by clicking on it, then click on the button labeled \"Physics.\" For a visual demonstration of this, refer to the gif below.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/986364561466749048/sandbox.stats.gif?size=4096"
        }
    },
    budgeting: {
        shaving: {
            name: "Budgeting: Shaving",
            description: "If your bridge is overbudget, you need to adjust pieces of your bridge to reduce the cost. To go about this, you can remove pieces, change them to a less costly material, or make it shorter. Refer to the bridge builder's handbook for help."
        },
        redundancies: {
            name: "Budgeting: Removing Redundancies",
            description: "Another part of budgeting is removing pieces that aren't important to the bridge. Some instances include a piece going between two anchors; or a piece underlying two other pieces in a situation where it isn't necessary. Refer to the bridge builder's handbook for help."
        },
        uat: {
            name: "Budgeting: Utalizing Advanced Techniques",
            description: "Sometimes, your bridge may be too expensive to shave with normal techniques. Such unique strategies include dangles, bananas, and other jankery™. Feel free to ask about some of these! Refer to the /term command or the bridge builder's handbook for help."
        }
    }
};

function getGuide(category, term){
    return categories[category][term];
}

module.exports = { getGuide };