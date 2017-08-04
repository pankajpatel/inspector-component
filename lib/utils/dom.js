'use strict';

/**
 * Finds the Elements matching selector in the context
 * @return {[Element/Node]} Collection of Elements/Nodes
 * @param {String} selector
 * @param {Element/Node} context
 */
var $find = function $find(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Array.prototype.slice.apply(context.querySelectorAll(selector));
};

/**
 * Appends the markup to the parent
 * @param {String} markup
 * @param {Element/Node} parent
 */
var $append = function $append(markup, parent) {
  var temp_container = document.createElement('div');
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
var $prepend = function $prepend(markup, parent) {
  var temp_container = document.createElement('div');
  temp_container.innerHTML = markup;
  while (temp_container.firstChild) {
    parent.insertBefore(temp_container.firstChild, parent.firstElementChild);
  }
};

module.exports = {
  $find: $find, $append: $append, $prepend: $prepend
};