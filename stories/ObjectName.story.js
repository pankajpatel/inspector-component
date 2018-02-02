const {storiesOf} = require('modulor-storybook');

require('../src/object-inspector/ObjectName');

storiesOf('ObjectName')
  .add('empty', () => `
    <object-name></object-name>
  `)
  .add('object', () => `
    <object-name data='${data}'></object-name>
  `)
  .add('string', () => `
    <object-name data='"Hello World"'></object-name>
  `)
  .add('number', () => `
    <object-name data='12'></object-name>
  `)
