require("@fontsource/jetbrains-mono");
require("./object-inspector/ObjectInspector");

import { $prepend } from "./utils/dom";
import styleTag from "./index.css";

const template = (scope) => `
<div>
  <span class="counter">1</span>
  <object-inspector
    data='${scope.data}'
    theme='chromeLight'
  ></object-inspector>
</div>
`;

class Inspector extends HTMLElement {
  connectedCallback() {
    const _data = this.getAttribute("data");
    this.removeAttribute("data");
    this.dom = this.attachShadow({ mode: "open" });
    this.render(_data);
  }

  log(_data) {
    let data = typeof _data === "string" ? _data : JSON.stringify(_data);
    if (data !== this._data) {
      this._data = data;
      $prepend(this.inspector(data), this.dom);
    } else {
      let counter = this.dom.querySelector(".counter");
      let count = parseInt(counter.innerHTML);
      counter.innerHTML = count + 1;
      counter.classList.add("shown");
    }
  }
  inspector(data) {
    return data && data.length ? template({ data }) : "";
  }
  render(data) {
    this._data = data;
    this.dom.innerHTML = `${styleTag()}
    ${this.inspector(data)}`;
  }
}
customElements.define("inspector-component", Inspector);
