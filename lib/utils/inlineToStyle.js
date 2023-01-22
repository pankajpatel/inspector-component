"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.string.trim.js");
require("core-js/modules/es.symbol.description.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const changeCase = require("param-case");
let Css = /*#__PURE__*/function () {
  function Css() {
    _classCallCheck(this, Css);
  }
  _createClass(Css, null, [{
    key: "of",
    value: function of(json) {
      const selectors = Object.keys(json);
      return selectors.map(selector => {
        const definition = json[selector];
        if (definition) {
          if (typeof definition === "object") {
            const rules = Object.keys(definition);
            const result = rules.map(rule => {
              return "".concat(rule, ":").concat(definition[rule]);
            }).join(";");
            return "".concat(selector, "{").concat(result, "}");
          } else {
            return "".concat(changeCase(selector), ": ").concat(definition, ";");
          }
        } else {
          return "";
        }
      }).filter(item => item.trim() !== "").join("\n");
    }
  }]);
  return Css;
}();
var _default = styleObj => Css.of(styleObj);
exports.default = _default;