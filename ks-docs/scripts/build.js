const fs = require("fs");
const path = require("path");
const readDirRecur = require('../shell/readDirRecur.js');
const createMarkdown = require('../shell/createMarkdown.js')

const targets = fs.readdirSync('src').filter(s => {
    if (!fs.statSync(`./src/${s}`).isDirectory()) {
        return false;
    }
    return true
})
const packagesDir = path.resolve(__dirname, "../src");

const build = (target) => {
    // src下面的一级文件夹
    const packageDir = path.resolve(packagesDir, target);
    // 每个一级文件夹，所有层级的文件
    const fileList = [];
    readDirRecur(packageDir, function(filePath) {
        fileList.push(filePath)
    }).then(function() {
        createMarkdown(fileList, target);
    }).catch(function(err) {
        console.log(err);
    });
}

const runParallel = async (targets, iterorFn) => {
    const handler = [];
    for (const item of targets) {
        await exitsFolder(`../docs/${item}`);
        const p = iterorFn(item);
        handler.push(p);
    }
    return Promise.all(handler);
}

const exitsFolder = async (reaPath, main) => {
    const absPath = path.resolve(__dirname, reaPath);
    try {
        await fs.promises.stat(absPath)
    } catch (e) {
        await fs.promises.mkdir(absPath, {recursive: true})
    } finally {
        // 创建完docs文件夹，再搞build
        main && runParallel(targets, build);
    }
}

// build.js的主方法
exitsFolder('../docs', true);


