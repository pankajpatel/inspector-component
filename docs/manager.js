/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = (() => {
  let stories = {};

  function _storiesOf(name){
    this.storyName = name;
    this.stories = {};
    this.decorators = [];
  };

  _storiesOf.prototype.add = function(name, fn){
    this.stories[name] = {
      render: fn
    };
    return this;
  };

  _storiesOf.prototype.addDecorator = function(fn){
    this.decorators.push(fn);
    return this;
  };

  _storiesOf.prototype.getStories = function(fn){
    return this.stories;
  };

  _storiesOf.prototype.getStory = function(name){
    return this.stories[name];
  };

  _storiesOf.prototype.renderStory = function(name){
    return this.decorators.reduce((acc, decorator) => {
      return () => {
        return decorator.apply(null, [].concat(acc, Array.prototype.slice.call(arguments)));
      };
    }, this.stories[name].render)();
  };

  function storiesOf(name){
    const storiesOf = new _storiesOf(name);
    stories[name] = storiesOf;
    return storiesOf;
  }

  function getStories(){
    return stories;
  }

  function getStory(story, storyKind){
    return stories[story].getStory(storyKind);
  }

  return {
    storiesOf, getStories, getStory
  }

})();



/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = (object, callback) => {
  let data = null;
  try {
    data = JSON.parse(object);
  } catch(e) {
    if(isNaN(Number(object))) {
      //try for String, Boolean, null, undefined
      switch(object){
        case 'null':
          data = null;
          break;
        case 'undefined':
          data = undefined;
          break;
        case 'true':
        case 'false':
          data = Boolean(object);
          break;
        default:
          data = object;
      }
    } else {
      data = Number(object);
    }
  } finally {
    callback ? callback(data) : () => {};
  }
  return data;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const changeCase = __webpack_require__(25);
class Css {
  static of (json) {
    const selectors = Object.keys(json)
    return selectors.map((selector) => {
      const definition = json[selector]
      if(definition) {
        if(typeof definition === 'object') {
          const rules = Object.keys(definition)
          const result = rules.map((rule) => {
            return `${rule}:${definition[rule]}`
          }).join(';')
          return `${selector}{${result}}`;
        } else {
          return `${changeCase(selector)}: ${definition};`;
        }
      } else {
        return '';
      }
    }).filter(item => item.trim() !== '').join('\n')
  }
}

module.exports = styleObj => Css.of(styleObj);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_createStyles__ = __webpack_require__(4);

const toCss = __webpack_require__(2);

/**
 * A view for object property names.
 *
 * If the property name is enumerable (in Object.keys(object)),
 * the property name will be rendered normally.
 *
 * If the property name is not enumerable (`Object.prototype.propertyIsEnumerable()`),
 * the property name will be dimmed to show the difference.
 */
class ObjectLabel extends HTMLElement {
  connectedCallback() {
    this.name = this.getAttribute('name') || 'undefined';
    const object = this.getAttribute('data');
    object && (this.name = object.constructor.name);
    this.theme = this.getAttribute('theme') || 'chromeLight';
    const dimmed = this.getAttribute('dimmed') === 'true' ? true : false;
    const styles = this.getAttribute('styles') || {};
    this.themeStyles = Object(__WEBPACK_IMPORTED_MODULE_0__styles_createStyles__["a" /* default */])('ObjectName', this.theme);

    this.appliedStyles = Object.assign({},
      this.themeStyles.base,
      (dimmed ? themeStyles['dimmed'] : {}),
      styles,
    );

    this.render(this.name, this.appliedStyles);
  }

  render(name = this.name, appliedStyles = this.appliedStyles) {
    this.innerHTML = `<span style='${toCss(appliedStyles)}'>${name}</span>`;
  }
}
customElements.define('object-name', ObjectLabel);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__themes__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__themes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__themes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(23);



const styles = Object.keys(__WEBPACK_IMPORTED_MODULE_0__themes__).reduce((styles, themeName) => {
  styles[themeName] = Object(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__themes__[themeName]);
  return styles;
}, {});

/* harmony default export */ __webpack_exports__["a"] = ((key, theme) => {
  if (typeof theme === 'string') {
    return styles[theme][key];
  } else if (typeof theme === 'object') {
    return Object(__WEBPACK_IMPORTED_MODULE_1__base__["a" /* default */])(theme)[key];
  }
  // Default styles
  return styles['chromeLight'][key];
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_createStyles__ = __webpack_require__(4);

const toCss = __webpack_require__(2);
const parse = __webpack_require__(1);

class ObjectValue extends HTMLElement {
  connectedCallback() {
    this.theme = this.getAttribute('theme') || 'chromeLight';

    this._data = (this.getAttribute('data') || 'null');
    let data = parse(this._data);
    data = parse(data);
    this.data = parse(data);
    this.removeAttribute('data');

    this.render(data);
  }

  render(data) {
    this.innerHTML = this.markup(data || this.data);
    this.setAttribute('type', typeof data);
  }
  mkStyle(key) {
    const styles = this.getAttribute('styles') || {};
    const themeStyles = Object(__WEBPACK_IMPORTED_MODULE_0__styles_createStyles__["a" /* default */])('ObjectValue', this.theme);
    return toCss(Object.assign({}, themeStyles[key], styles));
  }

  markup(object) {
    switch (typeof object) {
      case 'number':
        return (`<span class='objectValueNumber' style='${this.mkStyle('objectValueNumber')}' >${object}</span>`);
      case 'string':
        return (`<span class='objectValueString' style='${this.mkStyle('objectValueString')}' >"${object}"</span>`);
      case 'boolean':
        return (`<span class='objectValueBoolean' style='${this.mkStyle('objectValueBoolean')}' >${String(object)}</span>`);
      case 'undefined':
        return `<span class='objectValueUndefined' style='${this.mkStyle('objectValueUndefined')}' >undefined</span>`;
      case 'object':
        if (object === null) {
          return `<span class='objectValueNull' style='${this.mkStyle('objectValueNull')}' >null</span>`;
        }
        if (object instanceof Date) {
          return (`<span>${object.toString()}</span>`);
        }
        if (object instanceof RegExp) {
          return (`<span class='objectValueRegExp' style='${this.mkStyle('objectValueRegExp')}' >${object.toString()}</span>`);
        }
        if (object instanceof Array) {
          return `<span>${`Array[${object.length}]`}</span>`;
        }
        return (`<span>${object.constructor.name}</span>`);
      case 'function':
        return (`
          <span>
            <span class='objectValueFunctionKeyword' style='${this.mkStyle('objectValueFunctionKeyword')}' >function</span>
            <span class='objectValueFunctionName' style='${this.mkStyle('objectValueFunctionName')}' >&nbsp;${object.name}()</span>
          </span>
        `);
      case 'symbol':
        return (`<span class='objectValueSymbol' style='${this.mkStyle('objectValueSymbol')}' >${object.toString()}</span>`);
      default:
        return `<span />`;
    }
  }
}
customElements.define('object-value', ObjectValue);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["hasChildNodes"] = hasChildNodes;
const DEFAULT_ROOT_PATH = '$';
/* harmony export (immutable) */ __webpack_exports__["DEFAULT_ROOT_PATH"] = DEFAULT_ROOT_PATH;


const WILDCARD = '*';

function hasChildNodes(data, dataIterator) {
  return !dataIterator(data).next().done;
}

const wildcardPathsFromLevel = level => {
  // i is depth
  return Array.from({ length: level }, (_, i) =>
    [DEFAULT_ROOT_PATH].concat(Array.from({ length: i }, () => '*')).join('.'),
  );
};
/* harmony export (immutable) */ __webpack_exports__["wildcardPathsFromLevel"] = wildcardPathsFromLevel;


const getExpandedPaths = (
  data,
  dataIterator,
  expandPaths,
  expandLevel,
  initialState = {},
) => {
  let wildcardPaths = []
    .concat(wildcardPathsFromLevel(expandLevel))
    .concat(expandPaths)
    .filter(path => typeof path === 'string'); // could be undefined

  const expandedPaths = [];
  wildcardPaths.forEach(wildcardPath => {
    const keyPaths = wildcardPath.split('.');
    const populatePaths = (curData, curPath, depth) => {
      if (depth === keyPaths.length) {
        expandedPaths.push(curPath);
        return;
      }
      const key = keyPaths[depth];
      if (depth === 0) {
        if (
          hasChildNodes(curData, dataIterator) &&
          (key === DEFAULT_ROOT_PATH || key === WILDCARD)
        ) {
          populatePaths(curData, DEFAULT_ROOT_PATH, depth + 1);
        }
      } else {
        if (key === WILDCARD) {
          for (let { name, data } of dataIterator(curData)) {
            if (hasChildNodes(data, dataIterator)) {
              populatePaths(data, `${curPath}.${name}`, depth + 1);
            }
          }
        } else {
          const value = curData[key];
          if (hasChildNodes(value, dataIterator)) {
            populatePaths(value, `${curPath}.${key}`, depth + 1);
          }
        }
      }
    };

    populatePaths(data, '', 0);
  });

  return expandedPaths.reduce((obj, path) => {
    obj[path] = true;
    return obj;
  }, initialState);
};
/* harmony export (immutable) */ __webpack_exports__["getExpandedPaths"] = getExpandedPaths;



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseController = exports.BaseComponent = exports.walkDOM = exports.fireEvent = exports.hasClass = exports.toggleClass = exports.removeClass = exports.addClass = exports.html = exports.attr = exports.toArray = exports.$ = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _delegate = __webpack_require__(12);

var _dom_utils = __webpack_require__(38);

var domUtils = _interopRequireWildcard(_dom_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Modulor library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module modulor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * */

/**
 *  dom utils proxy functions
 *  @deprecated use dom_utils.js directly instead
 * */

/**
 *  Select nodes
 *  @param {String} selector Selector
 *  @param {HTMLElement} [element=window.document] Element
 *  @return {Array} Collection of nodes
 * */
var $ = exports.$ = function $(selector, element) {
  return domUtils.$(element, selector);
};

/**
 *  Converts NodeList to array
 *  @param {NodeList} nodes Elements collection
 *  @return {Array} Collection of nodes
 * */
var toArray = exports.toArray = function toArray(nodes) {
  return domUtils.toArray(nodes);
};

/**
 *  Get/set element attribute
 *  @param {HTMLElement} element Element
 *  @param {String} key Attribute name
 *  @param {String} [value] Attribute value
 *  @return {String} Attribute value
 * */
var attr = exports.attr = function attr(element, key, value) {
  return domUtils.attr(key, value, element);
};

/**
 *  Set the HTML content of element, or generate DocumentFragment
 *  @param {String} htmlString HTML content string
 *  @param {HTMLElement} [target] Element to set content
 *  @return {HTMLElement|DocumentFragment}
 *    Target if target parameter is set or document fragment
 * */
var html = exports.html = function html(htmlString, target) {
  return domUtils.html(target, htmlString)[0];
};

/**
 *  Add a class to the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
var addClass = exports.addClass = function addClass(element, className) {
  return domUtils.addClass(className, element);
};

/**
 *  Remove a class from the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
var removeClass = exports.removeClass = function removeClass(element, className) {
  return domUtils.removeClass(className, element);
};

/**
 *  Toggle a class at the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
var toggleClass = exports.toggleClass = function toggleClass(element, className) {
  return domUtils.toggleClass(className, element);
};

/**
 *  Check if the element has a class
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
var hasClass = exports.hasClass = function hasClass(element, className) {
  return domUtils.hasClass(className, element);
};

/**
 *  Fires an event on element
 *  @param {String} eventName Event name
 *  @param {HTMLElement} target Element to trigger event on
 *  @param {*} [eventData] Data to attach to event
 * */
var fireEvent = exports.fireEvent = function fireEvent(eventName, target, eventData) {
  return domUtils.fireEvent(eventName, target, eventData);
};

/**
 *  Traverse DOM node
 *  @param {HTMLElement} node Element
 *  @param {Function} filter Filter child nodes function
 *  @param {Function} skipNode Skip child nodes function
 *  @return {Array} Collection of nodes
 * */
var walkDOM = exports.walkDOM = function walkDOM(node, filter, skipNode) {
  return domUtils.walkDOM(node, filter, skipNode);
};

/**
 * @class BaseComponent
 * */

var BaseComponent = exports.BaseComponent = function (_HTMLElement) {
  _inherits(BaseComponent, _HTMLElement);

  function BaseComponent() {
    _classCallCheck(this, BaseComponent);

    return _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).apply(this, arguments));
  }

  _createClass(BaseComponent, [{
    key: 'toggleHighlight',


    /**
     *  Toggle debug class on component
     *  @category debug
     */
    value: function toggleHighlight() {
      this.toggleClass(this.componentType + '-highlighted');
    }

    /**
     *  Toggle debug class on component and child components
     *  @category debug
     */

  }, {
    key: 'toggleHighlightAll',
    value: function toggleHighlightAll() {
      this.toggleHighlight();
      this.childComponents.forEach(function (child) {
        child.toggleHighlightAll();
      });
    }

    //DOM

    /**
     *  Select nodes
     *  @category DOM API
     *  @param {String} selector Selector
     *  @return {Array} Collection of nodes
     */

  }, {
    key: '$',
    value: function $(selector) {
      return domUtils.$(this, selector);
    }

    /**
     *  Get/set element attribute
     *  @category DOM API
     *  @param {String} key Attribute name
     *  @param {String} [value] Attribute value
     *  @return {String} Attribute value
     * */

  }, {
    key: 'attr',
    value: function attr(key, value) {
      return domUtils.attr(key, value, this);
    }

    /**
     *  Add a class to the element
     *  @category DOM API
     *  @param {String} className Class name
     * */

  }, {
    key: 'addClass',
    value: function addClass(className) {
      return domUtils.addClass(className, this);
    }

    /**
     *  Remove a class from the element
     *  @category DOM API
     *  @param {String} className Class name
     * */

  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      return domUtils.removeClass(className, this);
    }

    /**
     *  Toggle a class at the element
     *  @category DOM API
     *  @param {String} className Class name
     * */

  }, {
    key: 'toggleClass',
    value: function toggleClass(className) {
      return domUtils.toggleClass(className, this);
    }

    /**
     *  Check if the element has a class
     *  @category DOM API
     *  @param {String} className Class name
     *  @return {Boolean}
     * */

  }, {
    key: 'hasClass',
    value: function hasClass(className) {
      return domUtils.hasClass(className, this);
    }

    /**
     * Set the HTML content of element
     * @category DOM API
     * @param {String} htmlString HTML content string
     * @param {HTMLElement} [$el] Target element
     * @return {Object} refs
     *
     * @example
     * // set content
     * this.html(`<div></div>`);
     *
     * @example
     * // set content of another element
     * this.html(`<div></div>`, <HTMLElement>);
     *
     * @example
     * // get refs
     * const refs = this.html(`
     *   <div id="some_id" ref="some_ref">
     *     <span refs="span_elements" id="span_1"></span>
     *     <span refs="span_elements" id="span_2"></span>
     *   </div>
     * `) //=> { some_ref: <HTMLElement#some_id>, span_elements: [<HTMLElement#span_1>, <HTMLElement#span_2>] }
     *
     * @example
     * // await child elements (only when instance of modulor component)
     * const refs = this.html(`
     *   <child-component ref="$childComponent"></child-component>
     *   <div ref="$someDiv"></div>
     * `);
     * refs['$childComponent'].whenComponentConnected.then(($childComponent) => ...);
     * refs['$someDiv'].whenComponentConnected.then(...never resolves...);
     *
     * */

  }, {
    key: 'html',
    value: function html(html_string) {
      var $el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

      return domUtils.html($el, html_string)[1];
    }

    //events
    /**
     *  Subscribe an event
     *  @category events
     *  @param {String} eventName Event name
     *  @param {String} [selector] Selector
     *  @param {Function} callback Event name
     * */

  }, {
    key: 'on',
    value: function on(eventName, selector, callback) {
      if (!callback) {
        callback = selector;
        selector = null;
      }
      _delegate.delegate.on(eventName, this, selector, callback);
    }

    /**
     *  Unsubscribe an event
     *  Unsibscribe all events when called without arguments
     *  Unsibscribe all events by selector when called without *selector* argument
     *  @category events
     *  @param {String} [eventName] Event name
     *  @param {String} [selector] Selector
     *  @param {Function} [callback] Event name
     * */

  }, {
    key: 'off',
    value: function off() {
      var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var selector = arguments[1];
      var callback = arguments[2];

      if (!callback) {
        callback = selector;
        selector = null;
      }
      _delegate.delegate.off(eventName, this, selector, callback);
    }

    /**
     *  Fires an event on element
     *  @category events
     *  @param {String} eventName Event name
     *  @param {*} [eventData] Data to attach to event
     * */

  }, {
    key: 'trigger',
    value: function trigger(eventName, eventData) {
      domUtils.fireEvent(eventName, this, eventData);
    }

    //lifecycle callbacks

  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.trigger('component-attached');
      this.on('component-attached', function (event) {
        event.stopPropagation();
      });
      this.__whenConnectedResolver && this.__whenConnectedResolver();
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.off();
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, oldValue, newValue) {
      if (this.proxyAttributes[name]) {
        this[name] = this.proxyAttributes[name](newValue, oldValue);
      }
    }
  }, {
    key: '__isModulor',
    get: function get() {
      return true;
    }

    /**
     * @category properties
     * @property {String} componentType="component" - Component type
     */

  }, {
    key: 'componentType',
    get: function get() {
      return 'component';
    }

    /**
     * @category properties
     * @property {Object.<String, Function>} proxyAttributes={} - Proxy attributes to properties
     */

  }, {
    key: 'proxyAttributes',
    get: function get() {
      return {};
    }

    /**
     *  *Getter*.
     *  List of child components.
     *  **Use only for debug purposes due to low efficiency**
     *  @category debug
     *  @return {Array.<BaseComponent>}
     */

  }, {
    key: 'childComponents',
    get: function get() {
      return domUtils.walkDOM(this, function (node) {
        return node.__isModulor;
      }, function (node) {
        return node.__isModulor;
      });
    }

    /**
     *  *Getter*.
     *  Parent component.
     *  **Use only for debug purposes due to low efficiency**
     *  @category debug
     *  @return {BaseComponent}
     */

  }, {
    key: 'parentComponent',
    get: function get() {
      var parent = this;
      while (parent = parent.parentNode) {
        if (parent.__isModulor) {
          break;
        }
      }
      return parent;
    }
  }]);

  return BaseComponent;
}(HTMLElement);

