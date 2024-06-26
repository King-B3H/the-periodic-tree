addLayer("a",{
    startData() {return {unlocked: true,}},
    color: "#FC6A03",
    row:"side",
    layerShown() {return true},
    tooltip() {return ("Achievements!")},
    achievements:{
        rows: 10,
        cols: 5,
        11:{
            name: "The Big Bang",
            tooltip: "You have done your first creation... I wonder what's next...",
            done(){return player.cr.points.gt(0)},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                }

              },
            image: "Media/ach1_Img.png"
        },
        12:{
            name: "Breaking the timewall",
            tooltip: "omg you actually get content now. Reward: 10 Atoms",
            unlocked() {return hasAchievement("a", 11)},
            done(){return hasUpgrade("cr", 14)},

            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7LQ4UafFMiXSIYGPkIt2E7bIPGSPaf8n39gg3hEJdxQ&s",
            onComplete(){
                player.points = new Decimal(10)
            },
          style() {
            return hasAchievement(this.layer, this.id) ? "" : {
                backgroundImage: ""
             }
         },

        },
        13:{
            name: "A beginning",
            tooltip: "Do your first hydrogen reset. Reward: 1 new creation upgrade.",
            unlocked() {return hasAchievement('a', 12)},
            done() {return player.h.points.gt(0)},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                }
              },
            image: "https://th.bing.com/th/id/OIP.5iyUUKSTmL-taBas--_oMAAAAA?w=156&h=180&c=7&r=0&o=5&pid=1.7"
        },
        14:{
            name: "Wow, you're really still playing?",
            tooltip: "Have 100 total hydrogen",
            unlocked() {return hasAchievement('a', 13)},
            done() {return player.h.total.gte(100)},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                  
                }
              },
            image: "https://th.bing.com/th/id/OIP.JwrL266NzPtHWrCn4dxmAwHaIN?w=179&h=199&c=7&r=0&o=5&pid=1.7"
        },
        15:{
            name: "Moving on",
            tooltip: "Do your first Helium. Reward: Unlock more hydrogen upgrades",
            unlocked(){return hasAchievement('a', 13)},
            done() {return player.he.total.gt(0)},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                }
              },
            image: "https://th.bing.com/th/id/OIP.JA8mkwas7jiV-oYo3YuTLAHaE8?w=256&h=180&c=7&r=0&o=5&pid=1.7"
        },
        /*
        15:{
            name: "Both",
            tooltip: "Do both a lithium and helium reset",
            unlocked(){return hasAchievement('a', 14)},
            done() {return player.he.total.gt(0) && player.l.total.gt(0)},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                }
              },
            image: "https://th.bing.com/th/id/OIP.BukJXMRGR9uUJi9qADeeXgHaFj?w=211&h=180&c=7&r=0&o=5&pid=1.7"
        },
        21:{
            name: "Hydrogen Bonding",
            tooltip: "Have 1 Million hydrogen",
            unlocked(){return hasAchievement('a', 15)},
            done() {return player.h.points.gte(1e6)},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                }
              },
            image: "https://th.bing.com/th/id/OIP.DlFfktjLOBOpDYHK8X3f1QHaIG?w=189&h=207&c=7&r=0&o=5&pid=1.7",
        },*/
    }
})

