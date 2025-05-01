import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    '../../apps/*/pages/**/*.{js,ts,jsx,tsx}',  // Adjust paths to where your app files are located
    '../../apps/*/components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',   // Shared UI components if any
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
