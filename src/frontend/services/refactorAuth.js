const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, '.');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace headers: { with headers: { "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") : ""}`,
  
  const modifiedContent = content.replace(/headers:\s*\{/g, 'headers: {\n      "Authorization": `Bearer ${typeof window !== "undefined" ? sessionStorage.getItem("token") || "" : ""}`,');
  
  if (content !== modifiedContent) {
    fs.writeFileSync(filePath, modifiedContent);
    console.log('Modified:', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.js') && !fullPath.includes('refactorAuth.js')) {
      processFile(fullPath);
    }
  }
}

walkDir(servicesDir);
