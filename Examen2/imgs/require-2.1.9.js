;(function (d, w) {
w.fifa = w.fifa || {};
var Analytics = w.fifa.analytics || {};
Analytics = (function () {
var PageModule = this.PageModule || {};
PageModule = (function (params, activate, name) {
var _cfg;
var _cfgprivate = {
"modules": [],
"currentModule": null,
"isactive": false,
"name": name
}
function init(_params, activate) {
var _defaults = {
"url": w.location.href,
"title": d.title
};
_cfg = function () {
var pars;
if (typeof (_params) != 'undefined') {
pars = _params;
for (var key in _defaults) {
if ((typeof pars[key] == 'undefined') || pars[key] == '') {
pars[key] = _defaults[key];
}
}
}
else {
pars = _defaults;
}
return pars;
}();
function setVar(varName, varValue) {
if ((!!varName) && (!!varValue)) {
_cfg[varName] = varValue;
return true;
}
return false;
}
function deleteVar(varName) {
if ((!!varName) && (typeof _cfg[varName]!="undefined")) {
delete _cfg[varName];
return true;
}
return false;
}
function getVar(varName) {
if ((!!varName) && (typeof _cfg[varName] != 'undefined') && (varName != '')) {
return _cfg[varName]
}
else {
return;
}
}
function getVars() {
return _cfg;
}
function isActive() {
return _cfgprivate.isactive;
}
function getName() {
return _cfgprivate.name;
}
function toggleActive() {
_cfgprivate.isactive = !(_cfgprivate.isactive);
return;
}
function getActiveVars(override) {
var vars = _cfg, _module;
for (var key in _cfgprivate.modules) {
_module = _cfgprivate.modules[key];
if (typeof (_module) === 'function') { continue; }
if (_module.isActive()) {
var _subcfg = _module.getActiveVars(override);
for (var subkey in _subcfg) {
if ((typeof vars[subkey] == 'undefined') || (vars[subkey] == '')) {
vars[subkey] = _subcfg[subkey];
}
else {
if (!!override) {
vars[subkey] = _subcfg[subkey];
}
}
}
var curr = getCurrentModule();
if ((!!curr) && (!!curr.getName()) && ((curr.getName() != getName()) || typeof getName() == 'undefined')) {
var _currcfg = curr.getActiveVars(true);
for (var currkey in _subcfg) {
if ((_subcfg[subkey] == "") && (!!vars[subkey])) {
delete vars[subkey];
}
else {
vars[subkey] = _subcfg[subkey];
}
}
}
}
}
return vars;
}
function setModule(moduleName, moduleobj, activate) {
if ((!!moduleName) && (!!moduleobj) && (!!moduleobj.isModule) && (typeof _cfgprivate.modules[moduleName] == 'undefined') && (moduleName != '')) {
_cfgprivate.modules[moduleName] = moduleobj;
if (!moduleobj.isActive() && ((!!activate) || (typeof activate === 'undefined'))) {
moduleobj.toggleActive();
}
return true;
}
else {
return false;
}
}
function getModule(moduleName) {
if ((typeof _cfgprivate.modules[moduleName] != 'undefined') && (_cfgprivate.modules[moduleName].isModule)) {
return _cfgprivate.modules[moduleName];
}
else {
return;
}
}
function getCurrentModule() {
return _cfgprivate.currentModule;
}
function setCurrentModule(moduleName) {
oldcurr = getCurrentModule();
if (!!oldcurr) {
oldcurr.toggleActive();
}
newcurr = getModule(moduleName);
if (!!newcurr) {
_cfgprivate.currentModule = newcurr;
if (!newcurr.isActive()) {
newcurr.toggleActive();
}
return true;
}
else {
return false;
}
}
if (!!activate) {
_cfgprivate.isactive = true;
}
return {
"url": _cfg.url,
"channel": _cfg.channel,
"getVar": getVar,
"getVars": getVars,
"getName": getName,
"getActiveVars": getActiveVars,
"setVar": setVar,
"deleteVar": deleteVar,
"addModule": setModule,
"getModule": getModule,
"isModule": true,
"isActive": isActive,
"toggleActive": toggleActive,
"getCurrentModule": getCurrentModule,
"setCurrentModule": setCurrentModule
}
}
return init(params, activate);
});
this.PageModule = PageModule;
var getSponsorTags = function () {
var sponsors = {};
$('script[type="analytics-sponsorship"]').each(function () {
$sponsor = $(this);
itemcontent = $sponsor.html().match(/\*([^*]*)\*/)[1];
var itemobj = $.parseJSON(itemcontent);
sid = itemobj.sponsorId || "";
sk = itemobj.sponsorKind || "";
sa = itemobj.sponsorArea || "";
sact = itemobj.sponsorActivation || "";
acttype = itemobj.sponsorActivationType || "";
var skey = sid + sk + sa + sact;
if (acttype.toLowerCase() != "moduleload") {
if (!!sponsors[skey] == false) {
sponsors[skey] = itemobj;
sponsors[skey].count = 1;
}
else {
sponsors[skey].count = sponsors[skey].count + 1;
}
}
});
return sponsors;
};
this.getSponsorTags = getSponsorTags;
var getActiveSponsors = function (activationType, activationSelector) {
if (!!w.fifa.analytics.pageSponsors == false) {
w.fifa.analytics.pageSponsors = w.fifa.analytics.getSponsorTags();
}
if (!(!!activationType || !!activationSelector)) {
return w.fifa.analytics.pageSponsors;
}
else {
var sponsors = {};
switch (activationType) {
case "moduleload":
$item = $(activationSelector);
if ($item.size() > 0) {
$items = $item.find('script[type="analytics-sponsorship"]');
$items.each(function () {
$sponsor = $(this);
if ($sponsor.size() > 0) {
itemcontent = $sponsor.html().match(/\*([^*]*)\*/)[1];
var itemobj = $.parseJSON(itemcontent);
acttype = itemobj.sponsorActivationType || "";
if (acttype == "moduleload") {
sid = itemobj.sponsorId || "";
sk = itemobj.sponsorKind || "";
sa = itemobj.sponsorArea || "";
sact = itemobj.sponsorActivation || "";
var skey = sid + sk + sa + sact;
if (!!sponsors[skey] == false) {
sponsors[skey] = itemobj;
sponsors[skey].count = 1;
}
else {
sponsors[skey].count = sponsors[skey].count + 1;
}
}
}
});
}
break;
}
return sponsors;
}
};
this.getActiveSponsors = getActiveSponsors;
return this;
}).call(Analytics || {});
w.fifa.analytics = Analytics;
var baseconf = w.analyticsbase || {};
var Page = w.fifa.analytics.PageModule(baseconf, true);
w.fifa.analytics.Page = Page;
ChartbeatManager = w.fifa.analytics.ChartbeatManager || (function () {
return function (_params) {
var _defaults = {
cbuid: 342,
cbdomain: 'fifa.com',
qsparams: '',
addsections: '',
authors: 'web'
},
_cfg = function () {
var pars;
if (typeof (_params) != 'undefined') {
pars = _params;
for (var key in _defaults) {
if ((typeof pars[key] == 'undefined') || pars[key] == '') {
pars[key] = _defaults[key];
}
}
}
else {
pars = _defaults;
}
return pars;
}();
return {
getDomain: function () {
if ((document.domain.indexOf("gold.fifa.com") > -1) || (document.domain.indexOf("stg.fifa.com") > -1) || (document.domain.indexOf("dev.fifa.deltatre.it") > -1)) {
return "stg.fifa.com";
}
else {
return _cfg.cbdomain;
}
},
getUid: function () {
return _cfg.cbuid;
},
getQsParams: function () {
return _cfg.qsparams;
},
isCbCanonical: function () {
if (location.href.indexOf(".html#") > -1) {
return false;
}
else {
return true;
}
},
getAddSections: function (initcomma) {
function getwpsect() {
return _cfg.addsections;
};
function geturlsect() {
var sect = "";
var exp = new RegExp("match=([A-Za-z_0-9]*\-)*([0-9]+)/index");
if (exp.test(window.location.pathname)) {
sect = "matchpages";
}
exp = new RegExp("(fifa.com/|^/|world-match-centre/)(worldcup/index.html|confederationscup/index.html|u17worldcup/index.html|womensworldcup/index.html|u20worldcup/index.html|futsalworldcup/index.html|clubworldcup/index.html|u20womensworldcup/index.html|beachsoccerworldcup/index.html|womensolympic/index.html|mensolympic/index.html|u17womensworldcup/index.html|southamerica/index.html|interactiveworldcup/index.html|uefachampionsleague/index.html|cafchampionsleague/index.html|copalibertadores/index.html|afcchampionsleague/index.html|cocacafchampionsleague/index.html|ofcchampionsleague/index.html|nationalleague=([A-Za-z_0-9]*\-)*([0-9]+)/index)");
if (exp.test(window.location.pathname)) {
if (sect.length > 0) {
sect = sect + ",";
}
sect = sect + "maincompetitionpage";
}
return sect;
};
var sct = getwpsect();
if ((!!initcomma) && (sct != "")) {
sct = "," + sct;
}
if (((sct != "") || (initcomma)) && (geturlsect() != "")) {
sct = sct + ",";
}
sct = sct + geturlsect();
return sct;
},
getAuthors: function() {
return _cfg.authors;
},
getPath : function() {
var pth = window.location.pathname;
if (pth.slice(-1)=='/') {
return pth + 'index.html';
}
else {
return window.location.pathname;
}
}
}
}();
});
w.fifa.analytics.ChartbeatManager = ChartbeatManager;
var _cbcfg = {
cbdomain: w.analyticsbase.chartbeatDomain || '',
addsections: baseconf.chartbeatSections || '',
authors: baseconf.chartbeatAuthors || ''
};
w.fifa.analytics.Chartbeat = w.fifa.analytics.ChartbeatManager(_cbcfg);
})(document, window);

