/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Map = __webpack_require__(/*! ./map */ "./src/map.js");

var IronMine = __webpack_require__(/*! ./ironMine */ "./src/ironMine.js");

var Market = __webpack_require__(/*! ./market */ "./src/market.js");

var IronSmelter = __webpack_require__(/*! ./ironSmelter */ "./src/ironSmelter.js");

var SteelMill = __webpack_require__(/*! ./steelMill */ "./src/steelMill.js");

var Game = /*#__PURE__*/function () {
  function Game(el, iro, num, build, info, sell, iroing, steing) {
    _classCallCheck(this, Game);

    this.map = new Map(el, iro, num, build, info);
    this.el = el;
    this.iro = iro;
    this.build = build;
    this.sell = sell;
    this.iroing = iroing;
    this.steing = steing;
    this.toggle = false;
    this.handleClickGrid = this.handleClickGrid.bind(this);
    this.handleClickBuild = this.handleClickBuild.bind(this);
    this.handleClickSell = this.handleClickSell.bind(this);
    this.bindEvents();
    this.tick();
    this.updateTotalMoney(num, this.map.iro);
  }

  _createClass(Game, [{
    key: "bindEvents",
    value: function bindEvents() {
      this.el.addEventListener("click", this.handleClickGrid);
      this.build.addEventListener("click", this.handleClickBuild);
      this.sell.addEventListener("click", this.handleClickSell);
    }
  }, {
    key: "handleClickGrid",
    value: function handleClickGrid(e) {
      var ele = e.target;
      that = this;
      console.log(ele);
      console.log(ele.tagName.toLowerCase() === 'li');

      if (ele.tagName.toLowerCase() === 'li' && this.map.selectedBuilding) {
        // we have a pos and a name of building. building name is a string. 
        var pos = JSON.parse(ele.dataset.pos); // this.updateParentsAndChildren()
        // console.log(JSON.parse(ele.dataset.pos))
        // console.log(JSON.parse(this.map.selectedBuilding))

        if (JSON.parse(this.map.selectedBuilding) === "IronMine") {
          this.map.placeBuilding(pos, new IronMine(pos)); // this.updateParentsAndChildren()

          console.log(this.map.getBuilding(pos));
          console.log(this.map.allBuildings);
        } else if (JSON.parse(this.map.selectedBuilding) === "IronSmelter") {
          this.map.placeBuilding(pos, new IronSmelter(pos)); // this.updateParentsAndChildren()

          console.log(this.map.getBuilding(pos));
          console.log(this.map.allBuildings);
        } else if (JSON.parse(this.map.selectedBuilding) === "SteelMill") {
          this.map.placeBuilding(pos, new SteelMill(pos));
        } else if (JSON.parse(this.map.selectedBuilding) === "CopperOreMine") {} else if (JSON.parse(this.map.selectedBuilding) === "CopperSmelter") {} else if (JSON.parse(this.map.selectedBuilding) === "CopperExtruder") {} else if (JSON.parse(this.map.selectedBuilding) === "ToolFactory") {} else if (JSON.parse(this.map.selectedBuilding) === "Market") {
          this.map.placeBuilding(pos, new Market(pos));
          console.log(that.map.getBuilding(pos));
          console.log(that.map.allBuildings);
        }
      }
    }
  }, {
    key: "handleClickBuild",
    value: function handleClickBuild(e) {
      var ele = e.target;
      console.log(e.target.parentNode);

      if (ele.tagName.toLowerCase() === 'img') {
        this.map.selectedBuilding = ele.parentNode.dataset.build;
        console.log(this.map.selectedBuilding);
      }
    }
  }, {
    key: "handleClickSell",
    value: function handleClickSell(e) {
      var ele = e.target;
      console.log(ele.tagName);

      if (ele.tagName.toLowerCase() === "button") {
        this.toggle = true;
      }
    }
  }, {
    key: "tick",
    value: function tick() {
      var _this = this;

      setInterval(function () {
        _this.updateTotalMoney(_this.map.num, _this.map.iro);

        _this.map.setupBoard(); // console.log(Object.values(this.map.allBuildings))


        Object.values(_this.map.allBuildings).flat().forEach(function (ele) {
          return ele.updateRSS();
        });

        _this.map.updateRSS();

        _this.transferToMarket();

        _this.transferToChildren(); // console.log(this.map.allRSS["ironOre"])


        console.log(_this.map.allRSS); //call production
        //call transport
        // totals up resources

        _this.map.money = _this.map.money += 1;
      }, 1000);
    }
  }, {
    key: "updateTotalMoney",
    value: function updateTotalMoney(mon) {
      mon.innerHTML = this.map.money;

      if (!this.map.allRSS["ironOre"]) {
        this.map.iro.innerHTML = 0;
      } else {
        this.map.iro.innerHTML = this.map.allRSS["ironOre"];
      }

      !this.map.allRSS["ironIngots"] ? this.iroing.innerHTML = 0 : this.iroing.innerHTML = this.map.allRSS["ironIngots"];
      !this.map.allRSS["steelIngots"] ? this.steing.innerHTML = 0 : this.steing.innerHTML = this.map.allRSS["steelIngots"];
    }
  }, {
    key: "transferToMarket",
    value: function transferToMarket() {
      var _this2 = this;

      if (this.toggle) {
        Object.values(this.map.allBuildings).flat().forEach(function (building) {
          var rssArr = Object.entries(building.resources);
          console.log(rssArr, "rssArr");
          rssArr.forEach(function (sub) {
            if (sub[0] === "ironOre") {
              building.resources["ironOre"] = 0;
              _this2.map.money += sub[1];
            } else if (sub[0] === "ironIngots") {
              building.resources["ironIngots"] = 0;
              _this2.map.money += sub[1] * 6;
            } else if (sub[0] === "steelIngots") {
              building.resources["steelIngots"] = 0;
              _this2.map.money += sub[1] * 70;
            }
          }); // iterate through building rss, and subtract from total in building. 
          // calculate distance from the market. 
        });
      }

      this.toggle = false;
    }
  }, {
    key: "transferToChildren",
    value: function transferToChildren() {
      var _this3 = this;

      // iterate through buildings(buildArr). check parents (parA) (later in order of proximity) and subtract resources until requirements met. 
      var bldgArr = Object.values(this.map.allBuildings).flat();
      bldgArr.forEach(function (building) {
        var parA = _this3.map.allBuildings[building.parentName]; // console.log(parA, building)

        if (!parA) {
          return;
        }

        for (var i = 0; i < parA.length; i++) {
          var requestTotal = Object.entries(building.requestTotal).flat();
          var requestRSS = requestTotal[0];

          if (!building.resources[requestRSS]) {
            building.resources[requestRSS] = 0;
          }

          var requestAmount = requestTotal[1] - building.resources[requestRSS]; // console.log(requestTotal[1], requestTotal[0] , "requestChecker ")
          // debugger

          if (!parA[i].resources[requestRSS]) {// console.log("check1")
          } else if (parA[i].resources[requestRSS] < requestAmount) {
            // console.log("check2")
            building.resources[requestRSS] += parA[i].resources[requestRSS];
            parA[i].resources[requestRSS] = 0;
          } else if (parA[i].resources[requestRSS] > requestAmount) {
            building.resources[requestRSS] += requestAmount;
            parA[i].resources[requestRSS] -= requestAmount;
          }
        }
      });
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),

/***/ "./src/ironMine.js":
/*!*************************!*\
  !*** ./src/ironMine.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Node = __webpack_require__(/*! ./node */ "./src/node.js");

var IronMine = /*#__PURE__*/function (_Node) {
  _inherits(IronMine, _Node);

  var _super = _createSuper(IronMine);

  function IronMine(pos) {
    var _this;

    _classCallCheck(this, IronMine);

    _this = _super.call(this, pos);
    _this.nodepos = pos;
    _this.name = "IronMine";
    _this.cost = 200;
    _this.description = "an Iron mine can be placed anywhere, it will continually make 1 Iron Ore per second";
    _this.childName = "IronSmelter";
    _this.receivable = [];
    return _this;
  }

  _createClass(IronMine, [{
    key: "updateRSS",
    value: function updateRSS() {
      var _this$resources, _ironOre;

      (_this$resources = this.resources)[_ironOre = "ironOre"] || (_this$resources[_ironOre] = this.resources["ironOre"] = 0);
      this.resources["ironOre"]++;
      console.log(this.resources["ironOre"], "working in the mine"); // console.log(this.map)
    }
  }]);

  return IronMine;
}(Node);

module.exports = IronMine;

/***/ }),

/***/ "./src/ironSmelter.js":
/*!****************************!*\
  !*** ./src/ironSmelter.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Node = __webpack_require__(/*! ./node */ "./src/node.js");

