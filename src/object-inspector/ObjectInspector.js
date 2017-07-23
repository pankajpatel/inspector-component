require('../styles/ThemeProvider');
require('../tree-view/TreeView');
require('./ObjectRootLabel');
require('./ObjectLabel');

const createIterator = require('../utils/createIterator');

/**
 * Tree-view for objects
 */

class ObjectInspector extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const showNonenumerable = this.getAttribute('show-nonenumerable') || false;
    const sortObjectKeys = this.getAttribute('sort-object-keys')
    const nodeRenderer = this.getAttribute('renderer')
    const theme = this.getAttribute('theme') || 'chromeLight';

    const dataIterator = createIterator(showNonenumerable, sortObjectKeys);

    const defaultNodeRenderer = (depth, name, data, isNonenumerable) =>
      depth === 0
        ? `<object-root-label name='${name}' data='${data}' ></object-root-label>`
        : `<object-label name='${name}' data='${data}' isNonenumerable='${isNonenumerable}' ></object-label>`;

    const renderer = nodeRenderer ? nodeRenderer : defaultNodeRenderer;

    this.innerHTML = `
      <theme-provider theme='${theme}'>
        <tree-view
          theme='${theme}'
          renderer='${renderer}'
          iterator='${dataIterator}'
          show-noenumerable='${this.showNonenumerable}' ></tree-view>
      </theme-provider>
    `;
  }
}

customElements.define('object-inspector', ObjectInspector);