/**
 *  @deprecated
 *  @class BaseController
 *  @extends BaseComponent
 * */


var BaseController = exports.BaseController = function (_BaseComponent) {
  _inherits(BaseController, _BaseComponent);

  function BaseController() {
    _classCallCheck(this, BaseController);

    return _possibleConstructorReturn(this, (BaseController.__proto__ || Object.getPrototypeOf(BaseController)).apply(this, arguments));
  }

  _createClass(BaseController, [{
    key: 'componentType',

    /**
     * @category properties
     * @property {String} componentType="controller" - Component type
     */
    get: function get() {
      return 'controller';
    }
  }]);

  return BaseController;
}(BaseComponent);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
__webpack_require__(9);

class ObjectRootLabel extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || undefined;
    this._data = (this.getAttribute('data') || 'null');
    this.removeAttribute('data');

    this.innerHTML = (name && typeof name === 'string')
      ? `<span>
          <object-name name='${name}'></object-name>
          <span>: </span>
          <object-preview data='${this._data}' ></object-preview>
        </span>`
      : `<object-preview data='${this._data}' ></object-preview>`;
  }
}

customElements.define('object-root-label', ObjectRootLabel);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
__webpack_require__(3);
const toCss = __webpack_require__(2);
const parse = __webpack_require__(1);

/* NOTE: Chrome console.log is italic */
const styles = {
  preview: {
    'font-style': 'italic'
  }
};

/* intersperse arr with separator */
function intersperse(arr, sep) {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce((xs, x) => xs.concat([sep, x]), [arr[0]]);
}

/**
 * A preview of the object
 */
class ObjectPreview extends HTMLElement {
  connectedCallback() {
    this.maxProperties = this.getAttribute('max-properties') || 3;
    this._data = (this.getAttribute('data') || 'null');
    const data = parse(this._data);
    this.data = data;
    this.removeAttribute('data');

    this.render();
  }

  render() {
    this.innerHTML = this.markup(this.data, this.maxProperties) || '<!--nothing-->';
  }

  markup(object, maxProperties) {
    if (
      typeof object !== 'object' ||
      object === null ||
      object instanceof Date ||
      object instanceof RegExp
    ) {
      return `<object-value data='${this._data}' ></object-value>`;
    }

    if (object instanceof Array) {
      return (`
        <span style='${toCss(styles.preview)}'>
          (${object.length}) [${
            object.map(element => {
              return `<object-value data='${JSON.stringify(element)}' ></object-value>`
            }).join(', ')
          }]
        </span>
      `);
    } else if (typeof object === 'string') {
      return `<object-value data='${object}' ></object-value>`;
    } else {
      let propertyNodes = [];
      for (let propertyName in object) {
        const propertyValue = object[propertyName];
        if (object.hasOwnProperty(propertyName)) {
          let ellipsis = '';
          if (
            propertyNodes.length === maxProperties - 1 &&
            Object.keys(object).length > maxProperties
          ) {
            ellipsis = `<span>…</span>`;
          }
          propertyNodes.push(`<span><object-name name='${propertyName}'
            ></object-name>:&nbsp;<object-value data='${propertyValue}'
            ></object-value>${ellipsis}</span>`);
          if (ellipsis != '') break;
        }
      }

      const html = intersperse(propertyNodes, ', ');
      return `<span
        style='${toCss(styles.preview)}'
        >${`${object.constructor.name} {`} ${html.join('')} ${'}'}</
          span>`;
    }
  }
}

customElements.define('object-preview', ObjectPreview);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const ObjectName = __webpack_require__(3);
const ObjectValue = __webpack_require__(5);

/**
 * if isNonenumerable is specified, render the name dimmed
 */
class ObjectLabel extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || '';
    const data = this.getAttribute('data') || {};
    const isNonenumerable = this.getAttribute('is-non-enumerable') || false;

    this.innerHTML = `
      <span>
        ${name !== '' ? `<object-name name='${name}' dimmed='${isNonenumerable}'></object-name>
        <span>: </span>` : ''}
        <object-value data='${JSON.stringify(data)}' ></object-value>
      </span>
    `;
  }
}
customElements.define('object-label', ObjectLabel);


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = (showNonenumerable, sortObjectKeys) => {
  const objectIterator = function*(data) {
    const shouldIterate = (typeof data === 'object' && data !== null) || typeof data === 'function';
    if (!shouldIterate) return;

    // iterable objects (except arrays)
    if (!Array.isArray(data) && data[Symbol.iterator]) {
      let i = 0;
      for (let entry of data) {
        if (Array.isArray(entry) && entry.length === 2) {
          const [k, v] = entry;
          yield {
            name: k,
            data: v,
          };
        } else {
          yield {
            name: i.toString(),
            data: entry,
          };
        }
        i++;
      }
    } else {
      const keys = Object.getOwnPropertyNames(data);
      if (sortObjectKeys === true) {
        keys.sort();
      } else if (typeof sortObjectKeys === 'function') {
        keys.sort(sortObjectKeys);
      }

      for (let propertyName of keys) {
        if (data.propertyIsEnumerable(propertyName)) {
          const propertyValue = data[propertyName];
          yield {
            name: propertyName,
            data: propertyValue,
          };
        } else if (showNonenumerable) {
          // To work around the error (happens some time when propertyName === 'caller' || propertyName === 'arguments')
          // 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
          // http://stackoverflow.com/questions/31921189/caller-and-arguments-are-restricted-function-properties-and-cannot-be-access
          let propertyValue;
          try {
            propertyValue = data[propertyName];
          } catch (e) {
            // console.warn(e)
          }

          if (propertyValue !== undefined) {
            yield {
              name: propertyName,
              data: propertyValue,
              isNonenumerable: true,
            };
          }
        }
      }

      // [[Prototype]] of the object: `Object.getPrototypeOf(data)`
      // the property name is shown as "__proto__"
      if (showNonenumerable && data !== Object.prototype /* already added */) {
        yield {
          name: '__proto__',
          data: Object.getPrototypeOf(data),
          isNonenumerable: true,
        };
      }
    }
  };

  return objectIterator;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var matches = function matches(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
};

/**
 *  @module delegate
 * */

/**
 *  @param {HTMLElement} root Delegate root
 *  @return {Delegate}
 * */
var createDelegate = exports.createDelegate = function createDelegate() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.document;

  var listeners = {};
  var counter = 0;
  function get_id() {
    return counter++;
  }
  function decorateEvent(event) {
    var original = event.stopPropagation;
    event.stopPropagation = function () {
      event.cancelBubble = true;
      original.call(event);
    };
    return event;
  }
  function handleEvent(event) {
    decorateEvent(event);

    var path = [];
    var listenersPool = [];
    var target = event.target;
    var level = 0;
    do {
      path.push(target);
      var targetListeners = (target.listeners || {})[event.type] || [];
      for (var i = 0; i < targetListeners.length; i++) {
        var targetListener = targetListeners[i];
        listenersPool.push({
          callback: targetListener.callback,
          selector: targetListener.selector,
          id: targetListener.id,
          level: level
        });
      }
      if (target === root) {
        break;
      }
      target = target.parentNode;
      level++;
    } while (target && target !== document);
    event.traverse = path.slice();
    listenersPool.sort(function (a, b) {
      return a.id - b.id;
    });
    var nextListenersPool = [];
    for (var l = 0; l < path.length; l++) {
      var item = path[l];
      for (var _i = 0; _i < listenersPool.length; _i++) {
        var listener = listenersPool[_i];
        if (listener.level === l && listener.selector === null || listener.level > l && matches(item, listener.selector)) {
          listener.callback.call(item, event, item);
          continue;
        }
        if (listener.level < l) {
          continue;
        }
        nextListenersPool.push(listener);
      }
      if (event.cancelBubble) {
        break;
      }
      listenersPool = nextListenersPool;
      nextListenersPool = [];
    }
  }
  /**
   *  @constructs Delegate
   * */
  function _createDelegate() {}

  /**
   * Subscribe an event
   * @param {String} eventName Event name
   * @param {HTMLElement} element Delegate node
   * @param {String|Null} selector Selector
   * @param {Function} callback Callback
   * */
  _createDelegate.prototype.on = function (eventName) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : root;
    var selector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var callback = arguments[3];

    if (element instanceof HTMLElement) {
      element.listeners || (element.listeners = {});
      element.listeners[eventName] || (element.listeners[eventName] = []);
      element.listeners[eventName].push({
        selector: selector, callback: callback, id: get_id()
      });
    }
    if (listeners[eventName]) {
      return;
    }
    listeners[eventName] = true;
    root.addEventListener(eventName, handleEvent);
    return this;
  };

  /**
   * Unsubscribe an event
   * @param {String} [eventName] Event name
   * @param {HTMLElement} [element] Delegate node
   * @param {String|Null} [selector] Selector
   * @param {Function} [callback] Callback
   * */
  _createDelegate.prototype.off = function (eventName, element, selector, callback) {
    if (!eventName) {
      delete element.listeners;
      return;
    }
    if (!element.listeners[eventName]) {
      return;
    }
    if (callback) {
      element.listeners[eventName] = element.listeners[eventName].reduce(function (acc, listener) {
        if (selector === listener.selector && callback === listener.callback) {
          return acc;
        }
        return acc.concat(listener);
      }, []);
    }
    if (selector && !callback) {
      element.listeners[eventName] = element.listeners[eventName].reduce(function (acc, listener) {
        if (selector === listener.selector) {
          return acc;
        }
        return acc.concat(listener);
      }, []);
    }
    if (!callback && !selector) {
      delete element.listeners[eventName];
    }
    if (element.listeners && !Object.keys(element.listeners).length) {
      delete element.listeners;
    }
  };

  /**
   * Set delegate root
   * @param {HTMLElement} newRoot Delegate root
   * */
  _createDelegate.prototype.setRoot = function () {
    var newRoot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (!newRoot || newRoot === root) {
      return false;
    }
    Object.keys(listeners).forEach(function (eventName) {
      root.removeEventListener(eventName, handleEvent);
      newRoot.addEventListener(eventName, handleEvent);
    });
    root = newRoot;
  };

  /**
   * Destroy delegate
   * */
  _createDelegate.prototype.destroy = function () {
    Object.keys(listeners).forEach(function (eventName) {
      root.removeEventListener(eventName, handleEvent);
    });
    listeners = {};
  };
  return new _createDelegate();
};

/**
 *  Delegate instance with root of window.document
 *  @type Delegate
 * */
var delegate = exports.delegate = new createDelegate(window.document);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);

const obj = {
  _id: "56dcf573b09c217d39fd7621",
  name: "Howard Christensen",
  email: "howardchristensen@isotronic.com",
  phone: "+1 (830) 529-3176",
  address: "511 Royce Street, Hilltop, Tennessee, 9712"
};
const friend = Object.assign({}, obj);

obj.friends = [friend];

window.obj = obj;

