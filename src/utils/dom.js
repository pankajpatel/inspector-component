/**
 * Finds the Elements matching selector in the context
 * @return {[Element/Node]} Collection of Elements/Nodes
 * @param {String} selector
 * @param {Element/Node} context
 */
const $find = (selector, context = document) => Array.prototype.slice.apply( context.querySelectorAll(selector) );

/**
 * Appends the markup to the parent
 * @param {String} markup
 * @param {Element/Node} parent
 */
const $append = (markup, parent) => {
  let temp_container = document.createElement('div');
  temp_container.innerHTML = markup;
  while(temp_container.firstChild){
    parent.appendChild(temp_container.firstChild);
  }
};

/**
 * Prepends the markup in parent
 * @param {String} markup
 * @param {Element/Node} parent
 */
const $prepend = (markup, parent) => {
  let temp_container = document.createElement('div');
  temp_container.innerHTML = markup;
  while(temp_container.firstChild){
    parent.insertBefore(temp_container.firstChild, parent.firstElementChild);
  }
};

module.exports = {
  $find, $append, $prepend
}
