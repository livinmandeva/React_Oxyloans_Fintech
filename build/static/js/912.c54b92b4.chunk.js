"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[912],{40912:function(e,s,a){a.r(s);var l=a(4942),r=a(1413),n=a(29439),c=a(29867),i=a(27663),d=a(34069),t=a(42081),o=a(44790),m=a(36037),h=a(92834);s.default=function(){var e=(0,c.useState)({senderId:"",receiverId:"",amount:"",isValid:!0}),s=(0,n.Z)(e,2),a=s[0],u=s[1],x=function(e){var s=e.target,n=s.name,c=s.value;u((0,r.Z)((0,r.Z)({},a),{},(0,l.Z)({},n,c)))};return(0,c.useEffect)((function(){return""!=a.amount&&""!=a.receiverId?u((0,r.Z)((0,r.Z)({},a),{},{isValid:!1})):u((0,r.Z)((0,r.Z)({},a),{},{isValid:!0})),function(){}}),[a.amount,a.receiverId]),(0,c.useEffect)((function(){var e=(0,m.ow)();return u((0,r.Z)((0,r.Z)({},a),{},{senderId:e.userId})),function(){}}),[]),(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("div",{className:"main-wrapper",children:[(0,h.jsx)(d.Z,{}),(0,h.jsx)(t.Z,{}),(0,h.jsx)("div",{className:"page-wrapper",children:(0,h.jsxs)("div",{className:"content container-fluid",children:[(0,h.jsx)("div",{className:"page-header",children:(0,h.jsx)("div",{className:"row align-items-center",children:(0,h.jsxs)("div",{className:"col",children:[(0,h.jsx)("h3",{className:"page-title",children:"Transfer money from your wallet to another wallet."}),(0,h.jsxs)("ul",{className:"breadcrumb",children:[(0,h.jsx)("li",{className:"breadcrumb-item",children:(0,h.jsx)(i.rU,{to:"/dashboard",children:"DashBoard"})}),(0,h.jsx)("li",{className:"breadcrumb-item active",children:"Wallet To Wallet"})]})]})})}),(0,h.jsx)("div",{className:"row",children:(0,h.jsx)("div",{className:"col-sm-12",children:(0,h.jsxs)("div",{className:"card",children:[(0,h.jsx)("div",{className:"card-header",children:(0,h.jsxs)("p",{className:"note_point text-bold fst-italic",children:[(0,h.jsx)("code",{children:(0,h.jsx)("b",{children:"Note : "})}),"You can transfer funds from your wallet to your family's or friend's wallet (this sends a request to admin, and after the approval,funds will be debited from your account and credited to the requested account)"]})}),(0,h.jsx)("div",{className:"card-body",children:(0,h.jsx)("form",{children:(0,h.jsxs)("div",{className:"row",children:[(0,h.jsx)("div",{className:"col-12",children:(0,h.jsx)("h5",{className:"form-title",children:(0,h.jsx)("span",{children:"Sender Details"})})}),(0,h.jsx)("div",{className:"col-12 col-sm-4",children:(0,h.jsxs)("div",{className:"form-group local-forms",children:[(0,h.jsxs)("label",{children:["My User ID",(0,h.jsx)("span",{className:"login-danger",children:"*"})]}),(0,h.jsx)("input",{type:"text",className:"form-control",disabled:!0,value:"LR".concat(a.senderId)})]})}),(0,h.jsx)("div",{className:"col-12 col-sm-4",children:(0,h.jsxs)("div",{className:"form-group local-forms",children:[(0,h.jsxs)("label",{children:["Receiver ID",(0,h.jsx)("span",{className:"login-danger",children:"*"})]}),(0,h.jsx)("input",{type:"text",className:"form-control",placeholder:"Enter Receiver Id",name:"receiverId",onChange:x})]})}),(0,h.jsx)("div",{className:"col-12 col-sm-4",children:(0,h.jsxs)("div",{className:"form-group local-forms",children:[(0,h.jsxs)("label",{children:["Transfer Amount",(0,h.jsx)("span",{className:"login-danger",children:"*"})]}),(0,h.jsx)("input",{type:"text",className:"form-control",name:"amount",placeholder:"Enter Transfer Amount",onChange:x})]})}),(0,h.jsx)("div",{className:"col-12",children:(0,h.jsx)("div",{className:"student-submit",children:(0,h.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(){(0,m._)(a).then((function(e){console.log(e),200==e.request.status?(0,o.JO)("The wallet-to-wallet transfer was successful. Your withdrawal request has been initiated, and the receiver will receive the wallet amount after OxyAdmins approval."):(0,o.WY)(e.response.data.errorMessage)}))},disabled:a.isValid,children:"Submit"})})})]})})})]})})})]})})]})})}}}]);
//# sourceMappingURL=912.c54b92b4.chunk.js.map