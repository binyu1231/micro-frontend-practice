require('shelljs/global')
const path = require('path')

exports.command = 'context <name> [path]'
exports.desc = 'generate one context in the [path] or "./"'

exports.builder = function (yargs) {
  yargs
  .option('group', {
    alias: 'g'
  })
}

exports.handler = function (argv) {
  echo(argv)
  const { name } = argv
  const p = argv.path || './'

  const fullName = argv.g ?  `@${argv.g}/${name}` : name

  cd(p)
  cp('-R', path.resolve(__dirname, '../../template/context'), name)
  cd(name)
  exec('npx yarn install')
  cd('../')
  exec('micro container container-demo')
}