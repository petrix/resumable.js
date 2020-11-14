var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
const Config = require('./libs/config');
// const common = require('./common');
var multipart = require('connect-multiparty');
// var multipartMiddleware = multipart();
var crypto = require('crypto');
// var https = require('https');
var https = require('https');
// var cors = require('cors');
var httpsPORT =process.env.PORT || 3333;
var port = 3333;
var httpsOptions = {
  key: fs.readFileSync('./crt/server-key.pem'),
  cert: fs.readFileSync('./crt/server-crt.pem')
};




// app.use(function (req, res, next) {
//   var origins = [
//       'https://localhost:3333',
//       'https://127.0.0.1:5502',
//       'https://o.bratan.ooo',
//       'https://bratan.ooo'
//   ];

//   for(var i = 0; i < origins.length; i++){
//       var origin = origins[i];

//       if(req.headers.origin.indexOf(origin) > -1){
//           res.header('Access-Control-Allow-Origin', req.headers.origin);
//       }
//   }
  
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  
//   // res.header("Access-Control-Allow-Methods", "GET, POST");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

var secureServer = https.createServer(httpsOptions, app).listen(httpsPORT, function () {
  console.log('HTTPS Server Listener Started:'.bold, httpsPORT);
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://o.bratan.ooo');
  // res.setHeader('Access-Control-Allow-Origin', 'https://bratan.ooo');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// app.use(cors());

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
require('./routes')(app, https);
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



// app.listen(port, function () {
//   console.log(`Example app listening on port ${port}!`);
// });