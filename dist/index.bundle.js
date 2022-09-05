"use strict";
(self["webpackChunkset_up_project_with_webpack"] = self["webpackChunkset_up_project_with_webpack"] || []).push([["index"],{

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {


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

/***/ "./src/displayList.js":
/*!****************************!*\
  !*** ./src/displayList.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const boardList = document.querySelector('.board-list');

const displayList = inputs => {
  boardList.innerHTML = '';
  inputs.forEach((item, i) => {
    const newSelector = document.createElement('li');
    newSelector.innerHTML = `${item.user} : ${item.score}`;

    if (i % 2 === 1) {
      newSelector.style.backgroundColor = '#c0c0c0';
    }

    boardList.appendChild(newSelector);
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayList);

/***/ }),

/***/ "./src/gameFunctions.js":
/*!******************************!*\
  !*** ./src/gameFunctions.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getScores": () => (/* binding */ getScores),
/* harmony export */   "postScores": () => (/* binding */ postScores)
/* harmony export */ });
const getScores = async id => {
  const urlBase = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
  const response = await fetch(urlBase);
  const scores = await response.json();
  return scores;
};

const postScores = async (id, body) => {
  const urlBase = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
  await fetch(urlBase, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/style.css */ "./src/assets/style.css");
/* harmony import */ var _displayList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayList.js */ "./src/displayList.js");
/* harmony import */ var _gameFunctions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameFunctions.js */ "./src/gameFunctions.js");



