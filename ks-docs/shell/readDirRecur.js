const fs = require("fs");
const path = require("path");

// 遍历一个文件夹下面的所有文件
function promisify(fn) {
    return function() {
        var args = arguments;
        return new Promise((resolve, reject) => {
            [].push.call(args, function(err, result) {
                if(err) {
                    console.log(err)
                    reject(err);
                }else {
                    resolve(result);
                }
            });
            fn.apply(null, args);
        });
    }
}
 
function readDirRecur(file, callback) {
    const readdir = promisify(fs.readdir);
    const stat = promisify(fs.stat);
    return readdir(file).then((files) => {
        files = files.map((item) => {
            var fullPath = file + '/' + item;
        
            return stat(fullPath).then((stats) => {
                if (stats.isDirectory()) {
                    return readDirRecur(fullPath, callback);
                } else {
                    /*not use ignore files*/
                    if(item[0] == '.'){
                        //console.log(item + ' is a hide file.');
                    } else {
                        callback && callback(fullPath)
                    }
                }
            })
        });
        return Promise.all(files);
    });
}

module.exports = readDirRecur;