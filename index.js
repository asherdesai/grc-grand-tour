const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const dotenv = require('dotenv').config({path: `${__dirname}/.env`})
const routes = require('./routes');

var port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.dcot0.mongodb.net/grc-grand-tour?retryWrites=true&w=majority`;

mongoose
    .connect(uri, {useNewUrlParser: true})
    .then(() => {
        const app = express();

        app.use(express.static(__dirname + '/public'));
        app.use(bodyParser.json()); // support json encoded bodies
        app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
        app.use("/", routes);

        app.listen(port, () => {
            console.log(`Server running at port ${port}`);
        });
    })
    .catch((error) => console.log(error));
