export const array1 = [] // массив самих стран
const arrayList = [] // массив обьектов с информациях о странах
let globalValues
    // дефолтные свойства, по которым изначально все сортируется
let sortPropertyCases = "Total Cases"
let sortPropertyDeathes = "Deathes"
let sortPropertyRecovered = "Recovered"

// глобальные данные для мира
const globalCases = document.querySelector('.cases')
const globalDeathes = document.querySelector('.deathes')
const globalRecovered = document.querySelector('.recovered')

// каждый список с общими случаями, смертями и выздоравлениями
const listCases = document.querySelector('.list_of_countries_cases')
const listDeathes = document.querySelector('.list_of_countries_deathes')
const listRecovereds = document.querySelector('.list_of_countries_recovered')

// заголовки, содержащие информацию, которая отражена в списке
const headlineCases = document.querySelector('.headline_cases')
const headlineDeathes = document.querySelector('.headline_deathes')
const headlineRecovereds = document.querySelector('.headline_recovered')

// кнопки перелистывания право
const nextButtonCases = document.querySelector('.right-button-cases')
const nextButtonDeathes = document.querySelector('.right-button-deathes')
const nextButtonRecovered = document.querySelector('.right-button-recovered')

// кнопки перелистывания влево
const prevButtonCases = document.querySelector('.left-button-cases')
const prevButtonDeathes = document.querySelector('.left-button-deathes')
const prevButtonRecovered = document.querySelector('.left-button-recovered')

// свойства, по которым сортируются общие случаи
const propsCases = [
    "Total Cases",
    "Today Cases",
    "Today Cases/100th",
    "Total Cases/100th"
]

// свойства, по которым сортируются выздоровленные
const propsRecovered = [
    "Recovered",
    "Today Recovered",
    "Today Recovered/100th",
    "Recovered/100th"
]

// свойства, по которым сортируются смерти
const propsDeathes = [
    "Deathes",
    "Deathes/100th",
    "Today Deathes",
    "Today Deathes/100th"
]

export const getDateCountries = () => {

    // получаем список стран
    getAllCountries(array1)
        // получаем глобальные переменные
    getGlobalValues();

}

// функция получения информации о стране по API
async function getListCountries(array) {

    for (let i = 0; i < array.length; i++) {

        const countryName = array[i]
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
                "Total Cases/100th": Math.ceil((data.cases / data.population) * 10 ** 5),
                "Deathes/100th": Math.ceil((data.deaths / data.population) * 10 ** 5),
                "Recovered/100th": Math.ceil((data.recovered / data.population) * 10 ** 5),
                "Today Cases/100th": Math.ceil((data.todayCases / data.population) * 10 ** 5),
                "Today Deathes/100th": Math.ceil((data.todayDeaths / data.population) * 10 ** 5),
                "Today Recovered/100th": Math.ceil((data.todayRecovered / data.population) * 10 ** 5)

            })
        }


    }
    // создаем те самые списки стран 
    createList(arrayList, sortPropertyCases, listCases, headlineCases)
    createList(arrayList, sortPropertyDeathes, listDeathes, headlineDeathes)
    createList(arrayList, sortPropertyRecovered, listRecovereds, headlineRecovereds)

    nextButtonCases.addEventListener('click', () => {
        sortPropertyCases = nextList(sortPropertyCases, propsCases, arrayList, listCases, headlineCases)
    })
    nextButtonDeathes.addEventListener('click', () => {
        sortPropertyDeathes = nextList(sortPropertyDeathes, propsDeathes, arrayList, listDeathes, headlineDeathes)
    })
    nextButtonRecovered.addEventListener('click', () => {
        sortPropertyRecovered = nextList(sortPropertyRecovered, propsRecovered, arrayList, listRecovereds, headlineRecovereds)
    })

    prevButtonCases.addEventListener('click', () => {
        sortPropertyCases = prevList(sortPropertyCases, propsCases, arrayList, listCases, headlineCases)
    })
    prevButtonDeathes.addEventListener('click', () => {
        sortPropertyDeathes = prevList(sortPropertyDeathes, propsDeathes, arrayList, listDeathes, headlineDeathes)
    })
    prevButtonRecovered.addEventListener('click', () => {
        sortPropertyRecovered = prevList(sortPropertyRecovered, propsRecovered, arrayList, listRecovereds, headlineRecovereds)
    })

}
// высчитывание индекса, свойства которое должно вывести следующим
function nextList(prop, arrayProps, array, element, headline) {
    let index = arrayProps.indexOf(prop)
    if (index == arrayProps.length - 1) {
        index = 0
    } else {
        index = index + 1
    }

    createList(array, arrayProps[index], element, headline)
    getGlobalValues()
    return arrayProps[index]
}
// высчитывание индекса, свойства которое было до этого 
function prevList(prop, arrayProps, array, element, headline) {
    let index = arrayProps.indexOf(prop)
    if (index === 0) {
        index = arrayProps.length - 1
    } else {
        index -= 1
    }

    createList(array, arrayProps[index], element, headline)
    getGlobalValues()
    return arrayProps[index]
}

// получения списка 101 страны из API
async function getAllCountries(array) {
    const resu = await fetch(`https://corona.lmao.ninja/v2/countries/`);
    const data = await resu.json();
    data.sort((prev, next) => next.cases - prev.cases)
    for (let i = 0; i <= 100; i++) {
        array.push(data[i].country)

    }

    getListCountries(array)
}

// получение из API и вывод глобльных данных 
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
        "Total Cases/100th": Math.ceil((data.cases / data.population) * 10 ** 5),
        "Deathes/100th": Math.ceil((data.deaths / data.population) * 10 ** 5),
        "Recovered/100th": Math.ceil((data.recovered / data.population) * 10 ** 5),
        "Today Cases/100th": Math.ceil((data.todayCases / data.population) * 10 ** 5),
        "Today Deathes/100th": Math.ceil((data.todayDeaths / data.population) * 10 ** 5),
        "Today Recovered/100th": Math.ceil((data.todayRecovered / data.population) * 10 ** 5)

    }
    const valueCases = globalValues[sortPropertyCases].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
    const valueDeathes = globalValues[sortPropertyDeathes].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
    const valueRecovered = globalValues[sortPropertyRecovered].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')


    globalCases.innerHTML = valueCases
    globalDeathes.innerHTML = valueDeathes
    globalRecovered.innerHTML = valueRecovered


}


// создаем список стран
function createList(array, prop, element, headline) {
    headline.innerHTML = prop
    element.innerHTML = ''
    let sortArray = array.sort((prev, next) => next[prop] - prev[prop])
    const list = document.createElement('ul')
    list.className = 'case-country'
    for (let i = 0; i < sortArray.length; i++) {
        const li = document.createElement('li')
        let value = sortArray[i][prop].toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')

        li.className = 'country'
        li.innerHTML = `<span class="color-prop">${value}</span> <span><img class="map-icon" src="${sortArray[i].Flag}" alt="icon map" > </span>
                        <span>${sortArray[i].Country}</span>`
        list.append(li)
    }

    element.append(list)

}