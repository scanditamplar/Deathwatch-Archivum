const https = require('https');
https.get('https://web.archive.org/web/20230531230419/http://www.40krpgtools.com/psychic-powers/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data.substring(0, 500)));
}).on('error', err => console.log(err));
