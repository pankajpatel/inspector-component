const {storiesOf} = require('ascesis-storybook');

require('../src/styles/ThemeProvider');

storiesOf('ThemeProvider')
  .add('default', () => `
    <theme-provider></theme-provider>
  `)
  .add('themed', () => `
    <theme-provider theme="chromeDark"></theme-provider>
  `)
