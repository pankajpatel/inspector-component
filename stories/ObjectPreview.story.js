const {storiesOf} = require('ascesis-storybook');

require('../src/object-inspector/ObjectPreview');

storiesOf('ObjectPreview')
  .add('object', () => `
    <object-preview data='${data}'></object-preview>
  `)
  .add('string', () => `
    <object-preview data='Hello World'></object-preview>
  `)
  .add('number', () => `
    <object-preview data='12'></object-preview>
  `)
