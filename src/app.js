const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()
const port = process.env.PORT || 3001

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//console.log(publicDirectoryPath)

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Salman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us Page',
        name: 'Salman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Salman',
        helpText: 'This is some helpful text'
    })
})

app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide the address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            //console.log(error)
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }

            return res.send({
                'forecast': forecastData, 
                'location': location,
                'address': req.query.address
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Salman',
        errorMessage: 'Help artical not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Salman',
        errorMessage: 'Page Not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})