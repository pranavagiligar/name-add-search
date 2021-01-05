/**
 * Installation steps
 * 1. Install "nodejs" and "npm"
 * 2. Save this file in a directory called "server"
 * 3. run bellow commands in the same directory ("server")
 *      npm install express
 *      npm install body-parser
 */

// imports
var express = require("express");
const bodyParser = require('body-parser');

// database
var list = ["Tony","Lisa","Michael","Ginger","Food"]

// express object creation also know as http server object creation
var app = express();

// adding json body parser to decode json data in post request
app.use(bodyParser.json()); 

// server creation on port 3000
app.listen(3000, serverHasStared);

// server start callback. May be used for database initialization, etc..
function serverHasStared() {
    console.log("Server running on port 3000");
}

// Adding this middleware is only for development purpose: (Ignore for now)
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// =========== API end point declaration ============
// http://localhost:3000/names
app.get("/names", provideNames);

// http://localhost:3000/filter-names?initial=p
app.get("/filter-names", provideFilteredNames);

/**
 * api: http://localhost:3000/save
 * Content-Type: application/json
 * body: {
 *      names: [
 *         "A", "B"
 *      ]
 * }
 */
app.post("/save", saveNames) 
// ==================================================

// callback functions
function provideNames(req, res, next) {
    res.json(list);
}

function provideFilteredNames(req, res, next) {
    let char = req.query.initial
    var resList = []
    for (var i = 0; i < list.length; i++) {
        if (list[i].startsWith(char)) {
            resList.push(list[i])
        }
    }

    res.json(resList)
    //res.json(list.filter(name => name.startsWith(char)));
}

function saveNames(req, res) {
    let b = req.body.names
    list = list.concat(b)
    res.json({"status": "success"});
}