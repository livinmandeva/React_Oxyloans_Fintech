"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[6703],{14711:function(e,a,t){t.d(a,{C:function(){return o},a:function(){return i}});t(29867);var n=t(27663),s=t(92834);function i(e,a,t){return"prev"===a?(0,s.jsx)(n.rU,{to:"#",children:"\u2190"}):"next"===a?(0,s.jsx)(n.rU,{to:"#",children:"\u2192"}):t}function o(e,a){console.log(e,a)}},86703:function(e,a,t){t.r(a);var n=t(1413),s=t(29439),i=t(29867),o=t(27663),r=t(34069),d=t(42081),c=t(60164),l=t(14711),u=t(36037),m=t(44790),h=t(92834);a.default=function(){var e=(0,i.useState)({apiData:"",hasdata:!1,loading:!0,pageNo:1,pageSize:6,defaultPageSize:6,donloadlink:""}),a=(0,s.Z)(e,2),t=a[0],p=a[1];(0,i.useEffect)((function(){return(0,u.zn)(t.pageNo,t.pageSize).then((function(e){200==e.request.status&&p((0,n.Z)((0,n.Z)({},t),{},{apiData:e.data,loading:!1,hasdata:0!=e.data.count}))})),function(){}}),[t.pageNo,t.pageSize]),console.log(t);var g=[];""!=t.apiData&&t.apiData.map((function(e){g.push({key:Math.random(),TransactionDate:e.transactionDate,CreditedAmount:e.creditedAmount,DebitedAmount:e.debitedAmount,Status:e.amountFrom})}));return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("div",{className:"main-wrapper",children:[(0,h.jsx)(r.Z,{}),(0,h.jsx)(d.Z,{}),(0,h.jsx)("div",{className:"page-wrapper",children:(0,h.jsxs)("div",{className:"content container-fluid",children:[(0,h.jsx)("div",{className:"page-header",children:(0,h.jsx)("div",{className:"row",children:(0,h.jsxs)("div",{className:"col",children:[(0,h.jsx)("h3",{className:"page-title",children:"My Transactions"}),(0,h.jsxs)("ul",{className:"breadcrumb",children:[(0,h.jsx)("li",{className:"breadcrumb-item",children:(0,h.jsx)(o.rU,{to:"/dashboard",children:"Dashboard"})}),(0,h.jsx)("li",{className:"breadcrumb-item active",children:"my transactions"})]})]})})}),(0,h.jsx)("div",{className:"row",children:(0,h.jsx)("div",{className:"col-sm-12",children:(0,h.jsxs)("div",{className:"card",children:[(0,h.jsx)("div",{className:"card-header",children:(0,h.jsxs)("button",{className:"btn btn-xs col-12 col-md-2 btn-success pull-right",onClick:function(){(0,m.a4)()},children:[(0,h.jsx)("i",{className:"fa fa-download"})," Download"]})}),(0,h.jsx)("div",{className:"card-body",children:(0,h.jsx)("div",{children:(0,h.jsx)(c.Z,{className:"table-responsive table-responsive-md table-responsive-lg table-responsive-xs",pagination:{total:g.length,defaultPageSize:t.defaultPageSize,showTotal:function(e,a){return"Showing ".concat(a[0]," to ").concat(a[1]," of ").concat(e," entries")},position:["topRight"],showSizeChanger:!1,onShowSizeChange:l.C,size:"default",showLessItems:!0,pageSizeOptions:[5,10,15,20],responsive:!0},columns:[{title:"Transaction Date",dataIndex:"TransactionDate",sorter:function(e,a){return e.raisedon-a.raisedon}},{title:"Credited Amount",dataIndex:"CreditedAmount",sorter:function(e,a){return e.CreditedAmount-a.CreditedAmount}},{title:"Debited Amount",dataIndex:"DebitedAmount",sorter:function(e,a){return e.DebitedAmount-a.DebitedAmount}},{title:"Amount From",dataIndex:"Status",sorter:function(e,a){return e.Status-a.Status}}],dataSource:t.hasdata?g:[],expandable:!0,loading:t.loading,onChange:function(e){p((0,n.Z)((0,n.Z)({},t),{},{defaultPageSize:e.pageSize,pageNo:e.current,pageSize:e.pageSize}))}})})})]})})})]})})]})})}}}]);
//# sourceMappingURL=6703.23ba508c.chunk.js.map