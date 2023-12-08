#!/bin/bash

NODE_VERSION="16.20.0"
PLATFORM="$(uname -s | tr '[:upper:]' '[:lower:]')"

# Download and install Node.js
curl -o- "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-${PLATFORM}-x64.tar.gz" | tar -xz -C /usr/local --strip-components=1

# Verify installation
node -v
npm -v