;/*
RequireJS 2.1.9 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
Available via the MIT or new BSD license.
see: http://github.com/jrburke/requirejs for details
*/
var requirejs,require,define;
(function(Z){function H(b){return"[object Function]"===L.call(b)}function I(b){return"[object Array]"===L.call(b)}function y(b,c){if(b){var e;for(e=0;e<b.length&&(!b[e]||!c(b[e],e,b));e+=1);}}function M(b,c){if(b){var e;for(e=b.length-1;-1<e&&(!b[e]||!c(b[e],e,b));e-=1);}}function t(b,c){return ga.call(b,c)}function l(b,c){return t(b,c)&&b[c]}function F(b,c){for(var e in b)if(t(b,e)&&c(b[e],e))break}function Q(b,c,e,h){c&&F(c,function(c,j){if(e||!t(b,j))h&&"string"!==typeof c?(b[j]||(b[j]={}),Q(b[j],
c,e,h)):b[j]=c});return b}function u(b,c){return function(){return c.apply(b,arguments)}}function aa(b){throw b;}function ba(b){if(!b)return b;var c=Z;y(b.split("."),function(b){c=c[b]});return c}function A(b,c,e,h){c=Error(c+"\nhttp://requirejs.org/docs/errors.html#"+b);c.requireType=b;c.requireModules=h;e&&(c.originalError=e);return c}function ha(b){function c(a,f,b){var d,m,c,g,e,h,j,i=f&&f.split("/");d=i;var n=k.map,p=n&&n["*"];if(a&&"."===a.charAt(0))if(f){d=l(k.pkgs,f)?i=[f]:i.slice(0,i.length-
1);f=a=d.concat(a.split("/"));for(d=0;f[d];d+=1)if(m=f[d],"."===m)f.splice(d,1),d-=1;else if(".."===m)if(1===d&&(".."===f[2]||".."===f[0]))break;else 0<d&&(f.splice(d-1,2),d-=2);d=l(k.pkgs,f=a[0]);a=a.join("/");d&&a===f+"/"+d.main&&(a=f)}else 0===a.indexOf("./")&&(a=a.substring(2));if(b&&n&&(i||p)){f=a.split("/");for(d=f.length;0<d;d-=1){c=f.slice(0,d).join("/");if(i)for(m=i.length;0<m;m-=1)if(b=l(n,i.slice(0,m).join("/")))if(b=l(b,c)){g=b;e=d;break}if(g)break;!h&&(p&&l(p,c))&&(h=l(p,c),j=d)}!g&&
h&&(g=h,e=j);g&&(f.splice(0,e,g),a=f.join("/"))}return a}function e(a){z&&y(document.getElementsByTagName("script"),function(f){if(f.getAttribute("data-requiremodule")===a&&f.getAttribute("data-requirecontext")===i.contextName)return f.parentNode.removeChild(f),!0})}function h(a){var f=l(k.paths,a);if(f&&I(f)&&1<f.length)return f.shift(),i.require.undef(a),i.require([a]),!0}function $(a){var f,b=a?a.indexOf("!"):-1;-1<b&&(f=a.substring(0,b),a=a.substring(b+1,a.length));return[f,a]}function n(a,f,
b,d){var m,B,g=null,e=f?f.name:null,h=a,j=!0,k="";a||(j=!1,a="_@r"+(L+=1));a=$(a);g=a[0];a=a[1];g&&(g=c(g,e,d),B=l(r,g));a&&(g?k=B&&B.normalize?B.normalize(a,function(a){return c(a,e,d)}):c(a,e,d):(k=c(a,e,d),a=$(k),g=a[0],k=a[1],b=!0,m=i.nameToUrl(k)));b=g&&!B&&!b?"_unnormalized"+(M+=1):"";return{prefix:g,name:k,parentMap:f,unnormalized:!!b,url:m,originalName:h,isDefine:j,id:(g?g+"!"+k:k)+b}}function q(a){var f=a.id,b=l(p,f);b||(b=p[f]=new i.Module(a));return b}function s(a,f,b){var d=a.id,m=l(p,
d);if(t(r,d)&&(!m||m.defineEmitComplete))"defined"===f&&b(r[d]);else if(m=q(a),m.error&&"error"===f)b(m.error);else m.on(f,b)}function v(a,f){var b=a.requireModules,d=!1;if(f)f(a);else if(y(b,function(f){if(f=l(p,f))f.error=a,f.events.error&&(d=!0,f.emit("error",a))}),!d)j.onError(a)}function w(){R.length&&(ia.apply(G,[G.length-1,0].concat(R)),R=[])}function x(a){delete p[a];delete T[a]}function E(a,f,b){var d=a.map.id;a.error?a.emit("error",a.error):(f[d]=!0,y(a.depMaps,function(d,c){var g=d.id,
e=l(p,g);e&&(!a.depMatched[c]&&!b[g])&&(l(f,g)?(a.defineDep(c,r[g]),a.check()):E(e,f,b))}),b[d]=!0)}function C(){var a,f,b,d,m=(b=1E3*k.waitSeconds)&&i.startTime+b<(new Date).getTime(),c=[],g=[],j=!1,l=!0;if(!U){U=!0;F(T,function(b){a=b.map;f=a.id;if(b.enabled&&(a.isDefine||g.push(b),!b.error))if(!b.inited&&m)h(f)?j=d=!0:(c.push(f),e(f));else if(!b.inited&&(b.fetched&&a.isDefine)&&(j=!0,!a.prefix))return l=!1});if(m&&c.length)return b=A("timeout","Load timeout for modules: "+c,null,c),b.contextName=
i.contextName,v(b);l&&y(g,function(a){E(a,{},{})});if((!m||d)&&j)if((z||da)&&!V)V=setTimeout(function(){V=0;C()},50);U=!1}}function D(a){t(r,a[0])||q(n(a[0],null,!0)).init(a[1],a[2])}function J(a){var a=a.currentTarget||a.srcElement,b=i.onScriptLoad;a.detachEvent&&!W?a.detachEvent("onreadystatechange",b):a.removeEventListener("load",b,!1);b=i.onScriptError;(!a.detachEvent||W)&&a.removeEventListener("error",b,!1);return{node:a,id:a&&a.getAttribute("data-requiremodule")}}function K(){var a;for(w();G.length;){a=
G.shift();if(null===a[0])return v(A("mismatch","Mismatched anonymous define() module: "+a[a.length-1]));D(a)}}var U,X,i,N,V,k={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{},config:{}},p={},T={},Y={},G=[],r={},S={},L=1,M=1;N={require:function(a){return a.require?a.require:a.require=i.makeRequire(a.map)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports?a.exports:a.exports=r[a.map.id]={}},module:function(a){return a.module?a.module:a.module={id:a.map.id,uri:a.map.url,config:function(){var b=
l(k.pkgs,a.map.id);return(b?l(k.config,a.map.id+"/"+b.main):l(k.config,a.map.id))||{}},exports:r[a.map.id]}}};X=function(a){this.events=l(Y,a.id)||{};this.map=a;this.shim=l(k.shim,a.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0};X.prototype={init:function(a,b,c,d){d=d||{};if(!this.inited){this.factory=b;if(c)this.on("error",c);else this.events.error&&(c=u(this,function(a){this.emit("error",a)}));this.depMaps=a&&a.slice(0);this.errback=c;this.inited=!0;
this.ignore=d.ignore;d.enabled||this.enabled?this.enable():this.check()}},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(!this.fetched){this.fetched=!0;i.startTime=(new Date).getTime();var a=this.map;if(this.shim)i.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],u(this,function(){return a.prefix?this.callPlugin():this.load()}));else return a.prefix?this.callPlugin():this.load()}},load:function(){var a=
this.map.url;S[a]||(S[a]=!0,i.load(this.map.id,a))},check:function(){if(this.enabled&&!this.enabling){var a,b,c=this.map.id;b=this.depExports;var d=this.exports,m=this.factory;if(this.inited)if(this.error)this.emit("error",this.error);else{if(!this.defining){this.defining=!0;if(1>this.depCount&&!this.defined){if(H(m)){if(this.events.error&&this.map.isDefine||j.onError!==aa)try{d=i.execCb(c,m,b,d)}catch(e){a=e}else d=i.execCb(c,m,b,d);this.map.isDefine&&((b=this.module)&&void 0!==b.exports&&b.exports!==
this.exports?d=b.exports:void 0===d&&this.usingExports&&(d=this.exports));if(a)return a.requireMap=this.map,a.requireModules=this.map.isDefine?[this.map.id]:null,a.requireType=this.map.isDefine?"define":"require",v(this.error=a)}else d=m;this.exports=d;if(this.map.isDefine&&!this.ignore&&(r[c]=d,j.onResourceLoad))j.onResourceLoad(i,this.map,this.depMaps);x(c);this.defined=!0}this.defining=!1;this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=
!0)}}else this.fetch()}},callPlugin:function(){var a=this.map,b=a.id,e=n(a.prefix);this.depMaps.push(e);s(e,"defined",u(this,function(d){var m,e;e=this.map.name;var g=this.map.parentMap?this.map.parentMap.name:null,h=i.makeRequire(a.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){if(d.normalize&&(e=d.normalize(e,function(a){return c(a,g,!0)})||""),d=n(a.prefix+"!"+e,this.map.parentMap),s(d,"defined",u(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),
e=l(p,d.id)){this.depMaps.push(d);if(this.events.error)e.on("error",u(this,function(a){this.emit("error",a)}));e.enable()}}else m=u(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),m.error=u(this,function(a){this.inited=!0;this.error=a;a.requireModules=[b];F(p,function(a){0===a.map.id.indexOf(b+"_unnormalized")&&x(a.map.id)});v(a)}),m.fromText=u(this,function(d,c){var e=a.name,g=n(e),B=O;c&&(d=c);B&&(O=!1);q(g);t(k.config,b)&&(k.config[e]=k.config[b]);try{j.exec(d)}catch(ca){return v(A("fromtexteval",
"fromText eval for "+b+" failed: "+ca,ca,[b]))}B&&(O=!0);this.depMaps.push(g);i.completeLoad(e);h([e],m)}),d.load(a.name,h,m,k)}));i.enable(e,this);this.pluginMaps[e.id]=e},enable:function(){T[this.map.id]=this;this.enabling=this.enabled=!0;y(this.depMaps,u(this,function(a,b){var c,d;if("string"===typeof a){a=n(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap);this.depMaps[b]=a;if(c=l(N,a.id)){this.depExports[b]=c(this);return}this.depCount+=1;s(a,"defined",u(this,function(a){this.defineDep(b,
a);this.check()}));this.errback&&s(a,"error",u(this,this.errback))}c=a.id;d=p[c];!t(N,c)&&(d&&!d.enabled)&&i.enable(a,this)}));F(this.pluginMaps,u(this,function(a){var b=l(p,a.id);b&&!b.enabled&&i.enable(a,this)}));this.enabling=!1;this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]);c.push(b)},emit:function(a,b){y(this.events[a],function(a){a(b)});"error"===a&&delete this.events[a]}};i={config:k,contextName:b,registry:p,defined:r,urlFetched:S,defQueue:G,Module:X,makeModuleMap:n,
nextTick:j.nextTick,onError:v,configure:function(a){a.baseUrl&&"/"!==a.baseUrl.charAt(a.baseUrl.length-1)&&(a.baseUrl+="/");var b=k.pkgs,c=k.shim,d={paths:!0,config:!0,map:!0};F(a,function(a,b){d[b]?"map"===b?(k.map||(k.map={}),Q(k[b],a,!0,!0)):Q(k[b],a,!0):k[b]=a});a.shim&&(F(a.shim,function(a,b){I(a)&&(a={deps:a});if((a.exports||a.init)&&!a.exportsFn)a.exportsFn=i.makeShimExports(a);c[b]=a}),k.shim=c);a.packages&&(y(a.packages,function(a){a="string"===typeof a?{name:a}:a;b[a.name]={name:a.name,
location:a.location||a.name,main:(a.main||"main").replace(ja,"").replace(ea,"")}}),k.pkgs=b);F(p,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=n(b))});if(a.deps||a.callback)i.require(a.deps||[],a.callback)},makeShimExports:function(a){return function(){var b;a.init&&(b=a.init.apply(Z,arguments));return b||a.exports&&ba(a.exports)}},makeRequire:function(a,f){function h(d,c,e){var g,k;f.enableBuildCallback&&(c&&H(c))&&(c.__requireJsBuild=!0);if("string"===typeof d){if(H(c))return v(A("requireargs",
"Invalid require call"),e);if(a&&t(N,d))return N[d](p[a.id]);if(j.get)return j.get(i,d,a,h);g=n(d,a,!1,!0);g=g.id;return!t(r,g)?v(A("notloaded",'Module name "'+g+'" has not been loaded yet for context: '+b+(a?"":". Use require([])"))):r[g]}K();i.nextTick(function(){K();k=q(n(null,a));k.skipMap=f.skipMap;k.init(d,c,e,{enabled:!0});C()});return h}f=f||{};Q(h,{isBrowser:z,toUrl:function(b){var f,e=b.lastIndexOf("."),g=b.split("/")[0];if(-1!==e&&(!("."===g||".."===g)||1<e))f=b.substring(e,b.length),b=
b.substring(0,e);return i.nameToUrl(c(b,a&&a.id,!0),f,!0)},defined:function(b){return t(r,n(b,a,!1,!0).id)},specified:function(b){b=n(b,a,!1,!0).id;return t(r,b)||t(p,b)}});a||(h.undef=function(b){w();var c=n(b,a,!0),f=l(p,b);e(b);delete r[b];delete S[c.url];delete Y[b];f&&(f.events.defined&&(Y[b]=f.events),x(b))});return h},enable:function(a){l(p,a.id)&&q(a).enable()},completeLoad:function(a){var b,c,d=l(k.shim,a)||{},e=d.exports;for(w();G.length;){c=G.shift();if(null===c[0]){c[0]=a;if(b)break;b=
!0}else c[0]===a&&(b=!0);D(c)}c=l(p,a);if(!b&&!t(r,a)&&c&&!c.inited){if(k.enforceDefine&&(!e||!ba(e)))return h(a)?void 0:v(A("nodefine","No define call for "+a,null,[a]));D([a,d.deps||[],d.exportsFn])}C()},nameToUrl:function(a,b,c){var d,e,h,g,i,n;if(j.jsExtRegExp.test(a))g=a+(b||"");else{d=k.paths;e=k.pkgs;g=a.split("/");for(i=g.length;0<i;i-=1)if(n=g.slice(0,i).join("/"),h=l(e,n),n=l(d,n)){I(n)&&(n=n[0]);g.splice(0,i,n);break}else if(h){a=a===h.name?h.location+"/"+h.main:h.location;g.splice(0,i,
a);break}g=g.join("/");g+=b||(/^data\:|\?/.test(g)||c?"":".js");g=("/"===g.charAt(0)||g.match(/^[\w\+\.\-]+:/)?"":k.baseUrl)+g}return k.urlArgs?g+((-1===g.indexOf("?")?"?":"&")+k.urlArgs):g},load:function(a,b){j.load(i,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if("load"===a.type||ka.test((a.currentTarget||a.srcElement).readyState))P=null,a=J(a),i.completeLoad(a.id)},onScriptError:function(a){var b=J(a);if(!h(b.id))return v(A("scripterror","Script error for: "+b.id,
a,[b.id]))}};i.require=i.makeRequire();return i}var j,w,x,C,J,D,P,K,q,fa,la=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,ma=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,ea=/\.js$/,ja=/^\.\//;w=Object.prototype;var L=w.toString,ga=w.hasOwnProperty,ia=Array.prototype.splice,z=!!("undefined"!==typeof window&&"undefined"!==typeof navigator&&window.document),da=!z&&"undefined"!==typeof importScripts,ka=z&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,W="undefined"!==typeof opera&&
"[object Opera]"===opera.toString(),E={},s={},R=[],O=!1;if("undefined"===typeof define){if("undefined"!==typeof requirejs){if(H(requirejs))return;s=requirejs;requirejs=void 0}"undefined"!==typeof require&&!H(require)&&(s=require,require=void 0);j=requirejs=function(b,c,e,h){var q,n="_";!I(b)&&"string"!==typeof b&&(q=b,I(c)?(b=c,c=e,e=h):b=[]);q&&q.context&&(n=q.context);(h=l(E,n))||(h=E[n]=j.s.newContext(n));q&&h.configure(q);return h.require(b,c,e)};j.config=function(b){return j(b)};j.nextTick="undefined"!==
typeof setTimeout?function(b){setTimeout(b,4)}:function(b){b()};require||(require=j);j.version="2.1.9";j.jsExtRegExp=/^\/|:|\?|\.js$/;j.isBrowser=z;w=j.s={contexts:E,newContext:ha};j({});y(["toUrl","undef","defined","specified"],function(b){j[b]=function(){var c=E._;return c.require[b].apply(c,arguments)}});if(z&&(x=w.head=document.getElementsByTagName("head")[0],C=document.getElementsByTagName("base")[0]))x=w.head=C.parentNode;j.onError=aa;j.createNode=function(b){var c=b.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml",
"html:script"):document.createElement("script");c.type=b.scriptType||"text/javascript";c.charset="utf-8";c.async=!0;return c};j.load=function(b,c,e){var h=b&&b.config||{};if(z)return h=j.createNode(h,c,e),h.setAttribute("data-requirecontext",b.contextName),h.setAttribute("data-requiremodule",c),h.attachEvent&&!(h.attachEvent.toString&&0>h.attachEvent.toString().indexOf("[native code"))&&!W?(O=!0,h.attachEvent("onreadystatechange",b.onScriptLoad)):(h.addEventListener("load",b.onScriptLoad,!1),h.addEventListener("error",
b.onScriptError,!1)),h.src=e,K=h,C?x.insertBefore(h,C):x.appendChild(h),K=null,h;if(da)try{importScripts(e),b.completeLoad(c)}catch(l){b.onError(A("importscripts","importScripts failed for "+c+" at "+e,l,[c]))}};z&&!s.skipDataMain&&M(document.getElementsByTagName("script"),function(b){x||(x=b.parentNode);if(J=b.getAttribute("data-main"))return q=J,s.baseUrl||(D=q.split("/"),q=D.pop(),fa=D.length?D.join("/")+"/":"./",s.baseUrl=fa),q=q.replace(ea,""),j.jsExtRegExp.test(q)&&(q=J),s.deps=s.deps?s.deps.concat(q):
[q],!0});define=function(b,c,e){var h,j;"string"!==typeof b&&(e=c,c=b,b=null);I(c)||(e=c,c=null);!c&&H(e)&&(c=[],e.length&&(e.toString().replace(la,"").replace(ma,function(b,e){c.push(e)}),c=(1===e.length?["require"]:["require","exports","module"]).concat(c)));if(O){if(!(h=K))P&&"interactive"===P.readyState||M(document.getElementsByTagName("script"),function(b){if("interactive"===b.readyState)return P=b}),h=P;h&&(b||(b=h.getAttribute("data-requiremodule")),j=E[h.getAttribute("data-requirecontext")])}(j?
j.defQueue:R).push([b,c,e])};define.amd={jQuery:!0};j.exec=function(b){return eval(b)};j(s)}})(this);

