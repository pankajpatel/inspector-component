const {storiesOf} = require('modulor-storybook');

require('../src/object-inspector/ObjectLabel');

storiesOf('ObjectLabel')
  .add('object', () => `
    <object-label name="one" data='${data}'></object-label>
  `)
  .add('string', () => `
    <object-label name="two" data='Hello World'></object-label>
  `)
  .add('number', () => `
    <object-label name="three" data='12'></object-label>
  `)
