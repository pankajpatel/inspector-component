const {storiesOf} = require('ascesis-storybook');

require('../src/object-inspector/ObjectRootLabel');

storiesOf('ObjectRootLabel')
  .add('object', () => `
    <object-root-label name="one" data='${data}'></object-root-label>
  `)
  .add('string', () => `
    <object-root-label name="two" data='Hello World'></object-root-label>
  `)
  .add('number', () => `
    <object-root-label name="three" data='12'></object-root-label>
  `)
