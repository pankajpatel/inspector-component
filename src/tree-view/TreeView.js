require('./ConnectedTreeNode')
const parse = require('../utils/parser');
const { DEFAULT_ROOT_PATH, hasChildNodes, getExpandedPaths } = require('./pathUtils');

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

class TreeView extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.name = this.getAttribute('name') || '';
    this._data = (this.getAttribute('data') || 'null');
    const data = parse(this._data);
    this.data = data;
    this.removeAttribute('data');

    this.expandedPaths = this.getAttribute('expanded-paths') || [];
    this.expandLevel = this.getAttribute('expand-level') || 0;
    this.showNonenumerable = this.getAttribute('show-non-enumerable') || false;
    this.sortObjectKeys = this.getAttribute('sort-object-keys');

    this.store = {
      storeState: {
        expandedPaths: getExpandedPaths(
          data,
          this.expandPaths,
          this.expandLevel,
        ),
      },
    };
    this.render();
    Array.prototype.slice.call(this.querySelectorAll('.clickableNode'))
      .forEach(element => {
        let p = element.getAttribute('path');
        this.store.storeState = reducer(this.store.storeState, {
          type: 'TOGGLE_EXPAND',
          path: p,
        })
      });
  }
  render() {
    const rootPath = DEFAULT_ROOT_PATH;

    this.innerHTML = `
      <connected-tree-node
        name='${this.name}'
        data='${this._data}'
        depth='0'
        path='${rootPath}'
        show-non-enumerable='${this.showNonenumerable}'
        sort-object-keys='${this.sortObjectKeys}'
      ></connected-tree-node>
    `;
  }

}

customElements.define('tree-view', TreeView);
