module.exports = {
   "parser": "@babel/eslint-parser",
   "parserOptions": {
      "ecmaVersion": 10
   },
   "plugins": [
      "react",
      "jasmine"
   ],
   "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:jasmine/recommended"
   ],
   "env": {
      "browser": true,
      "node": true,
      "es6": true,
      "jasmine": true
   },
   "rules": {
      "react/prop-types": [0],
      "react/display-name": [0],
      "react/no-unescaped-entities": [0],
      "react/react-in-jsx-scope": [0],
      "jasmine/new-line-before-expect": [0],
   },
   "settings": {
      "react": {
         "version": "detect",
      },
   }
};
