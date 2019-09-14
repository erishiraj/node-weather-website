const request = require('request')

const getgeo = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZXJpc2hpcmFqIiwiYSI6ImNqenB3N2xoYzBodjIzam1pc2lxamFjZTcifQ.DUc-B_1jggtB2hk97R-ghA&limit=1'
    request({url, json: true}, (error,{body}) => {
        const {features} = body
        if(error){
            callback("Unable to connect server...",undefined);
        } else if(features.length === 0){
            callback("Unable to find location. Try another search",undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[0],
                longitide: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = getgeo