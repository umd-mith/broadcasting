"use strict";(self.webpackChunkbroadcasting_a_v_data=self.webpackChunkbroadcasting_a_v_data||[]).push([[195],{1046:function(e,t,n){n.d(t,{w_:function(){return s}});var r=n(7294),a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},l=r.createContext&&r.createContext(a),i=function(){return i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},i.apply(this,arguments)},o=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};function c(e){return e&&e.map((function(e,t){return r.createElement(e.tag,i({key:t},e.attr),c(e.child))}))}function s(e){return function(t){return r.createElement(u,i({attr:i({},e.attr)},t),c(e.child))}}function u(e){var t=function(t){var n,a=e.attr,l=e.size,c=e.title,s=o(e,["attr","size","title"]),u=l||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",i({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,s,{className:n,style:i(i({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),c&&r.createElement("title",null,c),e.children)};return void 0!==l?r.createElement(l.Consumer,null,(function(e){return t(e)})):t(a)}},223:function(e,t,n){var r=n(7294);t.Z=function(e){var t=e.children,n=r.useState(!1),a=n[0],l=n[1];return r.createElement("div",null,r.createElement("a",{href:"#",onClick:function(e){return function(e){e.preventDefault(),l(!a)}(e)}},"Read ",a?"less":"more","..."),r.createElement("div",{className:a?"":"hidden"},t))}},3963:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});var r=n(7294),a=n(4428),l=n(5785),i=n(1597),o=n(3201);function c(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function u(e){var t=e.name,n=e.items,a=["NAEB","NFCB","WHA","KUOM"],s=(0,r.useState)(""),u=s[0],m=s[1],h=(0,r.useState)(a),d=h[0],f=h[1],p=(0,r.useState)(!0),g=p[0],E=p[1],y="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),v=new Map(y.map((function(e){return[e,[]]})));v.set("Other",[]);for(var b,w=c(n);!(b=w()).done;){var k=b.value,C=u.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");if((k.name+" "+k.description).match(new RegExp(C,"i"))&&((g||!(k.collections.length<2))&&0!==k.collections.filter((function(e){return d.includes(e)})).length)){var A=k.name[0].toUpperCase();if(v.has(A))v.get(A).push(k);else v.get("Other").push(k)}}var N=function(){window.scrollTo({top:0,behavior:"smooth"})};return r.createElement("div",{className:"registry"},r.createElement("div",{className:"registry-filter"},r.createElement("span",null,r.createElement("label",null,"Show enties from: ")),a.map((function(e,t){return r.createElement("span",{key:e},r.createElement("input",{type:"checkbox",checked:d.indexOf(e)>-1,onChange:function(){return t=e,void(d.indexOf(t)>-1?f(d.filter((function(e){return e!==t}))):f([].concat((0,l.Z)(d),[t])));var t},key:"c"+t})," ",r.createElement("label",null,e))})),r.createElement("span",null,r.createElement("input",{type:"checkbox",checked:g,onChange:function(){E(!g)}})," ",r.createElement("label",null,"Single Collection Only"))),r.createElement("input",{className:"registry-search",type:"text",value:u,onChange:function(e){return m(e.target.value)},placeholder:"Search by "+t,"aria-label":"Search"}),r.createElement("div",{className:"registry-nav"},y.map((function(e){return r.createElement("a",{href:"#letter-"+e,key:e},e)}))),r.createElement("div",null,"Entities shown: ",Array.from(v.keys()).map((function(e){return v.get(e).length})).reduce((function(e,t){return e+t}),0)," / ",n.length),Array.from(v.keys()).map((function(e){var t=v.get(e),n=t.length>0;return r.createElement("section",{style:{display:n?"block":"none"},key:e},r.createElement("div",{className:"letter-section"},r.createElement("div",{className:"letter",id:"letter-"+e},e),r.createElement("div",null,r.createElement("button",{className:"button back",onClick:N},r.createElement(o.$Pg,null)))),r.createElement("ul",null,t.map((function(e){return r.createElement("li",{key:e.url},r.createElement(i.rU,{to:e.url},e.name),":",e.collections.map((function(e){return r.createElement("span",{className:"registry-coll-chip",key:e},e)})),r.createElement("div",{className:"Clipped",dangerouslySetInnerHTML:{__html:e.description}}))}))))})))}var m=n(223),h=function(e){var t=e.data.allEntitiesJson.nodes.map((function(e){var t=e.description||e.expandedBlurb||"";return{name:e.bavdName,url:"/entity/"+e.cpfPageID+"/",description:t,collections:e.collections}}));return r.createElement(a.Z,{title:"Programs"},r.createElement("div",{id:"entities",className:"page-programs programs entities"},r.createElement("section",null,r.createElement("h1",null,"Browse Entities (People & Organizations)"),r.createElement("article",null,r.createElement("p",null,r.createElement("strong",null,"entity")," (noun): The corporate bodies, persons, or families associated in some way with the creation, accumulation, maintenance, and/or use of archival materials (Society of American Archivists. ",r.createElement("em",null,r.createElement("strong",null,r.createElement("a",{href:"https://perma.cc/6YFC-64DD"},"Describing Archives: A Content Standard.")))," Chicago: Society of American Archivists, 2004). "),r.createElement("p",null,"Listed below are all the entities (people and organizations) that were either a) involved in the creation of, b) a subject of, or c) a guest appearing in, the programs in the four ",r.createElement("em",null,"Broadcasting A/V Data")," educational radio collections. These include: "),r.createElement("ul",null,r.createElement("li",null,"The National Association of Educational Broadcasters collections at UMD Libraries (NAEB); "),r.createElement("li",null,"The National Federation of Community Broadcasters collections at UMD Libraries (NFCB); "),r.createElement("li",null,"The Wisconsin Public Radio collections at University of Wisconsin-Madison Libraries (WHA); and "),r.createElement("li",null,"The WLB/KUOM collections at University of Minnesota Libraries (WLB/KUOM). ")),r.createElement("p",null,"Click on an entity’s name to go to their landing page with brief biographical information from Wikidata, Wikipedia, and the Social Networks & Archival Context (SNAC) database, as well as links to associated programs and/or documents in the respective portal for each collection. Use the alphabetical index to jump to a particular letter, or the search bar to look for specific names or keywords from the entities' descriptions. Click 'Read More' for more information on way we curated this index of names, and how to use this page."),r.createElement(m.Z,null,r.createElement(r.Fragment,null,r.createElement("p",null," The index below consists of entities which meet our selection criteria:"),r.createElement("ul",null,r.createElement("li",null,"Entities that overlap more than one of the four collections, or"),r.createElement("li",null,"Entities which are represented frequently enough in any one collection that they are considered important to the history of educational radio, regardless of overlap between the four collections.")),r.createElement("p",null,"This index page is similar to the ",r.createElement("a",{href:"https://www.unlockingtheairwaves.org/people/"},"People")," and ",r.createElement("a",{href:"https://www.unlockingtheairwaves.org/organizations/"},"Organizations"),"index pages on the ",r.createElement("em",null,"Airwaves")," site. As such, they are only browsable, and not searchable. This approach is by design, because BA/VD’s research question address the question of ",r.createElement("em",null,"exploring collections through a network-centric lens, as opposed to a content-centric lens"),". However, you can use the toggles in the navigation bar above to limit your view of the entity index by either:"),r.createElement("ul",null,r.createElement("li",null,"Displaying entities from one or more specific collection(s);"),r.createElement("li",null,"Hiding entities which solely exist in one collection (select the ‘Hide Single Collection Entities’ button).")),r.createElement("p",null,"Each entity has a unique ID that comes from the Wikidata knowledge base, which begins with the letter 'Q' in the URL of each landing page. This identifier can also be used to locate the organization's record on Wikidata, which contains links to other references to the person across the web (Library of Congress, VIAF, and more)."))))),r.createElement("section",null,r.createElement(u,{name:"entity name",items:t}))))}}}]);
//# sourceMappingURL=component---src-pages-entities-tsx-6a7df31ae3bb57ffbd3f.js.map