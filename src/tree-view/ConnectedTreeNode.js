require('./TreeNode');
require('./ObjectRootLabel');
require('./ObjectLabel');

const parse = require('../utils/parser');
const { hasChildNodes } = require('./pathUtils');
const createIterator = require('../utils/createIterator');

const { DEFAULT_ROOT_PATH, getExpandedPaths } = require('./pathUtils');

const dataIterator = createIterator(showNonenumerable, sortObjectKeys);

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
  constructor() {
    //name, data, dataIterator, expanded, path, depth, nodeRenderer, ...rest
    const data = parse(this.getAttribute('data') || 'null');
    this.render(data);
  }

  render(data) {
    const nodeHasChildNodes = hasChildNodes(data, dataIterator);
    const { expandedPaths } = this.state;
    const expanded = !!expandedPaths[path];
    const renderer = defaultNodeRenderer;
    //TODO: think for this
    //onClick=${nodeHasChildNodes ? this.handleClick.bind(this, path) : () => {}}

    this.innerHTML = `<tree-node
        expanded=${expanded}
        shouldShowArrow=${nodeHasChildNodes}
        shouldShowPlaceholder=${depth > 0} >
        ${expanded ? this.renderChildNodes(data, path) : undefined}
      </tree-node>`;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !!nextState.expandedPaths[nextProps.path] !== !!this.state.expandedPaths[this.props.path] ||
      nextProps.data !== this.props.data ||
      nextProps.name !== this.props.name
    );
  }

  handleClick(path) {
    this.context.store.storeState = reducer(this.context.store.storeState, {
      type: 'TOGGLE_EXPAND',
      path: path,
    });
    this.setState(this.context.store.storeState);
  }
  renderChildNodes(parentData, parentPath) {
    let childNodes = [];
    for (let { name, data, ...props } of dataIterator(parentData)) {
      const key = name;
      const path = `${parentPath}.${key}`;
      childNodes.push(`
        <connected-tree-node
          name='${name}'
          data='${data}'
          depth='${depth + 1}'
          path='${path}'
        ></connected-tree-node>`,
      );
    }
    return childNodes;
  }
}

customElements.define('connected-tree-node', ConnectedTreeNode);
