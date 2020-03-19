
module.exports = function(app){

    const mainPageRoute = require('./main');
    app.get('/', mainPageRoute.get);

    const uploadRoute = require('./upload');
    app.get('/getfn', uploadRoute.get);
    app.get('/rmFile', uploadRoute.get);
    app.get('/convert720', uploadRoute.get);
    app.get('/convert360', uploadRoute.get);
    app.post('/getfn', uploadRoute.post);
    app.get('/upload', uploadRoute.get);
    app.get('/fileid', uploadRoute.get);
    app.post('/upload', uploadRoute.post);
};
