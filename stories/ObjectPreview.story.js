const {storiesOf} = require('modulor-storybook');

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
  .add('array', () => `
    <object-preview data='[12, 13]'></object-preview>
  `)
  .add('array of objects', () => `
    <object-preview data='[{"i": 12}, {"i": 13}]'></object-preview>
  `)
