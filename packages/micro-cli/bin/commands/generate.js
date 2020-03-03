require('shelljs/global')

exports.command = 'generate <package> <path>'
exports.aliases = ['gen', 'g']
exports.desc = 'generate one package'

exports.builder = function (yargs) {
  yargs
  .option('type', {
    alias: ['t'],
    desc: 'package type: "context", "container", "component"'
  })
}

exports.handler = function (argv) {
  console.log(argv)

  const generator = generatorMap[type] || defaultGenerator

  generator(argv)
}

function contextGenerator (argv) {

}

function containerGenerator (argv) {

}

function componentGenerator (argv) {

}

function defaultGenerator (argv) {

}


const generatorMap = {
  context: contextGenerator,
  container: containerGenerator,
  component: componentGenerator,
  
}