const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const Entry = require('./models/entry')

router.get("/", async (req, res) => {
    let docs = await Entry.aggregate([{
        $group: {
            _id: null,
            amount: { $sum: "$miles"}
        }
    }]);

    res.render('index.ejs', { total: docs[0].amount.toFixed(2) } );
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