const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const getgeo = require('./utils/geocode')
const forcast = require('./utils/forecast')

//Define paths for Express config..
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialPatch = path.join(__dirname, '../template/partials')

//Setup handelbars engin view location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPatch)

//Setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: "Rishi Raj"
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: "This is dummy one more",
        name: "Rishi Raj"
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        message: 'This is help dynamic screen has created',
        title: "Help",
        name: "Rishi"
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide us address?"
        })
    }
    let address = req.query.address;
    getgeo(address, (error, {latitude,longitide,location} = {}) => {
        if(latitude && longitide) {
            forcast(latitude,longitide, (error,{currentTemp} ={}) => {
                if(currentTemp){
                    res.send({
                        weather: currentTemp,
                        location: location,
                        address: address
                    })
                } else {
                    return res.send({
                        error: error
                    })
                }
            })
        } else {
            return res.send({
                error: error
            })
        }
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send( {
            error: "You must provide a search term"
        })
    } 
    res.send({
        product: []
    })

})
app.get('/help/*', (req,res) => {
    res.render('404', {
        errorMsg: "Help artical not found",
        name: "Rishi Raj",
        title: "404"
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        errorMsg: "Page not found",
        name: "Rishi Raj",
        title: "404"
    })
})
//app.com
//app.com/help
//app.com/about

//Start The server up...
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})