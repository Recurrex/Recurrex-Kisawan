#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const distClientDir = 'dist/client';
const distServerDir = 'dist/server';
const outputDir = '.vercel/output';
const functionsDir = `${outputDir}/functions`;
const staticDir = `${outputDir}/static`;

// Create directories
[outputDir, functionsDir, staticDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy API handler to functions
if (fs.existsSync('api')) {
  const apiFiles = fs.readdirSync('api');
  apiFiles.forEach(file => {
    const src = path.join('api', file);
    const dest = path.join(functionsDir, file);
    
    // For index files
    if (file === 'index.ts' || file === 'index.js') {
      fs.copyFileSync(src, path.join(functionsDir, `index.${file.split('.')[1]}`));
    }
  });
}

// Copy client assets to static
if (fs.existsSync(path.join(distClientDir, 'assets'))) {
  fs.mkdirSync(path.join(staticDir, 'assets'), { recursive: true });
  const assetFiles = fs.readdirSync(path.join(distClientDir, 'assets'));
  assetFiles.forEach(file => {
    fs.copyFileSync(
      path.join(distClientDir, 'assets', file),
      path.join(staticDir, 'assets', file)
    );
  });
}

// Create a catch-all route that serves the API for all non-static paths
const config = {
  version: 3,
  routes: [
    {
      src: '/assets/(.*)',
      dest: '/static/assets/$1',
      continue: true
    },
    {
      src: '/(.*)',
      dest: '/api/index'
    }
  ]
};

fs.writeFileSync(
  path.join(outputDir, 'config.json'),
  JSON.stringify(config, null, 2)
);

console.log('✓ Vercel build output created');
