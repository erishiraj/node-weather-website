const request = require('request');

const getForecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9375d3f39d0c183757a03bd4ec21acba/' + latitude + ','+longitude

    request({url, json: true},(error, {body}) => {
        const {daily,currently} = body
        const {precipProbability,apparentTemperature} = currently
        if(error) {
            callback("Unable to connect to weather service..", undefined)
        } else if (body.error){
            callback("Unable to find this Address...", undefined)
        } else {
            callback(undefined, {
                summary: daily.data[0].summary,
                currentTemp: apparentTemperature,
                precipPro: precipProbability
            })
        }
    })
}

module.exports = getForecast