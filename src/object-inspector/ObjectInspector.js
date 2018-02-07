require('../tree-view/TreeView');

const template = (scope) => `
<tree-view
  theme='${scope.theme}'
  data='${scope.data}'
  show-non-enumerable='${scope.showNonenumerable}'
  sort-object-keys='${scope.sortObjectKeys}'
></tree-view>
`;

class ObjectInspector extends HTMLElement {
  connectedCallback() {
    this.showNonenumerable = this.hasAttribute('show-non-enumerable');
    this.sortObjectKeys = this.hasAttribute('sort-object-keys');
    this.theme = this.getAttribute('theme') || 'chromeLight';
    this.data = this.getAttribute('data') || '{}';
    [
      'data',
      'theme',
      'sort-object-keys',
      'show-non-enumerable',
    ].forEach(k => this.removeAttribute(k));

    this.render();
  }
  render() {
    this.innerHTML = template(this);
  }
}

customElements.define('object-inspector', ObjectInspector);
