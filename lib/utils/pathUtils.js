"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExpandedPaths = exports.DEFAULT_ROOT_PATH = void 0;
exports.hasChildNodes = hasChildNodes;
exports.wildcardPathsFromLevel = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.reduce.js");
const DEFAULT_ROOT_PATH = "$";
exports.DEFAULT_ROOT_PATH = DEFAULT_ROOT_PATH;
const WILDCARD = "*";
function hasChildNodes(data, dataIterator) {
  return !dataIterator(data).next().done;
}
const wildcardPathsFromLevel = level => {
  // i is depth
  return Array.from({
    length: level
  }, (_, i) => [DEFAULT_ROOT_PATH].concat(Array.from({
    length: i
  }, () => "*")).join("."));
};
exports.wildcardPathsFromLevel = wildcardPathsFromLevel;
const getExpandedPaths = function getExpandedPaths(data, dataIterator, expandPaths, expandLevel) {
  let initialState = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  let wildcardPaths = [].concat(wildcardPathsFromLevel(expandLevel)).concat(expandPaths).filter(path => typeof path === "string"); // could be undefined

  const expandedPaths = [];
  wildcardPaths.forEach(wildcardPath => {
    const keyPaths = wildcardPath.split(".");
    const populatePaths = (curData, curPath, depth) => {
      if (depth === keyPaths.length) {
        expandedPaths.push(curPath);
        return;
      }
      const key = keyPaths[depth];
      if (depth === 0) {
        if (hasChildNodes(curData, dataIterator) && (key === DEFAULT_ROOT_PATH || key === WILDCARD)) {
          populatePaths(curData, DEFAULT_ROOT_PATH, depth + 1);
        }
      } else {
        if (key === WILDCARD) {
          for (let {
            name,
            data
          } of dataIterator(curData)) {
            if (hasChildNodes(data, dataIterator)) {
              populatePaths(data, "".concat(curPath, ".").concat(name), depth + 1);
            }
          }
        } else {
          const value = curData[key];
          if (hasChildNodes(value, dataIterator)) {
            populatePaths(value, "".concat(curPath, ".").concat(key), depth + 1);
          }
        }
      }
    };
    populatePaths(data, "", 0);
  });
  return expandedPaths.reduce((obj, path) => {
    obj[path] = true;
    return obj;
  }, initialState);
};
exports.getExpandedPaths = getExpandedPaths;