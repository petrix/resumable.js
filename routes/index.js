
module.exports = function(app, http){

var io = require('socket.io')(http);
io.on('connection', function (socket) {
    console.log('a user connected');
});
    const mainPageRoute = require('./main');
    app.get('/', mainPageRoute.get);

    const uploadRoute = require('./upload');
    // uploadRoute.init(io);
    app.get('/getfn', uploadRoute.get);
    app.get('/socket.io', uploadRoute.get);
    app.post('/socket.io', uploadRoute.post);
    app.get('/rmFile', uploadRoute.get);
    app.get('/convert1080p', uploadRoute.get);
    app.get('/convert720p', uploadRoute.get);
    app.get('/convert360p', uploadRoute.get);    
    app.get('/getConverted', uploadRoute.get);
    app.post('/getfn', uploadRoute.post);
    app.get('/upload', uploadRoute.get);
    app.get('/fileid', uploadRoute.get);
    app.post('/upload', uploadRoute.post);
};
