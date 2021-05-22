(function(e){function n(n){for(var r,u,l=n[0],s=n[1],a=n[2],p=0,d=[];p<l.length;p++)u=l[p],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&d.push(o[u][0]),o[u]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);c&&c(n);while(d.length)d.shift()();return i.push.apply(i,a||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],r=!0,l=1;l<t.length;l++){var s=t[l];0!==o[s]&&(r=!1)}r&&(i.splice(n--,1),e=u(u.s=t[0]))}return e}var r={},o={app:0},i=[];function u(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.m=e,u.c=r,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)u.d(t,r,function(n){return e[n]}.bind(null,r));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="/vueder/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=n,l=l.slice();for(var a=0;a<l.length;a++)n(l[a]);var c=s;i.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("d9c2")},9224:function(e){e.exports=JSON.parse('{"name":"vueder","version":"3.1.0","description":"Criador de formulário baseado em objetos para VueJS","main":"index.js","module":"dist/vueder.esm.js","unpkg":"dist/vueder.min.js","browser":{"./sfc":"src/Vueder.vue"},"scripts":{"test":"echo \\"Error: no test specified\\" && exit 1","serve":"vue-cli-service serve","build":"npm run build:umd && npm run build:es && npm run build:unpkg && npm run build:doc","build:umd":"rollup --config build/rollup.config.js --format umd --file dist/vueder.umd.js","build:es":"rollup --config build/rollup.config.js --format es --file dist/vueder.esm.js","build:unpkg":"rollup --config build/rollup.config.js --format iife --file dist/vueder.min.js","build:doc":"vue build --dest docs src/Documentation.vue","lint":"vue-cli-service lint","commit:patch":"npm run build && git add . && git commit -m $(npm version patch --no-git-tag-version --force) && git push -u origin master && npm publish","commit:minor":"npm run build && git add . && git commit -m $(npm version minor --no-git-tag-version --force) && git push -u origin master && npm publish","commit:major":"npm run build && git add . && git commit -m $(npm version major --no-git-tag-version --force) && git push -u origin master && npm publish"},"repository":{"type":"git","url":"git+https://github.com/albreis/vueder.git"},"keywords":["vuejs","form","builder"],"author":"ER Soluções Web LTDA <contato@ersolucoesweb.com.br>","license":"MIT","bugs":{"url":"https://github.com/albreis/vueder/issues"},"homepage":"https://github.com/albreis/vueder#readme","devDependencies":{"@rollup/plugin-buble":"^0.21.3","@rollup/plugin-commonjs":"^11.1.0","babel-eslint":"^10.1.0","eslint":"^6.7.2","eslint-plugin-vue":"^6.2.2","postcss":"^8.2.15","rollup":"^1.17.0","rollup-plugin-vue":"^5.0.1","stylus":"^0.54.7","stylus-loader":"^3.0.2","vue":"^2.6.10","vue-template-compiler":"^2.6.10","webpack":"^5.37.1"},"dependencies":{"validate.js":"^0.13.1"}}')},c1a0:function(e,n,t){"use strict";t("d3ca")},d3ca:function(e,n,t){},dd9c:function(e,n,t){"use strict";var r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"documentation"},[t("aside",[t("h3",[e._v("Vueder "+e._s(e.infos.version))]),e._l(e.pages,(function(n){return t("a",{key:n.name,class:{active:n.name==e.component.name},on:{click:function(t){t.preventDefault(),e.component=n}}},[e._v(e._s(n.name))])}))],2),t("main",[t("h1",{domProps:{innerHTML:e._s(e.component.name)}}),t("hr"),t(e.component,{tag:"component"})],1)])},o=[],i=t("9224"),u=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},l=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("p",[e._v("Este componente serve para criar formulário a partir de um objeto JS")])])}],s={name:"Introdução",data:function(){return{}}},a=s,c=t("2bcb"),p=Object(c["a"])(a,u,l,!1,null,null,null),d=p.exports,m=function(){var e=this,n=e.$createElement;e._self._c;return e._m(0)},f=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("p",[e._v("Para utilizar o Vueder diretamente no navegador basta adicionar o seguinte:")]),t("iframe",{attrs:{width:"100%",height:"500",src:"//jsfiddle.net/ersolucoesweb/kv7buo4w/39/embedded/",allowfullscreen:"allowfullscreen",allowpaymentrequest:"",frameborder:"0"}})])}],v={name:"Instalação",data:function(){return{}}},b=v,g=Object(c["a"])(b,m,f,!1,null,null,null),h=g.exports,j={data:function(){return{infos:i,component:d,pages:[d,h]}}},_=j,y=(t("c1a0"),Object(c["a"])(_,r,o,!1,null,null,null));n["a"]=y.exports}});
//# sourceMappingURL=app.aa97b660.js.map