"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.regexp.exec.js");
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
let ObjectValue = /*#__PURE__*/function (_HTMLElement) {
  _inherits(ObjectValue, _HTMLElement);
  var _super = _createSuper(ObjectValue);
  function ObjectValue() {
    _classCallCheck(this, ObjectValue);
    return _super.apply(this, arguments);
  }
  _createClass(ObjectValue, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.theme = this.getAttribute("theme") || "chromeLight";
      this._data = this.getAttribute("data") || "null";
      let data = (0, _parser.default)(this._data);
      data = (0, _parser.default)(data);
      this.data = (0, _parser.default)(data);
      this.removeAttribute("data");
      this.render(data);
    }
  }, {
    key: "render",
    value: function render(data) {
      this.innerHTML = this.markup(data || this.data);
      this.setAttribute("type", typeof data);
    }
  }, {
    key: "mkStyle",
    value: function mkStyle(key) {
      const styles = this.getAttribute("styles") || {};
      const themeStyles = (0, _createStyles.default)("ObjectValue", this.theme);
      return (0, _inlineToStyle.default)(Object.assign({}, themeStyles[key], styles));
    }
  }, {
    key: "markup",
    value: function markup(object) {
      switch (typeof object) {
        case "number":
          return "<span class='objectValueNumber' style='".concat(this.mkStyle("objectValueNumber"), "' >").concat(object, "</span>");
        case "string":
          return "<span class='objectValueString' style='".concat(this.mkStyle("objectValueString"), "' >\"").concat(object, "\"</span>");
        case "boolean":
          return "<span class='objectValueBoolean' style='".concat(this.mkStyle("objectValueBoolean"), "' >").concat(String(object), "</span>");
        case "undefined":
          return "<span class='objectValueUndefined' style='".concat(this.mkStyle("objectValueUndefined"), "' >undefined</span>");
        case "object":
          if (object === null) {
            return "<span class='objectValueNull' style='".concat(this.mkStyle("objectValueNull"), "' >null</span>");
          }
          if (object instanceof Date) {
            return "<span>".concat(object.toString(), "</span>");
          }
          if (object instanceof RegExp) {
            return "<span class='objectValueRegExp' style='".concat(this.mkStyle("objectValueRegExp"), "' >").concat(object.toString(), "</span>");
          }
          if (object instanceof Array) {
            return "<span>".concat("Array[".concat(object.length, "]"), "</span>");
          }
          return "<span>".concat(object.constructor.name, "</span>");
        case "function":
          return "\n          <span>\n            <span class='objectValueFunctionKeyword' style='".concat(this.mkStyle("objectValueFunctionKeyword"), "' >function</span>\n            <span class='objectValueFunctionName' style='").concat(this.mkStyle("objectValueFunctionName"), "' >&nbsp;").concat(object.name, "()</span>\n          </span>\n        ");
        case "symbol":
          return "<span class='objectValueSymbol' style='".concat(this.mkStyle("objectValueSymbol"), "' >").concat(object.toString(), "</span>");
        default:
          return "<span />";
      }
    }
  }]);
  return ObjectValue;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define("object-value", ObjectValue);