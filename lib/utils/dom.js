"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$prepend = exports.$find = exports.$append = void 0;
/**
 * Finds the Elements matching selector in the context
 * @return {[Element/Node]} Collection of Elements/Nodes
 * @param {String} selector
 * @param {Element/Node} context
 */
const $find = function $find(selector) {
  let context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.prototype.slice.apply(context.querySelectorAll(selector));
};

/**
 * Appends the markup to the parent
 * @param {String} markup
 * @param {Element/Node} parent
 */
exports.$find = $find;
const $append = (markup, parent) => {
  let temp_container = document.createElement("div");
  temp_container.innerHTML = markup;
  while (temp_container.firstChild) {
    parent.appendChild(temp_container.firstChild);
  }
};

/**
 * Prepends the markup in parent
 * @param {String} markup
 * @param {Element/Node} parent
 */
exports.$append = $append;
const $prepend = (markup, parent) => {
  let temp_container = document.createElement("div");
  temp_container.innerHTML = markup;
  while (temp_container.firstChild) {
    parent.insertBefore(temp_container.firstChild, parent.firstElementChild);
  }
};
exports.$prepend = $prepend;