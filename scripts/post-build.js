#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

// Post-build script to commit and push after successful build
const commitAndPush = () => {
  try {
    // Check if dist folder exists (build was successful)
    if (!existsSync('dist')) {
      console.log('Build failed or dist folder not found. Skipping commit.');
      process.exit(0);
    }

    // Check if there are any changes to commit
    const status = execSync('git status --porcelain', { encoding: 'utf-8' });
    
    if (!status.trim()) {
      console.log('No changes to commit.');
      process.exit(0);
    }

    // Stage all changes
    console.log('Staging changes...');
    execSync('git add .', { stdio: 'inherit' });

    // Create commit with timestamp
    const timestamp = new Date().toISOString();
    const commitMessage = `Build: ${timestamp}`;
    
    console.log('Creating commit...');
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

    // Push to remote
    console.log('Pushing to remote...');
    execSync('git push', { stdio: 'inherit' });

    console.log('✓ Build committed and pushed successfully!');
  } catch (error) {
    console.error('Error during commit/push:', error.message);
    // Don't fail the build if commit/push fails
    process.exit(0);
  }
};

commitAndPush();

