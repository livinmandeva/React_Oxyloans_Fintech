"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[3764],{14711:function(a,e,t){t.d(e,{C:function(){return r},a:function(){return l}});t(29867);var n=t(27663),s=t(92834);function l(a,e,t){return"prev"===e?(0,s.jsx)(n.rU,{to:"#",children:"\u2190"}):"next"===e?(0,s.jsx)(n.rU,{to:"#",children:"\u2192"}):t}function r(a,e){console.log(a,e)}},13764:function(a,e,t){t.r(e);var n=t(4942),s=t(1413),l=t(29439),r=t(29867),i=t(27663),d=t(60164),c=t(14711),o=t(34069),h=t(42081),m=t(44544),u=t(36037),x=t(92834);e.default=function(){var a=(0,r.useState)({apiData:"",hasdata:!1,loading:!0,totalEarnigAmount:0,searchStartdate:null,searchEndDate:null,sortbased:null,btnvalid:!0}),e=(0,l.Z)(a,2),t=e[0],p=e[1],j=function(a){var e=a.target,l=e.name,r=e.value;p((0,s.Z)((0,s.Z)({},t),{},(0,n.Z)({},l,r)))};(0,r.useEffect)((function(){null!=t.searchStartdate&&null!=t.searchEndDate&&null!=t.sortbased&&p((0,s.Z)((0,s.Z)({},t),{},{btnvalid:!1}))}),[t.searchStartdate,t.searchEndDate,t.sortbased]),(0,r.useEffect)((function(){return(0,u.Sy)().then((function(a){200==a.request.status&&p((0,s.Z)((0,s.Z)({},t),{},{apiData:a.data,totalEarnigAmount:a.data.totalInterestEarned,loading:!1,hasdata:0!=a.data.listOfInterestDetails.length}))})),function(){}}),[]);var v=[];""!=t.apiData&&t.apiData.listOfInterestDetails.map((function(a){v.push({key:Math.random(),DealName:a.dealName,InterestAmount:a.interestAmount,PaidDate:a.paidDate})}));var N=[{key:Math.random(),title:"Deal Name",dataIndex:"DealName",sorter:function(a,e){return a.DealName.length-e.DealName.length}},{key:Math.random(),title:"Interest Amount",dataIndex:"InterestAmount",sorter:function(a,e){return a.InterestAmount-e.InterestAmount}},{key:Math.random(),title:"Paid Date",dataIndex:"PaidDate",sorter:function(a,e){return a.PaidDate-e.PaidDate}}];return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)("div",{className:"main-wrapper",children:[(0,x.jsx)(o.Z,{}),(0,x.jsx)(h.Z,{}),(0,x.jsxs)("div",{className:"page-wrapper",children:[(0,x.jsxs)("div",{className:"content container-fluid",children:[(0,x.jsx)("div",{className:"page-header",children:(0,x.jsx)("div",{className:"row align-items-center",children:(0,x.jsxs)("div",{className:"col",children:[(0,x.jsx)("h3",{className:"page-title",children:"My Interest Info"}),(0,x.jsxs)("ul",{className:"breadcrumb",children:[(0,x.jsx)("li",{className:"breadcrumb-item",children:(0,x.jsx)(i.rU,{to:"/dashboard",children:"Dashboard"})}),(0,x.jsx)("li",{className:"breadcrumb-item active",children:"My interest Earning"})]})]})})}),(0,x.jsx)("div",{className:"student-group-form",children:(0,x.jsxs)("div",{className:"row",children:[(0,x.jsx)("div",{className:"col-lg-3 col-md-6",children:(0,x.jsx)("div",{className:"form-group",children:(0,x.jsx)("input",{type:"date",className:"form-control",placeholder:"Search by Start Date ...",onChange:j,name:"searchStartdate"})})}),(0,x.jsx)("div",{className:"col-lg-3 col-md-6",children:(0,x.jsx)("div",{className:"form-group",children:(0,x.jsx)("input",{type:"date",className:"form-control",name:"searchEndDate",placeholder:"Search by End Date...",onChange:j})})}),(0,x.jsx)("div",{className:"col-lg-4 col-md-6",children:(0,x.jsx)("div",{className:"form-group",children:(0,x.jsxs)("select",{className:"form-control",name:"sortbased",onChange:j,children:['""',(0,x.jsx)("option",{value:"null",children:"-- Sort Based On --"}),(0,x.jsx)("option",{value:"PaidDate",children:"Paid Date"}),(0,x.jsx)("option",{value:"Amount",children:"Amount"}),(0,x.jsx)("option",{value:"DealName",children:"Deal Name"})]})})}),(0,x.jsx)("div",{className:"col-lg-2",children:(0,x.jsx)("div",{className:"search-student-btn",children:(0,x.jsx)("button",{type:"btn",className:"btn btn-primary",onClick:function(){(0,u.E7)(t).then((function(a){200==a.request.status&&p((0,s.Z)((0,s.Z)({},t),{},{apiData:a.data,totalEarnigAmount:a.data.totalInterestEarned,loading:!1,hasdata:0!=a.data.listOfInterestDetails.length}))}))},disabled:t.btnvalid,children:"Search"})})})]})}),(0,x.jsx)("div",{className:"row",children:(0,x.jsx)("div",{className:"col-sm-12",children:(0,x.jsx)("div",{className:"card card-table",children:(0,x.jsxs)("div",{className:"card-body",children:[(0,x.jsx)("div",{className:"page-header",children:(0,x.jsx)("div",{className:"row align-items-center",children:(0,x.jsx)("div",{className:"col",children:(0,x.jsxs)("h6",{className:"page-title",children:["Total Interest Earned :"," ",t.totalEarnigAmount]})})})}),(0,x.jsx)("div",{className:"table-responsive",children:(0,x.jsx)(d.Z,{className:"table table-stripped table-hover datatable",pagination:{total:v.length,showTotal:function(a,e){return"Showing ".concat(e[0]," to ").concat(e[1]," of ").concat(a," entries")},position:["topRight"],showSizeChanger:!0,onShowSizeChange:c.C},columns:N,dataSource:t.hasdata?v:[],expandable:!0,loading:t.loading})})]})})})})]}),(0,x.jsx)(m.Z,{})]})]})})}}}]);
//# sourceMappingURL=3764.45418770.chunk.js.map