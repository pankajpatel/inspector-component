'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createStyles = require('../styles/createStyles');
var toCss = require('../utils/inlineToStyle');

/**
 * A view for object property names.
 *
 * If the property name is enumerable (in Object.keys(object)),
 * the property name will be rendered normally.
 *
 * If the property name is not enumerable (`Object.prototype.propertyIsEnumerable()`),
 * the property name will be dimmed to show the difference.
 */

var ObjectLabel = function (_HTMLElement) {
  _inherits(ObjectLabel, _HTMLElement);

  function ObjectLabel() {
    _classCallCheck(this, ObjectLabel);

    return _possibleConstructorReturn(this, (ObjectLabel.__proto__ || Object.getPrototypeOf(ObjectLabel)).call(this));
  }

  _createClass(ObjectLabel, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.name = this.getAttribute('name') || 'undefined';
      var object = this.getAttribute('data');
      this.theme = this.getAttribute('theme') || 'chromeLight';
      var dimmed = this.getAttribute('dimmed') === 'true' ? true : false;
      var styles = this.getAttribute('styles') || {};
      this.themeStyles = createStyles('ObjectName', this.theme);

      this.appliedStyles = _extends({}, this.themeStyles.base, dimmed ? themeStyles['dimmed'] : {}, styles);

      this.render(this.name, this.appliedStyles);
    }
  }, {
    key: 'render',
    value: function render(name, appliedStyles) {
      this.innerHTML = '<span style=\'' + toCss(appliedStyles) + '\'>' + name + '</span>';
    }
  }]);

  return ObjectLabel;
}(HTMLElement);

customElements.define('object-name', ObjectLabel);