var IronSmelter = /*#__PURE__*/function (_Node) {
  _inherits(IronSmelter, _Node);

  var _super = _createSuper(IronSmelter);

  function IronSmelter(pos) {
    var _this;

    _classCallCheck(this, IronSmelter);

    _this = _super.call(this, pos);
    _this.nodepos = pos;
    _this.name = "IronSmelter";
    _this.cost = 500;
    _this.description = "Iron Smelter will take Iron Ore at 5 iron Ore per second, and convert it to Iron Ingots";
    _this.parentName = "IronMine";
    _this.childName = "SteelMill";
    _this.receivable = ["ironOre"];
    _this.requestTotal = {
      ironOre: 5
    };
    return _this;
  }

  _createClass(IronSmelter, [{
    key: "updateRSS",
    value: function updateRSS() {
      var _this$resources, _ironIngots;

      console.log(this.resources, "inside RSS update Iron Smelter");
      (_this$resources = this.resources)[_ironIngots = "ironIngots"] || (_this$resources[_ironIngots] = this.resources["ironIngots"] = 0);

      if (this.resources["ironOre"] >= 5) {
        this.resources["ironOre"] -= 5;
        this.resources["ironIngots"] += 1;
      } // console.log(this.resources["ironOre"])
      // console.log(this.map)

    }
  }]);

  return IronSmelter;
}(Node);

