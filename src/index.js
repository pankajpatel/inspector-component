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
      object-inspector {
        font-family: Menlo, monospace;
        font-size: 11px;
        line-height: 14px;
        cursor: default;
      }
      object-root-label {
        font-style: italic;
      }
      object-name {
        color: rgb(136, 19, 145);
      }
      .objectValueString {
        color: rgb(196, 26, 22);
      }
      .child-nodes > ol {
        padding: 0;
        margin: 0;
        padding-left: 12px;
      }
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
