const path = require('path');

function checkFileExtension(filePath, expectedExt) {
    const actualExt = path.extname(filePath);

    if (actualExt === expectedExt) {
        console.log('File has the expected extension:', expectedExt);
    } else {
        console.log(`File does not have the expected extension. \n Expected: ${expectedExt}\n Actual: ${actualExt}`);
    }
}

checkFileExtension('test-files/file1.txt', '.txt');
checkFileExtension('test-files/dbz.jpg', '.png');