module.exports = IronSmelter;

/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Map = /*#__PURE__*/function () {
  function Map(el, iro, num, build, info) {
    _classCallCheck(this, Map);

    this.money = 15000;
    this.num = num;
    this.el = el;
    this.iro = iro;
    this.build = build;
    this.info = info;
    this.selectedBuilding = null;
    this.allBuildings = {};
    this.possibleBuildings = ["IronMine", "IronSmelter", "SteelMill", "CopperOreMine", "CopperSmelter", "CopperExtruder", "ToolFactory", "Market"];
    this.imgPaths = {
      "IronMine": "src/assets/ironMine2.png",
      "IronSmelter": "src/assets/ironIngot2.png",
      "SteelMill": "src/assets/Smelter.png",
      "CopperOreMine": "",
      "CopperSmelter": "",
      "CopperExtruder": "",
      "ToolFactory": "",
      "Market": ""
    };
    this.allRSS = {};
    this.grid = this.setupGrid();
    this.setupBoard(); // this.setupRSS()

    this.setupBuild();
  }

  _createClass(Map, [{
    key: "setupGrid",
    value: function setupGrid() {
      // initial buildings with resources next
      var grid = [];

      for (var i = 0; i < 10; i++) {
        grid.push([]);

        for (var j = 0; j < 10; j++) {
          grid[i].push(null);
        }
      }

      for (var _i = 0; _i < this.possibleBuildings.length; _i++) {
        this.allBuildings[this.possibleBuildings[_i]] = [];
      }

      console.log(this.allBuildings);
      return grid;
    } // startingMarket () {
    //     this.placeBuilding([5,5], new Market([5,5], this))
    // }
    // put in a building checker. 

  }, {
    key: "setupBoard",
    value: function setupBoard() {
      testBox = document.querySelector(".grid-boxes");

      if (testBox) {
        testBox.remove();
      }

      var ul = document.createElement('ul');
      ul.classList.add('grid-boxes');

      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
          var li = document.createElement('li');
          li.dataset.pos = JSON.stringify([i, j]);
          li.dataset.building = JSON.stringify(this.grid[i][j]);

          if (this.getBuilding([i, j])) {
            var img = new Image();
            img.src = this.imgPaths[this.getBuilding([i, j]).name];
            li.append(img); // console.log([i,j], this.imgPaths[this.getBuilding([i,j]).name] , "see meeeeee")
          } // console.log(li.dataset.building)


          ul.append(li);
        }
      }

      this.el.append(ul);
    }
  }, {
    key: "setupBuild",
    value: function setupBuild() {
      // console.log(this.build);
      var ul = document.createElement('ul');

      for (var i = 0; i < this.possibleBuildings.length; i++) {
        var li = document.createElement('li');
        li.dataset.build = JSON.stringify(this.possibleBuildings[i]);
        var img = new Image();
        img.src = Object.values(this.imgPaths)[i];
        li.append(img);
        ul.append(li);
      }

      this.build.append(ul);
    }
  }, {
    key: "updateRSS",
    value: function updateRSS() {
      // console.log(this.allBuildings.length > 0)
      this.allRSS = {}; // console.log(Object.values(this.allBuildings))

      if (Object.values(this.allBuildings).flat().length > 0) {
        for (var i = 0; i < Object.values(this.allBuildings).flat().length; i++) {
          var obRSS = Object.entries(Object.values(this.allBuildings).flat()[i].resources);
          console.log(obRSS, "obRSS");
          if (obRSS) for (var k = 0; k < obRSS.length; k++) {
            if (!this.allRSS[obRSS[k][0]]) this.allRSS[obRSS[k][0]] = 0;
            this.allRSS[obRSS[k][0]] += parseInt(obRSS[k][1]);
          }
        }
      }
    }
  }, {
    key: "placeBuilding",
    value: function placeBuilding(pos, type) {
      // take in the type of building. Create the building and place it on the map.
      if (!this.isEmptyPos(pos)) {
        throw new BuildError('Not an empty spot!');
      } else if (this.money < type.cost) {
        throw new BuildError('Not Enough Money!');
      } else {
        this.grid[pos[0]][pos[1]] = type;
        this.allBuildings[type.name].push(type);
        this.money -= type.cost;
      }
    }
  }, {
    key: "getBuilding",
    value: function getBuilding(pos) {
      return this.grid[pos[0]][pos[1]];
    }
  }, {
    key: "isEmptyPos",
    value: function isEmptyPos(pos) {
      if (!this.isValidPos(pos)) {
        throw new BuildError('Is not a valid spot!');
      }

      return this.grid[pos[0]][pos[1]] === null;
    }
  }, {
    key: "isValidPos",
    value: function isValidPos(pos) {
      return 0 <= pos[0] && pos[0] < 10 && 0 <= pos[1] && pos[1] < 10;
    }
  }]);

  return Map;
}();

