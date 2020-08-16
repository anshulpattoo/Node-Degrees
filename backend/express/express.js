// import {mainJob} from  './dcp-express';
// server.js
// const test = require('./test');
// let val = test.hello(); // val is "Hello" 

// import dcp-express
// const dcp = require('./dcp');

var express = require('express')
var bodyParser = require('body-parser')
const path = require('path');

var app = express()
const router = express.Router();

console.log(__dirname)
app.use(express.static(__dirname + '/public'));

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.get('/', urlencodedParser, function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
})

// POST /login gets urlencoded bodies
app.get('/welcome', urlencodedParser, function (req, res) {
  res.send('welcome,')
})

// POST /api/users gets JSON bodies
app.get('/compute', jsonParser,async function (req, res) {
  // create user in req.body

  // try to run dcp compute
  // return json result
  try {
    const ret = await dcp.dcp();
    res.json(ret)
  } catch (error) {
    // Passes errors into the error handler
     console.log(error);
  }
})

app.get('/repo_connections', jsonParser,async function (req, res) {
  // create user in req.body

  // try to run dcp compute
  // return json result
  try {
    const ret = await dcp.dcp();
    res.json(ret)
  } catch (error) {
    // Passes errors into the error handler
     console.log(error);
  }
})

app.use('/', router);
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});