window.data = JSON.stringify(obj);


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
(function(e,t){"use strict";function Ht(){var e=wt.splice(0,wt.length);Et=0;while(e.length)e.shift().call(null,e.shift())}function Bt(e,t){for(var n=0,r=e.length;n<r;n++)Jt(e[n],t)}function jt(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],Pt(r,A[It(r)])}function Ft(e){return function(t){ut(t)&&(Jt(t,e),O.length&&Bt(t.querySelectorAll(O),e))}}function It(e){var t=ht.call(e,"is"),n=e.nodeName.toUpperCase(),r=_.call(L,t?N+t.toUpperCase():T+n);return t&&-1<r&&!qt(n,t)?-1:r}function qt(e,t){return-1<O.indexOf(e+'[is="'+t+'"]')}function Rt(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target,s=e[y]||2,o=e[w]||3;kt&&(!i||i===t)&&t[h]&&r!=="style"&&(e.prevValue!==e.newValue||e.newValue===""&&(n===s||n===o))&&t[h](r,n===s?null:e.prevValue,n===o?null:e.newValue)}function Ut(e){var t=Ft(e);return function(e){wt.push(t,e.target),Et&&clearTimeout(Et),Et=setTimeout(Ht,1)}}function zt(e){Ct&&(Ct=!1,e.currentTarget.removeEventListener(S,zt)),O.length&&Bt((e.target||n).querySelectorAll(O),e.detail===l?l:a),st&&Vt()}function Wt(e,t){var n=this;vt.call(n,e,t),Lt.call(n,{target:n})}function Xt(e,t){nt(e,t),Mt?Mt.observe(e,yt):(Nt&&(e.setAttribute=Wt,e[o]=Ot(e),e[u](x,Lt)),e[u](E,Rt)),e[m]&&kt&&(e.created=!0,e[m](),e.created=!1)}function Vt(){for(var e,t=0,n=at.length;t<n;t++)e=at[t],M.contains(e)||(n--,at.splice(t--,1),Jt(e,l))}function $t(e){throw new Error("A "+e+" type is already registered")}function Jt(e,t){var n,r=It(e),i;-1<r&&(Dt(e,A[r]),r=0,t===a&&!e[a]?(e[l]=!1,e[a]=!0,i="connected",r=1,st&&_.call(at,e)<0&&at.push(e)):t===l&&!e[l]&&(e[a]=!1,e[l]=!0,i="disconnected",r=1),r&&(n=e[t+f]||e[i+f])&&n.call(e))}function Kt(){}function Qt(e,t,r){var i=r&&r[c]||"",o=t.prototype,u=tt(o),a=t.observedAttributes||j,f={prototype:u};ot(u,m,{value:function(){if(Q)Q=!1;else if(!this[W]){this[W]=!0,new t(this),o[m]&&o[m].call(this);var e=G[Z.get(t)];(!V||e.create.length>1)&&Zt(this)}}}),ot(u,h,{value:function(e){-1<_.call(a,e)&&o[h].apply(this,arguments)}}),o[d]&&ot(u,p,{value:o[d]}),o[v]&&ot(u,g,{value:o[v]}),i&&(f[c]=i),e=e.toUpperCase(),G[e]={constructor:t,create:i?[i,et(e)]:[e]},Z.set(t,e),n[s](e.toLowerCase(),f),en(e),Y[e].r()}function Gt(e){var t=G[e.toUpperCase()];return t&&t.constructor}function Yt(e){return typeof e=="string"?e:e&&e.is||""}function Zt(e){var t=e[h],n=t?e.attributes:j,r=n.length,i;while(r--)i=n[r],t.call(e,i.name||i.nodeName,null,i.value||i.nodeValue)}function en(e){return e=e.toUpperCase(),e in Y||(Y[e]={},Y[e].p=new K(function(t){Y[e].r=t})),Y[e].p}function tn(){X&&delete e.customElements,B(e,"customElements",{configurable:!0,value:new Kt}),B(e,"CustomElementRegistry",{configurable:!0,value:Kt});for(var t=function(t){var r=e[t];if(r){e[t]=function(t){var i,s;return t||(t=this),t[W]||(Q=!0,i=G[Z.get(t.constructor)],s=V&&i.create.length===1,t=s?Reflect.construct(r,j,i.constructor):n.createElement.apply(n,i.create),t[W]=!0,Q=!1,s||Zt(t)),t},e[t].prototype=r.prototype;try{r.prototype.constructor=e[t]}catch(i){z=!0,B(r,W,{value:e[t]})}}},r=i.get(/^HTML[A-Z]*[a-z]/),o=r.length;o--;t(r[o]));n.createElement=function(e,t){var n=Yt(t);return n?gt.call(this,e,et(n)):gt.call(this,e)},St||(Tt=!0,n[s](""))}var n=e.document,r=e.Object,i=function(e){var t=/^[A-Z]+[a-z]/,n=function(e){var t=[],n;for(n in s)e.test(n)&&t.push(n);return t},i=function(e,t){t=t.toLowerCase(),t in s||(s[e]=(s[e]||[]).concat(t),s[t]=s[t.toUpperCase()]=e)},s=(r.create||r)(null),o={},u,a,f,l;for(a in e)for(l in e[a]){f=e[a][l],s[l]=f;for(u=0;u<f.length;u++)s[f[u].toLowerCase()]=s[f[u].toUpperCase()]=l}return o.get=function(r){return typeof r=="string"?s[r]||(t.test(r)?[]:""):n(r)},o.set=function(n,r){return t.test(n)?i(n,r):i(r,n),o},o}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});typeof t!="object"&&(t={type:t||"auto"});var s="registerElement",o="__"+s+(e.Math.random()*1e5>>0),u="addEventListener",a="attached",f="Callback",l="detached",c="extends",h="attributeChanged"+f,p=a+f,d="connected"+f,v="disconnected"+f,m="created"+f,g=l+f,y="ADDITION",b="MODIFICATION",w="REMOVAL",E="DOMAttrModified",S="DOMContentLoaded",x="DOMSubtreeModified",T="<",N="=",C=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,k=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],L=[],A=[],O="",M=n.documentElement,_=L.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},D=r.prototype,P=D.hasOwnProperty,H=D.isPrototypeOf,B=r.defineProperty,j=[],F=r.getOwnPropertyDescriptor,I=r.getOwnPropertyNames,q=r.getPrototypeOf,R=r.setPrototypeOf,U=!!r.__proto__,z=!1,W="__dreCEv1",X=e.customElements,V=!/^force/.test(t.type)&&!!(X&&X.define&&X.get&&X.whenDefined),$=r.create||r,J=e.Map||function(){var t=[],n=[],r;return{get:function(e){return n[_.call(t,e)]},set:function(e,i){r=_.call(t,e),r<0?n[t.push(e)-1]=i:n[r]=i}}},K=e.Promise||function(e){function i(e){n=!0;while(t.length)t.shift()(e)}var t=[],n=!1,r={"catch":function(){return r},then:function(e){return t.push(e),n&&setTimeout(i,1),r}};return e(i),r},Q=!1,G=$(null),Y=$(null),Z=new J,et=function(e){return e.toLowerCase()},tt=r.create||function sn(e){return e?(sn.prototype=e,new sn):this},nt=R||(U?function(e,t){return e.__proto__=t,e}:I&&F?function(){function e(e,t){for(var n,r=I(t),i=0,s=r.length;i<s;i++)n=r[i],P.call(e,n)||B(e,n,F(t,n))}return function(t,n){do e(t,n);while((n=q(n))&&!H.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),rt=e.MutationObserver||e.WebKitMutationObserver,it=(e.HTMLElement||e.Element||e.Node).prototype,st=!H.call(it,M),ot=st?function(e,t,n){return e[t]=n.value,e}:B,ut=st?function(e){return e.nodeType===1}:function(e){return H.call(it,e)},at=st&&[],ft=it.attachShadow,lt=it.cloneNode,ct=it.dispatchEvent,ht=it.getAttribute,pt=it.hasAttribute,dt=it.removeAttribute,vt=it.setAttribute,mt=n.createElement,gt=mt,yt=rt&&{attributes:!0,characterData:!0,attributeOldValue:!0},bt=rt||function(e){Nt=!1,M.removeEventListener(E,bt)},wt,Et=0,St=s in n&&!/^force-all/.test(t.type),xt=!0,Tt=!1,Nt=!0,Ct=!0,kt=!0,Lt,At,Ot,Mt,_t,Dt,Pt;St||(R||U?(Dt=function(e,t){H.call(t,e)||Xt(e,t)},Pt=Xt):(Dt=function(e,t){e[o]||(e[o]=r(!0),Xt(e,t))},Pt=Dt),st?(Nt=!1,function(){var e=F(it,u),t=e.value,n=function(e){var t=new CustomEvent(E,{bubbles:!0});t.attrName=e,t.prevValue=ht.call(this,e),t.newValue=null,t[w]=t.attrChange=2,dt.call(this,e),ct.call(this,t)},r=function(e,t){var n=pt.call(this,e),r=n&&ht.call(this,e),i=new CustomEvent(E,{bubbles:!0});vt.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[b]=i.attrChange=1:i[y]=i.attrChange=0,ct.call(this,i)},i=function(e){var t=e.currentTarget,n=t[o],r=e.propertyName,i;n.hasOwnProperty(r)&&(n=n[r],i=new CustomEvent(E,{bubbles:!0}),i.attrName=n.name,i.prevValue=n.value||null,i.newValue=n.value=t[r]||null,i.prevValue==null?i[y]=i.attrChange=0:i[b]=i.attrChange=1,ct.call(t,i))};e.value=function(e,s,u){e===E&&this[h]&&this.setAttribute!==r&&(this[o]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",i)),t.call(this,e,s,u)},B(it,u,e)}()):rt||(M[u](E,bt),M.setAttribute(o,1),M.removeAttribute(o),Nt&&(Lt=function(e){var t=this,n,r,i;if(t===e.target){n=t[o],t[o]=r=Ot(t);for(i in r){if(!(i in n))return At(0,t,i,n[i],r[i],y);if(r[i]!==n[i])return At(1,t,i,n[i],r[i],b)}for(i in n)if(!(i in r))return At(2,t,i,n[i],r[i],w)}},At=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,Rt(o)},Ot=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),n[s]=function(t,r){p=t.toUpperCase(),xt&&(xt=!1,rt?(Mt=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new rt(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,kt&&s[h]&&i.attributeName!=="style"&&(o=ht.call(s,i.attributeName),o!==i.oldValue&&s[h](i.attributeName,i.oldValue,o)))})}(Ft(a),Ft(l)),_t=function(e){return Mt.observe(e,{childList:!0,subtree:!0}),e},_t(n),ft&&(it.attachShadow=function(){return _t(ft.apply(this,arguments))})):(wt=[],n[u]("DOMNodeInserted",Ut(a)),n[u]("DOMNodeRemoved",Ut(l))),n[u](S,zt),n[u]("readystatechange",zt),it.cloneNode=function(e){var t=lt.call(this,!!e),n=It(t);return-1<n&&Pt(t,A[n]),e&&O.length&&jt(t.querySelectorAll(O)),t});if(Tt)return Tt=!1;-2<_.call(L,N+p)+_.call(L,T+p)&&$t(t);if(!C.test(p)||-1<_.call(k,p))throw new Error("The type "+t+" is invalid");var i=function(){return o?n.createElement(f,p):n.createElement(f)},s=r||D,o=P.call(s,c),f=o?r[c].toUpperCase():p,p,d;return o&&-1<_.call(L,T+f)&&$t(f),d=L.push((o?N:T)+p)-1,O=O.concat(O.length?",":"",o?f+'[is="'+t.toLowerCase()+'"]':f),i.prototype=A[d]=P.call(s,"prototype")?s.prototype:tt(it),O.length&&Bt(n.querySelectorAll(O),a),i},n.createElement=gt=function(e,t){var r=Yt(t),i=r?mt.call(n,e,et(r)):mt.call(n,e),s=""+e,o=_.call(L,(r?N:T)+(r||s).toUpperCase()),u=-1<o;return r&&(i.setAttribute("is",r=r.toLowerCase()),u&&(u=qt(s.toUpperCase(),r))),kt=!n.createElement.innerHTMLHelper,u&&Pt(i,A[o]),i}),Kt.prototype={constructor:Kt,define:V?function(e,t,n){if(n)Qt(e,t,n);else{var r=e.toUpperCase();G[r]={constructor:t,create:[r]},Z.set(t,r),X.define(e,t)}}:Qt,get:V?function(e){return X.get(e)||Gt(e)}:Gt,whenDefined:V?function(e){return K.race([X.whenDefined(e),en(e)])}:en};if(!X||/^force/.test(t.type))tn();else if(!t.noBuiltIn)try{(function(t,r,i){r[c]="a",t.prototype=tt(HTMLAnchorElement.prototype),t.prototype.constructor=t,e.customElements.define(i,t,r);if(ht.call(n.createElement("a",{is:i}),"is")!==i||V&&ht.call(new t,"is")!==i)throw r})(function on(){return Reflect.construct(HTMLAnchorElement,[],on)},{},"document-register-element-a")}catch(nn){tn()}if(!t.noBuiltIn)try{mt.call(n,"a","a")}catch(rn){et=function(e){return{is:e.toLowerCase()}}}})(window);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const {storiesOf} = __webpack_require__(0);

__webpack_require__(16);

storiesOf('ObjectInspector')
  .add('object', () => `
    <object-inspector data='${data}'></object-inspector>
  `)
  .add('string', () => `
    <object-inspector data='Hello World'></object-inspector>
  `)
  .add('number', () => `
    <object-inspector data='12'></object-inspector>
  `)
  .add('array', () => `
    <object-inspector data='[12, 13]'></object-inspector>
  `)
  .add('array of objects', () => `
    <object-inspector data='[{"i": 12}, {"i": 13}]'></object-inspector>
  `)


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);

/**
 * Tree-view for objects
 */
class ObjectInspector extends HTMLElement {
  connectedCallback() {
    const showNonenumerable = this.getAttribute('show-non-enumerable') == 'true' ? true : false;
    const sortObjectKeys = this.getAttribute('sort-object-keys') == 'true' ? true : false;
    const theme = this.getAttribute('theme') || 'chromeLight';
    this._data = this.getAttribute('data') || '{}';
    this.removeAttribute('data');

    this.innerHTML = `<tree-view
      theme='${theme}'
      data='${this._data}'
      show-non-enumerable='${showNonenumerable}'
      sort-object-keys='${sortObjectKeys}'
      ></tree-view>`;
  }
}

customElements.define('object-inspector', ObjectInspector);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18)
const parse = __webpack_require__(1);
const createIterator = __webpack_require__(11);
const { DEFAULT_ROOT_PATH, hasChildNodes, getExpandedPaths } = __webpack_require__(6);

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_EXPAND': {
      const path = action.path;
      const expandedPaths = state.expandedPaths;
      const expanded = !!expandedPaths[path];

      return Object.assign({}, state, {
        expandedPaths: Object.assign({}, state.expandedPaths, { [path]: !expanded }),
      });
    }
    default:
      return state;
  }
};

class TreeView extends HTMLElement {
  connectedCallback() {
    this.name = this.getAttribute('name') || '';
    this._data = (this.getAttribute('data') || 'null');
    const data = parse(this._data);
    this.data = data;
    this.removeAttribute('data');

    this.expandedPaths = this.getAttribute('expanded-paths') || [];
    this.expandLevel = this.getAttribute('expand-level') || 0;
    this.showNonenumerable = this.getAttribute('show-non-enumerable') == 'true' ? true : false;
    this.sortObjectKeys = this.getAttribute('sort-object-keys') == 'true' ? true : false;

    this.store = {
      storeState: {
        expandedPaths: getExpandedPaths(
          data,
          createIterator(this.showNonenumerable, this.sortObjectKeys),
          this.expandPaths,
          this.expandLevel,
        ),
      },
    };
    this.render();
  }
  render() {
    const rootPath = DEFAULT_ROOT_PATH;

    this.innerHTML = `
      <connected-tree-node
        name='${this.name}'
        data='${this._data}'
        depth='0'
        path='${rootPath}'
        show-non-enumerable='${this.showNonenumerable}'
        sort-object-keys='${this.sortObjectKeys}'
      ></connected-tree-node>
    `;
  }

}

customElements.define('tree-view', TreeView);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
__webpack_require__(8);
__webpack_require__(10);

const parse = __webpack_require__(1);
const { hasChildNodes } = __webpack_require__(6);
const createIterator = __webpack_require__(11);

const { DEFAULT_ROOT_PATH, getExpandedPaths } = __webpack_require__(6);

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_EXPAND': {
      const path = action.path;
      const expandedPaths = state.expandedPaths;
      const expanded = !!expandedPaths[path];

      return Object.assign({}, state, {
        expandedPaths: Object.assign({}, state.expandedPaths, { [path]: !expanded }),
      });
    }
    default:
      return state;
  }
};

