'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _themes = require('./themes');

var themes = _interopRequireWildcard(_themes);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var styles = Object.keys(themes).reduce(function (styles, themeName) {
  styles[themeName] = (0, _base2.default)(themes[themeName]);
  return styles;
}, {});

var createStyles = function createStyles(key, theme) {
  // console.debug(styles, theme, styles[theme])
  if (typeof theme === 'string') {
    return styles[theme][key];
  } else if ((typeof theme === 'undefined' ? 'undefined' : _typeof(theme)) === 'object') {
    return (0, _base2.default)(theme)[key];
  }
  // Default styles
  return styles['chromeLight'][key];
};

module.exports = createStyles;