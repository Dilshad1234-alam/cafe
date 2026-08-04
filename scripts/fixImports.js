const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src/app/api', (filePath) => {
  if (filePath.endsWith('.js')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(/from\s+["'](\.\.\/)+backend\//g, 'from "@/backend/');
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log('Fixed:', filePath);
    }
  }
});
