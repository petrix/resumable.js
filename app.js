var express = require('express');
var app = express();

var path = require('path');
const Config = require('./libs/config');
// const common = require('./common');
var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
var crypto = require('crypto');
// var http = require('http');
var http = require('http').createServer(app);

// var io = require('socket.io')(http);
// io.on('connection', function(socket){
//   console.log('a user connected');
// });
// Host most stuff in the public folder
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/jquery-ui', express.static(__dirname + '/node_modules/jquery-ui-dist'));
app.use('/video-js', express.static(__dirname + '/node_modules/video.js/dist'));
app.use('/vjs-themes', express.static(__dirname + '/node_modules/@videojs/themes/dist'));
app.use('/vjs-qCell', express.static(__dirname + '/node_modules/videojs-qualityselector/dist'));
app.use('/vjs-RS', express.static(__dirname + '/node_modules/videojs-resolution-switcher/lib'));
app.use('/vjs-playlist', express.static(__dirname + '/node_modules/videojs-playlist/dist'));
app.use('/socket-io', express.static(__dirname + '/node_modules/socket.io-client/dist'));
app.use('/afterglow', express.static(__dirname + '/node_modules/afterglowplayer/dist'));
// node_modules\videojs-resolution-switcher\lib

app.use(express.static(path.join(__dirname, Config.dirs.publicDir)));
app.use(Config.filesLink, express.static(path.join(__dirname, Config.dirs.filesDir)));
app.use(Config.proxyLink, express.static(path.join(__dirname, Config.dirs.convertedDir)));

app.use(multipart());
// app.use(common.commonMiddlew);
// require('./routes')(app);
require('./routes')(app, http);
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