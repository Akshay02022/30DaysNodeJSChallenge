const fs = require('fs').promises;

async function readFileContent(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    console.log(content);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}
readFileContent('test-files/file1.txt');
readFileContent('test-files/empty-file.txt');
readFileContent('test-files/nonexistent-file.txt');``