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
/* harmony import */ var _js_getDate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/getDate */ "./src/js/getDate.js");
/* harmony import */ var _js_Autocomplete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/Autocomplete */ "./src/js/Autocomplete.js");
/* harmony import */ var _js_apiCountry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/apiCountry */ "./src/js/apiCountry.js");

 // import { Keyboard } from "./js/Keyboard";



 // import { chart } from "./js/chart"

window.addEventListener('DOMContentLoaded', () => {
  // развернуть секцию на весь экран
  (0,_js_openSection__WEBPACK_IMPORTED_MODULE_0__.openSection)(); //update date

  (0,_js_getDate__WEBPACK_IMPORTED_MODULE_1__.getDate)(); //keyboard
  // Keyboard.init();

  (0,_js_Autocomplete__WEBPACK_IMPORTED_MODULE_2__.Autocomplete)('#input-select', _js_apiCountry__WEBPACK_IMPORTED_MODULE_3__.array1); // chart();

  (0,_js_apiCountry__WEBPACK_IMPORTED_MODULE_3__.getDataCountries)();
});

/***/ }),

/***/ "./src/js/Autocomplete.js":
/*!********************************!*\
  !*** ./src/js/Autocomplete.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Autocomplete": () => /* binding */ Autocomplete
/* harmony export */ });
// export let array1 = ["USA", "India", "Bosnia and Herzegovina", "Brazil", "Russia", "France", "Turkey", "UK", "Italy", "Spain", "Argentina", "Germany", "Colombia", "Mexico", "Poland", "Iran", "Peru", "Ukraine", "South Africa", "Netherlands", "Indonesia", "Belgium", "Czechia", "Romania", "Chile", "Iraq", "Canada", "Bangladesh", "Philippines", "Pakistan", "Morocco", "Switzerland", "Israel", "Portugal", "Sweden", "Saudi Arabia"];
// import { array1 } from "./js/apiCountry";
const Autocomplete = (selector, data) => {
  let inputs = document.querySelectorAll(selector);

  function ciSearch(what = '', where = '') {
    return where.toUpperCase().search(what.toUpperCase());
  }

  inputs.forEach(input => {
    input.classList.add('autocomplete-input');
    let wrap = document.createElement('div');
    wrap.className = 'autocomplete-wrap';
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
    let list = document.createElement('div');
    list.className = 'autocomplete-list';
    wrap.appendChild(list);
    let matches = [];
    let listItems = [];
    let focusedItem = -1;

    function setActive(active = true) {
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
      listItems.forEach(item => {
        item.classList.remove('focused');
      });
    }

    function selectItem(index) {
      if (!listItems[index]) return false;
      input.value = listItems[index].innerText;
      setActive(false);
    }

    input.addEventListener('input', e => {
      let value = input.value;
      if (!value) return setActive(false);
      list.innerHTML = '';
      listItems = [];
      data.forEach((dataItem, index) => {
        let search = ciSearch(value, dataItem);

        if (search === -1) {
          return false;
        }

        matches.push(index);
        let parts = [dataItem.substr(0, search), dataItem.substr(search, value.length), dataItem.substr(search + value.length, dataItem.length - search - value.length)];
        let item = document.createElement('div');
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
    input.addEventListener('keydown', e => {
      let keyCode = e.keyCode;

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
    input.addEventListener('focus', e => {
      input.value = '';
    }); ////////////// 

    function searchListCountry() {
      let country = document.querySelectorAll('.case-country li');

      if (input.value !== '') {
        country.forEach(elem => {
          if (elem.innerText.search(input.value) === -1) {
            elem.classList.remove('country-active');
          } else {
            elem.classList.add('country-active');

            for (let i = 0; i < elem.length; i++) {
              let index = country[i].indexOf(elem[i]);
              let removed = country[i].splice(index, 1);
              country[i].unshift(removed[0]);
            }
          }
        });
      } else {
        country.forEach(elem => {
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

/***/ "./src/js/apiCountry.js":
/*!******************************!*\
  !*** ./src/js/apiCountry.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "array1": () => /* binding */ array1,
/* harmony export */   "getDataCountries": () => /* binding */ getDataCountries
/* harmony export */ });
const array1 = []; // массив самих стран

const arrayList = []; // массив обьектов с информациях о странах

let globalValues; // дефолтные свойства, по которым изначально все сортируется

let sortPropertyCases = "Total Cases";
let sortPropertyDeathes = "Deathes";
let sortPropertyRecovered = "Recovered"; // глобальные данные для мира

const globalCases = document.querySelector('.cases');
const globalDeathes = document.querySelector('.deathes');
const globalRecovered = document.querySelector('.recovered'); // каждый список с общими случаями, смертями и выздоравлениями

const listCases = document.querySelector('.list_of_countries_cases');
const listDeathes = document.querySelector('.list_of_countries_deathes');
const listRecovereds = document.querySelector('.list_of_countries_recovered'); // заголовки, содержащие информацию, которая отражена в списке

const headlineCases = document.querySelector('.headline_cases');
const headlineDeathes = document.querySelector('.headline_deathes');
const headlineRecovereds = document.querySelector('.headline_recovered'); // кнопки перелистывания право

const nextButtonCases = document.querySelector('.right-button-cases');
const nextButtonDeathes = document.querySelector('.right-button-deathes');
const nextButtonRecovered = document.querySelector('.right-button-recovered'); // кнопки перелистывания влево

const prevButtonCases = document.querySelector('.left-button-cases');
const prevButtonDeathes = document.querySelector('.left-button-deathes');
const prevButtonRecovered = document.querySelector('.left-button-recovered'); // свойства, по которым сортируются общие случаи

const propsCases = ["Total Cases", "Today Cases", "Today Cases/100th", "Total Cases/100th"]; // свойства, по которым сортируются выздоровленные

const propsRecovered = ["Recovered", "Today Recovered", "Today Recovered/100th", "Recovered/100th"]; // свойства, по которым сортируются смерти

const propsDeathes = ["Deathes", "Deathes/100th", "Today Deathes", "Today Deathes/100th"];
const getDataCountries = () => {
  // получаем список стран
  getAllCountries(array1); // получаем глобальные переменные

  getGlobalValues();
}; // функция получения информации о стране по API

async function getListCountries(array) {
  for (let i = 0; i < array.length; i++) {
    const countryName = array[i];
    const resu = await fetch(`https://corona.lmao.ninja/v2/countries/${countryName}?yesterday&strict&query%20`);
    const data = await resu.json();

    if (data.message !== 'Country not found or doesn\'t have any cases') {
      arrayList.push({
        Country: data.country,
        "Total Cases": data.cases,
        Deathes: data.deaths,
        Recovered: data.recovered,
        Flag: data.countryInfo.flag,
        "Today Cases": data.todayCases,
        "Today Deathes": data.todayDeaths,
        "Today Recovered": data.todayRecovered,
        "Total Cases/100th": Math.floor(data.cases / data.population * 10 ** 5),
        "Deathes/100th": Math.floor(data.deaths / data.population * 10 ** 5),
        "Recovered/100th": Math.floor(data.recovered / data.population * 10 ** 5),
        "Today Cases/100th": Math.floor(data.todayCases / data.population * 10 ** 5),
        "Today Deathes/100th": Math.floor(data.todayDeaths / data.population * 10 ** 5),
        "Today Recovered/100th": Math.floor(data.todayRecovered / data.population * 10 ** 5)
      });
    }
  } // создаем те самые списки стран 


  createList(arrayList, sortPropertyCases, listCases, headlineCases);
  createList(arrayList, sortPropertyDeathes, listDeathes, headlineDeathes);
  createList(arrayList, sortPropertyRecovered, listRecovereds, headlineRecovereds);
  nextButtonCases.addEventListener('click', () => {
    sortPropertyCases = nextList(sortPropertyCases, propsCases, arrayList, listCases, headlineCases);
  });
  nextButtonDeathes.addEventListener('click', () => {
    sortPropertyDeathes = nextList(sortPropertyDeathes, propsDeathes, arrayList, listDeathes, headlineDeathes);
  });
  nextButtonRecovered.addEventListener('click', () => {
    sortPropertyRecovered = nextList(sortPropertyRecovered, propsRecovered, arrayList, listRecovereds, headlineRecovereds);
  });
  prevButtonCases.addEventListener('click', () => {
    sortPropertyCases = prevList(sortPropertyCases, propsCases, arrayList, listCases, headlineCases);
  });
  prevButtonDeathes.addEventListener('click', () => {
    sortPropertyDeathes = prevList(sortPropertyDeathes, propsDeathes, arrayList, listDeathes, headlineDeathes);
  });
  prevButtonRecovered.addEventListener('click', () => {
    sortPropertyRecovered = prevList(sortPropertyRecovered, propsRecovered, arrayList, listRecovereds, headlineRecovereds);
  });
} // высчитывание индекса, свойства которое должно вывести следующим


function nextList(prop, arrayProps, array, element, headline) {
  let index = arrayProps.indexOf(prop);

  if (index == arrayProps.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }

  createList(array, arrayProps[index], element, headline);
  getGlobalValues();
  return arrayProps[index];
} // высчитывание индекса, свойства которое было до этого 


function prevList(prop, arrayProps, array, element, headline) {
  let index = arrayProps.indexOf(prop);

  if (index === 0) {
    index = arrayProps.length - 1;
  } else {
    index -= 1;
  }

  createList(array, arrayProps[index], element, headline);
  getGlobalValues();
  return arrayProps[index];
} // получения списка 101 страны из API


async function getAllCountries(array) {
  const resu = await fetch(`https://corona.lmao.ninja/v2/countries/`);
  const data = await resu.json();
  data.sort((prev, next) => next.cases - prev.cases);

  for (let i = 0; i <= 100; i++) {
    array.push(data[i].country);
  }

  getListCountries(array);
} // получение из API и вывод глобльных данных 


async function getGlobalValues() {
  const resu = await fetch(`https://corona.lmao.ninja/v2/all?yesterday`);
  const data = await resu.json();
  globalValues = {
    "Total Cases": data.cases,
    Deathes: data.deaths,
    Recovered: data.recovered,
    "Today Cases": data.todayCases,
    "Today Deathes": data.todayDeaths,
    "Today Recovered": data.todayRecovered,
    "Total Cases/100th": Math.floor(data.cases / data.population * 10 ** 5),
    "Deathes/100th": Math.floor(data.deaths / data.population * 10 ** 5),
    "Recovered/100th": Math.floor(data.recovered / data.population * 10 ** 5),
    "Today Cases/100th": Math.floor(data.todayCases / data.population * 10 ** 5),
    "Today Deathes/100th": Math.floor(data.todayDeaths / data.population * 10 ** 5),
    "Today Recovered/100th": Math.floor(data.todayRecovered / data.population * 10 ** 5)
  };
  const valueCases = globalValues[sortPropertyCases].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  const valueDeathes = globalValues[sortPropertyDeathes].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  const valueRecovered = globalValues[sortPropertyRecovered].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  globalCases.innerHTML = valueCases;
  globalDeathes.innerHTML = valueDeathes;
  globalRecovered.innerHTML = valueRecovered;
} // получаем список стран
//  getAllCountries(array1)
// получаем глобальные переменные
//  getGlobalValues()
// создаем список стран


function createList(array, prop, element, headline) {
  headline.innerHTML = prop;
  element.innerHTML = '';
  let sortArray = array.sort((prev, next) => next[prop] - prev[prop]);
  const list = document.createElement('ul');
  list.className = 'case-country';

  for (let i = 0; i < sortArray.length; i++) {
    const li = document.createElement('li');
    let value = sortArray[i][prop].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    li.className = 'country';
    li.innerHTML = `<span class="color-prop">${value}</span> <span><img class="map-icon" src="${sortArray[i].Flag}" alt="icon map" > </span>
                        <span>${sortArray[i].Country}</span>`;
    list.append(li);
  }

  element.append(list);
}

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
const getDate = () => {
  let day = document.querySelector('.global-case-date');
  let today = new Date();
  let date = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  console.log(date);
  day.innerHTML = `${month}/${date}/${year}`;
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
const openSection = () => {
  showButton();
  let sections = document.querySelectorAll('.main-subtable');
  let btns = document.querySelectorAll('.circle-btn');

  for (let i = 0; i < btns.length; i += 1) {
    if (btns[i]) {
      btns[i].addEventListener('click', e => {
        sections[i].classList.toggle('main-subtable-open');
      });
    }
  }
};

const showButton = () => {
  let sections = document.querySelectorAll('.main-subtable');
  let btns = document.querySelectorAll('.circle-btn');

  for (let i = 0; i < sections.length; i += 1) {
    sections[i].addEventListener('mouseover', () => {
      btns[i].style.display = 'block';
    });
    sections[i].addEventListener('mouseleave', () => {
      btns[i].style.display = 'none';
    });
  }
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