require('shelljs/global')

exports.command = 'create <name>'
exports.desc = 'create project'

exports.builder = function (yargs) {
  // console.log('yargs', yargs)
}

exports.handler = function (argv) {
  const { name } = argv
  mkdir(name)
  mkdir(`${name}/packages`)
  touch(`${name}/see.js`)
  echo(`create [${ name }] in ${pwd()}`)
}