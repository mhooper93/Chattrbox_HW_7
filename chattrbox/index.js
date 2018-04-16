var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var wss =  require("./websockets-server");
var path = require("path");

//checks for file error
var handleError = function (err, res) {
  var errorPage = "error.html";
  console.log("The fileName is:" + err);
  var err_filePath = path.resolve(__dirname, "app", errorPage);
  fs.readFile(err_filePath, function(err, data){
    if (err) {
      console.log("Error in error handler");
    } else {
      res.end(data);
    }
  });
};

var server = http.createServer(function (req, res) {
  console.log("Responding to a request.");

  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log(filePath);
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });
});
server.listen(3000);
