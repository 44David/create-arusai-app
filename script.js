const { execSync } = require('child_process');

execSync('npx ts-node index.ts', { stdio: 'inherit' })