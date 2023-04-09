#!/bin/bash

# Clear local git changes, if any
git reset --hard
# Pull new changes to frontend main
git pull origin main;
# Delete the node_modules dir
rm -r node_modules;
# Delete the package-lock.json
rm -r package-lock.json;
# Install any new npm packages
npm install;
# Build React app with said copy
npm run build;
# Print completion message
echo "CosmicStrains.com Frontend reset script successfully completed."