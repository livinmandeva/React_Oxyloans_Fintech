"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[1556],{14711:function(e,a,t){t.d(a,{C:function(){return i},a:function(){return r}});t(29867);var n=t(27663),s=t(92834);function r(e,a,t){return"prev"===a?(0,s.jsx)(n.rU,{to:"#",children:"\u2190"}):"next"===a?(0,s.jsx)(n.rU,{to:"#",children:"\u2192"}):t}function i(e,a){console.log(e,a)}},21556:function(e,a,t){t.r(a);var n=t(1413),s=t(29439),r=t(29867),i=t(27663),l=t(34069),o=t(42081),c=t(60164),d=t(14711),u=t(36037),m=t(92834);a.default=function(){var e=(0,r.useState)({apiData:"",hasdata:!1,loading:!0,pageNo:1,pageSize:5,defaultPageSize:5,dealtype:"NORMAL"}),a=(0,s.Z)(e,2),t=a[0],h=a[1];(0,r.useEffect)((function(){return(0,u.$l)(t.pageNo,t.pageSize,t.dealtype).then((function(e){200==e.request.status&&h((0,n.Z)((0,n.Z)({},t),{},{apiData:e.data,loading:!1,hasdata:0!=e.data.count}))})),function(){}}),[t.pageNo,t.pageSize,t.dealtype]);var p=[];""!==t.apiData&&t.apiData.lenderPaticipatedResponseDto.forEach((function(e){var a="/withdrawdealFounds?dealId=".concat(e.dealId,"&currentAmount=").concat(e.currentValue,"&requestedAmount=").concat(e.requestedAmount,"&dealName=").concat(e.dealName,"&roi=").concat(e.rateOfInterest);p.push({key:Math.random(),DealName:e.dealName,DealType:e.dealType,ParticipatedAmount:e.paticipatedAmount,RoI:e.rateOfInterest+" % ",Duration:e.dealDuration+" M ",DealStatus:e.currentStatus,RequestedAmount:e.requestedAmount,action:(0,m.jsx)(i.rU,{to:a,children:(0,m.jsxs)("button",{type:"submit",className:"btn w-100 btn-primary btn-xs",children:[(0,m.jsx)("i",{class:"fa-solid fa-business-time"})," Withdraw"]})})})}));return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)("div",{className:"main-wrapper",children:[(0,m.jsx)(l.Z,{}),(0,m.jsx)(o.Z,{}),(0,m.jsx)("div",{className:"page-wrapper",children:(0,m.jsxs)("div",{className:"content container-fluid",children:[(0,m.jsx)("div",{className:"page-header",children:(0,m.jsx)("div",{className:"row",children:(0,m.jsxs)("div",{className:"col",children:[(0,m.jsxs)("h3",{className:"page-title",children:["Withdraw Funds from ",t.dealtype," Deal"]}),(0,m.jsxs)("ul",{className:"breadcrumb",children:[(0,m.jsx)("li",{className:"breadcrumb-item",children:(0,m.jsx)(i.rU,{to:"/dashboard",children:"Dashboard"})}),(0,m.jsx)("li",{className:"breadcrumb-item active",children:"withdrawdeal from Deal"})]})]})})}),(0,m.jsx)("div",{className:"row",children:(0,m.jsx)("div",{className:"col-sm-12",children:(0,m.jsxs)("div",{className:"card",children:[(0,m.jsx)("div",{className:"card-header",children:(0,m.jsxs)("div",{className:"row col-12",children:[(0,m.jsxs)("button",{className:"btn btn-xs btn-warning col-md-2 col-xs-6 col-lg-3 mx-lg-2 my-xs-2",onClick:function(){h((0,n.Z)((0,n.Z)({},t),{},{dealtype:"ESCROW"}))},children:[(0,m.jsx)("i",{class:"fa-solid fa-briefcase"})," Withdraw From Escrow"]}),(0,m.jsxs)("button",{onClick:function(){h((0,n.Z)((0,n.Z)({},t),{},{dealtype:"NORMAL"}))},className:"btn btn-xs btn-primary col-md-2 col-xs-6 col-lg-4 mx-lg-2 my-xs-2",children:[(0,m.jsx)("i",{class:"fa-solid fa-briefcase"})," Withdraw from a Normal deal"]})]})}),(0,m.jsx)("div",{className:"card-body",children:(0,m.jsx)("div",{children:(0,m.jsx)(c.Z,{className:"table-responsive table-responsive-md table-responsive-lg table-responsive-xs",pagination:{total:p.length,showTotal:function(e,a){return"Showing ".concat(a[0]," to ").concat(a[1]," of ").concat(e," entries")},position:["topRight"],showSizeChanger:!0,onShowSizeChange:d.C},columns:[{title:"Deal Name",dataIndex:"DealName",sorter:function(e,a){return e.DealName.length-a.DealName.length}},{title:"Participated",dataIndex:"ParticipatedAmount",sorter:function(e,a){return e.ParticipatedAmount-a.ParticipatedAmount}},{title:"RoI",dataIndex:"RoI",sorter:function(e,a){return e.RoI-a.RoI}},{title:"Duration",dataIndex:"Duration",sorter:function(e,a){return e.Duration-a.Duration}},{title:"Deal Status",dataIndex:"DealStatus",sorter:function(e,a){return e.DealStatus.length-a.DealStatus.length}},{title:"Requested",dataIndex:"RequestedAmount",sorter:function(e,a){return e.RequestedAmount-a.RequestedAmount}},{title:"Action",dataIndex:"action"}],expandable:!0,dataSource:t.hasdata?p:[],loading:t.loading,onChange:function(e){h((0,n.Z)((0,n.Z)({},t),{},{defaultPageSize:e.pageSize,pageNo:e.current,pageSize:e.pageSize}))}})})})]})})})]})})]})})}}}]);
//# sourceMappingURL=1556.465fb1e2.chunk.js.map