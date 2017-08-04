'use strict';

module.exports = function (object, callback) {
  var data = null;
  try {
    data = JSON.parse(object);
  } catch (e) {
    if (isNaN(Number(object))) {
      //try for String, Boolean, null, undefined
      switch (object) {
        case 'null':
          data = null;
          break;
        case 'undefined':
          data = undefined;
          break;
        case 'true':
        case 'false':
          data = Boolean(object);
          break;
        default:
          data = object;
      }
    } else {
      data = Number(object);
    }
  } finally {
    callback ? callback(data) : function () {};
  }
  return data;
};