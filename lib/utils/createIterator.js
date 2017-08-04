'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (showNonenumerable, sortObjectKeys) {
  var objectIterator = regeneratorRuntime.mark(function objectIterator(data) {
    var shouldIterate, i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry, _entry, k, v, keys, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, propertyName, propertyValue, _propertyValue;

    return regeneratorRuntime.wrap(function objectIterator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shouldIterate = (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && data !== null || typeof data === 'function';

            if (shouldIterate) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return');

          case 3:
            if (!(!Array.isArray(data) && data[Symbol.iterator])) {
              _context.next = 40;
              break;
            }

            i = 0;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;
            _iterator = data[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 24;
              break;
            }

            entry = _step.value;

            if (!(Array.isArray(entry) && entry.length === 2)) {
              _context.next = 18;
              break;
            }

            _entry = _slicedToArray(entry, 2), k = _entry[0], v = _entry[1];
            _context.next = 16;
            return {
              name: k,
              data: v
            };

          case 16:
            _context.next = 20;
            break;

          case 18:
            _context.next = 20;
            return {
              name: i.toString(),
              data: entry
            };

          case 20:
            i++;

          case 21:
            _iteratorNormalCompletion = true;
            _context.next = 10;
            break;

          case 24:
            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context['catch'](8);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 30:
            _context.prev = 30;
            _context.prev = 31;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 33:
            _context.prev = 33;

            if (!_didIteratorError) {
              _context.next = 36;
              break;
            }

            throw _iteratorError;

          case 36:
            return _context.finish(33);

          case 37:
            return _context.finish(30);

          case 38:
            _context.next = 81;
            break;

          case 40:
            keys = Object.getOwnPropertyNames(data);

            if (sortObjectKeys === true) {
              keys.sort();
            } else if (typeof sortObjectKeys === 'function') {
              keys.sort(sortObjectKeys);
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 45;
            _iterator2 = keys[Symbol.iterator]();

          case 47:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 64;
              break;
            }

            propertyName = _step2.value;

            if (!data.propertyIsEnumerable(propertyName)) {
              _context.next = 55;
              break;
            }

            propertyValue = data[propertyName];
            _context.next = 53;
            return {
              name: propertyName,
              data: propertyValue
            };

          case 53:
            _context.next = 61;
            break;

          case 55:
            if (!showNonenumerable) {
              _context.next = 61;
              break;
            }

            // To work around the error (happens some time when propertyName === 'caller' || propertyName === 'arguments')
            // 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
            // http://stackoverflow.com/questions/31921189/caller-and-arguments-are-restricted-function-properties-and-cannot-be-access
            _propertyValue = void 0;

            try {
              _propertyValue = data[propertyName];
            } catch (e) {
              // console.warn(e)
            }

            if (!(_propertyValue !== undefined)) {
              _context.next = 61;
              break;
            }

            _context.next = 61;
            return {
              name: propertyName,
              data: _propertyValue,
              isNonenumerable: true
            };

          case 61:
            _iteratorNormalCompletion2 = true;
            _context.next = 47;
            break;

          case 64:
            _context.next = 70;
            break;

          case 66:
            _context.prev = 66;
            _context.t1 = _context['catch'](45);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 70:
            _context.prev = 70;
            _context.prev = 71;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 73:
            _context.prev = 73;

            if (!_didIteratorError2) {
              _context.next = 76;
              break;
            }

            throw _iteratorError2;

          case 76:
            return _context.finish(73);

          case 77:
            return _context.finish(70);

          case 78:
            if (!(showNonenumerable && data !== Object.prototype /* already added */)) {
              _context.next = 81;
              break;
            }

            _context.next = 81;
            return {
              name: '__proto__',
              data: Object.getPrototypeOf(data),
              isNonenumerable: true
            };

          case 81:
          case 'end':
            return _context.stop();
        }
      }
    }, objectIterator, this, [[8, 26, 30, 38], [31,, 33, 37], [45, 66, 70, 78], [71,, 73, 77]]);
  });

  return objectIterator;
};