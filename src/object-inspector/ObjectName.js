import createStyles from "../styles/createStyles";
import toCss from "../utils/inlineToStyle";

/**
 * A view for object property names.
 *
 * If the property name is enumerable (in Object.keys(object)),
 * the property name will be rendered normally.
 *
 * If the property name is not enumerable (`Object.prototype.propertyIsEnumerable()`),
 * the property name will be dimmed to show the difference.
 */
class ObjectLabel extends HTMLElement {
  connectedCallback() {
    this.name = this.getAttribute("name") || "undefined";
    const object = this.getAttribute("data");
    object && (this.name = object.constructor.name);
    this.theme = this.getAttribute("theme") || "chromeLight";
    const dimmed = this.getAttribute("dimmed") === "true" ? true : false;
    const styles = this.getAttribute("styles") || {};
    this.themeStyles = createStyles("ObjectName", this.theme);

    this.appliedStyles = Object.assign(
      {},
      this.themeStyles.base,
      dimmed ? themeStyles["dimmed"] : {},
      styles
    );

    this.render(this.name, this.appliedStyles);
  }

  render(name = this.name, appliedStyles = this.appliedStyles) {
    this.innerHTML = `<span style='${toCss(appliedStyles)}'>${name}</span>`;
  }
}
customElements.define("object-name", ObjectLabel);
