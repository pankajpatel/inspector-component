class ThemeProvider extends HTMLElement {
  constructor(theme = 'chromeLight') {
    super();
    this.theme = theme;
  }
}
customElements.define('theme-provider', ThemeProvider);
