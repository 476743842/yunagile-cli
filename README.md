# yunagile-cli

[![npm](https://img.shields.io/npm/v/yunagile.svg?maxAge=3600&style=flat-square)](https://www.npmjs.com/package/yunagile)
[![NPM downloads](https://img.shields.io/npm/dm/yunagile.svg?style=flat-square)](https://npmjs.org/package/yunagile)
[![NPM all downloads](https://img.shields.io/npm/dt/yunagile.svg?style=flat-square)](https://npmjs.org/package/yunagile)
[![CNPM all downloads](http://npm.taobao.org/badge/d/yunagile.svg?style=flat-square)](https://npm.taobao.org/package/yunagile)
[![GitHub last commit](https://img.shields.io/github/last-commit/qq476743842/yunagile-cli.svg?style=flat-square)](https://github.com/qq476743842/yunagile-cli/commits/dev)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/qq476743842/yunagile-cli.svg?style=flat-square)](https://github.com/qq476743842/yunagile-cli/issues?utf8=%E2%9C%93&q=)
[![Join the chat at https://gitter.im/qq476743842-yunagile-cli/chat](https://img.shields.io/gitter/room/qq476743842/yunagile-cli.svg?style=flat-square)](https://gitter.im/qq476743842-yunagile-cli/chat?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

> 一个基于 [Node.js](https://nodejs.org/en/) 的app脚手架工具

## 安装

```shell
npm i yunagile -g
或
cnpm i yunagile -g
```

## 所有命令

```shell
$ yunagile -h

Usage: index [options] [command]

Options:
  -V, --version     output the version number
  -h, --help        output usage information
 
Commands:
  login             登录至软捷后台!(只需登录一次,以后将会自动登录)
  relogin           强制重新登录!
  logout            退出登录!
  create            生成新的p9项目或者app项目
  notice [options]  通知公告
  daily [options]   日报功能(查日报,写日报)
```

