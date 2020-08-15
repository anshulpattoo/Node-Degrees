// import {mainJob} from  './dcp-express';
// server.js
const test = require('./test');
let val = test.hello(); // val is "Hello" 

// import dcp-express
const dcp = require('./dcp-express');

var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});