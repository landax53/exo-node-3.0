const express = require("express");
const Datastore = require('nedb');
const app = express();
const fetch = require('node-fetch'); //npm install node-fetch
require('dotenv').config()

app.listen(3000, () => console.log('listening to 3000'));

app.use(express.static('public'));
app.use(express.json({ limit : '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({},(err,data) => {
        if (err) {
            response.end();
            return;
        }
        else {
            response.json(data)
        }
    });
  
});

app.get('/weather/:latlon',async (request, response) => { //ici le server.js va servir de proxy pour l'api, c'est le server qui va envoyer les données au client, et non l'api du site web car cela permet de ne pas avoir de pb de CORS
    const api_key =process.env.API_KEY;
    console.log(request.params);
    const latlon = request.params.latlon.split('&'); //on récupère les params de la requête du client et on séparer les deux param pour les distinguer
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    const api_url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
    const fetch_response= await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
});

app.post('/api', (request, response) => {
    console.log('I got a request !')
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
    console.log(data);

});