var BuildError = function BuildError(msg) {
  this.meg = msg;
};

module.exports = BuildError;
module.exports = Map;

/***/ }),

/***/ "./src/market.js":
/*!***********************!*\
  !*** ./src/market.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Node = __webpack_require__(/*! ./node */ "./src/node.js");

var Market = /*#__PURE__*/function (_Node) {
  _inherits(Market, _Node);

  var _super = _createSuper(Market);

  function Market(pos) {
    var _this;

    _classCallCheck(this, Market);

    _this = _super.call(this, pos);
    _this.nodepos = pos; // this.map = super.map

    _this.name = "Market";
    _this.cost = 500;
    _this.description = "The market is where goods go to be sold."; // this.map = this.updateRSS.bind(this)

    return _this;
  }

  _createClass(Market, [{
    key: "updateRSS",
    value: function updateRSS() {// console.log(this)
      // this.money += 100
    }
  }]);

  return Market;
}(Node);

module.exports = Market;

/***/ }),

/***/ "./src/node.js":
/*!*********************!*\
  !*** ./src/node.js ***!
  \*********************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Node = /*#__PURE__*/function () {
  function Node(pos) {
    _classCallCheck(this, Node);

    // this.pos = pos
    // save a list of distances from parents and children?
    // description
    this.resources = {}; // this.map = map
    // this.tuna = "tuna"
  }

  _createClass(Node, [{
    key: "pos",
    get: function get() {
      return this.pos;
    }
  }]);

  return Node;
}();

module.exports = Node;

/***/ }),

/***/ "./src/steelMill.js":
/*!**************************!*\
  !*** ./src/steelMill.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Node = __webpack_require__(/*! ./node */ "./src/node.js");

var SteelMill = /*#__PURE__*/function (_Node) {
  _inherits(SteelMill, _Node);

  var _super = _createSuper(SteelMill);

  function SteelMill(pos) {
    var _this;

    _classCallCheck(this, SteelMill);

    _this = _super.call(this, pos);
    _this.nodepos = pos;
    _this.name = "SteelMill";
    _this.cost = 1000;
    _this.description = "A Steel Mill will turn your Iron Ingots into valuable Steel!";
    _this.parentName = "IronSmelter";
    _this.childName = "ToolFactory";
    _this.receivable = ["ironIngots"];
    _this.requestTotal = {
      ironIngots: 10
    };
    return _this;
  }

  _createClass(SteelMill, [{
    key: "updateRSS",
    value: function updateRSS() {
      var _this$resources, _steelIngots;

      console.log(this.resources, "I am inside the steel mill");
      (_this$resources = this.resources)[_steelIngots = "steelIngots"] || (_this$resources[_steelIngots] = this.resources["steelIngots"] = 0);

      if (this.resources["ironIngots"] >= 10) {
        this.resources["ironIngots"] -= 10;
        this.resources["steelIngots"] += 1;
      }
    }
  }]);

  return SteelMill;
}(Node);

