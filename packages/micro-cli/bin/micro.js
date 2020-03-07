#! /usr/bin/env node

const create = require('./commands/create')
const generate = require('./commands/generate')
const container = require('./commands/container')
const context = require('./commands/context')
const component = require('./commands/component')

require('yargs')
.command(create)
// .command(generate)
.command(context)
.command(container)
.command(component)
.demandCommand(1, 'You need at least one command before moving on')
.argv
