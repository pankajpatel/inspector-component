class ThemeProvider extends HTMLElement {
  connectedCallback() {
    this.theme = this.getAttribute('theme') || 'chromeLight';
  }
}
customElements.define('theme-provider', ThemeProvider);
