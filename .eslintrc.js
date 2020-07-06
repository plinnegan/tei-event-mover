const { config } = require('@dhis2/cli-style')

module.exports = {
  rules: { indent: 'off' },
  extends: [config.eslintReact],
}
