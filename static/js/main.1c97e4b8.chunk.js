(this["webpackJsonpdata-project"]=this["webpackJsonpdata-project"]||[]).push([[23],{57:function(e,n,t){"use strict";t.d(n,"a",(function(){return u}));var a=t(0),o=t.n(a),r=t(71),c=t(89),i=t(74),l=t(72),s=Object(r.a)((function(e){return{progress:{margin:e.spacing(2),marginTop:e.spacing(4)}}}));function u(e){var n=s();return o.a.createElement(c.a,{in:!0},o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(i.a,{className:n.progress}),o.a.createElement(l.a,{variant:"subtitle2",color:"textSecondary"},e.message?e.message:"Loading Components...")))}},76:function(e,n,t){e.exports=t(87)},81:function(e,n,t){},85:function(e,n,t){},87:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(14),c=t.n(r),i=(t(81),t(49)),l=t(50),s=t(53),u=t(52),m=t(56),p=t(3),d=t(57),g=(t(85),t(54)),f=t(108),h=t(35),b=Object(g.a)({palette:{primary:h.a}}),v=o.a.lazy((function(){return Promise.all([t.e(4),t.e(35),t.e(18)]).then(t.bind(null,7316))})),w=o.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(4),t.e(22)]).then(t.bind(null,7292))})),E=o.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(4),t.e(26)]).then(t.bind(null,7301))})),y=o.a.lazy((function(){return Promise.all([t.e(4),t.e(37),t.e(20)]).then(t.bind(null,7302))})),j=o.a.lazy((function(){return t.e(8).then(t.bind(null,7304))})),P=o.a.lazy((function(){return t.e(9).then(t.bind(null,7305))})),k=function(e){Object(s.a)(t,e);var n=Object(u.a)(t);function t(){return Object(i.a)(this,t),n.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement(f.a,{theme:b},o.a.createElement(a.Suspense,{fallback:o.a.createElement(d.a,null)},o.a.createElement(m.a,null,o.a.createElement(p.d,null,o.a.createElement(p.b,{exact:!0,path:"/login",name:"Login Page",component:w}),o.a.createElement(p.b,{exact:!0,path:"/register",name:"Register Page",render:function(e){return o.a.createElement(E,Object.assign({params:{mode:"reg"}},e))}}),o.a.createElement(p.b,{exact:!0,path:"/setup",name:"Setup Page",render:function(e){return o.a.createElement(E,Object.assign({params:{mode:"setup"}},e))}}),o.a.createElement(p.b,{exact:!0,path:"/forgetpassword",name:"Reset Password Page",component:y}),o.a.createElement(p.b,{exact:!0,path:"/404",name:"Page 404",component:j}),o.a.createElement(p.b,{exact:!0,path:"/500",name:"Page 500",component:P}),o.a.createElement(p.b,{path:"/",name:"Home",component:v})))))}}]),t}(a.Component),O=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function x(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available; please refresh."),n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n.onSuccess&&n.onSuccess(e)))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(o.a.createElement(k,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/MOHLTC-DataProject",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/MOHLTC-DataProject","/service-worker.js");O?(!function(e,n){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):x(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):x(n,e)}))}}()}},[[76,28,34]]]);
//# sourceMappingURL=main.1c97e4b8.chunk.js.map