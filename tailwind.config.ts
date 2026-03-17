import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Disable color opacity utilities that generate lab/oklch
  corePlugins: {
    // Explicitly disable plugins that might generate modern color functions
  },
  v3CompatibilityMode: true,
};

export default config;






