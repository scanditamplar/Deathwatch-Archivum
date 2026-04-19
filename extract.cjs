const fs = require('fs');
let code = fs.readFileSync('App.tsx', 'utf8');

const startStr = 'onChange={e => {\n                      const val = e.target.value;';
const startIndex = code.indexOf(startStr);
if (startIndex === -1) {
  console.log('Start not found');
  process.exit(1);
}

let braceCount = 0;
let endIndex = -1;
const handlerStart = startIndex + 'onChange={e => {'.length;
for (let i = handlerStart; i < code.length; i++) {
  if (code[i] === '{') braceCount++;
  if (code[i] === '}') {
    if (braceCount === 0) {
      endIndex = i;
      break;
    }
    braceCount--;
  }
}

if (endIndex === -1) {
  console.log('End not found');
  process.exit(1);
}

const handlerBody = code.substring(handlerStart, endIndex);

const newHandler = '  const handleAdvancedSpecialityChange = (val: string) => {' + handlerBody + '  };\n';

const insertIndex = code.indexOf('  const handleChapterChange = (chapterName: string) => {');
code = code.substring(0, insertIndex) + newHandler + '\n' + code.substring(insertIndex);

const originalOnChange = 'onChange={e => {' + handlerBody + '}';
code = code.replace(originalOnChange, 'onChange={e => handleAdvancedSpecialityChange(e.target.value)}');

fs.writeFileSync('App.tsx', code);
console.log('Done');