class ConnectedTreeNode extends HTMLElement {
  connectedCallback() {
    this.name = this.getAttribute('name') || '';
    this.path = this.getAttribute('path') || DEFAULT_ROOT_PATH;
    this.depth = parseInt(this.getAttribute('depth') || 0);
    this.expanded = this.getAttribute('expanded') == 'true' ? true : false;
    this.isNonenumerable = this.getAttribute('is-nonenumerable') == 'true' ? true : false;
    this.showNonenumerable = this.getAttribute('show-non-enumerable') == 'true' ? true : false;
    this.sortObjectKeys = this.getAttribute('sort-object-keys') == 'true' ? true : false;

    this._data = (this.getAttribute('data') || 'null');
    const data = parse(this._data);
    this.data = data;
    this.removeAttribute('data');

    this.state = {
      expandedPaths: {}
    }
    this.render(data);


    let element = this.querySelector('tree-node')
    const handler = (e) => {
      e.stopPropagation();
      e.preventDefault();
      let p = element.getAttribute('path');
      this.state.expandedPaths[p] = !this.state.expandedPaths[p];
      element.expanded = !element.expanded
      element.setAttribute('expanded', element.expanded);
      element.querySelector('tree-arrow') && element.querySelector('tree-arrow').setAttribute('expanded', element.expanded);
    };
    element.removeEventListener('click', handler);
    element.addEventListener('click', handler);
  }

  render(data) {
    const nodeHasChildNodes = hasChildNodes(data, createIterator(this.showNonenumerable , this.sortObjectKeys));
    const { expandedPaths } = this.state;
    const expanded = !!expandedPaths[this.path];

    this.innerHTML = `<tree-node
        name='${this.name}'
        path='${this.path}'
        data='${this._data}'
        expanded='${expanded}'
        depth='${this.depth}'
        should-show-arrow='${nodeHasChildNodes}'
        show-non-enumerable='${this.showNonenumerable}'
        sort-object-keys='${this.sortObjectKeys}'
        should-show-placeholder=${this.depth > 0} >
        ${this.renderChildNodes(this.data, this.path)}
      </tree-node>`;
  }

  renderChildNodes(parentData, parentPath) {
    let childNodes = [];
    const dataIterator = createIterator(this.showNonenumerable , this.sortObjectKeys);
    for (let item of dataIterator(parentData)) {
      let { name, data, isNonenumerable } = item;
      const key = name;
      const path = `${parentPath}.${key}`;
      childNodes.push(`
        <connected-tree-node
          name='${name}'
          data='${JSON.stringify(data)}'
          depth='${this.depth + 1}'
          path='${path}'
          should-show-arrow='${isNonenumerable || false}'
          show-non-enumerable='${this.showNonenumerable ? this.showNonenumerable : isNonenumerable}'
          sort-object-keys='${this.sortObjectKeys}'
        ></connected-tree-node>`,
      );
    }
    return childNodes.join('');
  }
}

customElements.define('connected-tree-node', ConnectedTreeNode);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles_createStyles__ = __webpack_require__(4);

const toCss = __webpack_require__(2);
const parse = __webpack_require__(1);

const defaultNodeRenderer = ({depth, name, data, isNonenumerable}) =>
  depth === 0
    ? `<object-root-label name='${name !== undefined ? name : '' }' data='${data}' ></object-root-label>`
    : `<object-label name='${name !== undefined ? name : '' }' data='${data}' isNonenumerable='${isNonenumerable}' ></object-label>`;

class Arrow extends HTMLElement {
  static get observedAttributes() {
    return ['expanded'];
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'expanded' && newValue != oldValue) {
      let span = this.querySelector('span')
      if(span){
        span.setAttribute('style', toCss(Object.assign({},
          this.styles.base,
          (newValue === true || newValue === 'true' ? this.styles.expanded : this.styles.collapsed)
        )));
      }
    }
  }
  connectedCallback(){
    const expanded = this.getAttribute('expanded') == 'true' ? true : false;
    this.styles = JSON.parse(this.getAttribute('styles') || '{}') || {};
    this.removeAttribute('styles')
    this.innerHTML = `<span style='${toCss(Object.assign({},
        this.styles.base,
        (expanded === true ? this.styles.expanded : this.styles.collapsed)
      ))}'>▶</span>`;
  }
}

customElements.define('tree-arrow', Arrow);

class TreeNode extends HTMLElement {
  connectedCallback(){
    const nodeRenderer = defaultNodeRenderer || (({ name }) => `<span>${name}</span>`);

    this._data = (this.getAttribute('data') || 'null');
    const data = parse(this._data);
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

    const styles = Object(__WEBPACK_IMPORTED_MODULE_0__styles_createStyles__["a" /* default */])('TreeNode', this.theme);
    const renderedNode = (nodeRenderer(this));
    const childNodes = this.innerHTML;
    this.expandable = this.shouldShowArrow && childNodes.length > 0;

    this.innerHTML = (`
      <li aria-expanded='${this.expanded}' role="treeitem" style='${toCss(styles.treeNodeBase)}' title='${this.title}'>
        <div style='${toCss(styles.treeNodePreviewContainer)}' path='${this.path}' class="clickableNode">
          ${this.expandable
            ? `<tree-arrow expanded='${this.expanded}' styles='${JSON.stringify(styles.treeNodeArrow)}'></tree-arrow>`
            : this.shouldShowPlaceholder ? `<span style='${toCss(styles.treeNodePlaceholder)}'>&nbsp;</span>` : ''}
          ${renderedNode}
        </div>
        <div class='child-nodes'>
          ${childNodes.trim().length > 0
            ? `<ol role="group"
                style='${toCss(styles.treeNodeChildNodesContainer)}'>${childNodes}</ol>`
            : ''}
        </div>
      </li>
    `);
  }
}

customElements.define('tree-node', TreeNode);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  chromeDark: __webpack_require__(21),
  chromeLight: __webpack_require__(22),
}


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const theme = {
  BASE_FONT_FAMILY: 'Menlo, monospace',
  BASE_FONT_SIZE: '11px',
  BASE_LINE_HEIGHT: '14px',

  BASE_BACKGROUND_COLOR: 'rgb(36, 36, 36)',
  BASE_COLOR: 'rgb(213, 213, 213)',

  OBJECT_NAME_COLOR: 'rgb(227, 110, 236)',
  OBJECT_VALUE_NULL_COLOR: 'rgb(127, 127, 127)',
  OBJECT_VALUE_UNDEFINED_COLOR: 'rgb(127, 127, 127)',
  OBJECT_VALUE_REGEXP_COLOR: 'rgb(233, 63, 59)',
  OBJECT_VALUE_STRING_COLOR: 'rgb(233, 63, 59)',
  OBJECT_VALUE_SYMBOL_COLOR: 'rgb(233, 63, 59)',
  OBJECT_VALUE_NUMBER_COLOR: 'hsl(252, 100%, 75%)',
  OBJECT_VALUE_BOOLEAN_COLOR: 'hsl(252, 100%, 75%)',
  OBJECT_VALUE_FUNCTION_KEYWORD_COLOR: 'rgb(242, 85, 217)',

  HTML_TAG_COLOR: 'rgb(93, 176, 215)',
  HTML_TAGNAME_COLOR: 'rgb(93, 176, 215)',
  HTML_ATTRIBUTE_NAME_COLOR: 'rgb(155, 187, 220)',
  HTML_ATTRIBUTE_VALUE_COLOR: 'rgb(242, 151, 102)',
  HTML_COMMENT_COLOR: 'rgb(137, 137, 137)',
  HTML_DOCTYPE_COLOR: 'rgb(192, 192, 192)',

  ARROW_COLOR: 'rgb(145, 145, 145)',
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,

  TREENODE_FONT_FAMILY: 'Menlo, monospace',
  TREENODE_FONT_SIZE: '11px',
  TREENODE_LINE_HEIGHT: '14px',
  TREENODE_PADDING_LEFT: 12,

  TABLE_BORDER_COLOR: 'rgb(85, 85, 85)',
  TABLE_TH_BACKGROUND_COLOR: 'rgb(44, 44, 44)',
  TABLE_TH_HOVER_COLOR: 'rgb(48, 48, 48)',
  TABLE_SORT_ICON_COLOR: 'black', //'rgb(48, 57, 66)',
  TABLE_DATA_BACKGROUND_IMAGE:
    'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))',
  TABLE_DATA_BACKGROUND_SIZE: '128px 32px',
};

/* harmony default export */ __webpack_exports__["default"] = (theme);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const theme = {
  BASE_FONT_FAMILY: 'Menlo, monospace',
  BASE_FONT_SIZE: '11px',
  BASE_LINE_HEIGHT: '14px',

  BASE_BACKGROUND_COLOR: 'white',
  BASE_COLOR: 'black',

  OBJECT_NAME_COLOR: 'rgb(136, 19, 145)',
  OBJECT_VALUE_NULL_COLOR: 'rgb(128, 128, 128)',
  OBJECT_VALUE_UNDEFINED_COLOR: 'rgb(128, 128, 128)',
  OBJECT_VALUE_REGEXP_COLOR: 'rgb(196, 26, 22)',
  OBJECT_VALUE_STRING_COLOR: 'rgb(196, 26, 22)',
  OBJECT_VALUE_SYMBOL_COLOR: 'rgb(196, 26, 22)',
  OBJECT_VALUE_NUMBER_COLOR: 'rgb(28, 0, 207)',
  OBJECT_VALUE_BOOLEAN_COLOR: 'rgb(28, 0, 207)',
  OBJECT_VALUE_FUNCTION_KEYWORD_COLOR: 'rgb(170, 13, 145)',

  HTML_TAG_COLOR: 'rgb(168, 148, 166)',
  HTML_TAGNAME_COLOR: 'rgb(136, 18, 128)',
  HTML_ATTRIBUTE_NAME_COLOR: 'rgb(153, 69, 0)',
  HTML_ATTRIBUTE_VALUE_COLOR: 'rgb(26, 26, 166)',
  HTML_COMMENT_COLOR: 'rgb(35, 110, 37)',
  HTML_DOCTYPE_COLOR: 'rgb(192, 192, 192)',

  ARROW_COLOR: '#6e6e6e',
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,

  TREENODE_FONT_FAMILY: 'Menlo, monospace',
  TREENODE_FONT_SIZE: '11px',
  TREENODE_LINE_HEIGHT: '14px',
  TREENODE_PADDING_LEFT: 12,

  TABLE_BORDER_COLOR: '#aaa',
  TABLE_TH_BACKGROUND_COLOR: '#eee',
  TABLE_TH_HOVER_COLOR: 'hsla(0, 0%, 90%, 1)',
  TABLE_SORT_ICON_COLOR: '#6e6e6e',
  TABLE_DATA_BACKGROUND_IMAGE:
    'linear-gradient(to bottom, white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))',
  TABLE_DATA_BACKGROUND_SIZE: '128px 32px',
};

/* harmony default export */ __webpack_exports__["default"] = (theme);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__unselectable__ = __webpack_require__(24);


/* harmony default export */ __webpack_exports__["a"] = (theme => ({
  DOMNodePreview: {
    htmlOpenTag: {
      base: {
        color: theme.HTML_TAG_COLOR,
      },
      tagName: {
        color: theme.HTML_TAGNAME_COLOR,
        textTransform: 'lowercase',
      },
      htmlAttributeName: {
        color: theme.HTML_ATTRIBUTE_NAME_COLOR,
      },
      htmlAttributeValue: {
        color: theme.HTML_ATTRIBUTE_VALUE_COLOR,
      },
    },
    htmlCloseTag: {
      base: {
        color: theme.HTML_TAG_COLOR,
      },
      offsetLeft: {
        /* hack: offset placeholder */
        marginLeft: -theme.TREENODE_PADDING_LEFT,
      },
      tagName: {
        color: theme.HTML_TAGNAME_COLOR,
        textTransform: 'lowercase',
      },
    },
    htmlComment: {
      color: theme.HTML_COMMENT_COLOR,
    },
    htmlDoctype: {
      color: theme.HTML_DOCTYPE_COLOR,
    },
  },

  ObjectName: {
    base: {
      color: theme.OBJECT_NAME_COLOR,
    },
    dimmed: {
      opacity: 0.6,
    },
  },

  ObjectValue: {
    objectValueNull: {
      color: theme.OBJECT_VALUE_NULL_COLOR,
    },
    objectValueUndefined: {
      color: theme.OBJECT_VALUE_UNDEFINED_COLOR,
    },
    objectValueRegExp: {
      color: theme.OBJECT_VALUE_REGEXP_COLOR,
    },
    objectValueString: {
      color: theme.OBJECT_VALUE_STRING_COLOR,
    },
    objectValueSymbol: {
      color: theme.OBJECT_VALUE_SYMBOL_COLOR,
    },
    objectValueNumber: {
      color: theme.OBJECT_VALUE_NUMBER_COLOR,
    },
    objectValueBoolean: {
      color: theme.OBJECT_VALUE_BOOLEAN_COLOR,
    },
    objectValueFunctionKeyword: {
      color: theme.OBJECT_VALUE_FUNCTION_KEYWORD_COLOR,
      fontStyle: 'italic',
    },
    objectValueFunctionName: {
      fontStyle: 'italic',
    },
  },

  TreeNode: {
    treeNodeBase: {
      color: theme.BASE_COLOR,
      backgroundColor: theme.BASE_BACKGROUND_COLOR,

      lineHeight: theme.TREENODE_LINE_HEIGHT,
      cursor: 'default',

      boxSizing: 'border-box',
      listStyle: 'none',

      fontFamily: theme.TREENODE_FONT_FAMILY,
      fontSize: theme.TREENODE_FONT_SIZE,
    },
    treeNodePreviewContainer: {},
    treeNodePlaceholder: Object.assign({
      whiteSpace: 'pre',
      fontSize: theme.ARROW_FONT_SIZE,
      marginRight: theme.ARROW_MARGIN_RIGHT
    }, __WEBPACK_IMPORTED_MODULE_0__unselectable__["a" /* default */]),
    treeNodeArrow: {
      base: Object.assign({
        color: theme.ARROW_COLOR,
        display: 'inline-block',
        fontSize: theme.ARROW_FONT_SIZE,
        marginRight: theme.ARROW_MARGIN_RIGHT,
      }, __WEBPACK_IMPORTED_MODULE_0__unselectable__["a" /* default */]),
      expanded: {
        WebkitTransform: 'rotateZ(90deg)',
        MozTransform: 'rotateZ(90deg)',
        transform: 'rotateZ(90deg)',
      },
      collapsed: {
        WebkitTransform: 'rotateZ(0deg)',
        MozTransform: 'rotateZ(0deg)',
        transform: 'rotateZ(0deg)',
      },
    },
    treeNodeChildNodesContainer: {
      margin: 0, // reset user-agent style
      paddingLeft: theme.TREENODE_PADDING_LEFT,
    },
  },

  TableInspector: {
    base: {
      color: theme.BASE_COLOR,

      position: 'relative',
      border: `1px solid ${theme.TABLE_BORDER_COLOR}`,
      fontFamily: theme.BASE_FONT_FAMILY,
      fontSize: theme.BASE_FONT_SIZE,
      lineHeight: '120%',
      boxSizing: 'border-box',
      cursor: 'default',
    },
  },

  TableInspectorHeaderContainer: {
    base: {
      top: 0,
      height: '17px',
      left: 0,
      right: 0,
      overflowX: 'hidden',
    },
    table: {
      tableLayout: 'fixed',
      borderSpacing: 0,
      borderCollapse: 'separate',
      height: '100%',
      width: '100%',
      margin: 0,
    },
  },

  TableInspectorDataContainer: {
    tr: {
      display: 'table-row',
    },
    td: {
      boxSizing: 'border-box',
      border: 'none', // prevent overrides
      height: '16px', // /* 0.5 * table.background-size height */
      verticalAlign: 'top',
      padding: '1px 4px',
      WebkitUserSelect: 'text',

      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      lineHeight: '14px',
    },
    div: {
      position: 'static',
      top: '17px',
      bottom: 0,
      overflowY: 'overlay',
      transform: 'translateZ(0)',

      left: 0,
      right: 0,
      overflowX: 'hidden',
    },
    table: {
      positon: 'static',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      borderTop: '0 none transparent',
      margin: 0, // prevent user agent stylesheet overrides

      backgroundImage: theme.TABLE_DATA_BACKGROUND_IMAGE,
      backgroundSize: theme.TABLE_DATA_BACKGROUND_SIZE,
      tableLayout: 'fixed',

      // table
      borderSpacing: 0,
      borderCollapse: 'separate',
      // height: '100%',
      width: '100%',

      fontSize: theme.BASE_FONT_SIZE,
      lineHeight: '120%',
    },
  },

  TableInspectorTH: {
    base: {
      position: 'relative', // anchor for sort icon container
      height: 'auto',
      textAlign: 'left',
      backgroundColor: theme.TABLE_TH_BACKGROUND_COLOR,
      borderBottom: `1px solid ${theme.TABLE_BORDER_COLOR}`,
      fontWeight: 'normal',
      verticalAlign: 'middle',
      padding: '0 4px',

      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      lineHeight: '14px',

      ':hover': {
        backgroundColor: theme.TABLE_TH_HOVER_COLOR,
      },
    },
    div: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',

      // prevent user agent stylesheet overrides
      fontSize: theme.BASE_FONT_SIZE,
      lineHeight: '120%',
    },
  },

  TableInspectorLeftBorder: {
    none: {
      borderLeft: 'none',
    },
    solid: {
      borderLeft: `1px solid ${theme.TABLE_BORDER_COLOR}`,
    },
  },

  TableInspectorSortIcon: Object.assign({
    display: 'block',
    marginRight: 3, // 4,
    width: 8,
    height: 7,

    marginTop: -7,
    color: theme.TABLE_SORT_ICON_COLOR,
    fontSize: 12,
  }, __WEBPACK_IMPORTED_MODULE_0__unselectable__["a" /* default */]),
}));


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  OUserSelect: 'none',
  userSelect: 'none',
});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var noCase = __webpack_require__(26)

