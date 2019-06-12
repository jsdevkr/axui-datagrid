const path = require('path');
const jsonfile = require('jsonfile');

jsonfile
  .readFile('./src/package.json')
  .then(json => {
    console.dir(`update version to "${json.version}"`);

    jsonfile
      .writeFile('./dist/package.json', json, {
        spaces: 2,
        EOL: '\r\n',
      })
      .then(res => {
        console.log('Write complete : dist/package.json');
      });

    jsonfile.readFile('./package.json').then(obj => {
      obj.version = json.version;
      jsonfile
        .writeFile('./package.json', obj, {
          spaces: 2,
          EOL: '\r\n',
        })
        .then(res => {
          console.log('Write complete : package.json');
        });
    });
  })
  .catch(err => console.error(err));
