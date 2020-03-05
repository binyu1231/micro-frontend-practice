require('shelljs/global')
const path = require('path')

exports.command = 'container <name> [path]'
exports.desc = 'generate one container in the [path] or "./"'

exports.builder = function (yargs) {
  yargs
    .option('group', {
      alias: 'g'
    })
    .option('framework', {
      alias: 'f',
      desc: 'use frontend framework "vue", "react", "angular"'
    })
}

exports.handler = function (argv) {
  echo(argv)
  const { name } = argv
  const p = argv.path || './'

  const fullName = argv.g ?  `@${argv.g}/${name}` : name

  cd(p)
  cp('-R', path.resolve(__dirname, '../../template/container'), name)
  cd(name)
  exec('npx yarn install')
}