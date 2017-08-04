'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../styles/ThemeProvider');
require('../tree-view/TreeView');

/**
 * Tree-view for objects
 */

var ObjectInspector = function (_HTMLElement) {
  _inherits(ObjectInspector, _HTMLElement);

  function ObjectInspector() {
    _classCallCheck(this, ObjectInspector);

    return _possibleConstructorReturn(this, (ObjectInspector.__proto__ || Object.getPrototypeOf(ObjectInspector)).call(this));
  }

  _createClass(ObjectInspector, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var showNonenumerable = this.getAttribute('show-non-enumerable') == 'true' ? true : false;
      var sortObjectKeys = this.getAttribute('sort-object-keys') == 'true' ? true : false;
      var theme = this.getAttribute('theme') || 'chromeLight';
      this._data = this.getAttribute('data') || '{}';
      this.removeAttribute('data');

      this.innerHTML = '\n      <theme-provider theme=\'' + theme + '\'>\n        <tree-view\n          theme=\'' + theme + '\'\n          data=\'' + this._data + '\'\n          show-non-enumerable=\'' + showNonenumerable + '\'\n          sort-object-keys=\'' + sortObjectKeys + '\'\n          ></tree-view>\n      </theme-provider>\n    ';
    }
  }]);

  return ObjectInspector;
}(HTMLElement);

customElements.define('object-inspector', ObjectInspector);