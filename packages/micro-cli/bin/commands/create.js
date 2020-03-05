require('shelljs/global')
var path = require('path')

exports.command = 'create <name>'
exports.desc = 'create project'

exports.builder = function (yargs) {
  // console.log('yargs', yargs)
}

exports.handler = function (argv) {
  const { name } = argv

  cp('-R', path.resolve(__dirname, '../../template/project'), name)
  cd(name)
  exec('npx yarn install')
  echo(`create a project [${name}]`)
}