addLayer("cr",{
    name: "creation",
    symbol() {
        return `
        <p>CR
        <style>
        #cr{
            background: linear-gradient(315deg, rgba(194,180,40,1) 0%, rgba(158,110,30,1) 63%, rgba(183,255,0,1) 100%);
            border-radius:3px;
        }</style>`
      },
    position: 0,
    startData() {return{
        unlocked: true,
        points: new Decimal(0),
        total:new Decimal(0),
        best: new Decimal(0),
    }},
    color: "yellow",
    resource: "creator points",
    baseResource: "atoms",
    baseAmount() {return player.points},
    type: "static",
    exponent: 1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	
        return mult
    },

    bars: {
        progBar: {

            direction: RIGHT,

            width: 400,
            height: 100,
            fillStyle: {'background-color' : "#FFD700"},
            baseStyle: {'background-color' : "#696969"},
            borderStyle: {'border-width' : "10px"},
            textStyle: {'color': '#000000'},
            divider(){
                let divider = new Decimal(1500)
                if(player.cr.total.gte(1500)) divider = new Decimal(1.38e30)
                return divider
            },
            progress() {
                let divide = tmp.cr.bars.progBar.divider
                let progress = player.cr.points.div(divide)
                if(progress.lte(1) && divide.eq(1.38e30)) progress = player.cr.total.div(divide)
                if(progress.gte(1) && divide.eq(1500)) progress = player.cr.total.div(divide)
                if(progress.lte(1) && divide.eq(1500)) progress = player.cr.total.div(divide)
                return progress
            },
            display() {
                let display = format(player.cr.total) + ' / ' + format(tmp.cr.bars.progBar.divider) + 	'<br><p>Unlocks 1 Major Upgrade<p>'
                return display
            },
            unlocked(){
                let status = true
                if(hasUpgrade("cr", 31)) status = false
                return status
            }
        },
    },
    tabFormat: {
     "Point Boost Upgrades": {
        content:[
            ["display-text",
            function() {return `<h2 style=color:#FFD700;><b>You have ` + format(player.cr.points) + ` Creation points.</b>`},],
            ["display-text",
            function() {return `<h2 style=color:#FFD700;font-size:18px><b>You have ` + format(player.cr.total) + ` total Creation points.</b>`},],
            "blank",
            ["display-text",
            function() {return `<h3 style=color:#FFD700>You are generating ` + format(tmp.cr.generationQuantity) + `/s Creation points.`},],
            ["display-text",
            function() {return `<h3 style=color:#FFD700>Creation Point Gain is raised to the ` + format(tmp.cr.effect) + ` power<br><p style="font-size:15px">(This is due to total Creation points)`},],
            "blank",
            ["upgrades", "1"],
            ["upgrades", "2"],
            ["bar","progBar"],
            "blank",
            "blank",
            ["infobox", "lore1"],
            "blank",
            "blank",
            ["display-text",
            function() {return '<h3><b> Note: Creation Upgrades are meant to be slow. <b></h3>'}],
            ]},
    "Feature Upgrades" : {
        content:[
            ["display-text",
            function() {return `<h2 style=color:#FFD700;><b>This is for testing purposes.<br>Nothing yet to see here :)</b>`},],
            ["upgrade", "11", "12"],
        ],
        unlocked(){
            return (tmp.cr.bars.progBar.progress.neq(player.cr.total.div(1500)))
        },
        
    }},

    update(diff) {
        if (hasUpgrade("cr", "11")) player.cr.points = player.cr.points.add(tmp.cr.generationQuantity.times(diff));
        if (hasUpgrade("cr", "11")) player.cr.total = player.cr.total.add(tmp.cr.generationQuantity.times(diff));
    },
    effect(){
        let effect = player.cr.total.root(3).log10().div(35).add(1)
        if(effect.gte(2)) effect = 2
        return effect
    },

    generationQuantity(){
        let generation = new Decimal(0)
        if(hasUpgrade("cr", 11)) generation = new Decimal(0.5)
        if(hasUpgrade("cr", 12)) generation = new Decimal(1)
        if(hasUpgrade("cr", 13)) generation = new Decimal(5)
        if(hasUpgrade("cr", 14)) generation = new Decimal(15)
        if(hasUpgrade("he", 13)) generation = generation.times(tmp.he.effect.times(2))
        if(hasUpgrade("cr", 21)) generation = generation.times(upgradeEffect("cr", 21))

        return !hasUpgrade("cr", 13) ? generation : generation.pow(tmp.cr.effect)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        {key: "c", description: "c: Reset for creator points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    doReset(resettingLayer) {
        let keep = [];
        if (resettingLayer) keep.push("upgrades")
        if (resttingLayer) layerDataReset("h", keep)
    },
    infoboxes: {
        lore1: {
            title: "Lore",
            unlocked(){
                return hasUpgrade("cr", "14")
             },
            body() { return `In the beginning, all was simple - there were 4 elements: Earth,
            Fire, Water, and Air. All was in peace and harmony... until the fire nation attacked.
            Anyways, in the beginning, there was creation. I do
            not care what you believe in, or what religion you are, but all of
            them have a starting point of the world being created. In this case,
            The Big Bang will be what we will refer to since most people accept
            that as a possible source of creation. The Big Bang was said to have happened around
             13.8 billion years ago. Good Luck! Have fun with the time walls!`},
       },
    },
    upgrades: {
        11: {
            title: "A Start",
            description: "Generate 0.5 Creation points per second.",
            cost: new Decimal(0),
        },
        12: {
            title: "Get Timewalled",
            description: "This will take a while. Increase Creation point generation to 1 per second.",
            cost: new Decimal(50)
        },
        13: {
            title: "This Is Meant To Be Slow",
            description: "You might grow a year older while waiting for this upgrade! Increase Creation point generation to 5 a second.",
            cost: new Decimal(200)
        },
        14: {
            title: "Beginnings",
            description: `Unlocks a new layer<br>Base Creation point generation equals 15`,
            cost: new Decimal(1500),
            unlocked(){
                let status = false
                if(tmp.cr.bars.progBar.progress.gte(1) || hasUpgrade("cr", "14") || tmp.cr.bars.progBar.progress.neq(player.cr.total.div(1500))) status = true
                return status
            },
        },
        21: {
            title: "Gaining Traction",
            description: "Creation Point Generation is boosted exponentially by your total Creation points.",
            cost: new Decimal(10000),
            unlocked(){
                return hasAchievement("a", 13)
            },
            effect(){
                let effect = player.cr.total.log(10).div(10).pow(0.98).add(1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x' },
        },
        22:{
            title: "Creative Synergy",
            description: "Creation Points will add to the lithium and helium effect bases.",
            cost: new Decimal(1000000),
            unlocked(){
                return hasAchievement("a", 13)
            },
            effect(){
                let effect = ((player.cr.points.log(5)).div(500)).pow(0.4)
                return effect
            },
            effectDisplay() { return '+' + format(upgradeEffect(this.layer, this.id))},
        },
        31:{
            title: "ur mom",
            description: "joe mama",
            cost: new Decimal(1e1000),
            unlocked(){
                let status = false
                if(tmp.cr.bars.progBar.progress.gte(1) || hasUpgrade("cr", 31) || tmp.cr.bars.progBar.progress.neq(player.cr.points.div(1.38e30))) status = true
                return status
            },
        }
    },

})

addLayer("ap",{
    name: "atomic power",
    symbol() {
        return `
        <p>AP
        <style>
        #ap{
             background: linear-gradient(311deg, rgba(90,158,30,1) 0%, rgba(121,9,9,1) 63%, rgba(0,212,255,1) 100%);
            border-radius:3px;
            color:white;
        }</style>`
      },
    position: 2,
    row: 0,
    startData() {return{
        unlocked: true,
        points: new Decimal(0),
        total:new Decimal(0),
        best: new Decimal(0),
    }},
    color: "red",
    resource: "atomic power",
    baseResource: "atoms",
    baseAmount() {return player.points},
    type: "static",
    exponent: 1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	
        return mult
    },

    tabFormat: {
     "Atomic Bonuses": {
        content:[
            ["display-text",
            function() {return `<h2 style=color:red;><b>You have ` + format(player.ap.points) + ` Atomic Power.</b>`},],
            ["display-text",
            function() {return `<h2 style=color:red;font-size:18px><b>You have ` + format(player.ap.total) + ` total Atomic Power.</b>`},],
            "blank",
            ["display-text",
            function() {return `<h3 style=color:red>You are generating ` + format(tmp.ap.generationQuantity) + `/s Atomic Power.`},],
            ]},
    "Atomic Milestones" : {
        content:[
            ["display-text",
            function() {return `<h2 style=color:#FFD700;><b>This is for testing purposes.<br>Nothing yet to see here :)</b>`},],
            ["upgrade", "11", "12"],
        ],
        
    }},

    update(diff) {
        if (hasUpgrade("cr", "11")) player.cr.points = player.cr.points.add(tmp.cr.generationQuantity.times(diff));
        if (hasUpgrade("cr", "11")) player.cr.total = player.cr.total.add(tmp.cr.generationQuantity.times(diff));
    },
    effect(){
        let effect = 1
        
        return effect
    },
    layerShown(){
        let show = false
        if (hasUpgrade("cr", "14")) show = true
        return show
    },
    generationQuantity(){
        let generation = new Decimal(0)
        return generation
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        {key: "a", description: "a: Reset for creator points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    doReset(resettingLayer) {
        let keep = [];
        if (resettingLayer) keep.push("upgrades")
        if (resttingLayer) layerDataReset("h", keep)
    },
    infoboxes: {
        lore1: {
            title: "Lore",
            unlocked(){
                return hasUpgrade("cr", "14")
             },
            body() { return `In the beginning, all was simple - there were 4 elements: Earth,
            Fire, Water, and Air. All was in peace and harmony... until the fire nation attacked.
            Anyways, in the beginning, there was creation. I do
            not care what you believe in, or what religion you are, but all of
            them have a starting point of the world being created. In this case,
            The Big Bang will be what we will refer to since most people accept
            that as a possible source of creation. The Big Bang was said to have happened around
             13.8 billion years ago. Good Luck! Have fun with the time walls!`},
       },
    },
    upgrades: {
        11: {
            title: "Placeholder",
            description: "Generate atomic power.",
            cost: new Decimal(0),
        },
        
    },

})

addLayer("h", {
    name: "hydrogen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() { // This appears on the layer's node. Default is the id with the first letter capitalized
        return `
        <p>H
        <p class='cBreak' style='font-size:16px'>1 | 1.007</p>
        </p>`
      },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
	    points: new Decimal(0),
        total: new Decimal(0),
	    best: new Decimal(0),
    }},
    color: "white", //#ADD8E6
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "hydrogen", // Name of prestige currency
    baseResource: "atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses. Edit by King_B3H: Can reduce the cost or increase cost
        let mult = new Decimal(1);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses Edit by King_B3H: Can reduce the cost or increase cost.
        let exp = new Decimal(1)
        return exp;
    },
    directMult(){ //Directly multiplies the resource gain of that layer
        let multiplier = new Decimal(1);
        if(hasUpgrade('h', 21)) multiplier = multiplier.times(upgradeEffect('h', 21))
        if(hasUpgrade('he', 11)) multiplier = multiplier.times(3);
        if(hasUpgrade('he', 22)) multiplier = multiplier.times(upgradeEffect('he', 22))
        if(hasUpgrade('l', 11)) multiplier = multiplier.times(upgradeEffect('l', 11));
        return multiplier
    },
    hotkeys: [
        {key: "h", description: "H: Reset for hydrogen atoms", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
        let show = false
        if (hasUpgrade("cr", "14")) show = true
        return show
    },
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("he", 0) && resettingLayer=="he") keep.push("upgrades")
        if (hasMilestone("l", 0) && resettingLayer=="l") keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("h", keep)

        if (layers[resettingLayer].row > this.row) player.points = new Decimal(10)
    },

    tabFormat: ["main-display",
    "prestige-button",
    "blank",
    ["display-text",
    function() {return `Your best hydrogen is ` + format(player.h.best)+ `.`},],
    ["display-text",
    function() {return `<p style='font-size:8px;padding:3px;'><b>(Based on best hydrogen before buying upgrade).<b><p>`},],
    ["display-text",
    function() {return `Your total hydrogen is ` + format(player.h.total)+ `.`},],
    "blank",
    "upgrades",
    "blank",
    "blank",
    ["infobox", "lore2"],
    ],
    infoboxes: {
        lore2: {
            title: "Lore",
            body() { return `Ah! Now that you have broken the timewall, you unlocked hydrogen
            which is the first element in your marvelous elemental journey!
            Hydrogen is a very important element. It is one of the elements that
            creates water along with oxygen! Therefore, you must accumulate as much hydrogen as
             you can to go on to the next layer! Good luck!`},
       },
    },
    upgrades: {
        11:{
            title: "Atom Generator",
            description: "Allows you to start generating atoms!",
            cost: new Decimal(1)
           
        },
        12: {
            title: "Stronger Hydrogen I",
            description: "Doubles your atom gain.",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade("h", 11) },
        },
        13: {
            title: "Synergetic Hydrogen",
            description: "Total hydrogen boosts atom gain.",
            cost: new Decimal(10),
            effect() {
              let effect = new Decimal(1)
              if(hasUpgrade("h", 13)) effect = effect.add(player.h.total.log(10).pow(0.15))
                if (hasUpgrade('h', 31)) effect = effect.pow(1.75)
                if (hasUpgrade('he', 12)) effect = effect.times(1.4)
                return effect;
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x' },
            unlocked() { return hasUpgrade("h", 12) },
        },
        21: {
            title: "More Hydrogen",
            description: "Atoms boost hydrogen",
            cost: new Decimal(25),
            effect() {
                let effect = new Decimal(1).add(player.points.add(1).log10().pow(0.5).div(5))
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x' },
            unlocked() { return hasUpgrade("h", 13) },
        },
        22: {
            title: "Stronger Hydrogen II",
            description: "Doubles atom gain again.",
            cost: new Decimal(100),
            unlocked() { return hasUpgrade("h", 21) },
        },
        23: {
            title: "Atomical I",
            description: "Atoms boost atom gain",
            cost: new Decimal(500),
            effect() {
                let effect = player.points.log(10).pow(0.2)
                if(player.points.lt(1)){
                    effect = new Decimal(1)
                }
                return effect
            },
            gainMult(){
                let mult = new Decimal(1)
                if(hasUpgrade('h', 23)) mult = mult.times(upgradeEffect('h', 23))
                return mult
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x' },
            unlocked() { return hasUpgrade("h", 21) },
        },
        31: {
          title: "Even more synergy!!",
            description: 'The effect of <b>Synergetic Hydrogen</b> is raised to the 1.75',
            cost: new Decimal(1000),
            unlocked() {return hasAchievement('a', 15) && hasUpgrade("h", 23)}
        },
        32: {
            title: "Helium Boost!!",
              description: 'Helium base is boosted by your best hydrogen',
              effect(){
                return player.h.best.log(10).div(100)
              },
              cost: new Decimal(25000),
              effectDisplay() {return '+' + format(upgradeEffect('h', 32))},
              unlocked() {return hasAchievement('a', 15) && hasUpgrade("h", 23)}
          },
    },
})
addLayer("he", {
    name: "helium",
    symbol() {
    return `
    <p>HE
    <p class='cBreak' style='font-size:16px'>2 | 4.002</p>
    </p>`
  },

    row: 4,
    position: 0,
startData() {return{
    unlocked: false,
    points: new Decimal(0),
    total:new Decimal(0),
    best: new Decimal(0),
    effectBest: new Decimal(1)
}},

    color: "#0BE0CE",
    requires(){
        let exponent = player.he.points.times(2).add(2.00)
        if(player.he.points.gte(10)) exponent = player.he.points.times(0.01).add(1.80)
        return !player.he.points.gte(10) ? new Decimal(600).times(exponent) : new Decimal(500).pow(exponent)
        },
    resource: "helium",
    baseResource: "atoms",
    baseAmount() {return player.points},
    type: "static",
	branches:["h"],
    exponent: 1,
    effect(){
        let base = new Decimal(2)
        if(hasUpgrade('cr',22)) base = (base.add(upgradeEffect("cr", 22)))
        if(hasUpgrade('h', 32)) base = base.add(upgradeEffect('h', 32))
	    if(hasUpgrade('he', 21)) base = base.pow(1.1);
        let effect = base.pow(player.he.points)
        if(effect.gt(player.he.effectBest)) player.he.effectBest = effect
        if(hasMilestone('he', 3) && effect.lt(player.he.effectBest)) effect = player.he.effectBest
        return effect
    },
    effectDescription() { return "Helium gives a " + format(tmp.he.effect) + "x bonus towards atoms"},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    canBuyMax() { return hasMilestone("he", 4) },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    hotkeys: [
        {key: "H", description: "Shift+H: Reset for helium atoms", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
        let show = false
        if(player.h.unlocked) show = true
        return show
    },
    milestones: {
			0: {
				requirementDescription: "10 Helium",
				done() { return player.he.best.gte(10)},
				effectDescription: "Keep Hydrogen stats on reset.",
			},
			1: {
				requirementDescription: "12 Helium",
				done() { return player.he.best.gte(12)},
				effectDescription: "Unlock more helium upgrades",
			},
            2: {
                requirementDescription: "20 Helium",
                done() {return player.he.best.gte(20)},
                effectDescription: "Best helium bonus is kept on higher resets"
            }
		},
    upgrades: {
        11:{
            title: "Balloon Power",
            description: "Helium triples hydrogen gain!",
            cost: new Decimal(1)
           
        },
        12:{
            title: "Helium Bonds",
            description: 'Helium boosts the effects of the <b>Synergetic Hydrogen</b> upgrade!',
            cost: new Decimal(2),
            unlocked() { return hasUpgrade("he", 11) },
        },
        13:{
            title: "Synergetic Helium",
            description: "Helium boosts creation point generation. CR Generation * (Effect*2) ",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade("he", 12) },
        },
        21:{
            title: "Helium Bonus I",
            description: "Increases helium bonus",
            cost: new Decimal(8),
            unlocked() { return hasUpgrade("he", 12) },
        },
        22:{
            title:"More bonuses",
            description: 'Helium bonus effects hydrogen gain by its square root.',
            cost: new Decimal(12),
            unlocked(){return hasAchievement('a', 15) && hasUpgrade("h", 23)},
            effect(){
                return tmp.he.effect.pow(0.5)
            }   
        }
    }
})
addLayer("l", {
    name: "lithium",
    symbol() {
        return `
        <p>L
        <p class='cBreak' style='font-size:16px'>3 | 6.941</p>
        </p>`
      },

    row: 5,
    position: 1,
    startData() {return{
        unlocked: false,
        points: new Decimal(0),
        total:new Decimal(0),
        best: new Decimal(0),
        charge: new Decimal(0),
        unlockOrder: ["h", "he"],
    }},

    color: "green",
    requires(){
        let exponent = player.l.points.times(0.05).add(1.1)
        let cost = new Decimal(1000000000)
        if(player.l.unlocked) cost = new Decimal(1000000000).pow(exponent)
        return cost
        },
    resource: "lithium",
    baseResource: "atoms",
    baseAmount() {return player.points},
    type: "static",
    branches: ["h", "he"],
    exponent: 1,
    update(diff) {
        if (player.l.unlocked) player.l.charge = player.l.charge.add(tmp.l.effect.times(diff));
    },
    effect(){
        let effect = new Decimal(1)
        if(player.l.unlocked) effect = new Decimal(1).times(player.l.points)
        if(hasUpgrade("cr", 22)) effect = effect.add(upgradeEffect("cr", 22).times(player.l.points))
        if(hasUpgrade("l", 12)) effect = effect.add(upgradeEffect("l", 12).times(player.l.points))
        return effect
    },
    chargeExp() {
        let exp = new Decimal(1/3)
        if(hasUpgrade('l', 21)) exp = new Decimal(0.45)
        return exp
    },
    chargeEff() {
        if (!player.l.unlocked) return new Decimal(1);
        return new Decimal(player.l.charge).root(2.5).add(1).pow(this.chargeExp());
    },
    effectDescription() { return " which generates " + format(tmp.l.effect) + " charge a second"},

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    tabFormat: ["main-display",
    "prestige-button",
    "blank",
    ["display-text",
        function() {return 'You have ' + format(player.l.charge) + ' Lithium Charge which boosts atoms by ' + format(tmp.l.chargeEff) + 'x.'},
            {}],
    "blank",
    ["display-text",
    function() {return 'Your best lithium is ' + player.l.best + '<br> You have made a total of ' + player.l.total + ' lithium'},
    {}]
    ,
    "milestones", "blank", "blank", "upgrades"],
    layerShown(){
        let show = false
        let status = false
        if(player.he.upgrades.length>=1) status = true
        if(player.he.unlocked) show = true
        return show
    },
    doReset(resettingLayer){
        player.l.charge = new Decimal(0)
    },
    hotkeys: [
        {key: "l", description: "l: Reset for lithium atoms", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    canBuyMax() { return hasMilestone("l", 1) },
    milestones: {
        0: {
            requirementDescription: "8 Lithium",
            done() { return player.l.best.gte(8)},
            effectDescription: "Keep Hydrogen Upgrades on reset.",
        },
        1: {
            requirementDescription: "15 Lithium",
            done() { return player.l.best.gte(15)},
            effectDescription: "You can buy max Helium.",
        },
    },
    upgrades:{
        11: {
            title: "Charged Up",
            description: "Total Hydrogen gain boosts hydrogen gain",
            cost: new Decimal(1),
            effect(){
                let effect = player.h.best.log(7).div(8).add(1)
                if(player.h.points.lte(1)) effect = 1
                return effect
            },

            effectDisplay() { return 'x'+ format(upgradeEffect(this.layer, this.id)) },
        },
        12: {
            title: "Power",
            description: "Best lithium adds to the base charge gain.",
            cost: new Decimal(3),
            effect() {
                let effect = player.l.best.pow(0.3).sub(1)
                return effect
            },
            effectDisplay() { return '+'+ format(upgradeEffect(this.layer, this.id)) },

            },
        13:{
            title: "Chez",
            description: "idk",
            cost: new Decimal(7),

            unlocked(){return hasUpgrade("l", 12)}
        },
        21: {
            title: "Better boost",
            description: "The formula for the charge atom gain is better. (x+1)^1/3 --> (x+1)^0.45",
            cost: new Decimal(10),

            unlocked(){return hasUpgrade("l", 13)}
        },
        22: {
            title: "Even more benefits!",
            description: "Charge boosts hydrogen gain",
            cost: new Decimal(25),

            unlocked(){return hasMilestone("l", 11)}
        },
        23: {
            title: "We love global freezing!",
            description: "freeze the entire earth for the cheap price of your sanity",
            cost: new Decimal(9999999),

            unlocked(){return player.l.points.gt(50)}
        },
        31: {
            title: "",
            description: "Helium boosts Lithium gain"
        }
        },
    })

addLayer("be", {
    name: "berryllium",
    symbol() {
    return `
    <p>BE
    <p class='cBreak' style='font-size:16px'>4 | 9.012</p>
    </p><style>
    #be{
        background-image :linear-gradient(to top left, rgb(80, 80, 110), rgb(223, 168, 177), rgb(80, 80, 110));
        border-radius:3px;
    }</style>`
  },

    row: 6,
    position: 0,
startData() {return{
    unlocked: false,
    points: new Decimal(0),
    total:new Decimal(0),
    best: new Decimal(0),
}},

    color: "blue",
    requires(){
        let exponent = player.be.points.times(2).add(2.00).times(0)
        if(player.be.points.gte(8)) exponent = player.be.points.times(0.01).add(1.85)
        return !player.be.points.gte(8) ? new Decimal(600).times(exponent) : new Decimal(500).pow(exponent)
        },
    resource: "beryllium",
    baseResource: "atoms",
    baseAmount() {return player.points},
    type: "static",
	branches:["l"],
    exponent: 1,
    effect(){
        let effect = new Decimal(1)
        return effect
    },
    effectDescription() { return "Berrylium gives a " + format(tmp.he.effect) + "x bonus towards atoms"},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    canBuyMax() { return hasMilestone("be", 1) },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    hotkeys: [
        {key: "B", description: "Shift+B: Reset for berrylium atoms", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
        let show = false
        if(player.l.unlocked) show = true
        return show
    },
    
    milestones: {
        0: {
            requirementDescription: "1 Beryllium",
            done() { return player.be.best.gte(1)},
            effectDescription: "Placeholder.",
        },
    },
})