console.log('map')
let propIndex = 0
let circle
const propsCases = [
    "Total Cases",
    "Today Cases",
    "Today Cases/100th",
    "Total Cases/100th",
    "Recovered",
    "Today Recovered",
    "Today Recovered/100th",
    "Recovered/100th",
    "Deathes",
    "Deathes/100th",
    "Today Deathes",
    "Today Deathes/100th"
]

const head = document.querySelector('.headline')

const colors = [
    "red",
    "red",
    "red",
    "red",
    "green",
    "green",
    "green",
    "green",
    "orange",
    "orange",
    "orange",
    "orange"
]
import { getAllCountries, getListCountries } from './apiCountry'
let mapOptions = {
    center: [0, 0],
    zoom: 2
}

// Creating a map object
let map1 = new L.map('map', mapOptions);
console.log(map1);
// Creating a Layer object
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

// Adding layer to the map
map1.addLayer(layer);



const arrayCountries = []
getAllCount(arrayCountries)






async function getAllCount(array) {
    const resu = await fetch(`https://corona.lmao.ninja/v2/countries/`);
    const data = await resu.json();
    data.sort((prev, next) => next.cases - prev.cases)
    console.log(data);
    for (let i = 0; i <= 100; i++) {
        array.push({
            name: data[i].country,
            lat: data[i].countryInfo.lat,
            long: data[i].countryInfo.long,
            "Total Cases": data[i].cases,
            "Deathes": data[i].deaths,
            "Recovered": data[i].recovered,
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


    createMarkers(propsCases[propIndex], array, colors[propIndex])
    document.querySelector('.left-map').addEventListener('click', () => {

        propIndex = prevMap(propIndex, propsCases, array, head)
    })
    document.querySelector('.right-map').addEventListener('click', () => {

        propIndex = nextMap(propIndex, propsCases, array, head)
    })


}

function nextMap(index, arrayProps, array, headline) {

    if (index == arrayProps.length - 1) {
        index = 0
    } else {
        index = index + 1
    }
    headline.innerHTML = arrayProps[index]

    createMarkers(propsCases[propIndex], array, colors[index])
    return index
}
// высчитывание индекса, свойства которое было до этого 
function prevMap(index, arrayProps, array, headline) {

    if (index === 0) {
        index = arrayProps.length - 1
    } else {
        index -= 1
    }
    headline.innerHTML = arrayProps[index]

    createMarkers(propsCases[propIndex], array, colors[index])
    return index
}

function createMarkers(prop, array, color) {
    for (let i = 0; i < array.length; i++) {
        let circleCenter = [array[i].lat, array[i].long];
        let size = 50000
        if (array[i][prop] >= 100000) {
            size = 65000
        } else if (array[i][prop] >= 250000) {
            size = 75000
        } else if (array[i][prop] >= 400000) {
            size = 85000
        } else if (array[i][prop] >= 500000) {
            size = 95000
        } else if (array[i][prop] >= 1000000) {
            size = 105000
        }
        let circleOptions = {
            color: color,
            fillColor: color,
            fillOpacity: 0.7
        }

        // Creating a circle
        circle = L.circle(circleCenter, size, circleOptions);

        circle.bindPopup(`${array[i].name}  (${prop}: ${array[i][prop]})`)
        circle.addTo(map1);
    }
}