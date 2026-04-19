const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');
content = content.replace(/\\n  \\{/g, '\\n  {'); // this is hard to target
fs.writeFileSync('constants.tsx', content);
