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
/* harmony import */ var _js_Keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/Keyboard */ "./src/js/Keyboard.js");




window.addEventListener('DOMContentLoaded', function () {
  // развернуть секцию на весь экран
  (0,_js_openSection__WEBPACK_IMPORTED_MODULE_0__.openSection)(); // слайдер

  (0,_js_switchData__WEBPACK_IMPORTED_MODULE_1__.switchData)(); //update date

  (0,_js_getDate__WEBPACK_IMPORTED_MODULE_2__.getDate)(); //keyboard

  _js_Keyboard__WEBPACK_IMPORTED_MODULE_3__.Keyboard.init();
});

/***/ }),

/***/ "./src/js/Keyboard.js":
/*!****************************!*\
  !*** ./src/js/Keyboard.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Keyboard": () => /* binding */ Keyboard
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    input: document.querySelectorAll("#input-select")[0]
  },
  eventHandlers: {
    oninput: null,
    onclose: null
  },
  properties: {
    value: "",
    capsLock: false,
    shift: false,
    sound: false,
    language: "en",
    stepLeft: 0,
    stepRight: 0,
    positionX: 0
  },
  init: function init() {
    var _this = this;

    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
    this.elements.input.addEventListener('focus', function () {
      _this.open(_this.elements.input.value, function (currentValue) {
        _this.elements.input.value = currentValue;
      });
    });

    function aaa(b) {
      b.classList.remove("keyboard__press");
    }

    this.elements.input.addEventListener('keydown', function (e) {
      for (var i = 0; i < _this.elements.keys.length; i++) {
        if (_this.elements.keys[i].innerHTML === e.key.toLowerCase()) {
          _this.elements.keys[i].classList.add("keyboard__press");

          var b = _this.elements.keys[i];
          setTimeout(aaa, 500, b);
        }
      }

      if (e.key === 'Backspace') {
        var button = _this.elements.keys[10];
        button.classList.add("keyboard__press");
        setTimeout(aaa, 500, button);
      }

      if (e.key === 'CapsLock') {
        var _button = _this.elements.keys[23];

        _button.classList.add("keyboard__press");

        setTimeout(aaa, 500, _button);
      }

      if (e.key === 'Enter') {
        var _button2 = _this.elements.keys[35];

        _button2.classList.add("keyboard__press");

        setTimeout(aaa, 500, _button2);
      }

      if (e.key === 'Shift') {
        var _button3 = _this.elements.keys[48];

        _button3.classList.add("keyboard__press");

        setTimeout(aaa, 500, _button3);
      }

      if (e.key === ' ') {
        var _button4 = _this.elements.keys[49];

        _button4.classList.add("keyboard__press");

        setTimeout(aaa, 500, _button4);
      }
    });
  },
  _createKeys: function _createKeys() {
    var _this2 = this;

    var fragment = document.createDocumentFragment();
    var keyLayout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter", "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift", "space", "en", "left", "right"];
    var keyLayoutRu = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter", "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "shift", "space", "ru", "left", "right"];

    var createIconHTML = function createIconHTML(icon_name) {
      return "<i class=\"material-icons\">".concat(icon_name, "</i>");
    };

    keyLayout.forEach(function (key) {
      var keyElement = document.createElement("button");
      var insertLineBreak = ["backspace", "]", "enter", "/"].indexOf(key) !== -1;
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "left":
          keyElement.innerHTML = createIconHTML("arrow_back");
          keyElement.addEventListener('click', function () {
            if (_this2.properties.positionX !== 0) {
              _this2.properties.stepLeft++;
            }

            _this2.elements.input.focus();

            _this2.properties.positionX = _this2.elements.input.value.length - _this2.properties.stepLeft + _this2.properties.stepRight;

            _this2.elements.input.setSelectionRange(_this2.properties.positionX, _this2.properties.positionX);
          });
          break;

        case "right":
          keyElement.innerHTML = createIconHTML("arrow_forward");
          keyElement.addEventListener('click', function () {
            if (_this2.properties.positionX !== _this2.elements.input.value.length) {
              _this2.properties.stepRight++;
            }

            _this2.elements.input.focus();

            _this2.properties.positionX = _this2.elements.input.value.length - _this2.properties.stepLeft + _this2.properties.stepRight;

            _this2.elements.input.setSelectionRange(_this2.properties.positionX, _this2.properties.positionX);
          });
          break;

        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.addEventListener("click", function () {
            if (_this2.properties.stepLeft === 0) {
              _this2.properties.value = _this2.properties.value.substring(0, _this2.properties.value.length - 1);
            } else {
              _this2.properties.value = _this2.properties.value.substr(0, _this2.properties.positionX - 1) + _this2.properties.value.substr(_this2.properties.positionX, _this2.properties.value.length - _this2.properties.positionX);
            }

            _this2._triggerEvent("oninput");

            _this2.properties.stepRight--;
            _this2.properties.stepLeft--;
            _this2.properties.positionX = _this2.elements.input.value.length - _this2.properties.stepLeft + _this2.properties.stepRight;

            _this2.elements.input.setSelectionRange(_this2.properties.positionX, _this2.properties.positionX);

            _this2.elements.input.focus();
          });
          break;

        case "sound":
          keyElement.classList.add("keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("volume_mute");
          keyElement.addEventListener("click", function () {
            _this2.properties.sound = !_this2.properties.sound;
            keyElement.classList.toggle("keyboard__key--active", _this2.properties.sound);
          });
          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.addEventListener("click", function () {
            _this2._toggleCapsLock();

            keyElement.classList.toggle("keyboard__key--active", _this2.properties.capsLock);
          });
          break;

        case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = "shift";
          keyElement.addEventListener("click", function () {
            _this2._toggleShift();

            keyElement.classList.toggle("keyboard__key--active", _this2.properties.shift);
          });
          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          keyElement.addEventListener("click", function () {
            _this2.properties.value += "\n";

            _this2._triggerEvent("oninput");
          });
          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");
          keyElement.addEventListener("click", function () {
            _this2.properties.value += " ";

            _this2._triggerEvent("oninput");
          });
          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");
          keyElement.addEventListener("click", function () {
            _this2.close();

            _this2._triggerEvent("onclose");
          });
          break;

        case "en":
          keyElement.innerHTML = _this2.properties.language;
          keyElement.addEventListener("click", function () {
            _this2.properties.language === "en" ? _this2.properties.language = "ru" : _this2.properties.language = "en";
            keyElement.innerHTML = _this2.properties.language;
            var keyArray = ["backspace", "caps", "enter", "done", "shift", "space"];

            if (_this2.properties.language === "ru") {
              for (var i = 0; i < _this2.elements.keys.length; i++) {
                if (_this2.elements.keys[i].innerHTML.substring(0, 2) !== "<i") {
                  _this2.elements.keys[i].innerHTML = keyLayoutRu[i];
                }
              }
            } else {
              for (var _i = 0; _i < _this2.elements.keys.length; _i++) {
                if (_this2.elements.keys[_i].innerHTML.substring(0, 2) !== "<i") {
                  _this2.elements.keys[_i].innerHTML = keyLayout[_i];
                }
              }
            }
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", function () {
            _this2.properties.positionX = _this2.elements.input.value.length - _this2.properties.stepLeft + _this2.properties.stepRight;
            key = keyElement.textContent;
            _this2.properties.value = _this2.properties.value.substr(0, _this2.properties.positionX) + key + _this2.properties.value.substr(_this2.properties.positionX, _this2.properties.value.length - _this2.properties.positionX);

            _this2._triggerEvent("oninput");

            _this2.elements.input.setSelectionRange(_this2.properties.positionX + 1, _this2.properties.positionX + 1);

            _this2.elements.input.focus();
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    return fragment;
  },
  _triggerEvent: function _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
  _toggleCapsLock: function _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    this.elements.input.focus();

    var _iterator = _createForOfIteratorHelper(this.elements.keys),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var key = _step.value;

        if (key.childElementCount === 0 && key.innerHTML !== 'shift' && key.innerHTML !== 'ru' && key.innerHTML !== 'en') {
          key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  _toggleShift: function _toggleShift() {
    var keysShift;
    this.properties.shift = !this.properties.shift;

    if (!this.properties.shift && this.properties.language === 'en') {
      keysShift = {
        '0': "1",
        '1': "2",
        '2': "3",
        '3': "4",
        '4': "5",
        '5': "6",
        '6': "7",
        '7': "8",
        '8': "9",
        '9': "0",
        '21': "[",
        '22': "]",
        '33': ';',
        '34': "'",
        '44': ',',
        '45': '.',
        '46': '/'
      };
    } else if (this.properties.shift && this.properties.language === 'en') {
      keysShift = {
        '0': "!",
        '1': "@",
        '2': "#",
        '3': "$",
        '4': "%",
        '5': "^",
        '6': "&",
        '7': "*",
        '8': "(",
        '9': ")",
        '21': "{",
        '22': "}",
        '33': ':',
        '34': '"',
        '44': '<',
        '45': '>',
        '46': '?'
      };
    } else if (this.properties.shift && this.properties.language === 'ru') {
      keysShift = {
        '0': "!",
        '1': "'",
        '2': "№",
        '3': ";",
        '4': "%",
        '5': ":",
        '6': "?",
        '7': "*",
        '8': "(",
        '9': ")",
        '46': ","
      };
    } else {
      keysShift = {
        '0': "1",
        '1': "2",
        '2': "3",
        '3': "4",
        '4': "5",
        '5': "6",
        '6': "7",
        '7': "8",
        '8': "9",
        '9': "0",
        '46': '.'
      };
    }

    for (var i = 0; i < this.elements.keys.length; i++) {
      if (i in keysShift) {
        this.elements.keys[i].innerHTML = keysShift[i];
      }
    }

    this._toggleCapsLock();
  },
  _changeLanguage: function _changeLanguage() {
    var keyLayout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter", "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift", "space", "en"];
    var keyLayoutRu = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "Р№", "С†", "Сѓ", "Рє", "Рµ", "РЅ", "Рі", "С€", "С‰", "Р·", "С…", "СЉ", "caps", "С„", "С‹", "РІ", "Р°", "Рї", "СЂ", "Рѕ", "Р»", "Рґ", "Р¶", "СЌ", "enter", "done", "СЏ", "С‡", "СЃ", "Рј", "Рё", "С‚", "СЊ", "Р±", "СЋ", ".", "shift", "space", "en"];
  },
  open: function open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },
  close: function close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
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