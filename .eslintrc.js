module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "airbnb",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  },
  "settings": {
    "import/resolver": {
      "webpack": "webpack.config.js"
    }
  }
}
