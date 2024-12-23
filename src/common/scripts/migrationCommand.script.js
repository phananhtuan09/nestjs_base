/* eslint-disable @typescript-eslint/no-var-requires */
// src/scripts/migrate.js

const { execSync } = require('child_process');
const path = require('path');

const dataSourcePath = path.join(
  __dirname,
  '..',
  '..',
  'shared',
  'databases',
  'typeorm',
  'dataSource.ts',
);

const args = process.argv.slice(2);
const action = args[0]; // create, generate, run, revert, show
const env = args[1]; // e.g., dev, prod
const migrationName = args[2] || 'migration';

const prefixCommand = ' typeorm-ts-node-commonjs ';

const actionCommands = {
  create: 'migration:create src/migrations/' + migrationName,
  generate:
    `migration:generate src/migrations/${migrationName} -d ` + dataSourcePath,
  run: 'migration:run  -d ' + dataSourcePath,
  revert: 'migration:revert  -d ' + dataSourcePath,
  show: 'migration:show -d ' + dataSourcePath,
};

const environmentFile = {
  dev: '.env.development',
  prod: '.env.production',
};

let envFile = '.env'; // Default to .env if no environment is specified

if (environmentFile[env]) {
  envFile = environmentFile[env];
} else if (env) {
  envFile = '.env.' + env;
}

if (!actionCommands[action]) {
  console.error(
    'Please specify a migration command (create, generate, run, revert, show) followed by any necessary arguments.',
  );
  process.exit(1);
}

// Construct the final command
let finalCommand =
  `env-cmd -f ${envFile}` + prefixCommand + actionCommands[action];

try {
  execSync(`${finalCommand}`, { stdio: 'inherit' });
  console.log('Run command:', finalCommand);
} catch (error) {
  console.error('Error executing command:', error);
  process.exit(1);
}
