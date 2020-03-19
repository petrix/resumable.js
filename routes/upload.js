const fs = require('fs');
const Config = require('../libs/config');
const fileUpload = require('../libs/fileUpload');
const upDir = fileUpload.getFullPath([Config.dirs.publicDir, Config.dirs.uploadDir]);
const resumable = require('../libs/resumableNode')(upDir);
const checkFolder = fileUpload.getFullPath([Config.dirs.filesDir]);
const crypto = require('crypto');

function cryptoId(name) {
    return crypto.createHash('sha256', Config.brand)
        .update(name)
        .digest('hex')
}

exports.get = function (req, res) {

    switch (req.url.split('?')[0]) {
        case '/convert720':
            console.log('/convert720', req.query.filename);
            // res.send(fileUpload.readFile(checkFolder));
            var fileId = cryptoId(req.query.filename);
            try {
                fileUpload.convert720(req.query.filename, checkFolder);
                res.send(fileId);
            } catch (err) {
                console.error(err);
            }
            break;
            case '/convert360':
            console.log('/convert360', req.query.filename);
            // res.send(fileUpload.readFile(checkFolder));
            var fileId = cryptoId(req.query.filename);
            try {
                fileUpload.convert360(req.query.filename, checkFolder);
                res.send(fileId);
            } catch (err) {
                console.error(err);
            }
            break;
        case '/rmFile':
            console.log('/rmFile', req.query.filename);
            // res.send(fileUpload.readFile(checkFolder));
            var fileId = cryptoId(req.query.filename);
            try {
                fileUpload.removeFile(req.query.filename, checkFolder);
                res.send(fileId);
            } catch (err) {
                console.error(err);
            }
            break;
        case '/getfn':
            var getfn = [];
            // console.log(fileUpload.readFileNames(checkFolder));
            fileUpload.readFileNames(checkFolder).forEach(function (fileString) {
                namArray = fileString.split('#');
                getfn.push(namArray[0] + '#' + namArray[1] + '#' + cryptoId(namArray[0]));
            });
            // res.send(fileUpload.readFileNames(checkFolder));
            // console.log(getfn);
            res.send(getfn);


            break;
        case '/upload':
            // Handle status checks on chunks through Resumable.js
            resumable.get(req, function (status, filename, original_filename, identifier) {
                // res.send((status === 'found' ? 200 : 404), status);
                // res.send((status === 'found' ? 200 : 300), status);
                res.status(status).sendStatus(status === 'found' ? 200 : 300);
            });
            break;
        case '/fileid':
            // retrieve file id. invoke with /fileid?filename=my-file.jpg
            fileUpload.readFileNames(checkFolder).forEach(function (fileString) {
                if (fileString.split('#')[0] === req.query.filename) {
                    // console.log(fileString);
                } else {
                    // return;
                    // res.sendStatus(404);
                }
            });



            if (!req.query.filename) {
                return res.status(500).end('query parameter missing');
            }
            // create md5 hash from filename
            res.end(
                cryptoId(req.query.filename)
                // crypto.createHash('sha256', Config.brand)
                // .update(req.query.filename)
                // .digest('hex')
            );
            break;
    }
};

exports.post = function (req, res) {
    // console.log('post',req.body.action)
    // console.log(fileUpload.getFullPath([Config.dirs.publicDir, Config.dirs.uploadDir]));
    if (req.body.action === 'cancelUpload') {
        console.log('cancelUpload')
        let filterArray = req.body.nowUploading ? req.body.nowUploading.split(',') : [];
        filterArray = filterArray.map(upl => {
            return new RegExp(`^res-${upl}.*`);
        });
        // console.log(filterArray);

        fileUpload.clearFolder(fileUpload.getFullPath([Config.dirs.publicDir, Config.dirs.uploadDir]), filterArray);

    } else {
        resumable.post(req, function (status, filename, original_filename, identifier) {
            // console.log('POST', status, original_filename, identifier);
            if (status === 'done') {
                //when all chunks uploaded, then createWriteStream to /files folder with filename
                const stream = fs.createWriteStream(fileUpload.getFullPath([Config.dirs.filesDir, filename]));

                const onDone = function (identifier) {
                    // console.log(stream);
                    resumable.clean(identifier);
                };
                //stitches the file chunks back together to create the original file.
                resumable.write(identifier, stream, {
                    onDone: onDone
                });
            }
            try {
                if (status == 'done') {
                    console.log(status);
                }
                res.send(status);
            } catch (err) {
                console.error(err);
            }
        });
    }
};