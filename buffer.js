#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { getConfig } from './lib/config.js';
import { validateApiKey } from './lib/auth.js';
import { BufferApi } from './lib/buffer-api.js';

export function formatProfiles(profiles) {
  if (!profiles.length) {
    return 'No connected profiles found.';
  }

  const lines = profiles.map((profile) => {
    const service = profile.service || 'unknown';
    const username = profile.username ? `@${profile.username}` : 'n/a';
    return `${chalk.green('✓')} ${service} (${username}) - ID: ${profile.id}`;
  });

  return ['Connected Profiles:', ...lines].join('\n');
}

export function createCli({ api } = {}) {
  const program = new Command();

  program
    .name('buffer')
    .description('Buffer CLI for posting and profile management')
    .version('1.0.0');

  program
    .command('profiles')
    .description('List connected social media profiles')
    .action(async () => {
      const spinner = ora('Fetching connected profiles...').start();
      try {
        const activeApi = api || new BufferApi({ ...getConfig(), apiKey: validateApiKey(getConfig().apiKey) });
        const profiles = await activeApi.getProfiles();
        spinner.stop();
        console.log(formatProfiles(profiles));
      } catch (error) {
        spinner.fail('Failed to fetch profiles');
        console.error(chalk.red(`\n❌ ${error.message}`));
        process.exitCode = 1;
      }
    });

  return program;
}

export async function run(argv = process.argv) {
  const program = createCli();
  await program.parseAsync(argv);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}
