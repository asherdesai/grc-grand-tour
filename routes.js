const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const Entry = require('./models/entry')
const Coordinate = require('./models/coordinate');

router.get("/", async (req, res) => {
    let entryDocs = await Entry.aggregate([
        { $group: {
            _id: null,
            amount: { $sum: "$miles"} }
    }]);
    console.log("Aggregated total miles");

    let maxDist = 11355.9;

    let coordinateDocs = await Coordinate.find({
        dist: { $gte: (entryDocs[0].amount % maxDist), $lt: (entryDocs[0].amount % maxDist + 1) }
    }).exec();
    console.log("Aggregated coordinates and delivered current");
    
    res.render('index.ejs', {
        coord: coordinateDocs[0],
        total: entryDocs[0].amount.toFixed(2)
    });
});

router.post("/submit", async (req, res) => {
    const entry = new Entry({
        name: req.body.name,
        miles: Number(req.body.miles)
    });
    console.log("Posted miles");

    await entry.save();
    await res.redirect("/");
    console.log("Redirect made");
});

module.exports = router;