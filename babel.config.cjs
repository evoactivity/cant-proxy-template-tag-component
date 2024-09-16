const {
  babelCompatSupport,
  templateCompatSupport,
} = require("@embroider/compat/babel");
const { hotAstProcessor } = require("ember-vite-hmr/lib/babel-plugin");

module.exports = {
  plugins: [
    ["ember-vite-hmr/lib/babel-plugin"],
    [
      "babel-plugin-ember-template-compilation",
      {
        compilerPath: "ember-source/dist/ember-template-compiler.js",
        enableLegacyModules: [
          "ember-cli-htmlbars",
          "ember-cli-htmlbars-inline-precompile",
          "htmlbars-inline-precompile",
        ],
        transforms: [hotAstProcessor.transform, ...templateCompatSupport()],
      },
    ],
    ["module:decorator-transforms"],
    [
      "@babel/plugin-transform-runtime",
      {
        absoluteRuntime: __dirname,
        useESModules: true,
        regenerator: false,
      },
    ],
    ...babelCompatSupport(),
  ],

  generatorOpts: {
    compact: false,
  },
};
