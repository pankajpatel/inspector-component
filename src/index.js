require('document-register-element');
require('./object-inspector/ObjectInspector');

class Inspector extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(){
    this._data = this.getAttribute('data')
    this.innerHTML = `<object-inspector
      data='${this._data}'
      theme='chromeLight'
      sort-object-keys='true' ></object-inspector>`;
  }
}
customElements.define('inspector-component', Inspector);
