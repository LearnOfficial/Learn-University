"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[666],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},h="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),h=c(n),d=a,f=h["".concat(s,".").concat(d)]||h[d]||p[d]||o;return n?r.createElement(f,i(i({ref:t},l),{},{components:n})):r.createElement(f,i({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var u={};for(var s in t)hasOwnProperty.call(t,s)&&(u[s]=t[s]);u.originalType=e,u[h]="string"==typeof e?e:a,i[1]=u;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},640:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>u,toc:()=>c});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_position:2},i="Authentication and Authorization",u={unversionedId:"server/dev/auth",id:"server/dev/auth",title:"Authentication and Authorization",description:"Authentication and authorization are",source:"@site/docs/server/dev/auth.md",sourceDirName:"server/dev",slug:"/server/dev/auth",permalink:"/Learn/docs/server/dev/auth",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/Learn/docs/server/dev/intro"},next:{title:"Entities",permalink:"/Learn/docs/server/dev/entities"}},s={},c=[{value:"Authentication",id:"authentication",level:2},{value:"Authorization",id:"authorization",level:2}],l={toc:c},h="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(h,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"authentication-and-authorization"},"Authentication and Authorization"),(0,a.kt)("p",null,"Authentication and authorization are\ncritical aspects of Learn Server because\neach user has unique permissions that\ndictate what data they can access and\nwhat actions they can perform on behalf\nof themselves or others."),(0,a.kt)("h2",{id:"authentication"},"Authentication"),(0,a.kt)("p",null,"To create the authorization key, we use\nthe ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/auth0/node-jsonwebtoken"},"jsonwebtoken"),"\nlibrary to sign a payload\nthat includes sensitive information about\nthe user. This key is generated without\nthe need for additional user credentials\nand is used to authenticate the user for\nsubsequent requests,while also encrypting\nany sensitive data that is transmitted over\nthe network."),(0,a.kt)("p",null,"If you'd like to experiment with JSON Web\nTokens, you can try out the following\n",(0,a.kt)("a",{parentName:"p",href:"https://jwt.io/"},"jwt"),"."),(0,a.kt)("p",null,"This site allows you to\nplay around with the structure and contents\nof JWTs, and can be a helpful tool for\nunderstanding how they work."),(0,a.kt)("p",null,"Currently, the signup resolver at ",(0,a.kt)("inlineCode",{parentName:"p"},"LearnerResolver.ts"),"\ngenerates the authentication token, while the actual\nauthentication check is performed in the\n",(0,a.kt)("inlineCode",{parentName:"p"},"auth_checker.ts")," file."),(0,a.kt)("h2",{id:"authorization"},"Authorization"),(0,a.kt)("p",null,"After the token is created, it can be used\nto perform queries and mutations according\nto the permissions of the user. However, this\nfunctionality is not yet implemented."),(0,a.kt)("p",null,"[Future]",": Implemented auth with ",(0,a.kt)("a",{parentName:"p",href:"https://auth0.com/"},"auth0"),"."))}p.isMDXComponent=!0}}]);