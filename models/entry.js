const mongoose = require("mongoose")

const EntrySchema = new mongoose.Schema({
    "name": {
        type: String,
    },
    "miles": {
        type: Number,
    }
});

module.exports = mongoose.model("Entry", EntrySchema, 'mileage-tracker-entries');