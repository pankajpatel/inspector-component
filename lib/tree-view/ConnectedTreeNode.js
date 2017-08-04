'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('./TreeNode');
require('../object-inspector/ObjectRootLabel');
require('../object-inspector/ObjectLabel');

var parse = require('../utils/parser');

var _require = require('./pathUtils'),
    hasChildNodes = _require.hasChildNodes;

var createIterator = require('../utils/createIterator');

var _require2 = require('./pathUtils'),
    DEFAULT_ROOT_PATH = _require2.DEFAULT_ROOT_PATH,
    getExpandedPaths = _require2.getExpandedPaths;

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

var ConnectedTreeNode = function (_HTMLElement) {
  _inherits(ConnectedTreeNode, _HTMLElement);

  function ConnectedTreeNode() {
    _classCallCheck(this, ConnectedTreeNode);

    return _possibleConstructorReturn(this, (ConnectedTreeNode.__proto__ || Object.getPrototypeOf(ConnectedTreeNode)).call(this));
  }

  _createClass(ConnectedTreeNode, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var _this2 = this;

      this.name = this.getAttribute('name') || '';
      this.path = this.getAttribute('path') || DEFAULT_ROOT_PATH;
      this.depth = parseInt(this.getAttribute('depth') || 0);
      this.expanded = this.getAttribute('expanded') == 'true' ? true : false;
      this.isNonenumerable = this.getAttribute('is-nonenumerable') == 'true' ? true : false;
      this.showNonenumerable = this.getAttribute('show-non-enumerable') == 'true' ? true : false;
      this.sortObjectKeys = this.getAttribute('sort-object-keys') == 'true' ? true : false;

      this._data = this.getAttribute('data') || 'null';
      var data = parse(this._data);
      this.data = data;
      this.removeAttribute('data');

      this.state = {
        expandedPaths: {}
      };
      this.render(data);

      var element = this.querySelector('tree-node');
      var handler = function handler(e) {
        e.stopPropagation();
        e.preventDefault();
        var p = element.getAttribute('path');
        _this2.state.expandedPaths[p] = !_this2.state.expandedPaths[p];
        element.expanded = !element.expanded;
        element.setAttribute('expanded', element.expanded);
        element.querySelector('tree-arrow').setAttribute('expanded', element.expanded);
      };
      element.removeEventListener('click', handler);
      element.addEventListener('click', handler);
    }
  }, {
    key: 'render',
    value: function render(data) {
      var nodeHasChildNodes = hasChildNodes(data, createIterator(this.showNonenumerable, this.sortObjectKeys));
      var expandedPaths = this.state.expandedPaths;

      var expanded = !!expandedPaths[this.path];

      this.innerHTML = '<tree-node\n        name=\'' + this.name + '\'\n        path=\'' + this.path + '\'\n        data=\'' + this._data + '\'\n        expanded=\'' + expanded + '\'\n        depth=\'' + this.depth + '\'\n        should-show-arrow=\'' + nodeHasChildNodes + '\'\n        show-non-enumerable=\'' + this.showNonenumerable + '\'\n        sort-object-keys=\'' + this.sortObjectKeys + '\'\n        should-show-placeholder=' + (this.depth > 0) + ' >\n        ' + this.renderChildNodes(this.data, this.path) + '\n      </tree-node>';
    }
  }, {
    key: 'renderChildNodes',
    value: function renderChildNodes(parentData, parentPath) {
      var childNodes = [];
      var dataIterator = createIterator(this.showNonenumerable, this.sortObjectKeys);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = dataIterator(parentData)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          var name = item.name,
              data = item.data,
              isNonenumerable = item.isNonenumerable;

          var key = name;
          var path = parentPath + '.' + key;
          childNodes.push('\n        <connected-tree-node\n          name=\'' + name + '\'\n          data=\'' + JSON.stringify(data) + '\'\n          depth=\'' + (this.depth + 1) + '\'\n          path=\'' + path + '\'\n          should-show-arrow=\'' + (isNonenumerable || false) + '\'\n          show-non-enumerable=\'' + (this.showNonenumerable ? this.showNonenumerable : isNonenumerable) + '\'\n          sort-object-keys=\'' + this.sortObjectKeys + '\'\n        ></connected-tree-node>');
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return childNodes.join('');
    }
  }]);

  return ConnectedTreeNode;
}(HTMLElement);

customElements.define('connected-tree-node', ConnectedTreeNode);