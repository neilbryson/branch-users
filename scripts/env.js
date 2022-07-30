const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const DEFAULT_ENV_VARS = [
  'BASE_PATH',
  'DEV_AUTO_OPEN',
  'DEV_PORT',
];

const ENV_PREFIX = /^REACT_APP_/;

function generatePath(envFilePath) {
  const rootPath = fs.realpathSync(process.cwd());
  return path.resolve(rootPath, envFilePath);
}

function loadEnv() {
  const currentEnv = process.env.NODE_ENV;
  const envFiles = [
    generatePath(`.env.${currentEnv}.local`),
    generatePath(`.env.${currentEnv}`),
    generatePath(`.env.local`),
    generatePath('.env'),
  ];

  for (const envFile of envFiles) {
    if (fs.existsSync(envFile)) {
      dotenv.config({ path: envFile });
      console.log(`Using env file ${envFile}\n`);
      return;
    }
  }

  console.warn('No env files found.\n');
}

function getEnv() {
  loadEnv();
  const defaultEnvVars = {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  };

  const keys = Object.keys(process.env).filter((key) => DEFAULT_ENV_VARS.includes(key) || ENV_PREFIX.test(key));

  return keys.reduce((prev, curr) => {
    prev['process.env'][curr] = JSON.stringify(process.env[curr]);
    return prev;
  }, defaultEnvVars);
}

module.exports = getEnv;