const gameId = 'IsGWyZ5ywIUXczEDTXvL';
const refreshButton = document.querySelector('.refresh-btn');
const form = document.querySelector('.form-to-score');
refreshButton.addEventListener('click', () => {
  (0,_gameFunctions_js__WEBPACK_IMPORTED_MODULE_2__.getScores)(gameId).then(scores => {
    (0,_displayList_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scores.result);
  });
});
form.addEventListener('submit', e => {
  e.preventDefault();
  const body = {
    user: document.querySelector('#name-input').value,
    score: parseInt(document.querySelector('.score-input').value, 10)
  };
  (0,_gameFunctions_js__WEBPACK_IMPORTED_MODULE_2__.postScores)(gameId, body);
  document.querySelector('#name-input').value = '';
  document.querySelector('#score-input').value = '';
});
(0,_gameFunctions_js__WEBPACK_IMPORTED_MODULE_2__.getScores)(gameId).then(scores => {
  (0,_displayList_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scores.result);
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/assets/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/assets/style.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  height: 100vh;\r\n  position: relative;\r\n  font-family: 'Roboto', sans-serif;\r\n  background-color: #74a9db;\r\n  color: #2d3038;\r\n  transition: background-color 0.4s linear;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nbody.dark-gray {\r\n  background-color: #272a34;\r\n  color: #fff;\r\n}\r\n\r\nbutton {\r\n  background-color: #292c35;\r\n  color: #fff;\r\n  border: none;\r\n  padding: 7px;\r\n  border-radius: 50px;\r\n  width: 90px;\r\n  font-weight: 700;\r\n}\r\n\r\nbutton:hover {\r\n  transition: background-color 0.4s linear;\r\n  background-color: #43237d;\r\n}\r\n\r\nbutton.dark-gray {\r\n  background-color: #c4d6e8;\r\n  color: #272a34;\r\n}\r\n\r\nbutton.dark-gray:hover {\r\n  transition: background-color 0.4s linear;\r\n  background-color: #898fd1;\r\n}\r\n\r\ninput {\r\n  padding: 12px;\r\n  border: none;\r\n}\r\n\r\n.title,\r\n.main-class {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-content: center;\r\n}\r\n\r\n.title {\r\n  padding: 26px 11%;\r\n}\r\n\r\n.title h1 {\r\n  margin: 0;\r\n}\r\n\r\n.checkbox {\r\n  opacity: 0;\r\n  position: absolute;\r\n}\r\n\r\n.label-awesome {\r\n  width: 52px;\r\n  height: 28px;\r\n  background: #292c35;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  position: relative;\r\n  transition: background-color 0.2s linear;\r\n  padding: 6px;\r\n  border-radius: 52px;\r\n}\r\n\r\n.checkbox:checked + .label-awesome {\r\n  background: #b9cde1;\r\n}\r\n\r\n.circle-ball {\r\n  background: #8b91d7;\r\n  position: absolute;\r\n  border-radius: 52px;\r\n  width: 21px;\r\n  height: 21px;\r\n  transition: transform 0.3s linear;\r\n  top: 5px;\r\n  left: 2px;\r\n}\r\n\r\n.checkbox:checked + .label-awesome .circle-ball {\r\n  transform: translateX(26px);\r\n}\r\n\r\n.bi-sun-fill {\r\n  color: #ef980d;\r\n}\r\n\r\n.bi-moon-fill {\r\n  color: #ecc21e;\r\n}\r\n\r\n.main-class {\r\n  background-color: #d5e3f0;\r\n  display: grid;\r\n  grid-gap: 40px;\r\n  grid-template-columns: 3fr 2fr;\r\n  transition: background-color 0.4s linear;\r\n  padding: 4% 11%;\r\n}\r\n\r\n@media screen and (max-width: 780px) {\r\n  .main-class {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .div-form {\r\n    grid-row: 3;\r\n  }\r\n}\r\n\r\n.main-class.dark-gray {\r\n  background-color: #272a34;\r\n}\r\n\r\nh2 {\r\n  margin: 0;\r\n}\r\n\r\n.board-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.refresh-btn {\r\n  height: 52%;\r\n  align-self: center;\r\n}\r\n\r\n.score-board {\r\n  background-color: #fff;\r\n  border: 2px solid black;\r\n  color: #000;\r\n  border-radius: 6px;\r\n  height: 400px;\r\n  overflow: auto;\r\n}\r\n\r\n.board-list {\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nli {\r\n  padding: 12px 22px;\r\n  list-style: none;\r\n}\r\n\r\n.div-form {\r\n  display: flex;\r\n  gap: 16px;\r\n  flex-direction: column;\r\n}\r\n\r\n.submit-btn {\r\n  align-self: flex-end;\r\n}\r\n\r\n.form-to-score {\r\n  display: flex;\r\n  gap: 14px;\r\n  flex-direction: column;\r\n}\r\n\r\nfooter {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: 82px;\r\n  bottom: 0;\r\n  font-weight: bold;\r\n}\r\n\r\na {\r\n  color: #808080;\r\n  text-decoration: none;\r\n}\r\n\r\n@media screen and (max-width: 780px) {\r\n  footer p {\r\n    font-size: 14px;\r\n    font-weight: bold;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/assets/style.css"],"names":[],"mappings":"AAGA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,iCAAiC;EACjC,yBAAyB;EACzB,cAAc;EACd,wCAAwC;EACxC,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,yBAAyB;EACzB,WAAW;AACb;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,mBAAmB;EACnB,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,wCAAwC;EACxC,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;EACzB,cAAc;AAChB;;AAEA;EACE,wCAAwC;EACxC,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,YAAY;AACd;;AAEA;;EAEE,aAAa;EACb,8BAA8B;EAC9B,qBAAqB;AACvB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,kBAAkB;EAClB,wCAAwC;EACxC,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,kBAAkB;EAClB,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,iCAAiC;EACjC,QAAQ;EACR,SAAS;AACX;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,cAAc;EACd,8BAA8B;EAC9B,wCAAwC;EACxC,eAAe;AACjB;;AAEA;EACE;IACE,0BAA0B;EAC5B;;EAEA;IACE,WAAW;EACb;AACF;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,sBAAsB;EACtB,uBAAuB;EACvB,WAAW;EACX,kBAAkB;EAClB,aAAa;EACb,cAAc;AAChB;;AAEA;EACE,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,SAAS;EACT,iBAAiB;AACnB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE;IACE,eAAe;IACf,iBAAiB;EACnB;AACF","sourcesContent":["@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css');\r\n@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');\r\n\r\n* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  height: 100vh;\r\n  position: relative;\r\n  font-family: 'Roboto', sans-serif;\r\n  background-color: #74a9db;\r\n  color: #2d3038;\r\n  transition: background-color 0.4s linear;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nbody.dark-gray {\r\n  background-color: #272a34;\r\n  color: #fff;\r\n}\r\n\r\nbutton {\r\n  background-color: #292c35;\r\n  color: #fff;\r\n  border: none;\r\n  padding: 7px;\r\n  border-radius: 50px;\r\n  width: 90px;\r\n  font-weight: 700;\r\n}\r\n\r\nbutton:hover {\r\n  transition: background-color 0.4s linear;\r\n  background-color: #43237d;\r\n}\r\n\r\nbutton.dark-gray {\r\n  background-color: #c4d6e8;\r\n  color: #272a34;\r\n}\r\n\r\nbutton.dark-gray:hover {\r\n  transition: background-color 0.4s linear;\r\n  background-color: #898fd1;\r\n}\r\n\r\ninput {\r\n  padding: 12px;\r\n  border: none;\r\n}\r\n\r\n.title,\r\n.main-class {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-content: center;\r\n}\r\n\r\n.title {\r\n  padding: 26px 11%;\r\n}\r\n\r\n.title h1 {\r\n  margin: 0;\r\n}\r\n\r\n.checkbox {\r\n  opacity: 0;\r\n  position: absolute;\r\n}\r\n\r\n.label-awesome {\r\n  width: 52px;\r\n  height: 28px;\r\n  background: #292c35;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  position: relative;\r\n  transition: background-color 0.2s linear;\r\n  padding: 6px;\r\n  border-radius: 52px;\r\n}\r\n\r\n.checkbox:checked + .label-awesome {\r\n  background: #b9cde1;\r\n}\r\n\r\n.circle-ball {\r\n  background: #8b91d7;\r\n  position: absolute;\r\n  border-radius: 52px;\r\n  width: 21px;\r\n  height: 21px;\r\n  transition: transform 0.3s linear;\r\n  top: 5px;\r\n  left: 2px;\r\n}\r\n\r\n.checkbox:checked + .label-awesome .circle-ball {\r\n  transform: translateX(26px);\r\n}\r\n\r\n.bi-sun-fill {\r\n  color: #ef980d;\r\n}\r\n\r\n.bi-moon-fill {\r\n  color: #ecc21e;\r\n}\r\n\r\n.main-class {\r\n  background-color: #d5e3f0;\r\n  display: grid;\r\n  grid-gap: 40px;\r\n  grid-template-columns: 3fr 2fr;\r\n  transition: background-color 0.4s linear;\r\n  padding: 4% 11%;\r\n}\r\n\r\n@media screen and (max-width: 780px) {\r\n  .main-class {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .div-form {\r\n    grid-row: 3;\r\n  }\r\n}\r\n\r\n.main-class.dark-gray {\r\n  background-color: #272a34;\r\n}\r\n\r\nh2 {\r\n  margin: 0;\r\n}\r\n\r\n.board-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.refresh-btn {\r\n  height: 52%;\r\n  align-self: center;\r\n}\r\n\r\n.score-board {\r\n  background-color: #fff;\r\n  border: 2px solid black;\r\n  color: #000;\r\n  border-radius: 6px;\r\n  height: 400px;\r\n  overflow: auto;\r\n}\r\n\r\n.board-list {\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nli {\r\n  padding: 12px 22px;\r\n  list-style: none;\r\n}\r\n\r\n.div-form {\r\n  display: flex;\r\n  gap: 16px;\r\n  flex-direction: column;\r\n}\r\n\r\n.submit-btn {\r\n  align-self: flex-end;\r\n}\r\n\r\n.form-to-score {\r\n  display: flex;\r\n  gap: 14px;\r\n  flex-direction: column;\r\n}\r\n\r\nfooter {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: 82px;\r\n  bottom: 0;\r\n  font-weight: bold;\r\n}\r\n\r\na {\r\n  color: #808080;\r\n  text-decoration: none;\r\n}\r\n\r\n@media screen and (max-width: 780px) {\r\n  footer p {\r\n    font-size: 14px;\r\n    font-weight: bold;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/assets/style.css":
/*!******************************!*\
  !*** ./src/assets/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/assets/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



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

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNWYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDWGE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBOztBQUVBO0FBQ0EsaUZBQWlGO0FBQ2pGOztBQUVBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2V0LXVwLXByb2plY3Qtd2l0aC13ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9zZXQtdXAtcHJvamVjdC13aXRoLXdlYnBhY2svLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9zZXQtdXAtcHJvamVjdC13aXRoLXdlYnBhY2svLi9zcmMvZGlzcGxheUxpc3QuanMiLCJ3ZWJwYWNrOi8vc2V0LXVwLXByb2plY3Qtd2l0aC13ZWJwYWNrLy4vc3JjL2dhbWVGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vc2V0LXVwLXByb2plY3Qtd2l0aC13ZWJwYWNrLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3NldC11cC1wcm9qZWN0LXdpdGgtd2VicGFjay8uL3NyYy9hc3NldHMvc3R5bGUuY3NzIiwid2VicGFjazovL3NldC11cC1wcm9qZWN0LXdpdGgtd2VicGFjay8uL3NyYy9hc3NldHMvc3R5bGUuY3NzPzYwMWQiLCJ3ZWJwYWNrOi8vc2V0LXVwLXByb2plY3Qtd2l0aC13ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3NldC11cC1wcm9qZWN0LXdpdGgtd2VicGFjay8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vc2V0LXVwLXByb2plY3Qtd2l0aC13ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3NldC11cC1wcm9qZWN0LXdpdGgtd2VicGFjay8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9zZXQtdXAtcHJvamVjdC13aXRoLXdlYnBhY2svLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9zZXQtdXAtcHJvamVjdC13aXRoLXdlYnBhY2svLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJjb25zdCBib2FyZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtbGlzdCcpO1xuY29uc3QgZGlzcGxheUxpc3QgPSAoaW5wdXRzKSA9PiB7XG4gIGJvYXJkTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgaW5wdXRzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICBjb25zdCBuZXdTZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgbmV3U2VsZWN0b3IuaW5uZXJIVE1MID0gYCR7aXRlbS51c2VyfSA6ICR7aXRlbS5zY29yZX1gO1xuICAgIGlmIChpICUgMiA9PT0gMSkge1xuICAgICAgbmV3U2VsZWN0b3Iuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNjMGMwYzAnO1xuICAgIH1cbiAgICBib2FyZExpc3QuYXBwZW5kQ2hpbGQobmV3U2VsZWN0b3IpO1xuICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5TGlzdDtcbiIsImNvbnN0IGdldFNjb3JlcyA9IGFzeW5jIChpZCkgPT4ge1xuICBjb25zdCB1cmxCYXNlID0gYGh0dHBzOi8vdXMtY2VudHJhbDEtanMtY2Fwc3RvbmUtYmFja2VuZC5jbG91ZGZ1bmN0aW9ucy5uZXQvYXBpL2dhbWVzLyR7aWR9L3Njb3Jlc2A7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsQmFzZSk7XG4gIGNvbnN0IHNjb3JlcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIHNjb3Jlcztcbn07XG5cbmNvbnN0IHBvc3RTY29yZXMgPSBhc3luYyAoaWQsIGJvZHkpID0+IHtcbiAgY29uc3QgdXJsQmFzZSA9IGBodHRwczovL3VzLWNlbnRyYWwxLWpzLWNhcHN0b25lLWJhY2tlbmQuY2xvdWRmdW5jdGlvbnMubmV0L2FwaS9nYW1lcy8ke2lkfS9zY29yZXNgO1xuICBhd2FpdCBmZXRjaCh1cmxCYXNlLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICB9KTtcbn07XG5cbmV4cG9ydCB7IGdldFNjb3JlcywgcG9zdFNjb3JlcyB9O1xuIiwiaW1wb3J0ICcuL2Fzc2V0cy9zdHlsZS5jc3MnO1xuaW1wb3J0IGRpc3BsYXlMaXN0IGZyb20gJy4vZGlzcGxheUxpc3QuanMnO1xuaW1wb3J0IHsgZ2V0U2NvcmVzLCBwb3N0U2NvcmVzIH0gZnJvbSAnLi9nYW1lRnVuY3Rpb25zLmpzJztcblxuY29uc3QgZ2FtZUlkID0gJ0lzR1d5WjV5d0lVWGN6RURUWHZMJztcblxuY29uc3QgcmVmcmVzaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWZyZXNoLWJ0bicpO1xuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXRvLXNjb3JlJyk7XG5cbnJlZnJlc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGdldFNjb3JlcyhnYW1lSWQpLnRoZW4oKHNjb3JlcykgPT4ge1xuICAgIGRpc3BsYXlMaXN0KHNjb3Jlcy5yZXN1bHQpO1xuICB9KTtcbn0pO1xuXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgYm9keSA9IHtcbiAgICB1c2VyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmFtZS1pbnB1dCcpLnZhbHVlLFxuICAgIHNjb3JlOiBwYXJzZUludChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUtaW5wdXQnKS52YWx1ZSwgMTApLFxuICB9O1xuICBwb3N0U2NvcmVzKGdhbWVJZCwgYm9keSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lLWlucHV0JykudmFsdWUgPSAnJztcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlLWlucHV0JykudmFsdWUgPSAnJztcbn0pO1xuXG5nZXRTY29yZXMoZ2FtZUlkKS50aGVuKChzY29yZXMpID0+IHtcbiAgZGlzcGxheUxpc3Qoc2NvcmVzLnJlc3VsdCk7XG59KTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vYm9vdHN0cmFwLWljb25zQDEuNy4wL2ZvbnQvYm9vdHN0cmFwLWljb25zLmNzcyk7XCJdKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bzp3Z2h0QDEwMDszMDA7NDAwOzUwMDs3MDA7OTAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc0YTlkYjtcXHJcXG4gIGNvbG9yOiAjMmQzMDM4O1xcclxcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjRzIGxpbmVhcjtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbmJvZHkuZGFyay1ncmF5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNzJhMzQ7XFxyXFxuICBjb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyOTJjMzU7XFxyXFxuICBjb2xvcjogI2ZmZjtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIHBhZGRpbmc6IDdweDtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XFxyXFxuICB3aWR0aDogOTBweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxyXFxufVxcclxcblxcclxcbmJ1dHRvbjpob3ZlciB7XFxyXFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuNHMgbGluZWFyO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQzMjM3ZDtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uLmRhcmstZ3JheSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzRkNmU4O1xcclxcbiAgY29sb3I6ICMyNzJhMzQ7XFxyXFxufVxcclxcblxcclxcbmJ1dHRvbi5kYXJrLWdyYXk6aG92ZXIge1xcclxcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjRzIGxpbmVhcjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICM4OThmZDE7XFxyXFxufVxcclxcblxcclxcbmlucHV0IHtcXHJcXG4gIHBhZGRpbmc6IDEycHg7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi50aXRsZSxcXHJcXG4ubWFpbi1jbGFzcyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4udGl0bGUge1xcclxcbiAgcGFkZGluZzogMjZweCAxMSU7XFxyXFxufVxcclxcblxcclxcbi50aXRsZSBoMSB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxufVxcclxcblxcclxcbi5jaGVja2JveCB7XFxyXFxuICBvcGFjaXR5OiAwO1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWwtYXdlc29tZSB7XFxyXFxuICB3aWR0aDogNTJweDtcXHJcXG4gIGhlaWdodDogMjhweDtcXHJcXG4gIGJhY2tncm91bmQ6ICMyOTJjMzU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4ycyBsaW5lYXI7XFxyXFxuICBwYWRkaW5nOiA2cHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2hlY2tib3g6Y2hlY2tlZCArIC5sYWJlbC1hd2Vzb21lIHtcXHJcXG4gIGJhY2tncm91bmQ6ICNiOWNkZTE7XFxyXFxufVxcclxcblxcclxcbi5jaXJjbGUtYmFsbCB7XFxyXFxuICBiYWNrZ3JvdW5kOiAjOGI5MWQ3O1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTJweDtcXHJcXG4gIHdpZHRoOiAyMXB4O1xcclxcbiAgaGVpZ2h0OiAyMXB4O1xcclxcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgbGluZWFyO1xcclxcbiAgdG9wOiA1cHg7XFxyXFxuICBsZWZ0OiAycHg7XFxyXFxufVxcclxcblxcclxcbi5jaGVja2JveDpjaGVja2VkICsgLmxhYmVsLWF3ZXNvbWUgLmNpcmNsZS1iYWxsIHtcXHJcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmJpLXN1bi1maWxsIHtcXHJcXG4gIGNvbG9yOiAjZWY5ODBkO1xcclxcbn1cXHJcXG5cXHJcXG4uYmktbW9vbi1maWxsIHtcXHJcXG4gIGNvbG9yOiAjZWNjMjFlO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbi1jbGFzcyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDVlM2YwO1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtZ2FwOiA0MHB4O1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAzZnIgMmZyO1xcclxcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjRzIGxpbmVhcjtcXHJcXG4gIHBhZGRpbmc6IDQlIDExJTtcXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzgwcHgpIHtcXHJcXG4gIC5tYWluLWNsYXNzIHtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuZGl2LWZvcm0ge1xcclxcbiAgICBncmlkLXJvdzogMztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLm1haW4tY2xhc3MuZGFyay1ncmF5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNzJhMzQ7XFxyXFxufVxcclxcblxcclxcbmgyIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLWhlYWRlciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcXHJcXG59XFxyXFxuXFxyXFxuLnJlZnJlc2gtYnRuIHtcXHJcXG4gIGhlaWdodDogNTIlO1xcclxcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2NvcmUtYm9hcmQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xcclxcbiAgY29sb3I6ICMwMDA7XFxyXFxuICBib3JkZXItcmFkaXVzOiA2cHg7XFxyXFxuICBoZWlnaHQ6IDQwMHB4O1xcclxcbiAgb3ZlcmZsb3c6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1saXN0IHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbmxpIHtcXHJcXG4gIHBhZGRpbmc6IDEycHggMjJweDtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5kaXYtZm9ybSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZ2FwOiAxNnB4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLnN1Ym1pdC1idG4ge1xcclxcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxyXFxufVxcclxcblxcclxcbi5mb3JtLXRvLXNjb3JlIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDE0cHg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGhlaWdodDogODJweDtcXHJcXG4gIGJvdHRvbTogMDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG5hIHtcXHJcXG4gIGNvbG9yOiAjODA4MDgwO1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3ODBweCkge1xcclxcbiAgZm9vdGVyIHAge1xcclxcbiAgICBmb250LXNpemU6IDE0cHg7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvYXNzZXRzL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFHQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsaUNBQWlDO0VBQ2pDLHlCQUF5QjtFQUN6QixjQUFjO0VBQ2Qsd0NBQXdDO0VBQ3hDLFNBQVM7RUFDVCxVQUFVO0FBQ1o7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsV0FBVztBQUNiOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFdBQVc7RUFDWCxZQUFZO0VBQ1osWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usd0NBQXdDO0VBQ3hDLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usd0NBQXdDO0VBQ3hDLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0FBQ2Q7O0FBRUE7O0VBRUUsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxVQUFVO0VBQ1Ysa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLHdDQUF3QztFQUN4QyxZQUFZO0VBQ1osbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLFlBQVk7RUFDWixpQ0FBaUM7RUFDakMsUUFBUTtFQUNSLFNBQVM7QUFDWDs7QUFFQTtFQUNFLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYixjQUFjO0VBQ2QsOEJBQThCO0VBQzlCLHdDQUF3QztFQUN4QyxlQUFlO0FBQ2pCOztBQUVBO0VBQ0U7SUFDRSwwQkFBMEI7RUFDNUI7O0VBRUE7SUFDRSxXQUFXO0VBQ2I7QUFDRjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7RUFDVCxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsU0FBUztFQUNULHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixTQUFTO0VBQ1QsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFO0lBQ0UsZUFBZTtJQUNmLGlCQUFpQjtFQUNuQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2Jvb3RzdHJhcC1pY29uc0AxLjcuMC9mb250L2Jvb3RzdHJhcC1pY29ucy5jc3MnKTtcXHJcXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG86d2dodEAxMDA7MzAwOzQwMDs1MDA7NzAwOzkwMCZkaXNwbGF5PXN3YXAnKTtcXHJcXG5cXHJcXG4qIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJywgc2Fucy1zZXJpZjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICM3NGE5ZGI7XFxyXFxuICBjb2xvcjogIzJkMzAzODtcXHJcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC40cyBsaW5lYXI7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5LmRhcmstZ3JheSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjcyYTM0O1xcclxcbiAgY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbmJ1dHRvbiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjkyYzM1O1xcclxcbiAgY29sb3I6ICNmZmY7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBwYWRkaW5nOiA3cHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MHB4O1xcclxcbiAgd2lkdGg6IDkwcHg7XFxyXFxuICBmb250LXdlaWdodDogNzAwO1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b246aG92ZXIge1xcclxcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjRzIGxpbmVhcjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0MzIzN2Q7XFxyXFxufVxcclxcblxcclxcbmJ1dHRvbi5kYXJrLWdyYXkge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M0ZDZlODtcXHJcXG4gIGNvbG9yOiAjMjcyYTM0O1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24uZGFyay1ncmF5OmhvdmVyIHtcXHJcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC40cyBsaW5lYXI7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjODk4ZmQxO1xcclxcbn1cXHJcXG5cXHJcXG5pbnB1dCB7XFxyXFxuICBwYWRkaW5nOiAxMnB4O1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4udGl0bGUsXFxyXFxuLm1haW4tY2xhc3Mge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlIHtcXHJcXG4gIHBhZGRpbmc6IDI2cHggMTElO1xcclxcbn1cXHJcXG5cXHJcXG4udGl0bGUgaDEge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY2hlY2tib3gge1xcclxcbiAgb3BhY2l0eTogMDtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmxhYmVsLWF3ZXNvbWUge1xcclxcbiAgd2lkdGg6IDUycHg7XFxyXFxuICBoZWlnaHQ6IDI4cHg7XFxyXFxuICBiYWNrZ3JvdW5kOiAjMjkyYzM1O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMgbGluZWFyO1xcclxcbiAgcGFkZGluZzogNnB4O1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNoZWNrYm94OmNoZWNrZWQgKyAubGFiZWwtYXdlc29tZSB7XFxyXFxuICBiYWNrZ3JvdW5kOiAjYjljZGUxO1xcclxcbn1cXHJcXG5cXHJcXG4uY2lyY2xlLWJhbGwge1xcclxcbiAgYmFja2dyb3VuZDogIzhiOTFkNztcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUycHg7XFxyXFxuICB3aWR0aDogMjFweDtcXHJcXG4gIGhlaWdodDogMjFweDtcXHJcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGxpbmVhcjtcXHJcXG4gIHRvcDogNXB4O1xcclxcbiAgbGVmdDogMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2hlY2tib3g6Y2hlY2tlZCArIC5sYWJlbC1hd2Vzb21lIC5jaXJjbGUtYmFsbCB7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjZweCk7XFxyXFxufVxcclxcblxcclxcbi5iaS1zdW4tZmlsbCB7XFxyXFxuICBjb2xvcjogI2VmOTgwZDtcXHJcXG59XFxyXFxuXFxyXFxuLmJpLW1vb24tZmlsbCB7XFxyXFxuICBjb2xvcjogI2VjYzIxZTtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW4tY2xhc3Mge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q1ZTNmMDtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLWdhcDogNDBweDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogM2ZyIDJmcjtcXHJcXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC40cyBsaW5lYXI7XFxyXFxuICBwYWRkaW5nOiA0JSAxMSU7XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc4MHB4KSB7XFxyXFxuICAubWFpbi1jbGFzcyB7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmRpdi1mb3JtIHtcXHJcXG4gICAgZ3JpZC1yb3c6IDM7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi5tYWluLWNsYXNzLmRhcmstZ3JheSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjcyYTM0O1xcclxcbn1cXHJcXG5cXHJcXG5oMiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1oZWFkZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XFxyXFxufVxcclxcblxcclxcbi5yZWZyZXNoLWJ0biB7XFxyXFxuICBoZWlnaHQ6IDUyJTtcXHJcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnNjb3JlLWJvYXJkIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxyXFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXHJcXG4gIGNvbG9yOiAjMDAwO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcclxcbiAgaGVpZ2h0OiA0MDBweDtcXHJcXG4gIG92ZXJmbG93OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtbGlzdCB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5saSB7XFxyXFxuICBwYWRkaW5nOiAxMnB4IDIycHg7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uZGl2LWZvcm0ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGdhcDogMTZweDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5zdWJtaXQtYnRuIHtcXHJcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9ybS10by1zY29yZSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZ2FwOiAxNHB4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBoZWlnaHQ6IDgycHg7XFxyXFxuICBib3R0b206IDA7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuYSB7XFxyXFxuICBjb2xvcjogIzgwODA4MDtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzgwcHgpIHtcXHJcXG4gIGZvb3RlciBwIHtcXHJcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImNzc1dpdGhNYXBwaW5nVG9TdHJpbmciLCJsaXN0IiwidG9TdHJpbmciLCJtYXAiLCJpdGVtIiwiY29udGVudCIsIm5lZWRMYXllciIsImNvbmNhdCIsImxlbmd0aCIsImpvaW4iLCJpIiwibW9kdWxlcyIsIm1lZGlhIiwiZGVkdXBlIiwic3VwcG9ydHMiLCJsYXllciIsInVuZGVmaW5lZCIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJrIiwiaWQiLCJfayIsInB1c2giLCJjc3NNYXBwaW5nIiwiYnRvYSIsImJhc2U2NCIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsImRhdGEiLCJzb3VyY2VNYXBwaW5nIiwic291cmNlVVJMcyIsInNvdXJjZXMiLCJzb3VyY2UiLCJzb3VyY2VSb290IiwiYm9hcmRMaXN0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGlzcGxheUxpc3QiLCJpbnB1dHMiLCJpbm5lckhUTUwiLCJmb3JFYWNoIiwibmV3U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwidXNlciIsInNjb3JlIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhcHBlbmRDaGlsZCIsImdldFNjb3JlcyIsInVybEJhc2UiLCJyZXNwb25zZSIsImZldGNoIiwic2NvcmVzIiwianNvbiIsInBvc3RTY29yZXMiLCJib2R5IiwibWV0aG9kIiwiaGVhZGVycyIsImdhbWVJZCIsInJlZnJlc2hCdXR0b24iLCJmb3JtIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRoZW4iLCJyZXN1bHQiLCJlIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsInBhcnNlSW50Il0sInNvdXJjZVJvb3QiOiIifQ==