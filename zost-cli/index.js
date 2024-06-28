#!/usr/bin/env node

const { Command } = require('commander');
const { start } = require('./commands/Start');
const { stop } = require('./commands/Stop');
const { init } = require('./commands/Init');

const program = new Command();

program
  .command('start')
  .description('Start the Zost application')
  .action(start);

program
  .command('stop')
  .description('Stop the Zost application')
  .action(stop);

program
  .command('init')
  .description('Initialize a new zost.yaml file')
  .action(init);

program.parse(process.argv);
