var express = require('express');
var path = require('path');
const Config = require('./libs/config');
const common = require('./common');
var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
var crypto = require('crypto');
var http = require('http');
var app = express();
// Host most stuff in the public folder
app.use(express.static(path.join(__dirname, Config.dirs.publicDir)));
app.use(Config.filesLink, express.static(path.join(__dirname, Config.dirs.filesDir)));


// app.use(multipartMiddleware);
app.use(multipart());
app.use(common.commonMiddlew);
require('./routes')(app);
// Uncomment to allow CORS
// app.use(function (req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    next();
// });

// retrieve file id. invoke with /fileid?filename=my-file.jpg
app.get('/fileid', function(req, res){
  if(!req.query.filename){
    return res.status(500).end('query parameter missing');
  }
  // create md5 hash from filename
  res.end(
    crypto.createHash('md5')
    .update(req.query.filename)
    .digest('hex')
  );
});

app.get('/resumable.js', function (req, res) {
  var fs = require('fs');
  res.setHeader("content-type", "application/javascript");
  fs.createReadStream("./resumable.js").pipe(res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});