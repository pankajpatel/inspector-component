const { $find, $append, $prepend } = require('./utils/dom');
require('./object-inspector/ObjectInspector');

const styleTag = `<style>
  inspector-component {
    font-family: Menlo, monospace;
    line-height: 1.4;
    cursor: default;
    display: block;
  }
  object-inspector {
    display: inline-block;
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
  .counter {
    display: none;
  }
  .counter.shown {
    display: inline-block;
    margin-right: 5px;
    margin-top: 3px;
    margin-bottom: 3px;
    border-radius: 9px;
    background: #cdcecf;
    padding: 4px;
    min-width: 12px;
    text-align: center;
    height: 12px;
    font-size: 10px;
    color: #555;
  }
</style>`;

class Inspector extends HTMLElement {
  connectedCallback(){
    const _data = this.getAttribute('data')
    this.removeAttribute('data');
    this.render(_data);
  }
  static get observedAttributes() {
    return ['data'];
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'data' && newValue != oldValue) {
      this.render(newValue);
    }
  }

  log(_data) {
    let data = typeof _data === 'string' ? _data : JSON.stringify(_data)
    if(data !== this._data) {
      this._data = data;
      $prepend(this.inspector(data), this);
    } else {
      let counter = this.querySelector('.counter')
      let count = parseInt(counter.innerHTML);
      counter.innerHTML = (count+1);
      counter.classList.add('shown')
    }

  }
  inspector(data) {
    return (data && data.length) ? `<div><span class="counter">1</span><object-inspector data='${data}' theme='chromeLight' ></object-inspector></div>` : '';
  }
  render(data) {
    this._data = data;
    this.innerHTML = `${styleTag}
    ${this.inspector(data)}`;
  }
}
customElements.define('inspector-component', Inspector);
