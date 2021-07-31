const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middlewares/auth');
const usersController = require('./controllers/usersController');
const excursionController = require('./controllers/excursionController');


start();

async function start() {
    await new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost:27017/travelAgency',
            { useNewUrlParser: true, useUnifiedTopology: true })
        const db = mongoose.connection;
        db.on('error', (err) => { console.error('connection error:'); reject(err); });
        db.once('open', function () {
            console.log(`database connected!`);
            resolve();
        })
    });
    const app = express();

    app.use(cors());
    app.use(auth());
    app.use(express.json());//includes body-parser in json


    app.use('/users', usersController);
    app.use('/excursion', excursionController);
    app.get('/', (req, res) => {
        res.send('Send requests to /api');
    });

    app.listen(3030, () => console.log(`server running at 3030`));
}
