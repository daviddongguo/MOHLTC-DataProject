(this["webpackJsonpdata-project"]=this["webpackJsonpdata-project"]||[]).push([[18],{152:function(e,a,t){"use strict";t.d(a,"a",(function(){return u})),t.d(a,"b",(function(){return p})),t.d(a,"c",(function(){return l})),t.d(a,"e",(function(){return m}));var n=t(125),r=t.n(n),o=t(154),c=t(168),i=t.n(c),s=t(167);t.d(a,"d",(function(){return s.a}));var u={withCredentials:!0};function p(e){return e.response&&e.response.data&&e.response.data.message?[e.toString()+"\nDetails: "+e.response.data.message,"error"]:[e.stack,"error"]}function l(e){return!e.data.loginRequired||(window.location.hash="login",!1)}function m(){return d.apply(this,arguments)}function d(){return(d=Object(o.a)(r.a.mark((function e(){var a,t,n=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.length>0&&void 0!==n[0]?n[0]:1,e.prev=1,e.next=4,i.a.get(s.a.server+"/api/v2/generate/id/"+a,u);case 4:if(!l(t=e.sent)){e.next=7;break}return e.abrupt("return",t.data.ids);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})))).apply(this,arguments)}},167:function(e,a,t){"use strict";a.a={server:"https://aqueous-dusk-20175.herokuapp.com"}},333:function(e,a,t){"use strict";t.d(a,"j",(function(){return u})),t.d(a,"n",(function(){return p})),t.d(a,"b",(function(){return l})),t.d(a,"a",(function(){return d})),t.d(a,"c",(function(){return h})),t.d(a,"d",(function(){return g})),t.d(a,"f",(function(){return v})),t.d(a,"p",(function(){return x})),t.d(a,"q",(function(){return j})),t.d(a,"i",(function(){return E})),t.d(a,"l",(function(){return C})),t.d(a,"k",(function(){return P})),t.d(a,"o",(function(){return R})),t.d(a,"m",(function(){return I})),t.d(a,"r",(function(){return W})),t.d(a,"e",(function(){return D})),t.d(a,"g",(function(){return V})),t.d(a,"h",(function(){return L}));var n=t(125),r=t.n(n),o=t(154),c=t(168),i=t.n(c),s=t(152),u=null;function p(e){u=e}function l(e){return m.apply(this,arguments)}function m(){return(m=Object(o.a)(r.a.mark((function e(a){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.d.server+"/api/check/username/"+a,e.next=3,i.a.get(t,s.a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(e){return f.apply(this,arguments)}function f(){return(f=Object(o.a)(r.a.mark((function e(a){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.d.server+"/api/check/email/"+a,e.next=3,i.a.get(t,s.a);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function h(){return b.apply(this,arguments)}function b(){return(b=Object(o.a)(r.a.mark((function e(){var a,t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=s.d.server+"/api/v2/groups",e.next=3,i.a.get(a);case 3:return t=e.sent,e.abrupt("return",t.data.groups);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(e){return k.apply(this,arguments)}function k(){return(k=Object(o.a)(r.a.mark((function e(a){var t,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=s.d.server+"/api/v2/organizations",a&&(t+="?groupNumber="+a),e.prev=2,e.next=5,i.a.get(t);case 5:return n=e.sent,e.abrupt("return",n.data.organizations);case 9:throw e.prev=9,e.t0=e.catch(2),e.t0;case 12:case"end":return e.stop()}}),e,null,[[2,9]])})))).apply(this,arguments)}function v(){return y.apply(this,arguments)}function y(){return(y=Object(o.a)(r.a.mark((function e(){var a,t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],e.prev=1,e.next=4,V();case 4:t=e.sent,a=t.filter((function(e){return!1===e.validated})),e.next=11;break;case 8:throw e.prev=8,e.t0=e.catch(1),e.t0;case 11:return e.abrupt("return",a);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))).apply(this,arguments)}function x(e,a){return w.apply(this,arguments)}function w(){return(w=Object(o.a)(r.a.mark((function e(a,t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.a.put(s.d.server+"/api/users/active/"+a,{active:t},s.a);case 3:return e.abrupt("return",e.sent);case 6:return e.prev=6,e.t0=e.catch(0),e.abrupt("return",e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}function j(e,a){return O.apply(this,arguments)}function O(){return(O=Object(o.a)(r.a.mark((function e(a,t){var n,o,c,u;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=[],o=s.d.server+"/api/users/validated/"+a.username,console.log(o),e.next=6,i.a.put(o,{validated:t},s.a);case 6:if(c=e.sent,n.push(c),!a.organization){e.next=14;break}return e.next=11,i.a.post(s.d.server+"/api/v2/organization/"+a.organization+"/"+a._id,{validated:t},s.a);case 11:return u=e.sent,n.push(u),e.abrupt("return",n);case 14:e.next=19;break;case 16:return e.prev=16,e.t0=e.catch(0),e.abrupt("return",e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})))).apply(this,arguments)}function E(){return z.apply(this,arguments)}function z(){return(z=Object(o.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get(s.d.server+"/api/isloggedin",s.a);case 2:return e.abrupt("return",e.sent.data.isLoggedIn);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(){return N.apply(this,arguments)}function N(){return(N=Object(o.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get(s.d.server+"/api/logout",s.a);case 2:window.location.hash="login";case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(e,a){return S.apply(this,arguments)}function S(){return(S=Object(o.a)(r.a.mark((function e(a,t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.post(s.d.server+"/api/login/local",{username:a,password:t},s.a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function R(e,a,t,n,r,o,c,i,s){return q.apply(this,arguments)}function q(){return(q=Object(o.a)(r.a.mark((function e(a,t,n,o,c,u,p,l,m){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.post(s.d.server+(a?"/api/setup":"/api/signup/local"),{username:t,password:n,firstName:o,lastName:c,email:p,phoneNumber:l,groupNumber:m,organization:u},s.a);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function I(e){return A.apply(this,arguments)}function A(){return(A=Object(o.a)(r.a.mark((function e(a){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function W(e,a,t){return M.apply(this,arguments)}function M(){return(M=Object(o.a)(r.a.mark((function e(a,t,n){var o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.post(s.d.server+"/api/user/permission",{permissions:[{username:a,permissions:t,active:n}]},s.a);case 2:if(o=e.sent,!Object(s.c)(o)){e.next=5;break}return e.abrupt("return",o);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(){return G.apply(this,arguments)}function G(){return(G=Object(o.a)(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get(s.d.server+"/api/permissions",s.a);case 2:if(a=e.sent,!Object(s.c)(a)){e.next=5;break}return e.abrupt("return",a.data.permissions);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(){return T.apply(this,arguments)}function T(){return(T=Object(o.a)(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get(s.d.server+"/api/user/details",s.a);case 2:if(a=e.sent,!Object(s.c)(a)){e.next=5;break}return e.abrupt("return",a.data.users);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function L(){return U.apply(this,arguments)}function U(){return(U=Object(o.a)(r.a.mark((function e(){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.a.get(s.d.server+"/api/profile",s.a);case 3:if(a=e.sent,!Object(s.c)(a)){e.next=6;break}return e.abrupt("return",a.data.profile);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}},7316:function(e,a,t){"use strict";t.r(a);var n=t(49),r=t(50),o=t(53),c=t(52),i=t(0),s=t.n(i),u=t(3),p=t(6712),l=t(6672),m={items:[{title:!0,name:"User"},{name:"My Profile",url:"/profile",icon:"mdi mdi-account-card-details-outline"},{name:"My Packages",url:"/packages",icon:"mdi mdi-pen"},{title:!0,name:"Admin"},{name:"Template",icon:"mdi mdi-note-multiple",children:[{name:"All Templates",url:"/workbooks/template",icon:"mdi mdi-table-large"},{name:"Create Template",url:"/workbooks/create",icon:"mdi mdi-table-large-plus"}]},{name:"Att & Cat",icon:"mdi mdi-buffer",children:[{name:"Attributes",url:"/workbooks/attributes",icon:"mdi mdi-table-column"},{name:"Categories",url:"/workbooks/categories",icon:"mdi mdi-table-row"},{name:"Attribute Group",url:"/attribute/group",icon:"mdi mdi-checkbook"},{name:"Category Group",url:"/category/group",icon:"mdi mdi-checkbook"},{name:"Import ID",url:"/import/id",icon:"mdi mdi-application-import"}]},{name:"Users",icon:"mdi mdi-account",children:[{name:"All Users",url:"/users",icon:"mdi mdi-account-multiple"},{name:"Registration Requests",url:"/registrationRequest",icon:"mdi mdi-account"},{name:"Organizations",url:"/admin/organizations",icon:"mdi mdi-account-group"},{name:"Org Types",url:"/admin/orgtypes",icon:"mdi mdi-account-network"}]},{name:"Package",icon:"mdi mdi-package-variant",children:[{name:"All Packages",url:"/admin/packages",icon:"mdi mdi-package"},{name:"Create Package",url:"/admin/packages/create",icon:"mdi mdi-shape-square-plus"}]},{name:"System",icon:"mdi mdi-settings",children:[{name:"Group Name",url:"/admin/group",icon:"mdi mdi-rename-box"},{name:"Server Info",url:"/system",icon:"mdi mdi-information"},{name:"Last Auto-test Report",url:t(167).a.server+"/test/mochawesome.html",icon:"mdi mdi-alert-octagon",variant:"success",attributes:{target:"_blank"}}]}]},d=s.a.lazy((function(){return t.e(25).then(t.bind(null,7318))})),f=s.a.lazy((function(){return t.e(27).then(t.bind(null,7308))})),h=s.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(40),t.e(30)]).then(t.bind(null,7309))})),b=s.a.lazy((function(){return Promise.all([t.e(0),t.e(3),t.e(5),t.e(7),t.e(31)]).then(t.bind(null,7322))})),g=s.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(15)]).then(t.bind(null,7317))})),k=s.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(16)]).then(t.bind(null,7314))})),v=s.a.lazy((function(){return Promise.all([t.e(6),t.e(0),t.e(1),t.e(2),t.e(19)]).then(t.bind(null,7315))})),y=s.a.lazy((function(){return Promise.all([t.e(7),t.e(39),t.e(29)]).then(t.bind(null,7323))})),x=s.a.lazy((function(){return Promise.all([t.e(6),t.e(33),t.e(21)]).then(t.bind(null,7310))})),w=s.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(17)]).then(t.bind(null,7311))})),j=s.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(3),t.e(5),t.e(14)]).then(t.bind(null,7324))})),O=s.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(5),t.e(13)]).then(t.bind(null,7312))})),E=[{path:"/",exact:!0,name:"Home",component:me},{path:"/profile",exact:!0,name:"My Profile",component:d},{path:"/registrationRequest",exact:!0,name:"Registration Request",component:f},{path:"/users",exact:!0,name:"Users",component:h},{path:"/workbooks/fill",exact:!0,name:"Workbooks",component:b,params:{mode:"user"}},{path:"/workbooks/fill/:name",exact:!0,name:"Fill Workbook",component:v,params:{mode:"user edit"}},{path:"/workbooks/template",exact:!0,name:"Workbooks",component:b,params:{mode:"admin"}},{path:"/workbooks/template/:name/",exact:!0,name:"Edit Workbook",component:v,params:{mode:"admin edit"}},{path:"/workbooks/create",exact:!0,name:"Create Workbook",component:v,params:{mode:"admin create"}},{path:"/admin/packages/:packageName/:organizationName/:workbookName",exact:!0,name:"View Workbook",component:v,params:{mode:"admin view"}},{path:"/workbooks/attributes",exact:!0,name:"Attributes",component:g,params:{mode:"att"}},{path:"/workbooks/categories",exact:!0,name:"Categories",component:g,params:{mode:"cat"}},{path:"/attribute/group",exact:!0,name:"Attribute Group",component:k,params:{mode:"att"}},{path:"/category/group",exact:!0,name:"Category Group",component:k,params:{mode:"cat"}},{path:"/system",exact:!0,name:"System Info",component:y},{path:"/import/id",exact:!0,name:"Import ID",component:x},{path:"/admin/packages/create",exact:!0,name:"Create Package",component:w},{path:"/admin/packages",exact:!0,name:"All Packages",component:j,params:{mode:"admin"}},{path:"/packages",exact:!0,name:"My Packages",component:j,params:{mode:"user"}},{path:"/admin/packages/:name/:organization",exact:!0,name:"View Package",component:O,params:{mode:"admin"}},{path:"/packages/:name",exact:!0,name:"View Package",component:O,params:{mode:"user"}},{path:"/packages/:packageName/:name",exact:!0,name:"View Workbook",component:v,params:{mode:"user"}},{path:"/admin/group",exact:!0,name:"Set Group Name",component:s.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(38),t.e(10)]).then(t.bind(null,7313))}))},{path:"/admin/organizations",exact:!0,name:"Organizations",component:s.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(12)]).then(t.bind(null,7325))}))},{path:"/admin/orgtypes",exact:!0,name:"Organizations types",component:s.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(11)]).then(t.bind(null,7326))}))}],z=t(333),C=t(592),N=t(112),P=t.n(N),S=t(6706),R=t.n(S),q=t(6708),I=t.n(q),A=t(6709),W=t.n(A),M=t(6711),D=t.n(M),G=t(6476),V=t.n(G),T=t(6710),L=t.n(T),U=t(379),H=t(7288),Q=t(6707),B=t.n(Q),J=t(22),_={success:R.a,warning:B.a,error:I.a,info:W.a};var F,K=Object(J.a)((function(e){return{success:{backgroundColor:V.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.dark},warning:{backgroundColor:L.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing()},message:{display:"flex",alignItems:"center",whiteSpace:"pre-line"}}}))((function(e){var a=e.classes,t=e.className,n=e.message,r=e.onClose,o=e.variant,c=Object(C.a)(e,["classes","className","message","onClose","variant"]),i=_[o];return s.a.createElement(H.a,Object.assign({className:P()(a[o],t),"aria-describedby":"client-snackbar",message:s.a.createElement("span",{id:"client-snackbar",className:a.message},s.a.createElement(i,{className:P()(a.icon,a.iconVariant)}),n),action:[s.a.createElement(U.a,{key:"close","aria-label":"Close",color:"inherit",className:a.close,onClick:r},s.a.createElement(D.a,{className:a.icon}))]},c))})),X=t(7290),Y=t(23),Z=t(392),$=t(7319),ee=t(351),ae=t(7289),te=Object(J.a)((function(e){return{root:{backgroundColor:e.palette.grey[100],height:24,color:e.palette.grey[600],fontWeight:e.typography.fontWeightRegular,"&:hover, &:focus":{backgroundColor:e.palette.grey[300],cursor:"pointer"},"&:active":{boxShadow:e.shadows[1],backgroundColor:Object(Y.c)(e.palette.grey[300],.12)}}}}))(Z.a),ne=Object(J.a)((function(){return{separator:{margin:0}}}))($.a),re=Object(J.a)((function(e){return{root:{padding:e.spacing(1),marginBottom:12,borderRadius:0}}}))(ee.a),oe=function(e,a){var t=function(e){var a=F.find((function(a){return Object(u.f)(e,{path:a.path,exact:a.exact})}));return a&&a.name?a.name:null}(e);return t?a?s.a.createElement(te,{key:e,label:t,style:{cursor:"initial",color:"#111"}}):s.a.createElement(te,{key:e,component:"a",href:"#"+e||!1,label:t}):null},ce=function(e){var a=function(e){var a=["/"];return"/"===e||e.split("/").reduce((function(e,t){var n="".concat(e,"/").concat(t);return a.push(n),n})),a}(e.location.pathname),t=a.map((function(e,t){return oe(e,t===a.length-1)}));return t=t.filter((function(e){return e})),s.a.createElement(re,null,s.a.createElement(ne,{separator:s.a.createElement(ae.a,{fontSize:"small"}),"aria-label":"Breadcrumb"},t))},ie=function(e){Object(o.a)(t,e);var a=Object(c.a)(t);function t(e){var r;return Object(n.a)(this,t),(r=a.call(this,e)).state={routes:e.appRoutes},F=r.state.routes,r}return Object(r.a)(t,[{key:"render",value:function(){var e=this.props,a=e.className,t=e.tag,n=Object(C.a)(e,["className","tag"]);delete n.children,delete n.appRoutes;var r=P()(a);return s.a.createElement(t,{className:r},s.a.createElement(u.b,Object.assign({path:"/:path",component:ce},n)))}}]),t}(i.Component);ie.defaultProps={tag:"div",className:"",appRoutes:[{path:"/",exact:!0,name:"Home",component:null}]};var se=ie,ue=t(57),pe=s.a.lazy((function(){return Promise.all([t.e(36),t.e(41)]).then(t.bind(null,7306))})),le=function(e){Object(o.a)(t,e);var a=Object(c.a)(t);function t(e){var r;return Object(n.a)(this,t),(r=a.call(this,e)).loading=function(){return s.a.createElement(ue.a,null)},r.showMessage=function(e,a){r.queue.push({message:e,variant:a,key:(new Date).getTime()}),r.state.openSnackbar?r.setState({openSnackbar:!1}):r.processQueue()},r.processQueue=function(){r.queue.length>0&&r.setState({messageInfo:r.queue.shift(),openSnackbar:!0})},r.handleCloseSnackbar=function(e,a){"clickaway"!==a&&r.setState({openSnackbar:!1})},r.handleExitedSnackbar=function(){r.processQueue()},Object(z.i)().then((function(a){a||(Object(z.n)(window.location.hash.replace("#","")),e.history.push("/login"))})).catch((function(e){return r.showMessage(e.message+": Cannot reach backend server","error")})),r.queue=[],r.state={openSnackbar:!1,messageInfo:{}},r}return Object(r.a)(t,[{key:"componentDidMount",value:function(){z.j&&(this.props.history.push(z.j),Object(z.n)(null))}},{key:"render",value:function(){var e=this,a=this.props.classes;return this.state.hasError,s.a.createElement("div",{className:"app"},s.a.createElement(l.a,{fixed:!0},s.a.createElement(i.Suspense,{fallback:this.loading()},s.a.createElement(pe,{onLogout:function(){return Object(z.l)()}}))),s.a.createElement("div",{className:"app-body"},s.a.createElement(l.d,{fixed:!0,display:"lg"},s.a.createElement(l.g,null),s.a.createElement(l.f,null),s.a.createElement(i.Suspense,null,s.a.createElement(l.i,Object.assign({navConfig:m},this.props))),s.a.createElement(l.e,null),s.a.createElement(l.h,null)),s.a.createElement("div",{className:a.main+" main"},s.a.createElement(se,{appRoutes:E}),s.a.createElement(p.a,{maxWidth:"xl",className:a.container},s.a.createElement(i.Suspense,{fallback:this.loading()},s.a.createElement(u.d,null,E.map((function(a,t){return a.component?s.a.createElement(u.b,{key:t,path:a.path,exact:a.exact,name:a.name,render:function(t){return s.a.createElement(a.component,Object.assign({showMessage:e.showMessage,params:a.params?a.params:{}},t))}}):null})),s.a.createElement(u.a,{from:"/",to:"/profile"})))))),s.a.createElement(X.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:this.state.openSnackbar,autoHideDuration:6e3,onClose:this.handleCloseSnackbar,onExited:this.handleExitedSnackbar},s.a.createElement(K,{onClose:this.handleCloseSnackbar,variant:this.state.messageInfo.variant,message:this.state.messageInfo.message})))}}]),t}(i.Component),me=a.default=Object(J.a)({container:{paddingLeft:12,paddingRight:12},main:{backgroundColor:"#f3f4fd"}})(le)}}]);
//# sourceMappingURL=defaultLayout.c9881cfd.chunk.js.map