module.exports = SteelMill;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Box sizing rules */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* Remove default margin */\nbody,\nh1,\nh2,\nh3,\nh4,\np,\nfigure,\nblockquote,\ndl,\ndd {\n  margin: 0;\n}\n\n/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */\nul,\nol {\n  list-style: none;\n}\n\n/* Set core body defaults */\nbody {\n  min-height: 100vh;\n  text-rendering: optimizeSpeed;\n  line-height: 1.5;\n}\n\n/* A elements that don't have a class get default styles */\na:not([class]) {\n  text-decoration-skip-ink: auto;\n}\n\n/* Make images easier to work with */\nimg,\npicture {\n  max-width: 100%;\n  display: block;\n}\n\n/* Inherit fonts for inputs and buttons */\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n\n/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */\n@media (prefers-reduced-motion: reduce) {\n  html:focus-within {\n    scroll-behavior: auto;\n  }\n  *,\n*::before,\n*::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}\n.main-nav {\n  display: flex;\n  justify-content: space-between;\n  margin: 0 auto;\n}\n\n.main-nav > ul {\n  display: flex;\n  flex-direction: row;\n  justify-content: end;\n  align-items: flex-end;\n}\n\n.div-box {\n  width: 268px;\n}\n\n.main-nav li {\n  margin: 10px;\n}\n\n.main-nav h2 {\n  margin: 20px;\n}\n\n.resources-bar {\n  display: flex;\n  justify-content: space-between;\n  margin: 0 auto;\n}\n\n.resources-bar > ul {\n  flex-direction: row;\n  justify-content: end;\n  align-items: flex-end;\n}\n\n.rss-left {\n  width: 45%;\n}\n\n.rss-right {\n  width: 45%;\n}\n\n.rss-left > ul {\n  display: flex;\n  flex-direction: row;\n}\n.rss-left > ul li {\n  padding: 10px;\n}\n\n.rss-right > ul {\n  display: flex;\n  flex-direction: row;\n  justify-content: end;\n}\n.rss-right > ul li {\n  padding: 10px;\n}\n\n#game-canvas, #builder-canvas, #info-canvas {\n  background-color: rgb(38, 38, 38);\n}\n\n.container {\n  display: grid;\n  grid-template-columns: 180px 1fr 620px 1fr 180px;\n}\n\n.grid-container {\n  display: grid;\n  width: 620px;\n  grid-column: 3;\n  grid-template-columns: 20% 20% 20% 20% 20%;\n  grid-template-rows: 20% 20% 20% 20% 20%;\n}\n\n#game-canvas {\n  grid-column: 1;\n  grid-row: 1;\n}\n\n.info-panel {\n  display: grid;\n  grid-column: 5;\n  grid-template-columns: 33% 33% 33%;\n}\n.info-panel #info-canvas {\n  grid-column: 1/1;\n  grid-row: 1;\n  width: 180px;\n}\n.info-panel h3 {\n  grid-column: 2;\n  z-index: 1;\n  display: flex;\n  justify-content: center;\n  padding-top: 10px;\n}\n\n.builder-menu {\n  display: grid;\n  grid-column: 1/1;\n  grid-template-columns: 33% 33% 33%;\n}\n.builder-menu #builder-canvas {\n  grid-column: 1/1;\n  grid-row: 1;\n  width: 180px;\n}\n.builder-menu h3 {\n  grid-column: 2;\n  z-index: 1;\n  display: flex;\n  justify-content: center;\n  padding-top: 10px;\n  height: 20px;\n}\n.builder-menu ul {\n  grid-column: 1;\n  grid-row: 1;\n  width: 180px;\n  display: flex;\n  flex-wrap: wrap;\n  list-style: none;\n  padding-top: 30px;\n  padding-left: 0px;\n  z-index: 1;\n}\n.builder-menu ul li {\n  margin: 15px;\n  width: 60px;\n  height: 60px;\n  border-style: solid;\n  border: 1px solid white;\n  z-index: 2;\n}\n\n.grid {\n  grid-column: 1;\n  grid-row: 1;\n}\n\n.grid > ul {\n  width: 620px;\n  display: flex;\n  flex-wrap: wrap;\n  list-style: none;\n  padding: 0%;\n  margin-top: 10px;\n  margin-left: 10px;\n}\n\n.grid li {\n  width: 60px;\n  height: 60px;\n  justify-content: center;\n}\n\nli:hover {\n  background-color: gray;\n}\n\nbody {\n  background-color: rgb(110, 110, 110);\n  font-family: \"Roboto\", sans-serif;\n}", "",{"version":3,"sources":["webpack://./src/styles/main.scss","webpack://./src/styles/base/reset.scss","webpack://./src/styles/components/_main_nav.scss","webpack://./src/styles/components/_resource_bar.scss","webpack://./src/styles/components/_grid.scss"],"names":[],"mappings":"AAAQ,qBAAA;ACCR;;;EAGE,sBAAA;ADCF;;ACEA,0BAAA;AACA;;;;;;;;;;EAUE,SAAA;ADCF;;ACEA,2GAAA;AACA;;EAEE,gBAAA;ADCF;;ACEA,2BAAA;AACA;EACE,iBAAA;EACA,6BAAA;EACA,gBAAA;ADCF;;ACEA,0DAAA;AACA;EACE,8BAAA;ADCF;;ACEA,oCAAA;AACA;;EAEE,eAAA;EACA,cAAA;ADCF;;ACEA,yCAAA;AACA;;;;EAIE,aAAA;ADCF;;ACEA,gGAAA;AACA;EACE;IACC,qBAAA;EDCD;ECEA;;;IAGE,qCAAA;IACA,uCAAA;IACA,sCAAA;IACA,gCAAA;EDAF;AACF;AEnEA;EACI,aAAA;EACA,8BAAA;EACA,cAAA;AFqEJ;;AElEA;EACI,aAAA;EACA,mBAAA;EACA,oBAAA;EACA,qBAAA;AFqEJ;;AEjEA;EACI,YAAA;AFoEJ;;AEjEA;EACI,YAAA;AFoEJ;;AEjEA;EACI,YAAA;AFoEJ;;AG3FA;EACI,aAAA;EACA,8BAAA;EACA,cAAA;AH8FJ;;AG3FA;EAEI,mBAAA;EACA,oBAAA;EACA,qBAAA;AH6FJ;;AGzFA;EAEI,UAAA;AH2FJ;;AGxFA;EAEI,UAAA;AH0FJ;;AGvFA;EACI,aAAA;EACA,mBAAA;AH0FJ;AGxFI;EACI,aAAA;AH0FR;;AGrFA;EACI,aAAA;EACA,mBAAA;EACA,oBAAA;AHwFJ;AGtFI;EACI,aAAA;AHwFR;;AIhIA;EACI,iCAAA;AJmIJ;;AI7HA;EACI,aAAA;EACA,gDAAA;AJgIJ;;AIvHA;EACI,aAAA;EACA,YAAA;EACA,cAAA;EAEA,0CAAA;EACA,uCAAA;AJyHJ;;AItHA;EACI,cAAA;EACA,WAAA;AJyHJ;;AIhHA;EACI,aAAA;EACA,cAAA;EACA,kCAAA;AJmHJ;AIlHI;EACI,gBAAA;EACA,WAAA;EACA,YAAA;AJoHR;AIlHI;EACI,cAAA;EACA,UAAA;EACA,aAAA;EACA,uBAAA;EACA,iBAAA;AJoHR;;AIhHA;EACI,aAAA;EACA,gBAAA;EACA,kCAAA;AJmHJ;AIlHI;EACI,gBAAA;EACA,WAAA;EACA,YAAA;AJoHR;AIlHI;EACI,cAAA;EACA,UAAA;EAGA,aAAA;EACA,uBAAA;EACA,iBAAA;EACA,YAAA;AJkHR;AI/GI;EACI,cAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,eAAA;EACA,gBAAA;EACA,iBAAA;EACA,iBAAA;EACA,UAAA;AJiHR;AI/GQ;EACI,YAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,uBAAA;EACA,UAAA;AJiHZ;;AI3GA;EAQI,cAAA;EACA,WAAA;AJuGJ;;AInGA;EACI,YAAA;EACA,aAAA;EACA,eAAA;EACA,gBAAA;EACA,WAAA;EACA,gBAAA;EACA,iBAAA;AJsGJ;;AIlGA;EACI,WAAA;EACA,YAAA;EACA,uBAAA;AJqGJ;;AIlGA;EACI,sBAAA;AJqGJ;;AAtNA;EACE,oCATc;EAUd,iCAAA;AAyNF","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');\n\n@import \"base/reset.scss\";\n\n@import \"components/_main_nav.scss\";\n@import \"components/resource_bar.scss\";\n@import \"components/build_bar.scss\";\n@import \"components/grid.scss\";\n\n$primary-color: rgb(110, 110, 110);\n$secondary-color: #f4f4f4;\n// $box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\n\n// * {\n//   box-sizing: border-box;\n// }\n\nbody {\n  background-color: $primary-color;\n  font-family: 'Roboto', sans-serif;\n//   display: flex;\n//   flex-direction: column;\n//   align-items: center;\n//   justify-content: center;\n//   height: 100vh;\n//   overflow: hidden;\n//   margin: 0;\n//   padding: 20px;\n}\n\n// .container {\n//   background-color: $secondary-color;\n//   border-radius: 10px;\n//   box-shadow: $box-shadow;\n//   padding: 50px 20px;\n//   text-align: center;\n//   max-width: 100%;\n//   width: 800px;\n// }\n\n// h2 {\n//   margin: 0;\n//   opacity: 0.5;\n//   letter-spacing: 2px;\n// }\n\n// img {\n//   width: 100px;\n//   margin-bottom: 20px;\n// }\n\n// .joke {\n//   font-size: 30px;\n//   letter-spacing: 1px;\n//   line-height: 40px;\n//   margin: 50px auto;\n//   max-width: 600px;\n// }\n\n// .btn {\n//   background-color: $primary-color;\n//   color: $secondary-color;\n//   border: 0;\n//   border-radius: 10px;\n//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\n//   padding: 14px 40px;\n//   font-size: 16px;\n//   cursor: pointer;\n\n//   &:active {\n//     transform: scale(0.98);\n//   }\n\n//   &:focus {\n//     outline: 0;\n//   }\n// }\n\n","/* Box sizing rules */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n/* Remove default margin */\nbody,\nh1,\nh2,\nh3,\nh4,\np,\nfigure,\nblockquote,\ndl,\ndd {\n  margin: 0;\n}\n\n/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */\nul,\nol {\n  list-style: none;\n}\n\n/* Set core body defaults */\nbody {\n  min-height: 100vh;\n  text-rendering: optimizeSpeed;\n  line-height: 1.5;\n}\n\n/* A elements that don't have a class get default styles */\na:not([class]) {\n  text-decoration-skip-ink: auto;\n}\n\n/* Make images easier to work with */\nimg,\npicture {\n  max-width: 100%;\n  display: block;\n}\n\n/* Inherit fonts for inputs and buttons */\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n\n/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */\n@media (prefers-reduced-motion: reduce) {\n  html:focus-within {\n   scroll-behavior: auto;\n  }\n  \n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.01ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.01ms !important;\n    scroll-behavior: auto !important;\n  }\n}\n",".main-nav {\n    display: flex;\n    justify-content: space-between;\n    margin: 0 auto;\n}\n\n.main-nav > ul {\n    display: flex;\n    flex-direction: row;\n    justify-content: end;\n    align-items: flex-end;\n\n}\n\n.div-box {\n    width: 268px;\n}\n\n.main-nav li {\n    margin: 10px;\n}\n\n.main-nav h2 {\n    margin: 20px;\n}",".resources-bar {\n    display: flex;\n    justify-content: space-between;\n    margin: 0 auto;\n}\n\n.resources-bar > ul {\n    // display: flex;\n    flex-direction: row;\n    justify-content: end;\n    align-items: flex-end;\n\n}\n\n.rss-left {\n    // justify-content: space-between;\n    width: 45%;\n}\n\n.rss-right {\n    // justify-content: end;\n    width: 45%;\n}\n\n.rss-left > ul {\n    display: flex;\n    flex-direction: row;\n\n    li {\n        padding: 10px;\n    }\n\n}\n\n.rss-right > ul {\n    display: flex;\n    flex-direction: row;\n    justify-content: end;\n\n    li {\n        padding: 10px;\n    }\n\n}\n","#game-canvas, #builder-canvas, #info-canvas {\n    background-color: rgb(38, 38, 38);\n    // display: flex;\n    // grid-template-columns: 65px 1fr 65px;\n    // grid-template-rows: 100px 100px 100px;\n}\n\n.container {\n    display: grid;\n    grid-template-columns: 180px 1fr 620px 1fr 180px;\n    // justify-content: space-between;\n    // position: absolute;\n    // width: 100%;\n    // left: 0;\n    // right: 0;\n    // margin: auto;\n}\n\n.grid-container {\n    display: grid;\n    width: 620px;\n    grid-column: 3;\n    // justify-content: center;\n    grid-template-columns: 20% 20% 20% 20% 20%;\n    grid-template-rows: 20% 20% 20% 20% 20%;\n}\n\n#game-canvas {\n    grid-column: 1;\n    grid-row: 1;\n    // grid-column-end: 3;\n    // position: absolute;\n    // width: 620px;\n    // left: 0;\n    // right: 0;\n    // margin: auto;\n}\n\n.info-panel {\n    display: grid;\n    grid-column: 5;\n    grid-template-columns: 33% 33% 33%;\n    #info-canvas {\n        grid-column: 1/1;\n        grid-row: 1;\n        width: 180px;\n    }\n    h3 {\n        grid-column: 2;\n        z-index: 1;\n        display: flex;\n        justify-content: center;\n        padding-top: 10px;\n    }\n}\n\n.builder-menu {\n    display: grid;\n    grid-column: 1 / 1;\n    grid-template-columns: 33% 33% 33%;\n    #builder-canvas {\n        grid-column: 1 / 1;\n        grid-row: 1;\n        width: 180px;\n    }\n    h3 {\n        grid-column: 2;\n        z-index: 1;\n        // -webkit-text-stroke: 1px;\n        // -webkit-text-stroke-color: white;\n        display: flex;\n        justify-content: center;\n        padding-top: 10px;\n        height: 20px;\n    }\n\n    ul {\n        grid-column: 1;\n        grid-row: 1;\n        width: 180px;\n        display: flex;\n        flex-wrap: wrap;\n        list-style: none;\n        padding-top: 30px;\n        padding-left: 0px;\n        z-index: 1;\n\n        li {\n            margin: 15px;\n            width: 60px;\n            height: 60px;\n            border-style: solid;\n            border: 1px solid white;\n            z-index: 2;\n        }\n    }\n\n}\n\n.grid {\n    // display: flex;\n    // position: relative;\n    // width: 620px;\n    // left: 0;\n    // right: 0;\n    // margin: auto;\n    // margin-top: 0px;\n    grid-column: 1;\n    grid-row: 1;\n    // grid-column-end: 4;\n}\n\n.grid > ul {\n    width: 620px;\n    display: flex;\n    flex-wrap: wrap;\n    list-style: none;\n    padding: 0%;\n    margin-top: 10px;\n    margin-left: 10px;\n    // position: absolute;\n}\n\n.grid li {\n    width: 60px;\n    height: 60px;\n    justify-content: center;\n}\n\nli:hover {\n    background-color: gray;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
 // import laughing from './assets/laughing.svg'

