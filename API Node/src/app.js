var bodyParser = require('body-parser')
const express = require('express');


const mongoose = require('mongoose');
require('dotenv').config();


// App
const app = express();

//app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
//app.use(bodyParser.json());

/*app.use(function(req, res, next) {
	
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, application/json, Accept");
  req.bodyParser.json();
  req.bodyParser.urlencoded({ extended: true });
  //next();
});*/
app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
//app.use(bodyParser.json());
//app.use(JSON.parse(bodyParser));


//console.log(req.body);


// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

// Load models
const Cadastro = require('./models/cadastro');

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);


const cadastroRoutes = require('./routes/cadastro-routes');
app.use('/cadastro', cadastroRoutes);

module.exports = app;
