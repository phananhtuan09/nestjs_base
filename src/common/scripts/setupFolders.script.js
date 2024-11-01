// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createFolder } = require('../utils/folder.util');

const folders = ['/src/shared/logs/development', '/src/shared/logs/production'];

folders.forEach((folder) => {
  createFolder(folder);
});

console.log('Folder setup complete.');
