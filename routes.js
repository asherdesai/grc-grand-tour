const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const Entry = require('./models/entry')
const Coordinate = require('./models/coordinate');
const coordinate = require('./models/coordinate');

router.get("/", async (req, res) => {
    let entryDocs = await Entry.aggregate([{
        $group: {
            _id: null,
            amount: { $sum: "$miles"}
        }
    }]);

    let maxDistDocs = await Coordinate.aggregate([{
        $group: {
            _id: null,
            max: { $max: "$dist" }
        }
    }]);

    let maxDist = maxDistDocs[0].max;

    let coordinateDocs = await Coordinate.find({
        dist: { $gte: (entryDocs[0].amount % maxDist) }
    }).exec();
    
    res.render('index.ejs', {
        coord: coordinateDocs[0],
        total: entryDocs[0].amount.toFixed(2)
    });
});

router.post("/submit", async (req, res) => {
    const entry = new Entry({
        name: req.body.name,
        miles: Number(req.body.miles)
    })
    await entry.save();
    await res.redirect("/");
});

module.exports = router;