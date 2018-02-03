require('../tree-view/TreeView');

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