;/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
* Build: http://modernizr.com/download/#-touch-printshiv-cssclasses-addtest-teststyles-prefixes-load
*/
; window.Modernizr = function (a, b, c) { function w(a) { j.cssText = a } function x(a, b) { return w(m.join(a + ";") + (b || "")) } function y(a, b) { return typeof a === b } function z(a, b) { return !!~("" + a).indexOf(b) } function A(a, b, d) { for (var e in a) { var f = b[a[e]]; if (f !== c) return d === !1 ? a[e] : y(f, "function") ? f.bind(d || b) : f } return !1 } var d = "2.7.1", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k, l = {}.toString, m = " -webkit- -moz- -o- -ms- ".split(" "), n = {}, o = {}, p = {}, q = [], r = q.slice, s, t = function (a, c, d, e) { var f, i, j, k, l = b.createElement("div"), m = b.body, n = m || b.createElement("body"); if (parseInt(d, 10)) while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j); return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i }, u = {}.hasOwnProperty, v; !y(u, "undefined") && !y(u.call, "undefined") ? v = function (a, b) { return u.call(a, b) } : v = function (a, b) { return b in a && y(a.constructor.prototype[b], "undefined") }, Function.prototype.bind || (Function.prototype.bind = function (b) { var c = this; if (typeof c != "function") throw new TypeError; var d = r.call(arguments, 1), e = function () { if (this instanceof e) { var a = function () { }; a.prototype = c.prototype; var f = new a, g = c.apply(f, d.concat(r.call(arguments))); return Object(g) === g ? g : f } return c.apply(b, d.concat(r.call(arguments))) }; return e }), n.touch = function () { var c; return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : t(["@media (", m.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (a) { c = a.offsetTop === 9 }), c }; for (var B in n) v(n, B) && (s = B.toLowerCase(), e[s] = n[B](), q.push((e[s] ? "" : "no-") + s)); return e.addTest = function (a, b) { if (typeof a == "object") for (var d in a) v(a, d) && e.addTest(d, a[d]); else { a = a.toLowerCase(); if (e[a] !== c) return e; b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b } return e }, w(""), i = k = null, e._version = d, e._prefixes = m, e.testStyles = t, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + q.join(" ") : ""), e }(this, this.document), function (a, b) { function l(a, b) { var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement; return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild) } function m() { var a = s.elements; return typeof a == "string" ? a.split(" ") : a } function n(a) { var b = j[a[h]]; return b || (b = {}, i++, a[h] = i, j[i] = b), b } function o(a, c, d) { c || (c = b); if (k) return c.createElement(a); d || (d = n(c)); var g; return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g } function p(a, c) { a || (a = b); if (k) return a.createDocumentFragment(); c = c || n(a); var d = c.frag.cloneNode(), e = 0, f = m(), g = f.length; for (; e < g; e++) d.createElement(f[e]); return d } function q(a, b) { b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) { return s.shivMethods ? o(c, a, b) : b.createElem(c) }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/\w+/g, function (a) { return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")' }) + ");return n}")(s, b.frag) } function r(a) { a || (a = b); var c = n(a); return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a } function w(a) { var b, c = a.getElementsByTagName("*"), d = c.length, e = RegExp("^(?:" + m().join("|") + ")$", "i"), f = []; while (d--) b = c[d], e.test(b.nodeName) && f.push(b.applyElement(x(b))); return f } function x(a) { var b, c = a.attributes, d = c.length, e = a.ownerDocument.createElement(u + ":" + a.nodeName); while (d--) b = c[d], b.specified && e.setAttribute(b.nodeName, b.nodeValue); return e.style.cssText = a.style.cssText, e } function y(a) { var b, c = a.split("{"), d = c.length, e = RegExp("(^|[\\s,>+~])(" + m().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"), f = "$1" + u + "\\:$2"; while (d--) b = c[d] = c[d].split("}"), b[b.length - 1] = b[b.length - 1].replace(e, f), c[d] = b.join("}"); return c.join("{") } function z(a) { var b = a.length; while (b--) a[b].removeNode() } function A(a) { function g() { clearTimeout(d._removeSheetTimer), b && b.removeNode(!0), b = null } var b, c, d = n(a), e = a.namespaces, f = a.parentWindow; return !v || a.printShived ? a : (typeof e[u] == "undefined" && e.add(u), f.attachEvent("onbeforeprint", function () { g(); var d, e, f, h = a.styleSheets, i = [], j = h.length, k = Array(j); while (j--) k[j] = h[j]; while (f = k.pop()) if (!f.disabled && t.test(f.media)) { try { d = f.imports, e = d.length } catch (m) { e = 0 } for (j = 0; j < e; j++) k.push(d[j]); try { i.push(f.cssText) } catch (m) { } } i = y(i.reverse().join("")), c = w(a), b = l(a, i) }), f.attachEvent("onafterprint", function () { z(c), clearTimeout(d._removeSheetTimer), d._removeSheetTimer = setTimeout(g, 500) }), a.printShived = !0, a) } var c = "3.7.0", d = a.html5 || {}, e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, g, h = "_html5shiv", i = 0, j = {}, k; (function () { try { var a = b.createElement("a"); a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function () { b.createElement("a"); var a = b.createDocumentFragment(); return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined" }() } catch (c) { g = !0, k = !0 } })(); var s = { elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video", version: c, shivCSS: d.shivCSS !== !1, supportsUnknownElements: k, shivMethods: d.shivMethods !== !1, type: "default", shivDocument: r, createElement: o, createDocumentFragment: p }; a.html5 = s, r(b); var t = /^$|\b(?:all|print)\b/, u = "html5shiv", v = !k && function () { var c = b.documentElement; return typeof b.namespaces != "undefined" && typeof b.parentWindow != "undefined" && typeof c.applyElement != "undefined" && typeof c.removeNode != "undefined" && typeof a.attachEvent != "undefined" }(); s.type += " print", s.shivPrint = A, A(b) }(this, document), function (a, b, c) { function d(a) { return "[object Function]" == o.call(a) } function e(a) { return "string" == typeof a } function f() { } function g(a) { return !a || "loaded" == a || "complete" == a || "uninitialized" == a } function h() { var a = p.shift(); q = 1, a ? a.t ? m(function () { ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1) }, 0) : (a(), h()) : q = 0 } function i(a, c, d, e, f, i, j) { function k(b) { if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) { "img" != a && m(function () { t.removeChild(l) }, 50); for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload() } } var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = { t: d, s: c, e: f, a: i, x: j }; 1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () { k.call(this, r) }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l)) } function j(a, b, c, d, f) { return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this } function k() { var a = B; return a.loader = { load: j, i: 0 }, a } var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function (a) { return "[object Array]" == o.call(a) }, x = [], y = {}, z = { timeout: function (a, b) { return b.length && (a.timeout = b[0]), a } }, A, B; B = function (a) { function b(a) { var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = { url: c, origUrl: c, prefixes: a }, e, f, g; for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g)); for (f = 0; f < b; f++) c = x[f](c); return c } function g(a, e, f, g, h) { var i = b(a), j = i.autoCallback; i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () { k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2 }))) } function h(a, b) { function c(a, c) { if (a) { if (e(a)) c || (j = function () { var a = [].slice.call(arguments); k.apply(this, a), l() }), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function () { var b = 0, c; for (c in a) a.hasOwnProperty(c) && b++; return b }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () { var a = [].slice.call(arguments); k.apply(this, a), l() } : j[n] = function (a) { return function () { var b = [].slice.call(arguments); a && a.apply(this, b), l() } }(k[n])), g(a[n], j, b, n, h)) } else !c && l() } var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n; c(h ? a.yep : a.nope, !!i), i && c(i) } var i, j, l = this.yepnope.loader; if (e(a)) g(a, 0, l, 0); else if (w(a)) for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l) }, B.addPrefix = function (a, b) { z[a] = b }, B.addFilter = function (a) { x.push(a) }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () { b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete" }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) { var k = b.createElement("script"), l, o, e = e || B.errorTimeout; k.src = a; for (o in d) k.setAttribute(o, d[o]); c = j ? h : c || f, k.onreadystatechange = k.onload = function () { !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null) }, m(function () { l || (l = 1, c(1)) }, e), i ? k.onload() : n.parentNode.insertBefore(k, n) }, a.yepnope.injectCss = function (a, c, d, e, g, i) { var e = b.createElement("link"), j, c = i ? h : c || f; e.href = a, e.rel = "stylesheet", e.type = "text/css"; for (j in d) e.setAttribute(j, d[j]); g || (n.parentNode.insertBefore(e, n), m(c, 0)) } }(this, document), Modernizr.load = function () { yepnope.apply(window, [].slice.call(arguments, 0)) };
(function (w) {
Modernizr.addTest('featurephone', function () {
if ('desktop' === 'desktop') { return false; }
if (w.localStorage) {
var disableTouch = w.location.search.indexOf('?enabletouch=false') > -1;
if (disableTouch) {
w.localStorage.setItem('enabletouch', '0');
}
var enableTouch = w.localStorage.getItem('enabletouch') === '1' || w.location.search.indexOf('?enabletouch=true') > -1;
if (enableTouch) {
w.localStorage.setItem('enabletouch', '1');
return false;
}
}
return !(Modernizr.touch || w.navigator.msPointerEnabled);
});
}(window));

;(function (d, w) {
if (!Array.prototype.indexOf) {
Array.prototype.indexOf = function (searchElement, fromIndex) {
if (this === undefined || this === null) {
throw new TypeError('"this" is null or not defined');
}
var length = this.length >>> 0;
fromIndex = +fromIndex || 0;
if (Math.abs(fromIndex) === Infinity) {
fromIndex = 0;
}
if (fromIndex < 0) {
fromIndex += length;
if (fromIndex < 0) {
fromIndex = 0;
}
}
for (; fromIndex < length; fromIndex++) {
if (this[fromIndex] === searchElement) {
return fromIndex;
}
}
return -1;
};
}
if (!d.querySelectorAll) {
var s = d.createStyleSheet();
d.querySelectorAll = function (r, c, i, j, a) {
var a = d.all, c = [], r = r.replace(/\[for\b/gi, '[htmlFor').split(','), l = r.length, l_j;
for (i = l; i--;) {
s.addRule(r[i], 'k:v');
l_j = a.length;
for (j = l_j; j--;) { a[j].currentStyle.k && c.push(a[j]); }
s.removeRule(0);
}
return c;
}
}
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
var msViewportStyle = d.createElement("style");
msViewportStyle.appendChild(d.createTextNode("@-ms-viewport{width:auto!important}"));
d.getElementsByTagName("head")[0].appendChild(msViewportStyle);
}
if (!String.prototype.trim) {
String.prototype.trim = function () {
return this.replace(/^\s+|\s+$/gm, '');
};
}
if (!String.prototype.endsWith) {
String.prototype.endsWith = function (pattern) {
var i = pattern.length,
l = this.length;
for (var i, l; i--;) {
if (this.charAt(--l) !== pattern.charAt(i)) {
return false;
}
}
return true;
};
}
w._tweetAutoEmbed = function () {
var _tweets = d.querySelectorAll('.twitter-tweet');
if (_tweets.length) {
w.twttr = (function (d, s, id) {
var t;
if (!d.getElementById(id)) {
if (!d.querySelectorAll('script[src*="platform.twitter.com/widgets.js"]').length) {
var js, fjs = d.getElementsByTagName(s)[0];
js = d.createElement(s);
js.id = id;
js.src = "https://platform.twitter.com/widgets.js";
fjs.parentNode.insertBefore(js, fjs);
}
}
return w.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
}(d, "script", "twitter-wjs"));
w.twttr.ready(function (twttr) {
twttr.widgets.load();
});
}
};
if (d.addEventListener) {
d.addEventListener("DOMContentLoaded", w._tweetAutoEmbed, false);
w.addEventListener("load", w._tweetAutoEmbed, false);
} else if (d.attachEvent) {
d.attachEvent("onreadystatechange", w._tweetAutoEmbed);
w.attachEvent("onload", w._tweetAutoEmbed);
}
if (!String.prototype.sanitize) {
String.prototype.sanitize = function () {
return this ? this.toString().replace(new RegExp(/[\/<>]/gi), '').replace(new RegExp(/%3[CE]*[\/]*/gi), '') : '';
};
}
if (!String.prototype.toQueryParams) {
String.prototype.toQueryParams = function (separator) {
var q = [];
var match = this.trim().sanitize().match(/([^?#]*)(#.*)?$/);
if (match) {
var qs = match[1].replace("+", " ").split(separator || "&");
var i, qps, name, value;
for (i = 0; i < qs.length; i++) {
qps = qs[i].split("=", 2);
name = unescape(qps[0]);
value = (qps.length == 1) ? undefined : qs[i].substring(name.length + 1);
if (!q[name]) {
q[name] = value;
} else if (typeOf(q[name]) === "array") {
q[name][q[name].length] = value;
} else {
q[name] = [q[name], value];
}
}
}
return q;
}
}
if (!String.prototype.withIgn) {
String.prototype.withIgn = function () {
return this;
return [this, (this.indexOf('?') > -1 ? '&' : '?'), 'ign=', new Date().getTime()].join('');
};
}
if (!String.prototype.withVParam) {
String.prototype.withVParam = function (vParam) {
return [this, (this.indexOf('?') > -1 ? '&' : '?'), 'v=', vParam].join('');
};
}
if (!String.prototype.withRandomShift) {
String.prototype.withRandomShift = function (maxValue) {
if (isNaN(this)) {
return this.toString();
}
return parseInt(this) + Math.floor(Math.random() * (maxValue || 1000));
};
}
if (w.jQuery && !w.jQuery.off && !w.jQuery.fn.off) {
(function ($) {
$.off = $.unbind;
$.fn.off = $.fn.unbind;
$.on = $.bind;
$.fn.on = $.fn.bind;
$.fn.prop = $.fn.attr;
$.isWindow = function (obj) {
return obj != null && obj == obj.window;
};
$.type = function (obj) {
var toString = function (x) { return ({}).toString.call(x); };
return obj == null ?
String(obj) :
class2type[toString(obj)] || "object";
};
var class2type = {};
$.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (i, name) {
class2type["[object " + name + "]"] = name.toLowerCase();
});
$.isPlainObject = function (obj) {
if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
return false;
}
try {
if (obj.constructor &&
!hasOwn.call(obj, "constructor") &&
!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
return false;
}
} catch (e) {
return false;
}
var key;
for (key in obj) { }
return key === undefined || hasOwn.call(obj, key);
};
$.isFunction = function (obj) {
return Object.prototype.toString.call(obj) === "[object Function]";
};
}(w.jQuery));
}
if (w.$ && !w.$.noop) {
$.noop = function () { };
}
if (!Object.keys) {
Object.keys = (function () {
'use strict';
var hasOwnProperty = Object.prototype.hasOwnProperty,
hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
dontEnums = [
'toString',
'toLocaleString',
'valueOf',
'hasOwnProperty',
'isPrototypeOf',
'propertyIsEnumerable',
'constructor'
],
dontEnumsLength = dontEnums.length;
return function (obj) {
if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
throw new TypeError('Object.keys called on non-object');
}
var result = [], prop, i;
for (prop in obj) {
if (hasOwnProperty.call(obj, prop)) {
result.push(prop);
}
}
if (hasDontEnumBug) {
for (i = 0; i < dontEnumsLength; i++) {
if (hasOwnProperty.call(obj, dontEnums[i])) {
result.push(dontEnums[i]);
}
}
}
return result;
};
}());
}
if (!String.prototype.format) {
String.prototype.format = function () {
var re = new RegExp(/\{([\d]*)\}/gi),
value = this, match;
while (match = re.exec(value)) {
value = value.replace(match[0], (arguments[match[1]] || ''));
re.lastIndex = 0;
}
return value;
};
String.prototype.replaceAndFormat = function () {
var re_replace = new RegExp(/\[([\d]*)\]/gi), match, str = this;
while (match = re_replace.exec(str)) {
str = str.replace(match[0], ['{', match[1], '}'].join(''));
re_replace.lastIndex = 0;
}
return str.format.apply(str, arguments);
};
}
if (!String.prototype.getJsTime) {
String.prototype.getDateParts = function (dateTimeSeparator) {
if (!this) { return ''; }
if (!dateTimeSeparator) {
dateTimeSeparator = ' ';
}
var parts = this.split(dateTimeSeparator),
date = parts[0].split('-'),
hh_mm_ss = parts[1].split(':');
if (date.length === 1) {
date = parts[0].split('/');
}
return { date: date, time: hh_mm_ss };
};
String.prototype.getJsTime = function (dateTimeSeparator) {
if (!this) { return ''; }
var date_parts = this.getDateParts(dateTimeSeparator),
date = date_parts.date,
time = date_parts.time;
if (date[2].length >= 4) {
var year = date[2],
dt = date[0];
date[2] = dt;
date[0] = year;
}
return Date.UTC(date[0], parseInt(date[1], 10) - 1, date[2], time[0], time[1], time[2]);
};
}
}(document, window));

;(function (d, w) {
var isReady = false,
errorCallback = function () {
if (w.console) {
w.console.log(this);
}
},
initConfigCallback = function () {
if (isReady) { return; }
isReady = true;
if (w.Modernizr && w.Modernizr.featurephone) {
var adv = d.querySelectorAll('.adv.not-loaded'), adv_length = adv.length,
loadAdv = function (obj) {
googletag.cmd.push(function () {
googletag.display(obj.id);
googletag.pubads().refresh(obj.id);
});
};
for (var i = 0; i < adv_length; i++) {
loadAdv(adv[i]);
}
return;
}
var req = require.config({
baseUrl: [(true ? 'http://js.fifa.com' : ''), '/components/script/require-libs/'].join(''),
urlArgs: ['v=', '635398399903638800'].join('')
});
var requires = d.querySelectorAll('[data-require]'), idx = 0, length = requires.length,
requires_arr = [], data_require, multiple_requires, multiple_idx, multiple_length;
for (idx; idx < length; idx++) {
data_require = requires[idx].getAttribute('data-require');
if (!data_require) { continue; }
multiple_requires = data_require.split('|');
multiple_idx = 0;
multiple_length = multiple_requires.length;
for (multiple_idx; multiple_idx < multiple_length; multiple_idx++) {
if (requires_arr.indexOf(multiple_requires[multiple_idx]) > -1) { continue; }
requires_arr.push(multiple_requires[multiple_idx]);
}
}
if (!requires_arr.length) {
return;
}
req(requires_arr);
};
var _search;
if ('PROD' !== 'PROD' && (_search = (w.localStorage && w.localStorage.getItem('jsconsole')) || (w.location.search)).indexOf('?jsconsole=') > -1) {
var script = d.createElement('script'), fjs = d.getElementsByTagName('script')[0];
script.id = 'jsconsole_debug';
script.src = ['http:/', '/jsconsole.com/remote.js?', _search.substr('?jsconsole='.length)].join('');
fjs.parentNode.insertBefore(script, fjs);
if (w.localStorage) {
w.localStorage.setItem('jsconsole', _search);
}
}
if (d.addEventListener) {
d.addEventListener("DOMContentLoaded", initConfigCallback, false);
/* A fallback to w.onload, that will always work*/
w.addEventListener("load", initConfigCallback, false);
w.addEventListener("error", errorCallback, false);
/* If IE event model is used*/
} else if (d.attachEvent) {
d.attachEvent("onreadystatechange", initConfigCallback);
/* A fallback to w.onload, that will always work*/
w.attachEvent("onload", initConfigCallback);
w.attachEvent("onerror", errorCallback, false);
}
}(document, window));

;/* FIFA.com utility functions */
(function ($, w, d) {
/* console.log fallback (for ie): if console.log is not supported by the browse define it as an empty function*/
if (typeof console === "undefined" || typeof console.log === "undefined") console = { log: function () { } };
/* function user to split the username (or other strings) separating by / every <splitLen> chars */
w.splitResourceId = function (id, splitLen) {
var ret = '';
if (id) {
id = id.toString();
if (id != '') {
for (var i = 0; i < (id.length - id.length % splitLen) / splitLen; i++) {
ret += id.substr(i * splitLen, splitLen) + '/';
}
if (i * splitLen < id.length) ret += id.substr(i * splitLen) + '/';
ret = ret.slice(0, -1);
}
}
return ret;
}
w.openLoginPanel = function () {
$("#siteh-tc-subpanel").show();
}
})(window.jQuery || window.jm, window, document);

;var CallbackManager = {
callbacks: null,
AddCallback: function (modelname, eventName, callbackFunction) {
if (!CallbackManager.callbacks) {
CallbackManager.callbacks = new Array();
}
CallbackManager.callbacks.push({ "model": modelname, "event": eventName, "callback": callbackFunction });
},
RemoveCallbacks: function (modelname, eventName) {
if (CallbackManager.callbacks) {
for (var i = 0; i < CallbackManager.callbacks.length; i++) {
var cbObj = CallbackManager.callbacks[i];
if ((cbObj.model == modelname) && (cbObj.event == eventName)) {
CallbackManager.callbacks.splice(i);
}
}
}
},
RemoveAllCallbacks: function () {
CallbackManager.callbacks = new Array();
},
ApplyCallbacks: function (modelname, eventName) {
if (CallbackManager.callbacks) {
for (var i = 0; i < CallbackManager.callbacks.length; i++) {
var cbObj = CallbackManager.callbacks[i];
if ((cbObj.model == modelname) && (cbObj.event == eventName)) {
cbObj.callback.call();
}
}
}
}
};

;var Cookie = {
setRaw: function (n, v, daysToExp, pg) {
var ex = '';
if (daysToExp != undefined) {
var d = new Date();
d.setTime(d.getTime() + (86400000 * parseFloat(daysToExp)));
ex = '; expires=' + d.toGMTString();
}
var cookieDomain = ".fifa.com";
if (document.location.href.indexOf("localhost") != -1) {
cookieDomain = "localhost";
}
if (pg != undefined) { if (pg != '.') ex += '; path=' + pg; }
else { ex += '; path=/'; }
if (cookieDomain !== undefined && cookieDomain != null && cookieDomain != '')
ex += ";domain=" + cookieDomain;
return (document.cookie = escape(n) + '=' + (v || '') + ex);
},
set: function (n, v, daysToExp, pg) {
return this.setRaw(n, escape(v || ''), daysToExp, pg);
},
get: function (n) {
var c = document.cookie.match(new RegExp('(^|;)\\s*' + escape(n) + '=([^;]*)'));
return (c ? c[2] : null);
},
erase: function (n, pg) {
var c = Cookie.get(n) || true;
Cookie.set(n, '', -1, pg);
return c;
},
accept: function () {
if (typeof (navigator.cookieEnabled) == 'boolean') { return navigator.cookieEnabled; }
Cookie.set('_t', '1'); return (Cookie.erase('_t') === '1');
}
};

;if (window.location.hash == "#_=_") {
window.location.hash = "fblg";
}
var CurrentUser = {
userId: null,
screenName: null,
userEmail: null,
status:"not-logged",
gender: null,
birthdate : null,
preferredLanguage: null,
preferredLeague:null,
preferredTeam: null,
hasAvatar: null,
country: null,
newsLetter: null,
hasFacebook: null,
hasTwitter: null,
hasGoogle: null,
Init: function () {
var c = Cookie.get("FIFACom");
if (c) {
CurrentUser.userId = c.toQueryParams().id;
CurrentUser.screenName = decodeURI(c.toQueryParams().un);
CurrentUser.userEmail = c.toQueryParams().em;
CurrentUser.status = "logged";
CurrentUser.gender = c.toQueryParams().g;
CurrentUser.birthdate = c.toQueryParams().bd;
CurrentUser.preferredLanguage = c.toQueryParams().pln;
CurrentUser.preferredLeague = c.toQueryParams().c1 + "," + c.toQueryParams().c2 + "," + c.toQueryParams().c3;
CurrentUser.preferredTeam = c.toQueryParams().m1 + "," + c.toQueryParams().m2 + "," + c.toQueryParams().m3;
CurrentUser.hasAvatar = (c.toQueryParams().av == "1") ? "true": "false";
CurrentUser.country = c.toQueryParams().ct;
CurrentUser.newsLetter = (c.toQueryParams().nl == "1") ? "true" : "false";
CurrentUser.hasFacebook = (c.toQueryParams().fb == "1") ? "true" : "false";
CurrentUser.hasTwitter = (c.toQueryParams().tw == "1") ? "true" : "false";
CurrentUser.hasGoogle = (c.toQueryParams().gp == "1") ? "true" : "false";
var ap = c.toQueryParams().ap;
CurrentUser.apps = ap ? ap.substr(1, ap.length - 2).split('|') : false;
}
}
};

;window.currentPlatform = "desktop";
managePreferredPlatform();
(function (a, mobileUrl) {
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
window.currentPlatform = "mobile";
if (mobileUrl != "") {
console.log("redirect mobile");
window.location = mobileUrl;
} else {
console.log("NO redirect mobile");
}
} else {
window.currentPlatform = "desktop";
/* if user want to stay on mobile */
var preferredPlatform = sessionStorage.getItem("FIFA_PLFR");
if (preferredPlatform && preferredPlatform == "mobile") {
if (mobileUrl != "") {
window.location = mobileUrl;
}
}
}
})(navigator.userAgent || navigator.vendor || window.opera, getMobileURL());
/* the last null parameter can be replaced with a function name */
function managePreferredPlatform() {
var qs = window.location.search;
if (qs.indexOf("preferredPlatform=desktop") != -1) {
sessionStorage.setItem("FIFA_PLFR", "desktop");
} else if (qs.indexOf("preferredPlatform=mobile") != -1) {
sessionStorage.removeItem("FIFA_PLFR");
}
}
function getMobileURL() {
var pageUrl = window.location.href,
mobileUrl = "",
sitesUrlListObj = document.getElementById("sitesUrlList"),
sitesUrlList = sitesUrlListObj ? sitesUrlListObj.innerHTML : '{}',
jsonLinks = JSON.parse(sitesUrlList),
currentLang = "es",
lsearch = window.location.search;
switch (currentLang.toLowerCase()) {
case "en":
currentLang = "e";
break;
case "de":
currentLang = "d";
break;
case "es":
currentLang = "s";
break;
case "fr":
currentLang = "f";
break;
case "pt":
currentLang = "p";
break;
case "ar":
currentLang = "a";
break;
}
for (var i = 0; i < jsonLinks.length; i++) {
if ((jsonLinks[i].lang.toLowerCase() == currentLang.toLowerCase()) && (jsonLinks[i].platform == "mobile")) {
mobileUrl = jsonLinks[i].url;
}
}
var contextMobileUrl = "";
var metatags = document.getElementsByTagName("meta");
for (var j = 0; j < metatags.length; j++) {
if (metatags[j].name == "mobileRedirectUrl") {
contextMobileUrl = metatags[j].content;
}
}
if (contextMobileUrl && (contextMobileUrl != "")) {
mobileUrl += contextMobileUrl;
} else {
mobileUrl += window.location.pathname;
}
if (lsearch.length > 0) {
mobileUrl = mobileUrl + lsearch;
}
/* if user want to stay on desktop */
var preferredPlatform = sessionStorage.getItem("FIFA_PLFR");
if (preferredPlatform && preferredPlatform == "desktop") {
mobileUrl = "";
}
/* workaround to allow testing gold on mobile devices */
if (window.location.href.indexOf("en.m.gold.fifa.com") != -1) {
mobileUrl = mobileUrl.replace("http://m.fifa.com", "http://en.m.gold.fifa.com");
mobileUrl += window.location.search;
}
/* If I'm already on mobile the the url is cleared so I won't perform any redirection */
if (mobileUrl == window.location.href) {
mobileUrl = "";
}
/* using disableredirect parameter to disable redirection for current call */
if (window.location.search.indexOf("disableredirect=true") != -1) {
mobileUrl = "";
}
console.log("mobileUrl: ", mobileUrl);
return mobileUrl;
}

