var express = require('express');
var path = require('path');
const Config = require('./libs/config');
const common = require('./common');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var crypto = require('crypto');
var http = require('http');
var app = express();
// Host most stuff in the public folder
app.use(express.static(path.join(__dirname, Config.dirs.publicDir)));
app.use(Config.filesLink, express.static(path.join(__dirname, Config.dirs.filesDir)));
// app.use(express.static(path.join(__dirname, '/public')));
// app.post('/upload', multipartMiddleware, function(req, resp) {
//   console.log(req.body, req.files);
//   // don't forget to delete all req.files when done
// });
app.use(multipartMiddleware);
// app.use(multipart());
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

// Handle uploads through Resumable.js
// app.post('/upload', function(req, res){
//     resumable.post(req, function(status, filename, original_filename, identifier, chunkNumber, numberOfChunks){
//         console.log('POST', status, original_filename, identifier, chunkNumber, numberOfChunks);
//         if (status === 'done') {
//           //when all chunks uploaded, then createWriteStream to /uploads folder with filename
//           var stream = fs.createWriteStream('./uploads/' + filename);
    
//           //stitches the file chunks back together to create the original file. 
//           resumable.write(identifier, stream);
//           stream.on('data', function(data){});
//           stream.on('end', function(){});
    
//           //delete chunks after original file is re-created. 
//           resumable.clean(identifier);
//         }
//         res.send(status);
//     });
// });

// Handle status checks on chunks through Resumable.js
// app.get('/upload', function(req, res){
//     resumable.get(req, function(status, filename, original_filename, identifier){
//         console.log('GET', status);
//         res.send((status == 'found' ? 200 : 404), status);
//     });
// });

// app.get('/download/:identifier', function(req, res){
// 	resumable.write(req.params.identifier, res);
// });
app.get('/resumable.js', function (req, res) {
  var fs = require('fs');
  res.setHeader("content-type", "application/javascript");
  fs.createReadStream("./resumable.js").pipe(res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});