const fs = require('fs');
const path = require('path');

async function init() {
  const inquirer = (await import('inquirer')).default;
  const currentDir = process.cwd();
  const dirName = path.basename(currentDir);
  const yamlFilePath = path.resolve(currentDir, 'zost.yaml');

  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name of the zost:',
      default: dirName
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version:',
      default: '1.0.0'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
      default: 'A new Zost project'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author:',
      default: 'Anonymous'
    }
  ]).then(answers => {
    const yamlContent = `# Zost configuration file
name: ${answers.name}
version: ${answers.version}
description: ${answers.description}
author: ${answers.author}
`;

    fs.writeFile(yamlFilePath, yamlContent, 'utf8', (err) => {
      if (err) {
        console.error('Error creating zost.yaml:', err);
      } else {
        console.log('Zost was successfully initialized!');
      }
    });
  }).catch(error => {
    console.error('Error during initialization:', error);
  });
}

module.exports = { init };
