console.log('map')

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
                fillOpacity: 0.7
            }
            // Creating a circle
        let circle = L.circle(circleCenter, size, circleOptions);
        circle.bindPopup(`${data[i].name}`).openPopup();
        circle.addTo(map1);*/
        var marker = L.marker([array[i].lat, array[i].long]);

        // Adding marker to the map
        marker.bindPopup(`${array[i].name} \n ${array[i].cases}`).openPopup();
        marker.addTo(map1);
        // Adding marker to the map


   }
}
