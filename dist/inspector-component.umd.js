(function(s){typeof define=="function"&&define.amd?define(s):s()})(function(){"use strict";require("core-js/modules/es.regexp.to-string.js"),require("core-js/modules/web.dom-collections.iterator.js"),require("core-js/modules/es.symbol.description.js"),require("core-js/modules/es.json.stringify.js"),require("core-js/modules/es.parse-int.js");var s=require("./utils/dom"),m=b(require("./index.css"));function b(e){return e&&e.__esModule?e:{default:e}}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,g(n.key),n)}}function _(e,t,o){return t&&y(e.prototype,t),o&&y(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}function g(e){var t=j(e,"string");return typeof t=="symbol"?t:String(t)}function j(e,t){if(typeof e!="object"||e===null)return e;var o=e[Symbol.toPrimitive];if(o!==void 0){var n=o.call(e,t||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function w(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t)}function O(e){var t=d();return function(){var n=f(e),r;if(t){var i=f(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return P(this,r)}}function P(e,t){if(t&&(typeof t=="object"||typeof t=="function"))return t;if(t!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return S(e)}function S(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e){var t=typeof Map=="function"?new Map:void 0;return p=function(n){if(n===null||!q(n))return n;if(typeof n!="function")throw new TypeError("Super expression must either be null or a function");if(typeof t<"u"){if(t.has(n))return t.get(n);t.set(n,r)}function r(){return l(n,arguments,f(this).constructor)}return r.prototype=Object.create(n.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),c(r,n)},p(e)}function l(e,t,o){return d()?l=Reflect.construct.bind():l=function(r,i,u){var a=[null];a.push.apply(a,i);var k=Function.bind.apply(r,a),h=new k;return u&&c(h,u.prototype),h},l.apply(null,arguments)}function d(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function q(e){return Function.toString.call(e).indexOf("[native code]")!==-1}function c(e,t){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,r){return n.__proto__=r,n},c(e,t)}function f(e){return f=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(o){return o.__proto__||Object.getPrototypeOf(o)},f(e)}require("@fontsource/jetbrains-mono"),require("./object-inspector/ObjectInspector");const R=e=>`
<div>
  <span class="counter">1</span>
  <object-inspector
    data='`.concat(e.data,`'
    theme='chromeLight'
  ></object-inspector>
</div>
`);let T=function(e){w(o,e);var t=O(o);function o(){return v(this,o),t.apply(this,arguments)}return _(o,[{key:"connectedCallback",value:function(){const r=this.getAttribute("data");this.removeAttribute("data"),this.dom=this.attachShadow({mode:"open"}),this.render(r)}},{key:"log",value:function(r){let i=typeof r=="string"?r:JSON.stringify(r);if(i!==this._data)this._data=i,(0,s.$prepend)(this.inspector(i),this.dom);else{let u=this.dom.querySelector(".counter"),a=parseInt(u.innerHTML);u.innerHTML=a+1,u.classList.add("shown")}}},{key:"inspector",value:function(r){return r&&r.length?R({data:r}):""}},{key:"render",value:function(r){this._data=r,this.dom.innerHTML="".concat((0,m.default)(),`
    `).concat(this.inspector(r))}}]),o}(p(HTMLElement));customElements.define("inspector-component",T)});
