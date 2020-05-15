const fs = require('fs');
const path = require('path');
const version = require('../package').version;

const versionFilePath = path.resolve('./xconsole.json');
console.log(version, process.cwd(), versionFilePath);

fs.writeFile(versionFilePath, JSON.stringify({
  version,
}), () => {
  console.log('xconsole.json success generated!')
})

module.exports = {
  version,
}
