import ObjectName from './ObjectName';
import ObjectValue from './ObjectValue';

/**
 * if isNonenumerable is specified, render the name dimmed
 */
class ObjectLabel extends HTMLElement {
  constructor(name, data, isNonenumerable = false) {
    super();
    this.innerHTML = `
      <span>
        <object-name name=${name} dimmed=${isNonenumerable}></object-name>
        <span>: </span>
        <object-value object=${JSON.stringify(data)} ></object-value>
      </span>
    `;
  }
}
customElements.define('object-label', ObjectLabel);
