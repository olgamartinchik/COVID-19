import { openSection } from "./js/openSection";
import { getDate } from "./js/getDate";
import { Keyboard } from "./js/Keyboard";
import { Autocomplete, searchCountryWithClick } from "./js/Autocomplete";
import { array1 } from "./js/apiCountry";
import { getDateCountries } from "./js/apiCountry";
import { getChart } from "./js/chart";
// import { getGlobalData, prepare } from "./js/dataService"
import './js/map'


window.addEventListener('DOMContentLoaded', () => {

    getDateCountries()

    //график
    getChart();

    // развернуть секцию на весь экран
    openSection();


    //update date
    getDate();

    //keyboard
    Keyboard.init();

    Autocomplete('#input-select', array1);

    searchCountryWithClick()


});