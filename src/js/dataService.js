import covidData from './data/covid-data-2020-12-22.json';


export const getGlobalData = () => {
    return covidData.GlobalData.reverse();
}

// export const getGlobalData = async() => {
//     const data = await fetch("./data/covid-data-2020-12-22.json")
//     .then(res => res.json())

//     const globalData = data.GlobalData.reverse();


//     return globalData;
// }

export const prepare = (data) => {
    return data.map(item => {
        return {
            ...item,
            // Date: new Date(item.Date)
            Date: moment(item.Date, 'YYYY-MM-DDThh:mm:ss')
        }

    })
}