const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const port = process.argv[2] || 4000;

const app = express();
app.use(express.json());

app.post('/api/exec', (req, res) => {
  const { command } = req.body;

  exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      return res.status(400).json({ error: stderr });
    }
    res.status(200).json({ output: stdout });
  });
});

app.get('/api/read-file', (req, res) => {
  const filePath = path.join(process.cwd(), req.query.file);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ content: data });
  });
});

app.listen(port, () => {
  console.log('zost app is running on http://localhost:4000');
});
