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
    const showNonenumerable = this.getAttribute('show-non-enumerable') || false;
    const sortObjectKeys = this.getAttribute('sort-object-keys');
    const theme = this.getAttribute('theme') || 'chromeLight';

    this.innerHTML = `
      <theme-provider theme='${theme}'>
        <tree-view
          theme='${theme}'
          show-non-enumerable='${showNonenumerable}'
          ></tree-view>
      </theme-provider>
    `;
  }
}

customElements.define('object-inspector', ObjectInspector);
