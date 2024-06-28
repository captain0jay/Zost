const { exec } = require('child_process');
const path = require('path');
const detectPort = require('detect-port');

let backendProcess = null;
let frontendProcess = null;

async function start() {
  const ora = (await import('ora')).default;
  const open = (await import('open')).default;
  
  const currentDir = process.cwd();
  const uiDir = path.resolve(currentDir, '../ui');
  const appDir = path.resolve(currentDir, '../app');

  // Start loading spinner
  const spinner = ora('Starting the application...').start();

  let backendPort = 4000;
  let frontendPort = 3000;

  // Detect available ports
  backendPort = await detectPort(backendPort);
  frontendPort = await detectPort(frontendPort);

  let backendStarted = false;
  let frontendStarted = false;

  // Check if both backend and frontend are started
  const checkIfBothStarted = () => {
    if (backendStarted && frontendStarted) {
      spinner.succeed(`Zost is running on \x1b[34m\x1b[4mlocalhost:${frontendPort}\x1b[0m in your browser.`);
      open(`http://localhost:${frontendPort}`);
    }
  };

  // Start backend server
  backendProcess = exec(`node "${appDir}/server.js" ${backendPort}`);
  backendProcess.stdout.on('data', (data) => {
    if (data.toLowerCase().includes('zost app is running')) {
      backendStarted = true;
      console.log(`\n Zost app started successfully on port ${backendPort}.`);
      checkIfBothStarted();
    }
  });
  backendProcess.stderr.on('data', (data) => {
    console.error(`Zost app error: ${data}`);
  });
  backendProcess.on('close', (code) => {
    if (code !== 0) {
      spinner.fail(`Zost app exited with code ${code}`);
    }
  });

  // Start frontend server
  frontendProcess = exec(`npm run dev --prefix "${uiDir}" -- -p ${frontendPort}`);
  frontendProcess.stdout.on('data', (data) => {
    if (data.includes('compiled successfully') || data.includes('Local:')) {
      frontendStarted = true;
      console.log(`\n Zost UI compiled successfully on port ${frontendPort}.`);
      checkIfBothStarted();
    }
  });
  frontendProcess.stderr.on('data', (data) => {
    // Filtering out retry messages
    if (!data.toLowerCase().includes('retrying')) {
      console.error(`Zost UI error: ${data}`);
    }
  });
  frontendProcess.on('close', (code) => {
    if (code !== 0) {
      spinner.fail(`Zost UI exited with code ${code}`);
    }
  });

  // Handle SIGINT to ensure processes are terminated
  process.on('SIGINT', () => {
    console.log('\nStopping Zost application...');
    if (backendProcess) {
      backendProcess.kill();
    }
    if (frontendProcess) {
      frontendProcess.kill();
    }
    console.log('Zost application stopped.');
    process.exit();
  });
}

module.exports = { start };
