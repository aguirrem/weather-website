
const request = require('request')



const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/609f2cb8f0ad73d40ab4dbd377a121d9/'+ latitude + ',' + longitude
    //using de-structuring
    request({url, json: true}, (error,{body}) => {
    
        // console.log(response.body.currently)
        if(error){
            callback('unable to connec to weather service!')
        }else if (body.error){
            callback('unable to find location!')
        }else{
            const current = body.currently
            const result = `${body.daily.data[0].summary} It is currently ${current.temperature} degrees out. There is a ${current.precipProbability}% probability of rain. Current visibility is ${current.visibility}`
            callback(undefined,result)
        }

    })

}

module.exports = forecast