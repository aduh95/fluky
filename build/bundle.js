var app=function(){"use strict";function t(){}function e(t,e){for(const n in e)t[n]=e[n];return t}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function i(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(t,e){const n={};e=new Set(e);for(const o in t)e.has(o)||"$"===o[0]||(n[o]=t[o]);return n}const a=["",!0,1,"true","contenteditable"];function l(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode&&t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function h(t){return document.createTextNode(t)}function p(){return h(" ")}function m(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function g(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const $=["width","height"];function v(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const o in e)null==e[o]?t.removeAttribute(o):"style"===o?t.style.cssText=e[o]:"__value"===o?t.value=t[o]=e[o]:n[o]&&n[o].set&&-1===$.indexOf(o)?t[o]=e[o]:g(t,o,e[o])}function w(t,e){e=""+e,t.data!==e&&(t.data=e)}function b(t,e){t.value=null==e?"":e}function y(t,e,n){t.classList.toggle(e,!!n)}let x;function _(t){x=t}function S(t){(function(){if(!x)throw new Error("Function called outside component initialization");return x})().$$.on_mount.push(t)}const E=[],M=[];let k=[];const z=[],A=Promise.resolve();let T=!1;function L(t){k.push(t)}const j=new Set;let C=0;function I(){if(0!==C)return;const t=x;do{try{for(;C<E.length;){const t=E[C];C++,_(t),q(t.$$)}}catch(t){throw E.length=0,C=0,t}for(_(null),E.length=0,C=0;M.length;)M.pop()();for(let t=0;t<k.length;t+=1){const e=k[t];j.has(e)||(j.add(e),e())}k.length=0}while(E.length);for(;z.length;)z.pop()();T=!1,j.clear(),_(t)}function q(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(L)}}const F=new Set;let H;function N(t,e){t&&t.i&&(F.delete(t),t.i(e))}function O(t,e,n,o){if(t&&t.o){if(F.has(t))return;F.add(t),H.c.push((()=>{F.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}function W(t){return void 0!==t?.length?t:Array.from(t)}function B(t){t&&t.c()}function D(t,e,o){const{fragment:s,after_update:c}=t.$$;s&&s.m(e,o),L((()=>{const e=t.$$.on_mount.map(n).filter(i);t.$$.on_destroy?t.$$.on_destroy.push(...e):r(e),t.$$.on_mount=[]})),c.forEach(L)}function P(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];k.forEach((o=>-1===t.indexOf(o)?e.push(o):n.push(o))),n.forEach((t=>t())),k=e}(n.after_update),r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Y(t,e){-1===t.$$.dirty[0]&&(E.push(t),T||(T=!0,A.then(I)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function R(e,n,i,s,c,a,l=null,u=[-1]){const d=x;_(e);const h=e.$$={fragment:null,ctx:[],props:a,update:t,not_equal:c,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(d?d.$$.context:[])),callbacks:o(),dirty:u,skip_bound:!1,root:n.target||d.$$.root};l&&l(h.root);let p=!1;if(h.ctx=i?i(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return h.ctx&&c(h.ctx[t],h.ctx[t]=r)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](r),p&&Y(e,t)),n})):[],h.update(),p=!0,r(h.before_update),h.fragment=!!s&&s(h.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);h.fragment&&h.fragment.l(t),t.forEach(f)}else h.fragment&&h.fragment.c();n.intro&&N(e.$$.fragment),D(e,n.target,n.anchor),I()}_(d)}class X{$$=void 0;$$set=void 0;$destroy(){P(this,1),this.$destroy=t}$on(e,n){if(!i(n))return t;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const t=o.indexOf(n);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}"undefined"!=typeof window&&(window.__svelte||(window.__svelte={v:new Set})).v.add("4");class Z{constructor(t,e,n=function(){const t=16777215*Math.random()|0;return"#"+"0".repeat(Math.ceil(6-Math.log2(t)/4)-1)+t.toString(16)}()){this._color=n,this._speed=Math.random()*e+.125,this._seed=Math.random(),this._offset=65535*Math.random()|0,this._positionX=this._offset,this._positionY=(1-this._seed-this._offset%3)*t,this._positionZ=Math.random()+.3}draw(t,e,{width:n,height:o},r){if(this._positionY+=r*this._speed,this._positionY<o)return;const i=Math.cos((e+this._offset)/100);this._positionX+=(i+this._seed-.5)*(Math.sin(4095*this._seed)%1),t.fillStyle=this._color,t.setTransform(1,1-i,i,1,this._positionX%(n+5),this._positionY%(o+10)-10),t.fillRect(0,0,5*this._positionZ,10*this._positionZ)}}class V{constructor(t,e,n){this._canvas=t,this._context=this._canvas.getContext("2d"),this._skewIndex=0;const o=e*e/5/10,r=Math.sqrt(window.innerWidth*window.innerHeight*o);this._confetti=Array.from({length:r},(()=>new Z(window.innerHeight,e,n))),this._draw=this.draw.bind(this),requestAnimationFrame((t=>{this._lastTimestamp=t,this.updateCanvasSize()})),addEventListener("resize",this.updateCanvasSize.bind(this),{passive:!0})}draw(t=this._lastTimestamp){const{width:e,height:n}=this._canvas,o=this._context,r=this._skewIndex++;o.resetTransform(),o.clearRect(0,0,e,n),this._confetti.forEach((i=>i.draw(o,r,{width:e,height:n},t-this._lastTimestamp))),this._lastTimestamp=t,requestAnimationFrame(this._draw)}updateCanvasSize(){this._canvas.height=document.documentElement.clientHeight,this._canvas.width=document.documentElement.clientWidth,this.draw()}}function G(n){let o,r,s,c,p=[n[2]],g={};for(let t=0;t<p.length;t+=1)g=e(g,p[t]);return{c(){o=d("button"),r=h(n[1]),v(o,g),y(o,"svelte-1j64518",!0)},m(t,e){u(t,o,e),l(o,r),o.autofocus&&o.focus(),s||(c=m(o,"click",(function(){i(n[0])&&n[0].apply(this,arguments)})),s=!0)},p(t,[e]){n=t,2&e&&function(t,e,n){~a.indexOf(n)?function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(t,e):w(t,e)}(r,n[1],g.contenteditable),v(o,g=function(t,e){const n={},o={},r={$$scope:1};let i=t.length;for(;i--;){const s=t[i],c=e[i];if(c){for(const t in s)t in c||(o[t]=1);for(const t in c)r[t]||(n[t]=c[t],r[t]=1);t[i]=c}else for(const t in s)r[t]=1}for(const t in o)t in n||(n[t]=void 0);return n}(p,[4&e&&n[2]])),y(o,"svelte-1j64518",!0)},i:t,o:t,d(t){t&&f(o),s=!1,c()}}}function J(t,n,o){const r=["handleClick","text"];let i=c(n,r),{handleClick:s=Function.prototype}=n,{text:a}=n;return t.$$set=t=>{n=e(e({},n),function(t){const e={};for(const n in t)"$"!==n[0]&&(e[n]=t[n]);return e}(t)),o(2,i=c(n,r)),"handleClick"in t&&o(0,s=t.handleClick),"text"in t&&o(1,a=t.text)},[s,a,i]}class K extends X{constructor(t){super(),R(this,t,J,G,s,{handleClick:0,text:1})}}function Q(t){let e,n,o,r,i,s,c;return s=new K({props:{handleClick:t[0],text:"Start",autofocus:!0}}),{c(){e=d("header"),e.innerHTML='<h1 class="svelte-1jyabsc">Fluky</h1> <h2 class="svelte-1jyabsc">Anything could happen</h2> <p class="svelte-1jyabsc">This web app is a reproduction of\n    <a href="http://fluky.io" class="svelte-1jyabsc">Fluky</a>\n    – a randomizer by\n    <a href="https://humblebee.se/" class="svelte-1jyabsc">Humblebee</a>\n    – made as an exercise by\n    <a href="https://github.com/aduh95" class="svelte-1jyabsc">aduh95</a></p>',n=p(),o=d("canvas"),r=p(),i=d("footer"),B(s.$$.fragment),g(e,"class","svelte-1jyabsc"),g(o,"id","confetti"),g(o,"aria-label","Falling confetti"),g(i,"class","svelte-1jyabsc")},m(t,a){u(t,e,a),u(t,n,a),u(t,o,a),u(t,r,a),u(t,i,a),D(s,i,null),c=!0},p(t,[e]){const n={};1&e&&(n.handleClick=t[0]),s.$set(n)},i(t){c||(N(s.$$.fragment,t),c=!0)},o(t){O(s.$$.fragment,t),c=!1},d(t){t&&(f(e),f(n),f(o),f(r),f(i)),P(s)}}}function U(t,e,n){let{nextStep:o}=e;return S((()=>new V(document.getElementById("confetti"),.12,"#95dbb7"))),t.$$set=t=>{"nextStep"in t&&n(0,o=t.nextStep)},[o]}class tt extends X{constructor(t){super(),R(this,t,U,Q,s,{nextStep:0})}}const et=function*(t=Math.random()){const e=(1+Math.sqrt(5))/2;for(;;)yield t+=e}();class nt{constructor(t){this._color=`hsl(${et.next().value}turn,${60+Math.floor(20*Math.random())}%,${50+Math.floor(20*Math.random())}%)`,this.label=t}get color(){return this._color}}function ot(t,e,n){const o=t.slice();return o[7]=e[n],o[8]=e,o[9]=n,o}function rt(t){let e,n,o,i,s,c,a;function h(){t[5].call(i,t[8],t[9])}return{c(){e=d("div"),n=d("input"),o=p(),i=d("input"),g(n,"type","button"),n.value="x",g(n,"title","Delete entry"),g(n,"class","svelte-gzzxwe"),g(i,"aria-label","Describe the item"),i.required=!0,g(i,"type","text"),g(i,"class","svelte-gzzxwe"),g(e,"role","group"),g(e,"aria-label",`Item #${t[9]+1}`),g(e,"style",s=`--bg-color:${t[7].color}`),g(e,"class","svelte-gzzxwe")},m(r,s){u(r,e,s),l(e,n),l(e,o),l(e,i),b(i,t[7].label),c||(a=[m(n,"click",t[2](t[9])),m(i,"input",h)],c=!0)},p(n,o){t=n,1&o&&i.value!==t[7].label&&b(i,t[7].label),1&o&&s!==(s=`--bg-color:${t[7].color}`)&&g(e,"style",s)},d(t){t&&f(e),c=!1,r(a)}}}function it(t){let e,n,o,i,s,c,a,h,$,v,w,b=W(t[0]),y=[];for(let e=0;e<b.length;e+=1)y[e]=rt(ot(t,b,e));return h=new K({props:{text:"Go",type:"submit"}}),{c(){e=d("main"),n=d("form");for(let t=0;t<y.length;t+=1)y[t].c();o=p(),i=d("fieldset"),s=d("input"),c=p(),a=d("footer"),B(h.$$.fragment),g(s,"placeholder","Add something"),s.autofocus=!0,g(s,"class","svelte-gzzxwe"),g(i,"aria-label","Add new element to the list"),g(i,"class","svelte-gzzxwe"),g(a,"class","svelte-gzzxwe"),g(n,"class","svelte-gzzxwe")},m(r,f){u(r,e,f),l(e,n);for(let t=0;t<y.length;t+=1)y[t]&&y[t].m(n,null);l(n,o),l(n,i),l(i,s),l(n,c),l(n,a),D(h,a,null),$=!0,s.focus(),v||(w=[m(s,"input",t[1]),m(n,"submit",t[3])],v=!0)},p(t,[e]){if(5&e){let r;for(b=W(t[0]),r=0;r<b.length;r+=1){const i=ot(t,b,r);y[r]?y[r].p(i,e):(y[r]=rt(i),y[r].c(),y[r].m(n,o))}for(;r<y.length;r+=1)y[r].d(1);y.length=b.length}},i(t){$||(N(h.$$.fragment,t),$=!0)},o(t){O(h.$$.fragment,t),$=!1},d(t){t&&f(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(y,t),P(h),v=!1,r(w)}}}function st(t,e,n){let{items:o,nextStep:r}=e,i=0;return t.$$set=t=>{"items"in t&&n(0,o=t.items),"nextStep"in t&&n(4,r=t.nextStep)},[o,function(t){if(0===i){const e=new nt(t.target.value);n(0,o[o.length]=e,o),i=requestAnimationFrame((()=>{const n=t.target.form.querySelector("div:last-of-type>input:last-child");e.label=t.target.value,t.target.value="",i=0,n.focus()}))}},function(t){return e=>{o.splice(t,1),n(0,o)}},function(t){if(t.preventDefault(),o.length<2){const e=t.target.querySelector("fieldset:first-of-type>input");e.required=!0,e.addEventListener("input",(()=>{e.required=!1}),{passive:!0,once:!0}),t.target.reportValidity()}else r()},r,function(t,e){t[e].label=this.value,n(0,o)}]}class ct extends X{constructor(t){super(),R(this,t,st,it,s,{items:0,nextStep:4})}}const at="http://www.w3.org/2000/svg";function lt(t,e,n,o){return{x:t+n*Math.cos(o),y:e+n*Math.sin(o)}}function ut(t,e){const n=document.createElementNS(at,"svg");n.setAttribute("height",t),n.setAttribute("width",t);const o=2*Math.PI/e.length;return n.append(...e.map(((e,n)=>{const r=document.createElementNS(at,"path");var i,s,c,a,l,u,f,d;return r.setAttribute("d",(a=o*n,u=lt(i=t/2,s=t/2,c=t/4,l=o*(n+1)),f=lt(i,s,c,a),d=Number((l-a)%360>180),["M",u.x,u.y,"A",c,c,0,d,0,f.x,f.y].join(" "))),r.setAttribute("stroke-width",t/2),r.setAttribute("stroke",e),r.setAttribute("fill","none"),r}))),n}function ft(e){let n;return{c(){n=d("main"),g(n,"class","svelte-19ys0gn")},m(t,e){u(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}function dt(t,e,n){let{items:o,nextStep:r}=e;const i=t=>{const{length:e}=o,n=.75-t%1;return o[(Math.floor(n*e)+e)%e]};return S((()=>{const t=ut(.9*Math.min(window.innerHeight,window.innerWidth),o.map((t=>t.color)));t.setAttribute("aria-label","Rolling wheel");for(const e of t.children)e.setAttribute("role","presentation");document.querySelector("main").append(t);const e=14*Math.random(),n=`rotate(${13+e}turn)`,s=1e3+1e3*Math.random(),c=6e3+1e3*Math.random(),a="cubic-bezier(0, 0, 0.001, 1.01)",l=300+1e3*Math.random();if(Element.prototype.animate){t.animate({transform:["none",n]},{delay:s,duration:c,easing:a}).addEventListener("finish",(()=>{t.style.transform=n,setTimeout((()=>{r(i(e))}),l)}))}else t.style.transition=`transform ${c}ms ${a}`,setTimeout((()=>{t.style.transform=n}),s),t.addEventListener("transitionend",(()=>{setTimeout((()=>{r(i(e))}),l)}))})),t.$$set=t=>{"items"in t&&n(0,o=t.items),"nextStep"in t&&n(1,r=t.nextStep)},[o,r]}class ht extends X{constructor(t){super(),R(this,t,dt,ft,s,{items:0,nextStep:1})}}function pt(t){let e,n,o,r,i,s,c,a,$,v,b,y,x,_,S,E=t[1].label+"";return y=new K({props:{handleClick:t[0],text:"Restart",autofocus:!0,style:"--bg-color:#fff"}}),{c(){e=d("main"),n=d("h2"),o=h(E),r=p(),i=d("audio"),i.innerHTML='<source src="cheer.mp3" type="audio/mpeg"/><source src="cheer.ogg" type="audio/ogg"/>\n    Your browser does not support this audio format.',s=p(),c=d("button"),c.innerHTML='<svg aria-hidden="true" data-icon="volume-mute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74\n        24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47\n        40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64\n        256l45.64-45.64c6.3-6.3 6.3-16.52\n        0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416\n        210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3\n        16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82\n        22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3\n        22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"></path></svg>',a=p(),$=d("canvas"),v=p(),b=d("footer"),B(y.$$.fragment),g(n,"class","svelte-5tfg1a"),g(i,"id","cheer"),i.autoplay=!0,c.hidden=!0,g(c,"class","svelte-5tfg1a"),g(e,"class","svelte-5tfg1a"),g($,"id","confetti"),g($,"aria-label","Falling confetti"),g(b,"class","svelte-5tfg1a")},m(t,f){u(t,e,f),l(e,n),l(n,o),l(e,r),l(e,i),l(e,s),l(e,c),u(t,a,f),u(t,$,f),u(t,v,f),u(t,b,f),D(y,b,null),x=!0,_||(S=m(c,"click",mt),_=!0)},p(t,[e]){(!x||2&e)&&E!==(E=t[1].label+"")&&w(o,E);const n={};1&e&&(n.handleClick=t[0]),y.$set(n)},i(t){x||(N(y.$$.fragment,t),x=!0)},o(t){O(y.$$.fragment,t),x=!1},d(t){t&&(f(e),f(a),f($),f(v),f(b)),P(y),_=!1,S()}}}function mt(){document.getElementById("cheer").remove(),this.remove()}function gt(t,e,n){let{nextStep:o}=e,{winner:r}=e;return S((()=>{new V(document.getElementById("confetti"),.66),document.documentElement.style.setProperty("--bg-color",r.color),document.getElementById("cheer").addEventListener("canplaythrough",(t=>{t.target.paused?mt.call(t.target.nextElementSibling):t.target.nextElementSibling.hidden=!1})),document.getElementById("cheer").addEventListener("ended",(t=>{mt.call(t.target.nextElementSibling)}))})),t.$$set=t=>{"nextStep"in t&&n(0,o=t.nextStep),"winner"in t&&n(1,r=t.winner)},[o,r]}class $t extends X{constructor(t){super(),R(this,t,gt,pt,s,{nextStep:0,winner:1})}}function vt(t){let e,n;return e=new $t({props:{winner:t[0].winner,nextStep:t[5]}}),{c(){B(e.$$.fragment)},m(t,o){D(e,t,o),n=!0},p(t,n){const o={};1&n&&(o.winner=t[0].winner),e.$set(o)},i(t){n||(N(e.$$.fragment,t),n=!0)},o(t){O(e.$$.fragment,t),n=!1},d(t){P(e,t)}}}function wt(e){let n,o;return n=new ht({props:{items:e[1],nextStep:e[4]}}),{c(){B(n.$$.fragment)},m(t,e){D(n,t,e),o=!0},p:t,i(t){o||(N(n.$$.fragment,t),o=!0)},o(t){O(n.$$.fragment,t),o=!1},d(t){P(n,t)}}}function bt(e){let n,o;return n=new ct({props:{items:e[1],nextStep:e[3]}}),{c(){B(n.$$.fragment)},m(t,e){D(n,t,e),o=!0},p:t,i(t){o||(N(n.$$.fragment,t),o=!0)},o(t){O(n.$$.fragment,t),o=!1},d(t){P(n,t)}}}function yt(e){let n,o;return n=new tt({props:{nextStep:e[2]}}),{c(){B(n.$$.fragment)},m(t,e){D(n,t,e),o=!0},p:t,i(t){o||(N(n.$$.fragment,t),o=!0)},o(t){O(n.$$.fragment,t),o=!1},d(t){P(n,t)}}}function xt(t){let e,n,o,i;const s=[yt,bt,wt,vt],c=[];function a(t,e){return t[0].home?0:t[0].fillItems?1:t[0].rollTheDice?2:t[0].celebrateWinner?3:-1}return~(e=a(t))&&(n=c[e]=s[e](t)),{c(){n&&n.c(),o=h("")},m(t,n){~e&&c[e].m(t,n),u(t,o,n),i=!0},p(t,[i]){let l=e;e=a(t),e===l?~e&&c[e].p(t,i):(n&&(H={r:0,c:[],p:H},O(c[l],1,1,(()=>{c[l]=null})),H.r||r(H.c),H=H.p),~e?(n=c[e],n?n.p(t,i):(n=c[e]=s[e](t),n.c()),N(n,1),n.m(o.parentNode,o)):n=null)},i(t){i||(N(n),i=!0)},o(t){O(n),i=!1},d(t){t&&f(o),~e&&c[e].d(t)}}}function _t(t,e,n){let{state:o}=e;const r=[];return t.$$set=t=>{"state"in t&&n(0,o=t.state)},[o,r,function(){n(0,o.home=!1,o),n(0,o.fillItems=!0,o)},function(){n(0,o.fillItems=!1,o),n(0,o.rollTheDice=!0,o)},function(t){n(0,o.rollTheDice=!1,o),n(0,o.celebrateWinner=!0,o),n(0,o.winner=t,o)},function(){n(0,o.celebrateWinner=!1,o),r.splice(0,r.length),n(0,o.fillItems=!0,o),document.documentElement.style.removeProperty("--bg-color")}]}"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js",{scope:"./"}).then((()=>console.info("Service worker installed successfully."))).catch((t=>console.warn("Service worker installation failed.",t)));return new class extends X{constructor(t){super(),R(this,t,_t,xt,s,{state:0})}}({target:document.body,props:{state:{home:!0}}})}();
//# sourceMappingURL=bundle.js.map