/**
 * Param case a string.
 *
 * @param  {string} value
 * @param  {string} [locale]
 * @return {string}
 */
module.exports = function (value, locale) {
  return noCase(value, locale, '-')
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var lowerCase = __webpack_require__(27)

var NON_WORD_REGEXP = __webpack_require__(28)
var CAMEL_CASE_REGEXP = __webpack_require__(29)
var CAMEL_CASE_UPPER_REGEXP = __webpack_require__(30)

/**
 * Sentence case a string.
 *
 * @param  {string} str
 * @param  {string} locale
 * @param  {string} replacement
 * @return {string}
 */
module.exports = function (str, locale, replacement) {
  if (str == null) {
    return ''
  }

  replacement = typeof replacement !== 'string' ? ' ' : replacement

  function replace (match, index, value) {
    if (index === 0 || index === (value.length - match.length)) {
      return ''
    }

    return replacement
  }

  str = String(str)
    // Support camel case ("camelCase" -> "camel Case").
    .replace(CAMEL_CASE_REGEXP, '$1 $2')
    // Support odd camel case ("CAMELCase" -> "CAMEL Case").
    .replace(CAMEL_CASE_UPPER_REGEXP, '$1 $2')
    // Remove all non-word characters and replace with a single space.
    .replace(NON_WORD_REGEXP, replace)

  // Lower case the entire string.
  return lowerCase(str, locale)
}


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * Special language-specific overrides.
 *
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 *
 * @type {Object}
 */
var LANGUAGES = {
  tr: {
    regexp: /\u0130|\u0049|\u0049\u0307/g,
    map: {
      '\u0130': '\u0069',
      '\u0049': '\u0131',
      '\u0049\u0307': '\u0069'
    }
  },
  az: {
    regexp: /[\u0130]/g,
    map: {
      '\u0130': '\u0069',
      '\u0049': '\u0131',
      '\u0049\u0307': '\u0069'
    }
  },
  lt: {
    regexp: /[\u0049\u004A\u012E\u00CC\u00CD\u0128]/g,
    map: {
      '\u0049': '\u0069\u0307',
      '\u004A': '\u006A\u0307',
      '\u012E': '\u012F\u0307',
      '\u00CC': '\u0069\u0307\u0300',
      '\u00CD': '\u0069\u0307\u0301',
      '\u0128': '\u0069\u0307\u0303'
    }
  }
}

/**
 * Lowercase a string.
 *
 * @param  {String} str
 * @return {String}
 */
module.exports = function (str, locale) {
  var lang = LANGUAGES[locale]

  str = str == null ? '' : String(str)

  if (lang) {
    str = str.replace(lang.regexp, function (m) { return lang.map[m] })
  }

  return str.toLowerCase()
}


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = /[^A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]+/g


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = /([a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])([A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A])/g


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = /([A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A])([A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A][a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A])/g


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

const {storiesOf} = __webpack_require__(0);

__webpack_require__(10);

storiesOf('ObjectLabel')
  .add('object', () => `
    <object-label name="one" data='${data}'></object-label>
  `)
  .add('string', () => `
    <object-label name="two" data='Hello World'></object-label>
  `)
  .add('number', () => `
    <object-label name="three" data='12'></object-label>
  `)


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

const {storiesOf} = __webpack_require__(0);

__webpack_require__(3);

storiesOf('ObjectName')
  .add('empty', () => `
    <object-name></object-name>
  `)
  .add('object', () => `
    <object-name data='${data}'></object-name>
  `)
  .add('string', () => `
    <object-name data='"Hello World"'></object-name>
  `)
  .add('number', () => `
    <object-name data='12'></object-name>
  `)


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

const {storiesOf} = __webpack_require__(0);

__webpack_require__(9);

storiesOf('ObjectPreview')
  .add('object', () => `
    <object-preview data='${data}'></object-preview>
  `)
  .add('string', () => `
    <object-preview data='Hello World'></object-preview>
  `)
  .add('number', () => `
    <object-preview data='12'></object-preview>
  `)
  .add('array', () => `
    <object-preview data='[12, 13]'></object-preview>
  `)
  .add('array of objects', () => `
    <object-preview data='[{"i": 12}, {"i": 13}]'></object-preview>
  `)


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

const {storiesOf} = __webpack_require__(0);

__webpack_require__(8);

storiesOf('ObjectRootLabel')
  .add('object', () => `
    <object-root-label name="one" data='${data}'></object-root-label>
  `)
  .add('string', () => `
    <object-root-label name="two" data='Hello World'></object-root-label>
  `)
  .add('number', () => `
    <object-root-label name="three" data='12'></object-root-label>
  `)


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

const {storiesOf} = __webpack_require__(0);

__webpack_require__(5);

storiesOf('ObjectValue')
  .add('empty', () => `
    <object-value></object-value>
  `)
  .add('object', () => `
    <object-value data='${data}'></object-value>
  `)
  .add('string', () => `
    <object-value data='Hello World'></object-value>
  `)
  .add('number', () => `
    <object-value data='12'></object-value>
  `)


/***/ }),
/* 36 */
/***/ (function(module, exports) {



/***/ }),
/* 37 */
/***/ (function(module, exports) {



/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.toArray = toArray;
exports.$ = $;
exports.attr = attr;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.hasClass = hasClass;
exports.append = append;
exports.prepend = prepend;
exports.walkDOM = walkDOM;
exports.fireEvent = fireEvent;
exports.html = html;
exports.isNode = isNode;
exports.empty = empty;
exports.getRefs = getRefs;
exports.createElement = createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 *  Converts NodeList to array
 *  @param {NodeList} nodes Elements collection
 *  @return {Array} Collection of nodes
 *
 *  @example
 *  toArray(document.querySelectorAll('body')) //=> [document.body]
 * */
function toArray() {
  var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var arr = [];
  for (var i = 0, ref = arr.length = nodes.length; i < ref; i++) {
    arr[i] = nodes[i];
  }
  return arr;
}

/**
 *  Select nodes
 *  @param {HTMLElement} Element
 *  @param {String} [selector] Selector
 *  @return {Function|Array} Curried function (if selector is not provided) or collection of nodes
 * */
function $(element, selector) {
  var fn = function fn(selector) {
    return toArray(element.querySelectorAll(selector));
  };
  return selector ? fn(selector) : fn;
}

/**
 *  Get/set element attribute
 *  @param {String} key Attribute name
 *  @param {String} [value] Attribute value
 *  @param {HTMLElement} [element] Element
 *  @return {Function|String|HTMLElement} Curried function (if element is not provided) or attribute value
 * */
function attr(key, value, element) {
  if (!element && value instanceof HTMLElement) {
    element = value;
    value = undefined;
  }
  var fn = function fn(element) {
    if (value) {
      element.setAttribute(key, value);
      return element;
    }
    if (value === null) {
      return element.removeAttribute(key);
    }
    return element.getAttribute(key);
  };
  return element ? fn(element) : fn;
}

/**
 *  Add a class to the element
 *  @param {String} className Class name
 *  @param {HTMLElement} [element] Element
 *  @return {Function|HTMLElement} Curried function (if element is not provided) or element
 * */
function addClass(className, element) {
  var fn = function fn(element) {
    element.classList.add(className);
    return element;
  };
  return element ? fn(element) : fn;
}

/**
 *  Remove a class from the element
 *  @param {String} className Class name
 *  @param {HTMLElement} [element] Element
 *  @return {Function|HTMLElement} Curried function (if element is not provided) or element
 * */
function removeClass(className, element) {
  var fn = function fn(element) {
    element.classList.remove(className);
    return element;
  };
  return element ? fn(element) : fn;
}

/**
 *  Toggle a class at the element
 *  @param {String} className Class name
 *  @param {HTMLElement} [element] Element
 *  @return {Function|HTMLElement} Curried function (if element is not provided) or element
 * */
function toggleClass(className, element) {
  var fn = function fn(element) {
    element.classList.toggle(className);
    return element;
  };
  return element ? fn(element) : fn;
}

/**
 *  Check if the element has a class
 *  @param {String} className Class name
 *  @param {HTMLElement} element Element
 *  @return {Function|Boolean} Curried function (if element is not provided) or boolean
 * */
function hasClass(className, element) {
  var fn = function fn(element) {
    return element.classList.contains(className);
  };
  return element ? fn(element) : fn;
}

/**
 *  appends one HTML Element to another HTML Element
 *  @param {HTMLElement} parent element to attach to
 *  @param {HTMLElement} [element] new node
 *  @return {HTMLElement|Function} parent
 * */
function append(parent, element) {
  var fn = function fn(element) {
    parent.appendChild(element);
    return parent;
  };
  return element ? fn(element) : fn;
};

/**
 *  prepends one HTML Element to another HTML Element
 *  @param {HTMLElement} parent element to attach to
 *  @param {HTMLElement} [element] new node
 *  @return {HTMLElement|Function} parent
 * */
function prepend(parent, element) {
  var fn = function fn(element) {
    parent.insertBefore(element, parent.firstChild);
    return parent;
  };
  return element ? fn(element) : fn;
};

/**
 *  Traverse DOM node
 *  @param {HTMLElement} node Element
 *  @param {Function} filter Filter child nodes function
 *  @param {Function} skipNode Skip child nodes function
 *  @return {Array} Collection of nodes
 * */
function walkDOM(node) {
  var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return true;
  };
  var skipNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return false;
  };

  var arr = [];
  var loop = function loop(node) {
    return toArray(node.children).forEach(function (child) {
      filter(child) && arr.push(child);
      !skipNode(child) && child.hasChildNodes() && loop(child);
    });
  };
  loop(node);
  return arr;
}

/**
 *  Fires an event on element
 *  @param {String} eventName Event name
 *  @param {HTMLElement} target Element to trigger event on
 *  @param {*} [eventData] Data to attach to event
 * */
function fireEvent(eventName, target) {
  var eventData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  target = target || document.body;
  var event;
  try {
    event = new Event(eventName, { "bubbles": true, "cancelable": true });
  } catch (e) {
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }
  event.eventData = eventData;
  target.dispatchEvent(event);
};

var patchRefs = function patchRefs(refs) {
  var promises = Object.keys(refs).reduce(function (acc, key) {
    return acc.concat(refs[key]);
  }, []).map(function ($el) {
    return $el.whenComponentConnected = new Promise(function (resolve, reject) {
      $el.__whenConnectedResolver = function (arg) {
        return resolve(arg || $el);
      };
    });
  });

  return refs;
};

/**
 * Set the HTML content of element, or generate DocumentFragment
 * @param {HTMLElement|String} target Element to set content or html string
 * @param {String|HTMLElement|DocumentFragment} [content] HTML content string
 * @return {Array|Function} tuple [target || DocumentFragment, refs object] or render function
 *
 * @example
 * // set content of element
 * const $el = document.createElement('div');
 * const result = html($el, `<div></div>`); //=> [$el, {}];
 *
 * @example
 * // create element renderer
 * const $el = document.createElement('div');
 * const render = html($el);
 * const result = render(`<div></div>`); //=> [$el, {}];
 *
 * @example
 * // generate document fragment from string
 * const result = html(`<div id="some_id"></div>`) //=> [<HTMLElement#some_id>, {}]
 *
 * @example
 * // get refs
 * const refs = html(`
 *   <div id="some_id" ref="some_ref">
 *     <span refs="span_elements" id="span_1"></span>
 *     <span refs="span_elements" id="span_2"></span>
 *   </div>
 * `)[1] //=> { some_ref: <HTMLElement#some_id>, span_elements: [<HTMLElement#span_1>, <HTMLElement#span_2>] }
 * */
