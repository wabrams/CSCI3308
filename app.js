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
  con.query("USE filebox;", function (err, result)
  {
    if (err) throw err;
    console.log("connected to filebox DB");
  });
});

var server = http.createServer(function(req, res)
{
  counter++;
  console.log("Request: " + req.url + " (" + counter + ")");
  var query = url.parse(req.url, true).query;
  var params = new URLSearchParams(query); //Parsing file name from a download request
  console.log(params);
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
    var newFiles = JSON.parse(files.myFile);
    if (!Array.isArray(newFiles)){
       var oldpath = newFiles.path;
         var newpath = "/fb/public/" + files.myFile.name;
         console.log("adding 1 file");
         console.log(oldpath);
         console.log(newpath);
        fs.rename(oldpath, newpath, function (err)
        {
          if (err) throw err;

          con.query("INSERT INTO files (name) VALUES ("+'"'+newFiles.name+'"'+");", function (err, result)
          {
             if (err) throw err;
             console.log("added "+newFiles.name+" to DB");
           });
        });

    }
    else{
        console.log("hello")
        for (i = 0; i <= files.myFile.length; i++ ){
            var oldpath = files.myFile[i].path;
            var newpath = "/fb/public/" + files.myFile[i].name;
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
      res.write('<script>setTimeout(function () { window.location.href = "/download"; }, 500);</script>');
      res.end();
    });
  }
  else if(req.url == "/account/create")
  {
  	var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields)
    {
    	if (err) throw err;

              con.query("INSERT INTO users (name, pass) VALUES ("+'"'+fields.username + '", "' + fields.pass + '"'+");", function (err, result)
              {
                 if (err) throw err;
                 console.log("added " + fields.username +" to DB");
               });
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<script>setTimeout(function () { window.location.href = "/login"; }, 500);</script>');
    res.end();
  }
  else if(req.url == "/home" || req.url == "")
  {
    fs.readFile("web/index.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url.startsWith("/upload")) //this is also viable
  {
    fs.readFile("web/upload.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url.startsWith("/box_icon.png")) //this is also viable
  {
    fs.readFile("img/box_icon.png", function(err, text)
    {
      res.setHeader("Content-Type", 'image/png');
      res.end(text);
    });
  }
  else if(req.url.startsWith("/sad_face.png")) //this is also viable
  {
    fs.readFile("img/sad_face.png", function(err, text)
    {
      res.setHeader("Content-Type", 'image/png');
      res.end(text);
    });
  }
  else if(req.url.startsWith("/pic1.png")) //this is also viable
  {
    fs.readFile("img/pic1.png", function(err, text)
    {
      res.setHeader("Content-Type", 'image/png');
      res.end(text);
    });
  }
  else if(req.url.startsWith("/u.png")) //this is also viable
  {
    fs.readFile("img/u.png", function(err, text)
    {
      res.setHeader("Content-Type", 'image/png');
      res.end(text);
    });
  }
  else if(req.url.startsWith("/d.png")) //this is also viable
  {
    fs.readFile("img/d.png", function(err, text)
    {
      res.setHeader("Content-Type", 'image/png');
      res.end(text);
    });
  }
  else if(req.url.startsWith("/a.png")) //this is also viable
  {
    fs.readFile("img/a.png", function(err, text)
    {
      res.setHeader("Content-Type", 'image/png');
      res.end(text);
    });
  }
  else if(req.url == "/download")// just pulls the base html
  {
    fs.readFile("web/download.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");

      res.end(text);
    });

  }
  else if(req.url == "/download.js") //here's where db data is collected and passed to javascript
  {
    con.query("SELECT * FROM files", function (err, result, fields)
    {
      if (err) throw err;

      rows = "var rows = "+JSON.stringify(result)+";";//build the data string
      //initialize the js file. This will overwrite the file sent to the previous request
      //Note: download0.js contains our actual js code for building the download table and is
      //unaffected by this process
      fs.writeFileSync("web/js/download.js", rows, (err) => {
        if (err) throw err;
        console.log('new download.js created w/ files data');
      });
      fs.appendFileSync("web/js/download.js", fs.readFileSync("web/js/download0.js"), (err) => {
        if (err) throw err;
        console.log('appended table pop script to download.js');
      });
      fs.readFile("web/js/download.js", function(err, text)
      {
        res.setHeader("Content-Type", "text/javascript");
        res.end(text);
      })
    });
  }
  //routing for file download
  else if(params.has("file")) {
    var fp = "fb/public/"+params.get("file");
    const file = fs.readFile(fp, function (err, content) {
      if (err) {
          res.writeHead(400, {'Content-type':'text/html'})
          console.log(err);
          res.end("No such file");
      }
      else {
          var header = "attachment; filename="+params.get("file");
          res.setHeader('Content-disposition', header);
          res.end(content);
      }
    });
  }
  else if(req.url == "/files")
  {
    fs.readFile("web/files.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url == "/setting")
  {
    fs.readFile("web/setting.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url == "/login")
  {
    fs.readFile("web/login.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url == "/nav.html")
  {
    fs.readFile("web/nav.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else if(req.url == "/account")
  {
    fs.readFile("web/account.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  else  //default case
  {
    fs.readFile("web/error.html", function(err, text)
    {
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
});
console.log("Starting web server at " + serverUrl + ":" + port);
server.listen(port, serverUrl);