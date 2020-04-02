const fs = require('fs');
const path = require('path');
// const ffmpeg = require('ffmpeg');

var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg'),
    ffmpegOnProgress = require('ffmpeg-on-progress');
ffmpeg.setFfmpegPath(ffmpegPath);
// var command = ffmpeg();
const logProgress = (progress, event) => {
    // progress is a floating point number from 0 to 1
    console.log('progress', (progress * 100).toFixed(2))
}
  const executeFfmpeg = args => {
    let command = ffmpeg().output(' '); // pass "Invalid output" validation
    command._outputs[0].isFile = false; // disable adding "-y" argument
    command._outputs[0].target = ""; // bypass "Unable to find a suitable output format for ' '"
    command._global.get = () => { // append custom arguments
        return typeof args === "string" ? args.split(' ') : args;
    };
    return command;
};



exports.getFullPath = function (_path) {

    _path = [path.dirname(require.main.filename)].concat(_path);
    return (path.join.apply(null, _path));
};

exports.makeDirectory = function (dirName) {

    fs.mkdirSync(dirName, {
        recursive: true
    });
};

exports.saveFile = function (fileToUpload, filePath) {

    const fileBuffer = fs.readFileSync(fileToUpload.path);
    fs.writeFileSync(filePath, fileBuffer);
    return filePath;
};
////////////////

exports.readFileNames = function (filePath) {
    const readDir = fs.readdirSync(filePath, (err, files) => {});
    var $request = [];

    readDir.forEach(function (file) {
        var size = fs.statSync(filePath + '/' + file).size;
        $request.push(file + '#' + size);
        // console.log(file, size);
        // return file, size;
    });
    return $request;


    //  console.log(readDir);
    //  return readDir;
    // const files = fs.readdirSync(filePath);
    // for(let file of files){
    // }
    // return files;
};
exports.removeFile = function (fileName, filePath) {
    const files = fs.readdirSync(filePath);
    const convFiles = fs.readdirSync(`${filePath}-converted`);
    for (let file of files) {
        if (file === fileName) {
            fs.unlinkSync(path.join(filePath, file));
        }
    }
    for (let convFile of convFiles){
        var x = convFile.split('-ixi-')[0];
        if(x == fileName){
                    console.log(x);
     
                        fs.unlinkSync(path.join(`${filePath}-converted`, convFile));

        }
    }
    return files;
};
var convertingItems = [];
var convertingCount = 0;
exports.convert1080 = function (fileName, filePath) {
    const files = fs.readdirSync(filePath);
    var newFileName;
    for (let file of files) {
        if (file === fileName) {

            var fileDst = file.split('.');
            console.log(fileDst);

            // for(var iii=0;i<fileDst.length-1;iii++){
            //     fileDstName+=fileDst[iii]+'.';
            // }
            newFileName =file + '-ixi-1080p' + '.mp4';
            var command = ffmpeg().input(filePath + '/' + file)
                .output(filePath + '-converted/'+ newFileName)
                .videoCodec('libx264')
                // .inputOptions('-preset fast')
                .size('1920x?')
                .audioCodec('aac')
                .keepDAR()
                .on('progress', ffmpegOnProgress(logProgress))
                .on('start', commandLine => console.log('start', commandLine))
                // .on('codecData', codecData => console.log('codecData', codecData))
                .on('error', error => console.log('error', error))
                // .on('stderr', stderr => console.log('stderr', stderr))
                .on('end', end => console.log('end', end))
                .run();

        }
    }
    return newFileName;
};
exports.convert720 = function (fileName, filePath) {
    const files = fs.readdirSync(filePath);
    var newFileName;
    for (let file of files) {
        if (file === fileName) {

            var fileDst = file.split('.');
            console.log(fileDst);

            // for(var iii=0;i<fileDst.length-1;iii++){
            //     fileDstName+=fileDst[iii]+'.';
            // }
            newFileName =file + '-ixi-720p' + '.mp4';
            var command = ffmpeg().input(filePath + '/' + file)
                .output(filePath + '-converted/'+ newFileName)
                .videoCodec('libx264')
                // .inputOptions('-preset fast')
                .size('1280x?')
                .audioCodec('aac')
                .keepDAR()
                .on('progress', ffmpegOnProgress(logProgress))
                .on('start', commandLine => console.log('start', commandLine))
                // .on('codecData', codecData => console.log('codecData', codecData))
                .on('error', error => console.log('error', error))
                // .on('stderr', stderr => console.log('stderr', stderr))
                .on('end', end => console.log('end', end))
                .run();

        }
    }
    return newFileName;
};
exports.convert360 = function (fileName, filePath) {
    var newFileName;
    const files = fs.readdirSync(filePath);
    for (let file of files) {
        if (file === fileName) {

            var fileDst = file.split('.');
            console.log(fileDst);

            // for(var iii=0;i<fileDst.length-1;iii++){
            //     fileDstName+=fileDst[iii]+'.';
            // }
            newFileName =file + '-ixi-360p' + '.mp4';
            var command = ffmpeg().input(filePath + '/' + file)
                .output(filePath + '-converted/'+ newFileName)
                .videoCodec('libx264')
                // .inputOptions('-preset fast')
                .size('640x?')
                .audioCodec('aac')
                .keepDAR()
                .on('progress', ffmpegOnProgress(logProgress))
                .on('start', commandLine => console.log('start', commandLine))
                // .on('codecData', codecData => console.log('codecData', codecData))
                .on('error', error => console.log('error', error))
                // .on('stderr', stderr => console.log('stderr', stderr))
                .on('end', end => console.log('end', end))
                .run();

        }
    }
    return files;
};
////////////////
exports.clearFolder = function (dirName, filterArray = []) {

    const files = fs.readdirSync(dirName);
    for (let file of files) {

        let deleteFile = false;
        if (filterArray && filterArray.length > 0) {
            filterArray.some(filter => {
                if (filter.test(file)) {
                    deleteFile = true;
                    return true;
                }
            })
        } else {
            deleteFile = true;
        }
        if (deleteFile) {
            fs.unlinkSync(path.join(dirName, file));
        }
    }
};


function getFileSize(filePath, file) {
    fs.open(filePath + "/" + file, "r", (err, fd) => {
        if (err) throw err;
        fs.fstat(fd, (err, stat) => {
            if (err) throw err;
            //   console.log(fd);
            var size = stat.size;
            var b = {
                file: file,
                size: size
            };

            fs.close(fd, err => {
                if (err) throw err;
            });
            console.log(b);
            return b;
        });

    });
}