;/*
============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============
AppMeasurement for JavaScript version: 1.2.1
Copyright 1996-2013 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com
*/
function AppMeasurement(){var s=this;s.version="1.2.1";var w=window;if(!w.s_c_in)w.s_c_il=[],w.s_c_in=0;s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;s._c="s_c";var k=w.fb;k||(k=null);var m=w,i,n;try{i=m.parent;for(n=m.location;i&&i.location&&n&&""+i.location!=""+n&&m.location&&""+i.location!=""+m.location&&i.location.host==n.host;)m=i,i=m.parent}catch(p){}s.Sa=function(s){try{console.log(s)}catch(a){}};s.ja=function(s){return""+parseInt(s)==""+s};s.replace=function(s,a,c){if(!s||s.indexOf(a)<
0)return s;return s.split(a).join(c)};s.escape=function(b){var a,c;if(!b)return b;b=encodeURIComponent(b);for(a=0;a<7;a++)c="+~!*()'".substring(a,a+1),b.indexOf(c)>=0&&(b=s.replace(b,c,"%"+c.charCodeAt(0).toString(16).toUpperCase()));return b};s.unescape=function(b){if(!b)return b;b=b.indexOf("+")>=0?s.replace(b,"+"," "):b;try{return decodeURIComponent(b)}catch(a){}return unescape(b)};s.Ja=function(){var b=w.location.hostname,a=s.fpCookieDomainPeriods,c;if(!a)a=s.cookieDomainPeriods;if(b&&!s.ca&&
!/^[0-9.]+$/.test(b)&&(a=a?parseInt(a):2,a=a>2?a:2,c=b.lastIndexOf("."),c>=0)){for(;c>=0&&a>1;)c=b.lastIndexOf(".",c-1),a--;s.ca=c>0?b.substring(c):b}return s.ca};s.c_r=s.cookieRead=function(b){b=s.escape(b);var a=" "+s.d.cookie,c=a.indexOf(" "+b+"="),e=c<0?c:a.indexOf(";",c);b=c<0?"":s.unescape(a.substring(c+2+b.length,e<0?a.length:e));return b!="[[B]]"?b:""};s.c_w=s.cookieWrite=function(b,a,c){var e=s.Ja(),d=s.cookieLifetime,f;a=""+a;d=d?(""+d).toUpperCase():"";c&&d!="SESSION"&&d!="NONE"&&((f=a!=
""?parseInt(d?d:0):-60)?(c=new Date,c.setTime(c.getTime()+f*1E3)):c==1&&(c=new Date,f=c.getYear(),c.setYear(f+5+(f<1900?1900:0))));if(b&&d!="NONE")return s.d.cookie=b+"="+s.escape(a!=""?a:"[[B]]")+"; path=/;"+(c&&d!="SESSION"?" expires="+c.toGMTString()+";":"")+(e?" domain="+e+";":""),s.cookieRead(b)==a;return 0};s.C=[];s.B=function(b,a,c){if(s.da)return 0;if(!s.maxDelay)s.maxDelay=250;var e=0,d=(new Date).getTime()+s.maxDelay,f=s.d.cb,g=["webkitvisibilitychange","visibilitychange"];if(!f)f=s.d.eb;
if(f&&f=="prerender"){if(!s.M){s.M=1;for(c=0;c<g.length;c++)s.d.addEventListener(g[c],function(){var b=s.d.cb;if(!b)b=s.d.eb;if(b=="visible")s.M=0,s.delayReady()})}e=1;d=0}else c||s.q("_d")&&(e=1);e&&(s.C.push({m:b,a:a,t:d}),s.M||setTimeout(s.delayReady,s.maxDelay));return e};s.delayReady=function(){var b=(new Date).getTime(),a=0,c;for(s.q("_d")&&(a=1);s.C.length>0;){c=s.C.shift();if(a&&!c.t&&c.t>b){s.C.unshift(c);setTimeout(s.delayReady,parseInt(s.maxDelay/2));break}s.da=1;s[c.m].apply(s,c.a);s.da=
0}};s.setAccount=s.sa=function(b){var a,c;if(!s.B("setAccount",arguments))if(s.account=b,s.allAccounts){a=s.allAccounts.concat(b.split(","));s.allAccounts=[];a.sort();for(c=0;c<a.length;c++)(c==0||a[c-1]!=a[c])&&s.allAccounts.push(a[c])}else s.allAccounts=b.split(",")};s.W=function(b,a,c,e,d){var f="",g,j,w,q,i=0;b=="contextData"&&(b="c");if(a){for(g in a)if(!Object.prototype[g]&&(!d||g.substring(0,d.length)==d)&&a[g]&&(!c||c.indexOf(","+(e?e+".":"")+g+",")>=0)){w=!1;if(i)for(j=0;j<i.length;j++)g.substring(0,
i[j].length)==i[j]&&(w=!0);if(!w&&(f==""&&(f+="&"+b+"."),j=a[g],d&&(g=g.substring(d.length)),g.length>0))if(w=g.indexOf("."),w>0)j=g.substring(0,w),w=(d?d:"")+j+".",i||(i=[]),i.push(w),f+=s.W(j,a,c,e,w);else if(typeof j=="boolean"&&(j=j?"true":"false"),j){if(e=="retrieveLightData"&&d.indexOf(".contextData.")<0)switch(w=g.substring(0,4),q=g.substring(4),g){case "transactionID":g="xact";break;case "channel":g="ch";break;case "campaign":g="v0";break;default:s.ja(q)&&(w=="prop"?g="c"+q:w=="eVar"?g="v"+
q:w=="list"?g="l"+q:w=="hier"&&(g="h"+q,j=j.substring(0,255)))}f+="&"+s.escape(g)+"="+s.escape(j)}}f!=""&&(f+="&."+b)}return f};s.La=function(){var b="",a,c,e,d,f,g,j,w,i="",k="",m=c="";if(s.lightProfileID)a=s.P,(i=s.lightTrackVars)&&(i=","+i+","+s.ma.join(",")+",");else{a=s.e;if(s.pe||s.linkType)if(i=s.linkTrackVars,k=s.linkTrackEvents,s.pe&&(c=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1),s[c]))i=s[c].pb,k=s[c].ob;i&&(i=","+i+","+s.H.join(",")+",");k&&(k=","+k+",",i&&(i+=",events,"));s.events2&&
(m+=(m!=""?",":"")+s.events2)}for(c=0;c<a.length;c++){d=a[c];f=s[d];e=d.substring(0,4);g=d.substring(4);!f&&d=="events"&&m&&(f=m,m="");if(f&&(!i||i.indexOf(","+d+",")>=0)){switch(d){case "timestamp":d="ts";break;case "dynamicVariablePrefix":d="D";break;case "visitorID":d="vid";break;case "marketingCloudVisitorID":d="mid";break;case "analyticsVisitorID":d="aid";break;case "audienceManagerVisitorID":d="aamid";break;case "audienceManagerLocationHint":d="aamlh";break;case "pageURL":d="g";if(f.length>
255)s.pageURLRest=f.substring(255),f=f.substring(0,255);break;case "pageURLRest":d="-g";break;case "referrer":d="r";break;case "vmk":case "visitorMigrationKey":d="vmt";break;case "visitorMigrationServer":d="vmf";s.ssl&&s.visitorMigrationServerSecure&&(f="");break;case "visitorMigrationServerSecure":d="vmf";!s.ssl&&s.visitorMigrationServer&&(f="");break;case "charSet":d="ce";break;case "visitorNamespace":d="ns";break;case "cookieDomainPeriods":d="cdp";break;case "cookieLifetime":d="cl";break;case "variableProvider":d=
"vvp";break;case "currencyCode":d="cc";break;case "channel":d="ch";break;case "transactionID":d="xact";break;case "campaign":d="v0";break;case "resolution":d="s";break;case "colorDepth":d="c";break;case "javascriptVersion":d="j";break;case "javaEnabled":d="v";break;case "cookiesEnabled":d="k";break;case "browserWidth":d="bw";break;case "browserHeight":d="bh";break;case "connectionType":d="ct";break;case "homepage":d="hp";break;case "plugins":d="p";break;case "events":m&&(f+=(f!=""?",":"")+m);if(k){g=
f.split(",");f="";for(e=0;e<g.length;e++)j=g[e],w=j.indexOf("="),w>=0&&(j=j.substring(0,w)),w=j.indexOf(":"),w>=0&&(j=j.substring(0,w)),k.indexOf(","+j+",")>=0&&(f+=(f?",":"")+g[e])}break;case "events2":f="";break;case "contextData":b+=s.W("c",s[d],i,d);f="";break;case "lightProfileID":d="mtp";break;case "lightStoreForSeconds":d="mtss";s.lightProfileID||(f="");break;case "lightIncrementBy":d="mti";s.lightProfileID||(f="");break;case "retrieveLightProfiles":d="mtsr";break;case "deleteLightProfiles":d=
"mtsd";break;case "retrieveLightData":s.retrieveLightProfiles&&(b+=s.W("mts",s[d],i,d));f="";break;default:s.ja(g)&&(e=="prop"?d="c"+g:e=="eVar"?d="v"+g:e=="list"?d="l"+g:e=="hier"&&(d="h"+g,f=f.substring(0,255)))}f&&(b+="&"+d+"="+(d.substring(0,3)!="pev"?s.escape(f):f))}d=="pev3"&&s.g&&(b+=s.g)}return b};s.u=function(s){var a=s.tagName;if(""+s.nb!="undefined"||""+s.Xa!="undefined"&&(""+s.Xa).toUpperCase()!="HTML")return"";a=a&&a.toUpperCase?a.toUpperCase():"";a=="SHAPE"&&(a="");a&&((a=="INPUT"||
a=="BUTTON")&&s.type&&s.type.toUpperCase?a=s.type.toUpperCase():!a&&s.href&&(a="A"));return a};s.fa=function(s){var a=s.href?s.href:"",c,e,d;c=a.indexOf(":");e=a.indexOf("?");d=a.indexOf("/");if(a&&(c<0||e>=0&&c>e||d>=0&&c>d))e=s.protocol&&s.protocol.length>1?s.protocol:l.protocol?l.protocol:"",c=l.pathname.lastIndexOf("/"),a=(e?e+"//":"")+(s.host?s.host:l.host?l.host:"")+(h.substring(0,1)!="/"?l.pathname.substring(0,c<0?0:c)+"/":"")+a;return a};s.D=function(b){var a=s.u(b),c,e,d="",f=0;if(a){c=b.protocol;
e=b.onclick;if(b.href&&(a=="A"||a=="AREA")&&(!e||!c||c.toLowerCase().indexOf("javascript")<0))d=s.fa(b);else if(e)d=s.replace(s.replace(s.replace(s.replace(""+e,"\r",""),"\n",""),"\t","")," ",""),f=2;else if(a=="INPUT"||a=="SUBMIT"){if(b.value)d=b.value;else if(b.innerText)d=b.innerText;else if(b.textContent)d=b.textContent;f=3}else if(b.src&&a=="IMAGE")d=b.src;if(d)return{id:d.substring(0,100),type:f}}return 0};s.kb=function(b){for(var a=s.u(b),c=s.D(b);b&&!c&&a!="BODY";)if(b=b.parentElement?b.parentElement:
b.parentNode)a=s.u(b),c=s.D(b);if(!c||a=="BODY")b=0;if(b&&(a=b.onclick?""+b.onclick:"",a.indexOf(".tl(")>=0||a.indexOf(".trackLink(")>=0))b=0;return b};s.Va=function(){var b,a,c=s.linkObject,e=s.linkType,d=s.linkURL,f,g;s.Q=1;if(!c)s.Q=0,c=s.j;if(c){b=s.u(c);for(a=s.D(c);c&&!a&&b!="BODY";)if(c=c.parentElement?c.parentElement:c.parentNode)b=s.u(c),a=s.D(c);if(!a||b=="BODY")c=0;if(c){var j=c.onclick?""+c.onclick:"";if(j.indexOf(".tl(")>=0||j.indexOf(".trackLink(")>=0)c=0}}else s.Q=1;!d&&c&&(d=s.fa(c));
d&&!s.linkLeaveQueryString&&(f=d.indexOf("?"),f>=0&&(d=d.substring(0,f)));if(!e&&d){var i=0,k=0,m;if(s.trackDownloadLinks&&s.linkDownloadFileTypes){j=d.toLowerCase();f=j.indexOf("?");g=j.indexOf("#");f>=0?g>=0&&g<f&&(f=g):f=g;f>=0&&(j=j.substring(0,f));f=s.linkDownloadFileTypes.toLowerCase().split(",");for(g=0;g<f.length;g++)(m=f[g])&&j.substring(j.length-(m.length+1))=="."+m&&(e="d")}if(s.trackExternalLinks&&!e&&(j=d.toLowerCase(),s.ia(j))){if(!s.linkInternalFilters)s.linkInternalFilters=w.location.hostname;
f=0;s.linkExternalFilters?(f=s.linkExternalFilters.toLowerCase().split(","),i=1):s.linkInternalFilters&&(f=s.linkInternalFilters.toLowerCase().split(","));if(f){for(g=0;g<f.length;g++)m=f[g],j.indexOf(m)>=0&&(k=1);k?i&&(e="e"):i||(e="e")}}}s.linkObject=c;s.linkURL=d;s.linkType=e;if(s.trackClickMap||s.trackInlineStats)if(s.g="",c){e=s.pageName;d=1;c=c.sourceIndex;if(!e)e=s.pageURL,d=0;if(w.s_objectID)a.id=w.s_objectID,c=a.type=1;if(e&&a&&a.id&&b)s.g="&pid="+s.escape(e.substring(0,255))+(d?"&pidt="+
d:"")+"&oid="+s.escape(a.id.substring(0,100))+(a.type?"&oidt="+a.type:"")+"&ot="+b+(c?"&oi="+c:"")}};s.Ma=function(){var b=s.Q,a=s.linkType,c=s.linkURL,e=s.linkName;if(a&&(c||e))a=a.toLowerCase(),a!="d"&&a!="e"&&(a="o"),s.pe="lnk_"+a,s.pev1=c?s.escape(c):"",s.pev2=e?s.escape(e):"",b=1;s.abort&&(b=0);if(s.trackClickMap||s.trackInlineStats){a={};c=0;var d=s.cookieRead("s_sq"),f=d?d.split("&"):0,g,j,w;d=0;if(f)for(g=0;g<f.length;g++)j=f[g].split("="),e=s.unescape(j[0]).split(","),j=s.unescape(j[1]),
a[j]=e;e=s.account.split(",");if(b||s.g){b&&!s.g&&(d=1);for(j in a)if(!Object.prototype[j])for(g=0;g<e.length;g++){d&&(w=a[j].join(","),w==s.account&&(s.g+=(j.charAt(0)!="&"?"&":"")+j,a[j]=[],c=1));for(f=0;f<a[j].length;f++)w=a[j][f],w==e[g]&&(d&&(s.g+="&u="+s.escape(w)+(j.charAt(0)!="&"?"&":"")+j+"&u=0"),a[j].splice(f,1),c=1)}b||(c=1);if(c){d="";g=2;!b&&s.g&&(d=s.escape(e.join(","))+"="+s.escape(s.g),g=1);for(j in a)!Object.prototype[j]&&g>0&&a[j].length>0&&(d+=(d?"&":"")+s.escape(a[j].join(","))+
"="+s.escape(j),g--);s.cookieWrite("s_sq",d)}}}return b};s.Na=function(){if(!s.bb){var b=new Date,a=m.location,c,e,d,f=d=e=c="",g="",w="",i="1.2",k=s.cookieWrite("s_cc","true",0)?"Y":"N",n="",p="",o=0;if(b.setUTCDate&&(i="1.3",o.toPrecision&&(i="1.5",c=[],c.forEach))){i="1.6";d=0;e={};try{d=new Iterator(e),d.next&&(i="1.7",c.reduce&&(i="1.8",i.trim&&(i="1.8.1",Date.parse&&(i="1.8.2",Object.create&&(i="1.8.5")))))}catch(r){}}c=screen.width+"x"+screen.height;d=navigator.javaEnabled()?"Y":"N";e=screen.pixelDepth?
screen.pixelDepth:screen.colorDepth;g=s.w.innerWidth?s.w.innerWidth:s.d.documentElement.offsetWidth;w=s.w.innerHeight?s.w.innerHeight:s.d.documentElement.offsetHeight;b=navigator.plugins;try{s.b.addBehavior("#default#homePage"),n=s.b.lb(a)?"Y":"N"}catch(t){}try{s.b.addBehavior("#default#clientCaps"),p=s.b.connectionType}catch(u){}if(b)for(;o<b.length&&o<30;){if(a=b[o].name)a=a.substring(0,100)+";",f.indexOf(a)<0&&(f+=a);o++}s.resolution=c;s.colorDepth=e;s.javascriptVersion=i;s.javaEnabled=d;s.cookiesEnabled=
k;s.browserWidth=g;s.browserHeight=w;s.connectionType=p;s.homepage=n;s.plugins=f;s.bb=1}};s.G={};s.loadModule=function(b,a){var c=s.G[b];if(!c){c=w["AppMeasurement_Module_"+b]?new w["AppMeasurement_Module_"+b](s):{};s.G[b]=s[b]=c;c.ua=function(){return c.wa};c.xa=function(a){if(c.wa=a)s[b+"_onLoad"]=a,s.B(b+"_onLoad",[s,c],1)||a(s,c)};try{Object.defineProperty?Object.defineProperty(c,"onLoad",{get:c.ua,set:c.xa}):c._olc=1}catch(e){c._olc=1}}a&&(s[b+"_onLoad"]=a,s.B(b+"_onLoad",[s,c],1)||a(s,c))};
s.q=function(b){var a,c;for(a in s.G)if(!Object.prototype[a]&&(c=s.G[a])){if(c._olc&&c.onLoad)c._olc=0,c.onLoad(s,c);if(c[b]&&c[b]())return 1}return 0};s.Qa=function(){var b=Math.floor(Math.random()*1E13),a=s.visitorSampling,c=s.visitorSamplingGroup;c="s_vsn_"+(s.visitorNamespace?s.visitorNamespace:s.account)+(c?"_"+c:"");var e=s.cookieRead(c);if(a){e&&(e=parseInt(e));if(!e){if(!s.cookieWrite(c,b))return 0;e=b}if(e%1E4>v)return 0}return 1};s.I=function(b,a){var c,e,d,f,g,w;for(c=0;c<2;c++){e=c>0?
s.$:s.e;for(d=0;d<e.length;d++)if(f=e[d],(g=b[f])||b["!"+f]){if(!a&&(f=="contextData"||f=="retrieveLightData")&&s[f])for(w in s[f])g[w]||(g[w]=s[f][w]);s[f]=g}}};s.qa=function(b,a){var c,e,d,f;for(c=0;c<2;c++){e=c>0?s.$:s.e;for(d=0;d<e.length;d++)f=e[d],b[f]=s[f],!a&&!b[f]&&(b["!"+f]=1)}};s.Ia=function(s){var a,c,e,d,f,g=0,w,i="",k="";if(s&&s.length>255&&(a=""+s,c=a.indexOf("?"),c>0&&(w=a.substring(c+1),a=a.substring(0,c),d=a.toLowerCase(),e=0,d.substring(0,7)=="http://"?e+=7:d.substring(0,8)=="https://"&&
(e+=8),c=d.indexOf("/",e),c>0&&(d=d.substring(e,c),f=a.substring(c),a=a.substring(0,c),d.indexOf("google")>=0?g=",q,ie,start,search_key,word,kw,cd,":d.indexOf("yahoo.co")>=0&&(g=",p,ei,"),g&&w)))){if((s=w.split("&"))&&s.length>1){for(e=0;e<s.length;e++)d=s[e],c=d.indexOf("="),c>0&&g.indexOf(","+d.substring(0,c)+",")>=0?i+=(i?"&":"")+d:k+=(k?"&":"")+d;i&&k?w=i+"&"+k:k=""}c=253-(w.length-k.length)-a.length;s=a+(c>0?f.substring(0,c):"")+"?"+w}return s};s.za=!1;s.Z=!1;s.ib=function(b){s.marketingCloudVisitorID=
b;s.Z=!0;s.z()};s.J=!1;s.X=!1;s.ta=function(b){s.analyticsVisitorID=b;s.X=!0;s.z()};s.ya=!1;s.Y=!1;s.hb=function(b){s.audienceManagerVisitorID=b;if(s.audienceManagerVisitorID&&s.visitor.getAudienceManagerLocationHint)s.audienceManagerLocationHint=s.visitor.getAudienceManagerLocationHint();s.Y=!0;s.z()};s.isReadyToTrack=function(){var b=!0,a=s.visitor;if(a&&a.isAllowed()){if(!s.J&&!s.analyticsVisitorID&&a.getAnalyticsVisitorID&&(s.analyticsVisitorID=a.getAnalyticsVisitorID([s,s.ta]),!s.analyticsVisitorID))s.J=
!0;if(s.za&&!s.Z&&!s.marketingCloudVisitorID||s.J&&!s.X&&!s.analyticsVisitorID||s.ya&&!s.Y&&!s.audienceManagerVisitorID)b=!1}return b};s.k=k;s.l=0;s.callbackWhenReadyToTrack=function(b,a,c){var e;e={};e.Da=b;e.Ca=a;e.Aa=c;if(s.k==k)s.k=[];s.k.push(e);if(s.l==0)s.l=setInterval(s.z,100)};s.z=function(){var b;if(s.isReadyToTrack()){if(s.l)clearInterval(s.l),s.l=0;if(s.k!=k)for(;s.k.length>0;)b=s.k.shift(),b.Ca.apply(b.Da,b.Aa)}};s.va=function(b){var a,c,e=k,d=k;if(!s.isReadyToTrack()){a=[];if(b!=k)for(c in e=
{},b)e[c]=b[c];d={};s.qa(d,!0);a.push(e);a.push(d);s.callbackWhenReadyToTrack(s,s.track,a);return!0}return!1};s.Ka=function(){var b=s.cookieRead("s_fid"),a="",c="",e;e=8;var d=4;if(!b||b.indexOf("-")<0){for(b=0;b<16;b++)e=Math.floor(Math.random()*e),a+="0123456789ABCDEF".substring(e,e+1),e=Math.floor(Math.random()*d),c+="0123456789ABCDEF".substring(e,e+1),e=d=16;b=a+"-"+c}s.cookieWrite("s_fid",b,1)||(b=0);return b};s.t=s.track=function(b,a){var c,e=new Date,d="s"+Math.floor(e.getTime()/108E5)%10+
Math.floor(Math.random()*1E13),f=e.getYear();f="t="+s.escape(e.getDate()+"/"+e.getMonth()+"/"+(f<1900?f+1900:f)+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()+" "+e.getDay()+" "+e.getTimezoneOffset());s.q("_s");if(!s.B("track",arguments)){if(!s.va(b)){a&&s.I(a);b&&(c={},s.qa(c,0),s.I(b));if(s.Qa()){if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.Ka();s.Va();s.usePlugins&&s.doPlugins&&s.doPlugins(s);if(s.account){if(!s.abort){if(s.trackOffline&&!s.timestamp)s.timestamp=Math.floor(e.getTime()/
1E3);e=w.location;if(!s.pageURL)s.pageURL=e.href?e.href:e;if(!s.referrer&&!s.ra)s.referrer=m.document.referrer,s.ra=1;s.referrer=s.Ia(s.referrer);s.q("_g")}s.Ma()&&!s.abort&&(s.Na(),f+=s.La(),s.Ua(d,f));s.abort||s.q("_t")}}b&&s.I(c,1)}s.timestamp=s.linkObject=s.j=s.linkURL=s.linkName=s.linkType=w.mb=s.pe=s.pev1=s.pev2=s.pev3=s.g=0}};s.tl=s.trackLink=function(b,a,c,e,d){s.linkObject=b;s.linkType=a;s.linkName=c;if(d)s.i=b,s.p=d;return s.track(e)};s.trackLight=function(b,a,c,e){s.lightProfileID=b;s.lightStoreForSeconds=
a;s.lightIncrementBy=c;return s.track(e)};s.clearVars=function(){var b,a;for(b=0;b<s.e.length;b++)if(a=s.e[b],a.substring(0,4)=="prop"||a.substring(0,4)=="eVar"||a.substring(0,4)=="hier"||a.substring(0,4)=="list"||a=="channel"||a=="events"||a=="eventList"||a=="products"||a=="productList"||a=="purchaseID"||a=="transactionID"||a=="state"||a=="zip"||a=="campaign")s[a]=void 0};s.Ua=function(b,a){var c,e=s.trackingServer;c="";var d=s.dc,f="sc.",w=s.visitorNamespace;if(e){if(s.trackingServerSecure&&s.ssl)e=
s.trackingServerSecure}else{if(!w)w=s.account,e=w.indexOf(","),e>=0&&(w=w.gb(0,e)),w=w.replace(/[^A-Za-z0-9]/g,"");c||(c="2o7.net");d=d?(""+d).toLowerCase():"d1";c=="2o7.net"&&(d=="d1"?d="112":d=="d2"&&(d="122"),f="");e=w+"."+d+"."+f+c}c=s.ssl?"https://":"http://";c+=e+"/b/ss/"+s.account+"/"+(s.mobile?"5.":"")+"1/JS-"+s.version+(s.ab?"T":"")+"/"+b+"?AQB=1&ndh=1&"+a+"&AQE=1";s.Pa&&(c=c.substring(0,2047));s.Ga(c);s.N()};s.Ga=function(b){s.c||s.Oa();s.c.push(b);s.O=s.r();s.pa()};s.Oa=function(){s.c=
s.Ra();if(!s.c)s.c=[]};s.Ra=function(){var b,a;if(s.T()){try{(a=w.localStorage.getItem(s.R()))&&(b=w.JSON.parse(a))}catch(c){}return b}};s.T=function(){var b=!0;if(!s.trackOffline||!s.offlineFilename||!w.localStorage||!w.JSON)b=!1;return b};s.ga=function(){var b=0;if(s.c)b=s.c.length;s.v&&b++;return b};s.N=function(){if(!s.v)if(s.ha=k,s.S)s.O>s.F&&s.na(s.c),s.V(500);else{var b=s.Ba();if(b>0)s.V(b);else if(b=s.ea())s.v=1,s.Ta(b),s.Ya(b)}};s.V=function(b){if(!s.ha)b||(b=0),s.ha=setTimeout(s.N,b)};s.Ba=
function(){var b;if(!s.trackOffline||s.offlineThrottleDelay<=0)return 0;b=s.r()-s.la;if(s.offlineThrottleDelay<b)return 0;return s.offlineThrottleDelay-b};s.ea=function(){if(s.c.length>0)return s.c.shift()};s.Ta=function(b){if(s.debugTracking){var a="AppMeasurement Debug: "+b;b=b.split("&");var c;for(c=0;c<b.length;c++)a+="\n\t"+s.unescape(b[c]);s.Sa(a)}};s.Ya=function(b){var a;if(!a)a=new Image,a.alt="";a.ba=function(){try{if(s.U)clearTimeout(s.U),s.U=0;if(a.timeout)clearTimeout(a.timeout),a.timeout=
0}catch(b){}};a.onload=a.$a=function(){a.ba();s.Fa();s.K();s.v=0;s.N()};a.onabort=a.onerror=a.Ha=function(){a.ba();(s.trackOffline||s.S)&&s.v&&s.c.unshift(s.Ea);s.v=0;s.O>s.F&&s.na(s.c);s.K();s.V(500)};a.onreadystatechange=function(){a.readyState==4&&(a.status==200?a.$a():a.Ha())};s.la=s.r();a.src=b;if(a.abort)s.U=setTimeout(a.abort,5E3);s.Ea=b;s.jb=w["s_i_"+s.replace(s.account,",","_")]=a;if(s.useForcedLinkTracking&&s.A||s.p){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;s.L=setTimeout(s.K,
s.forcedLinkTrackingTimeout)}};s.Fa=function(){if(s.T()&&!(s.ka>s.F))try{w.localStorage.removeItem(s.R()),s.ka=s.r()}catch(b){}};s.na=function(b){if(s.T()){s.pa();try{w.localStorage.setItem(s.R(),w.JSON.stringify(b)),s.F=s.r()}catch(a){}}};s.pa=function(){if(s.trackOffline){if(!s.offlineLimit||s.offlineLimit<=0)s.offlineLimit=10;for(;s.c.length>s.offlineLimit;)s.ea()}};s.forceOffline=function(){s.S=!0};s.forceOnline=function(){s.S=!1};s.R=function(){return s.offlineFilename+"-"+s.visitorNamespace+
s.account};s.r=function(){return(new Date).getTime()};s.ia=function(s){s=s.toLowerCase();if(s.indexOf("#")!=0&&s.indexOf("about:")!=0&&s.indexOf("opera:")!=0&&s.indexOf("javascript:")!=0)return!0;return!1};s.setTagContainer=function(b){var a,c,e;s.ab=b;for(a=0;a<s._il.length;a++)if((c=s._il[a])&&c._c=="s_l"&&c.tagContainerName==b){s.I(c);if(c.lmq)for(a=0;a<c.lmq.length;a++)e=c.lmq[a],s.loadModule(e.n);if(c.ml)for(e in c.ml)if(s[e])for(a in b=s[e],e=c.ml[e],e)if(!Object.prototype[a]&&(typeof e[a]!=
"function"||(""+e[a]).indexOf("s_c_il")<0))b[a]=e[a];if(c.mmq)for(a=0;a<c.mmq.length;a++)e=c.mmq[a],s[e.m]&&(b=s[e.m],b[e.f]&&typeof b[e.f]=="function"&&(e.a?b[e.f].apply(b,e.a):b[e.f].apply(b)));if(c.tq)for(a=0;a<c.tq.length;a++)s.track(c.tq[a]);c.s=s;break}};s.Util={urlEncode:s.escape,urlDecode:s.unescape,cookieRead:s.cookieRead,cookieWrite:s.cookieWrite,getQueryParam:function(b,a,c){var e;a||(a=s.pageURL?s.pageURL:w.location);c||(c="&");if(b&&a&&(a=""+a,e=a.indexOf("?"),e>=0&&(a=c+a.substring(e+
1)+c,e=a.indexOf(c+b+"="),e>=0&&(a=a.substring(e+c.length+b.length+1),e=a.indexOf(c),e>=0&&(a=a.substring(0,e)),a.length>0))))return s.unescape(a);return""}};s.H=["timestamp","dynamicVariablePrefix","visitorID","marketingCloudVisitorID","analyticsVisitorID","audienceManagerVisitorID","audienceManagerLocationHint","fid","vmk","visitorMigrationKey","visitorMigrationServer","visitorMigrationServerSecure","charSet","visitorNamespace","cookieDomainPeriods","fpCookieDomainPeriods","cookieLifetime","pageName",
"pageURL","referrer","contextData","currencyCode","lightProfileID","lightStoreForSeconds","lightIncrementBy","retrieveLightProfiles","deleteLightProfiles","retrieveLightData","pe","pev1","pev2","pev3","pageURLRest"];s.e=s.H.concat(["purchaseID","variableProvider","channel","server","pageType","transactionID","campaign","state","zip","events","events2","products","tnt"]);s.ma=["timestamp","charSet","visitorNamespace","cookieDomainPeriods","cookieLifetime","contextData","lightProfileID","lightStoreForSeconds",
"lightIncrementBy"];s.P=s.ma.slice(0);s.$=["account","allAccounts","debugTracking","visitor","trackOffline","offlineLimit","offlineThrottleDelay","offlineFilename","usePlugins","doPlugins","configURL","visitorSampling","s.visitorSamplingGroup","linkObject","linkURL","linkName","linkType","trackDownloadLinks","trackExternalLinks","trackClickMap","trackInlineStats","linkLeaveQueryString","linkTrackVars","linkTrackEvents","linkDownloadFileTypes","linkExternalFilters","linkInternalFilters","useForcedLinkTracking",
"forcedLinkTrackingTimeout","trackingServer","trackingServerSecure","ssl","abort","mobile","dc","lightTrackVars","maxDelay"];for(i=0;i<=75;i++)s.e.push("prop"+i),s.P.push("prop"+i),s.e.push("eVar"+i),s.P.push("eVar"+i),i<6&&s.e.push("hier"+i),i<4&&s.e.push("list"+i);i=["resolution","colorDepth","javascriptVersion","javaEnabled","cookiesEnabled","browserWidth","browserHeight","connectionType","homepage","plugins"];s.e=s.e.concat(i);s.H=s.H.concat(i);s.ssl=w.location.protocol.toLowerCase().indexOf("https")>=
0;s.charSet="UTF-8";s.contextData={};s.offlineThrottleDelay=0;s.offlineFilename="AppMeasurement.offline";s.la=0;s.O=0;s.F=0;s.ka=0;s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";s.w=w;s.d=w.document;try{s.Pa=navigator.appName=="Microsoft Internet Explorer"}catch(o){}s.K=function(){if(s.L)w.clearTimeout(s.L),s.L=k;s.i&&s.A&&s.i.dispatchEvent(s.A);if(s.p)if(typeof s.p=="function")s.p();else if(s.i&&s.i.href)s.d.location=s.i.href;s.i=s.A=s.p=0};s.oa=function(){s.b=
s.d.body;if(s.b)if(s.o=function(b){var a,c,e,d,f;if(!(s.d&&s.d.getElementById("cppXYctnr")||b&&b.Wa)){if(s.aa)if(s.useForcedLinkTracking)s.b.removeEventListener("click",s.o,!1);else{s.b.removeEventListener("click",s.o,!0);s.aa=s.useForcedLinkTracking=0;return}else s.useForcedLinkTracking=0;s.j=b.srcElement?b.srcElement:b.target;try{if(s.j&&(s.j.tagName||s.j.parentElement||s.j.parentNode))if(e=s.ga(),s.track(),e<s.ga()&&s.useForcedLinkTracking&&b.target){for(d=b.target;d&&d!=s.b&&d.tagName.toUpperCase()!=
"A"&&d.tagName.toUpperCase()!="AREA";)d=d.parentNode;if(d&&(f=d.href,s.ia(f)||(f=0),c=d.target,b.target.dispatchEvent&&f&&(!c||c=="_self"||c=="_top"||c=="_parent"||w.name&&c==w.name))){try{a=s.d.createEvent("MouseEvents")}catch(g){a=new w.MouseEvent}if(a){try{a.initMouseEvent("click",b.bubbles,b.cancelable,b.view,b.detail,b.screenX,b.screenY,b.clientX,b.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,b.button,b.relatedTarget)}catch(i){a=0}if(a)a.Wa=1,b.stopPropagation(),b.Za&&b.Za(),b.preventDefault(),
s.i=b.target,s.A=a}}}}catch(k){}s.j=0}},s.b&&s.b.attachEvent)s.b.attachEvent("onclick",s.o);else{if(s.b&&s.b.addEventListener){if(navigator&&(navigator.userAgent.indexOf("WebKit")>=0&&s.d.createEvent||navigator.userAgent.indexOf("Firefox/2")>=0&&w.MouseEvent))s.aa=1,s.useForcedLinkTracking=1,s.b.addEventListener("click",s.o,!0);s.b.addEventListener("click",s.o,!1)}}else setTimeout(s.oa,30)};s.oa()}
function s_gi(s){var w,k=window.s_c_il,m,i=s.split(","),n,p,o=0;if(k)for(m=0;!o&&m<k.length;){w=k[m];if(w._c=="s_c"&&w.account)if(w.account==s)o=1;else{if(!w.allAccounts)w.allAccounts=w.account.split(",");for(n=0;n<i.length;n++)for(p=0;p<w.allAccounts.length;p++)i[n]==w.allAccounts[p]&&(o=1)}m++}o||(w=new AppMeasurement);w.setAccount(s);return w}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var s=window,w=s.s_giq,k,m,i;if(w)for(k=0;k<w.length;k++)m=w[k],i=s_gi(m.oun),i.setAccount(m.un),i.setTagContainer(m.tagContainerName);s.s_giq=0}s_pgicq();

