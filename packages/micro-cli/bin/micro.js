#! /usr/bin/env node

const create = require('./commands/create')
const generate = require('./commands/generate')

require('yargs')
.command(create)
.command(generate)
.demandCommand(1, 'You need at least one command before moving on')
.argv
