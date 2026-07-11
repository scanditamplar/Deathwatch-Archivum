const fs = require('fs');
const execSync = require('child_process').execSync;
try {
  console.log(execSync('find / -name "transcript.jsonl" -type f 2>/dev/null').toString());
} catch(e) {
  console.log('error finding');
}
