const createStyles = require('../styles/createStyles');
const toCss = require('../utils/inlineToStyle');
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
    const object = this.getAttribute('data');
    this.render(object);
  }

  render(data) {
    this.innerHTML = this.markup(data);
  }
  mkStyle(key) {
    const styles = this.getAttribute('styles') || {};
    const themeStyles = createStyles('ObjectValue', this.theme);
    return toCss({ ...themeStyles[key], ...styles })
  }

  markup(object) {
    switch (typeof object) {
      case 'number':
        return (`<span style="${this.mkStyle('objectValueNumber')}">${object}</span>`);
      case 'string':
        return (`<span style="${this.mkStyle('objectValueString')}">${object}</span>`);
      case 'boolean':
        return (`<span style="${this.mkStyle('objectValueBoolean')}">${String(object)}</span>`);
      case 'undefined':
        return `<span style="${this.mkStyle('objectValueUndefined')}">undefined</span>`;
      case 'object':
        if (object === null) {
          return `<span style="${this.mkStyle('objectValueNull')}">null</span>`;
        }
        if (object instanceof Date) {
          return (`<span>${object.toString()}</span>`);
        }
        if (object instanceof RegExp) {
          return (`<span style="${this.mkStyle('objectValueRegExp')}">${object.toString()}</span>`);
        }
        if (Array.isArray(object)) {
          return `<span>${`Array[${object.length}]`}</span>`;
        }
        return (`<span>${object.constructor.name}</span>`);
      case 'function':
        return (`
          <span>
            <span style="${this.mkStyle('objectValueFunctionKeyword')}">function</span>
            <span style="${this.mkStyle('objectValueFunctionName')}">&nbsp;${object.name}()</span>
          </span>
        `);
      case 'symbol':
        return (`<span style="${this.mkStyle('objectValueSymbol')}">${object.toString()}</span>`);
      default:
        return `<span />`;
    }
  }
}
customElements.define('object-value', ObjectValue);
