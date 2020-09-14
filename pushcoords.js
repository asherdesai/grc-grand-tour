const mongoose = require('mongoose');
const fs = require('fs');
const dbConfig = require('./config');

mongoose.connect(dbConfig.url, {useNewUrlParser: true})
    .then(() => console.log("success"))
    .catch((error) => console.log(error));

const coordinates = JSON.parse(fs.readFileSync(__dirname + '/northgeorgiatour.json', 'utf-8'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    
});

const CoordinateSchema = new mongoose.Schema({
    "lat": {
        type: Number
    },
    "lon": {
        type: Number
    },
    "dist": {
        type: Number
    }
});

const Coordinate = mongoose.model('coordinate' , CoordinateSchema ,'north-georgia-coords');

Coordinate.insertMany(coordinates);