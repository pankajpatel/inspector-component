class ThemeProvider extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.theme = this.getAttribute('theme') || 'chromeLight';
  }
}
customElements.define('theme-provider', ThemeProvider);
