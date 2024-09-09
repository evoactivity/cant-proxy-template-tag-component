'use strict';
// located in <app root>/config/tailwind/
const defaultTheme = require('tailwindcss/defaultTheme');

const path = require('path');

const appEntry = path.join(__dirname, 'app');
const relevantFilesGlob = '**/*.{html,js,ts,hbs,gjs,gts}';

module.exports = {
  content: [path.join(appEntry, relevantFilesGlob)],
  theme: {
    extend: {
      animation: {
        'spin-fast': 'spin 0.5s linear infinite',
      },

      fontFamily: {
        serif: [...defaultTheme.fontFamily.serif],
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        mono: [
          'ui-monospace',
          'Menlo',
          'Monaco',
          'Cascadia Mono',
          'Segoe UI Mono',
          'Roboto Mono',
          'Oxygen Mono',
          'Ubuntu Monospace',
          'Source Code Pro',
          'Fira Mono',
          'Droid Sans Mono',
          'Courier New',
          'monospace',
        ],
      },
      colors: {
        'brand-blue': '#28dee1',
        'brand-dark-blue': '#16273e',
        'brand-orange': '#ee6243',
        'brand-dark-orange': '#da5235',
        'brand-light-grey': '#f2f7f8',
        'brand-grey': '#a9a9aa',
        'brand-green': '#d3faca',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
};
