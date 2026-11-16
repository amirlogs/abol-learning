/*! abol-player.braille.js — GPL-3.0 (Liblouis). Main player bundles remain MIT. */
"use strict";(()=>{var z=Object.create;var C=Object.defineProperty;var X=Object.getOwnPropertyDescriptor;var $=Object.getOwnPropertyNames;var q=Object.getPrototypeOf,J=Object.prototype.hasOwnProperty;var y=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,o)=>(typeof require<"u"?require:t)[o]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var k=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(o){throw t=0,o}};var Q=(e,t,o,A)=>{if(t&&typeof t=="object"||typeof t=="function")for(let T of $(t))!J.call(e,T)&&T!==o&&C(e,T,{get:()=>t[T],enumerable:!(A=X(t,T))||A.enumerable});return e};var Z=(e,t,o)=>(o=e!=null?z(q(e)):{},Q(t||!e||!e.__esModule?C(o,"default",{value:e,enumerable:!0}):o,e));var v=k((Ln,F)=>{F.exports={}});var G=k((En,U)=>{U.exports={}});var _=k(S=>{(function(e,t){typeof S=="object"?t(S):typeof define=="function"&&define.amd?define(["exports"],t):t({browserGlobal:!0},e)})(S,function(e,t){"use strict";var o=["version","setLogLevel","getTable","checkTable","free","charSize","setDataPath","getDataPath","getFilesystem","registerLogCallback","backTranslateString","translateString","compileString","loadTable","enableOnDemandTableLoading","disableOnDemandTableLoading"],A=typeof window<"u",T=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,L=!A&&!T;function R(){var n=new Blob([["var CMD = {","init: function(path) {","importScripts(path.capi);","importScripts(path.easyapi);","liblouis.registerLogCallback(function(logLevel, msg){","self.postMessage({isLog: true, level: liblouis.LOG[logLevel], msg: msg});","});","},","lou: function(data) {","if(LiblouisEasyApi.prototype.hasOwnProperty(data.fn) && typeof liblouis[data.fn] == 'function') {","return liblouis[data.fn].apply(liblouis, data.args);","}","return null","}","};","self.onmessage = function (ev) {","var msg = ev.data;","if(!msg.cmd || !CMD.hasOwnProperty(msg.cmd)) {","return;","}","var res = CMD[msg.cmd](msg.data);","self.postMessage({","callId: msg.callId,","data: res","});","};"].join(`
`)],{type:"text/javascript"});return new Worker(window.URL.createObjectURL(n))}function d(n){return n.capi.FS_ORIGINAL_LOOKUP||(n.capi.FS_ORIGINAL_LOOKUP=n.capi.FS.lookup),function i(r,a){n.capi.FS.lookup=n.capi.FS_ORIGINAL_LOOKUP;var E;if(/(\.cti|\.ctb|\.utb|\.dis|\.uti|\.tbl|\.dic)$/.test(a)){var I=n.capi.TABLE_URL+a;E=n.capi.FS.createLazyFile(r,a,I,!0,!0)}else E=n.capi.FS.lookup.apply(this,[r,a]);return n.capi.FS.lookup=i,E}}var u={2:{getBufferLength:function(n){return(n.length+1)*2},transfer:function(n,i){var r=u[2].getBufferLength(i),a=n._malloc(r);return n.stringToUTF16(i,a,r),a},read:function(n,i,r){if(r){var a=i>>1,E=a+n.getValue(r,"i32"),I=n.HEAPU16.slice(a,E);return I}else return n.UTF16ToString(i)},buffToString:function(n){return String.fromCharCode.apply(null,n)}},4:{getBufferLength:function(n){return(n.length+1)*4},transfer:function(n,i){var r=u[4].getBufferLength(i),a=n._malloc(r);return n.stringToUTF32(i,a,r),a},read:function(n,i,r){if(r){var a=i>>2,E=a+n.getValue(r,"i32"),I=n.HEAPU32.slice(a,E);return I}else return n.UTF32ToString(i)},buffToString:function(n){for(var i="",r=0;r<n.length;++r){var a=n[r];if(a>=65536){var E=a-65536;i+=String.fromCharCode(55296|E>>10,56320|E&1023)}else i+=String.fromCharCode(a)}return i}}},s={};s.lou={version:function(){return this.capi.ccall("lou_version","string",[],[])},setLogLevel:function(n){return this.capi.ccall("lou_setLogLevel","void",["number"],[n])},getTable:function(n){return this.capi.ccall("lou_getTable","number",["string"],[n])},checkTable:function(n){return this.capi.ccall("lou_checkTable","number",["string"],[n])},free:function(){return this.capi.ccall("lou_free","void",[],[])},charSize:function(){return this.capi.ccall("lou_charSize","number",[],[])},setDataPath:function(n){this.capi.ccall("lou_setDataPath","number",["string"],[n])},getDataPath:function(){return this.capi.ccall("lou_getDataPath","string",[],[])},getFilesystem:function(){return this.capi.FS},compileString:function(n,i){var r=this.capi.ccall("lou_compileString","number",["string","string"],[n,i]);return!!r},registerLogCallback:function(n){this.capi._log_callback_fn_pointer&&this.capi.Runtime.removeFunction(this.capi._log_callback_fn_pointer),n===null&&(n=P);var i=this;this.capi._log_callback_fn_pointer=this.capi.Runtime.addFunction(function(r,a){n(r,i.capi.Pointer_stringify(a))}),this.capi.ccall("lou_registerLogCallback","void",["pointer"],[this.capi._log_callback_fn_pointer])},backTranslateString:function(n,i){return s.lou.translateString.call(this,n,i,!0)},translateString:function(n,i,r){if(typeof i!="string"||i.length===0)return"";var a=0,E=this.mem.transfer(this.capi,i),I=this.mem.getBufferLength(i),h=this.capi._malloc(I),N=this.capi._malloc(4),f=this.capi._malloc(4);this.capi.setValue(N,I,"i32"),this.capi.setValue(f,I,"i32");var K=this.capi.ccall(r?"lou_backTranslateString":"lou_translateString","number",["string","number","number","number","number","number","number"],[n,E,f,h,N,null,null,a]);if(!K)return null;var j=this.mem.read(this.capi,h,N);return this.capi._free(h),this.capi._free(E),this.capi._free(N),this.capi._free(f),this.mem.buffToString(j)},enableOnDemandTableLoading:function(n){if(A)throw new Error("This feature is only available in web workers and nodeJS");if(this.capi.TABLE_URL=n,!L)this.capi.FS.lookup=d(this);else{this.disableOnDemandTableLoading(),this.capi.FS.mkdir("/tables");var i=n;if(!i){var r=v(),a=y.resolve("liblouis-build");i=r.resolve(r.dirname(a),"tables/")}try{this.capi.FS.mount(this.capi.FS.filesystems.NODEFS,{root:i},"/tables")}catch(E){throw console.error(E),new Error("mounting of table folder failed")}}},disableOnDemandTableLoading:function(){if(!L)this.capi.FS.lookup=this.capi.FS_ORIGINAL_LOOKUP;else if(V(this.capi,"/tables")){try{this.capi.FS.unmount("/tables")}catch{}try{this.capi.FS.rmdir("/tables")}catch{throw new Error("removal of mounted table folder failed")}}}},s.lbu={version:function(){return capi.ccall("lbu_version","string",[],[])},free:function(){return capi.ccall("lbu_free","string",[],[])},setLogLevel:s.lou.setLogLevel,getTable:s.lou.getTable,checkTable:s.lou.checkTable,charSize:s.lou.charSize,setDataPath:s.lou.setDataPath,getDataPath:s.lou.getDataPath,getFilesystem:s.lou.getFilesystem,registerLogCallback:s.lou.registerLogCallback,compileString:s.lou.compileString},s.worker={registerLogCallback:function(n){n===null?this.logCallback=P:this.logCallback=n},getFilesystem:function(){throw new Error("cannot get filesystem of async liblouis instance")},enableOnDemandTableLoading:function(n,i){A&&(n=window.location.origin+"/"+n),i=i||g,w(this,"enableOnDemandTableLoading",[n,i])}};function g(){}function b(n){return n._hasLbu!==void 0?n._hasLbu:typeof n._lbu_version=="function"}function O(){return L?G():typeof liblouisBuild<"u"?liblouisBuild:typeof liblouis_emscripten<"u"?liblouis_emscripten:typeof Module<"u"?Module:null}function x(n){if(L)throw new Error("Async API is only available in browser environments.");this.registerLogCallback(null),this.callId=1,this.cbs={0:function(){}},this.worker=R();var i=this;this.worker.addEventListener("message",function(a){i.resolveDispatch(a.data)});var r="";A&&(r=window.location.origin+"/"),this.worker.postMessage({cmd:"init",callId:0,data:{capi:r+n.capi,easyapi:r+n.easyapi}})}x.prototype.resolveDispatch=function(n){if(n&&n.isLog){this.logCallback(n.level,n.msg);return}if(!n||typeof n.callId!="number"||typeof this.cbs[n.callId]!="function"){console.debug("recieved bougus message from worker:",n);return}this.cbs[n.callId](n.data),this.cbs[n.callId]=null,delete this.cbs[n.callId]};for(var c=0;c<o.length;++c)x.prototype[o[c]]=s.worker[o[c]]||p(o[c]);function p(n){return function(){w(this,n,Array.prototype.slice.call(arguments))}}function w(n,i,r){r.length<1||(n.cbs[n.callId]=r[r.length-1],n.worker.postMessage({callId:n.callId,cmd:"lou",data:{args:r.slice(0,-1),fn:i}}),n.callId++)}function l(n){if(n=n||O(),typeof n=="string"){var i=l.getAvailableBuilds();if(!i.hasOwnProperty(n))throw new Error("no liblouis build for requested version loaded");n=i[n][0]}if(typeof n=="function"&&(n=n()),!n||!n._lou_version)throw new Error("argument cannot be resolved to a liblouis build.");this.capi=n,this.impl=b(n)?s.lbu:s.lou,this.mem=this.charSize()===4?u[4]:u[2],this.registerLogCallback(null)}for(c=0;c<o.length;++c)l.prototype[o[c]]=Y(o[c]);function Y(n){return function(i,r,a){if(!this.impl.hasOwnProperty(n))throw new Error("Your build does not support this method. Include a build containing liblouisutdml.");return this.impl[n].call(this,i,r,a)}}l.prototype.getAvailableBuilds=l.getAvailableBuilds=function(){return t.liblouisBuilds||{}},l.prototype.LOG={},l.prototype.LOG[l.prototype.LOG.ALL=0]="ALL",l.prototype.LOG[l.prototype.LOG.DEBUG=1e4]="DEBUG",l.prototype.LOG[l.prototype.LOG.INFO=2e4]="INFO",l.prototype.LOG[l.prototype.LOG.WARN=3e4]="WARN",l.prototype.LOG[l.prototype.LOG.ERROR=4e4]="ERROR",l.prototype.LOG[l.prototype.LOG.FATAL=5e4]="FATAL",l.prototype.LOG[l.prototype.LOG.OFF=6e4]="OFF",l.prototype._CONSOLE_MAPPING={ALL:"log",DEBUG:"log",INFO:"info",WARN:"warn",ERROR:"error",FATAL:"error"},l.prototype._defaultLogCallback=P;function P(n,i){var r=l.prototype.LOG[n];if(i="["+r+"] "+i,typeof console<"u"){var a=console[l.prototype._CONSOLE_MAPPING[r]];a?a(i):console.log(i)}}function V(n,i){try{return n.FS.lookupPath(i),!0}catch{return!1}}e.browserGlobal?(O()&&(t.liblouis=new l),t.LiblouisEasyApi=l,t.LiblouisEasyApiAsync=x):(e.EasyApi=l,e.EasyApiAsync=x)})});var nn=Z(_(),1);var H={"ethio-g1.ctb":`# Ethiopic-G1
# The Ethiopic Letters and punctuation Braille Table.
#
# Copyright (C) 2012 Dr. Tamru E. Belay <tamru@sympatico.ca>
# Copyright (C) 2012, 2015 Mesar Hameed <mesar.hameed@gmail.com>
#
# This file is part of liblouis.
#

# Developed by:
# Dr. Tamru E. Belay
# Adaptive Technology Specialist
# Ethiopic Braille Programmer
#	 E-mail: <tamru@sympatico.ca <g.braille@sympatico.ca
# Supervised by mesar Hameed <mesar.hameed@gmail.com>

# this table superseeds gez*.*
# remove comment when this table has been completely debugged and verified.


# -------------------------

include en-us-g1.ctb
include braille-patterns.cti

letter \\x1200 125-26
letter \\x1201 125-136
letter \\x1202 125-24
letter \\x1203 125-1
letter \\x1204 125-15
letter \\x1205 125
letter \\x1206 125-135
letter \\x1207 125-1346
letter \\x1208 123-26
letter \\x1209 123-136
letter \\x120A 123-24
letter \\x120B 123-1
letter \\x120C 123-15
letter \\x120D 123
letter \\x120E 123-135
letter \\x120F 123-1346
letter \\x1210 126-26
letter \\x1211 126-136
letter \\x1212 126-24
letter \\x1213 126-1
letter \\x1214 126-15
letter \\x1215 126
letter \\x1216 126-135
letter \\x1218 134-26
letter \\x1219 134-136
letter \\x121A 134-24
letter \\x121B 134-1
letter \\x121C 134-15
letter \\x121D 134
letter \\x121E 134-135
letter \\x121F 134-1346
letter \\x121F 134-1346
letter \\x1220 1456-26
letter \\x1221 1456-136
letter \\x1222 1456-24
letter \\x1223 1456-1
letter \\x1224 1456-15
letter \\x1225 1456
letter \\x1226 1456-135
letter \\x1227 1456-1346
letter \\x1228 1235-26
letter \\x1229 1235-136
letter \\x122A 1235-24
letter \\x122B 1235-1
letter \\x122C 1235-15
letter \\x122D 1235
letter \\x122E 1235-135
letter \\x122F 1235-1346
letter \\x1230 234-26
letter \\x1231 234-136
letter \\x1232 234-24
letter \\x1233 234-1
letter \\x1234 234-15
letter \\x1235 234
letter \\x1236 234-135
letter \\x1237 234-1346
letter \\x1238 146-26
letter \\x1239 146-136
letter \\x123A 146-24
letter \\x123B 146-1
letter \\x123C 146-15
letter \\x123D 146
letter \\x123E 146-135
letter \\x123F 146-1346
letter \\x1240 12345-26
letter \\x1241 12345-136
letter \\x1242 12345-24
letter \\x1243 12345-1
letter \\x1244 12345-15
letter \\x1245 12345
letter \\x1246 12345-135
letter \\x1247 12345-1346
letter \\x1248 12456-26
letter \\x124A 12456-136
letter \\x124B 12456-24
letter \\x124C 12456-1
letter \\x124D 12456-15
letter \\x124E 12456
letter \\x124F 12456-135
letter \\x1260 12-26
letter \\x1261 12-136
letter \\x1262 12-24
letter \\x1263 12-1
letter \\x1264 12-15
letter \\x1265 12
letter \\x1266 12-135
letter \\x1267 12-1346
letter \\x1268 1236-26
letter \\x1269 1236-136
letter \\x126A 1236-24
letter \\x126B 1236-1
letter \\x126C 1236-15
letter \\x126D 1236
letter \\x126E 1236-135
letter \\x126F 1236-1346
letter \\x1270 2345-26
letter \\x1271 2345-136
letter \\x1272 2345-24
letter \\x1273 2345-1
letter \\x1274 2345-15
letter \\x1275 2345
letter \\x1276 2345-135
letter \\x1277 2345-1346
letter \\x1278 16-26
letter \\x1279 16-136
letter \\x127A 16-24
letter \\x127B 16-1
letter \\x127C 16-15
letter \\x127D 16
letter \\x127E 16-135
letter \\x127F 16-1346
letter \\x1280 156-26
letter \\x1281 156-136
letter \\x1282 156-24
letter \\x1283 156-1
letter \\x1284 156-15
letter \\x1285 156
letter \\x1286 156-135
letter \\x1290 1345-26
letter \\x1291 1345-136
letter \\x1292 1345-24
letter \\x1293 1345-1
letter \\x1294 1345-15
letter \\x1295 1345
letter \\x1296 1345-135
letter \\x1297 1345-1346
letter \\x1298 346-26
letter \\x1299 346-136
letter \\x129A 346-24
letter \\x129B 346-1
letter \\x129C 346-15
letter \\x129D 346
letter \\x129E 346-135
letter \\x129F 346-1346
letter \\x12A0 12356-26
letter \\x12A1 12356-136
letter \\x12A2 12356-24
letter \\x12A3 12356-1
letter \\x12A4 12356-15
letter \\x12A5 12356
letter \\x12A6 12356-135
letter \\x12A7 5-12356
letter \\x12A8 13-26
letter \\x12A9 13-136
letter \\x12AA 13-24
letter \\x12AB 13-1
letter \\x12Ac 13-15
letter \\x12AD 13
letter \\x12AE 13-135
letter \\x12B3 13-1346
letter \\x12B8 236-26
letter \\x12B9 236-136
letter \\x12BA 236-24
letter \\x12BB 236-1
letter \\x12BC 236-15
letter \\x12BD 236
letter \\x12BE 236-135
letter \\x12AF 12456-1346
letter \\x12C8 2456-26
letter \\x12C9 2456-136
letter \\x12CA 2456-24
letter \\x12CB 2456-1
letter \\x12CC 2456-15
letter \\x12CD 2456
letter \\x12CE 2456-135
letter \\x12CF 2456-1346
letter \\x12D0 1256-26
letter \\x12D1 1256-136
letter \\x12D2 1256-24
letter \\x12D3 1256-1
letter \\x12D4 1256-15
letter \\x12D5 1256
letter \\x12D6 1256-135
letter \\x12d7 6-135
letter \\x12D8 1356-26
letter \\x12D9 1356-136
letter \\x12DA 1356-24
letter \\x12DB 1356-1
letter \\x12DC 1356-15
letter \\x12DD 1356
letter \\x12DE 1356-135
letter \\x12DF 1356-1346
letter \\x12E0 356-26
letter \\x12E1 356-136
letter \\x12E2 356-24
letter \\x12E3 356-1
letter \\x12E4 356-15
letter \\x12E5 356
letter \\x12E6 356-135
letter \\x12E7 356-1346
letter \\x12E8 13456-26
letter \\x12E9 13456-136
letter \\x12EA 13456-24
letter \\x12EB 13456-1
letter \\x12EC 13456-15
letter \\x12ED 13456
letter \\x12EE 13456-135
letter \\x12F0 145-26
letter \\x12F1 145-136
letter \\x12F2 145-24
letter \\x12F3 145-1
letter \\x12F4 145-15
letter \\x12F5 145
letter \\x12F6 145-135
letter \\x12F7 145-1346
letter \\x12F8 4-145-26
letter \\x12F9 4-145-136
letter \\x12FA 4-145-24
letter \\x12FB 4-145-1
letter \\x12FC 4-145-15
letter \\x12FD 4-145
letter \\x12FE 4-145-135
letter \\x12FF 4-145-1346
letter \\x1300 245-26
letter \\x1301 245-136
letter \\x1302 245-24
letter \\x1303 245-1
letter \\x1304 245-15
letter \\x1305 245
letter \\x1306 245-135
letter \\x1307 245-1346
letter \\x1308 1245-26
letter \\x1309 1245-136
letter \\x130A 1245-24
letter \\x130B 1245-1
letter \\x130C 1245-15
letter \\x130D 1245
letter \\x130E 1245-135
letter \\x130F 1245-1346
letter \\x1312 1245-2456-24
letter \\x1320 23456-26
letter \\x1321 23456-136
letter \\x1322 23456-24
letter \\x1323 23456-1
letter \\x1324 23456-15
letter \\x1325 23456
letter \\x1326 23456-135
letter \\x1327 23456-1346
letter \\x1328 14-26
letter \\x1329 14-136
letter \\x132A 14-24
letter \\x132B 14-1
letter \\x132C 14-15
letter \\x132D 14
letter \\x132E 14-135
letter \\x132F 14-1346
letter \\x1338 2346-26
letter \\x1339 2346-136
letter \\x133A 2346-24
letter \\x133B 2346-1
letter \\x133C 2346-15
letter \\x133D 2346
letter \\x133E 2346-135
letter \\x133F 2346-1346
letter \\x1340 12346-26
letter \\x1341 12346-136
letter \\x1342 12346-24
letter \\x1343 12346-1
letter \\x1344 12346-15
letter \\x1345 12346
letter \\x1346 12346-135
letter \\x1330 235-26
letter \\x1331 235-136
letter \\x1332 235-24
letter \\x1333 235-1
letter \\x1334 235-15
letter \\x1335 235
letter \\x1336 235-135
letter \\x1337 235-1346
letter \\x1348 124-26
letter \\x1349 124-136
letter \\x134A 124-24
letter \\x134B 124-1
letter \\x134C 124-15
letter \\x134D 124
letter \\x134E 124-135
letter \\x134F 124-1346
letter \\x1350 1234-26
letter \\x1351 1234-136
letter \\x1352 12345-24
letter \\x1353 1234-1
letter \\x1354 1234-15
letter \\x1355 1234
letter \\x1356 1234-135
letter \\x1357 1234-1346

# The Ethiopic punctuation Braille Table
punctuation \\x1361 2
punctuation \\x1362 256
punctuation \\x1363 25
punctuation \\x1364 56
punctuation \\x1367 236

`,"en-us-g1.ctb":`# liblouis: English, U.S. grade 1 (EBAE) table
#
#  Based on the Linux screenreader BRLTTY, copyright (C) 1999-2006 by
#  The BRLTTY Team
#
#  Copyright (C) 2004-2006 ViewPlus Technologies, Inc. www.viewplus.com
#  Copyright (C) 2004-2006 JJB Software, Inc. www.jjb-software.com
#
#  This file is part of liblouis.
#
#  liblouis is free software: you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as
#  published by the Free Software Foundation, either version 2.1 of the
#  License, or (at your option) any later version.
#
#  liblouis is distributed in the hope that it will be useful, but
#  WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
#  Lesser General Public License for more details.
#
#  You should have received a copy of the GNU Lesser General Public
#  License along with liblouis. If not, see
#  <http://www.gnu.org/licenses/>.

include chardefs.cti All character definition opcodes

# Braille indicators
numsign 3456  number sign, just a dots operand
letsign 56
noletsignafter .
noletsignafter '
#capsletter 6
#capsword 6-6
#endcapsword 6-3
capsletter 6
begcapsword 6-6
endcapsword 6-3

emphclass italic
emphclass underline
emphclass bold
emphclass transnote

begemphword italic 46-3
endemphword italic 46-36
emphletter italic 46-25

begemphphrase bold 456-46-46
endemphphrase bold before 456-46
lenemphphrase bold 4
begemphword bold 456-46

begemphword underline 456-36
endemphword underline 3-6
lenemphphrase underline 3
begemphphrase underline 456-2356
endemphphrase underline after 6-3

begemph transnote 6-3
endemph transnote 6-3

begcomp 456-346
endcomp 456-156

# literary forms of the decimal digits
include litdigits6Dots.uti

# display/passthrough for unicode braille
include braille-patterns.cti

# Letters are defined in chardefs.cti

# punctuation
prepunc ( 2356
word ( 4-2356
always ( 2356
postpunc ) 2356
word ) 4-2356
always ) 2356
prepunc " 236
postpunc " 356
word " 4-236
prepunc \` 6-236
prepunc ' 6-236
postpunc ' 356-3
word ' 4-3
word 'em = 
word 'tis =
word 'twas =
begnum # 456-1456 print number sign before number
midnum , 2
postpunc , 2
word , 4-2
decpoint . 46
midnum - 36
hyphen - 36
always \\s--\\s 36-36
always \\s-\\s 36-36
midnum \\x00ad 36
postpunc . 256
word . 4-256
postpunc ; 23
word ; 4-23
midnum : 25
postpunc : 25
always : 4-25
postpunc ! 235
always ! 4-235
midnum / 34
always / 456-34
always < 5-13
always = 46-13
always > 46-2
always + 4-346
postpunc ? 236
endword s' 234-3
word ? 4-236
endnum st 34
endnum nd 1345-145
endnum rd 1235-145
noback endnum 's 3-234
endnum th 1456
endnum 's 3-234
always % 4-25-1234
midnum ^ 45
always ^ 456-126
always ~ 4-156
always & 4-12346
midnum * 4-16
always * 35-35
prepunc [ 6-2356
word [ 4-6-2356
always [ 6-2356
postpunc ] 2356-3
word ] 4-2356-3
always ] 2356-3
prepunc { 56-2356
word { 4-56-2356
always { 56-2356
postpunc } 2356-23
word } 4-2356-23
always } 2356-23
always @ 4-1
always \\\\ 4-1256
always | 456-1256
always \\s-\\s 36-36
always ..." 3-3-3-356
always ... 3-3-3
always ...' 3-3-3-356-3
repeated .... 0
repeated ____ 456
repeated ---- 36
always .\\s.\\s." 3-3-3-356
always .\\s.\\s. 3-3-3 . . .
begnum $ 256
nofor begnum $ 256-3456
always $ 4-256

# special character sequences
compbrl :// URLs
compbrl ()
compbrl www.
compbrl ::
compbrl .com
compbrl .edu
compbrl .gov
compbrl .ini
compbrl .mil
compbrl .net
compbrl .org
compbrl .doc
compbrl .xml
compbrl .xsl
compbrl .htm
compbrl .html
compbrl .tex
compbrl .txt
compbrl .gif
compbrl .jpg
compbrl .png
compbrl .wav
compbrl .tar
compbrl .zip

noback context "\\e"$a *
noback always \\\\_ 56 letter sign before Roman page numbers
noback pass2 @56-56 @56
noback pass2 @3-56 @3

`,"braille-patterns.cti":`#
#  Copyright (C) 2010, 2011 DocArch <http://www.docarch.be>.
#
#  This file is part of liblouis.
#
#  liblouis is free software: you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as
#  published by the Free Software Foundation, either version 2.1 of the
#  License, or (at your option) any later version.
#
#  liblouis is distributed in the hope that it will be useful, but
#  WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
#  Lesser General Public License for more details.
#
#  You should have received a copy of the GNU Lesser General Public
#  License along with liblouis. If not, see
#  <http://www.gnu.org/licenses/>.
#
# ----------------------------------------------------------------------------------------------
#  odt2braille - Braille authoring in OpenOffice.org.
# ----------------------------------------------------------------------------------------------

# ----------------------------------------------------------------------------------------------
# Unicode 2800..28FF  Braille Patterns
# ----------------------------------------------------------------------------------------------

noback sign        \\x2800  0                    # \u2800                   BRAILLE PATTERN DOTS-0
noback sign        \\x2801  1                    # \u2801                   BRAILLE PATTERN DOTS-1
noback sign        \\x2802  2                    # \u2802                   BRAILLE PATTERN DOTS-2
noback sign        \\x2803  12                   # \u2803                   BRAILLE PATTERN DOTS-12
noback sign        \\x2804  3                    # \u2804                   BRAILLE PATTERN DOTS-3
noback sign        \\x2805  13                   # \u2805                   BRAILLE PATTERN DOTS-13
noback sign        \\x2806  23                   # \u2806                   BRAILLE PATTERN DOTS-23
noback sign        \\x2807  123                  # \u2807                   BRAILLE PATTERN DOTS-123
noback sign        \\x2808  4                    # \u2808                   BRAILLE PATTERN DOTS-4
noback sign        \\x2809  14                   # \u2809                   BRAILLE PATTERN DOTS-14
noback sign        \\x280A  24                   # \u280A                   BRAILLE PATTERN DOTS-24
noback sign        \\x280B  124                  # \u280B                   BRAILLE PATTERN DOTS-124
noback sign        \\x280C  34                   # \u280C                   BRAILLE PATTERN DOTS-34
noback sign        \\x280D  134                  # \u280D                   BRAILLE PATTERN DOTS-134
noback sign        \\x280E  234                  # \u280E                   BRAILLE PATTERN DOTS-234
noback sign        \\x280F  1234                 # \u280F                   BRAILLE PATTERN DOTS-1234
noback sign        \\x2810  5                    # \u2810                   BRAILLE PATTERN DOTS-5
noback sign        \\x2811  15                   # \u2811                   BRAILLE PATTERN DOTS-15
noback sign        \\x2812  25                   # \u2812                   BRAILLE PATTERN DOTS-25
noback sign        \\x2813  125                  # \u2813                   BRAILLE PATTERN DOTS-125
noback sign        \\x2814  35                   # \u2814                   BRAILLE PATTERN DOTS-35
noback sign        \\x2815  135                  # \u2815                   BRAILLE PATTERN DOTS-135
noback sign        \\x2816  235                  # \u2816                   BRAILLE PATTERN DOTS-235
noback sign        \\x2817  1235                 # \u2817                   BRAILLE PATTERN DOTS-1235
noback sign        \\x2818  45                   # \u2818                   BRAILLE PATTERN DOTS-45
noback sign        \\x2819  145                  # \u2819                   BRAILLE PATTERN DOTS-145
noback sign        \\x281A  245                  # \u281A                   BRAILLE PATTERN DOTS-245
noback sign        \\x281B  1245                 # \u281B                   BRAILLE PATTERN DOTS-1245
noback sign        \\x281C  345                  # \u281C                   BRAILLE PATTERN DOTS-345
noback sign        \\x281D  1345                 # \u281D                   BRAILLE PATTERN DOTS-1345
noback sign        \\x281E  2345                 # \u281E                   BRAILLE PATTERN DOTS-2345
noback sign        \\x281F  12345                # \u281F                   BRAILLE PATTERN DOTS-12345
noback sign        \\x2820  6                    # \u2820                   BRAILLE PATTERN DOTS-6
noback sign        \\x2821  16                   # \u2821                   BRAILLE PATTERN DOTS-16
noback sign        \\x2822  26                   # \u2822                   BRAILLE PATTERN DOTS-26
noback sign        \\x2823  126                  # \u2823                   BRAILLE PATTERN DOTS-126
noback sign        \\x2824  36                   # \u2824                   BRAILLE PATTERN DOTS-36
noback sign        \\x2825  136                  # \u2825                   BRAILLE PATTERN DOTS-136
noback sign        \\x2826  236                  # \u2826                   BRAILLE PATTERN DOTS-236
noback sign        \\x2827  1236                 # \u2827                   BRAILLE PATTERN DOTS-1236
noback sign        \\x2828  46                   # \u2828                   BRAILLE PATTERN DOTS-46
noback sign        \\x2829  146                  # \u2829                   BRAILLE PATTERN DOTS-146
noback sign        \\x282A  246                  # \u282A                   BRAILLE PATTERN DOTS-246
noback sign        \\x282B  1246                 # \u282B                   BRAILLE PATTERN DOTS-1246
noback sign        \\x282C  346                  # \u282C                   BRAILLE PATTERN DOTS-346
noback sign        \\x282D  1346                 # \u282D                   BRAILLE PATTERN DOTS-1346
noback sign        \\x282E  2346                 # \u282E                   BRAILLE PATTERN DOTS-2346
noback sign        \\x282F  12346                # \u282F                   BRAILLE PATTERN DOTS-12346
noback sign        \\x2830  56                   # \u2830                   BRAILLE PATTERN DOTS-56
noback sign        \\x2831  156                  # \u2831                   BRAILLE PATTERN DOTS-156
noback sign        \\x2832  256                  # \u2832                   BRAILLE PATTERN DOTS-256
noback sign        \\x2833  1256                 # \u2833                   BRAILLE PATTERN DOTS-1256
noback sign        \\x2834  356                  # \u2834                   BRAILLE PATTERN DOTS-356
noback sign        \\x2835  1356                 # \u2835                   BRAILLE PATTERN DOTS-1356
noback sign        \\x2836  2356                 # \u2836                   BRAILLE PATTERN DOTS-2356
noback sign        \\x2837  12356                # \u2837                   BRAILLE PATTERN DOTS-12356
noback sign        \\x2838  456                  # \u2838                   BRAILLE PATTERN DOTS-456
noback sign        \\x2839  1456                 # \u2839                   BRAILLE PATTERN DOTS-1456
noback sign        \\x283A  2456                 # \u283A                   BRAILLE PATTERN DOTS-2456
noback sign        \\x283B  12456                # \u283B                   BRAILLE PATTERN DOTS-12456
noback sign        \\x283C  3456                 # \u283C                   BRAILLE PATTERN DOTS-3456
noback sign        \\x283D  13456                # \u283D                   BRAILLE PATTERN DOTS-13456
noback sign        \\x283E  23456                # \u283E                   BRAILLE PATTERN DOTS-23456
noback sign        \\x283F  123456               # \u283F                   BRAILLE PATTERN DOTS-123456
noback sign        \\x2840  7                    # \u2840                   BRAILLE PATTERN DOTS-7
noback sign        \\x2841  17                   # \u2841                   BRAILLE PATTERN DOTS-17
noback sign        \\x2842  27                   # \u2842                   BRAILLE PATTERN DOTS-27
noback sign        \\x2843  127                  # \u2843                   BRAILLE PATTERN DOTS-127
noback sign        \\x2844  37                   # \u2844                   BRAILLE PATTERN DOTS-37
noback sign        \\x2845  137                  # \u2845                   BRAILLE PATTERN DOTS-137
noback sign        \\x2846  237                  # \u2846                   BRAILLE PATTERN DOTS-237
noback sign        \\x2847  1237                 # \u2847                   BRAILLE PATTERN DOTS-1237
noback sign        \\x2848  47                   # \u2848                   BRAILLE PATTERN DOTS-47
noback sign        \\x2849  147                  # \u2849                   BRAILLE PATTERN DOTS-147
noback sign        \\x284A  247                  # \u284A                   BRAILLE PATTERN DOTS-247
noback sign        \\x284B  1247                 # \u284B                   BRAILLE PATTERN DOTS-1247
noback sign        \\x284C  347                  # \u284C                   BRAILLE PATTERN DOTS-347
noback sign        \\x284D  1347                 # \u284D                   BRAILLE PATTERN DOTS-1347
noback sign        \\x284E  2347                 # \u284E                   BRAILLE PATTERN DOTS-2347
noback sign        \\x284F  12347                # \u284F                   BRAILLE PATTERN DOTS-12347
noback sign        \\x2850  57                   # \u2850                   BRAILLE PATTERN DOTS-57
noback sign        \\x2851  157                  # \u2851                   BRAILLE PATTERN DOTS-157
noback sign        \\x2852  257                  # \u2852                   BRAILLE PATTERN DOTS-257
noback sign        \\x2853  1257                 # \u2853                   BRAILLE PATTERN DOTS-1257
noback sign        \\x2854  357                  # \u2854                   BRAILLE PATTERN DOTS-357
noback sign        \\x2855  1357                 # \u2855                   BRAILLE PATTERN DOTS-1357
noback sign        \\x2856  2357                 # \u2856                   BRAILLE PATTERN DOTS-2357
noback sign        \\x2857  12357                # \u2857                   BRAILLE PATTERN DOTS-12357
noback sign        \\x2858  457                  # \u2858                   BRAILLE PATTERN DOTS-457
noback sign        \\x2859  1457                 # \u2859                   BRAILLE PATTERN DOTS-1457
noback sign        \\x285A  2457                 # \u285A                   BRAILLE PATTERN DOTS-2457
noback sign        \\x285B  12457                # \u285B                   BRAILLE PATTERN DOTS-12457
noback sign        \\x285C  3457                 # \u285C                   BRAILLE PATTERN DOTS-3457
noback sign        \\x285D  13457                # \u285D                   BRAILLE PATTERN DOTS-13457
noback sign        \\x285E  23457                # \u285E                   BRAILLE PATTERN DOTS-23457
noback sign        \\x285F  123457               # \u285F                   BRAILLE PATTERN DOTS-123457
noback sign        \\x2860  67                   # \u2860                   BRAILLE PATTERN DOTS-67
noback sign        \\x2861  167                  # \u2861                   BRAILLE PATTERN DOTS-167
noback sign        \\x2862  267                  # \u2862                   BRAILLE PATTERN DOTS-267
noback sign        \\x2863  1267                 # \u2863                   BRAILLE PATTERN DOTS-1267
noback sign        \\x2864  367                  # \u2864                   BRAILLE PATTERN DOTS-367
noback sign        \\x2865  1367                 # \u2865                   BRAILLE PATTERN DOTS-1367
noback sign        \\x2866  2367                 # \u2866                   BRAILLE PATTERN DOTS-2367
noback sign        \\x2867  12367                # \u2867                   BRAILLE PATTERN DOTS-12367
noback sign        \\x2868  467                  # \u2868                   BRAILLE PATTERN DOTS-467
noback sign        \\x2869  1467                 # \u2869                   BRAILLE PATTERN DOTS-1467
noback sign        \\x286A  2467                 # \u286A                   BRAILLE PATTERN DOTS-2467
noback sign        \\x286B  12467                # \u286B                   BRAILLE PATTERN DOTS-12467
noback sign        \\x286C  3467                 # \u286C                   BRAILLE PATTERN DOTS-3467
noback sign        \\x286D  13467                # \u286D                   BRAILLE PATTERN DOTS-13467
noback sign        \\x286E  23467                # \u286E                   BRAILLE PATTERN DOTS-23467
noback sign        \\x286F  123467               # \u286F                   BRAILLE PATTERN DOTS-123467
noback sign        \\x2870  567                  # \u2870                   BRAILLE PATTERN DOTS-567
noback sign        \\x2871  1567                 # \u2871                   BRAILLE PATTERN DOTS-1567
noback sign        \\x2872  2567                 # \u2872                   BRAILLE PATTERN DOTS-2567
noback sign        \\x2873  12567                # \u2873                   BRAILLE PATTERN DOTS-12567
noback sign        \\x2874  3567                 # \u2874                   BRAILLE PATTERN DOTS-3567
noback sign        \\x2875  13567                # \u2875                   BRAILLE PATTERN DOTS-13567
noback sign        \\x2876  23567                # \u2876                   BRAILLE PATTERN DOTS-23567
noback sign        \\x2877  123567               # \u2877                   BRAILLE PATTERN DOTS-123567
noback sign        \\x2878  4567                 # \u2878                   BRAILLE PATTERN DOTS-4567
noback sign        \\x2879  14567                # \u2879                   BRAILLE PATTERN DOTS-14567
noback sign        \\x287A  24567                # \u287A                   BRAILLE PATTERN DOTS-24567
noback sign        \\x287B  124567               # \u287B                   BRAILLE PATTERN DOTS-124567
noback sign        \\x287C  34567                # \u287C                   BRAILLE PATTERN DOTS-34567
noback sign        \\x287D  134567               # \u287D                   BRAILLE PATTERN DOTS-134567
noback sign        \\x287E  234567               # \u287E                   BRAILLE PATTERN DOTS-234567
noback sign        \\x287F  1234567              # \u287F                   BRAILLE PATTERN DOTS-1234567
noback sign        \\x2880  8                    # \u2880                   BRAILLE PATTERN DOTS-8
noback sign        \\x2881  18                   # \u2881                   BRAILLE PATTERN DOTS-18
noback sign        \\x2882  28                   # \u2882                   BRAILLE PATTERN DOTS-28
noback sign        \\x2883  128                  # \u2883                   BRAILLE PATTERN DOTS-128
noback sign        \\x2884  38                   # \u2884                   BRAILLE PATTERN DOTS-38
noback sign        \\x2885  138                  # \u2885                   BRAILLE PATTERN DOTS-138
noback sign        \\x2886  238                  # \u2886                   BRAILLE PATTERN DOTS-238
noback sign        \\x2887  1238                 # \u2887                   BRAILLE PATTERN DOTS-1238
noback sign        \\x2888  48                   # \u2888                   BRAILLE PATTERN DOTS-48
noback sign        \\x2889  148                  # \u2889                   BRAILLE PATTERN DOTS-148
noback sign        \\x288A  248                  # \u288A                   BRAILLE PATTERN DOTS-248
noback sign        \\x288B  1248                 # \u288B                   BRAILLE PATTERN DOTS-1248
noback sign        \\x288C  348                  # \u288C                   BRAILLE PATTERN DOTS-348
noback sign        \\x288D  1348                 # \u288D                   BRAILLE PATTERN DOTS-1348
noback sign        \\x288E  2348                 # \u288E                   BRAILLE PATTERN DOTS-2348
noback sign        \\x288F  12348                # \u288F                   BRAILLE PATTERN DOTS-12348
noback sign        \\x2890  58                   # \u2890                   BRAILLE PATTERN DOTS-58
noback sign        \\x2891  158                  # \u2891                   BRAILLE PATTERN DOTS-158
noback sign        \\x2892  258                  # \u2892                   BRAILLE PATTERN DOTS-258
noback sign        \\x2893  1258                 # \u2893                   BRAILLE PATTERN DOTS-1258
noback sign        \\x2894  358                  # \u2894                   BRAILLE PATTERN DOTS-358
noback sign        \\x2895  1358                 # \u2895                   BRAILLE PATTERN DOTS-1358
noback sign        \\x2896  2358                 # \u2896                   BRAILLE PATTERN DOTS-2358
noback sign        \\x2897  12358                # \u2897                   BRAILLE PATTERN DOTS-12358
noback sign        \\x2898  458                  # \u2898                   BRAILLE PATTERN DOTS-458
noback sign        \\x2899  1458                 # \u2899                   BRAILLE PATTERN DOTS-1458
noback sign        \\x289A  2458                 # \u289A                   BRAILLE PATTERN DOTS-2458
noback sign        \\x289B  12458                # \u289B                   BRAILLE PATTERN DOTS-12458
noback sign        \\x289C  3458                 # \u289C                   BRAILLE PATTERN DOTS-3458
noback sign        \\x289D  13458                # \u289D                   BRAILLE PATTERN DOTS-13458
noback sign        \\x289E  23458                # \u289E                   BRAILLE PATTERN DOTS-23458
noback sign        \\x289F  123458               # \u289F                   BRAILLE PATTERN DOTS-123458
noback sign        \\x28A0  68                   # \u28A0                   BRAILLE PATTERN DOTS-68
noback sign        \\x28A1  168                  # \u28A1                   BRAILLE PATTERN DOTS-168
noback sign        \\x28A2  268                  # \u28A2                   BRAILLE PATTERN DOTS-268
noback sign        \\x28A3  1268                 # \u28A3                   BRAILLE PATTERN DOTS-1268
noback sign        \\x28A4  368                  # \u28A4                   BRAILLE PATTERN DOTS-368
noback sign        \\x28A5  1368                 # \u28A5                   BRAILLE PATTERN DOTS-1368
noback sign        \\x28A6  2368                 # \u28A6                   BRAILLE PATTERN DOTS-2368
noback sign        \\x28A7  12368                # \u28A7                   BRAILLE PATTERN DOTS-12368
noback sign        \\x28A8  468                  # \u28A8                   BRAILLE PATTERN DOTS-468
noback sign        \\x28A9  1468                 # \u28A9                   BRAILLE PATTERN DOTS-1468
noback sign        \\x28AA  2468                 # \u28AA                   BRAILLE PATTERN DOTS-2468
noback sign        \\x28AB  12468                # \u28AB                   BRAILLE PATTERN DOTS-12468
noback sign        \\x28AC  3468                 # \u28AC                   BRAILLE PATTERN DOTS-3468
noback sign        \\x28AD  13468                # \u28AD                   BRAILLE PATTERN DOTS-13468
noback sign        \\x28AE  23468                # \u28AE                   BRAILLE PATTERN DOTS-23468
noback sign        \\x28AF  123468               # \u28AF                   BRAILLE PATTERN DOTS-123468
noback sign        \\x28B0  568                  # \u28B0                   BRAILLE PATTERN DOTS-568
noback sign        \\x28B1  1568                 # \u28B1                   BRAILLE PATTERN DOTS-1568
noback sign        \\x28B2  2568                 # \u28B2                   BRAILLE PATTERN DOTS-2568
noback sign        \\x28B3  12568                # \u28B3                   BRAILLE PATTERN DOTS-12568
noback sign        \\x28B4  3568                 # \u28B4                   BRAILLE PATTERN DOTS-3568
noback sign        \\x28B5  13568                # \u28B5                   BRAILLE PATTERN DOTS-13568
noback sign        \\x28B6  23568                # \u28B6                   BRAILLE PATTERN DOTS-23568
noback sign        \\x28B7  123568               # \u28B7                   BRAILLE PATTERN DOTS-123568
noback sign        \\x28B8  4568                 # \u28B8                   BRAILLE PATTERN DOTS-4568
noback sign        \\x28B9  14568                # \u28B9                   BRAILLE PATTERN DOTS-14568
noback sign        \\x28BA  24568                # \u28BA                   BRAILLE PATTERN DOTS-24568
noback sign        \\x28BB  124568               # \u28BB                   BRAILLE PATTERN DOTS-124568
noback sign        \\x28BC  34568                # \u28BC                   BRAILLE PATTERN DOTS-34568
noback sign        \\x28BD  134568               # \u28BD                   BRAILLE PATTERN DOTS-134568
noback sign        \\x28BE  234568               # \u28BE                   BRAILLE PATTERN DOTS-234568
noback sign        \\x28BF  1234568              # \u28BF                   BRAILLE PATTERN DOTS-1234568
noback sign        \\x28C0  78                   # \u28C0                   BRAILLE PATTERN DOTS-78
noback sign        \\x28C1  178                  # \u28C1                   BRAILLE PATTERN DOTS-178
noback sign        \\x28C2  278                  # \u28C2                   BRAILLE PATTERN DOTS-278
noback sign        \\x28C3  1278                 # \u28C3                   BRAILLE PATTERN DOTS-1278
noback sign        \\x28C4  378                  # \u28C4                   BRAILLE PATTERN DOTS-378
noback sign        \\x28C5  1378                 # \u28C5                   BRAILLE PATTERN DOTS-1378
noback sign        \\x28C6  2378                 # \u28C6                   BRAILLE PATTERN DOTS-2378
noback sign        \\x28C7  12378                # \u28C7                   BRAILLE PATTERN DOTS-12378
noback sign        \\x28C8  478                  # \u28C8                   BRAILLE PATTERN DOTS-478
noback sign        \\x28C9  1478                 # \u28C9                   BRAILLE PATTERN DOTS-1478
noback sign        \\x28CA  2478                 # \u28CA                   BRAILLE PATTERN DOTS-2478
noback sign        \\x28CB  12478                # \u28CB                   BRAILLE PATTERN DOTS-12478
noback sign        \\x28CC  3478                 # \u28CC                   BRAILLE PATTERN DOTS-3478
noback sign        \\x28CD  13478                # \u28CD                   BRAILLE PATTERN DOTS-13478
noback sign        \\x28CE  23478                # \u28CE                   BRAILLE PATTERN DOTS-23478
noback sign        \\x28CF  123478               # \u28CF                   BRAILLE PATTERN DOTS-123478
noback sign        \\x28D0  578                  # \u28D0                   BRAILLE PATTERN DOTS-578
noback sign        \\x28D1  1578                 # \u28D1                   BRAILLE PATTERN DOTS-1578
noback sign        \\x28D2  2578                 # \u28D2                   BRAILLE PATTERN DOTS-2578
noback sign        \\x28D3  12578                # \u28D3                   BRAILLE PATTERN DOTS-12578
noback sign        \\x28D4  3578                 # \u28D4                   BRAILLE PATTERN DOTS-3578
noback sign        \\x28D5  13578                # \u28D5                   BRAILLE PATTERN DOTS-13578
noback sign        \\x28D6  23578                # \u28D6                   BRAILLE PATTERN DOTS-23578
noback sign        \\x28D7  123578               # \u28D7                   BRAILLE PATTERN DOTS-123578
noback sign        \\x28D8  4578                 # \u28D8                   BRAILLE PATTERN DOTS-4578
noback sign        \\x28D9  14578                # \u28D9                   BRAILLE PATTERN DOTS-14578
noback sign        \\x28DA  24578                # \u28DA                   BRAILLE PATTERN DOTS-24578
noback sign        \\x28DB  124578               # \u28DB                   BRAILLE PATTERN DOTS-124578
noback sign        \\x28DC  34578                # \u28DC                   BRAILLE PATTERN DOTS-34578
noback sign        \\x28DD  134578               # \u28DD                   BRAILLE PATTERN DOTS-134578
noback sign        \\x28DE  234578               # \u28DE                   BRAILLE PATTERN DOTS-234578
noback sign        \\x28DF  1234578              # \u28DF                   BRAILLE PATTERN DOTS-1234578
noback sign        \\x28E0  678                  # \u28E0                   BRAILLE PATTERN DOTS-678
noback sign        \\x28E1  1678                 # \u28E1                   BRAILLE PATTERN DOTS-1678
noback sign        \\x28E2  2678                 # \u28E2                   BRAILLE PATTERN DOTS-2678
noback sign        \\x28E3  12678                # \u28E3                   BRAILLE PATTERN DOTS-12678
noback sign        \\x28E4  3678                 # \u28E4                   BRAILLE PATTERN DOTS-3678
noback sign        \\x28E5  13678                # \u28E5                   BRAILLE PATTERN DOTS-13678
noback sign        \\x28E6  23678                # \u28E6                   BRAILLE PATTERN DOTS-23678
noback sign        \\x28E7  123678               # \u28E7                   BRAILLE PATTERN DOTS-123678
noback sign        \\x28E8  4678                 # \u28E8                   BRAILLE PATTERN DOTS-4678
noback sign        \\x28E9  14678                # \u28E9                   BRAILLE PATTERN DOTS-14678
noback sign        \\x28EA  24678                # \u28EA                   BRAILLE PATTERN DOTS-24678
noback sign        \\x28EB  124678               # \u28EB                   BRAILLE PATTERN DOTS-124678
noback sign        \\x28EC  34678                # \u28EC                   BRAILLE PATTERN DOTS-34678
noback sign        \\x28ED  134678               # \u28ED                   BRAILLE PATTERN DOTS-134678
noback sign        \\x28EE  234678               # \u28EE                   BRAILLE PATTERN DOTS-234678
noback sign        \\x28EF  1234678              # \u28EF                   BRAILLE PATTERN DOTS-1234678
noback sign        \\x28F0  5678                 # \u28F0                   BRAILLE PATTERN DOTS-5678
noback sign        \\x28F1  15678                # \u28F1                   BRAILLE PATTERN DOTS-15678
noback sign        \\x28F2  25678                # \u28F2                   BRAILLE PATTERN DOTS-25678
noback sign        \\x28F3  125678               # \u28F3                   BRAILLE PATTERN DOTS-125678
noback sign        \\x28F4  35678                # \u28F4                   BRAILLE PATTERN DOTS-35678
noback sign        \\x28F5  135678               # \u28F5                   BRAILLE PATTERN DOTS-135678
noback sign        \\x28F6  235678               # \u28F6                   BRAILLE PATTERN DOTS-235678
noback sign        \\x28F7  1235678              # \u28F7                   BRAILLE PATTERN DOTS-1235678
noback sign        \\x28F8  45678                # \u28F8                   BRAILLE PATTERN DOTS-45678
noback sign        \\x28F9  145678               # \u28F9                   BRAILLE PATTERN DOTS-145678
noback sign        \\x28FA  245678               # \u28FA                   BRAILLE PATTERN DOTS-245678
noback sign        \\x28FB  1245678              # \u28FB                   BRAILLE PATTERN DOTS-1245678
noback sign        \\x28FC  345678               # \u28FC                   BRAILLE PATTERN DOTS-345678
noback sign        \\x28FD  1345678              # \u28FD                   BRAILLE PATTERN DOTS-1345678
noback sign        \\x28FE  2345678              # \u28FE                   BRAILLE PATTERN DOTS-2345678
noback sign        \\x28FF  12345678             # \u28FF                   BRAILLE PATTERN DOTS-12345678


# ----------------------------------------------------------------------------------------------

`,"chardefs.cti":`# liblouis: English, U.S. (EBAE) character definitions table
#
#  Based on the Linux screenreader BRLTTY, copyright (C) 1999-2006 by
#  The BRLTTY Team
#
#  Copyright (C) 2004-2006 ViewPlus Technologies, Inc. www.viewplus.com
#  Copyright (C) 2004-2006 JJB Software, Inc. www.jjb-software.com
#
#  This file is part of liblouis.
#
#  liblouis is free software: you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as
#  published by the Free Software Foundation, either version 2.1 of the
#  License, or (at your option) any later version.
#
#  liblouis is distributed in the hope that it will be useful, but
#  WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
#  Lesser General Public License for more details.
#
#  You should have received a copy of the GNU Lesser General Public
#  License along with liblouis. If not, see
#  <http://www.gnu.org/licenses/>.

# Computer braille single-cell characters
space \\s 0 blank
space \\t 9 tab
space \\x000a 0 newline
space \\x000c 0
space \\x000d 0 carriage return
space \\x001b 1b escape character for html back-translation
space \\x00A0 a NO-BREAK SPACE <noBreak> 0020 NON-BREAKING SPACE 
include loweredDigits6Dots.uti

include latinLetterDef8Dots.uti

punctuation ( 12356
punctuation } 12456
punctuation ] 124567
punctuation ? 1456
punctuation : 156
punctuation ) 23456
punctuation ! 2346
punctuation { 246
punctuation [ 2467
punctuation ' 3
punctuation - 36
punctuation . 46
punctuation " 5
punctuation ; 56
punctuation , 6
sign & 12346
sign $ 1246
sign | 1256
sign \\\\ 12567
sign % 146
sign * 16
sign # 3456
punctuation \` 4
sign _ 456
sign ^ 457
sign @ 47
math = 123456
math < 126
math / 34
math > 345
math + 346
math ~ 45

# Accented letters
lowercase \\x00DF 4-234 LATIN SMALL LETTER SHARP S German 
lowercase \\x00E0 4-1 LATIN SMALL LETTER A WITH GRAVE 0061 0300 LATIN 
lowercase \\x00E1 4-1 LATIN SMALL LETTER A WITH ACUTE 0061 0301 LATIN 
lowercase \\x00E2 4-1 LATIN SMALL LETTER A WITH CIRCUMFLEX 0061 0302 
lowercase \\x00E3 4-1 LATIN SMALL LETTER A WITH TILDE 0061 0303 LATIN 
lowercase \\x00E4 4-1 LATIN SMALL LETTER A WITH DIAERESIS 0061 0308 LATIN 
lowercase \\x00E5 4-1 LATIN SMALL LETTER A WITH RING ABOVE 0061 030A 
lowercase \\x00E6 4-1 LATIN SMALL LETTER AE LATIN SMALL LETTER A E ash * 
lowercase \\x00E7 4-14 LATIN SMALL LETTER C WITH CEDILLA 0063 0327 LATIN 
lowercase \\x00E8 4-15 LATIN SMALL LETTER E WITH GRAVE 0065 0300 LATIN 
lowercase \\x00E9 4-15 LATIN SMALL LETTER E WITH ACUTE 0065 0301 LATIN 
lowercase \\x00EA 4-15 LATIN SMALL LETTER E WITH CIRCUMFLEX 0065 0302 
lowercase \\x00EB 4-15 LATIN SMALL LETTER E WITH DIAERESIS 0065 0308 
lowercase \\x00EC 4-24 LATIN SMALL LETTER I WITH GRAVE 0069 0300 LATIN 
lowercase \\x00ED 4-24 LATIN SMALL LETTER I WITH ACUTE 0069 0301 LATIN 
lowercase \\x00EE 4-24 LATIN SMALL LETTER I WITH CIRCUMFLEX 0069 0302 
lowercase \\x00EF 4-24 LATIN SMALL LETTER I WITH DIAERESIS 0069 0308 
lowercase \\x00F0 4-15 LATIN SMALL LETTER ETH Icelandic 00D0 00D0
lowercase \\x00F1 4-1345 LATIN SMALL LETTER N WITH TILDE 006E 0303 LATIN 
lowercase \\x00F2 4-135 LATIN SMALL LETTER O WITH GRAVE 006F 0300 LATIN 
lowercase \\x00F3 4-135 LATIN SMALL LETTER O WITH ACUTE 006F 0301 LATIN 
lowercase \\x00F4 4-135 LATIN SMALL LETTER O WITH CIRCUMFLEX 006F 0302 
lowercase \\x00F5 4-135 LATIN SMALL LETTER O WITH TILDE 006F 0303 LATIN 
lowercase \\x00F6 4-135 LATIN SMALL LETTER O WITH DIAERESIS 006F 0308 
lowercase \\x00F8 4-135 LATIN SMALL LETTER O WITH STROKE LATIN SMALL 
lowercase \\x00F9 4-136 LATIN SMALL LETTER U WITH GRAVE 0075 0300 LATIN 
lowercase \\x00FA 4-136 LATIN SMALL LETTER U WITH ACUTE 0075 0301 LATIN 
lowercase \\x00FB 4-136 LATIN SMALL LETTER U WITH CIRCUMFLEX 0075 0302 
lowercase \\x00FC 4-136 LATIN SMALL LETTER U WITH DIAERESIS 0075 0308 
lowercase \\x00FD 4-13456 LATIN SMALL LETTER Y WITH ACUTE 0079 0301 LATIN 
lowercase \\x00FE 4-2345 LATIN SMALL LETTER THORN Icelandic 00DE 00DE
lowercase \\x00FF 4-13456 LATIN SMALL LETTER Y WITH DIAERESIS 0079 0308 
uppercase \\x00C0 4-1 LATIN CAPITAL LETTER A WITH GRAVE 0041 0300 LATIN 
uppercase \\x00C1 4-1 LATIN CAPITAL LETTER A WITH ACUTE 0041 0301 LATIN 
uppercase \\x00C2 4-1 LATIN CAPITAL LETTER A WITH CIRCUMFLEX 0041 0302 
uppercase \\x00C3 4-1 LATIN CAPITAL LETTER A WITH TILDE 0041 0303 LATIN 
uppercase \\x00C4 4-1 LATIN CAPITAL LETTER A WITH DIAERESIS 0041 0308 
uppercase \\x00C5 4-1 LATIN CAPITAL LETTER A WITH RING ABOVE 0041 030A 
uppercase \\x00C6 4-1 LATIN CAPITAL LETTER AE LATIN CAPITAL LETTER A E 
uppercase \\x00C7 4-14 LATIN CAPITAL LETTER C WITH CEDILLA 0043 0327 
uppercase \\x00C8 4-15 LATIN CAPITAL LETTER E WITH GRAVE 0045 0300 LATIN 
uppercase \\x00C9 4-15 LATIN CAPITAL LETTER E WITH ACUTE 0045 0301 LATIN 
uppercase \\x00CA 4-15 LATIN CAPITAL LETTER E WITH CIRCUMFLEX 0045 0302 
uppercase \\x00CB 4-15 LATIN CAPITAL LETTER E WITH DIAERESIS 0045 0308 
uppercase \\x00CC 4-24 LATIN CAPITAL LETTER I WITH GRAVE 0049 0300 LATIN 
uppercase \\x00CD 4-24 LATIN CAPITAL LETTER I WITH ACUTE 0049 0301 LATIN 
uppercase \\x00CE 4-24 LATIN CAPITAL LETTER I WITH CIRCUMFLEX 0049 0302 
uppercase \\x00CF 4-24 LATIN CAPITAL LETTER I WITH DIAERESIS 0049 0308 
uppercase \\x00D0 4-15 LATIN CAPITAL LETTER ETH Icelandic 00F0 
uppercase \\x00D1 4-1345 LATIN CAPITAL LETTER N WITH TILDE 004E 0303 
uppercase \\x00D2 4-135 LATIN CAPITAL LETTER O WITH GRAVE 004F 0300 LATIN 
uppercase \\x00D3 4-135 LATIN CAPITAL LETTER O WITH ACUTE 004F 0301 LATIN 
uppercase \\x00D4 4-135 LATIN CAPITAL LETTER O WITH CIRCUMFLEX 004F 0302 
uppercase \\x00D6 4-135 LATIN CAPITAL LETTER O WITH DIAERESIS 004F 0308 
uppercase \\x00D8 4-135 LATIN CAPITAL LETTER O WITH STROKE LATIN CAPITAL 
uppercase \\x00D9 4-136 LATIN CAPITAL LETTER U WITH GRAVE 0055 0300 LATIN 
uppercase \\x00DA 4-136 LATIN CAPITAL LETTER U WITH ACUTE 0055 0301 LATIN 
uppercase \\x00DB 4-136 LATIN CAPITAL LETTER U WITH CIRCUMFLEX 0055 0302 
uppercase \\x00DC 4-136 LATIN CAPITAL LETTER U WITH DIAERESIS 0055 0308 
uppercase \\x00DD 4-13456 LATIN CAPITAL LETTER Y WITH ACUTE 0059 0301 
uppercase \\x00DE 4-2345 LATIN CAPITAL LETTER THORN Icelandic 00FE 

# Miscellaneous
math \\x00B1 346-36 PLUS-MINUS SIGN PLUS-OR-MINUS SIGN 
math \\x00B7 4-16 MIDDLE DOT 
math \\x00BC 1456-2-34-256-3456 VULGAR FRACTION ONE QUARTER No 0031 2044 
math \\x00BD 1456-2-34-23-3456 VULGAR FRACTION ONE HALF No 0031 2044 0032 
math \\x00BE 1456-25-34-23-3456 VULGAR FRACTION THREE QUARTERS No 0033 
math \\x00D7 16 MULTIPLICATION SIGN 
math \\x00F7 4-34 DIVISION SIGN 
noback punctuation \\x0092 3
noback punctuation \\x0097 36-36
punctuation \\x00A1 235 INVERTED EXCLAMATION MARK 
punctuation \\x00ad 36
punctuation \\x00BF 236 INVERTED QUESTION MARK 
punctuation \\x2011 36
punctuation \\x2013 36-36
punctuation \\x2014 36-36
noback punctuation \\x2018 6-236
noback punctuation \\x2019 3
noback punctuation \\x2019 356-3
punctuation \\x201c 236
punctuation \\x201d 356
noback punctuation \\x2026 3
sign \\x2122 45-2345 trademark sign
sign \\x00A2 4-14 CENT SIGN 
sign \\x00A3 3456 POUND SIGN 
sign \\x00A4 1246 CURRENCY SIGN 
sign \\x00A7 4-234 SECTION SIGN 
sign \\x00A9 45-14 COPYRIGHT SIGN 
sign \\x00AE 45-1235 REGISTERED SIGN REGISTERED TRADE MARK SIGN 
sign \\x00B0 56-145-1245 DEGREE SIGN 
sign \\x00B4 b4 ACUTE ACCENT 0020 0301 SPACING ACUTE 
sign \\x00B5 46-134 MICRO SIGN 03BC 039C 039C
# sign \\x00A5 YEN SIGN 
punctuation \\x00A6 456-1256 BROKEN BAR BROKEN VERTICAL BAR 
punctuation \\x0093 236
punctuation \\x0094 356
punctuation \\x0096 36
# sign \\x00A8 DIAERESIS 0020 0308 SPACING DIAERESIS 
# sign \\x00AA FEMININE ORDINAL INDICATOR 0061 
# punctuation \\x00AB LEFT-POINTING DOUBLE ANGLE QUOTATION MARK LEFT 
# sign \\x00AC NOT SIGN 
# sign \\x00AF MACRON 0020 0304 SPACING MACRON 
# math \\x00B2 SUPERSCRIPT TWO 0032 2 2 SUPERSCRIPT DIGIT TWO 
# math \\x00B3 SUPERSCRIPT THREE 0033 3 3 SUPERSCRIPT DIGIT THREE 
# sign \\x00B6 PILCROW SIGN PARAGRAPH SIGN 
# sign \\x00B8 CEDILLA 0020 0327 SPACING CEDILLA 
# math \\x00B9 SUPERSCRIPT ONE 0031 1 1 SUPERSCRIPT DIGIT ONE 
# sign \\x00BA MASCULINE ORDINAL INDICATOR 006F 
# punctuation \\x00BB RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK Pf Y 
noback sign \\X25CF 16 BLACK CIRCLE
`,"latinLetterDef8Dots.uti":`# liblouis: sub table for Latin letter definition, 8 dots.
#
#  Copyright (C) 2012-2014 Mesar Hameed <mesar.hameed@gmail.com>
#
#  This file is part of liblouis.
#
#  liblouis is free software: you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as
#  published by the Free Software Foundation, either version 2.1 of the
#  License, or (at your option) any later version.
#
#  liblouis is distributed in the hope that it will be useful, but
#  WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
#  Lesser General Public License for more details.
#
#  You should have received a copy of the GNU Lesser General Public
#  License along with liblouis. If not, see
#  <http://www.gnu.org/licenses/>.

# Latin letters a-z with dot 7 as capital indicator.
# Usually included to form a 8 dots table.

uplow Aa 17,1
uplow Bb 127,12
uplow Cc 147,14
uplow Dd 1457,145
uplow Ee 157,15
uplow Ff 1247,124
uplow Gg 12457,1245
uplow Hh 1257,125
uplow Ii 247,24
uplow Jj 2457,245
uplow Kk 137,13
uplow Ll 1237,123
uplow Mm 1347,134
uplow Nn 13457,1345
uplow Oo 1357,135
uplow Pp 12347,1234
uplow Qq 123457,12345
uplow Rr 12357,1235
uplow Ss 2347,234
uplow Tt 23457,2345
uplow Uu 1367,136
uplow Vv 12367,1236
uplow Ww 24567,2456
uplow Xx 13467,1346
uplow Yy 134567,13456
uplow Zz 13567,1356
`,"litdigits6Dots.uti":`# liblouis: sub table for litirary digits, 6 dots
#
#  Copyright (C) 2013-2014 Mesar Hameed <mesar.hameed@gmail.com>
#
#  This file is part of liblouis.
#
#  liblouis is free software: you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as
#  published by the Free Software Foundation, either version 2.1 of the
#  License, or (at your option) any later version.
#
#  liblouis is distributed in the hope that it will be useful, but
#  WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
#  Lesser General Public License for more details.
#
#  You should have received a copy of the GNU Lesser General Public
#  License along with liblouis. If not, see
#  <http://www.gnu.org/licenses/>.

litdigit 0 245
litdigit 1 1
litdigit 2 12
litdigit 3 14
litdigit 4 145
litdigit 5 15
litdigit 6 124
litdigit 7 1245
litdigit 8 125
litdigit 9 24
`,"loweredDigits6Dots.uti":`# liblouis: sub table for lowered digits, 6 dots
#
#  Copyright (C) 2012-2014 Mesar Hameed <mesar.hameed@gmail.com>
#
#  This file is part of liblouis.
#
#  liblouis is free software: you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as
#  published by the Free Software Foundation, either version 2.1 of the
#  License, or (at your option) any later version.
#
#  liblouis is distributed in the hope that it will be useful, but
#  WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
#  Lesser General Public License for more details.
#
#  You should have received a copy of the GNU Lesser General Public
#  License along with liblouis. If not, see
#  <http://www.gnu.org/licenses/>.

digit 0 356
digit 1 2
digit 2 23
digit 3 25
digit 4 256
digit 5 26
digit 6 235
digit 7 2356
digit 8 236
digit 9 35
`};var M="__abolBraille",D="__abolBrailleReady",m="tables/ethio-g1.ctb";function en(){let e=nn,t=e.EasyApi??e.default?.EasyApi;if(!t)throw new Error("liblouis EasyApi constructor not found");return t}function tn(e,t){try{e.mkdir(t)}catch{}}function rn(){let e=document.currentScript;if(e?.src)return e.src;let t=document.querySelector('script[src*="abol-player.braille.js"]');if(t?.src)return t.src;throw new Error("Cannot resolve abol-player.braille.js URL for CAPI sibling")}function on(e){return new Promise((t,o)=>{if(document.querySelector(`script[src="${e}"]`)){t();return}let T=document.createElement("script");T.src=e,T.async=!1,T.onload=()=>t(),T.onerror=()=>o(new Error(`Failed to load ${e}`)),document.head.append(T)})}async function an(){let e=globalThis;if(e.liblouisBuild)return e.liblouisBuild;let t=new URL("abol-player.braille.capi.js",rn()).href;if(await on(t),!e.liblouisBuild)throw new Error("abol-player.braille.capi.js loaded but liblouisBuild is missing");return e.liblouisBuild}function B(e,t){t&&e._free(t)}function Tn(e,t,o){if(typeof o!="string"||o.length===0)return"";let A=e.ccall("lou_charSize","number",[],[]);if(A!==2)throw new Error(`Expected utf16 liblouis build (charSize=2), got ${A}`);let T=Math.max(o.length*8,64);for(let L=0;L<6;L++){let R=(o.length+1)*A,d=(T+1)*A,u=e._malloc(R),s=e._malloc(d),g=e._malloc(4),b=e._malloc(4);try{if(!u||!s||!g||!b)throw new Error("Liblouis malloc failed");if(e.stringToUTF16(o,u,R),e.setValue(g,o.length,"i32"),e.setValue(b,T,"i32"),!e.ccall("lou_translateString","number",["string","number","number","number","number","number","number","number"],[t,u,g,s,b,null,null,0])){let p=e.getValue(b,"i32");if(p>T){T=p+16;continue}throw new Error(`Liblouis failed to translate with table ${t}`)}let x=e.getValue(b,"i32");if(x<0||x>T)throw new Error(`Liblouis returned invalid outlen ${x}`);let c=s>>1;return ln(e.HEAPU16,c,x)}finally{B(e,s),B(e,u),B(e,b),B(e,g)}}throw new Error(`Liblouis failed to translate with table ${t} (output buffer exhausted)`)}function ln(e,t,o){if(o<=8192)return String.fromCharCode.apply(null,e.subarray(t,t+o));let T="";for(let L=0;L<o;L+=8192){let R=Math.min(L+8192,o);T+=String.fromCharCode.apply(null,e.subarray(t+L,t+R))}return T}async function sn(){let e=await an(),t=en(),o=new t(e),A=o.getFilesystem();tn(A,"/tables");for(let[L,R]of Object.entries(H))A.writeFile(`/tables/${L}`,R);let T=o.capi;if(!T?._malloc||!T.ccall)throw new Error("liblouis EasyApi did not expose emscripten capi");return{table:m,version:()=>o.version(),translate(L,R=m){return Tn(T,R,L)}}}function W(){let e=globalThis;if(e[D])return e[D];let t=sn().then(o=>(e[M]=o,o));return e[D]=t,t}W();})();
//# sourceMappingURL=abol-player.braille.js.map
