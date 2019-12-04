var http = require("http");
var fs = require('fs');
var formidable = require('formidable');
var port = 3000;
var serverUrl = "127.0.0.1";
var counter = 0;
const request = require('request');

// var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost", //localhost
//   user: "root",
//   password: "filebox1234",
// });
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("connected to MySQL");
//   con.query("USE filebox;", function (err, result) {
//     if (err) throw err;
//     console.log("connected to filebox DB");
//   });
// });



var server = http.createServer(function(req, res)
{
  counter++;
  console.log("Request: " + req.url + " (" + counter + ")");
  if (req.method == "/download/list")
  {

  }
  if (req.url == '/upload/upf') // do the same for login besides var form line
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

        // con.query("INSERT INTO files (name) VALUES ("+'"'+files.filetoupload.name+'"'+");", function (err, result)
        // {
        //    if (err) throw err;
        //    console.log("added "+files.filetoupload.name+" to DB");
        //  });
      });

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<script>setTimeout(function () { window.location.href = "/home"; }, 5000);</script>');
      res.end();
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
  else if(req.url.startsWith("/box_icon.png")) //this is also viable
  {
    fs.readFile("box_icon.png", function(err, text)
    {
      res.setHeader("Content-Type", 'image/png');
      res.end(text);
    });
  }
  else if(req.url.startsWith("/sad_face.png")) //this is also viable
  {
    fs.readFile("sad_face.png", function(err, text)
    {
      res.setHeader("Content-Type", 'image/png');
      res.end(text);
    });
  }
  else if(req.url.startsWith("/pic1.png")) //this is also viable
  {
    fs.readFile("pic1.png", function(err, text)
    {
      res.setHeader("Content-Type", 'image/png');
      res.end(text);
    });
  }
  else if(req.url.startsWith("/d.png")) //this is also viable
  {
    fs.readFile("d.png", function(err, text)
    {
      res.setHeader("Content-Type", 'image/png');
      res.end(text);
    });
  }
  else if(req.url.startsWith("/u.png")) //this is also viable
  {
    fs.readFile("u.png", function(err, text)
    {
      res.setHeader("Content-Type", 'image/png');
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
    //con.query("SELECT * FROM files;", function (err, result, fields)
    // {
    //   if (err) throw err;
    //
    //   var n = result.length;
    //   for (var i = 0; i < n; i++)
    //   {
    //       console.log(result[i].name);
    //   }
    //   //so we can get the mysql here,
    //   //but we can't write to
    // });
  }
  else if(req.url == "/login")
  {
    fs.readFile("login.html", function(err, text)
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
  else if(req.url == "/account")
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
