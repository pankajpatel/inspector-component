require('./TreeNode');
require('../object-inspector/ObjectRootLabel');
require('../object-inspector/ObjectLabel');

const parse = require('../utils/parser');
const { hasChildNodes } = require('./pathUtils');
const createIterator = require('../utils/createIterator');

const { DEFAULT_ROOT_PATH, getExpandedPaths } = require('./pathUtils');

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
  connectedCallback() {
    this.name = this.getAttribute('name') || '';
    this.path = this.getAttribute('path') || DEFAULT_ROOT_PATH;
    this.depth = parseInt(this.getAttribute('depth') || 0);
    this.expanded = this.getAttribute('expanded') == 'true' ? true : false;
    this.isNonenumerable = this.getAttribute('is-nonenumerable') == 'true' ? true : false;
    this.showNonenumerable = this.getAttribute('show-non-enumerable') == 'true' ? true : false;
    this.sortObjectKeys = this.getAttribute('sort-object-keys') == 'true' ? true : false;

    this._data = (this.getAttribute('data') || 'null');
    const data = parse(this._data);
    this.data = data;
    this.removeAttribute('data');

    this.state = {
      expandedPaths: {}
    }
    this.render(data);


    let element = this.querySelector('tree-node')
    const handler = (e) => {
      e.stopPropagation();
      e.preventDefault();
      let p = element.getAttribute('path');
      this.state.expandedPaths[p] = !this.state.expandedPaths[p];
      element.expanded = !element.expanded
      element.setAttribute('expanded', element.expanded);
      element.querySelector('tree-arrow') && element.querySelector('tree-arrow').setAttribute('expanded', element.expanded);
    };
    element.removeEventListener('click', handler);
    element.addEventListener('click', handler);
  }

  render(data) {
    const nodeHasChildNodes = hasChildNodes(data, createIterator(this.showNonenumerable , this.sortObjectKeys));
    const { expandedPaths } = this.state;
    const expanded = !!expandedPaths[this.path];

    this.innerHTML = `<tree-node
        name='${this.name}'
        path='${this.path}'
        data='${this._data}'
        expanded='${expanded}'
        depth='${this.depth}'
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
          should-show-arrow='${isNonenumerable || false}'
          show-non-enumerable='${this.showNonenumerable ? this.showNonenumerable : isNonenumerable}'
          sort-object-keys='${this.sortObjectKeys}'
        ></connected-tree-node>`,
      );
    }
    return childNodes.join('');
  }
}

customElements.define('connected-tree-node', ConnectedTreeNode);
