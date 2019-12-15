var http = require("http");
var fs = require('fs');
var formidable = require('formidable');
var port = 3000;
var serverUrl = "127.0.0.1";
var counter = 0;
const request = require('request');
var url = require('url');

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
  var query = url.parse(req.url, true).query;
  if (req.method == "/download/list")
  {

  }
  if (req.url == '/upload/upf') // do the same for login besides var form line
  {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files)
    {

    // var fileList = []
    // fileList.push(files.myFile.name)
    
    if (!Array.isArray(files.myFile)){
       var oldpath = files.myFile.path;
         var newpath = "fb/public/" + files.myFile.name;
         console.log(oldpath);
         console.log(newpath);
        fs.rename(oldpath, newpath, function (err)
        {
          if (err) throw err;

          con.query("INSERT INTO files (name) VALUES ("+'"'+files.myFile.name+'"'+");", function (err, result)
          {
             if (err) throw err;
             console.log("added "+files.myFile.name+" to DB");
           });
        });

    }
    else{
        console.log("hello")
        for (i = 0; i <= files.myFile.length; i++ ){
            var oldpath = files.myFile[i].path;
            var newpath = "fb/public/" + files.myFile[i].name;
            console.log(oldpath);
            console.log(newpath);
            fs.rename(oldpath, newpath, function (err)
            {
              if (err) throw err;

              con.query("INSERT INTO files (name) VALUES ("+'"'+files.myFile[i].name+'"'+");", function (err, result)
              {
                 if (err) throw err;
                 console.log("added "+files.myFile[i].name+" to DB");
               });
        });

       
      }
    }
   
    

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<script>setTimeout(function () { window.location.href = "/upload"; }, 500);</script>');
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
  else if(req.url.startsWith("/u.png")) //this is also viable
  {
    fs.readFile("u.png", function(err, text)
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
  else if(req.url.startsWith("/a.png")) //this is also viable
  {
    fs.readFile("a.png", function(err, text)
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
    con.query("SELECT * FROM files;", function (err, result, fields)
    {
      if (err) throw err;

      var n = result.length;
      for (var i = 0; i < n; i++)
      {
          console.log(result[i].name);
      }
      //so we can get the mysql here,
      //but we can't write to
    });
  }
  else if(req.url == "/files")
  {
    fs.readFile("files.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url == "/setting")
  {
    fs.readFile("setting.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
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
  // testing files
  else if(req.url == "/download/testA")//this is also viable
  {
      const file = fs.readFile('fb/public/testA.txt', function (err, content) {
          if (err) {
              res.writeHead(400, {'Content-type':'text/html'})
              console.log(err);
              res.end("No such file");
          }
          else {
              res.setHeader('Content-disposition', 'attachment; filename=testA.txt');
              res.end(content);
          }
      });
  }
  else if(req.url == "/download/testB")//this is also viable
  {
      const file = fs.readFile('fb/public/testB.txt', function (err, content) {
          if (err) {
              res.writeHead(400, {'Content-type':'text/html'})
              console.log(err);
              res.end("No such file");
          }
          else {
              res.setHeader('Content-disposition', 'attachment; filename=testB.txt');
              res.end(content);
          }
      });
  }
  else if(req.url == "/download/testC")//this is also viable
  {
      const file = fs.readFile('fb/public/testC.txt', function (err, content) {
          if (err) {
              res.writeHead(400, {'Content-type':'text/html'})
              console.log(err);
              res.end("No such file");
          }
          else {
              res.setHeader('Content-disposition', 'attachment; filename=testC.txt');
              res.end(content);
          }
      });
  }
  else if(req.url == "/download/testD")//this is also viable
  {
      const file = fs.readFile('fb/public/testD.txt', function (err, content) {
          if (err) {
              res.writeHead(400, {'Content-type':'text/html'})
              console.log(err);
              res.end("No such file");
          }
          else {
              res.setHeader('Content-disposition', 'attachment; filename=testD.txt');
              res.end(content);
          }
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
