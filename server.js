const express = require('express');
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

var port = process.env.PORT || 3000;
const connectionString = "mongodb+srv://primary-user:2Ek7L5KJ7mdtxNbe@cluster0.dcot0.mongodb.net/grc-grand-tour?retryWrites=true&w=majority";

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
})
    .then(client => {
        console.log("Connected to database successfully");
        const db = client.db("grc-grand-tour");
        const entries = db.collection("mileage-tracker-entries");

        app.set('view-engine', 'ejs');

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(express.static(__dirname + '/public'));

        app.get('/', (req, res) => {
            db.collection("mileage-tracker-entries").aggregate([
                { $group: {
                    _id: 1,
                    all: { $sum: '$miles' }
                    }
                }
            ]).toArray()
                .then(result => {
                    res.render('index.ejs', { total: result[0].all });
                })
                .catch(error => console.error(error));
        });

        app.post('/submit', (req, res) => {
            console.log("Post request made");
            let entry = req.body;
            entry.miles = Number(entry.miles);
            entries.insertOne(entry)
                .then(result => res.redirect('/'))
                .catch(error => console.error(error));
        });

        app.listen(port, () => {
            console.log(`Server running at port ${port}`);
        });
    })
    .catch(error => console.error(error));