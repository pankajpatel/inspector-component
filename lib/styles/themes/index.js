"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "chromeDark", {
  enumerable: true,
  get: function get() {
    return _chromeDark.default;
  }
});
Object.defineProperty(exports, "chromeLight", {
  enumerable: true,
  get: function get() {
    return _chromeLight.default;
  }
});
exports.default = void 0;
var _chromeDark = _interopRequireDefault(require("./chromeDark"));
var _chromeLight = _interopRequireDefault(require("./chromeLight"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = {
  chromeDark: _chromeDark.default,
  chromeLight: _chromeLight.default
};
exports.default = _default;