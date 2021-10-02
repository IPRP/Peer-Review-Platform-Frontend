(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["WorkshopAbgabe"],{"092b":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"p-1 p-md-5"},[r("h1",{staticClass:"pl-1 pl-md-5"},[t._v(" Abgabe für Workshop "+t._s(t.$route.params.workshopname)+" ")]),r("div",{staticClass:"px-1 px-md-5"},[r("div",{staticClass:"pt-3"},[r("h3",{staticClass:"d-flex justify-content-start"},[t._v("Angabe:")]),r("p",[t._v(t._s(t.workshop.content))]),r("md-button",{staticClass:"md-raised md-primary"},[r("span",[t._v("Angabe.pdf")]),r("md-icon",[t._v("get_app")])],1)],1),r("div",{staticClass:"pt-3"},[r("h3",[t._v("Deadline: "+t._s(t.workshop.end))])]),r("div",{staticClass:"pt-3"},[r("h3",{staticClass:"d-flex justify-content-start"},[t._v("Abgabe Datei")]),r("form",{attrs:{enctype:"multipart/form-data"},on:{submit:function(e){return e.preventDefault(),t.onSubmit.apply(null,arguments)}}},[r("md-field",[r("label",[t._v("Titel")]),r("md-input",{model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),r("md-field",[r("label",[t._v("Kommentar")]),r("md-textarea",{model:{value:t.comment,callback:function(e){t.comment=e},expression:"comment"}})],1),r("md-field",[r("input",{ref:"file",attrs:{type:"file"},on:{change:t.onSelect}})]),r("div",{staticClass:"pt-3 d-flex justify-content-center justify-content-md-end"},[r("md-button",{staticClass:"md-raised prp-danger",attrs:{to:"/studentdashboard"}},[r("span",{staticClass:"p-1"},[t._v("Abbrechen")]),r("md-icon",{staticClass:"prp-danger"},[t._v("delete")])],1),r("md-button",{staticClass:"md-raised prp-success",attrs:{type:"submit"}},[r("span",{staticClass:"p-1"},[t._v("Speichern")]),r("md-icon",{staticClass:"prp-success-icon"},[t._v("done_all")])],1),r("div",{staticClass:"message"},[r("h5",[t._v(t._s(t.message))])])],1)],1)])])])},o=[];r("d3b7");function a(t,e,r,n,o,a,i){try{var s=t[a](i),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,o)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function s(t){a(i,n,o,s,c,"next",t)}function c(t){a(i,n,o,s,c,"throw",t)}s(void 0)}))}}r("3ca3"),r("ddb0"),r("2b3d"),r("96cf");var s=r("9769"),c={name:"WorkshopSubmission",data:function(){return{workshop:{},file:"",message:"",attachment:{},title:"",comment:""}},methods:{onSelect:function(){var t=this.$refs.file.files[0];this.file=t},onSubmit:function(){var t=this;return i(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=new FormData,r.append("file",t.file),e.prev=2,e.next=5,s["a"].uploadFile(t.$parent.username,t.$parent.pw,r).then((function(e){t.attachment=e.data.attachment,t.addSubmission()})).catch((function(e){t.message=e.response.data.error}));case 5:t.message="Uploaded!!",e.next=12;break;case 8:e.prev=8,e.t0=e["catch"](2),console.error(e.t0),t.message=e.t0.response.data.error;case 12:case"end":return e.stop()}}),e,null,[[2,8]])})))()},addSubmission:function(){var t=this;return i(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s["a"].addSubmission(t.$parent.username,t.$parent.pw,t.attachment,t.title,t.comment,t.$route.params.id).then((function(e){console.log(e.data.ok),t.$router.push("/studentdashboard")})).catch((function(e){t.message=e.response.data.error}));case 3:e.next=9;break;case 5:e.prev=5,e.t0=e["catch"](0),alert(e.t0),t.message=e.t0.response.data.error;case 9:case"end":return e.stop()}}),e,null,[[0,5]])})))()},getWorkshop:function(){var t=this;s["a"].getStudentWorkshop(this.$parent.username,this.$parent.pw,this.$route.params.id).then((function(e){t.workshop=e.data.workshop})).catch((function(t){console.log(t)}))},downloadSubmission:function(){s["a"].downloadSubmission(this.$parent.username,this.$parent.pw,this.submission.attachments[0].title).then((function(t){var e=window.URL.createObjectURL(new Blob([t.data])),r=document.createElement("a");r.href=e,r.setAttribute("download","file.pdf"),document.body.appendChild(r),r.click()}))}},mounted:function(){this.$parent.authenticated?this.getWorkshop():window.location.href="/login"}},u=c,l=r("2877"),h=Object(l["a"])(u,n,o,!1,null,"74e08c1f",null);e["default"]=h.exports},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(F){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,a=Object.create(o.prototype),i=new $(n||[]);return a._invoke=E(t,r,i),a}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(F){return{type:"throw",arg:F}}}t.wrap=u;var h="suspendedStart",f="suspendedYield",p="executing",d="completed",m={};function v(){}function y(){}function g(){}var w={};w[a]=function(){return this};var b=Object.getPrototypeOf,x=b&&b(b(O([])));x&&x!==r&&n.call(x,a)&&(w=x);var _=g.prototype=v.prototype=Object.create(w);function k(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function r(o,a,i,s){var c=l(t[o],t,a);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,i,s)}),(function(t){r("throw",t,i,s)})):e.resolve(h).then((function(t){u.value=t,i(u)}),(function(t){return r("throw",t,i,s)}))}s(c.arg)}var o;function a(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}this._invoke=a}function E(t,e,r){var n=h;return function(o,a){if(n===p)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw a;return A()}r.method=o,r.arg=a;while(1){var i=r.delegate;if(i){var s=C(i,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var c=l(t,e,r);if("normal"===c.type){if(n=r.done?d:f,c.arg===m)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=d,r.method="throw",r.arg=c.arg)}}}function C(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,C(t,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,m;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function $(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function O(t){if(t){var r=t[a];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:A}}function A(){return{value:e,done:!0}}return y.prototype=_.constructor=g,g.constructor=y,y.displayName=c(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,s,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},k(L.prototype),L.prototype[i]=function(){return this},t.AsyncIterator=L,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new L(u(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},k(_),c(_,s,"Generator"),_[a]=function(){return this},_.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=O,$.prototype={constructor:$,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],s=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,m):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;j(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:O(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}}}]);
//# sourceMappingURL=WorkshopAbgabe.c5f407e5.js.map