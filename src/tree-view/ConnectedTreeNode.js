require('./TreeNode');
require('../object-inspector/ObjectRootLabel');
require('../object-inspector/ObjectLabel');

const parse = require('../utils/parser');
const { hasChildNodes } = require('./pathUtils');
const createIterator = require('../utils/createIterator');

const { DEFAULT_ROOT_PATH, getExpandedPaths } = require('./pathUtils');

const defaultNodeRenderer = (depth, name, data, isNonenumerable) =>
  depth === 0
    ? `<object-root-label name='${name}' data='${data}' ></object-root-label>`
    : `<object-label name='${name}' data='${data}' isNonenumerable='${isNonenumerable}' ></object-label>`;

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_EXPAND': {
      const path = action.path;
      const expandedPaths = state.expandedPaths;
      const expanded = !!expandedPaths[path];

      return Object.assign({}, state, {
        expandedPaths: Object.assign({}, state.expandedPaths, { [path]: !expanded }),
      });
    }
    default:
      return state;
  }
};

class ConnectedTreeNode extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.name = this.getAttribute('name') || '';
    this.path = this.getAttribute('path') || DEFAULT_ROOT_PATH;
    this.depth = parseInt(this.getAttribute('depth') || 0);
    this.expanded = this.getAttribute('expanded') == 'true' ? true : false;
    this.isNonenumerable = this.getAttribute('is-nonenumerable') == 'true' ? true : false;
    this.showNonenumerable = this.getAttribute('show-non-enumerable') || false;
    this.sortObjectKeys = this.getAttribute('sort-object-keys');

    this._data = (this.getAttribute('data') || 'null');
    const data = parse(this._data);
    this.data = data;
    this.removeAttribute('data');

    this.state = {
      expandedPaths: {}
    }
    this.render(data);

    Array.prototype.slice.call(this.querySelectorAll('tree-node'))
      .forEach(element => {
        element.addEventListener('click', (e) => {
          let p = element.getAttribute('path');
          this.state.expandedPaths[p] = !this.state.expandedPaths[p];
          element.expanded = !element.expanded
          element.setAttribute('expanded', element.expanded);
        })
      });
  }

  render(data) {
    const nodeHasChildNodes = hasChildNodes(data, createIterator(this.showNonenumerable , this.sortObjectKeys));
    const { expandedPaths } = this.state;
    const expanded = !!expandedPaths[this.path];
    const renderer = defaultNodeRenderer;

    this.innerHTML = `<tree-node
        name='${this.name}'
        path='${this.path}'
        data='${this._data}'
        expanded='${expanded}'
        should-show-arrow='${nodeHasChildNodes}'
        show-non-enumerable='${this.showNonenumerable}'
        sort-object-keys='${this.sortObjectKeys}'
        should-show-placeholder=${this.depth > 0} >
        ${this.renderChildNodes(this.data, this.path)}
      </tree-node>`;
  }

  renderChildNodes(parentData, parentPath) {
    let childNodes = [];
    const dataIterator = createIterator(this.showNonenumerable , this.sortObjectKeys);
    for (let item of dataIterator(parentData)) {
      let { name, data, isNonenumerable } = item;
      const key = name;
      const path = `${parentPath}.${key}`;
      childNodes.push(`
        <connected-tree-node
          name='${name}'
          data='${JSON.stringify(data)}'
          depth='${this.depth + 1}'
          path='${path}'
          show-non-enumerable='${this.showNonenumerable ? this.showNonenumerable : isNonenumerable}'
          sort-object-keys='${this.sortObjectKeys}'
        ></connected-tree-node>`,
      );
    }
    return childNodes.join('');
  }
}

customElements.define('connected-tree-node', ConnectedTreeNode);
