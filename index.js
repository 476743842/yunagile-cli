#!/usr/bin/env node
const program = require('commander')
const fs = require('fs')
const path = require('path')
const pkg = require('./package.json')
const file = require('./scripts/file')
const login = require('./scripts/login')
/**查看cli版本 */
program
  .version(pkg.version);
/**登录操作 */
program
  .command('login')
  .description('登录至软捷后台,只需登录一次,以后将会自动登录!')
  .action(() => {
    login.beforeLogin();
  });

program.parse(process.argv);
module.exports={file};

