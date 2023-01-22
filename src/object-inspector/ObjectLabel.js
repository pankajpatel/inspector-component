/**
 * if isNonenumerable is specified, render the name dimmed
 */
class ObjectLabel extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute("name") || "";
    const data = this.getAttribute("data") || {};
    const isNonenumerable = this.getAttribute("is-non-enumerable") || false;

    this.innerHTML = `
      <span>
        ${
          name !== ""
            ? `<object-name name='${name}' dimmed='${isNonenumerable}'></object-name>
        <span>: </span>`
            : ""
        }
        <object-value data='${JSON.stringify(data)}' ></object-value>
      </span>
    `;
  }
}
customElements.define("object-label", ObjectLabel);
