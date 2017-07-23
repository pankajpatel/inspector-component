require('./ObjectValue');
require('./ObjectName');

/* NOTE: Chrome console.log is italic */
const styles = {
  preview: {
    fontStyle: 'italic',
  },
};

/* intersperse arr with separator */
function intersperse(arr, sep) {
  if (arr.length === 0) {
    return [];
  }

  return arr.slice(1).reduce((xs, x) => xs.concat([sep, x]), [arr[0]]);
}

/**
 * A preview of the object
 */
class ObjectPreview extends HTMLElement {
  constructor({ data, maxProperties = 5 }) {
    super();
    const object = data;

    if (
      typeof object !== 'object' ||
      object === null ||
      object instanceof Date ||
      object instanceof RegExp
    ) {
      return `<object-value object={object} ></object-value>`;
    }

    if (Array.isArray(object)) {
      return (`
        <span style=${styles.preview}>
          [
          ${intersperse(
            object.map((element, index) => `<object-value object=${element} ></object-value>`),
            ', ',
          )}
          ]
        </span>
      `);
    } else {
      let propertyNodes = [];
      for (let propertyName in object) {
        const propertyValue = object[propertyName];
        if (object.hasOwnProperty(propertyName)) {
          let ellipsis;
          if (
            propertyNodes.length === maxProperties - 1 &&
            Object.keys(object).length > maxProperties
          ) {
            ellipsis = `<span key=${'ellipsis'}>…</span>`;
          }
          propertyNodes.push(`
            <span key=${propertyName}>
              <object-name name=${propertyName} ></object-name>
              :&nbsp;
              <object-value object={propertyValue} ></object-value>
              ${ellipsis}
            </span>,
          `);
          if (ellipsis) break;
        }
      }

      return (`
        <span style=${styles.preview}>
          ${`${object.constructor.name} {`}
          ${intersperse(propertyNodes, ', ')}
          ${'}'}
        </span>
      `);
    }
  }
}

customElements.define('object-preview', ObjectPreview);
