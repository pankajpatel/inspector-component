const createStyles = require('../styles/createStyles');
const toCss = require('../utils/inlineToStyle');

const Arrow = ({ expanded, styles }) => `<span style=${toCss({ ...styles.base, ...(expanded ? styles.expanded : styles.collapsed) })}>▶</span>`;

class TreeNode extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback(){
    // name = undefined,
    // data = undefined,
    // expanded = true,
    // onClick = () => {},
    // nodeRenderer = ({ name }) => `<span>${name}</span>`,
    // title,
    // shouldShowArrow = false,
    // shouldShowPlaceholder = true

    super();
    const { theme } = this.context;
    const styles = createStyles('TreeNode', theme);

    const renderedNode = createElement(nodeRenderer, this.props);
    const childNodes = expanded ? this.innerHTML : undefined;

    return (`
      <li aria-expanded=${expanded} role="treeitem" style=${toCss(styles.treeNodeBase)} title=${title}>
        <div style=${toCss(styles.treeNodePreviewContainer)} onClick=${onClick}>
          ${shouldShowArrow || this.innerHTML.length > 0
            ? `<Arrow expanded=${expanded} styles=${styles.treeNodeArrow} />`
            : shouldShowPlaceholder && `<span style=${toCss(styles.treeNodePlaceholder)}>&nbsp;</span>`}
          ${renderedNode}
        </div>

        <ol role="group" style=${toCss(styles.treeNodeChildNodesContainer)}>
          ${childNodes}
        </ol>
      </li>
    `);
  }
}

customElements.define('tree-node', TreeNode);
