var http = require("http");
var fs = require('fs');
var port = 3000;
var serverUrl = "127.0.0.1";
var counter = 0;
const {parse} = require('querystring');
const request = require('request');

function collectRequestData(request, callback)
{
  console.log("getting data");
  const FORM_URLENCODED = 'application/x-www-form-urlencoded';
  if(request.headers['content-type'] === FORM_URLENCODED)
  {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      callback(parse(body));
    });
  }
  else
  {
    callback(null);
  }
}

var server = http.createServer(function(req, res)
{
  counter++;
  console.log("Request: " + req.url + " (" + counter + ")");

  if(req.method === 'POST')
  {
      collectRequestData(req, result => {
        console.log(result);
        res.end(`Parsed data belonging to ${result.fname}`);
    });
  }
  if(req.url == "/index.html")
  {
    fs.readFile("index.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url.startsWith("/upload.html")) //this is also viable
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
    // res.end("<p>Hello World. Request counter: " + counter + ".</p>");
  }
});

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost", //localhost
  user: "root",
  password: "filebox1234",
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to DB!");
});

console.log("Starting web server at " + serverUrl + ":" + port);
server.listen(port, serverUrl);
