require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.parse-int.js");
var v = require("./utils/dom"), b = _(require("./index.css"));
function _(e) {
  return e && e.__esModule ? e : { default: e };
}
function m(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function y(e, t) {
  for (var o = 0; o < t.length; o++) {
    var r = t[o];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, w(r.key), r);
  }
}
function g(e, t, o) {
  return t && y(e.prototype, t), o && y(e, o), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function w(e) {
  var t = O(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function O(e, t) {
  if (typeof e != "object" || e === null)
    return e;
  var o = e[Symbol.toPrimitive];
  if (o !== void 0) {
    var r = o.call(e, t || "default");
    if (typeof r != "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function P(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && f(e, t);
}
function S(e) {
  var t = d();
  return function() {
    var r = a(e), n;
    if (t) {
      var i = a(this).constructor;
      n = Reflect.construct(r, arguments, i);
    } else
      n = r.apply(this, arguments);
    return j(this, n);
  };
}
function j(e, t) {
  if (t && (typeof t == "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return q(e);
}
function q(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function p(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return p = function(r) {
    if (r === null || !R(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(r))
        return t.get(r);
      t.set(r, n);
    }
    function n() {
      return l(r, arguments, a(this).constructor);
    }
    return n.prototype = Object.create(r.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), f(n, r);
  }, p(e);
}
function l(e, t, o) {
  return d() ? l = Reflect.construct.bind() : l = function(n, i, u) {
    var c = [null];
    c.push.apply(c, i);
    var h = Function.bind.apply(n, c), s = new h();
    return u && f(s, u.prototype), s;
  }, l.apply(null, arguments);
}
function d() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function R(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function f(e, t) {
  return f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, f(e, t);
}
function a(e) {
  return a = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, a(e);
}
require("@fontsource/jetbrains-mono");
require("./object-inspector/ObjectInspector");
const T = (e) => `
<div>
  <span class="counter">1</span>
  <object-inspector
    data='`.concat(e.data, `'
    theme='chromeLight'
  ></object-inspector>
</div>
`);
let k = /* @__PURE__ */ function(e) {
  P(o, e);
  var t = S(o);
  function o() {
    return m(this, o), t.apply(this, arguments);
  }
  return g(o, [{
    key: "connectedCallback",
    value: function() {
      const n = this.getAttribute("data");
      this.removeAttribute("data"), this.dom = this.attachShadow({
        mode: "open"
      }), this.render(n);
    }
  }, {
    key: "log",
    value: function(n) {
      let i = typeof n == "string" ? n : JSON.stringify(n);
      if (i !== this._data)
        this._data = i, (0, v.$prepend)(this.inspector(i), this.dom);
      else {
        let u = this.dom.querySelector(".counter"), c = parseInt(u.innerHTML);
        u.innerHTML = c + 1, u.classList.add("shown");
      }
    }
  }, {
    key: "inspector",
    value: function(n) {
      return n && n.length ? T({
        data: n
      }) : "";
    }
  }, {
    key: "render",
    value: function(n) {
      this._data = n, this.dom.innerHTML = "".concat((0, b.default)(), `
    `).concat(this.inspector(n));
    }
  }]), o;
}(/* @__PURE__ */ p(HTMLElement));
customElements.define("inspector-component", k);
