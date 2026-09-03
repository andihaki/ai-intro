import concurrently from 'concurrently';

concurrently([
  {
    name: 'api',
    command: 'bun dev',
    cwd: 'packages/api',
    prefixColor: 'green',
  },
  {
    name: 'client',
    command: 'bun dev',
    cwd: 'packages/client',
    prefixColor: 'blue',
  },
]);
