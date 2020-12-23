import { getGlobalData, prepare } from "./dataService.js"

export const getChart = () => {


    const ctx = document.getElementById('myChart').getContext('2d');


    const drawChart = (data) => {

            const preparedData = prepare(data);

            console.log(preparedData)

            const chartConfig = {
                type: 'line',
                data: {
                    labels: preparedData.map(item => item.Date),
                    datasets: [{
                            label: 'Deaths',
                            borderColor: 'rgba(255,143,52)',
                            background: 'rgba(255,143,52,0.6)',

                            data: preparedData.map(item => {
                                return {
                                    x: item.Date,
                                    y: item.Deces
                                };
                            })
                        },
                        {
                            label: 'Cases',
                            borderColor: 'rgba(230,0,0)',
                            background: 'rgba(230,0,0,0.3)',

                            data: preparedData.map(item => {
                                return {
                                    x: item.Date,
                                    y: item.Infection
                                };

                            })
                        },
                        {
                            label: 'Recovered',
                            borderColor: 'rgba(112,168,0)',
                            background: 'rgba(112,168,0,0.3)',

                            data: preparedData.map(item => {
                                return {
                                    x: item.Date,
                                    y: item.Guerisons
                                };
                            })

                        },
                    ]
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        }]
                    }
                }

            };

            console.log(chartConfig);

            const chart = new Chart(ctx, chartConfig)

        }
        // getGlobalData().then(data => {
        //     drawChart(data)
        // })
    drawChart(getGlobalData());

    const nextButton = document.querySelector('.diagram-right');
    const prevButton = document.querySelector('.diagram-left');




}