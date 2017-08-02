require('document-register-element');
require('./object-inspector/ObjectInspector');
class Inspector extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(){
    this._data = this.getAttribute('data')
    this.removeAttribute('data');
    this.innerHTML = `
    <style>
      tree-node .child-nodes{
        display: none;
      }
      tree-node[expanded="true"] > li > .child-nodes{
        display: block;
      }
    </style>
    <object-inspector
      data='${this._data}'
      theme='chromeLight' ></object-inspector>`;
  }
}
customElements.define('inspector-component', Inspector);
