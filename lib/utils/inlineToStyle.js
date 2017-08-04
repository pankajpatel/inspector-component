'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var changeCase = require('param-case');

var Css = function () {
  function Css() {
    _classCallCheck(this, Css);
  }

  _createClass(Css, null, [{
    key: 'of',
    value: function of(json) {
      var selectors = Object.keys(json);
      return selectors.map(function (selector) {
        var definition = json[selector];
        if (definition) {
          if ((typeof definition === 'undefined' ? 'undefined' : _typeof(definition)) === 'object') {
            var rules = Object.keys(definition);
            var result = rules.map(function (rule) {
              return rule + ':' + definition[rule];
            }).join(';');
            return selector + '{' + result + '}';
          } else {
            return changeCase(selector) + ': ' + definition + ';';
          }
        } else {
          return '';
        }
      }).filter(function (item) {
        return item.trim() !== '';
      }).join('\n');
    }
  }]);

  return Css;
}();

module.exports = function (styleObj) {
  return Css.of(styleObj);
};