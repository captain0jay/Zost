const findProcess = require('find-process');

async function stop() {
  const ports = [4000, 3000];

  for (const port of ports) {
    const list = await findProcess('port', port);

    if (list.length > 0) {
      list.forEach(proc => {
        try {
          process.kill(proc.pid);
          console.log(`Killed process ${proc.pid} on port ${port}`);
        } catch (err) {
          console.error(`Failed to kill process ${proc.pid} on port ${port}: ${err}`);
        }
      });
    } else {
      console.log(`No process found running on port ${port}`);
    }
  }
}

module.exports = { stop };
