const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// render objects in HTML
app.set('view engine', 'ejs')

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// define a simple route
app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// define a simple route
app.get('/create.html', (req, res) => {
    res.sendFile(__dirname + '/create.html');
});

app.post('/createProvider', (req, res) => {
	console.log('Create Provider...');
	console.log(req.body);
});

// Require Providers routes
require('./app/routes/provider.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});