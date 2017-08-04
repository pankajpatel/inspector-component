'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./ObjectValue');
require('./ObjectName');
var toCss = require('../utils/inlineToStyle');
var parse = require('../utils/parser');

/* NOTE: Chrome console.log is italic */
var styles = {
  preview: {
    'font-style': 'italic'
  }
};

/* intersperse arr with separator */
function intersperse(arr, sep) {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce(function (xs, x) {
    return xs.concat([sep, x]);
  }, [arr[0]]);
}

/**
 * A preview of the object
 */

var ObjectPreview = function (_HTMLElement) {
  _inherits(ObjectPreview, _HTMLElement);

  function ObjectPreview() {
    _classCallCheck(this, ObjectPreview);

    return _possibleConstructorReturn(this, (ObjectPreview.__proto__ || Object.getPrototypeOf(ObjectPreview)).call(this));
  }

  _createClass(ObjectPreview, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.maxProperties = this.getAttribute('max-properties') || 5;
      this._data = this.getAttribute('data') || 'null';
      var data = parse(this._data);
      this.data = data;
      this.removeAttribute('data');

      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      this.innerHTML = this.markup(this.data, this.maxProperties) || '<!--nothing-->';
    }
  }, {
    key: 'markup',
    value: function markup(object, maxProperties) {
      if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object' || object === null || object instanceof Date || object instanceof RegExp) {
        return '<object-value data=\'' + this._data + '\' ></object-value>';
      }

      if (Array.isArray(object)) {
        return '\n        <span style=\'' + toCss(styles.preview) + '\'>\n          [' + object.map(function (element) {
          return '<object-value data=\'' + element + '\' ></object-value>';
        }).join(', ') + ']\n        </span>\n      ';
      } else {
        var propertyNodes = [];
        for (var propertyName in object) {
          var propertyValue = object[propertyName];
          if (object.hasOwnProperty(propertyName)) {
            var ellipsis = '';
            if (propertyNodes.length === maxProperties - 1 && Object.keys(object).length > maxProperties) {
              ellipsis = '<span>\u2026</span>';
            }
            propertyNodes.push('<span><object-name name=\'' + propertyName + '\'\n            ></object-name>:&nbsp;<object-value data=\'' + propertyValue + '\'\n            ></object-value>' + ellipsis + '</span>');
            if (ellipsis != '') break;
          }
        }

        var html = intersperse(propertyNodes, ', ');
        return '<span\n        style=\'' + toCss(styles.preview) + '\'\n        >' + (object.constructor.name + ' {') + ' ' + html.join('') + ' ' + '}' + '</\n          span>';
      }
    }
  }]);

  return ObjectPreview;
}(HTMLElement);

customElements.define('object-preview', ObjectPreview);