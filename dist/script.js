/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_openSection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/openSection */ "./src/js/openSection.js");
/* harmony import */ var _js_switchData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/switchData */ "./src/js/switchData.js");
/* harmony import */ var _js_getDate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/getDate */ "./src/js/getDate.js");
/* harmony import */ var _js_Autocomplete__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/Autocomplete */ "./src/js/Autocomplete.js");


 // import { Keyboard } from "./js/Keyboard";


 // import { chart } from "./js/chart"

window.addEventListener('DOMContentLoaded', function () {
  // развернуть секцию на весь экран
  (0,_js_openSection__WEBPACK_IMPORTED_MODULE_0__.openSection)(); // слайдер

  (0,_js_switchData__WEBPACK_IMPORTED_MODULE_1__.switchData)(); //update date

  (0,_js_getDate__WEBPACK_IMPORTED_MODULE_2__.getDate)(); //keyboard
  // Keyboard.init();

  (0,_js_Autocomplete__WEBPACK_IMPORTED_MODULE_3__.Autocomplete)('#input-select', _js_Autocomplete__WEBPACK_IMPORTED_MODULE_3__.array1); // chart();
});

/***/ }),

/***/ "./src/js/Autocomplete.js":
/*!********************************!*\
  !*** ./src/js/Autocomplete.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "array1": () => /* binding */ array1,
/* harmony export */   "Autocomplete": () => /* binding */ Autocomplete
/* harmony export */ });
var array1 = ["USA", "India", "Bosnia and Herzegovina", "Brazil", "Russia", "France", "Turkey", "UK", "Italy", "Spain", "Argentina", "Germany", "Colombia", "Mexico", "Poland", "Iran", "Peru", "Ukraine", "South Africa", "Netherlands", "Indonesia", "Belgium", "Czechia", "Romania", "Chile", "Iraq", "Canada", "Bangladesh", "Philippines", "Pakistan", "Morocco", "Switzerland", "Israel", "Portugal", "Sweden", "Saudi Arabia"];
var Autocomplete = function Autocomplete(selector, data) {
  var inputs = document.querySelectorAll(selector);

  function ciSearch() {
    var what = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var where = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return where.toUpperCase().search(what.toUpperCase());
  }

  inputs.forEach(function (input) {
    input.classList.add('autocomplete-input');
    var wrap = document.createElement('div');
    wrap.className = 'autocomplete-wrap';
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
    var list = document.createElement('div');
    list.className = 'autocomplete-list';
    wrap.appendChild(list);
    var matches = [];
    var listItems = [];
    var focusedItem = -1;

    function setActive() {
      var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (active) wrap.classList.add('active');else wrap.classList.remove('active');
    }

    function focusItem(index) {
      if (!listItems.length) return false;
      if (index > listItems.length - 1) return focusItem(0);
      if (index < 0) return focusItem(listItems.length - 1);
      focusedItem = index;
      unfocusAllItems();
      listItems[focusedItem].classList.add('focused');
    }

    function unfocusAllItems() {
      listItems.forEach(function (item) {
        item.classList.remove('focused');
      });
    }

    function selectItem(index) {
      if (!listItems[index]) return false;
      input.value = listItems[index].innerText;
      setActive(false);
    }

    input.addEventListener('input', function (e) {
      var value = input.value;
      if (!value) return setActive(false);
      list.innerHTML = '';
      listItems = [];
      data.forEach(function (dataItem, index) {
        var search = ciSearch(value, dataItem);

        if (search === -1) {
          return false;
        }

        matches.push(index);
        var parts = [dataItem.substr(0, search), dataItem.substr(search, value.length), dataItem.substr(search + value.length, dataItem.length - search - value.length)];
        var item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.innerHTML = parts[0] + '<strong>' + parts[1] + '</strong>' + parts[2];
        list.appendChild(item);
        listItems.push(item);
        item.addEventListener('click', function () {
          selectItem(listItems.indexOf(item));
          searchListCountry();
          listItems = [];
        });
      });

      if (listItems.length > 0) {
        focusItem(0);
        setActive(true);
      } else setActive(false);
    });
    input.addEventListener('keydown', function (e) {
      var keyCode = e.keyCode;

      if (keyCode === 40) {
        // arrow down
        e.preventDefault();
        focusedItem++;
        focusItem(focusedItem);
      } else if (keyCode === 38) {
        //arrow up
        e.preventDefault();
        if (focusedItem > 0) focusedItem--;
        focusItem(focusedItem);
      } else if (keyCode === 27) {
        // escape
        setActive(false);
      } else if (keyCode === 13) {
        // enter
        selectItem(focusedItem);
        searchListCountry();

        if (input.value === '') {
          document.location.reload();
        }
      }
    });
    input.addEventListener('focus', function (e) {
      input.value = '';
    }); ////////////// 

    function searchListCountry() {
      var country = document.querySelectorAll('.case-country li');

      if (input.value !== '') {
        country.forEach(function (elem) {
          if (elem.innerText.search(input.value) === -1) {
            elem.classList.remove('country-active');
          } else {
            elem.classList.add('country-active');

            for (var i = 0; i < elem.length; i++) {
              var index = country[i].indexOf(elem[i]);
              var removed = country[i].splice(index, 1);
              country[i].unshift(removed[0]);
            }
          }
        });
      } else {
        country.forEach(function (elem) {
          elem.classList.remove('country-active');
        }); // document.location.reload();
      }
    } // searchListCountry()
    ///////////////


    document.body.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) setActive(false);
    });
  });
};

