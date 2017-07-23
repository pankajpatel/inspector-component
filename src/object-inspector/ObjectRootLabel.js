require('./ObjectName');
require('./ObjectPreview');

class ObjectRootLabel extends HTMLElement {
  constructor({name, data}) {
    super();
    if (typeof name === 'string') {
    this.innerHTML = (`
        <span>
          <object-name name=${name}></object-name>
          <span>: </span>
          <object-preview data=${data} ></object-preview>
        </span>
      `);
    } else {
      this.innerHTML = `<object-preview data=${data} ></object-preview>`;
    }
  }
}

customElements.define('object-root-label', ObjectRootLabel);
