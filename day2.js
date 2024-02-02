const fs = require('fs');

function writeToFile(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Error: ', err);
    } else {
      console.log('Successful: ', filePath);
    }
  });
  console.log("Data written in output.txt",content);
}

const fileContent = '#Day2 of #30DaysNodeJsChallenge. \n Practise of writeFile() of fs module.';

writeToFile('test-files/output.txt', fileContent);
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');