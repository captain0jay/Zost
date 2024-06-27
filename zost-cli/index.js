#!/usr/bin/env node

const { Command } = require('commander');
const { exec } = require('child_process');
const path = require('path');

const program = new Command();

async function start() {
  const ora = (await import('ora')).default;
  const open = (await import('open')).default;
  const uiDir = path.resolve(__dirname, '../ui');
  const appDir = path.resolve(__dirname, '../app');

  // Start loading spinner
  const spinner = ora('Starting the application...').start();

  let backendStarted = false;
  let frontendStarted = false;

  // Check if both backend and frontend are started
  const checkIfBothStarted = () => {
    if (backendStarted && frontendStarted) {
      spinner.succeed('Application started successfully!');
      console.log('\nZost is running on \x1b[34m\x1b[4mlocalhost:3000\x1b[0m in your browser.\n');
      open('http://localhost:3000');
    }
  };

  // Start backend server
  const backendProcess = exec(`node "${appDir}/server.js"`);
  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`);
    if (data.toLowerCase().includes('server is running')) {
      backendStarted = true;
      checkIfBothStarted();
    }
  });
  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend error: ${data}`);
  });
  backendProcess.on('close', (code) => {
    if (code !== 0) {
      spinner.fail(`Backend server exited with code ${code}`);
    }
  });

  // Start frontend server
  const frontendProcess = exec(`npm run dev --prefix "${uiDir}"`);
  frontendProcess.stdout.on('data', (data) => {
    console.log(`Frontend: ${data}`);
    if (data.includes('compiled successfully')) {
      frontendStarted = true;
      checkIfBothStarted();
    }
  });
  frontendProcess.stderr.on('data', (data) => {
    console.error(`Frontend error: ${data}`);
  });
  frontendProcess.on('close', (code) => {
    if (code !== 0) {
      spinner.fail(`Frontend server exited with code ${code}`);
    }
  });
}

program
  .command('start')
  .description('Start the Next.js app')
  .action(start);

program.parse(process.argv);