/***/ }),

/***/ "./src/js/getDate.js":
/*!***************************!*\
  !*** ./src/js/getDate.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDate": () => /* binding */ getDate
/* harmony export */ });
var getDate = function getDate() {
  var day = document.querySelector('.global-case-date');
  var today = new Date();
  var date = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  console.log(date);
  day.innerHTML = "".concat(month, "/").concat(date, "/").concat(year);
};

/***/ }),

/***/ "./src/js/openSection.js":
/*!*******************************!*\
  !*** ./src/js/openSection.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openSection": () => /* binding */ openSection
/* harmony export */ });
var openSection = function openSection() {
  showButton();
  var sections = document.querySelectorAll('.main-subtable');
  var btns = document.querySelectorAll('.circle-btn');

  var _loop = function _loop(i) {
    if (btns[i]) {
      btns[i].addEventListener('click', function (e) {
        sections[i].classList.toggle('main-subtable-open');
      });
    }
  };

  for (var i = 0; i < btns.length; i += 1) {
    _loop(i);
  }
};

var showButton = function showButton() {
  var sections = document.querySelectorAll('.main-subtable');
  var btns = document.querySelectorAll('.circle-btn');

  var _loop2 = function _loop2(i) {
    sections[i].addEventListener('mouseover', function () {
      btns[i].style.display = 'block';
    });
    sections[i].addEventListener('mouseleave', function () {
      btns[i].style.display = 'none';
    });
  };

  for (var i = 0; i < sections.length; i += 1) {
    _loop2(i);
  }
};

/***/ }),

/***/ "./src/js/switchData.js":
/*!******************************!*\
  !*** ./src/js/switchData.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "switchData": () => /* binding */ switchData
/* harmony export */ });
var switchData = function switchData() {
  getSliderGlobalCase();
  getSliderGlobalDeaths();
  getSliderGlobalRecovered();
};

var getSliderGlobalCase = function getSliderGlobalCase() {
  var sliderGlobal = document.querySelectorAll('.slide-global');
  var current = 0;

  function flipSliderCase() {
    for (var i = 0; i < sliderGlobal.length; i += 1) {
      sliderGlobal[i].classList.add('opacity0');
    }

    sliderGlobal[current].classList.remove('opacity0');
  }

  flipSliderCase();
  document.querySelector('.global-case-left').addEventListener('click', function (e) {
    if (current - 1 === -1) {
      current = sliderGlobal.length - 1;
    } else {
      current -= 1;
    }

    flipSliderCase();
  });
  document.querySelector('.global-case-right').addEventListener('click', function (e) {
    if (current + 1 === sliderGlobal.length) {
      current = 0;
    } else {
      current += 1;
    }

    flipSliderCase();
  });
};

var getSliderGlobalDeaths = function getSliderGlobalDeaths() {
  var sliderDeaths = document.querySelectorAll('.slider-deaths');
  var current = 0;

  function flipSliderDeaths() {
    for (var i = 0; i < sliderDeaths.length; i += 1) {
      sliderDeaths[i].classList.add('opacity0');
    }

    sliderDeaths[current].classList.remove('opacity0');
  }

  flipSliderDeaths();
  document.querySelector('.deaths-left').addEventListener('click', function (e) {
    if (current - 1 === -1) {
      current = sliderDeaths.length - 1;
    } else {
      current -= 1;
    }

    flipSliderDeaths();
  });
  document.querySelector('.deaths-right').addEventListener('click', function (e) {
    if (current + 1 === sliderDeaths.length) {
      current = 0;
    } else {
      current += 1;
    }

    flipSliderDeaths();
  });
};

var getSliderGlobalRecovered = function getSliderGlobalRecovered() {
  var sliderRecovered = document.querySelectorAll('.slide-recovered');
  var current = 0;

  function flipSliderRecovered() {
    for (var i = 0; i < sliderRecovered.length; i += 1) {
      sliderRecovered[i].classList.add('opacity0');
    }

    sliderRecovered[current].classList.remove('opacity0');
  }

  flipSliderRecovered();
  document.querySelector('.recovered-left').addEventListener('click', function (e) {
    if (current - 1 === -1) {
      current = sliderRecovered.length - 1;
    } else {
      current -= 1;
    }

    flipSliderRecovered();
  });
  document.querySelector('.recovered-right').addEventListener('click', function (e) {
    if (current + 1 === sliderRecovered.length) {
      current = 0;
    } else {
      current += 1;
    }

    flipSliderRecovered();
  });
};

/***/ }),

/***/ "./src/sass/style.scss":
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ 	__webpack_require__("./src/sass/style.scss");
/******/ })()
;
//# sourceMappingURL=script.js.map