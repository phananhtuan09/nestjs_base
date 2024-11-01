// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

const env = process.argv.slice(2);

const environmentCommands = {
  dev: {
    command: 'nest start --watch',
    envFile: '.env.development',
  },
  prod: {
    command: 'node dist/main',
    envFile: '.env.production',
  },
};

let finalCommand = `env-cmd -f .env node dist/main`; // Default run server in production mode

const file = environmentCommands[env[0]];

if (file && file.command && file.envFile) {
  finalCommand = `env-cmd -f ${file.envFile} ${file.command}`;
} else if (env[0]) {
  finalCommand = `env-cmd -f .env.${env[0]} nest start`;
}

try {
  console.log('Run command ' + finalCommand);
  execSync(finalCommand, { stdio: 'inherit' });
} catch (error) {
  console.error('Error executing command:', error.message);
  process.exit(1);
}
