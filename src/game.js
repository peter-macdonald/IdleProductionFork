const Map = require("./map")
const IronMine = require("./ironMine")
const Market = require("./market")
const IronSmelter = require("./ironSmelter")

class Game {

    constructor (el, iro, num, build, info, sell, iroing) {
        this.map = new Map(el, iro, num, build, info)
        this.el = el
        this.iro = iro
        this.build = build
        this.sell = sell 
        this.iroing = iroing
        this.toggle = false
        this.handleClickGrid = this.handleClickGrid.bind(this)
        this.handleClickBuild = this.handleClickBuild.bind(this)
        this.handleClickSell = this.handleClickSell.bind(this)
        this.bindEvents(); 
        this.tick()
        this.updateTotalMoney(num, this.map.iro)

    }

    bindEvents() {
        this.el.addEventListener("click", this.handleClickGrid)
        this.build.addEventListener("click", this.handleClickBuild)
        this.sell.addEventListener("click", this.handleClickSell)
    }

    handleClickGrid(e) {
        const ele = e.target; 
        that = this
        
        console.log(ele.tagName.toLowerCase() === 'li');
        if (ele.tagName.toLowerCase() === 'li'&& this.map.selectedBuilding) {
            // we have a pos and a name of building. building name is a string. 
            let pos = JSON.parse(ele.dataset.pos)
            // this.updateParentsAndChildren()
            // console.log(JSON.parse(ele.dataset.pos))
            // console.log(JSON.parse(this.map.selectedBuilding))
            if (JSON.parse(this.map.selectedBuilding) === "IronMine") {
                this.map.placeBuilding(pos, new IronMine(pos))
                // this.updateParentsAndChildren()
                console.log(this.map.getBuilding(pos))
                console.log(this.map.allBuildings)

            } else if (JSON.parse(this.map.selectedBuilding) === "IronSmelter") {
                this.map.placeBuilding(pos, new IronSmelter(pos))
                // this.updateParentsAndChildren()
                console.log(this.map.getBuilding(pos))
                console.log(this.map.allBuildings)

            } else if (JSON.parse(this.map.selectedBuilding) === "SteelMill") {
                
            } else if (JSON.parse(this.map.selectedBuilding) === "CopperOreMine") {
                
            } else if (JSON.parse(this.map.selectedBuilding) === "CopperSmelter") {
                
            } else if (JSON.parse(this.map.selectedBuilding) === "CopperExtruder") {
                
            } else if (JSON.parse(this.map.selectedBuilding) === "ToolFactory") {
                
            } else if (JSON.parse(this.map.selectedBuilding) === "Market") {
                this.map.placeBuilding(pos, new Market(pos, [], []))
                console.log(that.map.getBuilding(pos))
                console.log(that.map.allBuildings)
            }
            
        }
    }

    handleClickBuild(e) {
        const ele = e.target;

        if (ele.tagName.toLowerCase() === 'li') {
            this.map.selectedBuilding = ele.dataset.build
            console.log(this.map.selectedBuilding)
        }
    }

    handleClickSell(e) {
        const ele = e.target;
        console.log(ele.tagName)

        if (ele.tagName.toLowerCase() === "button") {
            this.toggle = true
        }
    }

    tick () {
        setInterval(() => {
            this.updateTotalMoney(this.map.num, this.map.iro)
            this.map.setupBoard()
            // console.log(Object.values(this.map.allBuildings))
            Object.values(this.map.allBuildings).flat().forEach((ele) => ele.updateRSS())
            this.map.updateRSS()
            this.transferToMarket()
            // console.log(this.map.allRSS["ironOre"])
            // console.log(this.map.allRSS)
            //call production
            //call transport
            // totals up resources
            this.map.money = this.map.money += 1
        }, 1000)
    }

    updateTotalMoney (mon) {
        mon.innerHTML = this.map.money
        if (!this.map.allRSS["ironOre"]) {
            this.map.iro.innerHTML = 0
        } else {
            this.map.iro.innerHTML = this.map.allRSS["ironOre"]
        }

        !this.map.allRSS["ironIngots"] ? this.iroing.innerHTML = 0 : this.iroing.innerHTML = this.map.allRSS["ironIngots"]
    }

    transferToMarket () {
        if (this.toggle) {
            Object.values(this.map.allBuildings).flat().forEach ((building) => {
                let rssArr = Object.entries(building.resources);
                console.log(rssArr, "rssArr");
                rssArr.forEach((sub) => {
                    if (sub[0] === "ironOre") {
                        building.resources["ironOre"] = 0;
                        this.map.money += sub[1];
                    }
                });
                // iterate through building rss, and subtract from total in building. 
                // calculate distance from the market. 
            });
        }
        this.toggle = false
    }

    transferToChildren() {
        // iterate through buildings. check parents (later in order of proximity) and subtract resources until requirements met. 
        let bldgArr = Object.values(this.map.allBuildings).flat()
        bldgArr.forEach(outerBuilding => {
            let parA = this.map.allBuildings[outerBuilding.parent]
            for (let i = 0; i < parA.length; i++) {
                


            }
        })  
    }
}

module.exports = Game;