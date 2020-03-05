#! /usr/bin/env node

const create = require('./commands/create')
const generate = require('./commands/generate')
const container = require('./commands/container')
const context = require('./commands/context')

require('yargs')
.command(create)
// .command(generate)
.command(context)
.command(container)
.demandCommand(1, 'You need at least one command before moving on')
.argv