var Game = __webpack_require__(/*! ./game.js */ "./src/game.js");

var IronMine = __webpack_require__(/*! ./ironMine.js */ "./src/ironMine.js"); // const Node = require("./node.js'")


window.Game = Game;
window.IronMine = IronMine; // window.Node = Node;

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById('game-canvas');
  var el = document.querySelector(".grid");
  var iro = document.getElementById('total-iron-ore');
  var iroing = document.getElementById('total-iron-ingots');
  var steing = document.getElementById('total-steel-ingots');
  var num = document.getElementById('total-money');
  var bui = document.querySelector('.builder-menu');
  var info = document.querySelector('.info-panel');
  var sell = document.querySelector('.sell'); // let ctx = canvas.getContext("2d")
  // ctx.moveTo(0, 0);
  // ctx.lineTo(200, 100);
  // ctx.stroke();
  // Box width

  var bw = 600; // Box height

  var bh = 600; // Padding

  var p = 10; // let canvas = document.getElementById("canvas");

  var context = canvas.getContext("2d");

  function drawBoard() {
    for (var x = 0; x <= bw; x += 60) {
      context.moveTo(0.5 + x + p, p);
      context.lineTo(0.5 + x + p, bh + p);
    }

    for (var _x = 0; _x <= bh; _x += 60) {
      context.moveTo(p, 0.5 + _x + p);
      context.lineTo(bw + p, 0.5 + _x + p);
    }

    context.strokeStyle = "white";
    context.stroke();
  }

  drawBoard(); // console.log(rss)

  console.log(iroing);
  var gamev = new Game(el, iro, num, bui, info, sell, iroing, steing); // gamev.map.startingMarket()
  // gamev.updateTotalMoney(num)
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map