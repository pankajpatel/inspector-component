require('./ConnectedTreeNode')

class TreeView extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.name = this.getAttribute('name') || undefined;
    this.expandedPaths = this.getAttribute('expanded-paths') || [];
    this.expandLevel = this.getAttribute('expand-level') || 0;
    //data, dataIterator, nodeRenderer
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
          name='${name}'
          data='${data}'
          dataIterator='${dataIterator}'
          depth='0'
          path='${rootPath}'
          nodeRenderer='${nodeRenderer}'
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

customElements.define('tree-view', TreeView);
