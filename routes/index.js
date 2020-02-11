
module.exports = function(app){

    const mainPageRoute = require('./main');
    app.get('/', mainPageRoute.get);

    const uploadRoute = require('./upload');
    app.get('/getfn', uploadRoute.get);
    app.get('/upload', uploadRoute.get);
    app.get('/fileid', uploadRoute.get);
    app.post('/upload', uploadRoute.post);
};
