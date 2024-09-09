const env = process.env.EMBER_ENV || 'development';
const postcssPresetEnv = require('postcss-preset-env');

const plugins = [
  require('postcss-easy-import'),
  require('postcss-simple-vars'),
  require('tailwindcss/nesting'),
  require('postcss-hexrgba'),
  require('postcss-easing-gradients'),
  require('postcss-responsive-type'),
  require('tailwindcss')({ config: './tailwind.config.js' }),
  postcssPresetEnv({
    stage: 0,
    features: {
      'cascade-layers': false,
      'custom-selectors': true,
    },
  }),
];

if (env === 'production') {
  plugins.push(
    require('cssnano')({
      preset: 'default',
    }),
  );
}

module.exports = {
  processors: [require('postcss-strip-inline-comments')],
  parser: 'postcss-scss',
  // map: { absolute: true, inline: true },
  plugins,
};
