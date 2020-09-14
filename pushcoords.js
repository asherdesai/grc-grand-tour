const mongoose = require('mongoose');
const fs = require('fs');
//const dbConfig = require('./config');
const dotenv = require('dotenv').config({path: `${__dirname}/.env`})

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.dcot0.mongodb.net/grc-grand-tour?retryWrites=true&w=majority`;

mongoose.connect(uri, {useNewUrlParser: true})
    .then(() => console.log("success"))
    .catch((error) => console.log(error));

const coordinates = JSON.parse(fs.readFileSync(__dirname + '/grandtour.json', 'utf-8'));

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

const Coordinate = mongoose.model('coordinate' , CoordinateSchema ,'full-route');

Coordinate.insertMany(coordinates);