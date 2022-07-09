const categories = {
    exploits: {
        pfr: {
            name: "PFR / Precise Falling Road",
            description: "A type of falling road that has a small amount of material and hits the vehicle at one precise point to catapult it.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/995115644909531208/pfr.gif?size=4096"
        },
        mfr : {
            name: "MFR / Massive Falling Road",
            description: "A type of falling road that has a lot of material and hits the vehicle in a wider contact point.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/995115642124505138/mfr.gif?size=4096"
        },
        sfr: {
            name: "SFR / Stuck Falling Road",
            description: "A type of falling road that penetrates inside of the hitbox of a car, causing a lot of collisions that generate speed / height.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985705688854581268/sfr.gif?size=4096"
        },
        ssr: {
            name: "SSR / Stuck Spring Road",
            description: "A glitch that uses very stretched springs to force roads into a car, causing it to gain speed / height.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985705687919243315/ssr.gif?size=4096"
        },
        tc: {
            name: "TC / Torque Cannon",
            description: "A glitch which forces a vehicle's chassis into the ground using a weighted road, causing it to gain speed.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985705688359641108/tc.gif?size=4096"
        },
        fc: {
            name: "FC / Flip Cannon",
            description: "A mechanism that positions road so that, when a car triggers a flip cannon, the road will be phased into its hitbox, launching the car.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985738336985571378/fc.gif?size=4096"
        },
        hc: {
            name: "HC / Hydraulic Cannon",
            description: "Taking advantage of hydraulics' increased strength during phases, this uses hydraulics to pull road into a car, launching when it breaks.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985738336448696351/hc.gif?size=4096"
        },
        the: {
            name: "The",
            description: "A specific type of torque cannon which allows a vehicle to gain speed without the wheels touching the ground. Yes, The is its offical name.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/995115643554762792/the.gif?size=4096"
        },
        spy: {
            name: "SPY / Stuck Platform Yeet",
            description: "Accomplished through other forms of jank, a car can get stuck part way in a platform, causing it to freak out.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/995115644393627748/spy.gif?size=4096"
        },
        scy: {
            name: "SCY / Stuck Car Yeet",
            description: "Accomplished through other forms of jank, a car can get stuck partway in another car, causing it to freak out.",
            image: "https://cdn.discordapp.com/attachments/767934623678201866/995117918763368548/scy.gif?size=4096"
        },
        sfc: {
            name: "SFC / Stuck Falling Car",
            description: "A car falls / gets launched into a piece of road, causing it to gain speed. It is similar to an SFR, but the car falls instead of the road.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985971851564040222/contribute.png?size=4096"
        },
    },
    bugs: {
        mw: {
            name: "Material Warping",
            description: "Usually accomplished using unbreakable mode enabled, this causes material to stretch, compress, or otherwise bend in a not usually doable way.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985736866278039632/warping.gif?size=4096"
        },
        emw: {
            name: "EMW / Explosive Material Warp",
            description: "Material warp done without unbreakable mode that tries to snap back to its initial length when driven on, causing sudden speed and breaks.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/995115642694934588/emw.gif?size=4096"
        },
        ilm: {
            name: "ILM / Illegal Length Material",
            description: "A glitch which allows pieces of impossible lengths and positions to be made. Only used practically in speedruns, as it enables the cheat flag.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985419029080592394/lr.png?size=4096"
        },
        slr: {
            name: "SLR / Stuck Long Road",
            description: "A road—often long—is positioned inside of a car when the simulation starts, so that it collides with the wheels/hitbox and causes a launch.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985736303498903653/slr.gif?size=4096"
        },
    },
    techniques: {
        dangle: {
            name: "Dangling Bridge",
            description: "A loose-hanging, arced road that supports itself.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985705687592095774/dangle.gif?size=4096"
        },
        banana: {
            name: "Banana Bridge",
            description: "A dangle with a loose-hanging rope/cable layer underneath helping support each road.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985741069754978375/banana.gif?size=4096"
        },
        smithy: {
            name: "Smithy Bridge",
            description: "Primarily utilizing the method of building banana bridges, Smithy bridges have irregular connections with the roads, combining tension supports and dangles together.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985741070530928700/smithy.gif?size=4096"
        },
        muscle: {
            name: "Muscle",
            description: "Two triangles placed in a diamond shape to help reinforce or extend the reach of a normal bridge piece.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985418123895251015/muscle.png?size=4096"
        },
        sc: {
            name: "SC / Spring Cannon",
            description: "A mechanism made of stretched/compressed springs used to push/pull a car.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985742301659799602/sc.gif?size=4096"
        },
        fr: {
            name: "FR / Falling Road",
            description: "Road falling from the sky, usually to catapult cars.",
            image: "https://i.imgur.com/9FK9r4X.gif"
        },
        mf: {
            name: "Muscle Fractals / Arglin Diamonds",
            description: "Arglin Diamonds are based on the style Arglin usually does to create supermassive support structures which takes the concept of suspension supports to hold together a long spanning support structure.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985416026609057873/musclefractals.png?size=4096"
        },
        wr: {
            name: "Chain / Wood Rope",
            description: "A string of bridge pieces put under tension to act as a replacement for rope or cable",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985738947860791296/chain.png?size=4096"
        },
        lb: {
            name: "Land Bracing / Wall Bracing",
            description: "A type of undersupport which holds up something by propping up against the side of the land (or an object, such as a custom shape.)",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/985416986949468160/landbrace.png?size=4096"
        },
        toothpick: 	{
            name: "Toothpick",
            description: "A long and skinny, usually wooden, pole used to stabilize structures, similar to a muscle.",
            image: "https://cdn.discordapp.com/attachments/872600292586303490/986111135046570026/toothpick.png?size=4096"
        }
    },
    challenges: {
        rws: {
            name: "RWS / Road Wood Steel",
            description: "A player-made challenge of beating the game with only road, wood, and steel."
        }
    }
}

function getTerm(category, term){
    return categories[category][term];
}

module.exports = { getTerm };