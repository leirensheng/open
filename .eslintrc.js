module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/recommended",
    "@vue/airbnb"
    // 'plugin:vue/essential', 'plugin:prettier/recommended', 'eslint:recommended', '@vue/airbnb'
  ],
  "globals": {
    "$": false,
    "_": false,
    "ONLINE": false,
    "XIAOBA_URL": false,
  },
  rules: {
    'vue/name-property-casing':"off",
    "eqeqeq": "off",
    "no-console": "off",
    "no-debugger": "off",
    "arrow-parens": ["error", "as-needed"],
    "func-names": ["error", "never"],
    "prefer-destructuring": "off",
    "global-require": "off",
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true
      }
    ],
    "no-restricted-globals": ["error", "event"],
    "no-extend-native": ["error"],
    "import/extensions": [
      "error",
      "always",
      {
        js: "never"
      }
    ],
    "no-param-reassign": [
      "error",
      {
        props: false
      }
    ],
    indent: "off",
    "vue/script-indent": [
      "error",
      2,
      {
        baseIndent: 1
      }
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "never"
      }
    ],
    "vue/no-v-html": ["off"],
    "linebreak-style": "off",
    "no-plusplus": "off",
    "max-len": "off",
    "no-script-url": "off",
    "vue/no-parsing-error": ["off"],
    "array-callback-return": "off",
    "no-multi-assign": "off",
    "no-trailing-spaces": "off",
    "vue/attribute-hyphenation": [
      "error",
      "always",
      {
        ignore: ["viewBox", "DTO"]
      }
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
