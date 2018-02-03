require('./ObjectValue');
require('./ObjectName');
const toCss = require('../utils/inlineToStyle');
const parse = require('../utils/parser');

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
    this._data = this.getAttribute('data') || 'null';
    const data = parse(this._data);
    this.data = data;
    this.removeAttribute('data');

    this.render();
  }

  render() {
    this.innerHTML = this.markup(this.data, this.maxProperties) || '<!--nothing-->';
  }

  markup(object, maxProperties) {
    if (typeof object !== 'object' || object === null || object instanceof Date || object instanceof RegExp) {
      return `<object-value data='${this._data}' ></object-value>`;
    }

    if (object instanceof Array) {
      return `
        <span style='${toCss(styles.preview)}'>
          (${object.length}) [${object.map(element => {
        return `<object-value data='${JSON.stringify(element)}' ></object-value>`;
      }).join(', ')}]
        </span>
      `;
    } else if (typeof object === 'string') {
      return `<object-value data='${object}' ></object-value>`;
    } else {
      let propertyNodes = [];
      for (let propertyName in object) {
        const propertyValue = object[propertyName];
        if (object.hasOwnProperty(propertyName)) {
          let ellipsis = '';
          if (propertyNodes.length === maxProperties - 1 && Object.keys(object).length > maxProperties) {
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