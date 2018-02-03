const {storiesOf} = require('modulor-storybook');

require('../src/object-inspector/ObjectInspector');

storiesOf('ObjectInspector')
  .add('object', () => `
    <object-inspector data='${data}'></object-inspector>
  `)
  .add('string', () => `
    <object-inspector data='Hello World'></object-inspector>
  `)
  .add('number', () => `
    <object-inspector data='12'></object-inspector>
  `)
  .add('array', () => `
    <object-inspector data='[12, 13]'></object-inspector>
  `)
  .add('array of objects', () => `
    <object-inspector data='[{"i": 12}, {"i": 13}]'></object-inspector>
  `)
