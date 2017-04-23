var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");
var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,

        user: "root",
        password: "",
        database: "tables_db"
    });
    connection.connect(function (err) {
        if (err) {
            console.log(err)
        }
});

var app = express();
var PORT = 8080;

var tables = [{
  name:"Michelle",
  number: "510-555-555",
  email: "michelleingroup@github.com",
  uid: "345fewe"
},
{
  name: "Michael",
  number: "510-546-4590",
  email: "misha@contact.com",
  uid: "7YrtF"
}]

var available = 5 - tables.length;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res){
  res.sendFile(path.join(__dirname, "tables.html"))
});

app.get("/reserve", function(req, res){
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api", function(req, res) {
  connection.query("SELECT * FROM tables", function(err,response){
    if (err) throw err;
    return res.json(response);
  })
});

app.post("/api/new", function(req, res) {
  var newReservation = req.body;
  console.log(req.body);
  console.log(req.body.name);
  var userInput = {name: req.body.name, email: req.body.email, number: req.body.phone, uid: req.body.id };
  connection.query("INSERT INTO tables SET ?", userInput, function(err, res){
    if(err) throw err;
    console.log(res);
});


  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);
  tables.push(newReservation);

});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
