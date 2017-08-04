'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectName = require('./ObjectName');
var ObjectValue = require('./ObjectValue');

/**
 * if isNonenumerable is specified, render the name dimmed
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
      var name = this.getAttribute('name') || '';
      var data = this.getAttribute('data') || {};
      var isNonenumerable = this.getAttribute('is-non-enumerable') || false;

      this.innerHTML = '\n      <span>\n        ' + (name !== '' ? '<object-name name=\'' + name + '\' dimmed=\'' + isNonenumerable + '\'></object-name>\n        <span>: </span>' : '') + '\n        <object-value data=\'' + JSON.stringify(data) + '\' ></object-value>\n      </span>\n    ';
    }
  }]);

  return ObjectLabel;
}(HTMLElement);

customElements.define('object-label', ObjectLabel);