;/*
============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ============
Adobe Visitor API for JavaScript version: 1.1
Copyright 1996-2013 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com
*/
function Visitor(k){var a=this;a.version="1.1";var f=window;f.s_c_in||(f.s_c_il=[],f.s_c_in=0);a._c="Visitor";a._il=f.s_c_il;a._in=f.s_c_in;a._il[a._in]=a;f.s_c_in++;var i=f.document,h=f.z;h||(h=null);var j=f.A;j||(j=!0);var l=f.w;l||(l=!1);a.s=function(){var a;!a&&f.location&&(a=f.location.hostname);if(a)if(/^[0-9.]+$/.test(a))a="";else{var d=a.split("."),b=d.length-1,e=b-1;1<b&&2>=d[b].length&&0>",am,aq,ax,cc,cf,cg,ch,cv,cz,de,dj,dk,eu,fm,fo,ga,gd,gf,gl,gm,gq,gs,gw,hm,li,lu,md,mh,mp,mq,ms,ne,nl,nu,pm,si,sk,sm,sr,su,tc,td,tf,tg,tk,tv,va,vg,vu,wf,yt,".indexOf(","+
d[b]+",")&&e--;if(0<e)for(a="";b>=e;)a=d[b]+(a?".":"")+a,b--}return a};a.cookieRead=function(a){var d=(";"+i.cookie).split(" ").join(";"),b=d.indexOf(";"+a+"="),e=0>b?b:d.indexOf(";",b+1);return 0>b?"":decodeURIComponent(d.substring(b+2+a.length,0>e?d.length:e))};a.cookieWrite=function(c,d,b){var e=a.cookieLifetime,g,d=""+d,e=e?(""+e).toUpperCase():"";b&&"SESSION"!=e&&"NONE"!=e?(g=""!=d?parseInt(e?e:0):-60)?(b=new Date,b.setTime(b.getTime()+1E3*g)):1==b&&(b=new Date,g=b.getYear(),b.setYear(g+2+(1900>
g?1900:0))):b=0;return c&&"NONE"!=e?(i.cookie=c+"="+encodeURIComponent(d)+"; path=/;"+(b?" expires="+b.toGMTString()+";":"")+(a.k?" domain="+a.k+";":""),a.cookieRead(c)==d):0};a.b=h;a.j=function(a,d){try{"function"==typeof a?a.apply(f,d):a[1].apply(a[0],d)}catch(b){}};a.u=function(c,d){d&&(a.b==h&&(a.b={}),void 0==a.b[c]&&(a.b[c]=[]),a.b[c].push(d))};a.p=function(c,d){if(a.b!=h){var b=a.b[c];if(b)for(;0<b.length;)a.j(b.shift(),d)}};a.c=h;a.t=function(c,d,b){!d&&b&&b();var e=i.getElementsByTagName("HEAD")[0],
g=i.createElement("SCRIPT");g.type="text/javascript";g.setAttribute("async","async");g.src=d;e.firstChild?e.insertBefore(g,e.firstChild):e.appendChild(g);a.c==h&&(a.c={});a.c[c]=setTimeout(b,a.loadTimeout)};a.q=function(c){a.c!=h&&a.c[c]&&(clearTimeout(a.c[c]),a.c[c]=0)};a.l=l;a.m=l;a.isAllowed=function(){if(!a.l&&(a.l=j,a.cookieRead(a.cookieName)||a.cookieWrite(a.cookieName,"T",1)))a.m=j;return a.m};a.a=h;a.n=l;a.i=function(){if(!a.n){a.n=j;var c=a.cookieRead(a.cookieName),d,b,e,g,f=new Date;if(c&&
"T"!=c){c=c.split("|");1==c.length%2&&c.pop();for(d=0;d<c.length;d+=2)if(b=c[d].split("-"),e=b[0],g=c[d+1],b=1<b.length?parseInt(b[1]):0,e&&g&&(!b||f.getTime()<1E3*b))a.f(e,g,1),0<b&&(a.a["expire"+e]=b)}if(!a.d("MCAID")&&(c=a.cookieRead("s_vi")))c=c.split("|"),1<c.length&&0<=c[0].indexOf("v1")&&(g=c[1],d=g.indexOf("["),0<=d&&(g=g.substring(0,d)),g&&g.match(/^[0-9a-fA-F\-]+$/)&&a.f("MCAID",g))}};a.v=function(){var c="",d,b;for(d in a.a)!Object.prototype[d]&&a.a[d]&&"expire"!=d.substring(0,6)&&(b=a.a[d],
c+=(c?"|":"")+d+(a.a["expire"+d]?"-"+a.a["expire"+d]:"")+"|"+b);a.cookieWrite(a.cookieName,c,1)};a.d=function(c){return a.a!=h?a.a[c]:h};a.f=function(c,d,b){a.a==h&&(a.a={});a.a[c]=d;b||a.v()};a.o=function(c,d){var b=new Date;b.setTime(b.getTime()+1E3*d);a.a==h&&(a.a={});a.a["expire"+c]=Math.floor(b.getTime()/1E3)};a.r=function(a){if(a&&("object"==typeof a&&(a=a.visitorID?a.visitorID:a.id?a.id:a.uuid?a.uuid:""+a),a&&(a=a.toUpperCase(),"NOTARGET"==a&&(a="NONE")),!a||"NONE"!=a&&!a.match(/^[0-9a-fA-F\-]+$/)))a=
"";return a};a.g=function(c,d){var b;a.q(c);b=a.d(c);b||(b=a.r(d))&&a.f(c,b);if("object"==typeof d){var e=86400;"MCAAMID"==c&&(void 0!=d.id_sync_ttl&&d.id_sync_ttl&&(e=parseInt(d.id_sync_ttl)),a.o(c,e),a.o("MCAAMLH",e),d.dcs_region&&a.f("MCAAMLH",d.dcs_region))}a.p(c,["NONE"!=b?b:""])};a.e=h;a.h=function(c,d,b){if(a.isAllowed()){a.i();var e=a.d(c);if(e)return"NONE"==e&&a.j(b,[""]),"NONE"!=e?e:"";if(a.e==h||void 0==a.e[c])a.e==h&&(a.e={}),a.e[c]=j,a.t(c,d,function(){if(!a.d(c)){var b="";if("MCMID"==
c){var d=b="",e,f,h=10,i=10;for(e=0;19>e;e++)f=Math.floor(Math.random()*h),b+="0123456789".substring(f,f+1),h=0==e&&9==f?3:10,f=Math.floor(Math.random()*i),d+="0123456789".substring(f,f+1),i=0==e&&9==f?3:10;b+=d}a.g(c,b)}});a.u(c,b)}return""};a.setMarketingCloudVisitorID=function(c){a.g("MCMID",c)};a.getMarketingCloudVisitorID=function(c){var d=a.marketingCloudServer,b="";a.loadSSL&&a.marketingCloudServerSecure&&(d=a.marketingCloudServerSecure);d&&(b="http"+(a.loadSSL?"s":"")+"://"+d+"/id?d_rtbd=json&d_cid="+
encodeURIComponent(a.namespace)+"&d_cb=s_c_il%5B"+a._in+"%5D.setMarketingCloudVisitorID");return a.h("MCMID",b,c)};a.setAudienceManagerVisitorID=function(c){a.g("MCAAMID",c)};a.getAudienceManagerVisitorID=function(c){var d=a.audienceManagerServer,b="";a.loadSSL&&a.audienceManagerServerSecure&&(d=a.audienceManagerServerSecure);d&&(b="http"+(a.loadSSL?"s":"")+"://"+d+"/id?d_rtbd=json&d_cb=s_c_il%5B"+a._in+"%5D.setAudienceManagerVisitorID");return a.h("MCAAMID",b,c)};a.getAudienceManagerLocationHint=
function(){a.i();var c=a.d("MCAAMLH");return c?c:0};a.setAnalyticsVisitorID=function(c){a.i();a.g("MCAID",c)};a.getAnalyticsVisitorID=function(c){var d=a.trackingServer,b="";a.loadSSL&&a.trackingServerSecure&&(d=a.trackingServerSecure);d&&(b="http"+(a.loadSSL?"s":"")+"://"+d+"/id?callback=s_c_il%5B"+a._in+"%5D.setAnalyticsVisitorID");return a.h("MCAID",b,c)};a.getVisitorID=function(c){return a.getMarketingCloudVisitorID(c)};a.namespace=k;a.cookieName="AMCV_"+k;a.k=a.s();a.loadSSL=0<=f.location.protocol.toLowerCase().indexOf("https");
a.loadTimeout=500;a.marketingCloudServer=a.audienceManagerServer="dpm.demdex.net"}Visitor.getInstance=function(k){var a,f=window.s_c_il,i;if(f)for(i=0;i<f.length;i++)if((a=f[i])&&"Visitor"==a._c&&a.namespace==k)return a;return new Visitor(k)};

