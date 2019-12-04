var http = require("http");
var fs = require('fs');
var formidable = require('formidable');
var port = 3000;
var serverUrl = "127.0.0.1";
var counter = 0;
const request = require('request');

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost", //localhost
  user: "root",
  password: "filebox1234",
});
con.connect(function(err) {
  if (err) throw err;
  console.log("connected to MySQL");
  con.query("USE filebox;", function (err, result) {
    if (err) throw err;
    console.log("connected to filebox DB");
  });
});

var server = http.createServer(function(req, res)
{
  counter++;
  console.log("Request: " + req.url + " (" + counter + ")");

  if (req.url == '/upload/upf')
  {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files)
    {
      var oldpath = files.filetoupload.path;
      var newpath = "../fb/public/" + files.filetoupload.name;
      // console.log(oldpath);
      // console.log(newpath);
      fs.rename(oldpath, newpath, function (err)
      {
        if (err) throw err;

        con.query("INSERT INTO files (name) VALUES ("+'"'+files.filetoupload.name+'"'+");", function (err, result)
        {
           if (err) throw err;
           console.log("added "+files.filetoupload.name+" to DB");
         });

         fs.readFile("upload.html", function(err, text)
         {
           res.setHeader("Content-Type", "text/html");
           res.end(text);
         });
      });
    });
  }
  else if(req.url == "/home" || req.url == "")
  {
    fs.readFile("index.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url.startsWith("/upload")) //this is also viable
  {
    fs.readFile("upload.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url == "/download")
  {
    fs.readFile("download.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url == "/nav.html")
  {
    fs.readFile("nav.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url == "/account.html")
  {
    fs.readFile("account.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else  //default case
  {
    fs.readFile("error.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
});

console.log("Starting web server at " + serverUrl + ":" + port);
server.listen(port, serverUrl);
