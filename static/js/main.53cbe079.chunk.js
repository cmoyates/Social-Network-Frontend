(this["webpackJsonpsocial-network"]=this["webpackJsonpsocial-network"]||[]).push([[0],{109:function(e,t,n){},110:function(e,t,n){},122:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n.n(c),r=n(12),i=n.n(r),o=(n(109),n(20)),a=n(14),l=(n(110),n(44)),j=n(16),u=n(13),b=n.n(u),d=n(18),p=n(51),h=n.n(p),f=n(2),m=function(e){var t=function(){var t=Object(d.a)(b.a.mark((function t(n){var c,s,r,i,o,a;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=!1,s=null,t.prev=2,t.next=5,fetch("https://fast-coast-04774.herokuapp.com/profiles/email/"+n.profileObj.email);case 5:return r=t.sent,t.next=8,r.json();case 8:i=t.sent,s=i,console.log("Profile Exists!"),t.next=17;break;case 13:t.prev=13,t.t0=t.catch(2),console.log(t.t0),c=!0;case 17:if(!c){t.next=34;break}return console.log("Creating new Profile..."),t.prev=19,o={user_email:n.profileObj.email,user_name:n.profileObj.name,img_url:n.profileObj.imageUrl},t.next=23,fetch("https://fast-coast-04774.herokuapp.com/profiles",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(o)});case 23:return a=t.sent,t.next=26,a.json();case 26:s=t.sent,console.log("Profile Created!"),t.next=34;break;case 30:return t.prev=30,t.t1=t.catch(19),console.log(t.t1),t.abrupt("return");case 34:e.setProfile(s),e.setIsAuth(!0),console.log("Login Successful");case 37:case"end":return t.stop()}}),t,null,[[2,13],[19,30]])})));return function(e){return t.apply(this,arguments)}}();return e.isAuth?Object(f.jsx)(j.a,{to:"/posts"}):Object(f.jsxs)("div",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)"},children:[Object(f.jsx)("h1",{children:"Welcome to the Social Network!"}),Object(f.jsx)("p",{children:Object(f.jsx)(h.a,{clientId:"399415598384-sgkom02f57l549gtnn877013fg004ke5.apps.googleusercontent.com",buttonText:"Login",onSuccess:t,onFailure:function(e){console.log("Login Failed"),console.log(e)},isSignedIn:!0,cookiePolicy:"single_host_origin"})})]})},x=n(166),O=n(167),g=n(165),v=n(169),k=n(85),S=n.n(k),w=n(84),y=n.n(w),C=n(83),_=n.n(C),I=n(168),P=n(185),T=n(160),A=n(163),L=Object(T.a)((function(e){return{cardHeader:{display:"flex",flexDirection:"row",alignItems:"center"},nameText:{paddingLeft:"10px"}}})),N=function(e){var t=L();return e.commentList.length>0?Object(f.jsx)("div",{children:e.commentList.map((function(e){return Object(f.jsxs)("div",{children:[Object(f.jsx)(A.a,{}),Object(f.jsxs)(g.a,{children:[Object(f.jsxs)("div",{className:t.cardHeader,children:[Object(f.jsx)(P.a,{src:e.user_img}),Object(f.jsx)("h4",{className:t.nameText,children:e.user_name})]}),Object(f.jsx)(A.a,{}),Object(f.jsx)("p",{children:e.content})]})]})}))}):null},D=Object(T.a)((function(e){return{cardHeader:{display:"flex",flexDirection:"row",alignItems:"center"},nameText:{paddingLeft:"10px"}}})),F=function(e){var t=Object(c.useState)([]),n=Object(a.a)(t,2),s=(n[0],n[1]);Object(c.useEffect)((function(){s(e.post)}),[]);var r=D(),i=function(){var t=Object(d.a)(b.a.mark((function t(){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.post.likes.includes(e.viewer_ID)?e.post.likes=e.post.likes.filter((function(t){return t!==e.viewer_ID})):e.post.likes.push(e.viewer_ID),t.next=3,fetch("https://fast-coast-04774.herokuapp.com/posts/"+e.post.post_id,{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e.post)});case 3:n=t.sent,s(n);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),o=-1===e.viewer_ID;return Object(f.jsxs)(x.a,{style:{margin:20},children:[Object(f.jsxs)(g.a,{children:[Object(f.jsxs)("div",{className:r.cardHeader,children:[Object(f.jsx)(P.a,{src:e.post.user_img}),Object(f.jsx)("h3",{className:r.nameText,children:e.post.user_name})]}),Object(f.jsx)(A.a,{}),Object(f.jsx)("p",{children:e.post.content})]}),Object(f.jsx)(A.a,{}),Object(f.jsx)(O.a,{children:Object(f.jsxs)(I.a,{container:!0,direction:"row",justify:"space-around",alignItems:"center",children:[Object(f.jsxs)(v.a,{size:"small",color:e.post.likes.includes(e.viewer_ID)?"primary":"default",disabled:o,startIcon:Object(f.jsx)(_.a,{}),onClick:function(){i()},children:["Like (",e.post.likes.length,")"]}),Object(f.jsx)(A.a,{orientation:"vertical",flexItem:!0}),Object(f.jsx)(v.a,{size:"small",disabled:o,startIcon:Object(f.jsx)(y.a,{}),onClick:function(){e.commentCallback()},children:"Comment"}),Object(f.jsx)(A.a,{orientation:"vertical",flexItem:!0}),Object(f.jsx)(v.a,{size:"small",startIcon:Object(f.jsx)(S.a,{}),onClick:function(){navigator.clipboard.writeText("https://cmoyates.github.io/Social-Network-Frontend/#/post/"+e.post.post_id)},children:"Share"})]})}),Object(f.jsx)(N,{commentList:e.post.comments.commentList})]})},E=n(181),J=n(184),H=n(173),z=n(171),B=n(170);var W=function(e){var t=Object(c.useState)(""),n=Object(a.a)(t,2),s=n[0],r=n[1];return Object(f.jsx)("div",{children:Object(f.jsxs)(J.a,{open:e.open,onClose:e.handleClose,"aria-labelledby":"form-dialog-title",children:[Object(f.jsx)(B.a,{id:"form-dialog-title",children:"Post"}),Object(f.jsx)(z.a,{children:Object(f.jsx)(E.a,{value:s,onChange:function(e){r(e.target.value)},autoFocus:!0,margin:"dense",id:"content",label:"Content",fullWidth:!0,multiline:!0})}),Object(f.jsxs)(H.a,{children:[Object(f.jsx)(v.a,{onClick:Object(d.a)(b.a.mark((function t(){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.handleSubmit({user_id:e.profile.profile_id,user_name:e.profile.user_name,user_img:e.profile.img_url,content:s});case 2:case"end":return t.stop()}}),t)}))),color:"primary",children:"Submit"}),Object(f.jsx)(v.a,{onClick:e.handleClose,color:"primary",children:"Cancel"})]})]})})};var G=function(e){var t=Object(c.useState)(""),n=Object(a.a)(t,2),s=n[0],r=n[1];return Object(f.jsx)("div",{children:Object(f.jsxs)(J.a,{open:e.open,onClose:e.handleClose,"aria-labelledby":"form-dialog-title",children:[Object(f.jsx)(B.a,{id:"form-dialog-title",children:"Comment"}),Object(f.jsx)(z.a,{children:Object(f.jsx)(E.a,{value:s,onChange:function(e){r(e.target.value)},autoFocus:!0,margin:"dense",id:"content",label:"Content",fullWidth:!0,multiline:!0})}),Object(f.jsxs)(H.a,{children:[Object(f.jsx)(v.a,{onClick:Object(d.a)(b.a.mark((function t(){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.handleSubmit({user_id:e.profile.profile_id,user_name:e.profile.user_name,user_img:e.profile.img_url,content:s});case 2:case"end":return t.stop()}}),t)}))),color:"primary",children:"Submit"}),Object(f.jsx)(v.a,{onClick:e.handleClose,color:"primary",children:"Cancel"})]})]})})},U=n(179),R=n(177),$=n(178),q=n(124),M=n(175),K=n(180),Q=n(172),V=n(90),X=n(174),Y=n(187),Z=n(186),ee=n(87),te=n(176),ne=(n(182),Object(T.a)((function(){return{root:{"&$disabled $notchedOutline":{boarderColor:"yellow !important"}},disabled:{},notchedOutline:{}}})),function(e){return Object(f.jsx)(V.a,{variant:"outlined",square:!0,onClick:function(){e.submit(e.color)},style:{backgroundColor:e.color,width:37.5,height:32}})}),ce=["#f44336","#e91e63","#9c27b0","#673ab7","#3f51b5","#2196f3","#03a9f4","#00bcd4","#009688","#4caf50","#8bc34a","#cddc39","#ffeb3b","#ffc107","#ff9800","#ff5722"],se=function(e){return Object(f.jsx)("div",{children:Object(f.jsxs)(J.a,{open:e.open,onClose:e.handleClose,"aria-labelledby":"form-dialog-title",children:[Object(f.jsx)(B.a,{id:"form-dialog-title",children:"Pick a Color"}),Object(f.jsx)(z.a,{style:{width:150},children:Object(f.jsxs)(I.a,{container:!0,spacing:0,children:[Object(f.jsxs)(I.a,{container:!0,item:!0,xs:12,spacing:0,children:[Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[0],submit:e.handleSubmit})}),Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[1],submit:e.handleSubmit})}),Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[2],submit:e.handleSubmit})}),Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[3],submit:e.handleSubmit})})]}),Object(f.jsxs)(I.a,{container:!0,item:!0,xs:12,spacing:0,children:[Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[4],submit:e.handleSubmit})}),Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[5],submit:e.handleSubmit})}),Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[6],submit:e.handleSubmit})}),Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[7],submit:e.handleSubmit})})]}),Object(f.jsxs)(I.a,{container:!0,item:!0,xs:12,spacing:0,children:[Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[8],submit:e.handleSubmit})}),Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[9],submit:e.handleSubmit})}),Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[10],submit:e.handleSubmit})}),Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[11],submit:e.handleSubmit})})]}),Object(f.jsxs)(I.a,{container:!0,item:!0,xs:12,spacing:0,children:[Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[12],submit:e.handleSubmit})}),Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[13],submit:e.handleSubmit})}),Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[14],submit:e.handleSubmit})}),Object(f.jsx)(I.a,{item:!0,xs:3,children:Object(f.jsx)(ne,{color:ce[15],submit:e.handleSubmit})})]})]})}),Object(f.jsx)(H.a,{})]})})},re=Object(T.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}})),ie=function(e){var t=Object(c.useState)([]),n=Object(a.a)(t,2),s=n[0],r=n[1],i=Object(c.useState)([]),l=Object(a.a)(i,2),j=(l[0],l[1]),u=Object(c.useState)(null),h=Object(a.a)(u,2),m=h[0],x=h[1],O=Object(c.useState)("#3f50b5"),g=Object(a.a)(O,2),k=g[0],S=g[1],w=Object(c.useState)(!1),y=Object(a.a)(w,2),C=y[0],_=y[1],I=Object(c.useState)(!1),T=Object(a.a)(I,2),A=T[0],L=T[1],N=Object(c.useState)(!1),D=Object(a.a)(N,2),E=D[0],J=D[1],H=Object(c.useState)(!1),z=Object(a.a)(H,2),B=z[0],ne=z[1],ce=Object(c.useRef)(null),ie=function(){var e=Object(d.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return _(!1),e.next=3,fetch("https://fast-coast-04774.herokuapp.com/posts",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});case 3:return e.sent,e.next=6,le();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),oe=function(){var e=Object(d.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:L(!1),S(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ae=function(){var e=Object(d.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return J(!1),m.comments.commentList.push(t),e.next=4,fetch("https://fast-coast-04774.herokuapp.com/posts/"+m.post_id,{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(m)});case 4:e.sent;case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),le=function(){var e=Object(d.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://fast-coast-04774.herokuapp.com/posts");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,r(n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),je=function(){var e=Object(d.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://fast-coast-04774.herokuapp.com/profiles");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,j(n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){e.isAuth&&(document.title="Social Network",le(),je(),S(e.profile.primary_color))}),[e.isAuth,e.profile.primary_color]);var ue=re(),be=function(e){ce.current&&ce.current.contains(e.target)||ne(!1)},de=function(){console.log("Logout Successful"),e.setProfile([]),e.setIsAuth(!1)},pe=Object(ee.a)({palette:{primary:{light:"#757ce8",main:k,dark:"#002884",contrastText:"#fff"},secondary:{light:"#ff7961",main:"#f44336",dark:"#ba000d",contrastText:"#000"}}});return Object(f.jsxs)(te.a,{theme:pe,children:[Object(f.jsx)(R.a,{position:"static",children:Object(f.jsxs)($.a,{children:[Object(f.jsx)(q.a,{variant:"h5",children:"Social Network"}),Object(f.jsx)("div",{className:ue.title}),Object(f.jsx)(q.a,{children:e.profile.user_name}),Object(f.jsx)(M.a,{className:ue.menuButton,color:"inherit","aria-label":"menu",onClick:function(){ne(!B)},ref:ce,"aria-controls":B?"menu-list-grow":void 0,"aria-haspopup":"true",children:Object(f.jsx)(P.a,{src:e.profile.img_url})})]})}),Object(f.jsx)("br",{}),Object(f.jsx)(v.a,{variant:"contained",color:"primary",size:"medium",onClick:function(){_(!0)},children:Object(f.jsx)("b",{children:"Post"})}),Object(f.jsx)(U.a,{maxWidth:"sm",children:s.map((function(t){return Object(f.jsx)(F,{post:t,viewer_ID:e.profile.profile_id,commentCallback:function(){x(t),J(!0)}},t.post_id)}))}),Object(f.jsx)(W,{open:C,handleClose:function(){_(!1)},handleSubmit:ie,profile:e.profile}),Object(f.jsx)(G,{open:E,handleClose:function(){J(!1)},handleSubmit:ae,profile:e.profile,post:m}),Object(f.jsx)(se,{open:A,handleClose:function(){L(!1)},handleSubmit:oe}),Object(f.jsx)(X.a,{open:B,anchorEl:ce.current,role:void 0,transition:!0,disablePortal:!0,children:function(e){var t=e.TransitionProps,n=e.placement;return Object(f.jsx)(Q.a,Object(o.a)(Object(o.a)({},t),{},{style:{transformOrigin:"bottom"===n?"center top":"center bottom"},children:Object(f.jsx)(V.a,{children:Object(f.jsx)(K.a,{onClickAway:be,children:Object(f.jsxs)(Z.a,{autoFocusItem:B,id:"menu-list-grow",children:[Object(f.jsx)(p.GoogleLogout,{clientId:"399415598384-sgkom02f57l549gtnn877013fg004ke5.apps.googleusercontent.com",render:function(e){return Object(f.jsx)(Y.a,{onClick:e.onClick,disabled:e.disabled,children:"Logout"})},buttonText:"Logout",onLogoutSuccess:de}),Object(f.jsx)(Y.a,{onClick:function(){ne(!1),L(!0)},children:"Select Accent Color"})]})})})}))}})]})},oe=function(){return Object(f.jsx)("div",{children:Object(f.jsx)("h1",{children:"404: Page not found"})})},ae=n(88),le=["component","isAuth"],je=function(e){var t=e.component,n=e.isAuth,c=Object(ae.a)(e,le);return Object(f.jsx)(j.b,Object(o.a)(Object(o.a)({},c),{},{render:function(e){return n?Object(f.jsx)(t,Object(o.a)({},e)):Object(f.jsx)(j.a,{to:{pathname:"/",state:{from:e.location}}})}}))},ue=function(){var e=Object(j.g)().id,t=Object(c.useState)(null),n=Object(a.a)(t,2),s=n[0],r=n[1],i=function(){var t=Object(d.a)(b.a.mark((function t(){var n,c;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://fast-coast-04774.herokuapp.com/posts/"+e);case 2:return n=t.sent,t.next=5,n.json();case 5:c=t.sent,document.title="Social Network",console.log(c),r(c);case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(c.useEffect)((function(){i()}),[]),s?Object(f.jsx)("div",{children:Object(f.jsx)(I.a,{container:!0,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"100vh"},children:Object(f.jsx)(I.a,{item:!0,children:Object(f.jsx)(F,{post:s,viewer_ID:-1},s.post_id)})})}):null};var be=function(){var e=Object(c.useState)([]),t=Object(a.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)(!1),i=Object(a.a)(r,2),u=i[0],b=i[1];return Object(f.jsx)(l.a,{children:Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)(j.d,{children:[Object(f.jsx)(j.b,{exact:!0,path:"/",component:function(){return Object(f.jsx)(m,{setProfile:s,setIsAuth:b,isAuth:u})}}),Object(f.jsx)(je,{path:"/posts",isAuth:u,component:function(e){return Object(f.jsx)(ie,Object(o.a)(Object(o.a)({},e),{},{profile:n,setProfile:s,isAuth:u,setIsAuth:b}))}}),Object(f.jsx)(j.b,{exact:!0,path:"/404",component:oe}),Object(f.jsx)(j.b,{path:"/post/:id",component:ue}),Object(f.jsx)(j.a,{to:"/404"})]})})})},de=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,188)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),s(e),r(e),i(e)}))};i.a.render(Object(f.jsx)(s.a.StrictMode,{children:Object(f.jsx)(be,{})}),document.getElementById("root")),de()}},[[122,1,2]]]);
//# sourceMappingURL=main.53cbe079.chunk.js.map