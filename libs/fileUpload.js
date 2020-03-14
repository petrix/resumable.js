const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg');
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
    const readDir = fs.readdirSync(filePath, (err, files) => {
 });    
    var $request = [];

readDir.forEach(function(file){
    var size = fs.statSync(filePath+'/'+file).size;
    $request.push(file+'#'+size);
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
exports.removeFile = function (fileName,filePath) {
    const files = fs.readdirSync(filePath);
    for(let file of files){
        if(file === fileName){
            fs.unlinkSync(path.join(filePath, file));
        }
    }
    return files;
};

exports.convert720 = function (fileName,filePath) {
    const files = fs.readdirSync(filePath);
    for(let file of files){
        if(file === fileName){
            // console.log(filePath , file)
            try {
                var process = new ffmpeg(filePath +'/'+ file);
                process.then(function (video) {
                    video
		.setVideoSize('640x?', true, true, '#fff')
		.setAudioCodec('libmp3lame')
        .setAudioChannels(2)
        .save(filePath +'720p'+file, function (error, file) {
			if (!error)
				console.log('Video file: ' + file);
		});
                    // Video metadata
                    console.log(video);
                    console.log(video.metadata.video.resolution);
                    // FFmpeg configuration
                    // console.log(video.info_configuration);
                }, function (err) {
                    console.log('Error: ' + err);
                });
            } catch (e) {
                console.log(e.code);
                console.log(e.msg);
            }

            // fs.unlinkSync(path.join(filePath, file));

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


function getFileSize(filePath,file){
    fs.open(filePath+"/"+file, "r", (err, fd) => {
        if (err) throw err;
        fs.fstat(fd, (err, stat) => {
          if (err) throw err;
        //   console.log(fd);
          var size = stat.size;
          var b={file : file , size : size};
            
          fs.close(fd, err => {
            if (err) throw err;
          });
          console.log(b);
          return b;
        });
        
      });
}