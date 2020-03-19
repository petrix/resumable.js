var express = require('express');
var path = require('path');
const Config = require('./libs/config');
const common = require('./common');
var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
var crypto = require('crypto');
var http = require('http');
var app = express();
var io = require('socket.io')(http);
// io.on('connection', function(socket){
//   console.log('a user connected');
// });
// Host most stuff in the public folder
app.use('/jquery-ui', express.static(__dirname + '/node_modules/jquery-ui-dist'));
app.use('/video-js', express.static(__dirname + '/node_modules/video.js/dist'));
app.use('/socket-io', express.static(__dirname + '/node_modules/socket.io-client/dist'));

app.use(express.static(path.join(__dirname, Config.dirs.publicDir)));
app.use(Config.filesLink, express.static(path.join(__dirname, Config.dirs.filesDir)));

app.use(multipart());
// app.use(common.commonMiddlew);
require('./routes')(app);
// Uncomment to allow CORS
// app.use(function (req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    next();
// });


// app.get('/resumable.js', function (req, res) {
//   var fs = require('fs');
//   res.setHeader("content-type", "application/javascript");
//   fs.createReadStream("./resumable.js").pipe(res);
// });
var port = 3333;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});