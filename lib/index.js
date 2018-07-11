const { $find, $append, $prepend } = require('./utils/dom');
require('./object-inspector/ObjectInspector');
const styleTag = require('./index.css');

const template = scope => `
<div>
  <span class="counter">1</span>
  <object-inspector
    data='${scope.data}'
    theme='chromeLight'
  ></object-inspector>
</div>
`;

class Inspector extends HTMLElement {
  static get observedAttributes() {
    return ['data'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {

    if (this.dom && attr == 'data' && newValue != oldValue) {
      console.log('attributeChangedCallback', attr, oldValue, newValue);
      const _data = newValue;
      this.render(_data);
    }
  }

  get data() {
    return this._data;
  }
  set data(d) {
    console.log('set.data', d);
    this._data = d;
    this.render(d);
  }
  connectedCallback() {
    console.log('connectedCallback', this.getAttribute('data'));
    const _data = this.getAttribute('data');
    this.dom = this.attachShadow({ mode: 'open' });
    this.render(_data);
  }

  log(_data) {
    let data = typeof _data === 'string' ? _data : JSON.stringify(_data);
    if (data !== this._data) {
      this._data = data;
      $prepend(this.inspector(data), this.dom);
    } else {
      let counter = this.dom.querySelector('.counter');
      let count = parseInt(counter.innerHTML);
      counter.innerHTML = count + 1;
      counter.classList.add('shown');
    }
  }
  inspector(data) {
    return data && data.length ? template({ data }) : '';
  }
  render(data) {
    this._data = data;
    this.dom.innerHTML = `${styleTag()}
    ${this.inspector(data)}`;
  }
}
customElements.define('inspector-component', Inspector);