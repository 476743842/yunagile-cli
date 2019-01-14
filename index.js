#!/usr/bin/env node
const program = require('commander')
const fs = require('fs')
const path = require('path')
const pkg = require('./package.json')
const file = require('./scripts/file')
program
  .version(pkg.version)

program.parse(process.argv)
module.exports={file}

