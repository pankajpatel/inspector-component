require('./ObjectName');
require('./ObjectPreview');

class ObjectRootLabel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const name = this.getAttribute('name') || 'undefined';
    const data = this.getAttribute('data');

    this.innerHTML = typeof name === 'string'
      ? `<span>
          <object-name name='${name}'></object-name>
          <span>: </span>
          <object-preview data='${data}' ></object-preview>
        </span>`
      : `<object-preview data='${data}' ></object-preview>`;
  }
}

customElements.define('object-root-label', ObjectRootLabel);
