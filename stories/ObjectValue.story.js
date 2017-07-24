const {storiesOf} = require('ascesis-storybook');

require('../src/object-inspector/ObjectValue');

storiesOf('ObjectValue')
  .add('empty', () => `
    <object-value></object-value>
  `)
  .add('object', () => `
    <object-value data='${data}'></object-value>
  `)
  .add('string', () => `
    <object-value data='Hello World'></object-value>
  `)
  .add('number', () => `
    <object-value data='12'></object-value>
  `)
