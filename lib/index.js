'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('document-register-element');
require('./object-inspector/ObjectInspector');

var _require = require('./utils/dom'),
    $find = _require.$find,
    $append = _require.$append,
    $prepend = _require.$prepend;

var styleTag = '<style>\ninspector-component {\n  font-family: Menlo, monospace;\n  font-size: 11px;\n  line-height: 14px;\n  cursor: default;\n}\nobject-inspector {\n  display: inline-block;\n}\nobject-root-label {\n  font-style: italic;\n}\nobject-name {\n  color: rgb(136, 19, 145);\n}\n.objectValueString {\n  color: rgb(196, 26, 22);\n}\n.child-nodes > ol {\n  padding: 0;\n  margin: 0;\n  padding-left: 12px;\n}\ntree-node .child-nodes{\n  display: none;\n}\ntree-node[expanded="true"] > li > .child-nodes{\n  display: block;\n}\n.counter {\n  display: none;\n}\n.counter.shown {\n  display: inline-block;\n  margin-right: 5px;\n  margin-top: 3px;\n  margin-bottom: 3px;\n  border-radius: 9px;\n  background: #cdcecf;\n  padding: 4px;\n  min-width: 12px;\n  text-align: center;\n  height: 12px;\n  font-size: 10px;\n  color: #555;\n}\n</style>';

var Inspector = function (_HTMLElement) {
  _inherits(Inspector, _HTMLElement);

  function Inspector() {
    _classCallCheck(this, Inspector);

    return _possibleConstructorReturn(this, (Inspector.__proto__ || Object.getPrototypeOf(Inspector)).call(this));
  }

  _createClass(Inspector, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attr, oldValue, newValue) {
      if (attr == 'data' && newValue != oldValue) {
        this.render(newValue);
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _data = this.getAttribute('data');
      this.removeAttribute('data');
      this.render(_data);
    }
  }, {
    key: 'log',
    value: function log(_data) {
      var data = typeof _data === 'string' ? _data : JSON.stringify(_data);
      if (data !== this._data) {
        this._data = data;
        $prepend(this.inspector(data), this);
      } else {
        var counter = this.querySelector('.counter');
        var count = parseInt(counter.innerHTML);
        counter.innerHTML = count + 1;
        counter.classList.add('shown');
      }
    }
  }, {
    key: 'inspector',
    value: function inspector(data) {
      return data && data.length ? '<div><span class="counter">1</span><object-inspector data=\'' + data + '\' theme=\'chromeLight\' ></object-inspector></div>' : '';
    }
  }, {
    key: 'render',
    value: function render(data) {
      this._data = data;
      this.innerHTML = styleTag + '\n    ' + this.inspector(data);
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['data'];
    }
  }]);

  return Inspector;
}(HTMLElement);

customElements.define('inspector-component', Inspector);