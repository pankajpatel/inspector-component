"use strict";

require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
require("./ConnectedTreeNode");
var _parser = _interopRequireDefault(require("../utils/parser"));
var _createIterator = _interopRequireDefault(require("../utils/createIterator"));
var _pathUtils = require("../utils/pathUtils");
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
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_EXPAND":
      {
        const path = action.path;
        const expandedPaths = state.expandedPaths;
        const expanded = !!expandedPaths[path];
        return Object.assign({}, state, {
          expandedPaths: Object.assign({}, state.expandedPaths, {
            [path]: !expanded
          })
        });
      }
    default:
      return state;
  }
};
let TreeView = /*#__PURE__*/function (_HTMLElement) {
  _inherits(TreeView, _HTMLElement);
  var _super = _createSuper(TreeView);
  function TreeView() {
    _classCallCheck(this, TreeView);
    return _super.apply(this, arguments);
  }
  _createClass(TreeView, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.name = this.getAttribute("name") || "";
      this._data = this.getAttribute("data") || "null";
      const data = (0, _parser.default)(this._data);
      this.data = data;
      this.removeAttribute("data");
      this.expandedPaths = this.getAttribute("expanded-paths") || [];
      this.expandLevel = this.getAttribute("expand-level") || 0;
      this.showNonenumerable = this.getAttribute("show-non-enumerable") == "true" ? true : false;
      this.sortObjectKeys = this.getAttribute("sort-object-keys") == "true" ? true : false;
      this.store = {
        storeState: {
          expandedPaths: (0, _pathUtils.getExpandedPaths)(data, (0, _createIterator.default)(this.showNonenumerable, this.sortObjectKeys), this.expandPaths, this.expandLevel)
        }
      };
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      const rootPath = _pathUtils.DEFAULT_ROOT_PATH;
      this.innerHTML = "\n      <connected-tree-node\n        name='".concat(this.name, "'\n        data='").concat(this._data, "'\n        depth='0'\n        path='").concat(rootPath, "'\n        show-non-enumerable='").concat(this.showNonenumerable, "'\n        sort-object-keys='").concat(this.sortObjectKeys, "'\n      ></connected-tree-node>\n    ");
    }
  }]);
  return TreeView;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define("tree-view", TreeView);