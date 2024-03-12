var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function r(){return Object.create(null)}function o(t){t.forEach(n)}function i(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function a(t,e){const n={};e=new Set(e);for(const r in t)e.has(r)||"$"===r[0]||(n[r]=t[r]);return n}const c=["",!0,1,"true","contenteditable"];function l(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function d(t){t.parentNode&&t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function h(t){return document.createTextNode(t)}function p(){return h(" ")}function m(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const $=["width","height"];function b(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const r in e)null==e[r]?t.removeAttribute(r):"style"===r?t.style.cssText=e[r]:"__value"===r?t.value=t[r]=e[r]:n[r]&&n[r].set&&-1===$.indexOf(r)?t[r]=e[r]:g(t,r,e[r])}function v(t,e){e=""+e,t.data!==e&&(t.data=e)}function w(t,e){t.value=null==e?"":e}function y(t,e,n){t.classList.toggle(e,!!n)}let x;function _(t){x=t}function S(t){(function(){if(!x)throw new Error("Function called outside component initialization");return x})().$$.on_mount.push(t)}const I=[],k=[];let E=[];const M=[],A=Promise.resolve();let G=!1;function C(t){E.push(t)}const T=new Set;let L=0;function z(){if(0!==L)return;const t=x;do{try{for(;L<I.length;){const t=I[L];L++,_(t),j(t.$$)}}catch(t){throw I.length=0,L=0,t}for(_(null),I.length=0,L=0;k.length;)k.pop()();for(let t=0;t<E.length;t+=1){const e=E[t];T.has(e)||(T.add(e),e())}E.length=0}while(I.length);for(;M.length;)M.pop()();G=!1,T.clear(),_(t)}function j(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const q=new Set;let N;function O(t,e){t&&t.i&&(q.delete(t),t.i(e))}function F(t,e,n,r){if(t&&t.o){if(q.has(t))return;q.add(t),N.c.push((()=>{q.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}else r&&r()}function H(t){return void 0!==t?.length?t:Array.from(t)}function W(t){t&&t.c()}function D(t,e,r){const{fragment:s,after_update:a}=t.$$;s&&s.m(e,r),C((()=>{const e=t.$$.on_mount.map(n).filter(i);t.$$.on_destroy?t.$$.on_destroy.push(...e):o(e),t.$$.on_mount=[]})),a.forEach(C)}function B(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];E.forEach((r=>-1===t.indexOf(r)?e.push(r):n.push(r))),n.forEach((t=>t())),E=e}(n.after_update),o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function R(t,e){-1===t.$$.dirty[0]&&(I.push(t),G||(G=!0,A.then(z)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function P(e,n,i,s,a,c,l=null,u=[-1]){const f=x;_(e);const h=e.$$={fragment:null,ctx:[],props:c,update:t,not_equal:a,bound:r(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(f?f.$$.context:[])),callbacks:r(),dirty:u,skip_bound:!1,root:n.target||f.$$.root};l&&l(h.root);let p=!1;if(h.ctx=i?i(e,n.props||{},((t,n,...r)=>{const o=r.length?r[0]:n;return h.ctx&&a(h.ctx[t],h.ctx[t]=o)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](o),p&&R(e,t)),n})):[],h.update(),p=!0,o(h.before_update),h.fragment=!!s&&s(h.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);h.fragment&&h.fragment.l(t),t.forEach(d)}else h.fragment&&h.fragment.c();n.intro&&O(e.$$.fragment),D(e,n.target,n.anchor),z()}_(f)}class Y{$$=void 0;$$set=void 0;$destroy(){B(this,1),this.$destroy=t}$on(e,n){if(!i(n))return t;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const t=r.indexOf(n);-1!==t&&r.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}"undefined"!=typeof window&&(window.__svelte||(window.__svelte={v:new Set})).v.add("4");class J{constructor(t,e,n=function(){const t=16777215*Math.random()|0;return"#"+"0".repeat(Math.ceil(6-Math.log2(t)/4)-1)+t.toString(16)}()){this._color=n,this._speed=Math.random()*e+.125,this._seed=Math.random(),this._offset=65535*Math.random()|0,this._positionX=this._offset,this._positionY=(1-this._seed-this._offset%3)*t,this._positionZ=Math.random()+.3}draw(t,e,{width:n,height:r},o){if(this._positionY+=o*this._speed,this._positionY<r)return;const i=Math.cos((e+this._offset)/100);this._positionX+=(i+this._seed-.5)*(Math.sin(4095*this._seed)%1),t.fillStyle=this._color,t.setTransform(1,1-i,i,1,this._positionX%(n+5),this._positionY%(r+10)-10),t.fillRect(0,0,5*this._positionZ,10*this._positionZ)}}class U{constructor(t,e,n){this._canvas=t,this._context=this._canvas.getContext("2d"),this._skewIndex=0;const r=e*e/5/10,o=Math.sqrt(window.innerWidth*window.innerHeight*r);this._confetti=Array.from({length:o},(()=>new J(window.innerHeight,e,n))),this._draw=this.draw.bind(this),requestAnimationFrame((t=>{this._lastTimestamp=t,this.updateCanvasSize()})),addEventListener("resize",this.updateCanvasSize.bind(this),{passive:!0})}draw(t=this._lastTimestamp){const{width:e,height:n}=this._canvas,r=this._context,o=this._skewIndex++;r.resetTransform(),r.clearRect(0,0,e,n),this._confetti.forEach((i=>i.draw(r,o,{width:e,height:n},t-this._lastTimestamp))),this._lastTimestamp=t,requestAnimationFrame(this._draw)}updateCanvasSize(){this._canvas.height=document.documentElement.clientHeight,this._canvas.width=document.documentElement.clientWidth,this.draw()}}function X(n){let r,o,s,a,p=[n[2]],g={};for(let t=0;t<p.length;t+=1)g=e(g,p[t]);return{c(){r=f("button"),o=h(n[1]),b(r,g),y(r,"svelte-1j64518",!0)},m(t,e){u(t,r,e),l(r,o),r.autofocus&&r.focus(),s||(a=m(r,"click",(function(){i(n[0])&&n[0].apply(this,arguments)})),s=!0)},p(t,[e]){n=t,2&e&&function(t,e,n){~c.indexOf(n)?function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(t,e):v(t,e)}(o,n[1],g.contenteditable),b(r,g=function(t,e){const n={},r={},o={$$scope:1};let i=t.length;for(;i--;){const s=t[i],a=e[i];if(a){for(const t in s)t in a||(r[t]=1);for(const t in a)o[t]||(n[t]=a[t],o[t]=1);t[i]=a}else for(const t in s)o[t]=1}for(const t in r)t in n||(n[t]=void 0);return n}(p,[4&e&&n[2]])),y(r,"svelte-1j64518",!0)},i:t,o:t,d(t){t&&d(r),s=!1,a()}}}function Z(t,n,r){const o=["handleClick","text"];let i=a(n,o),{handleClick:s=Function.prototype}=n,{text:c}=n;return t.$$set=t=>{n=e(e({},n),function(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}(t)),r(2,i=a(n,o)),"handleClick"in t&&r(0,s=t.handleClick),"text"in t&&r(1,c=t.text)},[s,c,i]}class V extends Y{constructor(t){super(),P(this,t,Z,X,s,{handleClick:0,text:1})}}function K(t){let e,n,r,o,i,s,a;return s=new V({props:{handleClick:t[0],text:"Start",autofocus:!0}}),{c(){e=f("header"),e.innerHTML='<h1 class="svelte-1jyabsc">Fluky</h1> <h2 class="svelte-1jyabsc">Anything could happen</h2> <p class="svelte-1jyabsc">This web app is a reproduction of\n    <a href="http://fluky.io" class="svelte-1jyabsc">Fluky</a>\n    – a randomizer by\n    <a href="https://humblebee.se/" class="svelte-1jyabsc">Humblebee</a>\n    – made as an exercise by\n    <a href="https://github.com/aduh95" class="svelte-1jyabsc">aduh95</a></p>',n=p(),r=f("canvas"),o=p(),i=f("footer"),W(s.$$.fragment),g(e,"class","svelte-1jyabsc"),g(r,"id","confetti"),g(r,"aria-label","Falling confetti"),g(i,"class","svelte-1jyabsc")},m(t,c){u(t,e,c),u(t,n,c),u(t,r,c),u(t,o,c),u(t,i,c),D(s,i,null),a=!0},p(t,[e]){const n={};1&e&&(n.handleClick=t[0]),s.$set(n)},i(t){a||(O(s.$$.fragment,t),a=!0)},o(t){F(s.$$.fragment,t),a=!1},d(t){t&&(d(e),d(n),d(r),d(o),d(i)),B(s)}}}function Q(t,e,n){let{nextStep:r}=e;return S((()=>new U(document.getElementById("confetti"),.12,"#95dbb7"))),t.$$set=t=>{"nextStep"in t&&n(0,r=t.nextStep)},[r]}class tt extends Y{constructor(t){super(),P(this,t,Q,K,s,{nextStep:0})}}const et=[{min:0,max:30,aGradient:.007622554,aIntercept:-.223522909,bGradient:-.006972816,bIntercept:.159400333},{min:30,max:60,aGradient:.003800316,aIntercept:-.125796416,bGradient:-.002237613,bIntercept:.044251669},{min:60,max:90,aGradient:-978743e-9,aIntercept:.157473997,bGradient:476455e-9,bIntercept:-.115588066},{min:90,max:120,aGradient:-896412e-9,aIntercept:.149120725,bGradient:316902e-9,bIntercept:-.100832758},{min:120,max:150,aGradient:304561e-9,aIntercept:.005848966,bGradient:-110541e-9,bIntercept:-.049997044},{min:150,max:180,aGradient:375923e-9,aIntercept:-.004854929,bGradient:-138959e-9,bIntercept:-.029084065},{min:180,max:210,aGradient:-.003984596,aIntercept:.778812054,bGradient:.002196531,bIntercept:-.452163624},{min:210,max:240,aGradient:-.005585318,aIntercept:1.120966131,bGradient:.006121434,bIntercept:-1.240756882},{min:240,max:270,aGradient:-135415e-9,aIntercept:-.17221474,bGradient:0,bIntercept:.21},{min:270,max:300,aGradient:.001179809,aIntercept:-.542348823,bGradient:0,bIntercept:.21},{min:300,max:360,aGradient:-.001044457,aIntercept:.133977501,bGradient:.001918519,bIntercept:-.43519087}];const nt=function*(t=Math.random()){const e=(1+Math.sqrt(5))/2;for(;;)yield t+=e}();function rt(){const t=nt.next().value,e=.2*Math.random()+.6,n=function(t,e){t=t%1*360;const{aGradient:n,aIntercept:r,bGradient:o,bIntercept:i}=et.find((({min:e,max:n})=>n>=t&&e<=t));return(n*t+r)*e*e+(o*t+i)*e+.34806606292724607}(t,e);return`hsl(${t}turn,${100*e}%,${100*n}%)`}class ot{constructor(t){this.color=rt(),this.label=t}}function it(t,e,n){const r=t.slice();return r[8]=e[n],r[9]=e,r[10]=n,r}function st(t){let e,n,r,i,s,a,c;function h(){t[6].call(i,t[9],t[10])}return{c(){e=f("div"),n=f("input"),r=p(),i=f("input"),g(n,"type","button"),n.value="x",g(n,"title","Delete entry"),g(n,"class","svelte-14wtpzk"),g(i,"aria-label","Describe the item"),i.required=!0,g(i,"type","text"),g(i,"class","svelte-14wtpzk"),g(e,"role","group"),g(e,"aria-label",`Item #${t[10]+1}`),g(e,"style",s=`--bg-color:${t[8].color}`),g(e,"class","svelte-14wtpzk")},m(o,s){u(o,e,s),l(e,n),l(e,r),l(e,i),w(i,t[8].label),a||(c=[m(n,"click",t[2](t[10])),m(i,"input",h)],a=!0)},p(n,r){t=n,1&r&&i.value!==t[8].label&&w(i,t[8].label),1&r&&s!==(s=`--bg-color:${t[8].color}`)&&g(e,"style",s)},d(t){t&&d(e),a=!1,o(c)}}}function at(t){let e,n,r,i,s,a,c,h,$,b,v,w,y,x=H(t[0]),_=[];for(let e=0;e<x.length;e+=1)_[e]=st(it(t,x,e));return b=new V({props:{text:"Go",type:"submit"}}),{c(){e=f("main"),n=f("form");for(let t=0;t<_.length;t+=1)_[t].c();r=p(),i=f("fieldset"),s=f("input"),a=p(),c=f("button"),c.textContent="Clear all",h=p(),$=f("footer"),W(b.$$.fragment),g(s,"placeholder","Add something"),s.autofocus=!0,g(s,"class","svelte-14wtpzk"),g(c,"type","reset"),g(c,"class","svelte-14wtpzk"),g(i,"aria-label","Add new element to the list"),g(i,"class","svelte-14wtpzk"),g($,"class","svelte-14wtpzk"),g(n,"class","svelte-14wtpzk")},m(o,d){u(o,e,d),l(e,n);for(let t=0;t<_.length;t+=1)_[t]&&_[t].m(n,null);l(n,r),l(n,i),l(i,s),l(i,a),l(i,c),l(n,h),l(n,$),D(b,$,null),v=!0,s.focus(),w||(y=[m(s,"input",t[1]),m(c,"click",t[3]),m(n,"submit",t[4])],w=!0)},p(t,[e]){if(5&e){let o;for(x=H(t[0]),o=0;o<x.length;o+=1){const i=it(t,x,o);_[o]?_[o].p(i,e):(_[o]=st(i),_[o].c(),_[o].m(n,r))}for(;o<_.length;o+=1)_[o].d(1);_.length=x.length}},i(t){v||(O(b.$$.fragment,t),v=!0)},o(t){F(b.$$.fragment,t),v=!1},d(t){t&&d(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(_,t),B(b),w=!1,o(y)}}}function ct(t,e,n){let{items:r,nextStep:o}=e,i=0;return addEventListener("hashchange",(()=>{requestAnimationFrame((()=>{n(0,r)}))})),t.$$set=t=>{"items"in t&&n(0,r=t.items),"nextStep"in t&&n(5,o=t.nextStep)},[r,function(t){if(0===i){const e=new ot(t.target.value);n(0,r[r.length]=e,r),i=requestAnimationFrame((()=>{const n=t.target.form.querySelector("div:last-of-type>input:last-child");e.label=t.target.value,t.target.value="",i=0,n.focus()}))}},function(t){return e=>{r.splice(t,1),n(0,r)}},function(t){r.splice(0),n(0,r),t.target.previousElementSibling.focus()},function(t){if(t.preventDefault(),r.length<2){const e=t.target.querySelector("fieldset:first-of-type>input");e.required=!0,e.addEventListener("input",(()=>{e.required=!1}),{passive:!0,once:!0}),t.target.reportValidity()}else o()},o,function(t,e){t[e].label=this.value,n(0,r)}]}class lt extends Y{constructor(t){super(),P(this,t,ct,at,s,{items:0,nextStep:5})}}const ut="http://www.w3.org/2000/svg";function dt(t,e,n,r){return{x:t+n*Math.cos(r),y:e+n*Math.sin(r)}}function ft(t,e){const n=document.createElementNS(ut,"svg");n.setAttribute("height",t),n.setAttribute("width",t);const r=2*Math.PI/e.length;return n.append(...e.map(((e,n)=>{const o=document.createElementNS(ut,"path");var i,s,a,c,l,u,d,f;return o.setAttribute("d",(c=r*n,u=dt(i=t/2,s=t/2,a=t/4,l=r*(n+1)),d=dt(i,s,a,c),f=Number((l-c)%360>180),["M",u.x,u.y,"A",a,a,0,f,0,d.x,d.y].join(" "))),o.setAttribute("stroke-width",t/2),o.setAttribute("stroke",e),o.setAttribute("fill","none"),o}))),n}function ht(e){let n;return{c(){n=f("main"),g(n,"class","svelte-19ys0gn")},m(t,e){u(t,n,e)},p:t,i:t,o:t,d(t){t&&d(n)}}}function pt(t,e,n){let{items:r,nextStep:o}=e;const i=t=>{const{length:e}=r,n=.75-t%1;return r[(Math.floor(n*e)+e)%e]};return S((()=>{const t=ft(.9*Math.min(window.innerHeight,window.innerWidth),r.map((t=>t.color)));t.setAttribute("aria-label","Rolling wheel");for(const e of t.children)e.setAttribute("role","presentation");document.querySelector("main").append(t);const e=14*Math.random(),n=`rotate(${13+e}turn)`,s=1e3+1e3*Math.random(),a=6e3+1e3*Math.random(),c="cubic-bezier(0, 0, 0.001, 1.01)",l=300+1e3*Math.random();if(Element.prototype.animate){t.animate({transform:["none",n]},{delay:s,duration:a,easing:c}).addEventListener("finish",(()=>{t.style.transform=n,setTimeout((()=>{o(i(e))}),l)}))}else t.style.transition=`transform ${a}ms ${c}`,setTimeout((()=>{t.style.transform=n}),s),t.addEventListener("transitionend",(()=>{setTimeout((()=>{o(i(e))}),l)}))})),t.$$set=t=>{"items"in t&&n(0,r=t.items),"nextStep"in t&&n(1,o=t.nextStep)},[r,o]}class mt extends Y{constructor(t){super(),P(this,t,pt,ht,s,{items:0,nextStep:1})}}function gt(t){let e,n,r,o,i,s,a,c,$,b,w,y,x,_,S,I=t[1].label+"";return y=new V({props:{handleClick:t[0],text:"Restart",autofocus:!0,style:"--bg-color:#fff"}}),{c(){e=f("main"),n=f("h2"),r=h(I),o=p(),i=f("audio"),i.innerHTML='<source src="cheer.mp3" type="audio/mpeg"/><source src="cheer.ogg" type="audio/ogg"/>\n    Your browser does not support this audio format.',s=p(),a=f("button"),a.innerHTML='<svg aria-hidden="true" data-icon="volume-mute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74\n        24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47\n        40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64\n        256l45.64-45.64c6.3-6.3 6.3-16.52\n        0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416\n        210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3\n        16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82\n        22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3\n        22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"></path></svg>',c=p(),$=f("canvas"),b=p(),w=f("footer"),W(y.$$.fragment),g(n,"class","svelte-5tfg1a"),g(i,"id","cheer"),i.autoplay=!0,a.hidden=!0,g(a,"class","svelte-5tfg1a"),g(e,"class","svelte-5tfg1a"),g($,"id","confetti"),g($,"aria-label","Falling confetti"),g(w,"class","svelte-5tfg1a")},m(t,d){u(t,e,d),l(e,n),l(n,r),l(e,o),l(e,i),l(e,s),l(e,a),u(t,c,d),u(t,$,d),u(t,b,d),u(t,w,d),D(y,w,null),x=!0,_||(S=m(a,"click",$t),_=!0)},p(t,[e]){(!x||2&e)&&I!==(I=t[1].label+"")&&v(r,I);const n={};1&e&&(n.handleClick=t[0]),y.$set(n)},i(t){x||(O(y.$$.fragment,t),x=!0)},o(t){F(y.$$.fragment,t),x=!1},d(t){t&&(d(e),d(c),d($),d(b),d(w)),B(y),_=!1,S()}}}function $t(){document.getElementById("cheer").remove(),this.remove()}function bt(t,e,n){let{nextStep:r}=e,{winner:o}=e;return S((()=>{new U(document.getElementById("confetti"),.66),document.documentElement.style.setProperty("--bg-color",o.color),document.getElementById("cheer").addEventListener("canplaythrough",(t=>{t.target.paused?$t.call(t.target.nextElementSibling):t.target.nextElementSibling.hidden=!1})),document.getElementById("cheer").addEventListener("ended",(t=>{$t.call(t.target.nextElementSibling)}))})),t.$$set=t=>{"nextStep"in t&&n(0,r=t.nextStep),"winner"in t&&n(1,o=t.winner)},[r,o]}class vt extends Y{constructor(t){super(),P(this,t,bt,gt,s,{nextStep:0,winner:1})}}function wt(t){let e,n;return e=new vt({props:{winner:t[0].winner,nextStep:t[5]}}),{c(){W(e.$$.fragment)},m(t,r){D(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.winner=t[0].winner),e.$set(r)},i(t){n||(O(e.$$.fragment,t),n=!0)},o(t){F(e.$$.fragment,t),n=!1},d(t){B(e,t)}}}function yt(e){let n,r;return n=new mt({props:{items:e[1],nextStep:e[4]}}),{c(){W(n.$$.fragment)},m(t,e){D(n,t,e),r=!0},p:t,i(t){r||(O(n.$$.fragment,t),r=!0)},o(t){F(n.$$.fragment,t),r=!1},d(t){B(n,t)}}}function xt(e){let n,r;return n=new lt({props:{items:e[1],nextStep:e[3]}}),{c(){W(n.$$.fragment)},m(t,e){D(n,t,e),r=!0},p:t,i(t){r||(O(n.$$.fragment,t),r=!0)},o(t){F(n.$$.fragment,t),r=!1},d(t){B(n,t)}}}function _t(e){let n,r;return n=new tt({props:{nextStep:e[2]}}),{c(){W(n.$$.fragment)},m(t,e){D(n,t,e),r=!0},p:t,i(t){r||(O(n.$$.fragment,t),r=!0)},o(t){F(n.$$.fragment,t),r=!1},d(t){B(n,t)}}}function St(t){let e,n,r,i;const s=[_t,xt,yt,wt],a=[];function c(t,e){return t[0].home?0:t[0].fillItems?1:t[0].rollTheDice?2:t[0].celebrateWinner?3:-1}return~(e=c(t))&&(n=a[e]=s[e](t)),{c(){n&&n.c(),r=h("")},m(t,n){~e&&a[e].m(t,n),u(t,r,n),i=!0},p(t,[i]){let l=e;e=c(t),e===l?~e&&a[e].p(t,i):(n&&(N={r:0,c:[],p:N},F(a[l],1,1,(()=>{a[l]=null})),N.r||o(N.c),N=N.p),~e?(n=a[e],n?n.p(t,i):(n=a[e]=s[e](t),n.c()),O(n,1),n.m(r.parentNode,r)):n=null)},i(t){i||(O(n),i=!0)},o(t){F(n),i=!1},d(t){t&&d(r),~e&&a[e].d(t)}}}function It(t,e,n){let{state:r}=e;const o=[];try{o.push(...JSON.parse(decodeURIComponent(location.hash?.slice(1))))}catch{}return addEventListener("hashchange",(()=>{try{const t=JSON.parse(decodeURIComponent(location.hash?.slice(1)));Array.isArray(t)&&(o.splice(0,o.length,...t),n(0,r.home=!1,r),n(0,r.fillItems=!0,r),n(0,r.rollTheDice=!1,r),n(0,r.celebrateWinner=!1,r),document.documentElement.style.removeProperty("--bg-color"))}catch{}})),t.$$set=t=>{"state"in t&&n(0,r=t.state)},[r,o,function(){n(0,r.home=!1,r),n(0,r.fillItems=!0,r)},function(){location.hash=encodeURIComponent(JSON.stringify(o)),n(0,r.fillItems=!1,r),n(0,r.rollTheDice=!0,r)},function(t){n(0,r.rollTheDice=!1,r),n(0,r.celebrateWinner=!0,r),n(0,r.winner=t,r)},function(){n(0,r.celebrateWinner=!1,r),n(0,r.fillItems=!0,r),document.documentElement.style.removeProperty("--bg-color")}]}"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js",{scope:"./"}).then((()=>console.info("Service worker installed successfully."))).catch((t=>console.warn("Service worker installation failed.",t)));return new class extends Y{constructor(t){super(),P(this,t,It,St,s,{state:0})}}({target:document.body,props:{state:{home:!0}}})}();
//# sourceMappingURL=bundle.js.map