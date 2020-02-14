const fs = require('fs');
const path = require('path');

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
    const files = fs.readdirSync(filePath);
    for(let file of files){
    }
    return files;
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