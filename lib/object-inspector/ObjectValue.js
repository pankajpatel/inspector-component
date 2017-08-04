'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createStyles = require('../styles/createStyles');
var toCss = require('../utils/inlineToStyle');
var parse = require('../utils/parser');
/**
 * A short description of the object values.
 * Can be used to render tree node in ObjectInspector
 * or render objects in TableInspector.
 */

var ObjectValue = function (_HTMLElement) {
  _inherits(ObjectValue, _HTMLElement);

  function ObjectValue() {
    _classCallCheck(this, ObjectValue);

    return _possibleConstructorReturn(this, (ObjectValue.__proto__ || Object.getPrototypeOf(ObjectValue)).call(this));
  }

  _createClass(ObjectValue, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.theme = this.getAttribute('theme') || 'chromeLight';

      this._data = this.getAttribute('data') || 'null';
      var data = parse(this._data);
      data = parse(data);
      this.data = parse(data);
      this.removeAttribute('data');

      this.render(data);
    }
  }, {
    key: 'render',
    value: function render(data) {
      this.innerHTML = this.markup(data || this.data);
      this.setAttribute('type', typeof data === 'undefined' ? 'undefined' : _typeof(data));
    }
  }, {
    key: 'mkStyle',
    value: function mkStyle(key) {
      var styles = this.getAttribute('styles') || {};
      var themeStyles = createStyles('ObjectValue', this.theme);
      return toCss(_extends({}, themeStyles[key], styles));
    }
  }, {
    key: 'markup',
    value: function markup(object) {
      switch (typeof object === 'undefined' ? 'undefined' : _typeof(object)) {
        case 'number':
          return '<span class=\'objectValueNumber\' style=\'' + this.mkStyle('objectValueNumber') + '\' >' + object + '</span>';
        case 'string':
          return '<span class=\'objectValueString\' style=\'' + this.mkStyle('objectValueString') + '\' >"' + object + '"</span>';
        case 'boolean':
          return '<span class=\'objectValueBoolean\' style=\'' + this.mkStyle('objectValueBoolean') + '\' >' + String(object) + '</span>';
        case 'undefined':
          return '<span class=\'objectValueUndefined\' style=\'' + this.mkStyle('objectValueUndefined') + '\' >undefined</span>';
        case 'object':
          if (object === null) {
            return '<span class=\'objectValueNull\' style=\'' + this.mkStyle('objectValueNull') + '\' >null</span>';
          }
          if (object instanceof Date) {
            return '<span>' + object.toString() + '</span>';
          }
          if (object instanceof RegExp) {
            return '<span class=\'objectValueRegExp\' style=\'' + this.mkStyle('objectValueRegExp') + '\' >' + object.toString() + '</span>';
          }
          if (Array.isArray(object)) {
            return '<span>' + ('Array[' + object.length + ']') + '</span>';
          }
          return '<span>' + object.constructor.name + '</span>';
        case 'function':
          return '\n          <span>\n            <span class=\'objectValueFunctionKeyword\' style=\'' + this.mkStyle('objectValueFunctionKeyword') + '\' >function</span>\n            <span class=\'objectValueFunctionName\' style=\'' + this.mkStyle('objectValueFunctionName') + '\' >&nbsp;' + object.name + '()</span>\n          </span>\n        ';
        case 'symbol':
          return '<span class=\'objectValueSymbol\' style=\'' + this.mkStyle('objectValueSymbol') + '\' >' + object.toString() + '</span>';
        default:
          return '<span />';
      }
    }
  }]);

  return ObjectValue;
}(HTMLElement);

customElements.define('object-value', ObjectValue);