const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const routes = require('./routes/feed');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

app.use('/images', express.static('images'));
app.use(bodyParser.json());

app.use(multer({ storage: fileStorage }).single("files"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use('/feed', routes);
mongoose.connect('mongodb+srv://root:root@ctscan.dy8cv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log("listening....");
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => console.log(err))
