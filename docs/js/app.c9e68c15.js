(function(e){function r(r){for(var n,u,s=r[0],l=r[1],a=r[2],p=0,d=[];p<s.length;p++)u=s[p],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&d.push(o[u][0]),o[u]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);c&&c(r);while(d.length)d.shift()();return i.push.apply(i,a||[]),t()}function t(){for(var e,r=0;r<i.length;r++){for(var t=i[r],n=!0,s=1;s<t.length;s++){var l=t[s];0!==o[l]&&(n=!1)}n&&(i.splice(r--,1),e=u(u.s=t[0]))}return e}var n={},o={app:0},i=[];function u(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.m=e,u.c=n,u.d=function(e,r,t){u.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,r){if(1&r&&(e=u(e)),8&r)return e;if(4&r&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)u.d(t,n,function(r){return e[r]}.bind(null,n));return t},u.n=function(e){var r=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(r,"a",r),r},u.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},u.p="/vueder/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=r,s=s.slice();for(var a=0;a<s.length;a++)r(s[a]);var c=l;i.push([0,"chunk-vendors"]),t()})({0:function(e,r,t){e.exports=t("d9c2")},9224:function(e){e.exports=JSON.parse('{"name":"@ersolucoesweb/vueder","version":"3.2.2","private":false,"description":"Criador de formulário baseado em objetos para VueJS","main":"index.js","module":"dist/vueder.esm.js","unpkg":"dist/vueder.min.js","browser":{"./sfc":"src/Vueder.vue"},"scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","serve":"vue-cli-service serve","build":"npm run build:umd && npm run build:es && npm run build:unpkg && npm run build:doc","build:umd":"rollup --config build/rollup.config.js --format umd --file dist/vueder.umd.js","build:es":"rollup --config build/rollup.config.js --format es --file dist/vueder.esm.js","build:unpkg":"rollup --config build/rollup.config.js --format iife --file dist/vueder.min.js","build:doc":"vue build --dest docs src/Documentation.vue","lint":"vue-cli-service lint","precommit":"git add .","commit":"git commit -m","postcommit":"git push","publish:patch":"npm run build && git add . && git commit -m $(npm version patch --no-git-tag-version --force) && git push -u origin master && npm publish --access=public","publish:minor":"npm run build && git add . && git commit -m $(npm version minor --no-git-tag-version --force) && git push -u origin master && npm publish --access=public","publish:major":"npm run build && git add . && git commit -m $(npm version major --no-git-tag-version --force) && git push -u origin master && npm publish --access=public"},"repository":{"type":"git","url":"git+https://github.com/albreis/vueder.git"},"keywords":["vuejs","form","builder"],"author":"ER Soluções Web LTDA <contato@ersolucoesweb.com.br>","contributors":[{"name":"Albreis - Design & Programação","email":"contato@albreis.com.br","url":"https://albreis.com.br"},{"name":"Everaldo Programador","email":"contato@everaldoreis.com.br","url":"https://everaldoreis.com.br"}],"license":"MIT","bugs":{"url":"https://github.com/albreis/vueder/issues"},"homepage":"https://github.com/albreis/vueder#readme","devDependencies":{"@rollup/plugin-buble":"^0.21.3","@rollup/plugin-commonjs":"^11.1.0","babel-eslint":"^10.1.0","eslint":"^6.7.2","eslint-plugin-vue":"^6.2.2","postcss":"^8.2.15","rollup":"^1.17.0","rollup-plugin-vue":"^5.0.1","stylus":"^0.54.7","stylus-loader":"^3.0.2","vue":"^2.6.10","vue-template-compiler":"^2.6.10","webpack":"^5.37.1"},"dependencies":{"validate.js":"^0.13.1"},"directories":{"doc":"docs"}}')},c1a0:function(e,r,t){"use strict";t("d3ca")},d3ca:function(e,r,t){},dd9c:function(e,r,t){"use strict";var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"documentation"},[t("aside",[t("h3",[e._v("Vueder "+e._s(e.infos.version))]),e._l(e.pages,(function(r){return t("a",{key:r.name,class:{active:r.name==e.component.name},on:{click:function(t){t.preventDefault(),e.component=r}}},[e._v(e._s(r.name))])}))],2),t("main",[t("h1",{domProps:{innerHTML:e._s(e.component.name)}}),t("hr"),t(e.component,{tag:"component"})],1)])},o=[],i=t("9224"),u=function(){var e=this,r=e.$createElement;e._self._c;return e._m(0)},s=[function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("p",[e._v("Este componente serve para criar formulário a partir de um objeto JS")])])}],l={name:"Introdução",data:function(){return{}}},a=l,c=t("2bcb"),p=Object(c["a"])(a,u,s,!1,null,null,null),d=p.exports,m=function(){var e=this,r=e.$createElement;e._self._c;return e._m(0)},f=[function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("p",[e._v("Para utilizar o Vueder diretamente no navegador basta adicionar o seguinte:")]),t("iframe",{attrs:{width:"100%",height:"500",src:"//jsfiddle.net/ersolucoesweb/kv7buo4w/39/embedded/",allowfullscreen:"allowfullscreen",allowpaymentrequest:"",frameborder:"0"}})])}],b={name:"Instalação",data:function(){return{}}},v=b,g=Object(c["a"])(v,m,f,!1,null,null,null),h=g.exports,j={data:function(){return{infos:i,component:d,pages:[d,h]}}},_=j,y=(t("c1a0"),Object(c["a"])(_,n,o,!1,null,null,null));r["a"]=y.exports}});
//# sourceMappingURL=app.c9e68c15.js.map