;(function (d, w) {
w.fifa = w.fifa || {};
var Analytics = w.fifa.analytics || {};
Analytics = (function () {
var SiteCatalyst = this.SiteCatalyst || {};
SiteCatalyst = (function () {
/*Integrate plugins here*/
var Plugins = this.Plugins || {};
Plugins = (function () {
this.join = new Function("v", "p", ""
+ "var s=this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+ ":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+ ";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+ "se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");
this.crossVisitParticipation = new Function("v", "cn", "ex", "ct", "dl", "ev", ""
+ "var s=this;var ay=s.split(ev,',');for(var u=0;u<ay.length;u++){if(s"
+ ".events&&s.events.indexOf(ay[u])!=-1){s.c_w(cn,'');return '';}}if(!"
+ "v||v=='')return '';var arry=new Array();var a=new Array();var c=s.c"
+ "_r(cn);var g=0;var h=new Array();if(c&&c!='') arry=eval(c);var e=ne"
+ "w Date();e.setFullYear(e.getFullYear()+5);if(arry.length>0&&arry[ar"
+ "ry.length-1][0]==v)arry[arry.length-1]=[v,new Date().getTime()];el"
+ "se arry[arry.length]=[v,new Date().getTime()];var data=s.join(arry"
+ ",{delim:',',front:'[',back:']',wrap:'\\''});var start=arry.length-c"
+ "t < 0?0:arry.length-ct;s.c_w(cn,data,e);for(var x=start;x<arry.leng"
+ "th;x++){var diff=Math.round(new Date()-new Date(parseInt(arry[x][1]"
+ ")))/86400000;if(diff<ex){h[g]=arry[x][0];a[g++]=arry[x];}}var r=s.j"
+ "oin(h,{delim:dl});return r;");
/* Custom Plugin - Retrieves values from within the path of the url */
this.getIDValues = new Function("v", ""
+ "var s=this;v=v+'=';var a=s.pageURL?s.pageURL:s.wd.location;a=a.toStr"
+ "ing();var b=a.indexOf(v);if(b!=-1){a=a.substring(b);var a=a.substrin"
+ "g(a.indexOf('=')+1,a.indexOf('/'));return a;}");
this.downloadLinkHandler = new Function("p", ""
+ "var s=this,h=s.p_gh(),n='linkDownloadFileTypes',i,t;if(!h||(s.linkT"
+ "ype&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;"
+ "if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return h;");
this.getDaysSinceLastVisit = new Function("c", ""
+ "var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+ "ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+ "etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+ "2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+ "5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+ "s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+ "y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+ "){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+ "c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+ "_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+ "+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+ "n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+ "!=f5) return '';else return cval_s;");
this.p_gh = new Function(""
+ "var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+ "o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+ "o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+ "ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");
/*Standard Get Referrer*/
this.getReferrer = new Function("", ""
+ "var s=this,c,d,e,g,i,j,k,l,m,n,o;g=s.referrer?s.referrer:document.r"
+ "eferrer;g=g.toLowerCase();if(g){i=g.indexOf('?')>-1?g.indexOf('?'):"
+ "g.length;j=g.substring(0,i);k=s.linkInternalFilters.toLowerCase();k"
+ "=s.split(k,',');l=k.length;for(m=0;m<l;m++){n=j.indexOf(k[m])>-1?g:"
+ "'';if(n)o=n}if(!o){d=j.indexOf('//')>-1?j.indexOf('//')+2:0;c=g.ind"
+ "exOf('/',d)>-1?g.indexOf('/',d):j.length;e=g.substring(d,c);return "
+ "e}}");
/* Modified Get Referrer */
this.getReferrer2 = new Function("", ""
+ "var s=this,c,d,e,g,i,j,k,l,m,n,o;g=s.referrer?s.referrer:document.r"
+ "eferrer;g=g.toLowerCase();if(g){i=g.indexOf('?')>-1?g.indexOf('?'):"
+ "g.length;j=g.substring(0,i);k=s.linkInternalFilters.toLowerCase();k"
+ "=s.split(k,',');l=k.length;for(m=0;m<l;m++){n=j.indexOf(k[m])>-1?g:"
+ "'';if(n)o=n}if(!o){return g}}");
this.getAndPersistValue = new Function("v", "c", "e", ""
+ "var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+ "v)s.c_w(c,v,e?a:0);return s.c_r(c);");
this.getPreviousValue = new Function("v", "c", "el", ""
+ "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+ "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+ "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+ ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+ "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
this.split = new Function("l", "d", ""
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
this.apl = new Function("l", "v", "d", "u", ""
+ "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+ "e()));}}if(!m)l=l?l+d+v:v;return l");
this.getTimeParting = new Function("t", "z", "y", "l", ""
+ "var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=S"
+ "tring(A);if(s.dstStart&&s.dstEnd){B=s.dstStart;C=s.dstEnd}else{;U=U"
+ ".substring(2,4);X='090801|101407|111306|121104|131003|140902|150801"
+ "|161306|171205|181104|191003';X=s.split(X,'|');for(W=0;W<=10;W++){Z"
+ "=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substrin"
+ "g(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D"
+ "=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Dat"
+ "a Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new"
+ " Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.g"
+ "etTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Mo"
+ "nday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.get"
+ "Hours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='"
+ "00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6"
+ "||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availab"
+ "le'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){r"
+ "eturn A}}else{return Z+', '+W}}}");
this.getQueryParam = new Function("p", "d", "u", ""
+ "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+ "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+ ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+ "1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+ "=p.length?i:i+1)}return v");
this.pt = function (x, d, f, a) {
var s = this,
t = x,
z = 0,
y, r;
while (t) {
y = t.indexOf(d);
y = y < 0 ? t.length : y;
t = t.substring(0, y);
r = s[f](t, a);
if (r) return r;
z += y + d.length;
t = x.substring(z, x.length);
t = z < x.length ? t : ''
}
return ''
};
this.p_gpv = new Function("k", "u", ""
+ "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+ "=s.pt(q,'&','p_gvf',k)}return v");
this.p_gvf = new Function("t", "k", ""
+ "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+ "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+ "epa(v)}return ''");
this.getValOnce = new Function("v", "c", "e", ""
+ "var s=this,v=v?v:'',k=s.c_r(c),a=new Date,e=e?e:0;if(v){a.setTime(a"
+ ".getTime()+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
this.getNewRepeat = new Function(""
+ "var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+ "(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+ "'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+ ".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
+ "al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
+ "n 'Repeat';");
return this;
}).call(Plugins || {});
this.Plugins = Plugins;
tagPlugins = this.tagPlugins || {};
tagPlugins.getSection = function (pagevars, num) {
var sct = "";
if (!!pagevars.channel) {
sct = pagevars.channel;
}
var i = 1;
while (i <= num) {
if (!!pagevars["subsection" + i]) {
sct = sct + ":" + pagevars["subsection" + i];
}
i = i + 1;
}
return sct;
};
this.tagPlugins = tagPlugins;
this.copyVars = function (fifacom_s) {
/* copy props to eVars - shorthand version*/
fifacom_s.eVar8 = "D=pageName";
if (fifacom_s.channel && !fifacom_s.eVar9) fifacom_s.eVar9 = "D=ch";
if (fifacom_s.prop1 && !fifacom_s.eVar15) fifacom_s.eVar15 = "D=c1";
if (fifacom_s.prop2 && !fifacom_s.eVar51) fifacom_s.eVar51 = "D=c2";
if (fifacom_s.prop3 && !fifacom_s.eVar52) fifacom_s.eVar52 = "D=c3";
if (fifacom_s.prop4 && !fifacom_s.eVar53) fifacom_s.eVar53 = "D=c4";
if (fifacom_s.prop5 && !fifacom_s.eVar5) fifacom_s.eVar5 = "D=c5";
if (fifacom_s.prop7 && !fifacom_s.eVar7) fifacom_s.eVar7 = "D=c7";
if (fifacom_s.prop8 && !fifacom_s.eVar34) fifacom_s.eVar34 = "D=c8";
if (fifacom_s.prop11 && !fifacom_s.eVar11) fifacom_s.eVar11 = "D=c11";
if (fifacom_s.prop13 && !fifacom_s.eVar13) fifacom_s.eVar13 = "D=c13";
if (fifacom_s.prop14 && !fifacom_s.eVar14) fifacom_s.eVar14 = "D=c14";
if (fifacom_s.prop16 && !fifacom_s.eVar16) fifacom_s.eVar16 = "D=c16";
if (fifacom_s.prop17 && !fifacom_s.eVar17) fifacom_s.eVar17 = "D=c17";
if (fifacom_s.prop18 && !fifacom_s.eVar18) fifacom_s.eVar18 = "D=c18";
if (fifacom_s.prop19 && !fifacom_s.eVar19) fifacom_s.eVar19 = "D=c19";
if (fifacom_s.prop20 && !fifacom_s.eVar20) fifacom_s.eVar20 = "D=c20";
if (fifacom_s.prop21 && !fifacom_s.eVar21) fifacom_s.eVar21 = "D=c21";
if (fifacom_s.prop22 && !fifacom_s.eVar22) fifacom_s.eVar22 = "D=c22";
if (fifacom_s.prop23 && !fifacom_s.eVar23) fifacom_s.eVar23 = "D=c23";
if (fifacom_s.prop24 && !fifacom_s.eVar24) fifacom_s.eVar24 = "D=c24";
if (fifacom_s.prop25 && !fifacom_s.eVar25) fifacom_s.eVar25 = "D=c25";
if (fifacom_s.prop26 && !fifacom_s.eVar26) fifacom_s.eVar26 = "D=c26";
if (fifacom_s.prop27 && !fifacom_s.eVar27) fifacom_s.eVar27 = "D=c27";
if (fifacom_s.prop28 && !fifacom_s.eVar28) fifacom_s.eVar28 = "D=c28";
if (fifacom_s.prop29 && !fifacom_s.eVar29) fifacom_s.eVar29 = "D=c29";
if (fifacom_s.prop30 && !fifacom_s.eVar30) fifacom_s.eVar30 = "D=c30";
if (fifacom_s.prop31 && !fifacom_s.eVar31) fifacom_s.eVar31 = "D=c31";
if (fifacom_s.prop32 && !fifacom_s.eVar32) fifacom_s.eVar32 = "D=c32";
if (fifacom_s.prop33 && !fifacom_s.eVar33) fifacom_s.eVar33 = "D=c33";
if (fifacom_s.prop42 && !fifacom_s.eVar42) fifacom_s.eVar42 = "D=c42";
if (fifacom_s.prop43 && !fifacom_s.eVar43) fifacom_s.eVar43 = "D=c43";
if (fifacom_s.prop44 && !fifacom_s.eVar44) fifacom_s.eVar44 = "D=c44";
if (fifacom_s.prop46 && !fifacom_s.eVar46) fifacom_s.eVar46 = "D=c46";
if (fifacom_s.prop47 && !fifacom_s.eVar47) fifacom_s.eVar47 = "D=c47";
if (fifacom_s.prop48 && !fifacom_s.eVar48) fifacom_s.eVar48 = "D=c48";
fifacom_s.prop50 = "D=User-Agent";
fifacom_s.eVar50 = "D=User-Agent";
};
this.doPlugins = function (fifacom_s) {
/* Campaigns */
if (!fifacom_s.campaign) { fifacom_s.campaign = fifacom_s.Util.getQueryParam('cid,pid,fb_ref,grid,kwid', '_'); }
fifacom_s.campaign = fifacom_s.getValOnce(fifacom_s.campaign, 's_campaign', 0);
if (!window.omniture_campaign) {
if (fifacom_s.campaign) {
if (fifacom_s.Util.getQueryParam('originalref')) {
fifacom_s.eVar35 = fifacom_s.Util.getQueryParam('originalref');
fifacom_s.referrer = "D=v35";
}
else
fifacom_s.eVar35 = fifacom_s.getReferrer();
if (fifacom_s.events) fifacom_s.events = fifacom_s.apl(fifacom_s.events, "event30", ",", 2)
else fifacom_s.events = "event30"
if (fifacom_s.campaign.indexOf('share', 0) > -1) {
fifacom_s.eVar49 = "D=v0"
if (fifacom_s.events) fifacom_s.events = fifacom_s.apl(fifacom_s.events, "event31", ",", 2)
else fifacom_s.events = "event31"
}
if (fifacom_s.Util.getQueryParam('fb_ref')) {
fifacom_s.eVar49 = "D=v0"
if (fifacom_s.events) fifacom_s.events = fifacom_s.apl(fifacom_s.events, "event31", ",", 2)
else fifacom_s.events = "event31"
}
if (fifacom_s.Util.getQueryParam('grid')) { fifacom_s.eVar3 = fifacom_s.Util.getQueryParam('grid') }
if (fifacom_s.Util.getQueryParam('kwid')) { fifacom_s.eVar4 = fifacom_s.Util.getQueryParam('kwid') }
}
}
else {
fifacom_s.events = fifacom_s.events.replace(',event30', '').replace('event30,', '').replace(',event31', '').replace('event31,', '');
}
/* Featured Content */
if (fifacom_s.eVar12) fifacom_s.eVar12 = fifacom_s.getValOnce(fifacom_s.eVar12, 's_e12', 0);
if (!window.omniture_intcmp) {
if (!fifacom_s.eVar2) {
fifacom_s.eVar2 = fifacom_s.Util.getQueryParam('intcmp');
window.omniture_intcmp = fifacom_s.eVar2;
}
fifacom_s.eVar2 = fifacom_s.getValOnce(fifacom_s.eVar2, 's_e2', 0);
}
else {
delete fifacom_s.eVar2; delete s.eVar54;
fifacom_s.events = fifacom_s.events.replace(',event29', '').replace('event29,', '');
}
if (fifacom_s.eVar2) {
if (fifacom_s.events) fifacom_s.events = fifacom_s.apl(fifacom_s.events, "event29", ",", 2)
else fifacom_s.events = "event29"
s.eVar54 = s.crossVisitParticipation(s.eVar2, 's_cmpev2', '1', '10', '>', '');
}
/* Traffic Timeparting (+1 GMT)*/
fifacom_s.prop38 = fifacom_s.eVar38 = fifacom_s.getTimeParting('h', '+1'); // Set hour
fifacom_s.prop39 = fifacom_s.eVar39 = fifacom_s.getTimeParting('d', '+1'); // Set day
fifacom_s.prop40 = fifacom_s.eVar40 = fifacom_s.getTimeParting('w', '+1'); // Set Weekend / Weekday
/* Enhanced download tracking */
fifacom_s.url = fifacom_s.downloadLinkHandler();
if (fifacom_s.url) {
fifacom_s.eVar41 = fifacom_s.prop41 = fifacom_s.url;
fifacom_s.events = fifacom_s.apl(fifacom_s.events, "event9", ",", 2)
}
/* Set Page View Event */
fifacom_s.events = fifacom_s.apl(fifacom_s.events, 'event2', ',', 2)
/* New/Repeat Status*/
fifacom_s.prop6 = fifacom_s.eVar6 = fifacom_s.getNewRepeat();
if (fifacom_s.prop6 == "New" && s.events.indexOf("event32") < 0) { s.events = s.apl(s.events, 'event32', ','); }
/* Internal Search */
if (fifacom_s.prop10) {
fifacom_s.eVar1 = fifacom_s.prop10 = fifacom_s.prop10.toLowerCase();
var t_search = fifacom_s.getValOnce(fifacom_s.eVar1, 'ev1', 0);
if (t_search) {
if (fifacom_s.events)
fifacom_s.events = fifacom_s.apl(fifacom_s.events, "event1", ",", 2)
else
fifacom_s.events = "event1"
}
}
/* Hierarchy + Language */
if (fifacom_s.hier1 && fifacom_s.prop11) fifacom_s.hier2 = fifacom_s.prop11 + "," + fifacom_s.hier1;
/* Campaign Paths */
var getCampaign = fifacom_s.getAndPersistValue(fifacom_s.campaign, 's_cp_persist', 0);
var CampaignandPage = window.omniture_campaign ? fifacom_s.pageName : getCampaign + '-' + fifacom_s.pageName;
if (getCampaign) {
fifacom_s.prop35 = CampaignandPage;
window.omniture_campaign = fifacom_s.prop35;
}
/* Page + Language */
if (fifacom_s.pageName && fifacom_s.prop11) fifacom_s.prop12 = fifacom_s.prop11 + ":" + fifacom_s.pageName;
/* Paths with Referring Domain */
fifacom_s.prop36 = fifacom_s.getReferrer();
var getReferrer = fifacom_s.getAndPersistValue(fifacom_s.prop36, 's_p36_persist', 0);
if (getReferrer) {
fifacom_s.prop36 = 'D=s_p36_persist + "-" + pageName';
}
/* Get Full Referrer if it Does Not Match Internal Filters */
fifacom_s.prop37 = fifacom_s.getReferrer2();
fifacom_s.prop37 = fifacom_s.getAndPersistValue(fifacom_s.prop37, 's_p37_persist', 0);
if (fifacom_s.prop37) { s.prop37 = "D=s_p37_persist"; }
/* getDaysSinceLastVisit */
fifacom_s.prop21 = fifacom_s.getDaysSinceLastVisit('dslv_fifa');
};
this.setPlugins = function (fifacom_s) {
fifacom_s.wd = fifacom_s.wd || {};
fifacom_s.wd.location = window.location.href;
var plugins = w.fifa.analytics.SiteCatalyst.Plugins;
for (var key in plugins) {
fifacom_s[key] = plugins[key];
}
};
this.setCustomVars = function (custom_s) {
if (!!window.s && !!custom_s && typeof custom_s == 'object') {
var fifacom_s = window.s;
for (var key in custom_s) {
fifacom_s[key] = custom_s[key];
}
}
};
this.doTrack = function () {
amc.on('load', function () {
amc.on('domcontentloaded', function () {
s = window.s;
if (!!s) {
/*SPONSOR MANAGEMENT */
if (typeof fifa.analytics.getActiveSponsors == 'function') {
var sponsors = fifa.analytics.getActiveSponsors();
for (var skey in sponsors) {
var itemobj = sponsors[skey];
sid = itemobj.sponsorId || "";
sk = itemobj.sponsorKind || "";
sa = itemobj.sponsorArea || "";
sact = itemobj.sponsorActivation || "";
cnt = itemobj.count || 1;
if (sa.length > 0) {
sa = ":" + sa;
}
if (sact.length > 0) {
sact = ":" + sact;
}
if (!!itemobj.sponsorId && !!s.prop11) {
var products = ";" + sid + ":" + s.prop11 + ":" + sk + sa + sact + ";;;event27="+cnt;
if (!!s.products == false) {
s.products = "";
}
else {
s.products = s.products + ",";
}
s.products = s.products + products;
}
if (!!s.products && s.products.length > 0) {
if (!!s.events) {
s.events = s.events + ',';
} else {
s.events = '';
}
if (s.events.indexOf('event2') == -1) {
s.events = s.events + 'event2';
}
if (s.events.indexOf('event27') == -1) {
s.events = s.events + ',event27';
}
s.events = s.events.replace(/,,/g, ",");
}
}
}
window.fifa = window.fifa || {};
window.fifa.analytics = window.fifa.analytics || {};
if (!!window.fifa.analytics.scrollPageLoading == false) {
var s_code = s.t();
}
if (s_code) document.write(s_code);
window.fifa.analytics.firstTrack = true;
s.usePlugins = true;
}
});
});
};
/* End plugins*/
return this;
}).call(SiteCatalyst || {});
this.SiteCatalyst = SiteCatalyst;
return this;
}).call(Analytics || {});
w.fifa.analytics = Analytics;
var baseconf = w.analyticsbase || {};
var Page = w.fifa.analytics.PageModule(baseconf, true);
w.fifa.analytics.Page = Page;
})(document, window);

;/*	SWFObject v2.2 <http://code.google.com/p/swfobject/>
is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();


