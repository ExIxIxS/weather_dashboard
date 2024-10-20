// const { resolve } = require('path');

import { resolve } from 'path';

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // Add this if you're using setupTests
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files with ts-jest
  },
  moduleNameMapper: {
    '^src/(.*)$': resolve(__dirname, 'src/$1'),
    '\\.(scss|less)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'vite-plugin-svgr/jest', // Mock SVG imports (optional if you're using SVGR)
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
