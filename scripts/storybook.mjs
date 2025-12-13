#!/usr/bin/env node

/**
 * Storybook composition launcher
 *
 * Starts all framework Storybooks in parallel, waits for them to be ready,
 * then launches the composition host.
 *
 * This is needed to circumvent https://github.com/storybookjs/storybook/issues/18405
 *
 * To add a new framework:
 * 1. Add an entry to the `frameworks` array below
 * 2. Create the corresponding storybook:* script in package.json
 */

import concurrently from 'concurrently';

const frameworks = [
  {name: 'react', port: 6007, color: 'blue'},
  // Add more frameworks here:
  // {name: 'vue', port: 6008, color: 'green'},
  // {name: 'svelte', port: 6009, color: 'yellow'},
];

const host = {name: 'host', port: 6006, color: 'magenta'};

// Build wait-on URLs for all frameworks
const waitUrls = frameworks.map((f) => `http://localhost:${f.port}`).join(' ');

// Build concurrently commands
const commands = [
  // Start all framework Storybooks
  ...frameworks.map((f) => ({
    command: `bun run storybook:${f.name} -- -- --no-open`,
    name: f.name,
    prefixColor: f.color,
  })),
  // Wait for frameworks, then start host
  {
    command: `wait-on ${waitUrls} && bun run storybook:${host.name}`,
    name: host.name,
    prefixColor: host.color,
  },
];

concurrently(commands, {
  killOthersOn: ['failure', 'success'],
});
