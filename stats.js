const testFolder = './files/';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  for(file of files){
    fs.open(testFolder+file, "r", (err, fd) => {
      if (err) throw err;
      fs.fstat(fd, (err, stat) => {
        if (err) throw err;
        console.log(stat.size);
        fs.close(fd, err => {
          if (err) throw err;
        });
      });
    });
  }
});