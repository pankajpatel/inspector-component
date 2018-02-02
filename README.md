# inspector-component [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/pankajpatel/inspector-component)

Inspector webcomponent based on react-inspector

## Installation

_*npm*_: `npm install inspector-component --save-dev`

_*bower*_: `bower install inspector-component --save-dev`

## Usage

> Only for ES6 supporting browsers

```html
<script src="bower_components/inspector-components/dist/inspector-component.js"></script>

<inspector-component data='["56dcf573b09c217d39fd7621", "Hello World"]'></inspector-component>
<inspector-component data='{"_id":"56dcf573b09c217d39fd7621", "name":"Hello World"}'></inspector-component>
```

## Demo

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="inspector-component.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<div>
  One: <inspector-component data='Hello World'></inspector-component><br/>
</div>
<div>
  Two: <inspector-component data='["56dcf573b09c217d39fd7621", "Hello World"]'></inspector-component><br/>
</div>
<div>
  Three: <inspector-component data='{"_id":"56dcf573b09c217d39fd7621", "name":"Hello World"}'></inspector-component><br/>
</div>

<script>
var i = 0;
var interval = setInterval(function() {
  document.querySelector('inspector-component').log({log: i++});
}, 2000);
setTimeout(function() {
  clearInterval(interval);
}, 2000*60)
</script>
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

* 1.0.0: Refactored, breaking changes. Now only usable in ES6 enabled browsers
* 0.1.2: Added Demo
* 0.1.1: Fixed for Bower
* 0.1.0: Initial Version

## Credits

[react-inspector](https://github.com/xyc/react-inspector)

## License

[MIT](./LICENSE)
