require('../styles/ThemeProvider');
require('../tree-view/TreeView');

/**
 * Tree-view for objects
 */
class ObjectInspector extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const showNonenumerable = this.getAttribute('show-non-enumerable') == 'true' ? true : false;
    const sortObjectKeys = this.getAttribute('sort-object-keys') == 'true' ? true : false;
    const theme = this.getAttribute('theme') || 'chromeLight';
    this._data = this.getAttribute('data') || '{}';
    this.removeAttribute('data');

    this.innerHTML = `
      <theme-provider theme='${theme}'>
        <tree-view
          theme='${theme}'
          data='${this._data}'
          show-non-enumerable='${showNonenumerable}'
          sort-object-keys='${sortObjectKeys}'
          ></tree-view>
      </theme-provider>
    `;
  }
}

customElements.define('object-inspector', ObjectInspector);
