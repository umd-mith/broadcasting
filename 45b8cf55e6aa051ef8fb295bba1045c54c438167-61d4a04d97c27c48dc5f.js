(self.webpackChunkbroadcasting_a_v_data=self.webpackChunkbroadcasting_a_v_data||[]).push([[886],{2993:function(e){var t="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function a(e,i){if(e===i)return!0;if(e&&i&&"object"==typeof e&&"object"==typeof i){if(e.constructor!==i.constructor)return!1;var c,u,s,l;if(Array.isArray(e)){if((c=e.length)!=i.length)return!1;for(u=c;0!=u--;)if(!a(e[u],i[u]))return!1;return!0}if(n&&e instanceof Map&&i instanceof Map){if(e.size!==i.size)return!1;for(l=e.entries();!(u=l.next()).done;)if(!i.has(u.value[0]))return!1;for(l=e.entries();!(u=l.next()).done;)if(!a(u.value[1],i.get(u.value[0])))return!1;return!0}if(r&&e instanceof Set&&i instanceof Set){if(e.size!==i.size)return!1;for(l=e.entries();!(u=l.next()).done;)if(!i.has(u.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(i)){if((c=e.length)!=i.length)return!1;for(u=c;0!=u--;)if(e[u]!==i[u])return!1;return!0}if(e.constructor===RegExp)return e.source===i.source&&e.flags===i.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===i.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===i.toString();if((c=(s=Object.keys(e)).length)!==Object.keys(i).length)return!1;for(u=c;0!=u--;)if(!Object.prototype.hasOwnProperty.call(i,s[u]))return!1;if(t&&e instanceof Element)return!1;for(u=c;0!=u--;)if(("_owner"!==s[u]&&"__v"!==s[u]&&"__o"!==s[u]||!e.$$typeof)&&!a(e[s[u]],i[s[u]]))return!1;return!0}return e!=e&&i!=i}e.exports=function(e,t){try{return a(e,t)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}},4839:function(e,t,n){"use strict";var r,o=n(7294),a=(r=o)&&"object"==typeof r&&"default"in r?r.default:r;function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,n){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var u,s=[];function l(){u=e(s.map((function(e){return e.props}))),f.canUseDOM?t(u):n&&(u=n(u))}var f=function(e){var t,n;function o(){return e.apply(this,arguments)||this}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,o.peek=function(){return u},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=u;return u=void 0,s=[],e};var i=o.prototype;return i.UNSAFE_componentWillMount=function(){s.push(this),l()},i.componentDidUpdate=function(){l()},i.componentWillUnmount=function(){var e=s.indexOf(this);s.splice(e,1),l()},i.render=function(){return a.createElement(r,this.props)},o}(o.PureComponent);return i(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")"),i(f,"canUseDOM",c),f}}},8576:function(e,t,n){"use strict";n.d(t,{Z:function(){return Ae}});var r,o,a,i,c=n(7294),u=n(1597),s=n(396),l=function(){var e=(0,u.K2)("3956795357"),t=(0,c.useState)(!0),n=t[0];t[1];return c.createElement("div",{className:"main-nav-container"},c.createElement("nav",{className:"main-nav"},c.createElement("ul",{id:"main-nav-menu",className:n?"menu":"menu menu-open"},c.createElement("li",null,c.createElement("a",{href:"https://unlockingtheairwaves.org/"},"< Back to Airwaves")),e.site.siteMetadata.siteNav.map((function(e){return c.createElement("li",{key:e.name},c.createElement(u.rU,{activeClassName:"active",to:e.link},e.name))})))))},f=function(){return c.createElement("header",null,c.createElement("div",{className:"header-content"},c.createElement("div",{className:"gradient"},c.createElement(u.rU,{"aria-label":"Broadcasting A/V data home page",to:"/"},c.createElement(s.S,{src:"../images/logo.png",alt:"Broadcasting A/V Data: Using linked data and archival records to enhance discoverability for broadcasting collections",width:1e3,__imageData:n(5909)}))),c.createElement(l,null)))},p=function(){return c.createElement("footer",null)},d=n(5697),m=n.n(d),y=n(4839),h=n.n(y),b=n(2993),g=n.n(b),v=n(6494),w=n.n(v),T="bodyAttributes",A="htmlAttributes",E="titleAttributes",C={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},S=(Object.keys(C).map((function(e){return C[e]})),"charset"),O="cssText",k="href",j="http-equiv",I="innerHTML",x="itemprop",P="name",L="property",M="rel",N="src",H="target",D={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},z="defaultTitle",B="defer",R="encodeSpecialCharacters",U="onChangeClientState",V="titleTemplate",q=Object.keys(D).reduce((function(e,t){return e[D[t]]=t,e}),{}),_=[C.NOSCRIPT,C.SCRIPT,C.STYLE],F="data-react-helmet",W="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},G=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},K=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),Y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Z=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},Q=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},J=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},X=function(e){var t=re(e,C.TITLE),n=re(e,V);if(n&&t)return n.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var r=re(e,z);return t||r||void 0},$=function(e){return re(e,U)||function(){}},ee=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return Y({},e,t)}),{})},te=function(e,t){return t.filter((function(e){return void 0!==e[C.BASE]})).map((function(e){return e[C.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var a=r[o].toLowerCase();if(-1!==e.indexOf(a)&&n[a])return t.concat(n)}return t}),[])},ne=function(e,t,n){var r={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&ue("Helmet: "+e+' should be of type "Array". Instead found type "'+W(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var o={};n.filter((function(e){for(var n=void 0,a=Object.keys(e),i=0;i<a.length;i++){var c=a[i],u=c.toLowerCase();-1===t.indexOf(u)||n===M&&"canonical"===e[n].toLowerCase()||u===M&&"stylesheet"===e[u].toLowerCase()||(n=u),-1===t.indexOf(c)||c!==I&&c!==O&&c!==x||(n=c)}if(!n||!e[n])return!1;var s=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][s]&&(o[n][s]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var a=Object.keys(o),i=0;i<a.length;i++){var c=a[i],u=w()({},r[c],o[c]);r[c]=u}return e}),[]).reverse()},re=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},oe=(r=Date.now(),function(e){var t=Date.now();t-r>16?(r=t,e(t)):setTimeout((function(){oe(e)}),0)}),ae=function(e){return clearTimeout(e)},ie="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||oe:n.g.requestAnimationFrame||oe,ce="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ae:n.g.cancelAnimationFrame||ae,ue=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},se=null,le=function(e,t){var n=e.baseTag,r=e.bodyAttributes,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,c=e.noscriptTags,u=e.onChangeClientState,s=e.scriptTags,l=e.styleTags,f=e.title,p=e.titleAttributes;de(C.BODY,r),de(C.HTML,o),pe(f,p);var d={baseTag:me(C.BASE,n),linkTags:me(C.LINK,a),metaTags:me(C.META,i),noscriptTags:me(C.NOSCRIPT,c),scriptTags:me(C.SCRIPT,s),styleTags:me(C.STYLE,l)},m={},y={};Object.keys(d).forEach((function(e){var t=d[e],n=t.newTags,r=t.oldTags;n.length&&(m[e]=n),r.length&&(y[e]=d[e].oldTags)})),t&&t(),u(e,m,y)},fe=function(e){return Array.isArray(e)?e.join(""):e},pe=function(e,t){void 0!==e&&document.title!==e&&(document.title=fe(e)),de(C.TITLE,t)},de=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(F),o=r?r.split(","):[],a=[].concat(o),i=Object.keys(t),c=0;c<i.length;c++){var u=i[c],s=t[u]||"";n.getAttribute(u)!==s&&n.setAttribute(u,s),-1===o.indexOf(u)&&o.push(u);var l=a.indexOf(u);-1!==l&&a.splice(l,1)}for(var f=a.length-1;f>=0;f--)n.removeAttribute(a[f]);o.length===a.length?n.removeAttribute(F):n.getAttribute(F)!==i.join(",")&&n.setAttribute(F,i.join(","))}},me=function(e,t){var n=document.head||document.querySelector(C.HEAD),r=n.querySelectorAll(e+"["+"data-react-helmet]"),o=Array.prototype.slice.call(r),a=[],i=void 0;return t&&t.length&&t.forEach((function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===I)n.innerHTML=t.innerHTML;else if(r===O)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[r]?"":t[r];n.setAttribute(r,c)}n.setAttribute(F,"true"),o.some((function(e,t){return i=t,n.isEqualNode(e)}))?o.splice(i,1):a.push(n)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),a.forEach((function(e){return n.appendChild(e)})),{oldTags:o,newTags:a}},ye=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},he=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[D[n]||n]=e[n],t}),t)},be=function(e,t,n){switch(e){case C.TITLE:return{toComponent:function(){return e=t.title,n=t.titleAttributes,(r={key:e})[F]=!0,o=he(n,r),[c.createElement(C.TITLE,o,e)];var e,n,r,o},toString:function(){return function(e,t,n,r){var o=ye(n),a=fe(t);return o?"<"+e+' data-react-helmet="true" '+o+">"+J(a,r)+"</"+e+">":"<"+e+' data-react-helmet="true">'+J(a,r)+"</"+e+">"}(e,t.title,t.titleAttributes,n)}};case T:case A:return{toComponent:function(){return he(t)},toString:function(){return ye(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,n){var r,o=((r={key:n})[F]=!0,r);return Object.keys(t).forEach((function(e){var n=D[e]||e;if(n===I||n===O){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]})),c.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var o=Object.keys(r).filter((function(e){return!(e===I||e===O)})).reduce((function(e,t){var o=void 0===r[t]?t:t+'="'+J(r[t],n)+'"';return e?e+" "+o:o}),""),a=r.innerHTML||r.cssText||"",i=-1===_.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+o+(i?"/>":">"+a+"</"+e+">")}),"")}(e,t,n)}}}},ge=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,c=e.noscriptTags,u=e.scriptTags,s=e.styleTags,l=e.title,f=void 0===l?"":l,p=e.titleAttributes;return{base:be(C.BASE,t,r),bodyAttributes:be(T,n,r),htmlAttributes:be(A,o,r),link:be(C.LINK,a,r),meta:be(C.META,i,r),noscript:be(C.NOSCRIPT,c,r),script:be(C.SCRIPT,u,r),style:be(C.STYLE,s,r),title:be(C.TITLE,{title:f,titleAttributes:p},r)}},ve=h()((function(e){return{baseTag:te([k,H],e),bodyAttributes:ee(T,e),defer:re(e,B),encode:re(e,R),htmlAttributes:ee(A,e),linkTags:ne(C.LINK,[M,k],e),metaTags:ne(C.META,[P,S,j,L,x],e),noscriptTags:ne(C.NOSCRIPT,[I],e),onChangeClientState:$(e),scriptTags:ne(C.SCRIPT,[N,I],e),styleTags:ne(C.STYLE,[O],e),title:X(e),titleAttributes:ee(E,e)}}),(function(e){se&&ce(se),e.defer?se=ie((function(){le(e,(function(){se=null}))})):(le(e),se=null)}),ge)((function(){return null})),we=(o=ve,i=a=function(e){function t(){return G(this,t),Q(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!g()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case C.SCRIPT:case C.NOSCRIPT:return{innerHTML:t};case C.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,o=e.newChildProps,a=e.nestedChildren;return Y({},r,((t={})[n.type]=[].concat(r[n.type]||[],[Y({},o,this.mapNestedChildrenToProps(n,a))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,o=e.newProps,a=e.newChildProps,i=e.nestedChildren;switch(r.type){case C.TITLE:return Y({},o,((t={})[r.type]=i,t.titleAttributes=Y({},a),t));case C.BODY:return Y({},o,{bodyAttributes:Y({},a)});case C.HTML:return Y({},o,{htmlAttributes:Y({},a)})}return Y({},o,((n={})[r.type]=Y({},a),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=Y({},t);return Object.keys(e).forEach((function(t){var r;n=Y({},n,((r={})[t]=e[t],r))})),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return c.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,a=o.children,i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[q[n]||n]=e[n],t}),t)}(Z(o,["children"]));switch(n.warnOnInvalidChildren(e,a),e.type){case C.LINK:case C.META:case C.NOSCRIPT:case C.SCRIPT:case C.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:i,nestedChildren:a});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:i,nestedChildren:a})}}})),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=Z(e,["children"]),r=Y({},n);return t&&(r=this.mapChildrenToProps(t,r)),c.createElement(o,r)},K(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(c.Component),a.propTypes={base:m().object,bodyAttributes:m().object,children:m().oneOfType([m().arrayOf(m().node),m().node]),defaultTitle:m().string,defer:m().bool,encodeSpecialCharacters:m().bool,htmlAttributes:m().object,link:m().arrayOf(m().object),meta:m().arrayOf(m().object),noscript:m().arrayOf(m().object),onChangeClientState:m().func,script:m().arrayOf(m().object),style:m().arrayOf(m().object),title:m().string,titleAttributes:m().object,titleTemplate:m().string},a.defaultProps={defer:!0,encodeSpecialCharacters:!0},a.peek=o.peek,a.rewind=function(){var e=o.rewind();return e||(e=ge({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},i);we.renderStatic=we.rewind;var Te=function(e){var t=e.pathname,n=e.title,r=e.locale,o=(0,u.K2)("1736560250").site.siteMetadata,a=o.siteUrl,i=o.siteTitle,s=n?i+" - "+n:i;return c.createElement(we,{defer:!1,defaultTitle:s},c.createElement("html",{lang:r}),c.createElement("link",{rel:"canonical",href:""+a+t}),c.createElement("link",{rel:"icon",href:(0,u.dq)("/images/favicon.png")}),c.createElement("meta",{name:"docsearch:version",content:"2.0"}),c.createElement("meta",{name:"viewport",content:"width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"}),c.createElement("meta",{property:"og:url",content:a}),c.createElement("meta",{property:"og:type",content:"website"}),c.createElement("meta",{property:"og:locale",content:r}),c.createElement("meta",{property:"og:title",content:s}),c.createElement("meta",{property:"og:site_name",content:i}),c.createElement("meta",{property:"og:image",content:a+"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABzlBMVEWvvCGvvCCyvii0wC6yvyqxvSazvyywvCOxviiwvSOzwC6zwC2wvSWxvSWxvieuvCDS2oTv8tPp7MG/yU2uux/a4Jrm6rq3wziuux7S2oPw8tXQ2H2uux24xDvo7L/v8dLu8dDu8c/u8dHt8MzBy1OtuhvFzl7d4qDN1XPv8tTT2oXc4p/////p7MK2wjbS2YL8/fj19+S5xT7c4p7Z35atux26xUDy9Nz6+/H6+/L+/v3///77/PT6+/D4+evEzlysuhrL1G/q7cTV3Ivd46Hd4qHFz1+8x0W9yEjEzVv8/PfL1HG9x0ezvy3L02/p7cPV3Ir5+u/Q13y7xkPu8dL7/PW2wjTz9d7Ayk+tuhzW3Y/W3Y73+OjDzVrl6bfs78zI0Wf4+e319+W3wjfAylGxvibU24nk6LTg5an+/vz29+fCzFb5+u7c4Z3b4Zzs78vV3Iy6xUHP1nq9yEnEzl33+erc4Z7y9NvQ2H7P13rO1nnm6rnR2YDl6bi2wjWuvB/p7cKwvSStuhrU24iyvim1wTPW3I2+yEr29+W3wzfAy1HL1HDM1HLI0Wbf5Kbc4qDk6bXK02y0wC/b4Zvg5arBy1Tj6LLH0GWvvCKwvCKzVwcnAAABm0lEQVRIx2NgGAWjYHgDRkZUJhhDAZI0XBUTMwtMOSszGzuQz8HAycbFDQY8DLxcEGk+ZiaIKn4BQSFhEbB6FlFBMXEJSSlpGVk5eQUFRQUlZRVVNSV1VqCkiIamFsQOEW0dHV09sA59Ax1DIxljHRNTM3MLSytrG1s7ewdHHScOoJyEs46LCFyDtSsfI4OEm50OVIMEn7uHp6GXt4+Hr6mfjj8fSEOAjitcg1KgQRCjSLCUTkgoRIMIg4hMWHhoRKQIoww2DVHRVjGxzHE68QmJSVANDIzJ4aEpEgwMIA2pwOCSSUPS4MyWrqOQkZmV7ZODTUOSem5ubl4+koaCyEJBHWuvIolibBqsdKAASYOEREmpThkrdg065RWVlZVV1SgaGBhqauvqRbBraGg0lZFpakbVwNjSysiAQwNmKIFsAKUYkjSAmcRqaINqkGgP7IBp4O8MD+0CaehGTxqMPem9EBZDvWxff5hIz4SJ9UDhSZOnmAHFRaZOC+ABmTs9XQOawGdwzoDnB3Z2BH8mO4o0srJRMApGAQgAAHb6eUvZGenPAAAAAElFTkSuQmCCICAgICAgICAgICAgICAgICAgICA="}),c.createElement("meta",{property:"og:image:width",content:"512"}),c.createElement("meta",{property:"og:image:height",content:"512"}),c.createElement("meta",{name:"twitter:card",content:"summary"}),c.createElement("meta",{name:"twitter:title",content:s}))},Ae=function(e){var t=e.children,n=e.title;return c.createElement("div",{className:"site-wrapper"},c.createElement(f,null),c.createElement(Te,{title:n,locale:"en"}),c.createElement("main",{id:"main-content"},t),c.createElement(p,null))}},5909:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#f8e8d8","images":{"fallback":{"src":"/broadcasting/static/2243c157f0b6491972ef32acce5579fd/ad85e/logo.png","srcSet":"/broadcasting/static/2243c157f0b6491972ef32acce5579fd/7cdec/logo.png 250w,\\n/broadcasting/static/2243c157f0b6491972ef32acce5579fd/0daab/logo.png 500w,\\n/broadcasting/static/2243c157f0b6491972ef32acce5579fd/ad85e/logo.png 1000w,\\n/broadcasting/static/2243c157f0b6491972ef32acce5579fd/64698/logo.png 2000w","sizes":"(min-width: 1000px) 1000px, 100vw"},"sources":[{"srcSet":"/broadcasting/static/2243c157f0b6491972ef32acce5579fd/a643c/logo.webp 250w,\\n/broadcasting/static/2243c157f0b6491972ef32acce5579fd/cd280/logo.webp 500w,\\n/broadcasting/static/2243c157f0b6491972ef32acce5579fd/eba9d/logo.webp 1000w,\\n/broadcasting/static/2243c157f0b6491972ef32acce5579fd/68d25/logo.webp 2000w","type":"image/webp","sizes":"(min-width: 1000px) 1000px, 100vw"}]},"width":1000,"height":286}')}}]);
//# sourceMappingURL=45b8cf55e6aa051ef8fb295bba1045c54c438167-61d4a04d97c27c48dc5f.js.map