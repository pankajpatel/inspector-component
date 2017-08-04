'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('./ConnectedTreeNode');
var parse = require('../utils/parser');
var createIterator = require('../utils/createIterator');

var _require = require('./pathUtils'),
    DEFAULT_ROOT_PATH = _require.DEFAULT_ROOT_PATH,
    hasChildNodes = _require.hasChildNodes,
    getExpandedPaths = _require.getExpandedPaths;

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_EXPAND':
      {
        var path = action.path;
        var expandedPaths = state.expandedPaths;
        var expanded = !!expandedPaths[path];

        return Object.assign({}, state, {
          expandedPaths: Object.assign({}, state.expandedPaths, _defineProperty({}, path, !expanded))
        });
      }
    default:
      return state;
  }
};

var TreeView = function (_HTMLElement) {
  _inherits(TreeView, _HTMLElement);

  function TreeView() {
    _classCallCheck(this, TreeView);

    return _possibleConstructorReturn(this, (TreeView.__proto__ || Object.getPrototypeOf(TreeView)).call(this));
  }

  _createClass(TreeView, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.name = this.getAttribute('name') || '';
      this._data = this.getAttribute('data') || 'null';
      var data = parse(this._data);
      this.data = data;
      this.removeAttribute('data');

      this.expandedPaths = this.getAttribute('expanded-paths') || [];
      this.expandLevel = this.getAttribute('expand-level') || 0;
      this.showNonenumerable = this.getAttribute('show-non-enumerable') == 'true' ? true : false;
      this.sortObjectKeys = this.getAttribute('sort-object-keys') == 'true' ? true : false;

      this.store = {
        storeState: {
          expandedPaths: getExpandedPaths(data, createIterator(this.showNonenumerable, this.sortObjectKeys), this.expandPaths, this.expandLevel)
        }
      };
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      var rootPath = DEFAULT_ROOT_PATH;

      this.innerHTML = '\n      <connected-tree-node\n        name=\'' + this.name + '\'\n        data=\'' + this._data + '\'\n        depth=\'0\'\n        path=\'' + rootPath + '\'\n        show-non-enumerable=\'' + this.showNonenumerable + '\'\n        sort-object-keys=\'' + this.sortObjectKeys + '\'\n      ></connected-tree-node>\n    ';
    }
  }]);

  return TreeView;
}(HTMLElement);

customElements.define('tree-view', TreeView);