const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//defines paths for express config
//www.expressjs.com
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handle bar engine
app.set('view engine','hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Melvin Aguirre'
    })
})   

app.get('/about', (req, res) => { 
    res.render('about',{
        title: 'about me',
        name: 'Melvin Aguirre'
    })
})   

app.get('/help', (req, res) => { 
    res.render('help',{
        title:'Help Page',
        message:'This is a help page',
        name: 'Melvin Aguirre'
    })
})   


app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error
            })
    
        }else{
            forecast(latitude, longitude, (error, forecastdata) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                return res.send({        
                    forecast:forecastdata,
                    location: location,
                    address: req.query.address
                })
            
            })
        }
    })    


})


app.get('/products', (req,res) =>{
    console.log(req.query)
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }else{
        
    }

    res.send({
        products: []
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        message:'Help Article not Found',
        name: 'Melvin Aguirre'
    })

})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        message: 'Page not found',
        name: 'Melvin Aguirre'
    })
})


app.listen(3000, () => {
    console.log("sever is up on port 3000")
})
//app.com/help