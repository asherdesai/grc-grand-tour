const mongoose = require('mongoose')

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

module.exports = mongoose.model("Coordinate", CoordinateSchema, 'north-georgia-coords');