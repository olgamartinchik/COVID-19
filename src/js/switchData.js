export const switchData = () => {

    getSliderGlobalCase();
    getSliderGlobalDeaths();
    getSliderGlobalRecovered();
}

const getSliderGlobalCase = () => {
    let sliderGlobal = document.querySelectorAll('.slide-global');
    let current = 0;

    function flipSliderCase() {
        for (let i = 0; i < sliderGlobal.length; i += 1) {
            sliderGlobal[i].classList.add('opacity0');
        }
        sliderGlobal[current].classList.remove('opacity0');
    }
    flipSliderCase();

    document.querySelector('.global-case-left').addEventListener('click', (e) => {
        if (current - 1 === -1) {
            current = sliderGlobal.length - 1;
        } else {
            current -= 1;
        }
        flipSliderCase();
    });
    document.querySelector('.global-case-right').addEventListener('click', (e) => {
        if (current + 1 === sliderGlobal.length) {
            current = 0;
        } else {
            current += 1;
        }
        flipSliderCase();
    });

}
const getSliderGlobalDeaths = () => {
    let sliderDeaths = document.querySelectorAll('.slider-deaths');
    let current = 0;

    function flipSliderDeaths() {
        for (let i = 0; i < sliderDeaths.length; i += 1) {
            sliderDeaths[i].classList.add('opacity0');
        }
        sliderDeaths[current].classList.remove('opacity0');
    }
    flipSliderDeaths();

    document.querySelector('.deaths-left').addEventListener('click', (e) => {
        if (current - 1 === -1) {
            current = sliderDeaths.length - 1;
        } else {
            current -= 1;
        }
        flipSliderDeaths();
    });
    document.querySelector('.deaths-right').addEventListener('click', (e) => {
        if (current + 1 === sliderDeaths.length) {
            current = 0;
        } else {
            current += 1;
        }
        flipSliderDeaths();
    });

}

const getSliderGlobalRecovered = () => {
    let sliderRecovered = document.querySelectorAll('.slide-recovered');
    let current = 0;

    function flipSliderRecovered() {
        for (let i = 0; i < sliderRecovered.length; i += 1) {
            sliderRecovered[i].classList.add('opacity0');
        }
        sliderRecovered[current].classList.remove('opacity0');
    }
    flipSliderRecovered();

    document.querySelector('.recovered-left').addEventListener('click', (e) => {
        if (current - 1 === -1) {
            current = sliderRecovered.length - 1;
        } else {
            current -= 1;
        }
        flipSliderRecovered();
    });
    document.querySelector('.recovered-right').addEventListener('click', (e) => {
        if (current + 1 === sliderRecovered.length) {
            current = 0;
        } else {
            current += 1;
        }
        flipSliderRecovered();
    });

}