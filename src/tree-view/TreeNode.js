const createStyles = require('../styles/createStyles');
const toCss = require('../utils/inlineToStyle');
const parse = require('../utils/parser');
const Arrow = ({ expanded, styles }) => `<span
  style='${toCss({ ...styles.base, ...(expanded ? styles.expanded : styles.collapsed) })}'>▶</span>`;

class TreeNode extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback(){

    // onClick = () => {},
    const nodeRenderer = ({ name }, props) => {
      // Array.prototype.slice.call( props )
      //   .forEach((p) => {

      //   });
      return `<span>${name}</span>`;
    }

    const data = parse(this.getAttribute('data') || 'null', () => {});
    this.title = this.getAttribute('title') || '';
    this.name = this.getAttribute('name') || undefined;
    this.theme = this.getAttribute('theme') || 'chromeLight';
    this.expanded = this.getAttribute('expanded') || true;
    this.shouldShowArrow = this.getAttribute('should-show-arrow') || false;
    this.shouldShowPlaceholder = this.getAttribute('should-show-placeholder') || true;

    const styles = createStyles('TreeNode', this.theme);

    // console.log(nodeRenderer, this.attributes)
    const renderedNode = (nodeRenderer(this));
    const childNodes = this.expanded ? this.innerHTML : undefined;

    this.innerHTML = (`
      <li aria-expanded='${this.expanded}' role="treeitem" style='${toCss(styles.treeNodeBase)}' title='${this.title}'>
        <div style='${toCss(styles.treeNodePreviewContainer)}' class="clickableNode">
          ${this.shouldShowArrow || this.innerHTML.length > 0
            ? `<Arrow expanded='${this.expanded}' styles='${styles.treeNodeArrow}' />`
            : this.shouldShowPlaceholder && `<span style='${toCss(styles.treeNodePlaceholder)}'>&nbsp;</span>`}
          ${renderedNode}
        </div>

        <ol role="group" style='${toCss(styles.treeNodeChildNodesContainer)}'>
          ${childNodes}
        </ol>
      </li>
    `);
  }
}

customElements.define('tree-node', TreeNode);