function html(target, content) {
  var fn = function fn(content) {
    var fragment = isNode(content) ? content : toArray(createElement('div', {}, content).childNodes).reduce(append, document.createDocumentFragment());
    var refs = patchRefs(getRefs(fragment));
    return [target ? append(empty(target), fragment) : fragment, refs];
  };
  if (isUndefined(content) && !isNode(target)) {
    content = target;
    target = undefined;
  }
  return !isUndefined(content) ? fn(content) : fn;
};

/**
 *  Check if element is HTMLElement or DocumentFragment
 *  @param {HTMLElement} element Element to check
 *  @return {Boolean}
 * */
function isNode(element) {
  return element instanceof HTMLElement || element instanceof DocumentFragment;
};

/**
 *  Empty element
 *  @param {HTMLElement} element Element to empty
 *  @return {HTMLElement} element
 * */
function empty(element) {
  element.innerHTML = '';
  return element;
};

/**
 *  Find refs
 *  @param {HTMLElement} element Element to find refs on
 *  @return {Object} refs object
 * */
function getRefs(element) {
  var refGetter = attr('ref');
  var refsGetter = attr('refs');
  return walkDOM(element, function ($el) {
    return refGetter($el) || refsGetter($el);
  }, function ($el) {
    return $el.__isModulor;
  }).reduce(function (accum, $el) {
    var ref = refGetter($el);
    var refs = refsGetter($el);
    if (refs) {
      return _extends(accum, _defineProperty({}, refs, (accum[refs] || []).concat($el)));
    }
    return _extends(accum, _defineProperty({}, ref, $el));
  }, {});
};

/**
 *  creates HTML Element
 *  @param {String} name tag name
 *  @param {Object} [attributes] element attributes
 *  @param {String} [content] element content
 *  @return {HTMLElement} created element
 * */
function createElement(name, attributes, content) {
  var $el = document.createElement(name);
  Object.keys(attributes).forEach(function (attr) {
    if (attr in $el) {
      $el[attr] = attributes[attr];
    } else {
      $el.setAttribute(attr, attributes[attr]);
    }
  });
  content && ($el.innerHTML = content);
  return $el;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(41);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Modulor router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @module router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * */

exports.Router = Router;

var _pathToRegexp = __webpack_require__(42);

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _modulor = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultParamsSerializer = {
  parse: function parse(qs) {
    return !qs ? {} : qs.split('&').reduce(function (acc, param) {
      var _param$split = param.split('='),
          _param$split2 = _slicedToArray(_param$split, 2),
          key = _param$split2[0],
          value = _param$split2[1];

      return _extends(acc, _defineProperty({}, decodeURIComponent(key), value ? decodeURIComponent(value) : value));
    }, {});
  },
  stringify: function stringify(params) {
    return Object.keys(params).map(function (key) {
      return [encodeURIComponent(key), encodeURIComponent(params[key])].join('=');
    }).join('&');
  }
};

/**
 *  @class Route
 * */
function Route() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

  var _this = this;

  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var router = arguments[2];

  this.path = path;
  this.router = router;

  this.callback = function (result) {
    return callback.apply(_this, result.slice(1).concat(_this.getParams()));
  };
}

/**
 *  Get router instance
 *  @method
 * */
Route.prototype.getRouter = function () {
  return this.router;
};

/**
 *  @method
 *  @return {String} Relative path (global path without router base)
 * */
Route.prototype.getPath = function () {
  var router = this.getRouter();
  return router ? router.getPath() : null;
};

/**
 *  @method
 *  @return {Object} URL query parameters
 * */
Route.prototype.getParams = function () {
  var router = this.getRouter();
  return router ? router.getParams() : null;
};

/**
 *  Indicates if route matches path
 *  @method
 *  @return {Boolean}
 * */
Route.prototype.routeMatches = function () {
  var path = this.getPath();
  if (path === false) {
    console.warn('route ' + this.getRouter().getRoot() + this.path + ' doesn\'t match base');
    return false;
  }
  var routeRegex = (0, _pathToRegexp2.default)(this.path);
  return path.match(routeRegex);
};

/**
 *  @method
 *  @return {String} Global path
 * */
Route.prototype.getGlobalPath = function () {
  return window.location.pathname;
};

/**
 *  Resolves route
 *  @method
 * */
Route.prototype.resolve = function (root) {
  var result = this.routeMatches(root);
  return result ? this.callback(result) : null;
};

/**
 *  @class Router
 * */
function Router() {
  var _this2 = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var paramsSerializer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultParamsSerializer;

  this.options = options;

  this.paramsSerializer = paramsSerializer;

  if (options.container) {
    this.container = options.container;
    options.isRoot && this.container.setAttribute('router-root', true);
    options.base && this.container.setAttribute('router-base', options.base);
  } else {
    this.container = document.createElement('script');
    this.container.setAttribute('router-base', options.base || '/');
    this.container.setAttribute('router-root', true);
  }

  this.routes = [];

  this.container.router = this;

  options.useHash && this.container.setAttribute('use-hash', true);

  options.routes && this.add(options.routes);

  this.onRouteChange = function () {
    return _this2.handleRouteChange();
  };
  this.onRouterNavigated = function (e) {
    (0, _modulor.fireEvent)('url-changed', window);
    e.stopPropagation(); //strange!
  };

  window.addEventListener('popstate', this.onRouteChange);
  window.addEventListener('url-changed', this.onRouteChange);
  this.container.addEventListener('router-navigated', this.onRouterNavigated);
}

/**
 *  @method
 * */
Router.prototype.handleRouteChange = function () {
  if (this.container.getAttribute('router-root')) {
    try {
      this.resolve();
    } catch (e) {
      console.error(e);
    }
  }
};

/**
 *  Indicates if element is router node
 *  @method
 *  @param {HTMLElement}
 *  @return {Boolean}
 * */
Router.prototype.isRouter = function ($el) {
  return $el.hasAttribute('router-base') && $el.router;
};

/**
 *  @method
 *  @return {Array.<HTMLElement>} Child router nodes
 * */
Router.prototype.getChildRouters = function () {
  var _this3 = this;

  return (0, _modulor.walkDOM)(this.container, function (child) {
    return _this3.isRouter(child) && child.router.rootMatches();
  }, this.isRouter);
};

/**
 *  Resolves router
 *  @method
 * */
Router.prototype.resolve = function () {
  //down to up order
  var elements = this.getChildRouters();

  var routers = elements.map(function ($el) {
    return $el.router.resolve();
  });

  if (~routers.indexOf(false)) {
    return false;
  }

  var routes = this.getRoutes().map(function (route) {
    return route.resolve();
  });

  return !~routes.indexOf(false);
};

/**
 *  @method
 *  @return {HTMLElement} Root router
 * */
Router.prototype.getRootRouter = function () {
  var $el = this.container;
  var part = [];
  do {
    if ($el.hasAttribute('router-root')) {
      break;
    }
    $el = $el.parentNode;
  } while ($el);
  return $el;
};

/**
 *  @method
 *  @return {String} Path base
 * */
Router.prototype.getRoot = function () {
  var $el = this.container;
  var part = [];
  do {
    part.unshift($el.getAttribute('router-base') || '');
    if ($el.hasAttribute('router-root')) {
      break;
    }
    $el = $el.parentNode;
  } while ($el);
  return part.join('').replace(/\/\//ig, '/');
};

/**
 *  @method
 *  @return {String} URL query string
 * */
Router.prototype.getQs = function () {
  return window.location.search === '' ? false : window.location.search.split('?')[1];
};

/**
 *  @method
 *  @return {Object} URL query parameters
 * */
Router.prototype.getParams = function () {
  return this.paramsSerializer.parse(this.getQs());
};

/**
 *  Set new query parameters. Leave only provided parameters in query string
 *  @method
 *  @param {Object} queryParams URL query parameters
 *  @param {NavigationParams} navigationParams Navigation params
 * */
Router.prototype.setParams = function (queryParams) {
  var navigationParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var paramsString = this.paramsSerializer.stringify(queryParams);
  return this.navigate('?' + paramsString, navigationParams);
};

/**
 *  Update query parameters. Overwrite if param exists, add if not
 *  @method
 *  @param {Object} queryParams URL query parameters
 *  @param {NavigationParams} navigationParams Navigation params
 * */
Router.prototype.updateParams = function (queryParams) {
  var navigationParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return this.setParams(_extends({}, this.getParams(), queryParams), navigationParams);
};

/**
 *  Indicates if router uses hashbang
 *  @method
 *  @return {Boolean}
 * */
Router.prototype.useHash = function () {
  return this.getRootRouter().hasAttribute('use-hash');
};

/**
 *  @method
 *  @return {String} Global path
 * */
Router.prototype.getGlobalPath = function () {
  return this.useHash() ? window.location.hash.replace(/^#/, '/') : window.location.pathname;
};

/**
 *  @method
 *  @return {String} Relative path (global path without router base)
 * */
Router.prototype.getPath = function () {
  var root = this.getRoot();
  var re = new RegExp('^' + root.replace(/\/$/, '') + '(/|$)');
  var globalPath = this.getGlobalPath();
  if (!re.test(globalPath)) {
    return false;
  }
  return globalPath.replace(re, '$1');
};

/**
 *  Indicates if router base matches current path
 *  @method
 *  @return {Boolean}
 * */
Router.prototype.rootMatches = function () {
  return this.getPath() !== false;
};

/**
 *  Add route
 *  @method
 *  @param {String} path Path
 *  @param {Function} callback Callback
 * */
Router.prototype.add = function (path, callback) {
  var _this4 = this;

  if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object') {
    Object.keys(path).forEach(function (path_item) {
      _this4.add(path_item, path[path_item]);
    });
    return;
  }
  var route = new Route(path, callback, this);
  this.routes.push(route);
};

/**
 *  @typedef {Object} NavigationParams
 *  @property {boolean} [absolute=false] Use absolute path instead of relative by default
 *  @property {boolean} [silent=false] Do not resolve routers after navigation
 *  @property {boolean} [replace=false] Replace history state instead of push
 * */

/**
 *  Navigate to path
 *  @method
 *  @param {String} path Path relative to router base
 *  @param {NavigationParams} params Navigation params
 * */
Router.prototype.navigate = function (path) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!this.rootMatches()) {
    return false;
  }
  var newPath = ((params.absolute ? '' : this.getRoot()) + '/' + path).replace(/(\/{1,})/ig, '/'); //duplication with line 103. make common function `clean`
  if (this.useHash()) {
    window.location.hash = newPath;
  } else {
    window.history[params.replace ? 'replaceState' : 'pushState'](null, null, newPath);
  }
  !params.silent && (0, _modulor.fireEvent)('router-navigated', this.container);
};

/**
 *  Get routes
 *  @method
 *  @return {Array.<Route>}
 * */
Router.prototype.getRoutes = function () {
  return this.routes;
};

/**
 *  Mount another router on subpath of current one
 *  @method
 *  @param {String} path Path
 *  @param {Router} router Router
 * */
Router.prototype.mount = function (path, router) {
  router.container.setAttribute('router-base', path);
  router.container.removeAttribute('router-root');
  this.container.appendChild(router.container);
};

/**
 *  Unmount child router
 *  @method
 *  @param {Router} router Router
 * */
Router.prototype.unmount = function (router) {
  this.container.removeChild(router.container);
};

/**
 *  Destroy router
 *  @method
 * */
