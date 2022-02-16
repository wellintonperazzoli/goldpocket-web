const chartcolors = [
    "rgba(87, 95, 207, 1)",
    "rgba(39, 174, 96, 1)",
    "rgba(172, 98, 206, 1)",
    "rgba(86, 207, 191, 1)",
    "rgba(73, 80, 87, 1)",
    "rgba(20, 23, 161, 1)",
    "rgba(0, 121, 6, 1)",
    "rgba(201, 106, 89, 1)",
    "rgba(212, 170, 0, 1)",
]

export const transparentize = (color, alfa) => color.replace(", 1)", ", " + alfa.toString() + " )")


export const getBarData = (apiData) => {
    var datasets = []
    for (var i = 0, c = 0; i < apiData.datasets.length; i++, c++) {
        if (c >= chartcolors.length) c = 0;
        datasets[i] = {
            label: apiData.datasets[i].label,
            data: apiData.datasets[i].data,
            backgroundColor: transparentize(chartcolors[c], 0.7),
            borderColor: chartcolors[c],
            minBarLength: 2,
            borderRadius: 2,
            borderWidth: 1
        };
    }
    return {
        labels: apiData.labels,
        datasets: datasets
    }
}

export const getDoughnutData = (apiData) => {
    var datasets = [{
        label: "Doughnut Chart",
        data: apiData.datasets,
        backgroundColor: []
    }];

    for (var i = 0, c = 0; i < datasets[0].data.length; i++, c++) {
        if (c >= chartcolors.length) c = 0;
        datasets[0].backgroundColor[i] = transparentize(chartcolors[c], 0.7);
    }

    return {
        labels: apiData.labels,
        datasets: datasets
    }
}


const dataFrom = {
    bar: getBarData,
    line: getBarData,
    doughnut: getDoughnutData
}

export const getChartConfig = (type, apiData) =>
    [
        dataFrom[type](apiData),
        {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
        }
    ]

