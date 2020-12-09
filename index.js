// import express
const express = require('express');
const { request, response } = require('express');
const Datastore  =  require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

console.log(process.env);

// init express
const app = express();
const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`listening at ${port}`));

// want this app to server web pages
// server 1 page index.html

//https://www.youtube.com/watch?v=q-lUgFxwjEM

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database  = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) =>  {
        response.json(data);
    });    
});



app.post('/api', (request, response) => {
    console.log(request);
    console.log('good day');
    const timestamp =  Date.now();
    const data = request.body;
    console.log(request.body)
    data.timestamp =  timestamp;
    console.log(data);
    database.insert(data);
    response.json({
        status: 'Success',
        'latitude': data.lat,
        'longitude': data.long,
        'message':data.input
    });
});

app.get('/weather/:latlon', async (request, response) => {
        const latlon = request.params.latlon.split(',');
        const lat = latlon[0];
        const lon = latlon[1];
        const api_key  = process.env.API_KEY;
        console.log(process.env.API_KEY)

        const weather_url = `https://api.climacell.co/v3/weather/realtime?lat=${lat}&lon=${lon}&unit_system=us&fields=precipitation%2Ctemp%2Chumidity&apikey=${api_key}`;
        const weather_response = await fetch(weather_url);
        const weather_data = await weather_response.json();
       

        const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
        const aq_response = await fetch(aq_url);
        const aq_data = await aq_response.json();

        const data = {
            weather: weather_data,
            air_quality: aq_data

        }
        response.json(data);
    
});