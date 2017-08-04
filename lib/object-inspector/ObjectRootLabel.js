'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./ObjectName');
require('./ObjectPreview');

var ObjectRootLabel = function (_HTMLElement) {
  _inherits(ObjectRootLabel, _HTMLElement);

  function ObjectRootLabel() {
    _classCallCheck(this, ObjectRootLabel);

    return _possibleConstructorReturn(this, (ObjectRootLabel.__proto__ || Object.getPrototypeOf(ObjectRootLabel)).call(this));
  }

  _createClass(ObjectRootLabel, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var name = this.getAttribute('name') || undefined;
      this._data = this.getAttribute('data') || 'null';
      this.removeAttribute('data');

      this.innerHTML = name && typeof name === 'string' ? '<span>\n          <object-name name=\'' + name + '\'></object-name>\n          <span>: </span>\n          <object-preview data=\'' + this._data + '\' ></object-preview>\n        </span>' : '<object-preview data=\'' + this._data + '\' ></object-preview>';
    }
  }]);

  return ObjectRootLabel;
}(HTMLElement);

customElements.define('object-root-label', ObjectRootLabel);