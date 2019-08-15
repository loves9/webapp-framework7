module.exports = {
  root: true,
  // parser: 'babel-eslint',
  // parserOptions: {
  //   sourceType: 'module'
  // },
  parserOptions: {
    parser: "babel-eslint"
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // extends: 'standard',
  extends: ["plugin:vue/essential", "@vue/standard"],
  // globals: {'expect': true, 'it': true, 'describe': true, 'ga': true, 'window': true, 'document': true, 'alert': true, 'api': true, 'apiready': true},
  env: {
    // browser: true,
    node: true
  },
  // required to lint *.vue files
  // plugins: [
  //   'html'
  // ],

  // add your custom rules here
  // 'rules': {
  //   'eol-last': 0,
  //   // allow paren-less arrow functions
  //   'arrow-parens': 0,
  //   // allow async-await
  //   'generator-star-spacing': 0,
  //   // allow debugger during development
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  // },

  // rules: {
  //   'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  // },

  rules: {
    // don't require .vue extension when importing
    "import/extensions": [
      "off",
      "always",
      {
        js: "never",
        vue: "never"
      }
    ],
    "import/no-unresolved": [0, { commonjs: true, amd: true }],
    // allow optionalDependencies
    "import/no-extraneous-dependencies": [
      "error",
      {
        optionalDependencies: ["test/unit/index.js"]
      }
    ],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]
  }
};
