(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["OffeneWorkshops"],{1620:function(s,t,o){"use strict";o.r(t);var i=function(){var s=this,t=s.$createElement,o=s._self._c||t;return o("div",{staticClass:"p-1 p-md-5"},[o("h1",{staticClass:"pl-1 pl-md-5"},[s._v("Workshop "+s._s(s.workshop.title)+" Übersicht")]),o("div",{staticClass:"px-1 px-md-5"},[o("div",{staticClass:"pt-3"},[o("h3",{staticClass:"d-flex justify-content-start"},[s._v("Angabe:")]),o("p",[s._v(" "+s._s(s.workshop.content)+" ")]),o("md-button",{staticClass:"md-primary md-raised"},[o("span",[s._v("Angabe.pdf")]),o("md-icon",[s._v("get_app")])],1)],1),o("div",{staticClass:"pt-3"},[o("h3",[s._v("Deadline: "+s._s(s.workshop.end))])]),this.submissions.length>0?o("div",{staticClass:"pt-3"},[o("h3",[s._v("Bisherige Abgaben")]),o("md-table",{staticClass:"d-flex"},s._l(s.workshop.submissions,(function(t,i){return o("md-table-row",{key:i},[o("md-table-cell",[o("span",{staticClass:"md-text"},[s._v("Abgabe vom "+s._s(t.date))])]),o("md-table-cell",[o("md-button",{staticClass:"md-icon-button md-list-action",attrs:{to:{path:"/reviewoverview/"+t.id}}},[o("md-icon",[s._v("info")])],1)],1)],1)})),1)],1):o("div",[o("h3",[s._v("Noch nichts abgegeben")])])])])},e=[],a=o("9769"),n={name:"WorkshopOverview",data:function(){return{workshop:{},submissions:{}}},methods:{getWorkshop:function(){var s=this;this.workshop=a["a"].getStudentWorkshop(this.$parent.username,this.$parent.pw,this.$route.params.id).then((function(t){s.workshop=t.data.workshop,s.submissions=s.workshop.submissions})).catch((function(s){console.error(s)}))}},mounted:function(){this.$parent.authenticated?this.getWorkshop(this.$route.params.id):window.location.href="/login"}},r=n,p=o("2877"),d=Object(p["a"])(r,i,e,!1,null,"407989f3",null);t["default"]=d.exports}}]);
//# sourceMappingURL=OffeneWorkshops.a80e7169.js.map