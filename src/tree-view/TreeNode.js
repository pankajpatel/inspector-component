const createStyles = require('../styles/createStyles');
const toCss = require('../utils/inlineToStyle');
const parse = require('../utils/parser');

class Arrow extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback(){
    const expanded = (this.getAttribute('expanded') || false);
    const styles = JSON.parse(this.getAttribute('styles') || '{}') || {};
    this.removeAttribute('styles')
    console.log(styles, expanded)
    this.innerHTML = `<span style='${toCss({
        ...styles.base,
        ...((expanded === true || expanded === 'true') ? styles.expanded : styles.collapsed)
      })}'>▶</span>`;
  }
}

customElements.define('tree-arrow', Arrow);

class TreeNode extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback(){
    const nodeRenderer = ({ name }, props) => {
      return `<span>${name}</span>`;
    }

    this._data = (this.getAttribute('data') || 'null');
    const data = parse(this._data);
    this.data = data;
    this.removeAttribute('data');

    this.title = this.getAttribute('title') || '';
    this.name = this.getAttribute('name') || '';
    this.theme = this.getAttribute('theme') || 'chromeLight';
    this.expanded = this.getAttribute('expanded') || true;
    this.shouldShowArrow = this.getAttribute('should-show-arrow') || false;
    this.shouldShowPlaceholder = this.getAttribute('should-show-placeholder') || true;

    const styles = createStyles('TreeNode', this.theme);

    // console.log(nodeRenderer, this.attributes)
    const renderedNode = (nodeRenderer(this));
    const childNodes = this.expanded ? this.innerHTML : '';

    this.innerHTML = (`
      <li aria-expanded='${this.expanded}' role="treeitem" style='${toCss(styles.treeNodeBase)}' title='${this.title}'>
        <div style='${toCss(styles.treeNodePreviewContainer)}' class="clickableNode">
          ${this.shouldShowArrow || this.innerHTML.length > 0
            ? `<tree-arrow expanded='${this.expanded}' styles='${JSON.stringify(styles.treeNodeArrow)}'></tree-arrow>`
            : (this.shouldShowPlaceholder === true || this.shouldShowPlaceholder === 'true') && `<span style='${toCss(styles.treeNodePlaceholder)}'>&nbsp;</span>`}
          ${renderedNode}
        </div>
        ${childNodes.trim().length > 0
          ? `<ol role="group"
              style='${toCss(styles.treeNodeChildNodesContainer)}'>${childNodes}</ol>`
          : ''}
      </li>
    `);
  }
}


customElements.define('tree-node', TreeNode);
