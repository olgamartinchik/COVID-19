console.log('map')
<<<<<<< HEAD
=======
let sortPropertyCases = "Total Cases"
let sortPropertyDeathes = "Deathes"
let sortPropertyRecovered = "Recovered"

>>>>>>> 5c05f28bbda5a28e19ebd421f509ca79199eeff9

import { getAllCountries, getListCountries } from './apiCountry'
let mapOptions = {
    center: [0, 0],
    zoom: 2
}

// Creating a map object
let map1 = new L.map('map', mapOptions);
<<<<<<< HEAD
console.log('xxxxxxxx:' + map1);
=======
console.log(map1);
>>>>>>> 5c05f28bbda5a28e19ebd421f509ca79199eeff9
// Creating a Layer object
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

// Adding layer to the map
map1.addLayer(layer);



const arrayCountries = []
<<<<<<< HEAD

getAllCount(arrayCountries)

console.log('map: ' + arrayCountries)


=======
getAllCount(arrayCountries)

>>>>>>> 5c05f28bbda5a28e19ebd421f509ca79199eeff9





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
<<<<<<< HEAD
            cases: data[i].cases
        })
    }

    for (let i = 0; i < array.length; i++) {
        //let circleCenter = [array[i].lat, array[i].long];
        let size = 5000
        if (data[i].cases >= 100000) {
            size = 25000
        } else if (data[i].cases >= 250000) {
            size = 55000
        } else if (data[i].cases >= 400000) {
            size = 75000
        } else if (data[i].cases >= 500000) {
            size = 85000
        } else if (data[i].cases >= 1000000) {
            size = 90000
        }
        /*let circleOptions = {
                color: 'red',
                fillColor: 'red',
=======
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

    let color = "red"
    createMarkers(sortPropertyCases, array, color)

}

function createMarkers(prop, array, color) {
    for (let i = 0; i < array.length; i++) {
        let circleCenter = [array[i].lat, array[i].long];
        let size = 5000
        if (array[i][prop] >= 100000) {
            size = 25000
        } else if (array[i][prop] >= 250000) {
            size = 55000
        } else if (array[i][prop] >= 400000) {
            size = 75000
        } else if (array[i][prop] >= 500000) {
            size = 85000
        } else if (array[i][prop] >= 1000000) {
            size = 90000
        }
        let circleOptions = {
                color: color,
                fillColor: color,
>>>>>>> 5c05f28bbda5a28e19ebd421f509ca79199eeff9
                fillOpacity: 0.7
            }
            // Creating a circle
        let circle = L.circle(circleCenter, size, circleOptions);
<<<<<<< HEAD
        circle.bindPopup(`${data[i].name}`).openPopup();
        circle.addTo(map1);*/
        var marker = L.marker([array[i].lat, array[i].long]);

        // Adding marker to the map
        marker.bindPopup(`${array[i].name} \n ${array[i].cases}`).openPopup();
        marker.addTo(map1);
        // Adding marker to the map
        console.log('nnnnnnn: ' + typeof marker)


    }
}
=======

        circle.bindPopup(`${array[i].name}  (${prop}: ${array[i][prop]})`)
        circle.addTo(map1);
    }
}
   


>>>>>>> 5c05f28bbda5a28e19ebd421f509ca79199eeff9
