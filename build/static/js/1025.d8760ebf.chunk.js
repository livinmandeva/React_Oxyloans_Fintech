"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[1025],{14711:function(e,a,t){t.d(a,{C:function(){return i},a:function(){return r}});t(29867);var n=t(27663),s=t(92834);function r(e,a,t){return"prev"===a?(0,s.jsx)(n.rU,{to:"#",children:"\u2190"}):"next"===a?(0,s.jsx)(n.rU,{to:"#",children:"\u2192"}):t}function i(e,a){console.log(e,a)}},11025:function(e,a,t){t.r(a);var n=t(1413),s=t(29439),r=t(29867),i=t(27663),o=t(34069),d=t(42081),c=t(60164),u=t(14711),l=t(36037),m=t(44790),h=t(92834);a.default=function(){var e=(0,r.useState)({apiData:"",hasdata:!1,loading:!0,pageNo:1,pageSize:10,defaultPageSize:10}),a=(0,s.Z)(e,2),t=a[0],p=a[1];(0,r.useEffect)((function(){return(0,l.Yr)(t.pageNo,t.pageSize).then((function(e){200==e.request.status&&p((0,n.Z)((0,n.Z)({},t),{},{apiData:e.data,loading:!1,hasdata:0!=e.data.results.length}))})),function(){}}),[t.pageNo,t.pageSize]);var x=[];""!=t.apiData&&t.apiData.results.map((function(e){x.push({key:Math.random(),raisedon:e.amountRequiredDate,amount:e.amount,reason:e.withdrawalReason,requestedFrom:e.requestFrom,status:e.status,action:(0,h.jsx)("button",{type:"submit",className:"btn  w-70 btn-primary btn-xs",disabled:"APPROVED"==e.status||"REJECTED"==e.status,onClick:function(){var a,t;a=e.requestFrom,t=e.id,(0,m.WP)(a,t)},children:"Cancel Request"})})}));return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("div",{className:"main-wrapper",children:[(0,h.jsx)(o.Z,{}),(0,h.jsx)(d.Z,{}),(0,h.jsx)("div",{className:"page-wrapper",children:(0,h.jsxs)("div",{className:"content container-fluid",children:[(0,h.jsx)("div",{className:"page-header",children:(0,h.jsx)("div",{className:"row",children:(0,h.jsxs)("div",{className:"col",children:[(0,h.jsx)("h3",{className:"page-title",children:"My Withdrawal Request Info"}),(0,h.jsxs)("ul",{className:"breadcrumb",children:[(0,h.jsx)("li",{className:"breadcrumb-item",children:(0,h.jsx)(i.rU,{to:"/dashboard",children:"Dashboard"})}),(0,h.jsx)("li",{className:"breadcrumb-item active",children:"Mywithdrawal History"})]})]})})}),(0,h.jsx)("div",{className:"row",children:(0,h.jsx)("div",{className:"col-sm-12",children:(0,h.jsx)("div",{className:"card",children:(0,h.jsx)("div",{className:"card-body",children:(0,h.jsx)("div",{children:(0,h.jsx)(c.Z,{className:"table-responsive table-responsive-md table-responsive-lg table-responsive-xs",pagination:{total:t.apiData.totalCount,defaultPageSize:t.defaultPageSize,showTotal:function(e,a){return"Showing ".concat(a[0]," to ").concat(a[1]," of ").concat(e," entries")},position:["topRight"],showSizeChanger:!0,onShowSizeChange:u.C},columns:[{title:"Raised on",dataIndex:"raisedon",sorter:function(e,a){return e.raisedon-a.raisedon}},{title:"Amount",dataIndex:"amount",sorter:function(e,a){return e.amount-a.amount}},{title:"Reason",dataIndex:"reason",sorter:function(e,a){return e.reason-a.reason}},{title:"Requested From",dataIndex:"requestedFrom",sorter:function(e,a){return e.requestedFrom-a.requestedFrom}},{title:"Status",dataIndex:"status",sorter:function(e,a){return e.status-a.status}},{title:"Action",dataIndex:"action"}],dataSource:t.hasdata?x:[],expandable:!0,loading:t.loading,onChange:function(e){p((0,n.Z)((0,n.Z)({},t),{},{defaultPageSize:e.pageSize,pageNo:e.current,pageSize:e.pageSize}))}})})})})})})]})})]})})}}}]);
//# sourceMappingURL=1025.d8760ebf.chunk.js.map