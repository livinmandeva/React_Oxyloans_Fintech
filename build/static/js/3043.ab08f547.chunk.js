"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[3043],{14711:function(a,e,n){n.d(e,{C:function(){return r},a:function(){return i}});n(29867);var t=n(27663),s=n(92834);function i(a,e,n){return"prev"===e?(0,s.jsx)(t.rU,{to:"#",children:"\u2190"}):"next"===e?(0,s.jsx)(t.rU,{to:"#",children:"\u2192"}):n}function r(a,e){console.log(a,e)}},53043:function(a,e,n){n.r(e);var t=n(1413),s=n(29439),i=n(29867),r=n(27663),c=n(34069),l=n(42081),o=n(60164),d=(n(14711),n(36037)),u=n(44790),h=n(92834);e.default=function(){var a=(0,i.useState)({apiData:"",hasdata:!1,loading:!0}),e=(0,s.Z)(a,2),n=e[0],p=e[1],f=function(a,e,n){(0,u.t3)(a,e,n)};(0,i.useEffect)((function(){return(0,d.PY)().then((function(a){200==a.request.status&&p((0,t.Z)((0,t.Z)({},n),{},{apiData:a.data,loading:!1,hasdata:0!=a.data.length}))})),function(){}}),[]);var x=[];""!=n.apiData&&n.apiData.map((function(a){x.push({key:Math.random(),SO:a.sNo,FY:a.financialYear,EARNINGS:a.incomeEarned,DOWNLOADFYREPORT:(0,h.jsxs)("span",{className:"badge bg-success",type:"button",onClick:function(){f(a.startDate,a.endDate,"DOWNLOAD")},children:[(0,h.jsx)("i",{class:"fa-solid fa-download"})," Download FY Report"]}),EMAILFYREPORT:(0,h.jsxs)("span",{className:"badge bg-info",type:"button",onClick:function(){f(a.startDate,a.endDate,"EMAIL")},children:[(0,h.jsx)("i",{class:"fa-solid fa-envelope"})," Get FY Email Report"]})})}));return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("div",{className:"main-wrapper",children:[(0,h.jsx)(c.Z,{}),(0,h.jsx)(l.Z,{}),(0,h.jsx)("div",{className:"page-wrapper",children:(0,h.jsxs)("div",{className:"content container-fluid",children:[(0,h.jsx)("div",{className:"page-header",children:(0,h.jsx)("div",{className:"row",children:(0,h.jsxs)("div",{className:"col",children:[(0,h.jsx)("h3",{className:"page-title",children:"Financial Reports"}),(0,h.jsxs)("ul",{className:"breadcrumb",children:[(0,h.jsx)("li",{className:"breadcrumb-item",children:(0,h.jsx)(r.rU,{to:"/dashboard",children:"Dashboard"})}),(0,h.jsx)("li",{className:"breadcrumb-item active",children:"Earning Certificate"})]})]})})}),(0,h.jsx)("div",{className:"row",children:(0,h.jsx)("div",{className:"col-sm-12",children:(0,h.jsx)("div",{className:"card",children:(0,h.jsx)("div",{className:"card-body",children:(0,h.jsx)("div",{children:(0,h.jsx)(o.Z,{className:"table-responsive table-responsive-md table-responsive-lg table-responsive-xs",pagination:{total:x.length,showTotal:function(a,e){return"Showing ".concat(e[0]," to ").concat(e[1]," of ").concat(a," entries")},position:["topRight"]},columns:[{title:"S#",dataIndex:"SO",sorter:function(a,e){return a.SO.length-e.SO.length}},{title:"FY",dataIndex:"FY",sorter:function(a,e){return a.FY.length-e.FY.length}},{title:"Earnings",dataIndex:"EARNINGS",sorter:function(a,e){return a.EARNINGS-e.EARNINGS}},{title:"DOWNLOAD FY REPORT",dataIndex:"DOWNLOADFYREPORT",sorter:function(a,e){return a.DOWNLOADFYREPORT.length-e.DOWNLOADFYREPORT.length}},{title:"EMAIL FY REPORT",dataIndex:"EMAILFYREPORT",sorter:function(a,e){return a.EMAILFYREPORT.length-e.EMAILFYREPORT.length}}],dataSource:n.hasdata?x:[],expandable:!0,loading:n.loading})})})})})})]})})]})})}}}]);
//# sourceMappingURL=3043.ab08f547.chunk.js.map