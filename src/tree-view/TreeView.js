require('./TreeNode');

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

class ConnectedTreeNode extends HTMLElement {
  constructor(name, data, dataIterator, expanded, path, depth, nodeRenderer, ...rest) {
    super();

    const render = () => {
      const nodeHasChildNodes = hasChildNodes(data, dataIterator);
      const { expandedPaths } = this.state;
      const expanded = !!expandedPaths[path];

      return (`
        <tree-node
          expanded=${expanded}
          onClick=${nodeHasChildNodes ? this.handleClick.bind(this, path) : () => {}}
          shouldShowArrow=${nodeHasChildNodes}
          shouldShowPlaceholder=${depth > 0}
          nodeRenderer=${nodeRenderer}
          ${rest.join(' ')}

        >
          ${expanded ? this.renderChildNodes(data, path) : undefined}
        </tree-node>
      `);
    }

    this.innerHTML = render();
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
          name=${name}
          data=${data}
          depth=${depth + 1}
          path=${path}
          key=${key}
          dataIterator=${dataIterator}
          nodeRenderer=${nodeRenderer}
          ${props.join(' ')}
        ></connected-tree-node>`,
      );
    }
    return childNodes;
  }
}

// ConnectedTreeNode.propTypes = {
//   name: PropTypes.string,
//   data: PropTypes.any,
//   dataIterator: PropTypes.func,

//   depth: PropTypes.number,
//   expanded: PropTypes.bool,

//   nodeRenderer: PropTypes.func,
// };

class TreeView extends HTMLElement {
  constructor(name = undefined, data, dataIterator, expandPaths = [], expandLevel = 0, nodeRenderer) {
    super();

    this.store = {
      storeState: {
        expandedPaths: getExpandedPaths(
          data,
          dataIterator,
          expandPaths,
          expandLevel,
        ),
      },
    };
    const render = () => {
      const { name, data, dataIterator } = this.props;
      const { nodeRenderer } = this.props;

      const rootPath = DEFAULT_ROOT_PATH;

      return (`
        <connected-tree-node
          name=${name}
          data=${data}
          dataIterator=${dataIterator}
          depth=${0}
          path=${rootPath}
          nodeRenderer=${nodeRenderer}
        ></connected-tree-node>
      `);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.store = {
      storeState: {
        expandedPaths: getExpandedPaths(
          nextProps.data,
          nextProps.dataIterator,
          nextProps.expandPaths,
          nextProps.expandLevel,
          this.store.storeState.expandedPaths,
        ),
      },
    };
  }

}

// TreeView.propTypes = {
//   name: PropTypes.string,
//   data: PropTypes.any,
//   dataIterator: PropTypes.func,

//   nodeRenderer: PropTypes.func,
// };

customElements.define('connected-tree-node', ConnectedTreeNode);
customElements.define('tree-view', TreeView);
