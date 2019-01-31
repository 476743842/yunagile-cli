const day = require("./day");
function registerCmd(program){
    program
        .command('daily ')
        .option('-v,--viewself','查看我的日报')
        .option('-o,--viewother','查看他人的日报')
        .option('-w,--writeday','写日报')
        .option('-s,--search [value]','搜索关键字')
        .option('-p,--project','查找项目')
        .description('日报功能(查日报,写日报)')
        .action((option) => {
           //项目列表
           if(option.project){
            day.projectlist(option['search']);
           }else{
            //console.log(2);
           }
        });
}
module.exports = { registerCmd };