Router.prototype.destroy = function () {
  window.removeEventListener('popstate', this.onRouteChange);
  window.removeEventListener('url-changed', this.onRouteChange);
  this.container.removeEventListener('router-navigated', this.onRouterNavigated);
  delete this.container.router;
  this.routes = [];
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

/**
 * Expose `pathtoRegexp`.
 */

module.exports = pathtoRegexp;

/**
 * Match matching groups in a regular expression.
 */
var MATCHING_GROUP_REGEXP = /\((?!\?)/g;

/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String|RegExp|Array} path
 * @param  {Array} keys
 * @param  {Object} options
 * @return {RegExp}
 * @api private
 */

function pathtoRegexp(path, keys, options) {
  options = options || {};
  keys = keys || [];
  var strict = options.strict;
  var end = options.end !== false;
  var flags = options.sensitive ? '' : 'i';
  var extraOffset = 0;
  var keysOffset = keys.length;
  var i = 0;
  var name = 0;
  var m;

  if (path instanceof RegExp) {
    while (m = MATCHING_GROUP_REGEXP.exec(path.source)) {
      keys.push({
        name: name++,
        optional: false,
        offset: m.index
      });
    }

    return path;
  }

  if (Array.isArray(path)) {
    // Map array parts into regexps and return their source. We also pass
    // the same keys and options instance into every generation to get
    // consistent matching groups before we join the sources together.
    path = path.map(function (value) {
      return pathtoRegexp(value, keys, options).source;
    });

    return new RegExp('(?:' + path.join('|') + ')', flags);
  }

  path = ('^' + path + (strict ? '' : path[path.length - 1] === '/' ? '?' : '/?'))
    .replace(/\/\(/g, '/(?:')
    .replace(/([\/\.])/g, '\\$1')
    .replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g, function (match, slash, format, key, capture, star, optional, offset) {
      slash = slash || '';
      format = format || '';
      capture = capture || '([^\\/' + format + ']+?)';
      optional = optional || '';

      keys.push({
        name: key,
        optional: !!optional,
        offset: offset + extraOffset
      });

      var result = ''
        + (optional ? '' : slash)
        + '(?:'
        + format + (optional ? slash : '') + capture
        + (star ? '((?:[\\/' + format + '].+?)?)' : '')
        + ')'
        + optional;

      extraOffset += result.length - match.length;

      return result;
    })
    .replace(/\*/g, function (star, index) {
      var len = keys.length

      while (len-- > keysOffset && keys[len].offset > index) {
        keys[len].offset += 3; // Replacement length minus asterisk length.
      }

      return '(.*)';
    });

  // This is a workaround for handling unnamed matching groups.
  while (m = MATCHING_GROUP_REGEXP.exec(path)) {
    var escapeCount = 0;
    var index = m.index;

    while (path.charAt(--index) === '\\') {
      escapeCount++;
    }

    // It's possible to escape the bracket.
    if (escapeCount % 2 === 1) {
      continue;
    }

    if (keysOffset + i === keys.length || keys[keysOffset + i].offset > m.index) {
      keys.splice(keysOffset + i, 0, {
        name: name++, // Unnamed matching groups must be consistently linear.
        optional: false,
        offset: m.index
      });
    }

    i++;
  }

  // If the path is non-ending, match until the end or a slash.
  path += (end ? '$' : (path[path.length - 1] === '/' ? '' : '(?=\\/|$)'));

  return new RegExp(path, flags);
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = class {
  constructor(target){
    this.target = target;
  }
  on(eventName, callback){
    window.addEventListener('message', (message) => {
      if(message.data.eventName === eventName){
        callback.call(this, message.data.eventData);
      }
    });
  }
  emit(eventName, eventData){
    this.target.postMessage({
      eventName: eventName,
      eventData: eventData
    }, '*');
  }
}


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(45);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

const { getStory } = __webpack_require__(0)

class AddonsApi {
  constructor(){
    this.channel = {
      on(){
        console.log(`Can't subscribe on channel event. Channel is not ready yet`);
      },
      emit(){
        console.log(`Can't emit channel event. Channel is not ready yet`);
      }
    };
    this.panels = {};
    this.onStoryListeners = [];
  }

  getChannel() {
    return this.channel;
  }

  setChannel(channel) {
    this.channel = channel;
  }

  addPanel(name, render){
    this.panels[name] = { render };
  }

  getPanels(){
    return this.panels;
  }

  onStory(handler){
    this.onStoryListeners.push(handler);
  }

  notifyOnStoryListeners(story, storyKind){
    this.onStoryListeners.forEach((listener) => listener(story, storyKind));
  }

  getStory(story, storyKind){
    return getStory(story, storyKind);
  }
}

module.exports = new AddonsApi();



/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);
__webpack_require__(15);
__webpack_require__(31);
__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
module.exports = __webpack_require__(47);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

const Split = __webpack_require__(49);
const { fireEvent } = __webpack_require__(7);
const { delegate } = __webpack_require__(39);
const { Router } = __webpack_require__(40);
const { getStories } = __webpack_require__(0);
const Channel = __webpack_require__(43);
const AddonsApi = __webpack_require__(44);

const template = __webpack_require__(50);

__webpack_require__(51);
__webpack_require__(53);
__webpack_require__(55);


const createElement = (name, attributes) => {
  const $el = document.createElement(name);
  Object.keys(attributes).forEach((attr) => {
    if (attr in $el) {
      $el[attr] = attributes[attr];
    } else {
      $el.setAttribute(attr, attributes[attr]);
    }
  });
  return $el;
};

class ManagerApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template();

    const stories = getStories();
    const firstStory = stories[Object.keys(stories)[0]];
    const addonPanels = AddonsApi.getPanels();

    const DEFAULT_PARAMS = {
      width: 80,
      height: 75,
      story: firstStory.storyName,
      storyKind: Object.keys(firstStory.getStories())[0],
      addon: Object.keys(addonPanels)[0],
    };

    this.router = new Router({
      base: window.location.pathname,
    });

    this.state = Object.assign({}, DEFAULT_PARAMS, this.router.getParams());

    // build panels
    this.$leftPanel = this.querySelector('#left-panel');

    this.$leftPanel.appendChild(this.$storiesStree = createElement('stories-tree', {
      class: 'split content',
      state: stories,
    }));

    /*  build right panels
     *  correct order of components creation matters a lot here
     *  channel should be established before rendering plugins
     * */
    this.$rightPanel = this.querySelector('#right-panel');

    this.$rightPanel.appendChild(this.$previewFrame = createElement('preview-frame', {
      class: 'split content',
      'url-base': this.router.options.base,
    }));

    this.$previewFrame.render();
    const channel = new Channel(this.$previewFrame.getWindow());
    AddonsApi.setChannel(channel);


    this.$rightPanel.appendChild(this.$addonsPanel = createElement('sandbox-addons-panel', {
      class: 'split content',
      state: addonPanels,
    }));


    // resizable grid
    const _self = this;

    const vSplit = Split([this.$leftPanel, this.$rightPanel], {
      gutterSize: 8,
      cursor: 'col-resize',
      onDragEnd() {
        const width = Math.round(vSplit.getSizes()[1]);
        fireEvent('size-changed', _self, { width });
      },
    });

    const hSplit = Split([this.$previewFrame, this.$addonsPanel], {
      direction: 'vertical',
      gutterSize: 8,
      cursor: 'row-resize',
      onDragEnd() {
        const height = Math.round(hSplit.getSizes()[0]);
        fireEvent('size-changed', _self, { height });
      },
    });


    // handle state change
    delegate.on('size-changed', this, null, this.updateState.bind(this));
    delegate.on('addon-changed', this, null, this.updateState.bind(this));
    delegate.on('story-changed', this, null, this.updateState.bind(this));

    delegate.on('story-changed', this, null, ({ eventData }) => {
      this.renderStory(this.state.story, this.state.storyKind);
    });


    /*  routing
     *  here all routes changes will be observed
     *  only query parameters will be used
     * */
    this.router.add('*', (path, query) => {
      // set sizes
      const width = Number(query.width);
      const height = Number(query.height);
      vSplit.setSizes([100 - width, width]);
      hSplit.setSizes([height, 100 - height]);

      // set active addons panel
      this.$addonsPanel.setActive(query.addon);

      // set active story in stories tree
      this.$storiesStree.setActive(query.story, query.storyKind);

      this.renderStory(query.story, query.storyKind);
    });

    // initial update of paramters + router resolve
    this.router.updateParams(this.state, { replace: true });
  }

  // render active story in frame + notify onStory listeners
  renderStory(story, storyKind) {
    this.$previewFrame.setActive(story, storyKind);

    AddonsApi.notifyOnStoryListeners(story, storyKind);
  }

  // update manager state + silent update of query paramters
  updateState({ eventData }) {
    this.state = Object.assign({}, this.state, eventData);
    this.router.updateParams(this.state, { silent: true });
  }
}

