var http = require("http");
var fs = require('fs');
var mysql = require("mysql");
var port = 3000;
var serverUrl = "127.0.0.1";
var counter = 0;

const request = require('request');

var server = http.createServer(function(req, res)
{
  counter++;
  console.log("Request: " + req.url + " (" + counter + ")");

  if(req.url == "/index.html")
  {
    fs.readFile("index.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url == "/upload.html")
  {
    fs.readFile("upload.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url == "/download.html")
  {
    fs.readFile("download.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else
  {
    //TODO: err page goes here
    res.setHeader("Content-Type", "text/html");
    res.end("<p>Hello World. Request counter: " + counter + ".</p>");
  }
});

var con = mysql.createConnection({
  host: "localhost", //localhost
  user: "fbox",
  password: "fbox1234",
  port: "3306"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to DB!");
});

console.log("Starting web server at " + serverUrl + ":" + port);
server.listen(port, serverUrl);
