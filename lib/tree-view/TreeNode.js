"use strict";

require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.string.trim.js");
var _createStyles = _interopRequireDefault(require("../styles/createStyles"));
var _inlineToStyle = _interopRequireDefault(require("../utils/inlineToStyle"));
var _parser = _interopRequireDefault(require("../utils/parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
const defaultNodeRenderer = _ref => {
  let {
    depth,
    name,
    data,
    isNonenumerable
  } = _ref;
  return depth === 0 ? "<object-root-label name='".concat(name !== undefined ? name : "", "' data='").concat(data, "' ></object-root-label>") : "<object-label name='".concat(name !== undefined ? name : "", "' data='").concat(data, "' isNonenumerable='").concat(isNonenumerable, "' ></object-label>");
};
let Arrow = /*#__PURE__*/function (_HTMLElement) {
  _inherits(Arrow, _HTMLElement);
  var _super = _createSuper(Arrow);
  function Arrow() {
    _classCallCheck(this, Arrow);
    return _super.apply(this, arguments);
  }
  _createClass(Arrow, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attr, oldValue, newValue) {
      if (attr == "expanded" && newValue != oldValue) {
        let span = this.querySelector("span");
        if (span) {
          span.setAttribute("style", (0, _inlineToStyle.default)(Object.assign({}, this.styles.base, newValue === true || newValue === "true" ? this.styles.expanded : this.styles.collapsed)));
        }
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      const expanded = this.getAttribute("expanded") == "true" ? true : false;
      this.styles = JSON.parse(this.getAttribute("styles") || "{}") || {};
      this.removeAttribute("styles");
      this.innerHTML = "<span style='".concat((0, _inlineToStyle.default)(Object.assign({}, this.styles.base, expanded === true ? this.styles.expanded : this.styles.collapsed)), "'>\u25B6</span>");
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ["expanded"];
    }
  }]);
  return Arrow;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define("tree-arrow", Arrow);
let TreeNode = /*#__PURE__*/function (_HTMLElement2) {
  _inherits(TreeNode, _HTMLElement2);
  var _super2 = _createSuper(TreeNode);
  function TreeNode() {
    _classCallCheck(this, TreeNode);
    return _super2.apply(this, arguments);
  }
  _createClass(TreeNode, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      const nodeRenderer = defaultNodeRenderer || (_ref2 => {
        let {
          name
        } = _ref2;
        return "<span>".concat(name, "</span>");
      });
      this._data = this.getAttribute("data") || "null";
      const data = (0, _parser.default)(this._data);
      this.data = this._data;
      this.removeAttribute("data");
      this.title = this.getAttribute("title") || "";
      this.name = this.getAttribute("name") || "";
      this.path = this.getAttribute("path");
      this.theme = this.getAttribute("theme") || "chromeLight";
      this.depth = parseInt(this.getAttribute("depth") || 0);
      this.expanded = this.getAttribute("expanded") == "true" ? true : false;
      this.shouldShowArrow = this.getAttribute("should-show-arrow") == "false" ? false : true;
      this.shouldShowPlaceholder = this.getAttribute("should-show-placeholder") == "true" ? true : false;
      const styles = (0, _createStyles.default)("TreeNode", this.theme);
      const renderedNode = nodeRenderer(this);
      const childNodes = this.innerHTML;
      this.expandable = this.shouldShowArrow && childNodes.length > 0;
      this.innerHTML = "\n      <li aria-expanded='".concat(this.expanded, "' role=\"treeitem\" style='").concat((0, _inlineToStyle.default)(styles.treeNodeBase), "' title='").concat(this.title, "'>\n        <div style='").concat((0, _inlineToStyle.default)(styles.treeNodePreviewContainer), "' path='").concat(this.path, "' class=\"clickableNode\">\n          ").concat(this.expandable ? "<tree-arrow expanded='".concat(this.expanded, "' styles='").concat(JSON.stringify(styles.treeNodeArrow), "'></tree-arrow>") : this.shouldShowPlaceholder ? "<span style='".concat((0, _inlineToStyle.default)(styles.treeNodePlaceholder), "'>&nbsp;</span>") : "", "\n          ").concat(renderedNode, "\n        </div>\n        <div class='child-nodes'>\n          ").concat(childNodes.trim().length > 0 ? "<ol role=\"group\"\n                style='".concat((0, _inlineToStyle.default)(styles.treeNodeChildNodesContainer), "'>").concat(childNodes, "</ol>") : "", "\n        </div>\n      </li>\n    ");
    }
  }]);
  return TreeNode;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define("tree-node", TreeNode);