customElements.define('sandbox-manager-application', ManagerApp);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/*! Split.js - v1.3.5 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Split = factory());
}(this, (function () { 'use strict';

// The programming goals of Split.js are to deliver readable, understandable and
// maintainable code, while at the same time manually optimizing for tiny minified file size,
// browser compatibility without additional requirements, graceful fallback (IE8 is supported)
// and very few assumptions about the user's page layout.
var global = window;
var document = global.document;

// Save a couple long function names that are used frequently.
// This optimization saves around 400 bytes.
var addEventListener = 'addEventListener';
var removeEventListener = 'removeEventListener';
var getBoundingClientRect = 'getBoundingClientRect';
var NOOP = function () { return false; };

// Figure out if we're in IE8 or not. IE8 will still render correctly,
// but will be static instead of draggable.
var isIE8 = global.attachEvent && !global[addEventListener];

// This library only needs two helper functions:
//
// The first determines which prefixes of CSS calc we need.
// We only need to do this once on startup, when this anonymous function is called.
//
// Tests -webkit, -moz and -o prefixes. Modified from StackOverflow:
// http://stackoverflow.com/questions/16625140/js-feature-detection-to-detect-the-usage-of-webkit-calc-over-calc/16625167#16625167
var calc = (['', '-webkit-', '-moz-', '-o-'].filter(function (prefix) {
    var el = document.createElement('div');
    el.style.cssText = "width:" + prefix + "calc(9px)";

    return (!!el.style.length)
}).shift()) + "calc";

// The second helper function allows elements and string selectors to be used
// interchangeably. In either case an element is returned. This allows us to
// do `Split([elem1, elem2])` as well as `Split(['#id1', '#id2'])`.
var elementOrSelector = function (el) {
    if (typeof el === 'string' || el instanceof String) {
        return document.querySelector(el)
    }

    return el
};

// The main function to initialize a split. Split.js thinks about each pair
// of elements as an independant pair. Dragging the gutter between two elements
// only changes the dimensions of elements in that pair. This is key to understanding
// how the following functions operate, since each function is bound to a pair.
//
// A pair object is shaped like this:
//
// {
//     a: DOM element,
//     b: DOM element,
//     aMin: Number,
//     bMin: Number,
//     dragging: Boolean,
//     parent: DOM element,
//     isFirst: Boolean,
//     isLast: Boolean,
//     direction: 'horizontal' | 'vertical'
// }
//
// The basic sequence:
//
// 1. Set defaults to something sane. `options` doesn't have to be passed at all.
// 2. Initialize a bunch of strings based on the direction we're splitting.
//    A lot of the behavior in the rest of the library is paramatized down to
//    rely on CSS strings and classes.
// 3. Define the dragging helper functions, and a few helpers to go with them.
// 4. Loop through the elements while pairing them off. Every pair gets an
//    `pair` object, a gutter, and special isFirst/isLast properties.
// 5. Actually size the pair elements, insert gutters and attach event listeners.
var Split = function (ids, options) {
    if ( options === void 0 ) options = {};

    var dimension;
    var clientDimension;
    var clientAxis;
    var position;
    var paddingA;
    var paddingB;
    var elements;

    // All DOM elements in the split should have a common parent. We can grab
    // the first elements parent and hope users read the docs because the
    // behavior will be whacky otherwise.
    var parent = elementOrSelector(ids[0]).parentNode;
    var parentFlexDirection = global.getComputedStyle(parent).flexDirection;

    // Set default options.sizes to equal percentages of the parent element.
    var sizes = options.sizes || ids.map(function () { return 100 / ids.length; });

    // Standardize minSize to an array if it isn't already. This allows minSize
    // to be passed as a number.
    var minSize = options.minSize !== undefined ? options.minSize : 100;
    var minSizes = Array.isArray(minSize) ? minSize : ids.map(function () { return minSize; });
    var gutterSize = options.gutterSize !== undefined ? options.gutterSize : 10;
    var snapOffset = options.snapOffset !== undefined ? options.snapOffset : 30;
    var direction = options.direction || 'horizontal';
    var cursor = options.cursor || (direction === 'horizontal' ? 'ew-resize' : 'ns-resize');
    var gutter = options.gutter || (function (i, gutterDirection) {
        var gut = document.createElement('div');
        gut.className = "gutter gutter-" + gutterDirection;
        return gut
    });
    var elementStyle = options.elementStyle || (function (dim, size, gutSize) {
        var style = {};

        if (typeof size !== 'string' && !(size instanceof String)) {
            if (!isIE8) {
                style[dim] = calc + "(" + size + "% - " + gutSize + "px)";
            } else {
                style[dim] = size + "%";
            }
        } else {
            style[dim] = size;
        }

        return style
    });
    var gutterStyle = options.gutterStyle || (function (dim, gutSize) { return (( obj = {}, obj[dim] = (gutSize + "px"), obj ))
        var obj; });

    // 2. Initialize a bunch of strings based on the direction we're splitting.
    // A lot of the behavior in the rest of the library is paramatized down to
    // rely on CSS strings and classes.
    if (direction === 'horizontal') {
        dimension = 'width';
        clientDimension = 'clientWidth';
        clientAxis = 'clientX';
        position = 'left';
        paddingA = 'paddingLeft';
        paddingB = 'paddingRight';
    } else if (direction === 'vertical') {
        dimension = 'height';
        clientDimension = 'clientHeight';
        clientAxis = 'clientY';
        position = 'top';
        paddingA = 'paddingTop';
        paddingB = 'paddingBottom';
    }

    // 3. Define the dragging helper functions, and a few helpers to go with them.
    // Each helper is bound to a pair object that contains it's metadata. This
    // also makes it easy to store references to listeners that that will be
    // added and removed.
    //
    // Even though there are no other functions contained in them, aliasing
    // this to self saves 50 bytes or so since it's used so frequently.
    //
    // The pair object saves metadata like dragging state, position and
    // event listener references.

    function setElementSize (el, size, gutSize) {
        // Split.js allows setting sizes via numbers (ideally), or if you must,
        // by string, like '300px'. This is less than ideal, because it breaks
        // the fluid layout that `calc(% - px)` provides. You're on your own if you do that,
        // make sure you calculate the gutter size by hand.
        var style = elementStyle(dimension, size, gutSize);

        // eslint-disable-next-line no-param-reassign
        Object.keys(style).forEach(function (prop) { return (el.style[prop] = style[prop]); });
    }

    function setGutterSize (gutterElement, gutSize) {
        var style = gutterStyle(dimension, gutSize);

        // eslint-disable-next-line no-param-reassign
        Object.keys(style).forEach(function (prop) { return (gutterElement.style[prop] = style[prop]); });
    }

    // Actually adjust the size of elements `a` and `b` to `offset` while dragging.
    // calc is used to allow calc(percentage + gutterpx) on the whole split instance,
    // which allows the viewport to be resized without additional logic.
    // Element a's size is the same as offset. b's size is total size - a size.
    // Both sizes are calculated from the initial parent percentage,
    // then the gutter size is subtracted.
    function adjust (offset) {
        var a = elements[this.a];
        var b = elements[this.b];
        var percentage = a.size + b.size;

        a.size = (offset / this.size) * percentage;
        b.size = (percentage - ((offset / this.size) * percentage));

        setElementSize(a.element, a.size, this.aGutterSize);
        setElementSize(b.element, b.size, this.bGutterSize);
    }

    // drag, where all the magic happens. The logic is really quite simple:
    //
    // 1. Ignore if the pair is not dragging.
    // 2. Get the offset of the event.
    // 3. Snap offset to min if within snappable range (within min + snapOffset).
    // 4. Actually adjust each element in the pair to offset.
    //
    // ---------------------------------------------------------------------
    // |    | <- a.minSize               ||              b.minSize -> |    |
    // |    |  | <- this.snapOffset      ||     this.snapOffset -> |  |    |
    // |    |  |                         ||                        |  |    |
    // |    |  |                         ||                        |  |    |
    // ---------------------------------------------------------------------
    // | <- this.start                                        this.size -> |
    function drag (e) {
        var offset;

        if (!this.dragging) { return }

        // Get the offset of the event from the first side of the
        // pair `this.start`. Supports touch events, but not multitouch, so only the first
        // finger `touches[0]` is counted.
        if ('touches' in e) {
            offset = e.touches[0][clientAxis] - this.start;
        } else {
            offset = e[clientAxis] - this.start;
        }

        // If within snapOffset of min or max, set offset to min or max.
        // snapOffset buffers a.minSize and b.minSize, so logic is opposite for both.
        // Include the appropriate gutter sizes to prevent overflows.
        if (offset <= elements[this.a].minSize + snapOffset + this.aGutterSize) {
            offset = elements[this.a].minSize + this.aGutterSize;
        } else if (offset >= this.size - (elements[this.b].minSize + snapOffset + this.bGutterSize)) {
            offset = this.size - (elements[this.b].minSize + this.bGutterSize);
        }

        // Actually adjust the size.
        adjust.call(this, offset);

        // Call the drag callback continously. Don't do anything too intensive
        // in this callback.
        if (options.onDrag) {
            options.onDrag();
        }
    }

    // Cache some important sizes when drag starts, so we don't have to do that
    // continously:
    //
    // `size`: The total size of the pair. First + second + first gutter + second gutter.
    // `start`: The leading side of the first element.
    //
    // ------------------------------------------------
    // |      aGutterSize -> |||                      |
    // |                     |||                      |
    // |                     |||                      |
    // |                     ||| <- bGutterSize       |
    // ------------------------------------------------
    // | <- start                             size -> |
    function calculateSizes () {
        // Figure out the parent size minus padding.
        var a = elements[this.a].element;
        var b = elements[this.b].element;

        this.size = a[getBoundingClientRect]()[dimension] + b[getBoundingClientRect]()[dimension] + this.aGutterSize + this.bGutterSize;
        this.start = a[getBoundingClientRect]()[position];
    }

    // stopDragging is very similar to startDragging in reverse.
    function stopDragging () {
        var self = this;
        var a = elements[self.a].element;
        var b = elements[self.b].element;

        if (self.dragging && options.onDragEnd) {
            options.onDragEnd();
        }

        self.dragging = false;

        // Remove the stored event listeners. This is why we store them.
        global[removeEventListener]('mouseup', self.stop);
        global[removeEventListener]('touchend', self.stop);
        global[removeEventListener]('touchcancel', self.stop);

        self.parent[removeEventListener]('mousemove', self.move);
        self.parent[removeEventListener]('touchmove', self.move);

        // Delete them once they are removed. I think this makes a difference
        // in memory usage with a lot of splits on one page. But I don't know for sure.
        delete self.stop;
        delete self.move;

        a[removeEventListener]('selectstart', NOOP);
        a[removeEventListener]('dragstart', NOOP);
        b[removeEventListener]('selectstart', NOOP);
        b[removeEventListener]('dragstart', NOOP);

        a.style.userSelect = '';
        a.style.webkitUserSelect = '';
        a.style.MozUserSelect = '';
        a.style.pointerEvents = '';

        b.style.userSelect = '';
        b.style.webkitUserSelect = '';
        b.style.MozUserSelect = '';
        b.style.pointerEvents = '';

        self.gutter.style.cursor = '';
        self.parent.style.cursor = '';
    }

    // startDragging calls `calculateSizes` to store the inital size in the pair object.
    // It also adds event listeners for mouse/touch events,
    // and prevents selection while dragging so avoid the selecting text.
    function startDragging (e) {
        // Alias frequently used variables to save space. 200 bytes.
        var self = this;
        var a = elements[self.a].element;
        var b = elements[self.b].element;

        // Call the onDragStart callback.
        if (!self.dragging && options.onDragStart) {
            options.onDragStart();
        }

        // Don't actually drag the element. We emulate that in the drag function.
        e.preventDefault();

        // Set the dragging property of the pair object.
        self.dragging = true;

        // Create two event listeners bound to the same pair object and store
        // them in the pair object.
        self.move = drag.bind(self);
        self.stop = stopDragging.bind(self);

        // All the binding. `window` gets the stop events in case we drag out of the elements.
        global[addEventListener]('mouseup', self.stop);
        global[addEventListener]('touchend', self.stop);
        global[addEventListener]('touchcancel', self.stop);

        self.parent[addEventListener]('mousemove', self.move);
        self.parent[addEventListener]('touchmove', self.move);

        // Disable selection. Disable!
        a[addEventListener]('selectstart', NOOP);
        a[addEventListener]('dragstart', NOOP);
        b[addEventListener]('selectstart', NOOP);
        b[addEventListener]('dragstart', NOOP);

        a.style.userSelect = 'none';
        a.style.webkitUserSelect = 'none';
        a.style.MozUserSelect = 'none';
        a.style.pointerEvents = 'none';

        b.style.userSelect = 'none';
        b.style.webkitUserSelect = 'none';
        b.style.MozUserSelect = 'none';
        b.style.pointerEvents = 'none';

        // Set the cursor, both on the gutter and the parent element.
        // Doing only a, b and gutter causes flickering.
        self.gutter.style.cursor = cursor;
        self.parent.style.cursor = cursor;

        // Cache the initial sizes of the pair.
        calculateSizes.call(self);
    }

    // 5. Create pair and element objects. Each pair has an index reference to
    // elements `a` and `b` of the pair (first and second elements).
    // Loop through the elements while pairing them off. Every pair gets a
    // `pair` object, a gutter, and isFirst/isLast properties.
    //
    // Basic logic:
    //
    // - Starting with the second element `i > 0`, create `pair` objects with
    //   `a = i - 1` and `b = i`
    // - Set gutter sizes based on the _pair_ being first/last. The first and last
    //   pair have gutterSize / 2, since they only have one half gutter, and not two.
    // - Create gutter elements and add event listeners.
    // - Set the size of the elements, minus the gutter sizes.
    //
    // -----------------------------------------------------------------------
    // |     i=0     |         i=1         |        i=2       |      i=3     |
    // |             |       isFirst       |                  |     isLast   |
    // |           pair 0                pair 1             pair 2           |
    // |             |                     |                  |              |
    // -----------------------------------------------------------------------
    var pairs = [];
    elements = ids.map(function (id, i) {
        // Create the element object.
        var element = {
            element: elementOrSelector(id),
            size: sizes[i],
            minSize: minSizes[i],
        };

        var pair;

        if (i > 0) {
            // Create the pair object with it's metadata.
            pair = {
                a: i - 1,
                b: i,
                dragging: false,
                isFirst: (i === 1),
                isLast: (i === ids.length - 1),
                direction: direction,
                parent: parent,
            };

            // For first and last pairs, first and last gutter width is half.
            pair.aGutterSize = gutterSize;
            pair.bGutterSize = gutterSize;

            if (pair.isFirst) {
                pair.aGutterSize = gutterSize / 2;
            }

            if (pair.isLast) {
                pair.bGutterSize = gutterSize / 2;
            }

            // if the parent has a reverse flex-direction, switch the pair elements.
            if (parentFlexDirection === 'row-reverse' || parentFlexDirection === 'column-reverse') {
                var temp = pair.a;
                pair.a = pair.b;
                pair.b = temp;
            }
        }

        // Determine the size of the current element. IE8 is supported by
        // staticly assigning sizes without draggable gutters. Assigns a string
        // to `size`.
        //
        // IE9 and above
        if (!isIE8) {
            // Create gutter elements for each pair.
            if (i > 0) {
                var gutterElement = gutter(i, direction);
                setGutterSize(gutterElement, gutterSize);

                gutterElement[addEventListener]('mousedown', startDragging.bind(pair));
                gutterElement[addEventListener]('touchstart', startDragging.bind(pair));

                parent.insertBefore(gutterElement, element.element);

                pair.gutter = gutterElement;
            }
        }

        // Set the element size to our determined size.
        // Half-size gutters for first and last elements.
        if (i === 0 || i === ids.length - 1) {
            setElementSize(element.element, element.size, gutterSize / 2);
        } else {
            setElementSize(element.element, element.size, gutterSize);
        }

        var computedSize = element.element[getBoundingClientRect]()[dimension];

        if (computedSize < element.minSize) {
            element.minSize = computedSize;
        }

        // After the first iteration, and we have a pair object, append it to the
        // list of pairs.
        if (i > 0) {
            pairs.push(pair);
        }

        return element
    });

    function setSizes (newSizes) {
        newSizes.forEach(function (newSize, i) {
            if (i > 0) {
                var pair = pairs[i - 1];
                var a = elements[pair.a];
                var b = elements[pair.b];

                a.size = newSizes[i - 1];
                b.size = newSize;

                setElementSize(a.element, a.size, pair.aGutterSize);
                setElementSize(b.element, b.size, pair.bGutterSize);
            }
        });
    }

    function destroy () {
        pairs.forEach(function (pair) {
            pair.parent.removeChild(pair.gutter);
            elements[pair.a].element.style[dimension] = '';
            elements[pair.b].element.style[dimension] = '';
        });
    }

    if (isIE8) {
        return {
            setSizes: setSizes,
            destroy: destroy,
        }
    }

    return {
        setSizes: setSizes,
        getSizes: function getSizes () {
            return elements.map(function (element) { return element.size; })
        },
        collapse: function collapse (i) {
            if (i === pairs.length) {
                var pair = pairs[i - 1];

                calculateSizes.call(pair);

                if (!isIE8) {
                    adjust.call(pair, pair.size - pair.bGutterSize);
                }
            } else {
                var pair$1 = pairs[i];

                calculateSizes.call(pair$1);

                if (!isIE8) {
                    adjust.call(pair$1, pair$1.aGutterSize);
                }
            }
        },
        destroy: destroy,
    }
};

return Split;

})));


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = () => `
  <style>

    sandbox-manager-application {
      display: block;
      width: 100%;
      height: 100%;
    }

    .split {
      -webkit-box-sizing: border-box;
         -moz-box-sizing: border-box;
              box-sizing: border-box;

      overflow-y: auto;
      overflow-x: hidden;
    }

    .content {
      border: 1px solid #C0C0C0;
      box-shadow: inset 0 1px 2px #e4e4e4;
      background-color: #fff;
      display: block;
      height: 100%;
      width: 100%;
    }
    .gutter {
      background-color: transparent;

      background-repeat: no-repeat;
      background-position: 50%;
    }
    .gutter.gutter-horizontal {
      cursor: col-resize;
    }
    .gutter.gutter-vertical {
      cursor: row-resize;
    }
    .split.split-horizontal, .gutter.gutter-horizontal {
      height: 100%;
      float: left;
    }
  </style>

  <div id="left-panel" class="split split-horizontal left-panel">
  </div>
  <div id="right-panel" class="split split-horizontal right-panel">
  </div>
`;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

const { delegate } = __webpack_require__(39);
const { fireEvent } = __webpack_require__(7);
const addonsPanelTemplate = __webpack_require__(52);

class AddonsPanel extends HTMLElement {
  connectedCallback(){
    delegate.on('change', this, 'input[panel]', (event, target) => {
      fireEvent('addon-changed', this, { addon: target.getAttribute('panel') });
    });
  }
  setActive(panel){
    (this.querySelector(`input[panel = "${panel}"]`) || {}).checked = true;
  }
  render(panels){
    this.innerHTML = addonsPanelTemplate({ panels });
  }

  get state(){
    return this._state;
  }

  set state(value){
    this._state = value;
    this.render(value);
  }
}

customElements.define('sandbox-addons-panel', AddonsPanel);


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = (scope) => `
  <style>
    sandbox-addons-panel {
      position: relative;
    }
    .panels-header {
      height: 25px;
      border-bottom: 1px solid #e4e4e4;
    }
    .addons-panel-tab {
      display : none;
    }
    .addons-panel-label {
      color: rgb(68, 68, 68);
      opacity: 0.5;
      display: inline-block;
      font-size: 14px;
      font-weight: 300;
      padding: 4px 10px;
      cursor: pointer;
    }
    .addons-panel-tab:not(:checked) ~ .addons-panel-content {
      display : none;
    }
    .addons-panel-tab:checked + .addons-panel-label {
      opacity: 1;
    }
    .addons-panel-content {
      position: absolute;
      width: calc(100% - 20px);
      height: calc(100% - 45px);
      top: 25px;
      padding: 10px 10px;
      overflow: scroll;
    }
  </style>

  <div class="panels-header">
    ${Object.keys(scope.panels).map((key, index) => `
      <label>
        <input panel="${key}" name="addons-panel-tab" class="addons-panel-tab" type="radio" ${!index ? 'checked': ''}>
        <span class="addons-panel-label">${key}</span>
        <div class="addons-panel-content" data-index=${index}>
          ${scope.panels[key].render()}
        </div>
      </label>
    `).join('')}
  </div>
`;



/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

const { fireEvent } = __webpack_require__(7);
const { delegate } = __webpack_require__(39);
const storiesTreeTemplate = __webpack_require__(54);


class StoriesTree extends HTMLElement {
  connectedCallback(){

    delegate.on('change', this, 'li[story-kind]', (event, target) => {
      event.$storyKindEl = target;
    });

    delegate.on('change', this, 'li[story]', (event, target) => {
      const story = target.getAttribute('story');
      let $storyKindEl = event.$storyKindEl;
      if(!$storyKindEl){
        $storyKindEl = target.querySelector(
          `li[story-kind]`
        );
        $storyKindEl.querySelector('input[story-kind]').checked = true;
      }
      const storyKind = $storyKindEl.getAttribute('story-kind');

      fireEvent('story-changed', this, { story, storyKind });
    });

  }

  render(stories){
    this.innerHTML = storiesTreeTemplate({ stories });
  }

  setActive(story, storyKind){
    (this.querySelector(`input[story="${story}"]`) || {}).checked = true;
    (this.querySelector(
      `li[story="${story}"] input[story-kind="${storyKind}"]`
    ) || {}).checked = true;
  }

  get state(){
    return this._state;
  }

  set state(value){
    this._state = value;
    this.render(value);
  }

}

customElements.define('stories-tree', StoriesTree);


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = (scope) => `
  <style>
    stories-tree ul a {
      text-decoration: none;
      padding: 4px 0;
      display: block;
    }
    stories-tree ul a:hover {
      background: #eee;
    }
    stories-tree ul a:click {
      background: #ddd;
    }
    stories-tree ul {
      list-style: none;
    }
    stories-tree > ul {
      padding-left: 15px;
    }
    stories-tree > ul > li {
      font-size: 1.2em;
      margin: 10px 0;
      border-bottom: 1px solid #ccc;
    }
    stories-tree > ul > li li:last-child {
      border: 0;
    }
    stories-tree > ul ul {
      padding: 0;
      margin-bottom: 0;
      padding-left: 5px;
    }
    stories-tree > ul ul li {
      font-size: 0.8em;
      border-bottom: 1px solid #dedede;
    }
    stories-tree > ul li li a {
      padding-left: 4px;
    }

    stories-tree input[type="radio"] {
      display: none;
    }

    stories-tree input[name="story"]:not(:checked) + ul {
      display: none;
    }

    stories-tree input[name="storyKind"]:checked + a {
      background: #eee;
    }
  </style>

  <ul>
  ${Object.keys(scope.stories).map((story, index) => `
    <li story="${story}">
      <label for="story-${index}">
        <a>${story}</a>
      </label>
      <input type="radio" name="story" story="${story}" id="story-${index}"/>
      <ul>
      ${Object.keys(scope.stories[story].getStories()).map((storyKind) => `
        <li story-kind="${storyKind}">
          <label>
            <input story-kind="${storyKind}" name="storyKind" type="radio"/>
            <a>${storyKind}</a>
          </label>
        </li>
      `).join('')}
      </ul>
    </li>
  `).join('')}
  </ul>
`;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

const template = __webpack_require__(56);

class PreviewFrame extends HTMLElement {
  connectedCallback(){
  }
  getWindow(){
    return this.$previewFrame.contentWindow;
  }
  setActive(story, storyKind){
    const url = `${this.urlBase}preview.html?story=${story}&storyKind=${storyKind}`;

    this.getWindow().location.replace(url);

    this.$fullscreenAnchor.href = url;
  }

  get urlBase(){
    return this.getAttribute('url-base') || '/';
  }

  render(){
    this.innerHTML = template();

    this.$previewFrame = this.querySelector('#preview-frame');
    this.$fullscreenAnchor = this.querySelector('#fullscreen-anchor');
  }
}

customElements.define('preview-frame', PreviewFrame);


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = (scope) => `

  <style>
    #preview-frame {
      display: block;
      width: 100%;
      height: 100%;
      border: none;
    }

    .fullscreen-icon,
    .arrows-overlap {
      background-color: Gainsboro;
      border-radius: 3px;
    }
    .fullscreen-icon {
      display: block;
      font-style: normal;
      height: 25px;
      position: absolute;
      right: 15px;
      top: 15px;
      width: 25px;
    }
    .fullscreen-icon:after,
    .fullscreen-icon:before {
      color: gray;
      content: "\u2192";
      display: block;
      font-size: 18px;
      position: absolute;
    }
    .fullscreen-icon:after {
      transform: rotate(-45deg);
      top: -3px;
      right: -2px;
    }
    .fullscreen-icon:before {
      transform: rotate(135deg);
      bottom: -3px;
      left: -2px;
    }
    .arrows-overlap {
      display: inline-block;
      background-color: gainsboro;
      height: 8px;
      width: 8px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -4px;
      margin-top: -4px;
      z-index: 50;
    }
  </style>

  <a id="fullscreen-anchor" class="fullscreen-icon" href="" target="_blank">
    <span class="arrows-overlap"></span>
  </a>
  <iframe name="preview-frame" id="preview-frame" src=""></iframe>
`;


/***/ })
/******/ ]);