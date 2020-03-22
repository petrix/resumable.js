
module.exports = function(http,app){
// var io = require('socket.io')(http);
    const mainPageRoute = require('./main');
    app.get('/', mainPageRoute.get);

    const uploadRoute = require('./upload');
    // uploadRoute.init(io);
    app.get('/getfn', uploadRoute.get);
    app.get('/socket.io', uploadRoute.get);
    app.post('/socket.io', uploadRoute.post);
    app.get('/rmFile', uploadRoute.get);
    app.get('/convert720', uploadRoute.get);
    app.get('/convert360', uploadRoute.get);    
    app.get('/getConverted', uploadRoute.get);
    app.post('/getfn', uploadRoute.post);
    app.get('/upload', uploadRoute.get);
    app.get('/fileid', uploadRoute.get);
    app.post('/upload', uploadRoute.post);
};
