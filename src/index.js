import { openSection } from "./js/openSection";
import { getDate } from "./js/getDate";
// import { Keyboard } from "./js/Keyboard";
import { Autocomplete } from "./js/Autocomplete";
import { array1 } from "./js/apiCountry";
import { getDataCountries } from "./js/apiCountry";
// import { chart } from "./js/chart"


window.addEventListener('DOMContentLoaded', () => {
    // развернуть секцию на весь экран
    openSection();


    //update date
    getDate();

    //keyboard
    // Keyboard.init();

    Autocomplete('#input-select', array1);

    // chart();

    getDataCountries()

});