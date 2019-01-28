#!/usr/bin/env node
const program = require('commander')
const fs = require('fs')
const path = require('path')
const pkg = require('./package.json')
const file = require('./scripts/file')
const login = require('./scripts/login')
/**导入通知的命令 */
const notice = require('./app/notice/cmd')
/**查看cli版本 */
program
  .version(pkg.version);
/**登录操作 */
program
  .command('login')
  .description('登录至软捷后台,只需登录一次,以后将会自动登录!')
  .action(() => {
    login.beforeLogin(true);
  });
/**强制重新登录 */
program
  .command('relogin')
  .description('强制重新登录!')
  .action(() => {
    login.beforeLogin(false);
  });
/**退出登录 */
program
  .command('logout')
  .description('退出登录!(还没完善)')
  .action(() => {
    console.log("退出登录成功");
  });

notice.registerCmd(program);

program.parse(process.argv);
module.exports={file};

