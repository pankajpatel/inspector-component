const createStyles = require('../styles/createStyles');
const toCss = require('../utils/inlineToStyle');
const parse = require('../utils/parser');
/**
 * A short description of the object values.
 * Can be used to render tree node in ObjectInspector
 * or render objects in TableInspector.
 */
class ObjectValue extends HTMLElement {
  constructor() {
    super();
  }

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
  }
  mkStyle(key) {
    const styles = this.getAttribute('styles') || {};
    const themeStyles = createStyles('ObjectValue', this.theme);
    return toCss({ ...themeStyles[key], ...styles })
  }

  markup(object) {
    switch (typeof object) {
      case 'number':
        return (`<span class='objectValueNumber' style='${this.mkStyle('objectValueNumber')}' >${object}</span>`);
      case 'string':
        return (`<span class='objectValueString' style='${this.mkStyle('objectValueString')}' >${object}</span>`);
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
        if (Array.isArray(object)) {
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
