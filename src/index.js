import { openSection } from "./js/openSection";
import { switchData } from "./js/switchData";
import { getDate } from "./js/getDate";
// import { Keyboard } from "./js/Keyboard";
import { Autocomplete } from "./js/Autocomplete";
import { array1 } from "./js/Autocomplete";
// import { chart } from "./js/chart"


window.addEventListener('DOMContentLoaded', () => {
    // развернуть секцию на весь экран
    openSection();

    // слайдер
    switchData();

    //update date
    getDate();

    //keyboard
    // Keyboard.init();

    Autocomplete('#input-select', array1);
    // chart();


});