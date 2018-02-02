require('./ObjectName');
require('./ObjectPreview');

class ObjectRootLabel extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || undefined;
    this._data = this.getAttribute('data') || 'null';
    this.removeAttribute('data');

    this.innerHTML = name && typeof name === 'string' ? `<span>
          <object-name name='${name}'></object-name>
          <span>: </span>
          <object-preview data='${this._data}' ></object-preview>
        </span>` : `<object-preview data='${this._data}' ></object-preview>`;
  }
}

customElements.define('object-root-label', ObjectRootLabel);