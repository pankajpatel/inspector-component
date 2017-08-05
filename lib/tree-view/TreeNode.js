'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createStyles = require('../styles/createStyles');
var toCss = require('../utils/inlineToStyle');
var parse = require('../utils/parser');

var defaultNodeRenderer = function defaultNodeRenderer(_ref) {
  var depth = _ref.depth,
      name = _ref.name,
      data = _ref.data,
      isNonenumerable = _ref.isNonenumerable;
  return depth === 0 ? '<object-root-label name=\'' + (name !== undefined ? name : '') + '\' data=\'' + data + '\' ></object-root-label>' : '<object-label name=\'' + (name !== undefined ? name : '') + '\' data=\'' + data + '\' isNonenumerable=\'' + isNonenumerable + '\' ></object-label>';
};

var Arrow = function (_HTMLElement) {
  _inherits(Arrow, _HTMLElement);

  function Arrow() {
    _classCallCheck(this, Arrow);

    return _possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).call(this));
  }

  _createClass(Arrow, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attr, oldValue, newValue) {
      if (attr == 'expanded' && newValue != oldValue) {
        var span = this.querySelector('span');
        if (span) {
          span.setAttribute('style', toCss(_extends({}, this.styles.base, newValue === true || newValue === 'true' ? this.styles.expanded : this.styles.collapsed)));
        }
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      var expanded = this.getAttribute('expanded') == 'true' ? true : false;
      this.styles = JSON.parse(this.getAttribute('styles') || '{}') || {};
      this.removeAttribute('styles');
      this.innerHTML = '<span style=\'' + toCss(_extends({}, this.styles.base, expanded === true ? this.styles.expanded : this.styles.collapsed)) + '\'>\u25B6</span>';
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['expanded'];
    }
  }]);

  return Arrow;
}(HTMLElement);

customElements.define('tree-arrow', Arrow);

var TreeNode = function (_HTMLElement2) {
  _inherits(TreeNode, _HTMLElement2);

  function TreeNode() {
    _classCallCheck(this, TreeNode);

    return _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call(this));
  }

  _createClass(TreeNode, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      var nodeRenderer = defaultNodeRenderer || function (_ref2) {
        var name = _ref2.name;
        return '<span>' + name + '</span>';
      };

      this._data = this.getAttribute('data') || 'null';
      var data = parse(this._data);
      this.data = this._data;
      this.removeAttribute('data');

      this.title = this.getAttribute('title') || '';
      this.name = this.getAttribute('name') || '';
      this.path = this.getAttribute('path');
      this.theme = this.getAttribute('theme') || 'chromeLight';

      this.depth = parseInt(this.getAttribute('depth') || 0);

      this.expanded = this.getAttribute('expanded') == 'true' ? true : false;

      this.shouldShowArrow = this.getAttribute('should-show-arrow') == 'false' ? false : true;
      this.shouldShowPlaceholder = this.getAttribute('should-show-placeholder') == 'true' ? true : false;

      var styles = createStyles('TreeNode', this.theme);
      var renderedNode = nodeRenderer(this);
      var childNodes = this.innerHTML;
      this.expandable = this.shouldShowArrow && childNodes.length > 0;

      this.innerHTML = '\n      <li aria-expanded=\'' + this.expanded + '\' role="treeitem" style=\'' + toCss(styles.treeNodeBase) + '\' title=\'' + this.title + '\'>\n        <div style=\'' + toCss(styles.treeNodePreviewContainer) + '\' path=\'' + this.path + '\' class="clickableNode">\n          ' + (this.expandable ? '<tree-arrow expanded=\'' + this.expanded + '\' styles=\'' + JSON.stringify(styles.treeNodeArrow) + '\'></tree-arrow>' : this.shouldShowPlaceholder ? '<span style=\'' + toCss(styles.treeNodePlaceholder) + '\'>&nbsp;</span>' : '') + '\n          ' + renderedNode + '\n        </div>\n        <div class=\'child-nodes\'>\n          ' + (childNodes.trim().length > 0 ? '<ol role="group"\n                style=\'' + toCss(styles.treeNodeChildNodesContainer) + '\'>' + childNodes + '</ol>' : '') + '\n        </div>\n      </li>\n    ';
    }
  }]);

  return TreeNode;
}(HTMLElement);

customElements.define('tree-node', TreeNode);