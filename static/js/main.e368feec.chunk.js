(this["webpackJsonpsocial-network"]=this["webpackJsonpsocial-network"]||[]).push([[0],{69:function(e,t,n){},71:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),o=n(10),s=n.n(o),r=(n(69),n(22)),i=n.n(r),l=n(33),u=n(32),j=(n(71),n(119)),d=n(124),b=n(123),h=n(130),p=n(58),O=n.n(p),f=n(57),x=n.n(f),m=n(56),g=n.n(m),k=n(125),C=n(6),v=function(e){return Object(C.jsxs)(j.a,{style:{margin:20},children:[Object(C.jsxs)(b.a,{children:[Object(C.jsx)("h1",{children:e.user}),Object(C.jsx)("p",{children:e.content})]}),Object(C.jsx)(d.a,{children:Object(C.jsxs)(k.a,{container:!0,direction:"row",justify:"space-around",alignItems:"center",children:[Object(C.jsxs)(h.a,{size:"small",startIcon:Object(C.jsx)(g.a,{}),onClick:function(){console.log("Like")},children:["Like (",e.likeCount,")"]}),Object(C.jsx)(h.a,{size:"small",startIcon:Object(C.jsx)(x.a,{}),onClick:function(){console.log("Comment")},children:"Comment"}),Object(C.jsx)(h.a,{size:"small",startIcon:Object(C.jsx)(O.a,{}),onClick:function(){console.log("Share")},children:"Share"})]})})]})},S=n(129),w=n(132),y=n(127),F=n(126),I=n(133);var N=function(e){var t=Object(c.useState)(""),n=Object(u.a)(t,2),a=n[0],o=n[1],s=Object(c.useState)(""),r=Object(u.a)(s,2),j=r[0],d=r[1];return Object(C.jsx)("div",{children:Object(C.jsxs)(w.a,{open:e.open,onClose:e.handleClose,"aria-labelledby":"form-dialog-title",children:[Object(C.jsx)(I.a,{id:"form-dialog-title",children:"Post"}),Object(C.jsxs)(F.a,{children:[Object(C.jsx)(S.a,{value:a,onChange:function(e){o(e.target.value)},autoFocus:!0,margin:"dense",id:"name",label:"Name"}),Object(C.jsx)(S.a,{value:j,onChange:function(e){d(e.target.value)},autoFocus:!0,margin:"dense",id:"content",label:"Content",fullWidth:!0,multiline:!0})]}),Object(C.jsxs)(y.a,{children:[Object(C.jsx)(h.a,{onClick:Object(l.a)(i.a.mark((function t(){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.handleSubmit({user_name:a,content:j,likes:0});case 2:case"end":return t.stop()}}),t)}))),color:"primary",children:"Submit"}),Object(C.jsx)(h.a,{onClick:e.handleClose,color:"primary",children:"Cancel"})]})]})})},P=n(128);var z=function(){var e=Object(c.useState)([]),t=Object(u.a)(e,2),n=t[0],a=t[1],o=Object(c.useState)(!1),s=Object(u.a)(o,2),r=s[0],j=s[1],d=function(){var e=Object(l.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j(!1),console.log(t),e.next=4,fetch("https://fast-coast-04774.herokuapp.com/posts",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});case 4:return n=e.sent,console.log(n),e.next=8,b();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(l.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://fast-coast-04774.herokuapp.com/posts");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,document.title="Social Network",console.log(n),a(n);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){b()}),[]),Object(C.jsxs)("div",{className:"App",children:[Object(C.jsx)("h1",{children:"Social Network"}),Object(C.jsx)(h.a,{size:"small",onClick:function(){j(!0)},children:"Post"}),Object(C.jsx)(P.a,{maxWidth:"sm",children:n.map((function(e){return Object(C.jsx)(v,{user:e.user_name,content:e.content,likeCount:e.likes},e.post_id)}))}),Object(C.jsx)(N,{open:r,handleClose:function(){j(!1)},handleSubmit:d})]})},L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,135)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),o(e),s(e)}))};s.a.render(Object(C.jsx)(a.a.StrictMode,{children:Object(C.jsx)(z,{})}),document.getElementById("root")),L()}},[[79,1,2]]]);
//# sourceMappingURL=main.e368feec.chunk.js.map