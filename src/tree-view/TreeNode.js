const createStyles = require('../styles/createStyles');
const toCss = require('../utils/inlineToStyle');
const parse = require('../utils/parser');

const defaultNodeRenderer = ({depth, name, data, isNonenumerable}) =>
  depth === 0
    ? `<object-root-label name='${name !== undefined ? name : '' }' data='${data}' ></object-root-label>`
    : `<object-label name='${name !== undefined ? name : '' }' data='${data}' isNonenumerable='${isNonenumerable}' ></object-label>`;

class Arrow extends HTMLElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ['expanded'];
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'expanded' && newValue != oldValue) {
      let span = this.querySelector('span')
      if(span){
        span.setAttribute('style', toCss({
          ...this.styles.base,
          ...(newValue === true || newValue === 'true' ? this.styles.expanded : this.styles.collapsed)
        }));
      }
    }
  }
  connectedCallback(){
    const expanded = this.getAttribute('expanded') == 'true' ? true : false;
    this.styles = JSON.parse(this.getAttribute('styles') || '{}') || {};
    this.removeAttribute('styles')
    this.innerHTML = `<span style='${toCss({
        ...this.styles.base,
        ...(expanded === true ? this.styles.expanded : this.styles.collapsed)
      })}'>▶</span>`;
  }
}

customElements.define('tree-arrow', Arrow);

class TreeNode extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback(){
    const nodeRenderer = defaultNodeRenderer || (({ name }) => `<span>${name}</span>`);

    this._data = (this.getAttribute('data') || 'null');
    const data = parse(this._data);
    this.data = this._data;
    this.removeAttribute('data');

    this.title = this.getAttribute('title') || '';
    this.name = this.getAttribute('name') || '';
    this.path = this.getAttribute('path');
    this.theme = this.getAttribute('theme') || 'chromeLight';

    this.depth = parseInt(this.getAttribute('depth') || 0);

    this.expanded = this.getAttribute('expanded') == 'true' ? true : false;

    this.shouldShowArrow = this.getAttribute('should-show-arrow') == 'false' ? false : true;
    this.shouldShowPlaceholder = this.getAttribute('should-show-placeholder') == 'true' ? true : false;

    const styles = createStyles('TreeNode', this.theme);
    const renderedNode = (nodeRenderer(this));
    const childNodes = this.innerHTML;
    this.expandable = this.shouldShowArrow && childNodes.length > 0;

    this.innerHTML = (`
      <li aria-expanded='${this.expanded}' role="treeitem" style='${toCss(styles.treeNodeBase)}' title='${this.title}'>
        <div style='${toCss(styles.treeNodePreviewContainer)}' path='${this.path}' class="clickableNode">
          ${this.expandable
            ? `<tree-arrow expanded='${this.expanded}' styles='${JSON.stringify(styles.treeNodeArrow)}'></tree-arrow>`
            : this.shouldShowPlaceholder ? `<span style='${toCss(styles.treeNodePlaceholder)}'>&nbsp;</span>` : ''}
          ${renderedNode}
        </div>
        <div class='child-nodes'>
          ${childNodes.trim().length > 0
            ? `<ol role="group"
                style='${toCss(styles.treeNodeChildNodesContainer)}'>${childNodes}</ol>`
            : ''}
        </div>
      </li>
    `);
  }
}

customElements.define('tree-node', TreeNode);
