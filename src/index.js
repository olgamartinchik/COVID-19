import { openSection } from "./js/openSection";
import { switchData } from "./js/switchData";
import { getDate } from "./js/getDate";
import { Keyboard } from "./js/Keyboard"

window.addEventListener('DOMContentLoaded', () => {
    // развернуть секцию на весь экран
    openSection();

    // слайдер
    switchData();

    //update date
    getDate();

    //keyboard
    Keyboard.init();

});