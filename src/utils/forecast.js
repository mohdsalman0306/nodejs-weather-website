const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8c83bfbb818f249cb02fe74d60f99223&query=' + longitude + ',' + latitude + '&units=m'
    console.log(url)
    request.get({url, json:true}, (error, {body} = {}) => {
        if(error) {
            callback("Unable to connect the wheather service", undefined)
        } else if(body.error) {
            callback('Unable to find the location', undefined)
        } else {
            const weatherDesc = body.current.weather_descriptions;
            callback(undefined, weatherDesc[0] + "! It is currently " + body.current.temperature + " degree, and feels like " + body.current.feelslike + " degree")
        }
    })
}


module.exports = forecast