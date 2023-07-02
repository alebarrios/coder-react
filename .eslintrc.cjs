module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "google",
    "plugin:react/recommended",
  ],
  "overrides": [
    {
      "env": {
        "node": true,
      },
      "files": [
        ".eslintrc.{js,cjs}",
      ],
      "parserOptions": {
        "sourceType": "script",
      },
    },
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": [
    "react",
  ],
  "rules": {
    'quotes':
      [0, 'single', {'avoidEscape': true, 'allowTemplateLiterals': true}],
    'linebreak-style': 'off',
    'comma-dangle': 'warn',
    'no-extra-semi': 'warn',
    'semi': 'warn',
    'require-jsdoc': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-trailing-spaces': 'warn',
  },
};
