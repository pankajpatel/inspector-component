const changeCase = require('param-case');
class Css {
  static of (json) {
    const selectors = Object.keys(json)
    return selectors.map((selector) => {
      const definition = json[selector]
      if(definition) {
        if(typeof definition === 'object') {
          const rules = Object.keys(definition)
          const result = rules.map((rule) => {
            return `${rule}:${definition[rule]}`
          }).join(';')
          return `${selector}{${result}}`;
        } else {
          return `${changeCase(selector)}: ${definition};`;
        }
      } else {
        return '';
      }
    }).filter(item => item.trim() !== '').join('\n')
  }
}

module.exports = styleObj => Css.of(styleObj);
