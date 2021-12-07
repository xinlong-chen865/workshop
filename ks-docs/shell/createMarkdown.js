const fs = require("fs");
const path = require("path");

const NOTES_STACK_OBJECT = {
    "/**": "*/",
    "<!--": "-->",
}
const reg_star_start = /^\/\*\*/
const reg_star_end = /^\*\//
const reg_rod_start = "<!--"
const reg_rod_end = /^\-->/
const reg_rod_all = /(?<=<!--).*?(?=-->)/;

function createMarkdown(paths, targetCatalogue) {
    let innerContent;
    for(let path of paths) {
        const files = fs.readFileSync(path, "utf-8");
        const filesContent = files.split('\n').filter(Boolean).map(str => trim(str));
        console.log(filesContent);
        if (filesContent.length > 0) {
            innerContent += compileMarkdown(filesContent);
        }
    }
    // console.log(innerContent);
    // if(innerContent !== "undefined") {
    //     fs.writeFile(`./docs/${targetCatalogue}/index.md`, innerContent, function(err) {});
    // }
    
    
}

function compileMarkdown(contentArr) {
    const _contentArr = contentArr.slice();
    let res = "";
    let temp = "";
    // let open = false;
    // console.log(_contentArr);
    // _contentArr.forEach(fragment => {
    //     if(reg_star_start.test(fragment)) {
    //         open = true;
    //         return;
    //     }
    //     if(reg_star_end.test(fragment)) {
    //         open = false;
    //         return;
    //     }
    //     if(reg_rod_all.test(fragment)) {
    //         const reg_temp = /(?<=<!--).*?(?=-->)/;
    //         const ret = fragment.match(reg_rod_all);
    //         res += ret[0] + '\n' || "";
    //         return;
    //     }
    //     if(open && !!fragment) {
    //         res += fragment.slice(2) ? fragment.slice(2) + '\n' : "";
    //     }
    // });
    let index = 0;
    while(index < _contentArr.length) {
        // 判断/** */
        if(reg_star_start.test(_contentArr[index]) && ~_contentArr[index + 1].indexOf('@ks-docs')) {
            index = index + 2;
            while(!reg_star_end.test(_contentArr[index])) {
                const reg_temp = /(?<=\*\s.*?).*?$/;
                let ret = _contentArr[index].match(reg_temp)
                if(ret) {
                    res += ret[0] + '\n' || "";
                }
                index++;
            }
        }
        // 判断<!-- -->
        if(reg_rod_all.test(_contentArr[index])) {
            const ret = _contentArr[index].match(reg_rod_all);
            res += ret[0] + '\n' || "";
        }
        // 判断<!-- 多行 -->
        if(_contentArr[index] === reg_rod_start && ~_contentArr[index + 1].indexOf('@ks-docs')) {
            index = index + 2;
            while(!reg_rod_end.test(_contentArr[index])) {
                res += _contentArr[index] ? _contentArr[index] + '\n' : "";
                index++;
            }
        }
        index++;
    }
    // console.log(res);
    return res;
}

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

module.exports = createMarkdown;