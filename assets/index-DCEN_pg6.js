var t_=Object.defineProperty;var n_=(t,e,n)=>e in t?t_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Nt=(t,e,n)=>n_(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function i_(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var am={exports:{}},Bl={},om={exports:{}},Ke={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Va=Symbol.for("react.element"),r_=Symbol.for("react.portal"),s_=Symbol.for("react.fragment"),a_=Symbol.for("react.strict_mode"),o_=Symbol.for("react.profiler"),l_=Symbol.for("react.provider"),c_=Symbol.for("react.context"),u_=Symbol.for("react.forward_ref"),d_=Symbol.for("react.suspense"),h_=Symbol.for("react.memo"),f_=Symbol.for("react.lazy"),Zh=Symbol.iterator;function p_(t){return t===null||typeof t!="object"?null:(t=Zh&&t[Zh]||t["@@iterator"],typeof t=="function"?t:null)}var lm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},cm=Object.assign,um={};function Gs(t,e,n){this.props=t,this.context=e,this.refs=um,this.updater=n||lm}Gs.prototype.isReactComponent={};Gs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Gs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function dm(){}dm.prototype=Gs.prototype;function Kd(t,e,n){this.props=t,this.context=e,this.refs=um,this.updater=n||lm}var qd=Kd.prototype=new dm;qd.constructor=Kd;cm(qd,Gs.prototype);qd.isPureReactComponent=!0;var Qh=Array.isArray,hm=Object.prototype.hasOwnProperty,$d={current:null},fm={key:!0,ref:!0,__self:!0,__source:!0};function pm(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)hm.call(e,i)&&!fm.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),u=0;u<o;u++)l[u]=arguments[u+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:Va,type:t,key:s,ref:a,props:r,_owner:$d.current}}function m_(t,e){return{$$typeof:Va,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Yd(t){return typeof t=="object"&&t!==null&&t.$$typeof===Va}function g_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Jh=/\/+/g;function sc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?g_(""+t.key):e.toString(36)}function Xo(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case Va:case r_:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+sc(a,0):i,Qh(r)?(n="",t!=null&&(n=t.replace(Jh,"$&/")+"/"),Xo(r,e,n,"",function(u){return u})):r!=null&&(Yd(r)&&(r=m_(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(Jh,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",Qh(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+sc(s,o);a+=Xo(s,e,n,l,r)}else if(l=p_(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+sc(s,o++),a+=Xo(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function ro(t,e,n){if(t==null)return t;var i=[],r=0;return Xo(t,i,"","",function(s){return e.call(n,s,r++)}),i}function v_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var en={current:null},Ko={transition:null},__={ReactCurrentDispatcher:en,ReactCurrentBatchConfig:Ko,ReactCurrentOwner:$d};function mm(){throw Error("act(...) is not supported in production builds of React.")}Ke.Children={map:ro,forEach:function(t,e,n){ro(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ro(t,function(){e++}),e},toArray:function(t){return ro(t,function(e){return e})||[]},only:function(t){if(!Yd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ke.Component=Gs;Ke.Fragment=s_;Ke.Profiler=o_;Ke.PureComponent=Kd;Ke.StrictMode=a_;Ke.Suspense=d_;Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=__;Ke.act=mm;Ke.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=cm({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=$d.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)hm.call(e,l)&&!fm.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var u=0;u<l;u++)o[u]=arguments[u+2];i.children=o}return{$$typeof:Va,type:t.type,key:r,ref:s,props:i,_owner:a}};Ke.createContext=function(t){return t={$$typeof:c_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:l_,_context:t},t.Consumer=t};Ke.createElement=pm;Ke.createFactory=function(t){var e=pm.bind(null,t);return e.type=t,e};Ke.createRef=function(){return{current:null}};Ke.forwardRef=function(t){return{$$typeof:u_,render:t}};Ke.isValidElement=Yd;Ke.lazy=function(t){return{$$typeof:f_,_payload:{_status:-1,_result:t},_init:v_}};Ke.memo=function(t,e){return{$$typeof:h_,type:t,compare:e===void 0?null:e}};Ke.startTransition=function(t){var e=Ko.transition;Ko.transition={};try{t()}finally{Ko.transition=e}};Ke.unstable_act=mm;Ke.useCallback=function(t,e){return en.current.useCallback(t,e)};Ke.useContext=function(t){return en.current.useContext(t)};Ke.useDebugValue=function(){};Ke.useDeferredValue=function(t){return en.current.useDeferredValue(t)};Ke.useEffect=function(t,e){return en.current.useEffect(t,e)};Ke.useId=function(){return en.current.useId()};Ke.useImperativeHandle=function(t,e,n){return en.current.useImperativeHandle(t,e,n)};Ke.useInsertionEffect=function(t,e){return en.current.useInsertionEffect(t,e)};Ke.useLayoutEffect=function(t,e){return en.current.useLayoutEffect(t,e)};Ke.useMemo=function(t,e){return en.current.useMemo(t,e)};Ke.useReducer=function(t,e,n){return en.current.useReducer(t,e,n)};Ke.useRef=function(t){return en.current.useRef(t)};Ke.useState=function(t){return en.current.useState(t)};Ke.useSyncExternalStore=function(t,e,n){return en.current.useSyncExternalStore(t,e,n)};Ke.useTransition=function(){return en.current.useTransition()};Ke.version="18.3.1";om.exports=Ke;var fe=om.exports;const x_=i_(fe);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y_=fe,S_=Symbol.for("react.element"),M_=Symbol.for("react.fragment"),E_=Object.prototype.hasOwnProperty,w_=y_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,T_={key:!0,ref:!0,__self:!0,__source:!0};function gm(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)E_.call(e,i)&&!T_.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:S_,type:t,key:s,ref:a,props:r,_owner:w_.current}}Bl.Fragment=M_;Bl.jsx=gm;Bl.jsxs=gm;am.exports=Bl;var c=am.exports,lu={},vm={exports:{}},wn={},_m={exports:{}},xm={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(D,Q){var J=D.length;D.push(Q);e:for(;0<J;){var he=J-1>>>1,we=D[he];if(0<r(we,Q))D[he]=Q,D[J]=we,J=he;else break e}}function n(D){return D.length===0?null:D[0]}function i(D){if(D.length===0)return null;var Q=D[0],J=D.pop();if(J!==Q){D[0]=J;e:for(var he=0,we=D.length,qe=we>>>1;he<qe;){var $=2*(he+1)-1,ae=D[$],_e=$+1,ce=D[_e];if(0>r(ae,J))_e<we&&0>r(ce,ae)?(D[he]=ce,D[_e]=J,he=_e):(D[he]=ae,D[$]=J,he=$);else if(_e<we&&0>r(ce,J))D[he]=ce,D[_e]=J,he=_e;else break e}}return Q}function r(D,Q){var J=D.sortIndex-Q.sortIndex;return J!==0?J:D.id-Q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],u=[],f=1,p=null,h=3,m=!1,x=!1,S=!1,g=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(D){for(var Q=n(u);Q!==null;){if(Q.callback===null)i(u);else if(Q.startTime<=D)i(u),Q.sortIndex=Q.expirationTime,e(l,Q);else break;Q=n(u)}}function E(D){if(S=!1,y(D),!x)if(n(l)!==null)x=!0,Y(R);else{var Q=n(u);Q!==null&&te(E,Q.startTime-D)}}function R(D,Q){x=!1,S&&(S=!1,d(P),P=-1),m=!0;var J=h;try{for(y(Q),p=n(l);p!==null&&(!(p.expirationTime>Q)||D&&!N());){var he=p.callback;if(typeof he=="function"){p.callback=null,h=p.priorityLevel;var we=he(p.expirationTime<=Q);Q=t.unstable_now(),typeof we=="function"?p.callback=we:p===n(l)&&i(l),y(Q)}else i(l);p=n(l)}if(p!==null)var qe=!0;else{var $=n(u);$!==null&&te(E,$.startTime-Q),qe=!1}return qe}finally{p=null,h=J,m=!1}}var C=!1,b=null,P=-1,T=5,w=-1;function N(){return!(t.unstable_now()-w<T)}function k(){if(b!==null){var D=t.unstable_now();w=D;var Q=!0;try{Q=b(!0,D)}finally{Q?B():(C=!1,b=null)}}else C=!1}var B;if(typeof _=="function")B=function(){_(k)};else if(typeof MessageChannel<"u"){var G=new MessageChannel,ee=G.port2;G.port1.onmessage=k,B=function(){ee.postMessage(null)}}else B=function(){g(k,0)};function Y(D){b=D,C||(C=!0,B())}function te(D,Q){P=g(function(){D(t.unstable_now())},Q)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(D){D.callback=null},t.unstable_continueExecution=function(){x||m||(x=!0,Y(R))},t.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<D?Math.floor(1e3/D):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(D){switch(h){case 1:case 2:case 3:var Q=3;break;default:Q=h}var J=h;h=Q;try{return D()}finally{h=J}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(D,Q){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var J=h;h=D;try{return Q()}finally{h=J}},t.unstable_scheduleCallback=function(D,Q,J){var he=t.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?he+J:he):J=he,D){case 1:var we=-1;break;case 2:we=250;break;case 5:we=1073741823;break;case 4:we=1e4;break;default:we=5e3}return we=J+we,D={id:f++,callback:Q,priorityLevel:D,startTime:J,expirationTime:we,sortIndex:-1},J>he?(D.sortIndex=J,e(u,D),n(l)===null&&D===n(u)&&(S?(d(P),P=-1):S=!0,te(E,J-he))):(D.sortIndex=we,e(l,D),x||m||(x=!0,Y(R))),D},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(D){var Q=h;return function(){var J=h;h=Q;try{return D.apply(this,arguments)}finally{h=J}}}})(xm);_m.exports=xm;var A_=_m.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var b_=fe,En=A_;function se(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ym=new Set,Ta={};function Br(t,e){Rs(t,e),Rs(t+"Capture",e)}function Rs(t,e){for(Ta[t]=e,t=0;t<e.length;t++)ym.add(e[t])}var wi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),cu=Object.prototype.hasOwnProperty,C_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ef={},tf={};function R_(t){return cu.call(tf,t)?!0:cu.call(ef,t)?!1:C_.test(t)?tf[t]=!0:(ef[t]=!0,!1)}function P_(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function N_(t,e,n,i){if(e===null||typeof e>"u"||P_(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function tn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var Vt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Vt[t]=new tn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Vt[e]=new tn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Vt[t]=new tn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Vt[t]=new tn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Vt[t]=new tn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Vt[t]=new tn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Vt[t]=new tn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Vt[t]=new tn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Vt[t]=new tn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Zd=/[\-:]([a-z])/g;function Qd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Zd,Qd);Vt[e]=new tn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Zd,Qd);Vt[e]=new tn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Zd,Qd);Vt[e]=new tn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Vt[t]=new tn(t,1,!1,t.toLowerCase(),null,!1,!1)});Vt.xlinkHref=new tn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Vt[t]=new tn(t,1,!1,t.toLowerCase(),null,!0,!0)});function Jd(t,e,n,i){var r=Vt.hasOwnProperty(e)?Vt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(N_(e,n,r,i)&&(n=null),i||r===null?R_(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ri=b_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,so=Symbol.for("react.element"),ss=Symbol.for("react.portal"),as=Symbol.for("react.fragment"),eh=Symbol.for("react.strict_mode"),uu=Symbol.for("react.profiler"),Sm=Symbol.for("react.provider"),Mm=Symbol.for("react.context"),th=Symbol.for("react.forward_ref"),du=Symbol.for("react.suspense"),hu=Symbol.for("react.suspense_list"),nh=Symbol.for("react.memo"),zi=Symbol.for("react.lazy"),Em=Symbol.for("react.offscreen"),nf=Symbol.iterator;function Ys(t){return t===null||typeof t!="object"?null:(t=nf&&t[nf]||t["@@iterator"],typeof t=="function"?t:null)}var Mt=Object.assign,ac;function ua(t){if(ac===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);ac=e&&e[1]||""}return`
`+ac+t}var oc=!1;function lc(t,e){if(!t||oc)return"";oc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){i=u}t.call(e.prototype)}else{try{throw Error()}catch(u){i=u}t()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{oc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ua(t):""}function L_(t){switch(t.tag){case 5:return ua(t.type);case 16:return ua("Lazy");case 13:return ua("Suspense");case 19:return ua("SuspenseList");case 0:case 2:case 15:return t=lc(t.type,!1),t;case 11:return t=lc(t.type.render,!1),t;case 1:return t=lc(t.type,!0),t;default:return""}}function fu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case as:return"Fragment";case ss:return"Portal";case uu:return"Profiler";case eh:return"StrictMode";case du:return"Suspense";case hu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Mm:return(t.displayName||"Context")+".Consumer";case Sm:return(t._context.displayName||"Context")+".Provider";case th:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case nh:return e=t.displayName||null,e!==null?e:fu(t.type)||"Memo";case zi:e=t._payload,t=t._init;try{return fu(t(e))}catch{}}return null}function D_(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return fu(e);case 8:return e===eh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function nr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function wm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function I_(t){var e=wm(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ao(t){t._valueTracker||(t._valueTracker=I_(t))}function Tm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=wm(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function ul(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function pu(t,e){var n=e.checked;return Mt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function rf(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=nr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Am(t,e){e=e.checked,e!=null&&Jd(t,"checked",e,!1)}function mu(t,e){Am(t,e);var n=nr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?gu(t,e.type,n):e.hasOwnProperty("defaultValue")&&gu(t,e.type,nr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function sf(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function gu(t,e,n){(e!=="number"||ul(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var da=Array.isArray;function xs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+nr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function vu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(se(91));return Mt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function af(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(se(92));if(da(n)){if(1<n.length)throw Error(se(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:nr(n)}}function bm(t,e){var n=nr(e.value),i=nr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function of(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Cm(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function _u(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Cm(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var oo,Rm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(oo=oo||document.createElement("div"),oo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=oo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Aa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ga={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},U_=["Webkit","ms","Moz","O"];Object.keys(ga).forEach(function(t){U_.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ga[e]=ga[t]})});function Pm(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ga.hasOwnProperty(t)&&ga[t]?(""+e).trim():e+"px"}function Nm(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Pm(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var k_=Mt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function xu(t,e){if(e){if(k_[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(se(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(se(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(se(61))}if(e.style!=null&&typeof e.style!="object")throw Error(se(62))}}function yu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Su=null;function ih(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Mu=null,ys=null,Ss=null;function lf(t){if(t=Xa(t)){if(typeof Mu!="function")throw Error(se(280));var e=t.stateNode;e&&(e=Wl(e),Mu(t.stateNode,t.type,e))}}function Lm(t){ys?Ss?Ss.push(t):Ss=[t]:ys=t}function Dm(){if(ys){var t=ys,e=Ss;if(Ss=ys=null,lf(t),e)for(t=0;t<e.length;t++)lf(e[t])}}function Im(t,e){return t(e)}function Um(){}var cc=!1;function km(t,e,n){if(cc)return t(e,n);cc=!0;try{return Im(t,e,n)}finally{cc=!1,(ys!==null||Ss!==null)&&(Um(),Dm())}}function ba(t,e){var n=t.stateNode;if(n===null)return null;var i=Wl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(se(231,e,typeof n));return n}var Eu=!1;if(wi)try{var Zs={};Object.defineProperty(Zs,"passive",{get:function(){Eu=!0}}),window.addEventListener("test",Zs,Zs),window.removeEventListener("test",Zs,Zs)}catch{Eu=!1}function F_(t,e,n,i,r,s,a,o,l){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(f){this.onError(f)}}var va=!1,dl=null,hl=!1,wu=null,O_={onError:function(t){va=!0,dl=t}};function z_(t,e,n,i,r,s,a,o,l){va=!1,dl=null,F_.apply(O_,arguments)}function B_(t,e,n,i,r,s,a,o,l){if(z_.apply(this,arguments),va){if(va){var u=dl;va=!1,dl=null}else throw Error(se(198));hl||(hl=!0,wu=u)}}function jr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Fm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function cf(t){if(jr(t)!==t)throw Error(se(188))}function j_(t){var e=t.alternate;if(!e){if(e=jr(t),e===null)throw Error(se(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return cf(r),t;if(s===i)return cf(r),e;s=s.sibling}throw Error(se(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(se(189))}}if(n.alternate!==i)throw Error(se(190))}if(n.tag!==3)throw Error(se(188));return n.stateNode.current===n?t:e}function Om(t){return t=j_(t),t!==null?zm(t):null}function zm(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=zm(t);if(e!==null)return e;t=t.sibling}return null}var Bm=En.unstable_scheduleCallback,uf=En.unstable_cancelCallback,H_=En.unstable_shouldYield,V_=En.unstable_requestPaint,Tt=En.unstable_now,G_=En.unstable_getCurrentPriorityLevel,rh=En.unstable_ImmediatePriority,jm=En.unstable_UserBlockingPriority,fl=En.unstable_NormalPriority,W_=En.unstable_LowPriority,Hm=En.unstable_IdlePriority,jl=null,si=null;function X_(t){if(si&&typeof si.onCommitFiberRoot=="function")try{si.onCommitFiberRoot(jl,t,void 0,(t.current.flags&128)===128)}catch{}}var Yn=Math.clz32?Math.clz32:$_,K_=Math.log,q_=Math.LN2;function $_(t){return t>>>=0,t===0?32:31-(K_(t)/q_|0)|0}var lo=64,co=4194304;function ha(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function pl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=ha(o):(s&=a,s!==0&&(i=ha(s)))}else a=n&~r,a!==0?i=ha(a):s!==0&&(i=ha(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Yn(e),r=1<<n,i|=t[n],e&=~r;return i}function Y_(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Z_(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-Yn(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=Y_(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function Tu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Vm(){var t=lo;return lo<<=1,!(lo&4194240)&&(lo=64),t}function uc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ga(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Yn(e),t[e]=n}function Q_(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Yn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function sh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Yn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var ot=0;function Gm(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Wm,ah,Xm,Km,qm,Au=!1,uo=[],Xi=null,Ki=null,qi=null,Ca=new Map,Ra=new Map,ji=[],J_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function df(t,e){switch(t){case"focusin":case"focusout":Xi=null;break;case"dragenter":case"dragleave":Ki=null;break;case"mouseover":case"mouseout":qi=null;break;case"pointerover":case"pointerout":Ca.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ra.delete(e.pointerId)}}function Qs(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Xa(e),e!==null&&ah(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function ex(t,e,n,i,r){switch(e){case"focusin":return Xi=Qs(Xi,t,e,n,i,r),!0;case"dragenter":return Ki=Qs(Ki,t,e,n,i,r),!0;case"mouseover":return qi=Qs(qi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Ca.set(s,Qs(Ca.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Ra.set(s,Qs(Ra.get(s)||null,t,e,n,i,r)),!0}return!1}function $m(t){var e=Ar(t.target);if(e!==null){var n=jr(e);if(n!==null){if(e=n.tag,e===13){if(e=Fm(n),e!==null){t.blockedOn=e,qm(t.priority,function(){Xm(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function qo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=bu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Su=i,n.target.dispatchEvent(i),Su=null}else return e=Xa(n),e!==null&&ah(e),t.blockedOn=n,!1;e.shift()}return!0}function hf(t,e,n){qo(t)&&n.delete(e)}function tx(){Au=!1,Xi!==null&&qo(Xi)&&(Xi=null),Ki!==null&&qo(Ki)&&(Ki=null),qi!==null&&qo(qi)&&(qi=null),Ca.forEach(hf),Ra.forEach(hf)}function Js(t,e){t.blockedOn===e&&(t.blockedOn=null,Au||(Au=!0,En.unstable_scheduleCallback(En.unstable_NormalPriority,tx)))}function Pa(t){function e(r){return Js(r,t)}if(0<uo.length){Js(uo[0],t);for(var n=1;n<uo.length;n++){var i=uo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Xi!==null&&Js(Xi,t),Ki!==null&&Js(Ki,t),qi!==null&&Js(qi,t),Ca.forEach(e),Ra.forEach(e),n=0;n<ji.length;n++)i=ji[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<ji.length&&(n=ji[0],n.blockedOn===null);)$m(n),n.blockedOn===null&&ji.shift()}var Ms=Ri.ReactCurrentBatchConfig,ml=!0;function nx(t,e,n,i){var r=ot,s=Ms.transition;Ms.transition=null;try{ot=1,oh(t,e,n,i)}finally{ot=r,Ms.transition=s}}function ix(t,e,n,i){var r=ot,s=Ms.transition;Ms.transition=null;try{ot=4,oh(t,e,n,i)}finally{ot=r,Ms.transition=s}}function oh(t,e,n,i){if(ml){var r=bu(t,e,n,i);if(r===null)yc(t,e,i,gl,n),df(t,i);else if(ex(r,t,e,n,i))i.stopPropagation();else if(df(t,i),e&4&&-1<J_.indexOf(t)){for(;r!==null;){var s=Xa(r);if(s!==null&&Wm(s),s=bu(t,e,n,i),s===null&&yc(t,e,i,gl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else yc(t,e,i,null,n)}}var gl=null;function bu(t,e,n,i){if(gl=null,t=ih(i),t=Ar(t),t!==null)if(e=jr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Fm(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return gl=t,null}function Ym(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(G_()){case rh:return 1;case jm:return 4;case fl:case W_:return 16;case Hm:return 536870912;default:return 16}default:return 16}}var Gi=null,lh=null,$o=null;function Zm(){if($o)return $o;var t,e=lh,n=e.length,i,r="value"in Gi?Gi.value:Gi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return $o=r.slice(t,1<i?1-i:void 0)}function Yo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ho(){return!0}function ff(){return!1}function Tn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ho:ff,this.isPropagationStopped=ff,this}return Mt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ho)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ho)},persist:function(){},isPersistent:ho}),e}var Ws={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ch=Tn(Ws),Wa=Mt({},Ws,{view:0,detail:0}),rx=Tn(Wa),dc,hc,ea,Hl=Mt({},Wa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:uh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ea&&(ea&&t.type==="mousemove"?(dc=t.screenX-ea.screenX,hc=t.screenY-ea.screenY):hc=dc=0,ea=t),dc)},movementY:function(t){return"movementY"in t?t.movementY:hc}}),pf=Tn(Hl),sx=Mt({},Hl,{dataTransfer:0}),ax=Tn(sx),ox=Mt({},Wa,{relatedTarget:0}),fc=Tn(ox),lx=Mt({},Ws,{animationName:0,elapsedTime:0,pseudoElement:0}),cx=Tn(lx),ux=Mt({},Ws,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),dx=Tn(ux),hx=Mt({},Ws,{data:0}),mf=Tn(hx),fx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},px={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},mx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=mx[t])?!!e[t]:!1}function uh(){return gx}var vx=Mt({},Wa,{key:function(t){if(t.key){var e=fx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Yo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?px[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:uh,charCode:function(t){return t.type==="keypress"?Yo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Yo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),_x=Tn(vx),xx=Mt({},Hl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gf=Tn(xx),yx=Mt({},Wa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:uh}),Sx=Tn(yx),Mx=Mt({},Ws,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ex=Tn(Mx),wx=Mt({},Hl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Tx=Tn(wx),Ax=[9,13,27,32],dh=wi&&"CompositionEvent"in window,_a=null;wi&&"documentMode"in document&&(_a=document.documentMode);var bx=wi&&"TextEvent"in window&&!_a,Qm=wi&&(!dh||_a&&8<_a&&11>=_a),vf=" ",_f=!1;function Jm(t,e){switch(t){case"keyup":return Ax.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function eg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var os=!1;function Cx(t,e){switch(t){case"compositionend":return eg(e);case"keypress":return e.which!==32?null:(_f=!0,vf);case"textInput":return t=e.data,t===vf&&_f?null:t;default:return null}}function Rx(t,e){if(os)return t==="compositionend"||!dh&&Jm(t,e)?(t=Zm(),$o=lh=Gi=null,os=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Qm&&e.locale!=="ko"?null:e.data;default:return null}}var Px={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Px[t.type]:e==="textarea"}function tg(t,e,n,i){Lm(i),e=vl(e,"onChange"),0<e.length&&(n=new ch("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var xa=null,Na=null;function Nx(t){hg(t,0)}function Vl(t){var e=us(t);if(Tm(e))return t}function Lx(t,e){if(t==="change")return e}var ng=!1;if(wi){var pc;if(wi){var mc="oninput"in document;if(!mc){var yf=document.createElement("div");yf.setAttribute("oninput","return;"),mc=typeof yf.oninput=="function"}pc=mc}else pc=!1;ng=pc&&(!document.documentMode||9<document.documentMode)}function Sf(){xa&&(xa.detachEvent("onpropertychange",ig),Na=xa=null)}function ig(t){if(t.propertyName==="value"&&Vl(Na)){var e=[];tg(e,Na,t,ih(t)),km(Nx,e)}}function Dx(t,e,n){t==="focusin"?(Sf(),xa=e,Na=n,xa.attachEvent("onpropertychange",ig)):t==="focusout"&&Sf()}function Ix(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Vl(Na)}function Ux(t,e){if(t==="click")return Vl(e)}function kx(t,e){if(t==="input"||t==="change")return Vl(e)}function Fx(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Jn=typeof Object.is=="function"?Object.is:Fx;function La(t,e){if(Jn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!cu.call(e,r)||!Jn(t[r],e[r]))return!1}return!0}function Mf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ef(t,e){var n=Mf(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Mf(n)}}function rg(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?rg(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function sg(){for(var t=window,e=ul();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=ul(t.document)}return e}function hh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Ox(t){var e=sg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&rg(n.ownerDocument.documentElement,n)){if(i!==null&&hh(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Ef(n,s);var a=Ef(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var zx=wi&&"documentMode"in document&&11>=document.documentMode,ls=null,Cu=null,ya=null,Ru=!1;function wf(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ru||ls==null||ls!==ul(i)||(i=ls,"selectionStart"in i&&hh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ya&&La(ya,i)||(ya=i,i=vl(Cu,"onSelect"),0<i.length&&(e=new ch("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=ls)))}function fo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var cs={animationend:fo("Animation","AnimationEnd"),animationiteration:fo("Animation","AnimationIteration"),animationstart:fo("Animation","AnimationStart"),transitionend:fo("Transition","TransitionEnd")},gc={},ag={};wi&&(ag=document.createElement("div").style,"AnimationEvent"in window||(delete cs.animationend.animation,delete cs.animationiteration.animation,delete cs.animationstart.animation),"TransitionEvent"in window||delete cs.transitionend.transition);function Gl(t){if(gc[t])return gc[t];if(!cs[t])return t;var e=cs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in ag)return gc[t]=e[n];return t}var og=Gl("animationend"),lg=Gl("animationiteration"),cg=Gl("animationstart"),ug=Gl("transitionend"),dg=new Map,Tf="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ar(t,e){dg.set(t,e),Br(e,[t])}for(var vc=0;vc<Tf.length;vc++){var _c=Tf[vc],Bx=_c.toLowerCase(),jx=_c[0].toUpperCase()+_c.slice(1);ar(Bx,"on"+jx)}ar(og,"onAnimationEnd");ar(lg,"onAnimationIteration");ar(cg,"onAnimationStart");ar("dblclick","onDoubleClick");ar("focusin","onFocus");ar("focusout","onBlur");ar(ug,"onTransitionEnd");Rs("onMouseEnter",["mouseout","mouseover"]);Rs("onMouseLeave",["mouseout","mouseover"]);Rs("onPointerEnter",["pointerout","pointerover"]);Rs("onPointerLeave",["pointerout","pointerover"]);Br("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Br("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Br("onBeforeInput",["compositionend","keypress","textInput","paste"]);Br("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Br("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Br("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var fa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Hx=new Set("cancel close invalid load scroll toggle".split(" ").concat(fa));function Af(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,B_(i,e,void 0,t),t.currentTarget=null}function hg(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,u=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;Af(r,o,u),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,u=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;Af(r,o,u),s=l}}}if(hl)throw t=wu,hl=!1,wu=null,t}function gt(t,e){var n=e[Iu];n===void 0&&(n=e[Iu]=new Set);var i=t+"__bubble";n.has(i)||(fg(e,t,2,!1),n.add(i))}function xc(t,e,n){var i=0;e&&(i|=4),fg(n,t,i,e)}var po="_reactListening"+Math.random().toString(36).slice(2);function Da(t){if(!t[po]){t[po]=!0,ym.forEach(function(n){n!=="selectionchange"&&(Hx.has(n)||xc(n,!1,t),xc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[po]||(e[po]=!0,xc("selectionchange",!1,e))}}function fg(t,e,n,i){switch(Ym(e)){case 1:var r=nx;break;case 4:r=ix;break;default:r=oh}n=r.bind(null,e,n,t),r=void 0,!Eu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function yc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Ar(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}km(function(){var u=s,f=ih(n),p=[];e:{var h=dg.get(t);if(h!==void 0){var m=ch,x=t;switch(t){case"keypress":if(Yo(n)===0)break e;case"keydown":case"keyup":m=_x;break;case"focusin":x="focus",m=fc;break;case"focusout":x="blur",m=fc;break;case"beforeblur":case"afterblur":m=fc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=pf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=ax;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=Sx;break;case og:case lg:case cg:m=cx;break;case ug:m=Ex;break;case"scroll":m=rx;break;case"wheel":m=Tx;break;case"copy":case"cut":case"paste":m=dx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=gf}var S=(e&4)!==0,g=!S&&t==="scroll",d=S?h!==null?h+"Capture":null:h;S=[];for(var _=u,y;_!==null;){y=_;var E=y.stateNode;if(y.tag===5&&E!==null&&(y=E,d!==null&&(E=ba(_,d),E!=null&&S.push(Ia(_,E,y)))),g)break;_=_.return}0<S.length&&(h=new m(h,x,null,n,f),p.push({event:h,listeners:S}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",h&&n!==Su&&(x=n.relatedTarget||n.fromElement)&&(Ar(x)||x[Ti]))break e;if((m||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,m?(x=n.relatedTarget||n.toElement,m=u,x=x?Ar(x):null,x!==null&&(g=jr(x),x!==g||x.tag!==5&&x.tag!==6)&&(x=null)):(m=null,x=u),m!==x)){if(S=pf,E="onMouseLeave",d="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(S=gf,E="onPointerLeave",d="onPointerEnter",_="pointer"),g=m==null?h:us(m),y=x==null?h:us(x),h=new S(E,_+"leave",m,n,f),h.target=g,h.relatedTarget=y,E=null,Ar(f)===u&&(S=new S(d,_+"enter",x,n,f),S.target=y,S.relatedTarget=g,E=S),g=E,m&&x)t:{for(S=m,d=x,_=0,y=S;y;y=Vr(y))_++;for(y=0,E=d;E;E=Vr(E))y++;for(;0<_-y;)S=Vr(S),_--;for(;0<y-_;)d=Vr(d),y--;for(;_--;){if(S===d||d!==null&&S===d.alternate)break t;S=Vr(S),d=Vr(d)}S=null}else S=null;m!==null&&bf(p,h,m,S,!1),x!==null&&g!==null&&bf(p,g,x,S,!0)}}e:{if(h=u?us(u):window,m=h.nodeName&&h.nodeName.toLowerCase(),m==="select"||m==="input"&&h.type==="file")var R=Lx;else if(xf(h))if(ng)R=kx;else{R=Ix;var C=Dx}else(m=h.nodeName)&&m.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(R=Ux);if(R&&(R=R(t,u))){tg(p,R,n,f);break e}C&&C(t,h,u),t==="focusout"&&(C=h._wrapperState)&&C.controlled&&h.type==="number"&&gu(h,"number",h.value)}switch(C=u?us(u):window,t){case"focusin":(xf(C)||C.contentEditable==="true")&&(ls=C,Cu=u,ya=null);break;case"focusout":ya=Cu=ls=null;break;case"mousedown":Ru=!0;break;case"contextmenu":case"mouseup":case"dragend":Ru=!1,wf(p,n,f);break;case"selectionchange":if(zx)break;case"keydown":case"keyup":wf(p,n,f)}var b;if(dh)e:{switch(t){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else os?Jm(t,n)&&(P="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(Qm&&n.locale!=="ko"&&(os||P!=="onCompositionStart"?P==="onCompositionEnd"&&os&&(b=Zm()):(Gi=f,lh="value"in Gi?Gi.value:Gi.textContent,os=!0)),C=vl(u,P),0<C.length&&(P=new mf(P,t,null,n,f),p.push({event:P,listeners:C}),b?P.data=b:(b=eg(n),b!==null&&(P.data=b)))),(b=bx?Cx(t,n):Rx(t,n))&&(u=vl(u,"onBeforeInput"),0<u.length&&(f=new mf("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:u}),f.data=b))}hg(p,e)})}function Ia(t,e,n){return{instance:t,listener:e,currentTarget:n}}function vl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=ba(t,n),s!=null&&i.unshift(Ia(t,s,r)),s=ba(t,e),s!=null&&i.push(Ia(t,s,r))),t=t.return}return i}function Vr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function bf(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,u=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&u!==null&&(o=u,r?(l=ba(n,s),l!=null&&a.unshift(Ia(n,l,o))):r||(l=ba(n,s),l!=null&&a.push(Ia(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var Vx=/\r\n?/g,Gx=/\u0000|\uFFFD/g;function Cf(t){return(typeof t=="string"?t:""+t).replace(Vx,`
`).replace(Gx,"")}function mo(t,e,n){if(e=Cf(e),Cf(t)!==e&&n)throw Error(se(425))}function _l(){}var Pu=null,Nu=null;function Lu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Du=typeof setTimeout=="function"?setTimeout:void 0,Wx=typeof clearTimeout=="function"?clearTimeout:void 0,Rf=typeof Promise=="function"?Promise:void 0,Xx=typeof queueMicrotask=="function"?queueMicrotask:typeof Rf<"u"?function(t){return Rf.resolve(null).then(t).catch(Kx)}:Du;function Kx(t){setTimeout(function(){throw t})}function Sc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Pa(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Pa(e)}function $i(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Pf(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Xs=Math.random().toString(36).slice(2),ii="__reactFiber$"+Xs,Ua="__reactProps$"+Xs,Ti="__reactContainer$"+Xs,Iu="__reactEvents$"+Xs,qx="__reactListeners$"+Xs,$x="__reactHandles$"+Xs;function Ar(t){var e=t[ii];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ti]||n[ii]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Pf(t);t!==null;){if(n=t[ii])return n;t=Pf(t)}return e}t=n,n=t.parentNode}return null}function Xa(t){return t=t[ii]||t[Ti],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function us(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(se(33))}function Wl(t){return t[Ua]||null}var Uu=[],ds=-1;function or(t){return{current:t}}function vt(t){0>ds||(t.current=Uu[ds],Uu[ds]=null,ds--)}function ft(t,e){ds++,Uu[ds]=t.current,t.current=e}var ir={},$t=or(ir),on=or(!1),Dr=ir;function Ps(t,e){var n=t.type.contextTypes;if(!n)return ir;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function ln(t){return t=t.childContextTypes,t!=null}function xl(){vt(on),vt($t)}function Nf(t,e,n){if($t.current!==ir)throw Error(se(168));ft($t,e),ft(on,n)}function pg(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(se(108,D_(t)||"Unknown",r));return Mt({},n,i)}function yl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||ir,Dr=$t.current,ft($t,t),ft(on,on.current),!0}function Lf(t,e,n){var i=t.stateNode;if(!i)throw Error(se(169));n?(t=pg(t,e,Dr),i.__reactInternalMemoizedMergedChildContext=t,vt(on),vt($t),ft($t,t)):vt(on),ft(on,n)}var gi=null,Xl=!1,Mc=!1;function mg(t){gi===null?gi=[t]:gi.push(t)}function Yx(t){Xl=!0,mg(t)}function lr(){if(!Mc&&gi!==null){Mc=!0;var t=0,e=ot;try{var n=gi;for(ot=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}gi=null,Xl=!1}catch(r){throw gi!==null&&(gi=gi.slice(t+1)),Bm(rh,lr),r}finally{ot=e,Mc=!1}}return null}var hs=[],fs=0,Sl=null,Ml=0,Pn=[],Nn=0,Ir=null,_i=1,xi="";function _r(t,e){hs[fs++]=Ml,hs[fs++]=Sl,Sl=t,Ml=e}function gg(t,e,n){Pn[Nn++]=_i,Pn[Nn++]=xi,Pn[Nn++]=Ir,Ir=t;var i=_i;t=xi;var r=32-Yn(i)-1;i&=~(1<<r),n+=1;var s=32-Yn(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,_i=1<<32-Yn(e)+r|n<<r|i,xi=s+t}else _i=1<<s|n<<r|i,xi=t}function fh(t){t.return!==null&&(_r(t,1),gg(t,1,0))}function ph(t){for(;t===Sl;)Sl=hs[--fs],hs[fs]=null,Ml=hs[--fs],hs[fs]=null;for(;t===Ir;)Ir=Pn[--Nn],Pn[Nn]=null,xi=Pn[--Nn],Pn[Nn]=null,_i=Pn[--Nn],Pn[Nn]=null}var Sn=null,xn=null,xt=!1,Kn=null;function vg(t,e){var n=Dn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Df(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Sn=t,xn=$i(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Sn=t,xn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Ir!==null?{id:_i,overflow:xi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Dn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Sn=t,xn=null,!0):!1;default:return!1}}function ku(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Fu(t){if(xt){var e=xn;if(e){var n=e;if(!Df(t,e)){if(ku(t))throw Error(se(418));e=$i(n.nextSibling);var i=Sn;e&&Df(t,e)?vg(i,n):(t.flags=t.flags&-4097|2,xt=!1,Sn=t)}}else{if(ku(t))throw Error(se(418));t.flags=t.flags&-4097|2,xt=!1,Sn=t}}}function If(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Sn=t}function go(t){if(t!==Sn)return!1;if(!xt)return If(t),xt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Lu(t.type,t.memoizedProps)),e&&(e=xn)){if(ku(t))throw _g(),Error(se(418));for(;e;)vg(t,e),e=$i(e.nextSibling)}if(If(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(se(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){xn=$i(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}xn=null}}else xn=Sn?$i(t.stateNode.nextSibling):null;return!0}function _g(){for(var t=xn;t;)t=$i(t.nextSibling)}function Ns(){xn=Sn=null,xt=!1}function mh(t){Kn===null?Kn=[t]:Kn.push(t)}var Zx=Ri.ReactCurrentBatchConfig;function ta(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(se(309));var i=n.stateNode}if(!i)throw Error(se(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(se(284));if(!n._owner)throw Error(se(290,t))}return t}function vo(t,e){throw t=Object.prototype.toString.call(e),Error(se(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Uf(t){var e=t._init;return e(t._payload)}function xg(t){function e(d,_){if(t){var y=d.deletions;y===null?(d.deletions=[_],d.flags|=16):y.push(_)}}function n(d,_){if(!t)return null;for(;_!==null;)e(d,_),_=_.sibling;return null}function i(d,_){for(d=new Map;_!==null;)_.key!==null?d.set(_.key,_):d.set(_.index,_),_=_.sibling;return d}function r(d,_){return d=Ji(d,_),d.index=0,d.sibling=null,d}function s(d,_,y){return d.index=y,t?(y=d.alternate,y!==null?(y=y.index,y<_?(d.flags|=2,_):y):(d.flags|=2,_)):(d.flags|=1048576,_)}function a(d){return t&&d.alternate===null&&(d.flags|=2),d}function o(d,_,y,E){return _===null||_.tag!==6?(_=Rc(y,d.mode,E),_.return=d,_):(_=r(_,y),_.return=d,_)}function l(d,_,y,E){var R=y.type;return R===as?f(d,_,y.props.children,E,y.key):_!==null&&(_.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===zi&&Uf(R)===_.type)?(E=r(_,y.props),E.ref=ta(d,_,y),E.return=d,E):(E=il(y.type,y.key,y.props,null,d.mode,E),E.ref=ta(d,_,y),E.return=d,E)}function u(d,_,y,E){return _===null||_.tag!==4||_.stateNode.containerInfo!==y.containerInfo||_.stateNode.implementation!==y.implementation?(_=Pc(y,d.mode,E),_.return=d,_):(_=r(_,y.children||[]),_.return=d,_)}function f(d,_,y,E,R){return _===null||_.tag!==7?(_=Lr(y,d.mode,E,R),_.return=d,_):(_=r(_,y),_.return=d,_)}function p(d,_,y){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Rc(""+_,d.mode,y),_.return=d,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case so:return y=il(_.type,_.key,_.props,null,d.mode,y),y.ref=ta(d,null,_),y.return=d,y;case ss:return _=Pc(_,d.mode,y),_.return=d,_;case zi:var E=_._init;return p(d,E(_._payload),y)}if(da(_)||Ys(_))return _=Lr(_,d.mode,y,null),_.return=d,_;vo(d,_)}return null}function h(d,_,y,E){var R=_!==null?_.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return R!==null?null:o(d,_,""+y,E);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case so:return y.key===R?l(d,_,y,E):null;case ss:return y.key===R?u(d,_,y,E):null;case zi:return R=y._init,h(d,_,R(y._payload),E)}if(da(y)||Ys(y))return R!==null?null:f(d,_,y,E,null);vo(d,y)}return null}function m(d,_,y,E,R){if(typeof E=="string"&&E!==""||typeof E=="number")return d=d.get(y)||null,o(_,d,""+E,R);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case so:return d=d.get(E.key===null?y:E.key)||null,l(_,d,E,R);case ss:return d=d.get(E.key===null?y:E.key)||null,u(_,d,E,R);case zi:var C=E._init;return m(d,_,y,C(E._payload),R)}if(da(E)||Ys(E))return d=d.get(y)||null,f(_,d,E,R,null);vo(_,E)}return null}function x(d,_,y,E){for(var R=null,C=null,b=_,P=_=0,T=null;b!==null&&P<y.length;P++){b.index>P?(T=b,b=null):T=b.sibling;var w=h(d,b,y[P],E);if(w===null){b===null&&(b=T);break}t&&b&&w.alternate===null&&e(d,b),_=s(w,_,P),C===null?R=w:C.sibling=w,C=w,b=T}if(P===y.length)return n(d,b),xt&&_r(d,P),R;if(b===null){for(;P<y.length;P++)b=p(d,y[P],E),b!==null&&(_=s(b,_,P),C===null?R=b:C.sibling=b,C=b);return xt&&_r(d,P),R}for(b=i(d,b);P<y.length;P++)T=m(b,d,P,y[P],E),T!==null&&(t&&T.alternate!==null&&b.delete(T.key===null?P:T.key),_=s(T,_,P),C===null?R=T:C.sibling=T,C=T);return t&&b.forEach(function(N){return e(d,N)}),xt&&_r(d,P),R}function S(d,_,y,E){var R=Ys(y);if(typeof R!="function")throw Error(se(150));if(y=R.call(y),y==null)throw Error(se(151));for(var C=R=null,b=_,P=_=0,T=null,w=y.next();b!==null&&!w.done;P++,w=y.next()){b.index>P?(T=b,b=null):T=b.sibling;var N=h(d,b,w.value,E);if(N===null){b===null&&(b=T);break}t&&b&&N.alternate===null&&e(d,b),_=s(N,_,P),C===null?R=N:C.sibling=N,C=N,b=T}if(w.done)return n(d,b),xt&&_r(d,P),R;if(b===null){for(;!w.done;P++,w=y.next())w=p(d,w.value,E),w!==null&&(_=s(w,_,P),C===null?R=w:C.sibling=w,C=w);return xt&&_r(d,P),R}for(b=i(d,b);!w.done;P++,w=y.next())w=m(b,d,P,w.value,E),w!==null&&(t&&w.alternate!==null&&b.delete(w.key===null?P:w.key),_=s(w,_,P),C===null?R=w:C.sibling=w,C=w);return t&&b.forEach(function(k){return e(d,k)}),xt&&_r(d,P),R}function g(d,_,y,E){if(typeof y=="object"&&y!==null&&y.type===as&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case so:e:{for(var R=y.key,C=_;C!==null;){if(C.key===R){if(R=y.type,R===as){if(C.tag===7){n(d,C.sibling),_=r(C,y.props.children),_.return=d,d=_;break e}}else if(C.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===zi&&Uf(R)===C.type){n(d,C.sibling),_=r(C,y.props),_.ref=ta(d,C,y),_.return=d,d=_;break e}n(d,C);break}else e(d,C);C=C.sibling}y.type===as?(_=Lr(y.props.children,d.mode,E,y.key),_.return=d,d=_):(E=il(y.type,y.key,y.props,null,d.mode,E),E.ref=ta(d,_,y),E.return=d,d=E)}return a(d);case ss:e:{for(C=y.key;_!==null;){if(_.key===C)if(_.tag===4&&_.stateNode.containerInfo===y.containerInfo&&_.stateNode.implementation===y.implementation){n(d,_.sibling),_=r(_,y.children||[]),_.return=d,d=_;break e}else{n(d,_);break}else e(d,_);_=_.sibling}_=Pc(y,d.mode,E),_.return=d,d=_}return a(d);case zi:return C=y._init,g(d,_,C(y._payload),E)}if(da(y))return x(d,_,y,E);if(Ys(y))return S(d,_,y,E);vo(d,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,_!==null&&_.tag===6?(n(d,_.sibling),_=r(_,y),_.return=d,d=_):(n(d,_),_=Rc(y,d.mode,E),_.return=d,d=_),a(d)):n(d,_)}return g}var Ls=xg(!0),yg=xg(!1),El=or(null),wl=null,ps=null,gh=null;function vh(){gh=ps=wl=null}function _h(t){var e=El.current;vt(El),t._currentValue=e}function Ou(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Es(t,e){wl=t,gh=ps=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(an=!0),t.firstContext=null)}function Un(t){var e=t._currentValue;if(gh!==t)if(t={context:t,memoizedValue:e,next:null},ps===null){if(wl===null)throw Error(se(308));ps=t,wl.dependencies={lanes:0,firstContext:t}}else ps=ps.next=t;return e}var br=null;function xh(t){br===null?br=[t]:br.push(t)}function Sg(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,xh(e)):(n.next=r.next,r.next=n),e.interleaved=n,Ai(t,i)}function Ai(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Bi=!1;function yh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Mg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Mi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Yi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Je&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Ai(t,n)}return r=i.interleaved,r===null?(e.next=e,xh(i)):(e.next=r.next,r.next=e),i.interleaved=e,Ai(t,n)}function Zo(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,sh(t,n)}}function kf(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Tl(t,e,n,i){var r=t.updateQueue;Bi=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,u=l.next;l.next=null,a===null?s=u:a.next=u,a=l;var f=t.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==a&&(o===null?f.firstBaseUpdate=u:o.next=u,f.lastBaseUpdate=l))}if(s!==null){var p=r.baseState;a=0,f=u=l=null,o=s;do{var h=o.lane,m=o.eventTime;if((i&h)===h){f!==null&&(f=f.next={eventTime:m,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var x=t,S=o;switch(h=e,m=n,S.tag){case 1:if(x=S.payload,typeof x=="function"){p=x.call(m,p,h);break e}p=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=S.payload,h=typeof x=="function"?x.call(m,p,h):x,h==null)break e;p=Mt({},p,h);break e;case 2:Bi=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[o]:h.push(o))}else m={eventTime:m,lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(u=f=m,l=p):f=f.next=m,a|=h;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;h=o,o=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(f===null&&(l=p),r.baseState=l,r.firstBaseUpdate=u,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);kr|=a,t.lanes=a,t.memoizedState=p}}function Ff(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(se(191,r));r.call(i)}}}var Ka={},ai=or(Ka),ka=or(Ka),Fa=or(Ka);function Cr(t){if(t===Ka)throw Error(se(174));return t}function Sh(t,e){switch(ft(Fa,e),ft(ka,t),ft(ai,Ka),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:_u(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=_u(e,t)}vt(ai),ft(ai,e)}function Ds(){vt(ai),vt(ka),vt(Fa)}function Eg(t){Cr(Fa.current);var e=Cr(ai.current),n=_u(e,t.type);e!==n&&(ft(ka,t),ft(ai,n))}function Mh(t){ka.current===t&&(vt(ai),vt(ka))}var yt=or(0);function Al(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ec=[];function Eh(){for(var t=0;t<Ec.length;t++)Ec[t]._workInProgressVersionPrimary=null;Ec.length=0}var Qo=Ri.ReactCurrentDispatcher,wc=Ri.ReactCurrentBatchConfig,Ur=0,St=null,Lt=null,Ot=null,bl=!1,Sa=!1,Oa=0,Qx=0;function Gt(){throw Error(se(321))}function wh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Jn(t[n],e[n]))return!1;return!0}function Th(t,e,n,i,r,s){if(Ur=s,St=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Qo.current=t===null||t.memoizedState===null?n0:i0,t=n(i,r),Sa){s=0;do{if(Sa=!1,Oa=0,25<=s)throw Error(se(301));s+=1,Ot=Lt=null,e.updateQueue=null,Qo.current=r0,t=n(i,r)}while(Sa)}if(Qo.current=Cl,e=Lt!==null&&Lt.next!==null,Ur=0,Ot=Lt=St=null,bl=!1,e)throw Error(se(300));return t}function Ah(){var t=Oa!==0;return Oa=0,t}function ti(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ot===null?St.memoizedState=Ot=t:Ot=Ot.next=t,Ot}function kn(){if(Lt===null){var t=St.alternate;t=t!==null?t.memoizedState:null}else t=Lt.next;var e=Ot===null?St.memoizedState:Ot.next;if(e!==null)Ot=e,Lt=t;else{if(t===null)throw Error(se(310));Lt=t,t={memoizedState:Lt.memoizedState,baseState:Lt.baseState,baseQueue:Lt.baseQueue,queue:Lt.queue,next:null},Ot===null?St.memoizedState=Ot=t:Ot=Ot.next=t}return Ot}function za(t,e){return typeof e=="function"?e(t):e}function Tc(t){var e=kn(),n=e.queue;if(n===null)throw Error(se(311));n.lastRenderedReducer=t;var i=Lt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,u=s;do{var f=u.lane;if((Ur&f)===f)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:t(i,u.action);else{var p={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(o=l=p,a=i):l=l.next=p,St.lanes|=f,kr|=f}u=u.next}while(u!==null&&u!==s);l===null?a=i:l.next=o,Jn(i,e.memoizedState)||(an=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,St.lanes|=s,kr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Ac(t){var e=kn(),n=e.queue;if(n===null)throw Error(se(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);Jn(s,e.memoizedState)||(an=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function wg(){}function Tg(t,e){var n=St,i=kn(),r=e(),s=!Jn(i.memoizedState,r);if(s&&(i.memoizedState=r,an=!0),i=i.queue,bh(Cg.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ot!==null&&Ot.memoizedState.tag&1){if(n.flags|=2048,Ba(9,bg.bind(null,n,i,r,e),void 0,null),zt===null)throw Error(se(349));Ur&30||Ag(n,e,r)}return r}function Ag(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=St.updateQueue,e===null?(e={lastEffect:null,stores:null},St.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function bg(t,e,n,i){e.value=n,e.getSnapshot=i,Rg(e)&&Pg(t)}function Cg(t,e,n){return n(function(){Rg(e)&&Pg(t)})}function Rg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Jn(t,n)}catch{return!0}}function Pg(t){var e=Ai(t,1);e!==null&&Zn(e,t,1,-1)}function Of(t){var e=ti();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:za,lastRenderedState:t},e.queue=t,t=t.dispatch=t0.bind(null,St,t),[e.memoizedState,t]}function Ba(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=St.updateQueue,e===null?(e={lastEffect:null,stores:null},St.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Ng(){return kn().memoizedState}function Jo(t,e,n,i){var r=ti();St.flags|=t,r.memoizedState=Ba(1|e,n,void 0,i===void 0?null:i)}function Kl(t,e,n,i){var r=kn();i=i===void 0?null:i;var s=void 0;if(Lt!==null){var a=Lt.memoizedState;if(s=a.destroy,i!==null&&wh(i,a.deps)){r.memoizedState=Ba(e,n,s,i);return}}St.flags|=t,r.memoizedState=Ba(1|e,n,s,i)}function zf(t,e){return Jo(8390656,8,t,e)}function bh(t,e){return Kl(2048,8,t,e)}function Lg(t,e){return Kl(4,2,t,e)}function Dg(t,e){return Kl(4,4,t,e)}function Ig(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Ug(t,e,n){return n=n!=null?n.concat([t]):null,Kl(4,4,Ig.bind(null,e,t),n)}function Ch(){}function kg(t,e){var n=kn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&wh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Fg(t,e){var n=kn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&wh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Og(t,e,n){return Ur&21?(Jn(n,e)||(n=Vm(),St.lanes|=n,kr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,an=!0),t.memoizedState=n)}function Jx(t,e){var n=ot;ot=n!==0&&4>n?n:4,t(!0);var i=wc.transition;wc.transition={};try{t(!1),e()}finally{ot=n,wc.transition=i}}function zg(){return kn().memoizedState}function e0(t,e,n){var i=Qi(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Bg(t))jg(e,n);else if(n=Sg(t,e,n,i),n!==null){var r=Jt();Zn(n,t,i,r),Hg(n,e,i)}}function t0(t,e,n){var i=Qi(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Bg(t))jg(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,Jn(o,a)){var l=e.interleaved;l===null?(r.next=r,xh(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Sg(t,e,r,i),n!==null&&(r=Jt(),Zn(n,t,i,r),Hg(n,e,i))}}function Bg(t){var e=t.alternate;return t===St||e!==null&&e===St}function jg(t,e){Sa=bl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Hg(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,sh(t,n)}}var Cl={readContext:Un,useCallback:Gt,useContext:Gt,useEffect:Gt,useImperativeHandle:Gt,useInsertionEffect:Gt,useLayoutEffect:Gt,useMemo:Gt,useReducer:Gt,useRef:Gt,useState:Gt,useDebugValue:Gt,useDeferredValue:Gt,useTransition:Gt,useMutableSource:Gt,useSyncExternalStore:Gt,useId:Gt,unstable_isNewReconciler:!1},n0={readContext:Un,useCallback:function(t,e){return ti().memoizedState=[t,e===void 0?null:e],t},useContext:Un,useEffect:zf,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Jo(4194308,4,Ig.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Jo(4194308,4,t,e)},useInsertionEffect:function(t,e){return Jo(4,2,t,e)},useMemo:function(t,e){var n=ti();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ti();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=e0.bind(null,St,t),[i.memoizedState,t]},useRef:function(t){var e=ti();return t={current:t},e.memoizedState=t},useState:Of,useDebugValue:Ch,useDeferredValue:function(t){return ti().memoizedState=t},useTransition:function(){var t=Of(!1),e=t[0];return t=Jx.bind(null,t[1]),ti().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=St,r=ti();if(xt){if(n===void 0)throw Error(se(407));n=n()}else{if(n=e(),zt===null)throw Error(se(349));Ur&30||Ag(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,zf(Cg.bind(null,i,s,t),[t]),i.flags|=2048,Ba(9,bg.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=ti(),e=zt.identifierPrefix;if(xt){var n=xi,i=_i;n=(i&~(1<<32-Yn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Oa++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Qx++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},i0={readContext:Un,useCallback:kg,useContext:Un,useEffect:bh,useImperativeHandle:Ug,useInsertionEffect:Lg,useLayoutEffect:Dg,useMemo:Fg,useReducer:Tc,useRef:Ng,useState:function(){return Tc(za)},useDebugValue:Ch,useDeferredValue:function(t){var e=kn();return Og(e,Lt.memoizedState,t)},useTransition:function(){var t=Tc(za)[0],e=kn().memoizedState;return[t,e]},useMutableSource:wg,useSyncExternalStore:Tg,useId:zg,unstable_isNewReconciler:!1},r0={readContext:Un,useCallback:kg,useContext:Un,useEffect:bh,useImperativeHandle:Ug,useInsertionEffect:Lg,useLayoutEffect:Dg,useMemo:Fg,useReducer:Ac,useRef:Ng,useState:function(){return Ac(za)},useDebugValue:Ch,useDeferredValue:function(t){var e=kn();return Lt===null?e.memoizedState=t:Og(e,Lt.memoizedState,t)},useTransition:function(){var t=Ac(za)[0],e=kn().memoizedState;return[t,e]},useMutableSource:wg,useSyncExternalStore:Tg,useId:zg,unstable_isNewReconciler:!1};function Wn(t,e){if(t&&t.defaultProps){e=Mt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function zu(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Mt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var ql={isMounted:function(t){return(t=t._reactInternals)?jr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=Jt(),r=Qi(t),s=Mi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Yi(t,s,r),e!==null&&(Zn(e,t,r,i),Zo(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=Jt(),r=Qi(t),s=Mi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Yi(t,s,r),e!==null&&(Zn(e,t,r,i),Zo(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Jt(),i=Qi(t),r=Mi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Yi(t,r,i),e!==null&&(Zn(e,t,i,n),Zo(e,t,i))}};function Bf(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!La(n,i)||!La(r,s):!0}function Vg(t,e,n){var i=!1,r=ir,s=e.contextType;return typeof s=="object"&&s!==null?s=Un(s):(r=ln(e)?Dr:$t.current,i=e.contextTypes,s=(i=i!=null)?Ps(t,r):ir),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=ql,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function jf(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&ql.enqueueReplaceState(e,e.state,null)}function Bu(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},yh(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Un(s):(s=ln(e)?Dr:$t.current,r.context=Ps(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(zu(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&ql.enqueueReplaceState(r,r.state,null),Tl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Is(t,e){try{var n="",i=e;do n+=L_(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function bc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function ju(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var s0=typeof WeakMap=="function"?WeakMap:Map;function Gg(t,e,n){n=Mi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Pl||(Pl=!0,Zu=i),ju(t,e)},n}function Wg(t,e,n){n=Mi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){ju(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){ju(t,e),typeof i!="function"&&(Zi===null?Zi=new Set([this]):Zi.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Hf(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new s0;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=x0.bind(null,t,e,n),e.then(t,t))}function Vf(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Gf(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Mi(-1,1),e.tag=2,Yi(n,e,1))),n.lanes|=1),t)}var a0=Ri.ReactCurrentOwner,an=!1;function Qt(t,e,n,i){e.child=t===null?yg(e,null,n,i):Ls(e,t.child,n,i)}function Wf(t,e,n,i,r){n=n.render;var s=e.ref;return Es(e,r),i=Th(t,e,n,i,s,r),n=Ah(),t!==null&&!an?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,bi(t,e,r)):(xt&&n&&fh(e),e.flags|=1,Qt(t,e,i,r),e.child)}function Xf(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!kh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Xg(t,e,s,i,r)):(t=il(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:La,n(a,i)&&t.ref===e.ref)return bi(t,e,r)}return e.flags|=1,t=Ji(s,i),t.ref=e.ref,t.return=e,e.child=t}function Xg(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(La(s,i)&&t.ref===e.ref)if(an=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(an=!0);else return e.lanes=t.lanes,bi(t,e,r)}return Hu(t,e,n,i,r)}function Kg(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ft(gs,_n),_n|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ft(gs,_n),_n|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,ft(gs,_n),_n|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,ft(gs,_n),_n|=i;return Qt(t,e,r,n),e.child}function qg(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Hu(t,e,n,i,r){var s=ln(n)?Dr:$t.current;return s=Ps(e,s),Es(e,r),n=Th(t,e,n,i,s,r),i=Ah(),t!==null&&!an?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,bi(t,e,r)):(xt&&i&&fh(e),e.flags|=1,Qt(t,e,n,r),e.child)}function Kf(t,e,n,i,r){if(ln(n)){var s=!0;yl(e)}else s=!1;if(Es(e,r),e.stateNode===null)el(t,e),Vg(e,n,i),Bu(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,u=n.contextType;typeof u=="object"&&u!==null?u=Un(u):(u=ln(n)?Dr:$t.current,u=Ps(e,u));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";p||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==u)&&jf(e,a,i,u),Bi=!1;var h=e.memoizedState;a.state=h,Tl(e,i,a,r),l=e.memoizedState,o!==i||h!==l||on.current||Bi?(typeof f=="function"&&(zu(e,n,f,i),l=e.memoizedState),(o=Bi||Bf(e,n,o,i,h,l,u))?(p||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=u,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,Mg(t,e),o=e.memoizedProps,u=e.type===e.elementType?o:Wn(e.type,o),a.props=u,p=e.pendingProps,h=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=Un(l):(l=ln(n)?Dr:$t.current,l=Ps(e,l));var m=n.getDerivedStateFromProps;(f=typeof m=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==p||h!==l)&&jf(e,a,i,l),Bi=!1,h=e.memoizedState,a.state=h,Tl(e,i,a,r);var x=e.memoizedState;o!==p||h!==x||on.current||Bi?(typeof m=="function"&&(zu(e,n,m,i),x=e.memoizedState),(u=Bi||Bf(e,n,u,i,h,x,l)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,x,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,x,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=x),a.props=i,a.state=x,a.context=l,i=u):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Vu(t,e,n,i,s,r)}function Vu(t,e,n,i,r,s){qg(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&Lf(e,n,!1),bi(t,e,s);i=e.stateNode,a0.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Ls(e,t.child,null,s),e.child=Ls(e,null,o,s)):Qt(t,e,o,s),e.memoizedState=i.state,r&&Lf(e,n,!0),e.child}function $g(t){var e=t.stateNode;e.pendingContext?Nf(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Nf(t,e.context,!1),Sh(t,e.containerInfo)}function qf(t,e,n,i,r){return Ns(),mh(r),e.flags|=256,Qt(t,e,n,i),e.child}var Gu={dehydrated:null,treeContext:null,retryLane:0};function Wu(t){return{baseLanes:t,cachePool:null,transitions:null}}function Yg(t,e,n){var i=e.pendingProps,r=yt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ft(yt,r&1),t===null)return Fu(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=Zl(a,i,0,null),t=Lr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Wu(n),e.memoizedState=Gu,t):Rh(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return o0(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Ji(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=Ji(o,s):(s=Lr(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?Wu(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Gu,i}return s=t.child,t=s.sibling,i=Ji(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Rh(t,e){return e=Zl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function _o(t,e,n,i){return i!==null&&mh(i),Ls(e,t.child,null,n),t=Rh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function o0(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=bc(Error(se(422))),_o(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Zl({mode:"visible",children:i.children},r,0,null),s=Lr(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Ls(e,t.child,null,a),e.child.memoizedState=Wu(a),e.memoizedState=Gu,s);if(!(e.mode&1))return _o(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(se(419)),i=bc(s,i,void 0),_o(t,e,a,i)}if(o=(a&t.childLanes)!==0,an||o){if(i=zt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Ai(t,r),Zn(i,t,r,-1))}return Uh(),i=bc(Error(se(421))),_o(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=y0.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,xn=$i(r.nextSibling),Sn=e,xt=!0,Kn=null,t!==null&&(Pn[Nn++]=_i,Pn[Nn++]=xi,Pn[Nn++]=Ir,_i=t.id,xi=t.overflow,Ir=e),e=Rh(e,i.children),e.flags|=4096,e)}function $f(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Ou(t.return,e,n)}function Cc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Zg(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Qt(t,e,i.children,n),i=yt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&$f(t,n,e);else if(t.tag===19)$f(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ft(yt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Al(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Cc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Al(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Cc(e,!0,n,null,s);break;case"together":Cc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function el(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function bi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),kr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(se(153));if(e.child!==null){for(t=e.child,n=Ji(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ji(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function l0(t,e,n){switch(e.tag){case 3:$g(e),Ns();break;case 5:Eg(e);break;case 1:ln(e.type)&&yl(e);break;case 4:Sh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ft(El,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ft(yt,yt.current&1),e.flags|=128,null):n&e.child.childLanes?Yg(t,e,n):(ft(yt,yt.current&1),t=bi(t,e,n),t!==null?t.sibling:null);ft(yt,yt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Zg(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ft(yt,yt.current),i)break;return null;case 22:case 23:return e.lanes=0,Kg(t,e,n)}return bi(t,e,n)}var Qg,Xu,Jg,ev;Qg=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Xu=function(){};Jg=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Cr(ai.current);var s=null;switch(n){case"input":r=pu(t,r),i=pu(t,i),s=[];break;case"select":r=Mt({},r,{value:void 0}),i=Mt({},i,{value:void 0}),s=[];break;case"textarea":r=vu(t,r),i=vu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=_l)}xu(n,i);var a;n=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var o=r[u];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Ta.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var l=i[u];if(o=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&l!==o&&(l!=null||o!=null))if(u==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Ta.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&gt("scroll",t),s||o===l||(s=[])):(s=s||[]).push(u,l))}n&&(s=s||[]).push("style",n);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};ev=function(t,e,n,i){n!==i&&(e.flags|=4)};function na(t,e){if(!xt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Wt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function c0(t,e,n){var i=e.pendingProps;switch(ph(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Wt(e),null;case 1:return ln(e.type)&&xl(),Wt(e),null;case 3:return i=e.stateNode,Ds(),vt(on),vt($t),Eh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(go(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Kn!==null&&(ed(Kn),Kn=null))),Xu(t,e),Wt(e),null;case 5:Mh(e);var r=Cr(Fa.current);if(n=e.type,t!==null&&e.stateNode!=null)Jg(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(se(166));return Wt(e),null}if(t=Cr(ai.current),go(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ii]=e,i[Ua]=s,t=(e.mode&1)!==0,n){case"dialog":gt("cancel",i),gt("close",i);break;case"iframe":case"object":case"embed":gt("load",i);break;case"video":case"audio":for(r=0;r<fa.length;r++)gt(fa[r],i);break;case"source":gt("error",i);break;case"img":case"image":case"link":gt("error",i),gt("load",i);break;case"details":gt("toggle",i);break;case"input":rf(i,s),gt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},gt("invalid",i);break;case"textarea":af(i,s),gt("invalid",i)}xu(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&mo(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&mo(i.textContent,o,t),r=["children",""+o]):Ta.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&gt("scroll",i)}switch(n){case"input":ao(i),sf(i,s,!0);break;case"textarea":ao(i),of(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=_l)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Cm(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[ii]=e,t[Ua]=i,Qg(t,e,!1,!1),e.stateNode=t;e:{switch(a=yu(n,i),n){case"dialog":gt("cancel",t),gt("close",t),r=i;break;case"iframe":case"object":case"embed":gt("load",t),r=i;break;case"video":case"audio":for(r=0;r<fa.length;r++)gt(fa[r],t);r=i;break;case"source":gt("error",t),r=i;break;case"img":case"image":case"link":gt("error",t),gt("load",t),r=i;break;case"details":gt("toggle",t),r=i;break;case"input":rf(t,i),r=pu(t,i),gt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Mt({},i,{value:void 0}),gt("invalid",t);break;case"textarea":af(t,i),r=vu(t,i),gt("invalid",t);break;default:r=i}xu(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?Nm(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Rm(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Aa(t,l):typeof l=="number"&&Aa(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ta.hasOwnProperty(s)?l!=null&&s==="onScroll"&&gt("scroll",t):l!=null&&Jd(t,s,l,a))}switch(n){case"input":ao(t),sf(t,i,!1);break;case"textarea":ao(t),of(t);break;case"option":i.value!=null&&t.setAttribute("value",""+nr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?xs(t,!!i.multiple,s,!1):i.defaultValue!=null&&xs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=_l)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Wt(e),null;case 6:if(t&&e.stateNode!=null)ev(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(se(166));if(n=Cr(Fa.current),Cr(ai.current),go(e)){if(i=e.stateNode,n=e.memoizedProps,i[ii]=e,(s=i.nodeValue!==n)&&(t=Sn,t!==null))switch(t.tag){case 3:mo(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&mo(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ii]=e,e.stateNode=i}return Wt(e),null;case 13:if(vt(yt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(xt&&xn!==null&&e.mode&1&&!(e.flags&128))_g(),Ns(),e.flags|=98560,s=!1;else if(s=go(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(se(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(se(317));s[ii]=e}else Ns(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Wt(e),s=!1}else Kn!==null&&(ed(Kn),Kn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||yt.current&1?Dt===0&&(Dt=3):Uh())),e.updateQueue!==null&&(e.flags|=4),Wt(e),null);case 4:return Ds(),Xu(t,e),t===null&&Da(e.stateNode.containerInfo),Wt(e),null;case 10:return _h(e.type._context),Wt(e),null;case 17:return ln(e.type)&&xl(),Wt(e),null;case 19:if(vt(yt),s=e.memoizedState,s===null)return Wt(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)na(s,!1);else{if(Dt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=Al(t),a!==null){for(e.flags|=128,na(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ft(yt,yt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Tt()>Us&&(e.flags|=128,i=!0,na(s,!1),e.lanes=4194304)}else{if(!i)if(t=Al(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),na(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!xt)return Wt(e),null}else 2*Tt()-s.renderingStartTime>Us&&n!==1073741824&&(e.flags|=128,i=!0,na(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Tt(),e.sibling=null,n=yt.current,ft(yt,i?n&1|2:n&1),e):(Wt(e),null);case 22:case 23:return Ih(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?_n&1073741824&&(Wt(e),e.subtreeFlags&6&&(e.flags|=8192)):Wt(e),null;case 24:return null;case 25:return null}throw Error(se(156,e.tag))}function u0(t,e){switch(ph(e),e.tag){case 1:return ln(e.type)&&xl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ds(),vt(on),vt($t),Eh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Mh(e),null;case 13:if(vt(yt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(se(340));Ns()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return vt(yt),null;case 4:return Ds(),null;case 10:return _h(e.type._context),null;case 22:case 23:return Ih(),null;case 24:return null;default:return null}}var xo=!1,qt=!1,d0=typeof WeakSet=="function"?WeakSet:Set,Se=null;function ms(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){wt(t,e,i)}else n.current=null}function Ku(t,e,n){try{n()}catch(i){wt(t,e,i)}}var Yf=!1;function h0(t,e){if(Pu=ml,t=sg(),hh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,u=0,f=0,p=t,h=null;t:for(;;){for(var m;p!==n||r!==0&&p.nodeType!==3||(o=a+r),p!==s||i!==0&&p.nodeType!==3||(l=a+i),p.nodeType===3&&(a+=p.nodeValue.length),(m=p.firstChild)!==null;)h=p,p=m;for(;;){if(p===t)break t;if(h===n&&++u===r&&(o=a),h===s&&++f===i&&(l=a),(m=p.nextSibling)!==null)break;p=h,h=p.parentNode}p=m}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Nu={focusedElem:t,selectionRange:n},ml=!1,Se=e;Se!==null;)if(e=Se,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Se=t;else for(;Se!==null;){e=Se;try{var x=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var S=x.memoizedProps,g=x.memoizedState,d=e.stateNode,_=d.getSnapshotBeforeUpdate(e.elementType===e.type?S:Wn(e.type,S),g);d.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var y=e.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(se(163))}}catch(E){wt(e,e.return,E)}if(t=e.sibling,t!==null){t.return=e.return,Se=t;break}Se=e.return}return x=Yf,Yf=!1,x}function Ma(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Ku(e,n,s)}r=r.next}while(r!==i)}}function $l(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function qu(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function tv(t){var e=t.alternate;e!==null&&(t.alternate=null,tv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ii],delete e[Ua],delete e[Iu],delete e[qx],delete e[$x])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function nv(t){return t.tag===5||t.tag===3||t.tag===4}function Zf(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||nv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function $u(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=_l));else if(i!==4&&(t=t.child,t!==null))for($u(t,e,n),t=t.sibling;t!==null;)$u(t,e,n),t=t.sibling}function Yu(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Yu(t,e,n),t=t.sibling;t!==null;)Yu(t,e,n),t=t.sibling}var jt=null,Xn=!1;function Li(t,e,n){for(n=n.child;n!==null;)iv(t,e,n),n=n.sibling}function iv(t,e,n){if(si&&typeof si.onCommitFiberUnmount=="function")try{si.onCommitFiberUnmount(jl,n)}catch{}switch(n.tag){case 5:qt||ms(n,e);case 6:var i=jt,r=Xn;jt=null,Li(t,e,n),jt=i,Xn=r,jt!==null&&(Xn?(t=jt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):jt.removeChild(n.stateNode));break;case 18:jt!==null&&(Xn?(t=jt,n=n.stateNode,t.nodeType===8?Sc(t.parentNode,n):t.nodeType===1&&Sc(t,n),Pa(t)):Sc(jt,n.stateNode));break;case 4:i=jt,r=Xn,jt=n.stateNode.containerInfo,Xn=!0,Li(t,e,n),jt=i,Xn=r;break;case 0:case 11:case 14:case 15:if(!qt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Ku(n,e,a),r=r.next}while(r!==i)}Li(t,e,n);break;case 1:if(!qt&&(ms(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){wt(n,e,o)}Li(t,e,n);break;case 21:Li(t,e,n);break;case 22:n.mode&1?(qt=(i=qt)||n.memoizedState!==null,Li(t,e,n),qt=i):Li(t,e,n);break;default:Li(t,e,n)}}function Qf(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new d0),e.forEach(function(i){var r=S0.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function jn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:jt=o.stateNode,Xn=!1;break e;case 3:jt=o.stateNode.containerInfo,Xn=!0;break e;case 4:jt=o.stateNode.containerInfo,Xn=!0;break e}o=o.return}if(jt===null)throw Error(se(160));iv(s,a,r),jt=null,Xn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(u){wt(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)rv(e,t),e=e.sibling}function rv(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(jn(e,t),ei(t),i&4){try{Ma(3,t,t.return),$l(3,t)}catch(S){wt(t,t.return,S)}try{Ma(5,t,t.return)}catch(S){wt(t,t.return,S)}}break;case 1:jn(e,t),ei(t),i&512&&n!==null&&ms(n,n.return);break;case 5:if(jn(e,t),ei(t),i&512&&n!==null&&ms(n,n.return),t.flags&32){var r=t.stateNode;try{Aa(r,"")}catch(S){wt(t,t.return,S)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Am(r,s),yu(o,a);var u=yu(o,s);for(a=0;a<l.length;a+=2){var f=l[a],p=l[a+1];f==="style"?Nm(r,p):f==="dangerouslySetInnerHTML"?Rm(r,p):f==="children"?Aa(r,p):Jd(r,f,p,u)}switch(o){case"input":mu(r,s);break;case"textarea":bm(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var m=s.value;m!=null?xs(r,!!s.multiple,m,!1):h!==!!s.multiple&&(s.defaultValue!=null?xs(r,!!s.multiple,s.defaultValue,!0):xs(r,!!s.multiple,s.multiple?[]:"",!1))}r[Ua]=s}catch(S){wt(t,t.return,S)}}break;case 6:if(jn(e,t),ei(t),i&4){if(t.stateNode===null)throw Error(se(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(S){wt(t,t.return,S)}}break;case 3:if(jn(e,t),ei(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Pa(e.containerInfo)}catch(S){wt(t,t.return,S)}break;case 4:jn(e,t),ei(t);break;case 13:jn(e,t),ei(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Lh=Tt())),i&4&&Qf(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(qt=(u=qt)||f,jn(e,t),qt=u):jn(e,t),ei(t),i&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!f&&t.mode&1)for(Se=t,f=t.child;f!==null;){for(p=Se=f;Se!==null;){switch(h=Se,m=h.child,h.tag){case 0:case 11:case 14:case 15:Ma(4,h,h.return);break;case 1:ms(h,h.return);var x=h.stateNode;if(typeof x.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,x.props=e.memoizedProps,x.state=e.memoizedState,x.componentWillUnmount()}catch(S){wt(i,n,S)}}break;case 5:ms(h,h.return);break;case 22:if(h.memoizedState!==null){ep(p);continue}}m!==null?(m.return=h,Se=m):ep(p)}f=f.sibling}e:for(f=null,p=t;;){if(p.tag===5){if(f===null){f=p;try{r=p.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=p.stateNode,l=p.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=Pm("display",a))}catch(S){wt(t,t.return,S)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=u?"":p.memoizedProps}catch(S){wt(t,t.return,S)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:jn(e,t),ei(t),i&4&&Qf(t);break;case 21:break;default:jn(e,t),ei(t)}}function ei(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(nv(n)){var i=n;break e}n=n.return}throw Error(se(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Aa(r,""),i.flags&=-33);var s=Zf(t);Yu(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=Zf(t);$u(t,o,a);break;default:throw Error(se(161))}}catch(l){wt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function f0(t,e,n){Se=t,sv(t)}function sv(t,e,n){for(var i=(t.mode&1)!==0;Se!==null;){var r=Se,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||xo;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||qt;o=xo;var u=qt;if(xo=a,(qt=l)&&!u)for(Se=r;Se!==null;)a=Se,l=a.child,a.tag===22&&a.memoizedState!==null?tp(r):l!==null?(l.return=a,Se=l):tp(r);for(;s!==null;)Se=s,sv(s),s=s.sibling;Se=r,xo=o,qt=u}Jf(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Se=s):Jf(t)}}function Jf(t){for(;Se!==null;){var e=Se;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:qt||$l(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!qt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Wn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Ff(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Ff(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&Pa(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(se(163))}qt||e.flags&512&&qu(e)}catch(h){wt(e,e.return,h)}}if(e===t){Se=null;break}if(n=e.sibling,n!==null){n.return=e.return,Se=n;break}Se=e.return}}function ep(t){for(;Se!==null;){var e=Se;if(e===t){Se=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Se=n;break}Se=e.return}}function tp(t){for(;Se!==null;){var e=Se;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{$l(4,e)}catch(l){wt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){wt(e,r,l)}}var s=e.return;try{qu(e)}catch(l){wt(e,s,l)}break;case 5:var a=e.return;try{qu(e)}catch(l){wt(e,a,l)}}}catch(l){wt(e,e.return,l)}if(e===t){Se=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Se=o;break}Se=e.return}}var p0=Math.ceil,Rl=Ri.ReactCurrentDispatcher,Ph=Ri.ReactCurrentOwner,In=Ri.ReactCurrentBatchConfig,Je=0,zt=null,Rt=null,Ht=0,_n=0,gs=or(0),Dt=0,ja=null,kr=0,Yl=0,Nh=0,Ea=null,sn=null,Lh=0,Us=1/0,mi=null,Pl=!1,Zu=null,Zi=null,yo=!1,Wi=null,Nl=0,wa=0,Qu=null,tl=-1,nl=0;function Jt(){return Je&6?Tt():tl!==-1?tl:tl=Tt()}function Qi(t){return t.mode&1?Je&2&&Ht!==0?Ht&-Ht:Zx.transition!==null?(nl===0&&(nl=Vm()),nl):(t=ot,t!==0||(t=window.event,t=t===void 0?16:Ym(t.type)),t):1}function Zn(t,e,n,i){if(50<wa)throw wa=0,Qu=null,Error(se(185));Ga(t,n,i),(!(Je&2)||t!==zt)&&(t===zt&&(!(Je&2)&&(Yl|=n),Dt===4&&Hi(t,Ht)),cn(t,i),n===1&&Je===0&&!(e.mode&1)&&(Us=Tt()+500,Xl&&lr()))}function cn(t,e){var n=t.callbackNode;Z_(t,e);var i=pl(t,t===zt?Ht:0);if(i===0)n!==null&&uf(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&uf(n),e===1)t.tag===0?Yx(np.bind(null,t)):mg(np.bind(null,t)),Xx(function(){!(Je&6)&&lr()}),n=null;else{switch(Gm(i)){case 1:n=rh;break;case 4:n=jm;break;case 16:n=fl;break;case 536870912:n=Hm;break;default:n=fl}n=fv(n,av.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function av(t,e){if(tl=-1,nl=0,Je&6)throw Error(se(327));var n=t.callbackNode;if(ws()&&t.callbackNode!==n)return null;var i=pl(t,t===zt?Ht:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Ll(t,i);else{e=i;var r=Je;Je|=2;var s=lv();(zt!==t||Ht!==e)&&(mi=null,Us=Tt()+500,Nr(t,e));do try{v0();break}catch(o){ov(t,o)}while(!0);vh(),Rl.current=s,Je=r,Rt!==null?e=0:(zt=null,Ht=0,e=Dt)}if(e!==0){if(e===2&&(r=Tu(t),r!==0&&(i=r,e=Ju(t,r))),e===1)throw n=ja,Nr(t,0),Hi(t,i),cn(t,Tt()),n;if(e===6)Hi(t,i);else{if(r=t.current.alternate,!(i&30)&&!m0(r)&&(e=Ll(t,i),e===2&&(s=Tu(t),s!==0&&(i=s,e=Ju(t,s))),e===1))throw n=ja,Nr(t,0),Hi(t,i),cn(t,Tt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(se(345));case 2:xr(t,sn,mi);break;case 3:if(Hi(t,i),(i&130023424)===i&&(e=Lh+500-Tt(),10<e)){if(pl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){Jt(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Du(xr.bind(null,t,sn,mi),e);break}xr(t,sn,mi);break;case 4:if(Hi(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-Yn(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=Tt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*p0(i/1960))-i,10<i){t.timeoutHandle=Du(xr.bind(null,t,sn,mi),i);break}xr(t,sn,mi);break;case 5:xr(t,sn,mi);break;default:throw Error(se(329))}}}return cn(t,Tt()),t.callbackNode===n?av.bind(null,t):null}function Ju(t,e){var n=Ea;return t.current.memoizedState.isDehydrated&&(Nr(t,e).flags|=256),t=Ll(t,e),t!==2&&(e=sn,sn=n,e!==null&&ed(e)),t}function ed(t){sn===null?sn=t:sn.push.apply(sn,t)}function m0(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Jn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Hi(t,e){for(e&=~Nh,e&=~Yl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Yn(e),i=1<<n;t[n]=-1,e&=~i}}function np(t){if(Je&6)throw Error(se(327));ws();var e=pl(t,0);if(!(e&1))return cn(t,Tt()),null;var n=Ll(t,e);if(t.tag!==0&&n===2){var i=Tu(t);i!==0&&(e=i,n=Ju(t,i))}if(n===1)throw n=ja,Nr(t,0),Hi(t,e),cn(t,Tt()),n;if(n===6)throw Error(se(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,xr(t,sn,mi),cn(t,Tt()),null}function Dh(t,e){var n=Je;Je|=1;try{return t(e)}finally{Je=n,Je===0&&(Us=Tt()+500,Xl&&lr())}}function Fr(t){Wi!==null&&Wi.tag===0&&!(Je&6)&&ws();var e=Je;Je|=1;var n=In.transition,i=ot;try{if(In.transition=null,ot=1,t)return t()}finally{ot=i,In.transition=n,Je=e,!(Je&6)&&lr()}}function Ih(){_n=gs.current,vt(gs)}function Nr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Wx(n)),Rt!==null)for(n=Rt.return;n!==null;){var i=n;switch(ph(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&xl();break;case 3:Ds(),vt(on),vt($t),Eh();break;case 5:Mh(i);break;case 4:Ds();break;case 13:vt(yt);break;case 19:vt(yt);break;case 10:_h(i.type._context);break;case 22:case 23:Ih()}n=n.return}if(zt=t,Rt=t=Ji(t.current,null),Ht=_n=e,Dt=0,ja=null,Nh=Yl=kr=0,sn=Ea=null,br!==null){for(e=0;e<br.length;e++)if(n=br[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}br=null}return t}function ov(t,e){do{var n=Rt;try{if(vh(),Qo.current=Cl,bl){for(var i=St.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}bl=!1}if(Ur=0,Ot=Lt=St=null,Sa=!1,Oa=0,Ph.current=null,n===null||n.return===null){Dt=1,ja=e,Rt=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=Ht,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,f=o,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var m=Vf(a);if(m!==null){m.flags&=-257,Gf(m,a,o,s,e),m.mode&1&&Hf(s,u,e),e=m,l=u;var x=e.updateQueue;if(x===null){var S=new Set;S.add(l),e.updateQueue=S}else x.add(l);break e}else{if(!(e&1)){Hf(s,u,e),Uh();break e}l=Error(se(426))}}else if(xt&&o.mode&1){var g=Vf(a);if(g!==null){!(g.flags&65536)&&(g.flags|=256),Gf(g,a,o,s,e),mh(Is(l,o));break e}}s=l=Is(l,o),Dt!==4&&(Dt=2),Ea===null?Ea=[s]:Ea.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=Gg(s,l,e);kf(s,d);break e;case 1:o=l;var _=s.type,y=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(Zi===null||!Zi.has(y)))){s.flags|=65536,e&=-e,s.lanes|=e;var E=Wg(s,o,e);kf(s,E);break e}}s=s.return}while(s!==null)}uv(n)}catch(R){e=R,Rt===n&&n!==null&&(Rt=n=n.return);continue}break}while(!0)}function lv(){var t=Rl.current;return Rl.current=Cl,t===null?Cl:t}function Uh(){(Dt===0||Dt===3||Dt===2)&&(Dt=4),zt===null||!(kr&268435455)&&!(Yl&268435455)||Hi(zt,Ht)}function Ll(t,e){var n=Je;Je|=2;var i=lv();(zt!==t||Ht!==e)&&(mi=null,Nr(t,e));do try{g0();break}catch(r){ov(t,r)}while(!0);if(vh(),Je=n,Rl.current=i,Rt!==null)throw Error(se(261));return zt=null,Ht=0,Dt}function g0(){for(;Rt!==null;)cv(Rt)}function v0(){for(;Rt!==null&&!H_();)cv(Rt)}function cv(t){var e=hv(t.alternate,t,_n);t.memoizedProps=t.pendingProps,e===null?uv(t):Rt=e,Ph.current=null}function uv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=u0(n,e),n!==null){n.flags&=32767,Rt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Dt=6,Rt=null;return}}else if(n=c0(n,e,_n),n!==null){Rt=n;return}if(e=e.sibling,e!==null){Rt=e;return}Rt=e=t}while(e!==null);Dt===0&&(Dt=5)}function xr(t,e,n){var i=ot,r=In.transition;try{In.transition=null,ot=1,_0(t,e,n,i)}finally{In.transition=r,ot=i}return null}function _0(t,e,n,i){do ws();while(Wi!==null);if(Je&6)throw Error(se(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(se(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Q_(t,s),t===zt&&(Rt=zt=null,Ht=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||yo||(yo=!0,fv(fl,function(){return ws(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=In.transition,In.transition=null;var a=ot;ot=1;var o=Je;Je|=4,Ph.current=null,h0(t,n),rv(n,t),Ox(Nu),ml=!!Pu,Nu=Pu=null,t.current=n,f0(n),V_(),Je=o,ot=a,In.transition=s}else t.current=n;if(yo&&(yo=!1,Wi=t,Nl=r),s=t.pendingLanes,s===0&&(Zi=null),X_(n.stateNode),cn(t,Tt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Pl)throw Pl=!1,t=Zu,Zu=null,t;return Nl&1&&t.tag!==0&&ws(),s=t.pendingLanes,s&1?t===Qu?wa++:(wa=0,Qu=t):wa=0,lr(),null}function ws(){if(Wi!==null){var t=Gm(Nl),e=In.transition,n=ot;try{if(In.transition=null,ot=16>t?16:t,Wi===null)var i=!1;else{if(t=Wi,Wi=null,Nl=0,Je&6)throw Error(se(331));var r=Je;for(Je|=4,Se=t.current;Se!==null;){var s=Se,a=s.child;if(Se.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var u=o[l];for(Se=u;Se!==null;){var f=Se;switch(f.tag){case 0:case 11:case 15:Ma(8,f,s)}var p=f.child;if(p!==null)p.return=f,Se=p;else for(;Se!==null;){f=Se;var h=f.sibling,m=f.return;if(tv(f),f===u){Se=null;break}if(h!==null){h.return=m,Se=h;break}Se=m}}}var x=s.alternate;if(x!==null){var S=x.child;if(S!==null){x.child=null;do{var g=S.sibling;S.sibling=null,S=g}while(S!==null)}}Se=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Se=a;else e:for(;Se!==null;){if(s=Se,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ma(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,Se=d;break e}Se=s.return}}var _=t.current;for(Se=_;Se!==null;){a=Se;var y=a.child;if(a.subtreeFlags&2064&&y!==null)y.return=a,Se=y;else e:for(a=_;Se!==null;){if(o=Se,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:$l(9,o)}}catch(R){wt(o,o.return,R)}if(o===a){Se=null;break e}var E=o.sibling;if(E!==null){E.return=o.return,Se=E;break e}Se=o.return}}if(Je=r,lr(),si&&typeof si.onPostCommitFiberRoot=="function")try{si.onPostCommitFiberRoot(jl,t)}catch{}i=!0}return i}finally{ot=n,In.transition=e}}return!1}function ip(t,e,n){e=Is(n,e),e=Gg(t,e,1),t=Yi(t,e,1),e=Jt(),t!==null&&(Ga(t,1,e),cn(t,e))}function wt(t,e,n){if(t.tag===3)ip(t,t,n);else for(;e!==null;){if(e.tag===3){ip(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Zi===null||!Zi.has(i))){t=Is(n,t),t=Wg(e,t,1),e=Yi(e,t,1),t=Jt(),e!==null&&(Ga(e,1,t),cn(e,t));break}}e=e.return}}function x0(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=Jt(),t.pingedLanes|=t.suspendedLanes&n,zt===t&&(Ht&n)===n&&(Dt===4||Dt===3&&(Ht&130023424)===Ht&&500>Tt()-Lh?Nr(t,0):Nh|=n),cn(t,e)}function dv(t,e){e===0&&(t.mode&1?(e=co,co<<=1,!(co&130023424)&&(co=4194304)):e=1);var n=Jt();t=Ai(t,e),t!==null&&(Ga(t,e,n),cn(t,n))}function y0(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),dv(t,n)}function S0(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(se(314))}i!==null&&i.delete(e),dv(t,n)}var hv;hv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||on.current)an=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return an=!1,l0(t,e,n);an=!!(t.flags&131072)}else an=!1,xt&&e.flags&1048576&&gg(e,Ml,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;el(t,e),t=e.pendingProps;var r=Ps(e,$t.current);Es(e,n),r=Th(null,e,i,t,r,n);var s=Ah();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,ln(i)?(s=!0,yl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,yh(e),r.updater=ql,e.stateNode=r,r._reactInternals=e,Bu(e,i,t,n),e=Vu(null,e,i,!0,s,n)):(e.tag=0,xt&&s&&fh(e),Qt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(el(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=E0(i),t=Wn(i,t),r){case 0:e=Hu(null,e,i,t,n);break e;case 1:e=Kf(null,e,i,t,n);break e;case 11:e=Wf(null,e,i,t,n);break e;case 14:e=Xf(null,e,i,Wn(i.type,t),n);break e}throw Error(se(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),Hu(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),Kf(t,e,i,r,n);case 3:e:{if($g(e),t===null)throw Error(se(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Mg(t,e),Tl(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Is(Error(se(423)),e),e=qf(t,e,i,n,r);break e}else if(i!==r){r=Is(Error(se(424)),e),e=qf(t,e,i,n,r);break e}else for(xn=$i(e.stateNode.containerInfo.firstChild),Sn=e,xt=!0,Kn=null,n=yg(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ns(),i===r){e=bi(t,e,n);break e}Qt(t,e,i,n)}e=e.child}return e;case 5:return Eg(e),t===null&&Fu(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,Lu(i,r)?a=null:s!==null&&Lu(i,s)&&(e.flags|=32),qg(t,e),Qt(t,e,a,n),e.child;case 6:return t===null&&Fu(e),null;case 13:return Yg(t,e,n);case 4:return Sh(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ls(e,null,i,n):Qt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),Wf(t,e,i,r,n);case 7:return Qt(t,e,e.pendingProps,n),e.child;case 8:return Qt(t,e,e.pendingProps.children,n),e.child;case 12:return Qt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,ft(El,i._currentValue),i._currentValue=a,s!==null)if(Jn(s.value,a)){if(s.children===r.children&&!on.current){e=bi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Mi(-1,n&-n),l.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?l.next=l:(l.next=f.next,f.next=l),u.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Ou(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(se(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),Ou(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}Qt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Es(e,n),r=Un(r),i=i(r),e.flags|=1,Qt(t,e,i,n),e.child;case 14:return i=e.type,r=Wn(i,e.pendingProps),r=Wn(i.type,r),Xf(t,e,i,r,n);case 15:return Xg(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),el(t,e),e.tag=1,ln(i)?(t=!0,yl(e)):t=!1,Es(e,n),Vg(e,i,r),Bu(e,i,r,n),Vu(null,e,i,!0,t,n);case 19:return Zg(t,e,n);case 22:return Kg(t,e,n)}throw Error(se(156,e.tag))};function fv(t,e){return Bm(t,e)}function M0(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Dn(t,e,n,i){return new M0(t,e,n,i)}function kh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function E0(t){if(typeof t=="function")return kh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===th)return 11;if(t===nh)return 14}return 2}function Ji(t,e){var n=t.alternate;return n===null?(n=Dn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function il(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")kh(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case as:return Lr(n.children,r,s,e);case eh:a=8,r|=8;break;case uu:return t=Dn(12,n,e,r|2),t.elementType=uu,t.lanes=s,t;case du:return t=Dn(13,n,e,r),t.elementType=du,t.lanes=s,t;case hu:return t=Dn(19,n,e,r),t.elementType=hu,t.lanes=s,t;case Em:return Zl(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Sm:a=10;break e;case Mm:a=9;break e;case th:a=11;break e;case nh:a=14;break e;case zi:a=16,i=null;break e}throw Error(se(130,t==null?t:typeof t,""))}return e=Dn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Lr(t,e,n,i){return t=Dn(7,t,i,e),t.lanes=n,t}function Zl(t,e,n,i){return t=Dn(22,t,i,e),t.elementType=Em,t.lanes=n,t.stateNode={isHidden:!1},t}function Rc(t,e,n){return t=Dn(6,t,null,e),t.lanes=n,t}function Pc(t,e,n){return e=Dn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function w0(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=uc(0),this.expirationTimes=uc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=uc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Fh(t,e,n,i,r,s,a,o,l){return t=new w0(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Dn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},yh(s),t}function T0(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ss,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function pv(t){if(!t)return ir;t=t._reactInternals;e:{if(jr(t)!==t||t.tag!==1)throw Error(se(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(ln(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(se(171))}if(t.tag===1){var n=t.type;if(ln(n))return pg(t,n,e)}return e}function mv(t,e,n,i,r,s,a,o,l){return t=Fh(n,i,!0,t,r,s,a,o,l),t.context=pv(null),n=t.current,i=Jt(),r=Qi(n),s=Mi(i,r),s.callback=e??null,Yi(n,s,r),t.current.lanes=r,Ga(t,r,i),cn(t,i),t}function Ql(t,e,n,i){var r=e.current,s=Jt(),a=Qi(r);return n=pv(n),e.context===null?e.context=n:e.pendingContext=n,e=Mi(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Yi(r,e,a),t!==null&&(Zn(t,r,a,s),Zo(t,r,a)),a}function Dl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function rp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Oh(t,e){rp(t,e),(t=t.alternate)&&rp(t,e)}function A0(){return null}var gv=typeof reportError=="function"?reportError:function(t){console.error(t)};function zh(t){this._internalRoot=t}Jl.prototype.render=zh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(se(409));Ql(t,e,null,null)};Jl.prototype.unmount=zh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Fr(function(){Ql(null,t,null,null)}),e[Ti]=null}};function Jl(t){this._internalRoot=t}Jl.prototype.unstable_scheduleHydration=function(t){if(t){var e=Km();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ji.length&&e!==0&&e<ji[n].priority;n++);ji.splice(n,0,t),n===0&&$m(t)}};function Bh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function ec(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function sp(){}function b0(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=Dl(a);s.call(u)}}var a=mv(e,i,t,0,null,!1,!1,"",sp);return t._reactRootContainer=a,t[Ti]=a.current,Da(t.nodeType===8?t.parentNode:t),Fr(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var u=Dl(l);o.call(u)}}var l=Fh(t,0,!1,null,null,!1,!1,"",sp);return t._reactRootContainer=l,t[Ti]=l.current,Da(t.nodeType===8?t.parentNode:t),Fr(function(){Ql(e,l,n,i)}),l}function tc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=Dl(a);o.call(l)}}Ql(e,a,t,r)}else a=b0(n,e,t,r,i);return Dl(a)}Wm=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=ha(e.pendingLanes);n!==0&&(sh(e,n|1),cn(e,Tt()),!(Je&6)&&(Us=Tt()+500,lr()))}break;case 13:Fr(function(){var i=Ai(t,1);if(i!==null){var r=Jt();Zn(i,t,1,r)}}),Oh(t,1)}};ah=function(t){if(t.tag===13){var e=Ai(t,134217728);if(e!==null){var n=Jt();Zn(e,t,134217728,n)}Oh(t,134217728)}};Xm=function(t){if(t.tag===13){var e=Qi(t),n=Ai(t,e);if(n!==null){var i=Jt();Zn(n,t,e,i)}Oh(t,e)}};Km=function(){return ot};qm=function(t,e){var n=ot;try{return ot=t,e()}finally{ot=n}};Mu=function(t,e,n){switch(e){case"input":if(mu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Wl(i);if(!r)throw Error(se(90));Tm(i),mu(i,r)}}}break;case"textarea":bm(t,n);break;case"select":e=n.value,e!=null&&xs(t,!!n.multiple,e,!1)}};Im=Dh;Um=Fr;var C0={usingClientEntryPoint:!1,Events:[Xa,us,Wl,Lm,Dm,Dh]},ia={findFiberByHostInstance:Ar,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},R0={bundleType:ia.bundleType,version:ia.version,rendererPackageName:ia.rendererPackageName,rendererConfig:ia.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ri.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Om(t),t===null?null:t.stateNode},findFiberByHostInstance:ia.findFiberByHostInstance||A0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var So=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!So.isDisabled&&So.supportsFiber)try{jl=So.inject(R0),si=So}catch{}}wn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=C0;wn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Bh(e))throw Error(se(200));return T0(t,e,null,n)};wn.createRoot=function(t,e){if(!Bh(t))throw Error(se(299));var n=!1,i="",r=gv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Fh(t,1,!1,null,null,n,!1,i,r),t[Ti]=e.current,Da(t.nodeType===8?t.parentNode:t),new zh(e)};wn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(se(188)):(t=Object.keys(t).join(","),Error(se(268,t)));return t=Om(e),t=t===null?null:t.stateNode,t};wn.flushSync=function(t){return Fr(t)};wn.hydrate=function(t,e,n){if(!ec(e))throw Error(se(200));return tc(null,t,e,!0,n)};wn.hydrateRoot=function(t,e,n){if(!Bh(t))throw Error(se(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=gv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=mv(e,null,t,1,n??null,r,!1,s,a),t[Ti]=e.current,Da(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Jl(e)};wn.render=function(t,e,n){if(!ec(e))throw Error(se(200));return tc(null,t,e,!1,n)};wn.unmountComponentAtNode=function(t){if(!ec(t))throw Error(se(40));return t._reactRootContainer?(Fr(function(){tc(null,null,t,!1,function(){t._reactRootContainer=null,t[Ti]=null})}),!0):!1};wn.unstable_batchedUpdates=Dh;wn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!ec(n))throw Error(se(200));if(t==null||t._reactInternals===void 0)throw Error(se(38));return tc(t,e,n,!1,i)};wn.version="18.3.1-next-f1338f8080-20240426";function vv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vv)}catch(t){console.error(t)}}vv(),vm.exports=wn;var P0=vm.exports,ap=P0;lu.createRoot=ap.createRoot,lu.hydrateRoot=ap.hydrateRoot;const N0=[[/\u200b|\ufeff/g,""],[/\u066e\u06ea/g,"ؠ"],[/\u06cd/g,"ؠ"],[/\u06c5/g,"ۄ"],[/\u065b/g,"ْ"],[/\u0626/g,"یٔ"],[/أ|إ|ٱ/g,"ا"],[/ك/g,"ک"],[/ي|ى/g,"ی"],[/ه|ة/g,"ہ"]];function ks(t){let e=String(t||"").normalize("NFC");for(const[n,i]of N0)e=e.replace(n,i);return e.normalize("NFC")}const nt=t=>String(t||"").normalize("NFC").toLocaleLowerCase().trim(),Ts=t=>ks(nt(t)).normalize("NFD").replace(new RegExp("\\p{M}","gu"),"").replace(/ـ/g,"");function _v(t){const e=new Map;for(const n of t){if(!n.k||!n.e)continue;const i=nt(n.k);e.has(i)||e.set(i,{k:n.k,senses:[],forms:[],arabic:new RegExp("\\p{Script=Arabic}","u").test(n.k),formKeys:new Set});const r=e.get(i),s=`${nt(n.e)}\0${n.context||""}\0${n.p||""}`,a=r.senses.find(o=>o.id===s);a?n.url&&Object.assign(a.row,n):r.senses.push({id:s,row:{...n}});for(const o of n.forms||[]){const l=JSON.stringify(o);r.formKeys.has(l)||(r.forms.push(o),r.formKeys.add(l))}}return[...e.values()].map(n=>{const i=n.senses.map(a=>a.row).sort((a,o)=>+!!o.url-+!!a.url),r=nt(n.k),s=[...new Set(n.forms.map(a=>Ts(a.word)))];return{k:n.k,senses:i,forms:n.forms,arabic:n.arabic,index:{head:r,folded:Ts(n.k),aliases:s,roman:i.map(a=>Ts(a.tr)).filter(Boolean)}}})}function td(t,e,n={}){const i=nt(e),r=Ts(e),s=[];for(const a of t){if(n.script==="arabic"&&!a.arabic||n.script==="roman"&&a.arabic)continue;const o=a.senses.filter(p=>(n.source!=="sourced"||[p,...p.sources||[]].some(h=>h.url))&&(n.pos==="all"||!n.pos||p.p===n.pos));if(!o.length)continue;const l=a.index;let u=20;if(i){if(l.head===i)u=0;else if(l.folded===r)u=1;else if(l.aliases.includes(r))u=2;else if(l.roman.includes(r))u=3;else if(o.some(p=>nt(p.e)===i))u=4;else if(l.head.startsWith(i)||l.folded.startsWith(r)||l.roman.some(p=>p.startsWith(r)))u=5;else if(o.some(p=>nt(p.e).startsWith(i)))u=6;else if(!(l.head.includes(i)||l.folded.includes(r)||l.aliases.some(p=>p.includes(r))||l.roman.some(p=>p.includes(r))||o.some(p=>nt(p.e).includes(i)||nt(p.context).includes(i))))continue}const f=i?[...o].sort((p,h)=>+(nt(h.e)===i)-+(nt(p.e)===i)||Number(nt(h.e).includes(i))-Number(nt(p.e).includes(i))):o;s.push({word:{...a,senses:f},rank:u})}return s.sort((a,o)=>{var l,u,f,p;return a.rank-o.rank||+!!((l=o.word.senses[0])!=null&&l.url)-+!!((u=a.word.senses[0])!=null&&u.url)||(((f=a.word.senses[0])==null?void 0:f.e)||"").localeCompare(((p=o.word.senses[0])==null?void 0:p.e)||"")}),s.map(a=>a.word)}const L0=({currentView:t,onSelectView:e})=>{const[n,i]=fe.useState(null);fe.useEffect(()=>{const s=o=>{o.preventDefault(),i(o)},a=()=>{i(null)};return window.addEventListener("beforeinstallprompt",s),window.addEventListener("appinstalled",a),()=>{window.removeEventListener("beforeinstallprompt",s),window.removeEventListener("appinstalled",a)}},[]);const r=async()=>{n&&(n.prompt(),await n.userChoice,i(null))};return c.jsxs("header",{className:"site-header",children:[c.jsxs("div",{className:"brand",onClick:()=>e("dictionary"),role:"button",tabIndex:0,onKeyDown:s=>{s.key==="Enter"&&e("dictionary")},children:[c.jsx("span",{className:"brand-mark",children:"ک"}),c.jsxs("span",{children:[c.jsx("strong",{children:"Koshur Lughat"}),c.jsx("small",{children:"کٲشُر لُغَتھ"})]})]}),c.jsxs("nav",{"aria-label":"Primary navigation",children:[n&&c.jsx("button",{id:"install-app",className:"nav-link install-app",type:"button",onClick:r,children:"Install app"}),c.jsx("button",{className:`nav-link ${t==="seerah"?"active":""}`,type:"button",onClick:()=>e("seerah"),children:"Seerah"}),c.jsx("button",{className:`nav-link ${t==="dictionary"?"active":""}`,type:"button",onClick:()=>e("dictionary"),children:"Dictionary"}),c.jsx("button",{className:`nav-link ${t==="translator"?"active":""}`,type:"button",onClick:()=>e("translator"),children:"Translator"}),c.jsx("button",{className:`nav-link ${t==="about"?"active":""}`,type:"button",onClick:()=>e("about"),children:"About"}),c.jsx("button",{className:`nav-link ${t==="guide"?"active":""}`,type:"button",onClick:()=>e("guide"),children:"Language guide"}),c.jsx("button",{className:`nav-link ${t==="orthography"?"active":""}`,type:"button",onClick:()=>e("orthography"),children:"Orthography"})]})]})},D0=({totalRecords:t})=>c.jsxs("footer",{children:[c.jsx("span",{children:"کٲشُر لُغَتھ · Koshur Lughat"}),c.jsxs("span",{children:[c.jsx("span",{id:"dictionary-total",children:t>0?t.toLocaleString():"Over 20,000"})," modern records · 20,643 historical entries · Public beta",c.jsx("br",{}),"Core vocabulary: Kashmiri Language Text Dataset",c.jsx("br",{}),"Additional vocabulary:"," ",c.jsx("a",{href:"https://kaikki.org/dictionary/Kashmiri/",target:"_blank",rel:"noopener noreferrer",children:"Wiktionary via Kaikki"})," ","·"," ",c.jsx("a",{href:"https://github.com/izan-majeed/kaeshir-dictionary-data",target:"_blank",rel:"noopener noreferrer",children:"Kaeshir Dictionary"})]})]}),I0=[{native:"پھ",translit:"pʰ"},{native:"تھ",translit:"tʰ"},{native:"ژھ",translit:"ʦʰ"},{native:"چھ",translit:"ʧʰ"},{native:"ٹھ",translit:"ʈʰ"},{native:"کھ",translit:"kʰ"},{native:"نْ",translit:"ñ"},{native:"یٖ",translit:"yˌ"},{native:"وٗ",translit:"w˔"},{native:"وٚ",translit:"wᵉ"},{native:"ۄا",translit:"ɔã"},{native:"پ",translit:"p"},{native:"ب",translit:"b"},{native:"ت",translit:"t"},{native:"ط",translit:"ṫ"},{native:"ژ",translit:"ʦ"},{native:"چ",translit:"ʧ"},{native:"د",translit:"d"},{native:"ج",translit:"ʤ"},{native:"ٹ",translit:"ʈ"},{native:"ڈ",translit:"ɖ"},{native:"ک",translit:"k"},{native:"ق",translit:"ḱ"},{native:"خ",translit:"x"},{native:"گ",translit:"g"},{native:"غ",translit:"ġ"},{native:"ع",translit:"ʔ"},{native:"ف",translit:"f"},{native:"س",translit:"s"},{native:"ث",translit:"ṡ"},{native:"ص",translit:"ś"},{native:"ش",translit:"ʃ"},{native:"ز",translit:"ż"},{native:"ذ",translit:"z"},{native:"ض",translit:"ź"},{native:"ظ",translit:"ẑ"},{native:"ہ",translit:"h"},{native:"ھ",translit:"ʰ"},{native:"ح",translit:"ħ"},{native:"م",translit:"m"},{native:"ن",translit:"n"},{native:"و",translit:"w"},{native:"ؤ",translit:"u͑"},{native:"ر",translit:"r"},{native:"ڑ",translit:"ɽ"},{native:"ل",translit:"l"},{native:"ی",translit:"y"},{native:"ؠ",translit:"ʲ"},{native:"ں",translit:"ñ"},{native:"ِ",translit:"i"},{native:"ٕ",translit:"ɨ"},{native:"ٟ",translit:"ɨ̄"},{native:"ُ",translit:"u"},{native:"ے",translit:"ē"},{native:"ٔ",translit:"ᵊ"},{native:"ٲ",translit:"ə̄"},{native:"ۓ",translit:"ɛ͑"},{native:"ۄ",translit:"ɔ"},{native:"َ",translit:"a"},{native:"ا",translit:"ạ̄"},{native:"آ",translit:"ã"},{native:"ـ",translit:"_"},{native:"-",translit:"-"},{native:"‑",translit:"‑"},{native:"–",translit:"–"},{native:"—",translit:"—"},{native:"،",translit:","},{native:"؛",translit:";"},{native:":",translit:":"},{native:"!",translit:"!"},{native:"؟",translit:"?"},{native:"۔",translit:"."},{native:".",translit:"."},{native:"…",translit:"…"},{native:"(",translit:"("},{native:"[",translit:"["},{native:")",translit:")"},{native:"]",translit:"]"},{native:"ؔ",translit:"{hon}"},{native:"ٓ",translit:"˜"},{native:"ْ",translit:"͞"},{native:"ّ",translit:"˖"},{native:"₹",translit:"¤"},{native:"٪",translit:"%"},{native:"‰",translit:"‰"},{native:"«",translit:"«"},{native:"‹",translit:"‹"},{native:"“",translit:"“"},{native:"‘",translit:"\\‘"},{native:"»",translit:"»"},{native:"›",translit:"›"},{native:"”",translit:"”"},{native:"’",translit:"\\’"},{native:"۰",translit:"0"},{native:"۱",translit:"1"},{native:"۲",translit:"2"},{native:"۳",translit:"3"},{native:"۴",translit:"4"},{native:"۵",translit:"5"},{native:"۶",translit:"6"},{native:"۷",translit:"7"},{native:"۸",translit:"8"},{native:"۹",translit:"9"}],op={ۍ:"y","ٮ":"b",ء:"ʔ",أ:"a",إ:"i",ۂ:"h","ۯ":"ə",ۆ:"w",ئ:"y",ة:"a",ك:"k",ه:"h",ي:"y",ۇ:"u",ە:"a",ې:"e",ڭ:"ng",ى:"y","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9"},U0="َُِٕٖٟٔٚٗ";function Mr(t){const e=ks(t);let n="";for(let i=0;i<e.length;){if(e[i]==="ا"&&U0.includes(e[i+1]||"")){i+=1;continue}const r=I0.find(o=>e.startsWith(o.native,i));if(r){n+=r.translit,i+=r.native.length;continue}const s=e.codePointAt(i);if(s===void 0)break;const a=String.fromCodePoint(s);n+=Object.prototype.hasOwnProperty.call(op,a)?op[a]:a,i+=a.length}return n.replace(/\s+/g," ").replace(/\s+([,;:!?])/g,"$1").trim()}const k0=["ا","ٲ","ب","پ","ت","ٹ","ث","ج","چ","ح","خ","د","ڈ","ذ","ر","ڑ","ز","ژ","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ک","گ","ل","م","ن","و","ہ","ی"],F0=[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"],O0=({words:t,loadingDictionary:e,totalRecords:n})=>{const[i,r]=fe.useState(""),[s,a]=fe.useState({script:"all",source:"all",pos:"all"}),[o,l]=fe.useState(""),[u,f]=fe.useState(""),[p,h]=fe.useState("ks"),[m,x]=fe.useState(12),[S,g]=fe.useState([]),[d,_]=fe.useState([]),[y,E]=fe.useState(null),[R,C]=fe.useState(null),[b,P]=fe.useState(null),[T,w]=fe.useState(null),[N,k]=fe.useState(null),[B,G]=fe.useState(null),[ee,Y]=fe.useState(()=>{try{const M=JSON.parse(localStorage.getItem("koshur-recent")||"[]");return Array.isArray(M)?M.filter(v=>typeof v=="string"):[]}catch{return[]}}),te=fe.useRef(null),D=fe.useCallback(M=>{const v=M.trim();v.length<2||Y(I=>{const z=[v,...I.filter(q=>q!==v)].slice(0,6);try{localStorage.setItem("koshur-recent",JSON.stringify(z))}catch{}return z})},[]),Q=()=>{Y([]);try{localStorage.setItem("koshur-recent","[]")}catch{}};fe.useEffect(()=>{const M=v=>{var I,z,q;v.key==="/"&&!/INPUT|TEXTAREA|SELECT/i.test(((I=document.activeElement)==null?void 0:I.tagName)||"")&&!((z=document.activeElement)!=null&&z.isContentEditable)&&(v.preventDefault(),(q=te.current)==null||q.focus())};return window.addEventListener("keydown",M),()=>window.removeEventListener("keydown",M)},[]);const J=async()=>{if(!S.length){G("historical");try{const M=await fetch("/assets/historical-lexicon.json");if(!M.ok)throw new Error("Historical download failed");const I=(await M.json()).map(z=>({...z,sources:[...z.sources||[],{s:"Original Grierson dictionary scan (1932)",url:"https://archive.org/details/in.ernet.dli.2015.24175",license:"Public domain per Digital Library of India metadata"}]}));g(_v(I))}catch(M){console.error(M)}finally{G(null)}}},he=async()=>{if(!d.length){G("book-ocr");try{const M=await fetch("/assets/koul-book-ocr.json");if(!M.ok)throw new Error("Book OCR failed");const v=await M.json();_(v.pages||[])}catch(M){console.error(M)}finally{G(null)}}},we=async()=>{var M;if(!((M=y==null?void 0:y.pages)!=null&&M.length)){G("school-ocr");try{const v=await fetch("/assets/kashmiri-school-textbooks-ocr.json");if(!v.ok)throw new Error("School OCR failed");E(await v.json())}catch(v){console.error(v)}finally{G(null)}}},qe=async()=>{var M;if(!((M=R==null?void 0:R.pages)!=null&&M.length)){G("kashir-ocr");try{const v=await fetch("/assets/kashir-dictionary-ocr.json");if(!v.ok)throw new Error("Kashir OCR failed");C(await v.json())}catch(v){console.error(v)}finally{G(null)}}},$=async()=>{var M;if(!((M=b==null?void 0:b.pages)!=null&&M.length)){G("reading-ocr");try{const v=await fetch("/assets/kashmiri-reading-ocr.json");if(!v.ok)throw new Error("Reading OCR failed");P(await v.json())}catch(v){console.error(v)}finally{G(null)}}},ae=async()=>{var M;if(!((M=T==null?void 0:T.records)!=null&&M.length)){G("public-corpus");try{const v=await fetch("/assets/kashmiri-public-corpus.json");if(!v.ok)throw new Error("Public corpus failed");w(await v.json())}catch(v){console.error(v)}finally{G(null)}}},_e=async()=>{var M;if(!((M=N==null?void 0:N.records)!=null&&M.length)){G("quran-ocr");try{const v=await fetch("/assets/kashmiri-quran-ocr.json");if(!v.ok)throw new Error("Quran OCR failed");k(await v.json())}catch(v){console.error(v)}finally{G(null)}}},ce=M=>{r(""),f(""),x(12),l(M),a({script:"all",source:"all",pos:"all"}),M==="historical"?J():M==="book-ocr"?he():M==="school-ocr"?we():M==="kashir-ocr"?qe():M==="reading-ocr"?$():M==="public-corpus"?ae():M==="quran-ocr"&&_e()},Ce=M=>{const v=nt(M),I=[];for(const z of d){const q=z.normalizedText||z.text||"",X=nt(q);if(v&&!X.includes(v))continue;const W=v?X.indexOf(v):0,ie=v?Math.max(0,W-190):0,le=q.replace(/\s+/g," ").slice(ie,ie+520).trim();I.push({k:`PDF page ${z.page}`,arabic:!1,forms:[],senses:[{e:le||"(This scanned page contains no OCR text.)",p:"Machine OCR",s:"Koul, Raina & Bhat (2000)",url:`https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul/page/n${z.page-1}/mode/1up`,license:"Rights-holder permission (reported by project owner)"}],index:{head:"",folded:"",aliases:[],roman:[]}})}return I},Ie=M=>{if(!(y!=null&&y.pages))return[];const v=nt(M),I=[];for(const z of y.pages){const q=z.text||"",X=nt(q);if(v&&!X.includes(v))continue;const W=v?X.indexOf(v):0,ie=q.replace(/\s+/g," ").slice(Math.max(0,W-190),Math.max(0,W-190)+520).trim(),le=(y.books||[]).find(Oe=>Oe.id===z.book)||{id:z.book||""};I.push({k:`${le.title||z.book} · PDF page ${z.page}`,arabic:!1,forms:[],senses:[{e:ie||"(This scanned page contains no OCR text.)",ocrTransliteration:Mr(ie),p:`Machine OCR · ${z.grade||""}${z.part?` · ${z.part}`:""}`,s:le.creator||"Open Kashmiri book",url:le.source||"https://archive.org/",license:`${le.license||"Open license"} · OCR requires review`}],index:{head:"",folded:"",aliases:[],roman:[]}})}return I},Fe=M=>{if(!(R!=null&&R.pages))return[];const v=nt(M),I=[];for(const z of R.pages){const q=z.normalizedText||z.text||"",X=nt(q);if(v&&!X.includes(v))continue;const W=v?X.indexOf(v):0,ie=q.replace(/\s+/g," ").slice(Math.max(0,W-190),Math.max(0,W-190)+520).trim(),le=(R.books||[]).find(Oe=>Oe.id===z.book)||{id:z.book||""};I.push({k:`${le.title||z.book} · PDF page ${z.page}`,arabic:!1,forms:[],senses:[{e:ie||"(This scanned page contains no OCR text.)",ocrTransliteration:Mr(ie),p:"Machine OCR · reference dictionary",s:le.creator||"Kashir Dictionary",url:`${le.source||"https://archive.org/"}/page/n${Math.max(0,z.page-1)}/mode/1up`,license:`${le.license||"Source license not stated"} · OCR requires review`}],index:{head:"",folded:"",aliases:[],roman:[]}})}return I},dt=M=>{if(!(b!=null&&b.pages))return[];const v=nt(M),I=[];for(const z of b.pages){const q=z.normalizedText||z.text||"",X=nt(q);if(v&&!X.includes(v))continue;const W=v?X.indexOf(v):0,ie=q.replace(/\s+/g," ").slice(Math.max(0,W-190),Math.max(0,W-190)+520).trim(),le=(b.books||[]).find(Oe=>Oe.id===z.book)||{id:z.book||""};I.push({k:`${le.title||z.book} · PDF page ${z.page}`,arabic:!1,forms:[],senses:[{e:ie||"(This scanned page contains no OCR text.)",ocrTransliteration:Mr(ie),p:`Machine OCR · ${le.category||"reading source"}`,s:le.creator||"Kashmiri reading source",url:`${le.source||"https://archive.org/"}/page/n${Math.max(0,z.page-1)}/mode/1up`,license:`${le.license||"Source license not stated"} · OCR requires review`}],index:{head:"",folded:"",aliases:[],roman:[]}})}return I},We=M=>{if(!(T!=null&&T.records))return[];const v=nt(M),I=[];for(const z of T.records){const q=nt(z.text);v&&!q.includes(v)||I.push({k:z.text,arabic:!0,forms:[],senses:[{e:"Licensed corpus sentence",p:z.dataset,s:z.dataset,url:z.source,license:z.license,x:`Source: ${z.source}`}],index:{head:"",folded:"",aliases:[],roman:[]}})}return I},Ze=M=>{if(!(N!=null&&N.records))return[];const v=nt(M),I=[];for(const z of N.records){const q=z.text||"",X=nt(q);if(v&&!X.includes(v))continue;const W=v?X.indexOf(v):0,ie=q.replace(/\s+/g," ").slice(Math.max(0,W-190),Math.max(0,W-190)+520).trim();I.push({k:`Kashmiri Qur’an translation · PDF page ${z.page}`,arabic:!1,forms:[],senses:[{e:ie||"(No OCR text recognized on this page.)",ocrTransliteration:Mr(ie),p:"Raw machine OCR · verify against scan",s:"Kashmiri translation attributed to Mirwaiz Yusuf Shah",url:z.sourceUrl,license:"Rights-holder public-reuse permission reported by project owner · OCR requires review"}],index:{head:"",folded:"",aliases:[],roman:[]}})}return I},L=fe.useMemo(()=>{const M=i.trim();let v=[];return o==="book-ocr"?v=Ce(M):o==="school-ocr"?v=Ie(M):o==="kashir-ocr"?v=Fe(M):o==="reading-ocr"?v=dt(M):o==="public-corpus"?v=We(M):o==="quran-ocr"?v=Ze(M):o==="historical"?v=td(S,M,s):v=td(t,M,s),o==="calendar"&&(v=v.filter(I=>I.senses.some(z=>z.topic==="calendar"))),u&&(v=v.filter(I=>p==="en"?I.senses.some(z=>nt(z.e).startsWith(nt(u))):Ts(I.k).startsWith(Ts(u)))),!M&&!o&&!u?v.slice(0,12):v},[i,s,o,u,p,t,S,d,y,R,b,T,N]),kt=M=>{M&&M.preventDefault(),D(i)},Be=M=>{var v;r(M),l(""),f(""),x(12),(v=te.current)==null||v.focus(),D(M)},Ve=M=>{r(""),l(""),f(M),x(12)},be=fe.useMemo(()=>o==="historical"?"HISTORICAL ROMANIZED KASHMIRI · GRIERSON":o==="book-ocr"?"MACHINE OCR · 140 SCANNED PAGES":o==="school-ocr"?"MACHINE OCR · OPEN LICENSED KASHMIRI BOOKS":o==="kashir-ocr"?"MACHINE OCR · 2,710 REFERENCE-DICTIONARY PAGES":o==="reading-ocr"?"MACHINE OCR · 2,893 READING AND DICTIONARY PAGES":o==="public-corpus"?"LICENSED CORPUS · 8,336 SENTENCES":o==="quran-ocr"?"SEPARATE RAW OCR CORPUS · 1,694 PAGES":i?"DICTIONARY SEARCH":o||u?"EXPLORE THE DICTIONARY":"START EXPLORING",[o,i,u]),rt=fe.useMemo(()=>B?`Loading ${B}…`:i?`Results for “${i}”`:o==="calendar"?"Days & calendar":o==="historical"?"Historical romanized dictionary":o==="book-ocr"?"Koul book OCR":o==="school-ocr"?"Open Kashmiri books OCR":o==="kashir-ocr"?"Kashir Dictionary · seven-volume OCR":o==="reading-ocr"?"Grammar, textbooks and translations":o==="public-corpus"?"Licensed Kashmiri corpus":o==="quran-ocr"?"Kashmiri Qur’an translation OCR":u?`Words beginning with ${u}`:"Featured words",[i,o,u,B]),Te=["book-ocr","school-ocr","kashir-ocr","reading-ocr","quran-ocr"].includes(o)?"page":o==="public-corpus"?"sentence":"headword";return c.jsxs("section",{id:"dictionary-view",children:[c.jsxs("div",{className:"hero",children:[c.jsx("p",{className:"kashmiri-kicker",lang:"ks-Arab",dir:"rtl",children:"لفظَن ہُنٛد گھر"}),c.jsxs("h1",{children:["Find the word",c.jsx("br",{}),c.jsx("em",{children:"you mean."})]}),c.jsx("p",{className:"hero-copy",children:"A growing Kashmiri–English dictionary, with sourced meanings, pronunciations and word forms. Search Perso-Arabic, romanized Kashmiri or English."}),c.jsx("div",{className:"dictionary-stats",id:"dictionary-stats",children:t.length>0?`${t.length.toLocaleString()} headwords · ${n.toLocaleString()} records · searchable offline`:"Loading dictionary index…"})]}),c.jsxs("section",{className:"search-shell","aria-label":"Dictionary search",children:[c.jsxs("form",{onSubmit:kt,className:"search-row",children:[c.jsx("svg",{"aria-hidden":"true",viewBox:"0 0 24 24",children:c.jsx("path",{d:"m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"})}),c.jsx("input",{ref:te,id:"search-input",type:"search",autoComplete:"off",spellCheck:"false",placeholder:"Search کٲشُر or English…","aria-label":"Search Kashmiri or English",value:i,onChange:M=>{const v=M.target.value;r(v),x(12),["historical","book-ocr","school-ocr","kashir-ocr","reading-ocr","public-corpus","quran-ocr"].includes(o)||(l(""),f(""))},onBlur:()=>D(i)}),c.jsx("kbd",{children:"/"}),i&&c.jsx("button",{id:"clear-button",className:"clear-button",type:"button",onClick:()=>{var M;r(""),x(12),(M=te.current)==null||M.focus()},children:"Clear"})]}),c.jsxs("div",{className:"search-meta",children:[c.jsx("span",{id:"dictionary-status",children:e?"Loading dictionary…":`${t.length.toLocaleString()} searchable headwords`}),c.jsx("span",{children:"Perso-Arabic · English"})]}),c.jsxs("div",{className:"search-filters",children:[c.jsxs("label",{children:["Script"," ",c.jsxs("select",{id:"script-filter",value:s.script,onChange:M=>a(v=>({...v,script:M.target.value})),children:[c.jsx("option",{value:"all",children:"All scripts"}),c.jsx("option",{value:"arabic",children:"Perso-Arabic"}),c.jsx("option",{value:"roman",children:"Romanized"})]})]}),c.jsxs("label",{children:["Source"," ",c.jsxs("select",{id:"source-filter",value:s.source,onChange:M=>a(v=>({...v,source:M.target.value})),children:[c.jsx("option",{value:"all",children:"All sources"}),c.jsx("option",{value:"sourced",children:"Attributed sources"})]})]}),c.jsxs("label",{children:["Grammar"," ",c.jsxs("select",{id:"pos-filter",value:s.pos,onChange:M=>a(v=>({...v,pos:M.target.value})),children:[c.jsx("option",{value:"all",children:"All word types"}),c.jsx("option",{value:"N",children:"Nouns"}),c.jsx("option",{value:"V",children:"Verbs"}),c.jsx("option",{value:"Adj",children:"Adjectives"}),c.jsx("option",{value:"Adv",children:"Adverbs"}),c.jsx("option",{value:"Number",children:"Numbers"})]})]})]})]}),c.jsxs("section",{className:"content-grid",children:[c.jsxs("aside",{children:[c.jsxs("div",{className:"aside-block",children:[c.jsx("button",{id:"browse-calendar",className:`collection-button ${o==="calendar"?"active":""}`,type:"button",onClick:()=>ce("calendar"),children:"Days & calendar"}),c.jsx("button",{id:"browse-historical",className:`collection-button ${o==="historical"?"active":""}`,type:"button",onClick:()=>ce("historical"),children:"Historical romanized lexicon · 20,643 entries"}),c.jsx("button",{id:"browse-koul-ocr",className:`collection-button ${o==="book-ocr"?"active":""}`,type:"button",onClick:()=>ce("book-ocr"),children:"Koul book OCR · 140 scanned pages"}),c.jsx("button",{id:"browse-school-ocr",className:`collection-button ${o==="school-ocr"?"active":""}`,type:"button",onClick:()=>ce("school-ocr"),children:"Open Kashmiri books OCR · 490 pages"}),c.jsx("button",{id:"browse-kashir-ocr",className:`collection-button ${o==="kashir-ocr"?"active":""}`,type:"button",onClick:()=>ce("kashir-ocr"),children:"Kashir Dictionary · 7 volumes / 2,710 pages"}),c.jsx("button",{id:"browse-reading-ocr",className:`collection-button ${o==="reading-ocr"?"active":""}`,type:"button",onClick:()=>ce("reading-ocr"),children:"Grammar, textbooks & dictionaries · 2,813 pages"}),c.jsx("button",{id:"browse-public-corpus",className:`collection-button ${o==="public-corpus"?"active":""}`,type:"button",onClick:()=>ce("public-corpus"),children:"Licensed Kashmiri corpus · 8,336 sentences"}),c.jsx("button",{id:"browse-quran-ocr",className:`collection-button ${o==="quran-ocr"?"active":""}`,type:"button",onClick:()=>ce("quran-ocr"),children:"Kashmiri Qur’an translation OCR · 1,694 pages"}),c.jsx("a",{className:"collection-button book-link",href:"https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul",target:"_blank",rel:"noopener noreferrer",children:"Read Koul’s Kashmiri–English book ↗"}),c.jsx("a",{className:"collection-button book-link",href:"https://dsal.uchicago.edu/dictionaries/grierson/",target:"_blank",rel:"noopener noreferrer",children:"Read Grierson’s Kashmiri dictionary ↗"}),c.jsx("a",{className:"collection-button book-link",href:"https://translate.panlex.org/",target:"_blank",rel:"noopener noreferrer",children:"Open PanLex lexical translator ↗"}),c.jsx("a",{className:"collection-button book-link",href:"https://arxiv.org/abs/2601.01091",target:"_blank",rel:"noopener noreferrer",children:"Read KS-LIT-3M corpus paper ↗"}),c.jsx("a",{className:"collection-button book-link",href:"https://huggingface.co/datasets/Omarrran/Koshur_Pixel",target:"_blank",rel:"noopener noreferrer",children:"Open Koshur Pixel OCR dataset ↗"}),c.jsx("a",{className:"collection-button book-link",href:"https://huggingface.co/datasets/Omarrran/40K_kashmiri_text_and_image_dataset",target:"_blank",rel:"noopener noreferrer",children:"Open 40K Kashmiri OCR dataset ↗"}),c.jsx("a",{className:"collection-button book-link",href:"https://huggingface.co/megaketu555/kashmiri-nastaliq-llm",target:"_blank",rel:"noopener noreferrer",children:"Open Kashmiri Nastaliq LLM ↗"}),c.jsx("a",{className:"collection-button book-link",href:"https://huggingface.co/Omarrran/koshur-diacritizer-byt5-small",target:"_blank",rel:"noopener noreferrer",children:"Open Koshur Diacritizer ↗"}),c.jsx("a",{className:"collection-button book-link",href:"https://github.com/Faizaniqbal52/KoshurOCR",target:"_blank",rel:"noopener noreferrer",children:"Open KoshurOCR framework ↗"}),c.jsx("a",{className:"collection-button book-link",href:"https://github.com/Faizaniqbal52/KoshurAI",target:"_blank",rel:"noopener noreferrer",children:"Open KoshurAI stack ↗"}),c.jsx("a",{className:"collection-button book-link",href:"https://kashmirairesearch.online/resources",target:"_blank",rel:"noopener noreferrer",children:"Open Kashmir AI resource hub ↗"})]}),c.jsxs("div",{className:"aside-block",children:[c.jsx("h2",{children:"Browse by letter"}),c.jsxs("select",{id:"alphabet-select","aria-label":"Browse alphabet",value:p,onChange:M=>{h(M.target.value),f("")},children:[c.jsx("option",{value:"ks",children:"Kashmiri"}),c.jsx("option",{value:"en",children:"English"})]}),c.jsx("div",{id:"letter-list",className:"letter-list",children:(p==="en"?F0:k0).map(M=>c.jsx("button",{type:"button",className:u===M?"active":"",onClick:()=>Ve(M),children:M},M))})]}),ee.length>0&&c.jsxs("div",{className:"aside-block recent-block",children:[c.jsxs("div",{className:"aside-heading",children:[c.jsx("h2",{children:"Recent"}),c.jsx("button",{id:"clear-recent",type:"button",onClick:Q,children:"Clear"})]}),c.jsx("div",{id:"recent-list",className:"recent-list",children:ee.map(M=>c.jsx("button",{type:"button",onClick:()=>Be(M),children:M},M))})]})]}),c.jsxs("section",{className:"results-area","aria-live":"polite",children:[c.jsxs("div",{className:"results-heading",children:[c.jsxs("div",{children:[c.jsx("p",{className:"eyebrow",id:"results-eyebrow",children:be}),c.jsx("h2",{id:"results-title",children:rt})]}),c.jsxs("span",{id:"result-count",children:[L.length.toLocaleString()," ",Te,L.length===1?"":"s"]})]}),c.jsx("div",{id:"results",className:"results-list",children:e?c.jsxs(c.Fragment,{children:[c.jsx("div",{className:"loading-card"}),c.jsx("div",{className:"loading-card"}),c.jsx("div",{className:"loading-card"})]}):L.length===0?c.jsxs("div",{className:"empty-state",children:[c.jsx("strong",{children:"No matching words found"}),c.jsx("span",{children:"Try a shorter spelling, clear your filters, or search the other language."})]}):L.slice(0,m).map((M,v)=>{const I=M.senses.find(W=>W.tr||W.ipa)||M.senses[0]||{},z=I.tr||I.ipa||(M.arabic?"":M.k),q=M.forms.filter(W=>nt(W.word)!==nt(M.k)),X=[...new Set(M.senses.flatMap(W=>[...W.synonyms||[],...W.antonyms||[]]))];return c.jsxs("article",{className:"word-card",children:[c.jsx("div",{className:"headword",children:c.jsx("p",{className:"kashmiri-word",lang:M.arabic?"ks-Arab":"ks-Latn",dir:M.arabic?"rtl":"ltr",children:M.k})}),c.jsxs("div",{children:[z?c.jsxs("p",{className:"word-details pronunciation",children:[z," ",I.tr&&I.ipa?I.ipa:"",I.trGenerated&&c.jsx("span",{className:"generated-label",children:" orthography-derived"})]}):null,M.senses.slice(0,3).map((W,ie)=>{var ye;const le=(ye=W.examples)!=null&&ye.length?W.examples:W.kx?[{k:W.kx,e:W.x||""}]:[],Oe=W.ocrVocabulary?"OCR vocabulary word":W.corpusVocabulary?"Corpus vocabulary word":W.e,re=W.references||[];return c.jsxs("div",{className:"sense",children:[c.jsxs("p",{className:"meaning",children:[Oe," ",W.p&&c.jsx("span",{className:"pos",children:W.p})]}),W.ocrVocabulary&&c.jsx("p",{className:"sense-context",children:"Added from corrected OCR text. The source does not provide an English definition for this word."}),W.corpusVocabulary&&c.jsx("p",{className:"sense-context",children:"Found in a licensed public Kashmiri corpus. The source does not provide an English definition for this word."}),W.fullMeaning&&c.jsxs("details",{className:"historical-entry",children:[c.jsx("summary",{children:"Read full historical entry"}),c.jsx("p",{children:W.fullMeaning})]}),W.context&&c.jsx("p",{className:"sense-context",children:W.context}),W.grammar&&W.grammar.length>0&&c.jsx("p",{className:"word-details",children:W.grammar.join(" · ")}),W.ocrTransliteration&&c.jsxs("p",{className:"ocr-transliteration",children:[W.ocrTransliteration," ",c.jsx("span",{children:"· OCR-derived transliteration"})]}),le.map((xe,Pe)=>c.jsxs("div",{children:[c.jsx("p",{className:"kashmiri-example",lang:"ks-Arab",dir:"rtl",children:xe.k}),c.jsx("p",{className:"example",children:xe.e})]},Pe)),W.romanExample&&c.jsxs("div",{children:[c.jsxs("p",{className:"roman-example",lang:"ks-Latn",children:[W.romanExample.k," ",c.jsx("span",{children:"· romanized Kashmiri"})]}),c.jsx("p",{className:"example",children:W.romanExample.e})]}),!le.length&&!W.romanExample&&W.x&&c.jsx("p",{className:"example",children:W.x}),W.url&&c.jsxs("a",{className:"entry-source",href:W.url,target:"_blank",rel:"noopener noreferrer",children:[W.s||"Source"," ",W.license?`· ${W.license}`:""]}),(W.sources||[]).filter(xe=>xe.url!==W.url).map((xe,Pe)=>c.jsxs("a",{className:"entry-source",href:xe.url,target:"_blank",rel:"noopener noreferrer",children:[xe.s||"Source"," ",xe.license?`· ${xe.license}`:""]},Pe)),re.slice(0,5).map((xe,Pe)=>c.jsxs("a",{className:"entry-source",href:xe.url,target:"_blank",rel:"noopener noreferrer",children:["Checked in ",xe.s]},Pe)),re.length>5&&c.jsxs("details",{className:"ocr-references",children:[c.jsxs("summary",{children:[re.length-5," more OCR occurrences"]}),re.slice(5).map((xe,Pe)=>c.jsxs("a",{className:"entry-source",href:xe.url,target:"_blank",rel:"noopener noreferrer",children:["Checked in ",xe.s]},Pe))]})]},ie)}),M.senses.length>3&&c.jsxs("details",{children:[c.jsxs("summary",{children:[M.senses.length-3," more meanings"]}),M.senses.slice(3).map((W,ie)=>c.jsxs("div",{className:"sense",children:[c.jsxs("p",{className:"meaning",children:[W.e," ",W.p&&c.jsx("span",{className:"pos",children:W.p})]}),W.context&&c.jsx("p",{className:"sense-context",children:W.context})]},ie))]}),q.length>0&&c.jsxs("details",{className:"word-forms",children:[c.jsxs("summary",{children:[new Set(q.map(W=>W.word)).size," inflected / alternate forms"]}),c.jsx("div",{children:q.map((W,ie)=>c.jsxs("p",{children:[c.jsx("button",{type:"button",className:"form-word",lang:"ks-Arab",dir:"rtl",onClick:()=>Be(W.word),children:W.word})," ",c.jsx("span",{className:"form-translit",children:Mr(W.word)})," ",c.jsx("span",{children:(W.tags||[]).join(" · ")})]},ie))})]}),X.length>0&&c.jsxs("details",{children:[c.jsx("summary",{children:"Related words"}),X.map(W=>c.jsx("button",{type:"button",className:"form-word",lang:"ks-Arab",onClick:()=>Be(W),children:W},W))]}),I.etymology&&c.jsxs("details",{children:[c.jsx("summary",{children:"Etymology"}),c.jsx("p",{className:"etymology",children:I.etymology})]})]})]},`${M.k}-${v}`)})}),m<L.length&&c.jsx("button",{id:"load-more",className:"load-more",type:"button",onClick:()=>x(M=>M+20),children:"Show more results"})]})]})]})},z0=[["tch","چ"],["sch","ش"],["sh","ش"],["ch","چ"],["kh","خ"],["gh","غ"],["ph","ف"],["th","تھ"],["dh","دھ"],["ng","نگ"],["qu","کو"],["ck","ک"],["ee","ی"],["oo","و"],["ou","او"],["ow","او"],["ai","ے"],["ay","ے"],["ea","ی"],["ei","ی"],["ie","ی"],["oa","و"],["oi","و"],["oy","و"]],B0={a:"ا",b:"ب",c:"ک",d:"د",e:"ے",f:"ف",g:"گ",h:"ہ",i:"ی",j:"ج",k:"ک",l:"ل",m:"م",n:"ن",o:"و",p:"پ",q:"ق",r:"ر",s:"س",t:"ت",u:"و",v:"و",w:"و",x:"کس",y:"ی",z:"ز"};function j0(t){return String(t||"").replace(/[A-Za-z][A-Za-z'-]*/g,e=>{let n=e.toLowerCase();for(const[i,r]of z0)n=n.replaceAll(i,r);return n=[...n].map(i=>B0[i]||i).join(""),n})}const H0=/[\p{Script=Arabic}\p{M}][\p{Script=Arabic}\p{M}\u200c\u200d'’ʼ-]*/gu,V0=/[A-Za-z][A-Za-z'-]*/g,fn=t=>new Set(t.map(e=>e.normalize("NFC"))),G0=fn(["نہ","نہٕ","نَہ","نَہٕ","نٕہ","نا","مَہ","مت","چھُنہٕ","چُھنہٕ","چھن"]),W0=fn(["کیا","کوٚس","کُس","کَتھ","کوت","کٔتھ","کِتھ","کٔژ","کَمۍ"]),X0=fn(["منٛز","مَنٛز","مَنٛزٕ","منز","پؠٹھ","پؠٹھٕ","سٕتۍ","سٟتؠ","سٲتِہ","نِش","نِشہٕ","کُن","تام","خٲطرٕ","تھٲوُن","تھٲں"]),nd=fn(["چھ","چھُ","چُھ","چھِ","چِھ","چھُو","چھےٚ","چُھس","چُھکھ","چھُنہٕ","چُھنہٕ","چھن","آس","آسِ","آسُن","آسٕن","اوس"]),K0=fn(["مےٚ","تٔمۍ","تِمَو","اَسہِ","تُہۍ"]),q0=fn(["مےٚ","تَس","تِمَن","اَسہِ","تُہۍ"]),$0=fn(["اوس","آس","آسِ","آسٕن"]),Y0=fn(["یُس","یۄس","یِم","یَتھ"]),Z0=fn(["سُہ","تِم","تَتھ","تتھ"]),Q0=fn(["ہُنٛد","ہِنٛز","ہُنٛز","سُنٛد","سٕنٛز"]),J0=fn(["کھۄتہٕ","کھوتہٕ"]),ey=fn(["تہٕ","یا","مگر","لیکِن","بلکہٕ"]),ty=fn(["حَضرت","جَناب","صٲب","صاحِب"]),ny=fn([...nd,"گَو","گٔے","گٔیہِ","آو","آیہِ","کَر","کٔر","وَن","وُن"]),iy=[["یُس",["سُہ"]],["یۄس",["سۄ","سُہ"]],["یِم",["تِم"]],["یَتھ",["تَتھ","تتھ"]]],ry=/[كيىهةأإئ]/u,sy=/[\uFB50-\uFDFF\uFE70-\uFEFF]/u;function ay(t){return[...String(t||"").normalize("NFC").matchAll(H0)].map(e=>e[0])}function oy(t){return[...String(t||"").matchAll(V0)].map(e=>e[0].toLowerCase())}function ly(t){const e=String(t||"").normalize("NFC"),n=ks(t),i=ay(n),r=i.map(k=>k.replace(/[،؛؟۔,.!?]+$/u,"")),s=/[؟?]\s*$/u.test(n)||r.some(k=>W0.has(k)),a=r.some(k=>G0.has(k)),o=r.some(k=>X0.has(k)),l=r.some(k=>nd.has(k)),u=r.some(k=>K0.has(k)),f=r.some(k=>q0.has(k)),p=r.some(k=>$0.has(k)),h=r.at(-1)||"",m=nd.has(h)||/(?:ان|وان|مُت|مِت|وُن|نہٕ)$/u.test(h),x=i.length<3?"short clause":m?"attested verb-final signal":"review predicate position (Kashmiri commonly places it late)",S=r.some(k=>Y0.has(k)),g=r.some(k=>Z0.has(k)),d=r.some(k=>Q0.has(k)),_=r.some(k=>J0.has(k)),y=r.some(k=>ey.has(k)),E=r.some(k=>ty.has(k)),R=r.some(k=>ny.has(k))||r.some(k=>/(?:ان|وان|مُت|مِت|وُن|نہٕ)$/u.test(k)),C=/[A-Za-z]/u.test(e.replace(/https?:\/\/\S+|\S+@\S+/gu,"")),b=[];sy.test(e)&&b.push("Arabic presentation-form character detected; replace it with ordinary Unicode letters"),ry.test(e)&&b.push("non-preferred Arabic/Urdu code-point variant normalized for analysis"),C&&b.push("mixed Latin text detected; verify that it is an intentional name or quotation");const T=[...iy.filter(([k,B])=>r.includes(k)&&!B.some(G=>r.includes(G))).map(([k,B])=>`${k} normally needs its matching ${B.join("/")} correlate in the full construction`),...i.length>=4&&!R?["no clear finite predicate or participial signal detected; review clause completeness"]:[],...E?["honorific expression detected; preserve respectful pronoun and agreement choices"]:[]],w=[x,a?"negative polarity":"affirmative polarity",s?"question construction":"statement construction",o?"check case and postposition":"check case marking",l?"check copula/auxiliary agreement":"check TAM and verb agreement",p?"past auxiliary detected; check transitivity, ergative case and agreement":u?"possible ergative-shaped pronoun; apply ergative analysis only in a perfective transitive clause":"no clear ergative-past signal",f?"check dative subject/object interpretation":"no clear dative-pronoun signal",S&&!g?"relative form detected; check its matching main-clause correlate":S?"relative–correlative construction detected":"no relative–correlative signal",d?"check genitive agreement with the possessed noun":"no clear agreeing-genitive signal",_?"comparative standard marker detected; check the comparison phrase":"no clear comparative marker",y?"coordination detected; check shared case and agreement":"no coordination signal"],N=[...b,...T];return{normalized:n,tokens:i,question:s,negative:a,wordOrder:x,ergativeAgent:u,dativeCandidate:f,hasRelative:S,hasCorrelative:g,hasGenitive:d,hasComparative:_,hasConjunction:y,hasHonorific:E,encodingWarnings:b,grammarWarnings:T,checks:w,summary:`Kashmiri grammar pass: ${w.join(" · ")}${N.length?` · Review: ${N.join(" · ")}.`:"."}`}}function cy(t){const e=oy(t),n=/[?]\s*$/u.test(String(t||""))||/^(who|what|when|where|why|how|is|are|am|was|were|do|does|did|can|could|will|would|should)\b/i.test(String(t||"").trim()),i=e.some(h=>["not","n't","no","never","neither"].includes(h)),r=e.some(h=>/ed$/u.test(h)||["made","said","saw","heard","read","wrote","gave","took","did","married","left","went","came","ate","drank","spoke"].includes(h)),s=e.some(h=>["will","shall"].includes(h))?"future":e.some(h=>["was","were","did","had"].includes(h))||r?"past":"present/unspecified",a=s==="past"&&e.some(h=>["made","said","saw","heard","read","wrote","gave","took","did","married","left"].includes(h)),o=e.some(h=>["my","your","his","her","its","our","their","whose"].includes(h))||/\b[A-Za-z]+['’]s\b/u.test(String(t||"")),l=e.some(h=>["who","whom","whose","which","that"].includes(h)),u=e.find(h=>["can","could","may","might","must","should","would"].includes(h)),f=e.some(h=>["and","or","but"].includes(h)),p=[n?"question":"statement",i?"negative polarity":"affirmative polarity",`${s} meaning`,a?"check Kashmiri ergative past and object agreement":"check Kashmiri case/agreement after generation",o?"choose a Kashmiri genitive agreeing with the possessed noun":"no explicit possessive signal",l?"build a Kashmiri relative–correlative construction where required":"no relative-clause signal",u?`preserve ${u} modality rather than translating it as tense`:"no modal signal",f?"check case and agreement across coordinated phrases":"no coordination signal"];return{tokens:e,question:n,negative:i,tense:s,transitivePast:a,possessive:o,relative:l,modal:u,coordination:f,checks:p,summary:`English grammar pass: ${p.join(" · ")}.`}}function Mo(t,e){return e==="ks-en"?ly(t):cy(t)}function uy(t,e,n){let i=n==="en-ks"?ks(t):String(t||"").trim();return(n==="en-ks"?/[?]\s*$/u.test(String(e||"")):/[؟?]\s*$/u.test(String(e||"")))&&(i=i.replace(/[.!؟?۔]+\s*$/u,"").trim()+(n==="en-ks"?"؟":"?")),i}const dy=/[^\p{L}\p{N}\p{M}]+/gu;function vs(t){return String(t||"").normalize("NFC").toLocaleLowerCase().replace(dy," ").replace(/\s+/g," ").trim()}function Il(t){return vs(t).split(" ").filter(Boolean)}function hy(t,e){if(t===e)return 0;if(!t.length)return e.length;if(!e.length)return t.length;let n=Array.from({length:e.length+1},(i,r)=>r);for(let i=1;i<=t.length;i+=1){const r=[i];for(let s=1;s<=e.length;s+=1)r[s]=Math.min(r[s-1]+1,n[s]+1,n[s-1]+(t[i-1]===e[s-1]?0:1));n=r}return n[e.length]}function fy(t,e){const n=Il(t),i=Il(e);if(!n.length||!i.length)return 0;const r=new Set;let s=0;for(const l of n){let u=-1,f=0;i.forEach((p,h)=>{if(r.has(h))return;const x=1-hy(l,p)/Math.max(l.length,p.length,1);x>f&&(f=x,u=h)}),u>=0&&f>=.72&&(r.add(u),s+=f)}const a=2*s/(n.length+i.length),o=Math.min(n.length,i.length)/Math.max(n.length,i.length);return a*o}function py(t=[],e=[]){const n=[...t].sort((s,a)=>+(a.humanReview==="approved-by-project-owner")-+(s.humanReview==="approved-by-project-owner")),i={"en-ks":new Map,"ks-en":new Map};for(const s of n){const a=vs(s.english),o=vs(s.kashmiri);i["en-ks"].has(a)||i["en-ks"].set(a,s),i["ks-en"].has(o)||i["ks-en"].set(o,s)}const r={"en-ks":new Map,"ks-en":new Map};for(const s of e){const a=vs(s.english),o=vs(s.kashmiri);a&&!r["en-ks"].has(a)&&r["en-ks"].set(a,s),o&&!r["ks-en"].has(o)&&r["ks-en"].set(o,s)}return{pairs:n,indexes:i,lexical:r}}function my(t,e,n,i=.91){const r=vs(e),s=t.indexes[n].get(r)||t.lexical[n].get(r);if(s)return{kind:"exact",pair:s,confidence:s.humanReview==="approved-by-project-owner"?1:.97,output:n==="en-ks"?s.kashmiri:s.english};if(Il(e).length<3)return;let a,o=0;for(const l of t.pairs){const u=n==="en-ks"?l.english:l.kashmiri,f=fy(e,u),p=l.humanReview==="approved-by-project-owner"?.01:0;f+p>o&&(o=f+p,a=l)}if(!(!a||o<i))return{kind:"close",pair:a,confidence:Math.min(.96,o),source:n==="en-ks"?a.english:a.kashmiri,output:n==="en-ks"?a.kashmiri:a.english}}function gy(t,e,n){const i=Il(e);if(!i.length)return;const r=[],s=[];for(const o of i){const l=t.lexical[n].get(o);if(!l){s.push(o),r.push(o);continue}r.push(n==="en-ks"?l.kashmiri:l.english)}const a=i.length-s.length;return{output:r.join(" "),coverage:a/i.length,unresolved:s}}function vy(t){return t.humanReview==="approved-by-project-owner"?"Owner-approved project review":"Community-reviewed corpus entry"}const lp="https://sameer0313-koshur-lughat.hf.space",_y="Xenova/nllb-200-distilled-600M";let ra=null,id=!1;function Eo(){return id}async function rd(t){return ra||(t&&t("Loading offline model…"),ra=new Function("url","return import(url)")("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.2").then(async({pipeline:n,env:i})=>{i.useBrowserCache=!0,i.allowRemoteModels=!0;const r=await n("translation",_y,{dtype:"q4",progress_callback:s=>{(s==null?void 0:s.status)==="progress"&&Number.isFinite(s.progress)?t&&t(`Downloading offline model… ${Math.round(s.progress)}%`):(s==null?void 0:s.status)==="initiate"&&t&&t("Preparing offline model…")}});return id=!0,t&&t("Offline model ready on this device"),r}).catch(n=>{throw ra=null,id=!1,t&&t("Offline model could not be loaded"),n}),ra)}async function xy(t,e,n){var o;const a=await(await rd(n))(t,{src_lang:e==="ks-en"?"kas_Arab":"eng_Latn",tgt_lang:e==="ks-en"?"eng_Latn":"kas_Arab"});return((o=a==null?void 0:a[0])==null?void 0:o.translation_text)||""}async function yy(t,e,n,i){var h,m;const r=typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random()}`,s=e==="ks-en"?"Kashmiri → English":"English → Kashmiri",a=await fetch(`${lp}/gradio_api/queue/join`,{method:"POST",headers:{"Content-Type":"application/json"},signal:n,body:JSON.stringify({data:[t,s],fn_index:0,session_hash:r})});if(!a.ok)throw new Error(`Server queue rejected the request (${a.status}).`);const{event_id:o}=await a.json(),l=await fetch(`${lp}/gradio_api/queue/data?session_hash=${encodeURIComponent(r)}`,{signal:n,headers:{Accept:"text/event-stream"}});if(!l.ok||!l.body)throw new Error(`Server stream unavailable (${l.status}).`);const u=l.body.getReader(),f=new TextDecoder;let p="";for(;;){const x=await u.read();if(x.done)break;p+=f.decode(x.value,{stream:!0});const S=p.split(`

`);p=S.pop()||"";for(const g of S){const d=g.split(`
`).find(y=>y.startsWith("data: "));if(!d)continue;const _=JSON.parse(d.slice(6));if(!(_.event_id&&_.event_id!==o)){if(_.msg==="process_starts"&&i&&i("Server model is translating…"),_.msg==="process_completed"){if(!_.success||(h=_.output)!=null&&h.error)throw new Error(((m=_.output)==null?void 0:m.error)||"The server could not complete this translation.");return _.output.data}if(_.msg==="close_stream")break}}}throw new Error("The server closed the translation stream before returning a result.")}const wo="https://gaash-lab-matcha-tts-kashmiri-demo.hf.space";async function Sy(t,e="Kore",n="Professional studio narrator, warm, clear, studio acoustics",i){const r=await fetch("/api/gemini-tts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t,voice:e,style:n}),signal:i});if(!r.ok){const a=await r.json().catch(()=>({}));throw new Error(a.error||`Studio voice request failed (${r.status})`)}const s=await r.json();return{processedText:t,audioUrl:s.audioUrl,engine:"gemini",voice:e}}async function cp(t,e="Female",n="High",i){var p,h;const r=typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random()}`,s=await fetch(`${wo}/gradio_api/queue/join`,{method:"POST",headers:{"Content-Type":"application/json"},signal:i,body:JSON.stringify({data:[t,!1,e,n],fn_index:0,session_hash:r})});if(!s.ok)throw new Error(`Speech server rejected the request (${s.status}).`);const{event_id:a}=await s.json(),o=await fetch(`${wo}/gradio_api/queue/data?session_hash=${encodeURIComponent(r)}`,{signal:i,headers:{Accept:"text/event-stream"}});if(!o.ok||!o.body)throw new Error(`Speech stream unavailable (${o.status}).`);const l=o.body.getReader(),u=new TextDecoder;let f="";for(;;){const m=await l.read();if(m.done)break;f+=u.decode(m.value,{stream:!0});const x=f.split(`

`);f=x.pop()||"";for(const S of x){const g=S.split(`
`).find(_=>_.startsWith("data: "));if(!g)continue;const d=JSON.parse(g.slice(6));if(!(d.event_id&&d.event_id!==a)&&d.msg==="process_completed"){if(!d.success||(p=d.output)!=null&&p.error)throw new Error(((h=d.output)==null?void 0:h.error)||"Speech generation failed.");const[_,y]=d.output.data||[],E=typeof y=="string"?y:y==null?void 0:y.url;if(!E&&!(y!=null&&y.path))throw new Error("The speech model returned no audio file.");return{processedText:_,audioUrl:E?new URL(E,wo).href:`${wo}/gradio_api/file=${encodeURIComponent(y.path)}`,engine:"bolbosh",voice:e}}}}throw new Error("The speech stream closed before returning audio.")}const Er={broadcast:{name:"broadcast",label:"Studio Master (Broadcast)",description:"Crisp presence, warm chest resonance, subtle studio booth acoustics, and leveled dynamics.",highpassFreq:85,warmthGain:2.5,boxinessCut:-2.8,presenceGain:3.8,airGain:3,deEsserGain:-2,saturationAmount:.12,compressorThreshold:-20,compressorRatio:4,reverbMix:.06,masterGain:1.3},"warm-radio":{name:"warm-radio",label:"Warm Radio Host",description:"Deep low-end authority, velvety smooth treble, and punchy vocal compression.",highpassFreq:75,warmthGain:4.5,boxinessCut:-1.5,presenceGain:2,airGain:1.5,deEsserGain:-3,saturationAmount:.22,compressorThreshold:-24,compressorRatio:5,reverbMix:.08,masterGain:1.35},"crisp-learning":{name:"crisp-learning",label:"Crisp Articulation (Learner Mode)",description:"Maximum consonant clarity and vocal intelligibility; ideal for studying Kashmiri pronunciation.",highpassFreq:110,warmthGain:.5,boxinessCut:-4,presenceGain:5,airGain:4,deEsserGain:-1,saturationAmount:.05,compressorThreshold:-18,compressorRatio:3.5,reverbMix:.03,masterGain:1.25},"natural-booth":{name:"natural-booth",label:"Natural Acoustic Booth",description:"Transparent leveling with clean low-end rolloff and acoustic room presence.",highpassFreq:80,warmthGain:1,boxinessCut:-1,presenceGain:1.5,airGain:1.5,deEsserGain:-1,saturationAmount:.04,compressorThreshold:-15,compressorRatio:2.5,reverbMix:.05,masterGain:1.15},bypass:{name:"bypass",label:"Raw Model Output (Bypass)",description:"Original unmastered audio directly from the TTS neural network.",highpassFreq:20,warmthGain:0,boxinessCut:0,presenceGain:0,airGain:0,deEsserGain:0,saturationAmount:0,compressorThreshold:-50,compressorRatio:1,reverbMix:0,masterGain:1}};class My{constructor(){Nt(this,"ctx",null);Nt(this,"sourceNode",null);Nt(this,"analyser",null);Nt(this,"currentElement",null);Nt(this,"highpassNode",null);Nt(this,"warmthNode",null);Nt(this,"boxinessNode",null);Nt(this,"presenceNode",null);Nt(this,"deEsserNode",null);Nt(this,"airNode",null);Nt(this,"saturatorNode",null);Nt(this,"compressorNode",null);Nt(this,"dryGainNode",null);Nt(this,"wetGainNode",null);Nt(this,"convolverNode",null);Nt(this,"masterGainNode",null);Nt(this,"currentPreset",Er.broadcast);Nt(this,"isEngineActive",!0)}init(e){if(this.currentElement===e&&this.ctx)return;this.currentElement=e;const n=window.AudioContext||window.webkitAudioContext;if(n){if(this.ctx||(this.ctx=new n),this.ctx.state==="suspended"){const i=()=>{var r;(r=this.ctx)==null||r.resume(),window.removeEventListener("click",i),window.removeEventListener("keydown",i)};window.addEventListener("click",i),window.addEventListener("keydown",i)}try{this.buildRack(e)}catch(i){console.warn("Web Audio Studio Rack initialization note:",i)}}}buildRack(e){this.ctx&&(this.sourceNode||(this.sourceNode=this.ctx.createMediaElementSource(e)),this.highpassNode=this.ctx.createBiquadFilter(),this.highpassNode.type="highpass",this.highpassNode.frequency.value=this.currentPreset.highpassFreq,this.highpassNode.Q.value=.707,this.warmthNode=this.ctx.createBiquadFilter(),this.warmthNode.type="peaking",this.warmthNode.frequency.value=220,this.warmthNode.Q.value=1,this.warmthNode.gain.value=this.currentPreset.warmthGain,this.boxinessNode=this.ctx.createBiquadFilter(),this.boxinessNode.type="peaking",this.boxinessNode.frequency.value=500,this.boxinessNode.Q.value=1.4,this.boxinessNode.gain.value=this.currentPreset.boxinessCut,this.presenceNode=this.ctx.createBiquadFilter(),this.presenceNode.type="peaking",this.presenceNode.frequency.value=3400,this.presenceNode.Q.value=1.2,this.presenceNode.gain.value=this.currentPreset.presenceGain,this.deEsserNode=this.ctx.createBiquadFilter(),this.deEsserNode.type="peaking",this.deEsserNode.frequency.value=7200,this.deEsserNode.Q.value=2,this.deEsserNode.gain.value=this.currentPreset.deEsserGain,this.airNode=this.ctx.createBiquadFilter(),this.airNode.type="highshelf",this.airNode.frequency.value=10500,this.airNode.gain.value=this.currentPreset.airGain,this.saturatorNode=this.ctx.createWaveShaper(),this.saturatorNode.curve=this.generateSaturationCurve(this.currentPreset.saturationAmount),this.saturatorNode.oversample="4x",this.compressorNode=this.ctx.createDynamicsCompressor(),this.compressorNode.threshold.value=this.currentPreset.compressorThreshold,this.compressorNode.knee.value=8,this.compressorNode.ratio.value=this.currentPreset.compressorRatio,this.compressorNode.attack.value=.003,this.compressorNode.release.value=.15,this.convolverNode=this.ctx.createConvolver(),this.convolverNode.buffer=this.generateStudioImpulseResponse(this.ctx),this.dryGainNode=this.ctx.createGain(),this.dryGainNode.gain.value=1-this.currentPreset.reverbMix,this.wetGainNode=this.ctx.createGain(),this.wetGainNode.gain.value=this.currentPreset.reverbMix,this.masterGainNode=this.ctx.createGain(),this.masterGainNode.gain.value=this.currentPreset.masterGain,this.analyser=this.ctx.createAnalyser(),this.analyser.fftSize=256,this.analyser.smoothingTimeConstant=.8,this.sourceNode.connect(this.highpassNode),this.highpassNode.connect(this.warmthNode),this.warmthNode.connect(this.boxinessNode),this.boxinessNode.connect(this.presenceNode),this.presenceNode.connect(this.deEsserNode),this.deEsserNode.connect(this.airNode),this.airNode.connect(this.saturatorNode),this.saturatorNode.connect(this.compressorNode),this.compressorNode.connect(this.dryGainNode),this.compressorNode.connect(this.convolverNode),this.convolverNode.connect(this.wetGainNode),this.dryGainNode.connect(this.masterGainNode),this.wetGainNode.connect(this.masterGainNode),this.masterGainNode.connect(this.analyser),this.analyser.connect(this.ctx.destination))}generateSaturationCurve(e){const n=e*10,i=4096,r=new Float32Array(i),s=Math.PI/180;for(let a=0;a<i;++a){const o=a*2/i-1;n===0?r[a]=o:r[a]=(3+n)*o*20*s/(Math.PI+n*Math.abs(o))}return r}generateStudioImpulseResponse(e){const n=e.sampleRate,r=n*.12,s=2.4,a=e.createBuffer(2,r,n),o=a.getChannelData(0),l=a.getChannelData(1);for(let u=0;u<r;u++){const f=(Math.random()*2-1)*Math.pow(1-u/r,s);o[u]=f,l[u]=(Math.random()*2-1)*Math.pow(1-u/r,s)}return a}setPreset(e){const n=Er[e]||Er.broadcast;this.currentPreset=n,this.ctx&&(this.highpassNode&&(this.highpassNode.frequency.value=n.highpassFreq),this.warmthNode&&(this.warmthNode.gain.value=n.warmthGain),this.boxinessNode&&(this.boxinessNode.gain.value=n.boxinessCut),this.presenceNode&&(this.presenceNode.gain.value=n.presenceGain),this.deEsserNode&&(this.deEsserNode.gain.value=n.deEsserGain),this.airNode&&(this.airNode.gain.value=n.airGain),this.saturatorNode&&(this.saturatorNode.curve=this.generateSaturationCurve(n.saturationAmount)),this.compressorNode&&(this.compressorNode.threshold.value=n.compressorThreshold,this.compressorNode.ratio.value=n.compressorRatio),this.dryGainNode&&(this.dryGainNode.gain.value=1-n.reverbMix),this.wetGainNode&&(this.wetGainNode.gain.value=n.reverbMix),this.masterGainNode&&(this.masterGainNode.gain.value=n.masterGain))}getAnalyser(){return this.analyser}resumeContext(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}async renderMasteredWav(e,n="broadcast"){const i=Er[n]||Er.broadcast,s=await(await fetch(e)).arrayBuffer(),o=await new(window.OfflineAudioContext||window.webkitOfflineAudioContext)(2,44100*30,44100).decodeAudioData(s),l=new(window.OfflineAudioContext||window.webkitOfflineAudioContext)(o.numberOfChannels,o.length,o.sampleRate),u=l.createBufferSource();u.buffer=o;const f=l.createBiquadFilter();f.type="highpass",f.frequency.value=i.highpassFreq;const p=l.createBiquadFilter();p.type="peaking",p.frequency.value=220,p.gain.value=i.warmthGain;const h=l.createBiquadFilter();h.type="peaking",h.frequency.value=3400,h.gain.value=i.presenceGain;const m=l.createBiquadFilter();m.type="highshelf",m.frequency.value=10500,m.gain.value=i.airGain;const x=l.createDynamicsCompressor();x.threshold.value=i.compressorThreshold,x.ratio.value=i.compressorRatio,x.attack.value=.003,x.release.value=.15;const S=l.createGain();S.gain.value=i.masterGain,u.connect(f),f.connect(p),p.connect(h),h.connect(m),m.connect(x),x.connect(S),S.connect(l.destination),u.start(0);const g=await l.startRendering();return this.audioBufferToWav(g)}audioBufferToWav(e){const n=e.numberOfChannels,i=e.sampleRate,r=1,s=16,a=s/8,o=n*a,l=e.length,u=l*o,f=44+u,p=new ArrayBuffer(f),h=new DataView(p);this.writeString(h,0,"RIFF"),h.setUint32(4,36+u,!0),this.writeString(h,8,"WAVE"),this.writeString(h,12,"fmt "),h.setUint32(16,16,!0),h.setUint16(20,r,!0),h.setUint16(22,n,!0),h.setUint32(24,i,!0),h.setUint32(28,i*o,!0),h.setUint16(32,o,!0),h.setUint16(34,s,!0),this.writeString(h,36,"data"),h.setUint32(40,u,!0);const m=[];for(let S=0;S<n;S++)m.push(e.getChannelData(S));let x=44;for(let S=0;S<l;S++)for(let g=0;g<n;g++){let d=m[g][S];d=Math.max(-1,Math.min(1,d)),h.setInt16(x,d<0?d*32768:d*32767,!0),x+=2}return new Blob([h],{type:"audio/wav"})}writeString(e,n,i){for(let r=0;r<i.length;r++)e.setUint8(n+r,i.charCodeAt(r))}}const dr=new My,Nc="Online mode sends text to the public translator. Offline mode downloads a quantized NLLB-200 model once, then runs on this device. The model is large and translation may be slower on phones; review important text with a fluent speaker.",Ey=({words:t,englishTokens:e})=>{const[n,i]=fe.useState("ks-en"),[r,s]=fe.useState(""),[a,o]=fe.useState(""),[l,u]=fe.useState(!1),[f,p]=fe.useState(!0),[h,m]=fe.useState("Ready"),[x,S]=fe.useState(!1),[g,d]=fe.useState("Not downloaded · first download is large"),[_,y]=fe.useState(!1),[E,R]=fe.useState("Grammar-aware checks will appear as you type."),[C,b]=fe.useState("Dictionary and corpus matches will appear with the server result."),[P,T]=fe.useState(Nc),[w,N]=fe.useState("Copy"),[k,B]=fe.useState(null),[G,ee]=fe.useState(null),[Y,te]=fe.useState(!1),[D,Q]=fe.useState(!1),[J,he]=fe.useState("bolbosh"),[we,qe]=fe.useState("Kore"),[$,ae]=fe.useState("Female"),[_e,ce]=fe.useState("High"),[Ce,Ie]=fe.useState("broadcast"),[Fe,dt]=fe.useState(1),[We,Ze]=fe.useState("Bolbosh Voice Studio ready. High-ODE solver and broadcast DSP rack active."),[L,kt]=fe.useState(null),[Be,Ve]=fe.useState(!1),[be,rt]=fe.useState(!1),Te=fe.useRef(null),M=fe.useRef(null),v=fe.useRef(null),I=fe.useRef(null),z=fe.useRef(null),q=fe.useRef(null),X=fe.useRef(null),W=fe.useRef(null),ie=fe.useCallback(async()=>{if(q.current)return q.current;try{const[Z,de]=await Promise.all([fetch("/assets/kashmiri-reviewed-training-data.json").then(Xe=>Xe.ok?Xe.json():{pairs:[],lexicon:[]}),fetch("/assets/hybrid-translation-index.json").then(Xe=>Xe.ok?Xe.json():{pairs:[]})]),Le=[...de.pairs||[],...Z.pairs||[]],Re=py(Le,Z.lexicon||[]);return q.current=Re,Re}catch(Z){return console.warn("Could not load translation memory:",Z),null}},[]);fe.useEffect(()=>{const Z=r.trim();R(Z?Mo(Z,n).summary:"Grammar-aware checks will appear as you type.")},[r,n]);const le=(()=>{const Z=r.trim();if(!Z)return"Dictionary matches will appear as you type.";if(!t.length)return"Loading dictionary matches…";const de=n==="en-ks"?/[A-Za-z][A-Za-z'-]*/g:/[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff][\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\u064b-\u065f\u0670\u200c\u200d'’ʼ-]*/g,Le=[],Re=new Set;for(const Xe of Z.matchAll(de)){const Ge=Xe[0].replace(/[،؛؟.!؟,;:]+$/,"");if(!Ge||Re.has(Ge.toLowerCase()))continue;const ht=td(t,Ge,{script:n==="en-ks"?"arabic":"all"})[0];if(!ht)continue;const pt=ht.senses.find(mt=>mt.e&&!mt.e.startsWith("OCR vocabulary")&&!mt.e.startsWith("Corpus vocabulary"))||ht.senses[0];if(Le.push(n==="en-ks"?`${Ge} → ${ht.k}`:`${ht.k} → ${(pt==null?void 0:pt.e)||"corpus vocabulary"}`),Re.add(Ge.toLowerCase()),Le.length>=8)break}return Le.length?Le.join(" · "):"No direct dictionary match yet; the server model will still process this sentence."})(),Oe=(Z,de)=>{if(n!=="en-ks")return{text:de,words:[]};const Le=[...Z.matchAll(/\b[A-Za-z][A-Za-z'-]{2,}\b/g)].map(Ge=>Ge[0]).filter((Ge,ht,pt)=>{const mt=Ge.toLowerCase().replace(/^['-]|['-]$/g,"");return mt&&!e.has(mt)&&pt.findIndex(Fn=>Fn.toLowerCase()===Ge.toLowerCase())===ht});let Re=de;const Xe=[];for(const Ge of Le){const ht=j0(Ge),pt=Ge.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),mt=new RegExp(`\\b${pt}\\b`,"i");mt.test(Re)?Re=Re.replace(mt,ht):Re.includes(ht)||Xe.push(`${ht} (${Ge})`)}return Xe.length&&(Re=`${Re} · ${Xe.join(" · ")}`),{text:Re,words:Le}},re=fe.useCallback(async(Z=!1)=>{var Re,Xe;const de=r.trim();if(!de)return;if(n==="ks-en"&&!new RegExp("\\p{Script=Arabic}","u").test(de)){T("For Kashmiri → English, enter Perso-Arabic Kashmiri. Romanized sentence translation is not supported by this model.");return}u(!0),m(Z?"Translating…":"Sending…"),T("Sending your sentence to the server…");const Le=new AbortController;I.current=Le;try{const Ge=await ie();if(Ge){const On=my(Ge,de,n);if(On){const zn=On.pair,to=On.output;o(to),u(!1),m("Ready"),R(Mo(de,n).summary);const no=((Re=zn.source)==null?void 0:Re.name)||"reviewed project memory",io=(Xe=zn.source)!=null&&Xe.license?` · ${zn.source.license}`:"";b(`${zn.headword||"Sentence memory"} · ${zn.partOfSpeech||"parallel example"} · ${no}`),T(On.kind==="exact"?`${vy(zn)} exact match · confidence ${Math.round(On.confidence*100)}%${io}.`:`Close reviewed-memory match · confidence ${Math.round(On.confidence*100)}% · interpreted as “${On.source}”. Check that this matches your intended sentence${io}.`);return}}let ht="",pt="",mt="",Fn="",Ni="";x?(Eo()||await rd(d),ht=await xy(de,n,d),Fn=Mo(de,n).summary,Ni="Offline model result. Dictionary matches remain available on this device."):[ht,pt,mt,Fn,Ni]=await yy(de,n,Le.signal,T);const cr=uy(ht,de,n),pn=Oe(de,cr);o(pn.text),R(Fn||Mo(de,n).summary),b(Ni||"No exact dictionary entry found; the neural model supplied the translation."),T(`${x?"Offline model: NLLB-200 600M.":"Server model: NLLB-200 600M."} ${pn.words.length?`Unknown English words were rendered in Kashmiri script: ${pn.words.join(", ")}. `:""}Automatic translation—check grammar, names and meaning with a fluent speaker.`)}catch(Ge){if(Ge.name==="AbortError")T("The server request timed out or was stopped. Try again.");else{const ht=await ie().catch(()=>null),pt=ht?gy(ht,de,n):null;pt?(o(pt.output),b(`${Math.round(pt.coverage*100)}% direct lexical coverage${pt.unresolved.length?` · unresolved: ${pt.unresolved.join(", ")}`:""}`),T("Server unavailable. This is a dictionary-assisted word draft, not a grammatical sentence translation; have a fluent speaker review it.")):(o(""),T(Ge.message||"The server translation failed."))}}finally{I.current=null,u(!1),m("Ready")}},[r,n,x,e,ie]);fe.useEffect(()=>{if(clearTimeout(z.current),!f||l)return;if(r.trim().length<3){m("Ready");return}return m("Waiting…"),z.current=setTimeout(()=>{re(!0)},1400),()=>clearTimeout(z.current)},[r,f,n]);const ye=()=>{clearTimeout(z.current),I.current&&(I.current.abort(),I.current=null),u(!1),m("Ready"),T("Stopped. The server request was cancelled.")},xe=()=>{if(l)return;i(n==="ks-en"?"en-ks":"ks-en"),s(a),o(""),b("Dictionary and corpus matches will appear with the server result."),T(Nc),m("Ready")},Pe=async()=>{if(a)try{await navigator.clipboard.writeText(a),N("Copied"),setTimeout(()=>N("Copy"),1400)}catch{T("Clipboard unavailable. Select and copy the translation manually.")}},Me=async()=>{y(!0);try{await rd(d),T("Offline model ready. Turn on “Use offline model” to translate without a server.")}catch{T("The offline model could not be downloaded. Check storage and connection, then try again.")}finally{y(!1)}},$e=Z=>{const de=new Set(["تہٕ","چھ","چھُ","چھِ","یہ","یِم","سُہ","تِم","مےٚ","کیا","ایک","اور","ہے","کے","کی"]);return[...new Set((String(Z||"").match(/[\p{Script=Arabic}\p{M}]{3,}/gu)||[]).map(nt).filter(Le=>Le.length>=3&&!de.has(Le)))].slice(0,12)},ze=(Z,de,Le=3)=>{const Re=$e(de);return Re.length?Z.map(Xe=>{const Ge=nt(Xe.text||""),ht=Re.filter(pt=>Ge.includes(pt));return{page:Xe,hits:ht,score:ht.reduce((pt,mt)=>pt+Math.min(3,Ge.split(mt).length-1),0)}}).filter(Xe=>Xe.score>0).sort((Xe,Ge)=>Ge.score-Xe.score||Ge.hits.length-Xe.hits.length).slice(0,Le):[]},ct=async()=>{const Z=r.trim();if(Z){te(!0);try{if(!X.current){const Re=await(await fetch("/assets/koul-book-ocr.json")).json();X.current=Re.pages||[]}const de=ze(X.current||[],Z);B(de)}catch{B([])}finally{te(!1)}}},U=async()=>{var de;const Z=n==="ks-en"?r.trim():a.trim();if(!Z||!new RegExp("\\p{Script=Arabic}","u").test(Z)){ee([]);return}Q(!0);try{if(!W.current){const Re=await fetch("/assets/kashmiri-quran-ocr.json");W.current=await Re.json()}const Le=ze(((de=W.current)==null?void 0:de.records)||[],Z);ee(Le)}catch{ee([])}finally{Q(!1)}};fe.useEffect(()=>{Te.current&&(dr.init(Te.current),dr.setPreset(Ce),Te.current.playbackRate=Fe)},[L,Ce,Fe]);const me=fe.useCallback(()=>{const Z=M.current;if(!Z)return;const de=Z.getContext("2d"),Le=dr.getAnalyser();if(!de||!Le)return;const Re=Le.frequencyBinCount,Xe=new Uint8Array(Re),Ge=()=>{v.current=requestAnimationFrame(Ge),Le.getByteFrequencyData(Xe),de.clearRect(0,0,Z.width,Z.height);const ht=Z.width/32;let pt=0;for(let mt=0;mt<32;mt++){const Fn=Math.floor(mt/32*(Re/2)),Ni=Xe[Fn]||0,cr=Math.max(3,Ni/255*(Z.height-4)),pn=de.createLinearGradient(0,Z.height,0,0);pn.addColorStop(0,"#267257"),pn.addColorStop(.7,"#64b693"),pn.addColorStop(1,"#dcebd2"),de.fillStyle=pn,de.fillRect(pt,Z.height-cr,ht-2,cr),pt+=ht}};Ge()},[]),K=fe.useCallback(()=>{v.current&&(cancelAnimationFrame(v.current),v.current=null);const Z=M.current;if(Z){const de=Z.getContext("2d");de&&(de.clearRect(0,0,Z.width,Z.height),de.fillStyle="#1c4233",de.fillRect(0,Z.height-2,Z.width,2))}},[]),ne=async()=>{if(L){rt(!0);try{const Z=await dr.renderMasteredWav(L,Ce),de=URL.createObjectURL(Z),Le=document.createElement("a");Le.href=de,Le.download=`koshur-studio-voice-${Ce}.wav`,Le.click(),URL.revokeObjectURL(de)}catch(Z){console.error("Download error:",Z)}finally{rt(!1)}}},ve=async()=>{const Z=n==="ks-en"?r.trim():a.trim();if(!Z){Ze(n==="en-ks"?"Translate the English sentence first, then generate speech.":"Enter a sentence first.");return}if(J==="bolbosh"&&!new RegExp("\\p{Script=Arabic}","u").test(Z)){Ze("The Bolbosh model needs Kashmiri in Perso-Arabic script.");return}Ve(!0),kt(null),Ze(J==="gemini"?`Generating Studio Ultra-HD Voice (${we})…`:"Generating Bolbosh Kashmiri voice with High ODE synthesis…");try{let de;J==="gemini"?(de=await Sy(Z,we),Ze(`Studio Ready · 24kHz HD Voice (${we}) with DSP rack active.`)):(de=await cp(Z,$,_e),Ze(`Studio Ready · Bolbosh (${$}) remastered with DSP warmth and de-esser.`)),kt(de.audioUrl),dr.resumeContext()}catch(de){if(J==="gemini")try{Ze("Falling back to Bolbosh Matcha-TTS model with Studio Mastering…");const Le=await cp(Z,$,"High");kt(Le.audioUrl),Ze("Ready · Generated via Bolbosh with Studio Mastering DSP.");return}catch{}Ze(de.name==="AbortError"?"Speech generation timed out. Please try again.":de.message||"Speech generation failed.")}finally{Ve(!1)}},ue=n==="ks-en";return c.jsxs("section",{id:"translator-view",className:"translator-view",children:[c.jsxs("div",{className:"translator-heading",children:[c.jsx("p",{className:"eyebrow",children:"NEURAL TRANSLATION · ONLINE + OFFLINE"}),c.jsxs("h1",{children:["Translate a",c.jsx("br",{}),c.jsx("em",{children:"whole sentence."})]}),c.jsx("p",{children:"Use the live server for fast translation, or download the quantized NLLB model once and translate offline on a compatible phone."})]}),c.jsxs("div",{className:"translation-workspace",children:[c.jsxs("div",{className:"model-selection",children:[c.jsx("span",{children:"Translation model"}),c.jsx("strong",{children:"NLLB-200 600M · server or offline phone model"}),c.jsxs("div",{className:"offline-controls",children:[c.jsx("button",{id:"download-offline-model",type:"button",disabled:_||Eo(),onClick:Me,children:Eo()?"Offline model ready":_?"Downloading…":"Download offline model"}),c.jsxs("label",{children:[c.jsx("input",{id:"offline-translate",type:"checkbox",checked:x,onChange:Z=>{S(Z.target.checked),Z.target.checked&&!Eo()?T("Download the offline model first; it is a large one-time download."):T(Z.target.checked?"Offline mode enabled. Translation stays on this device.":Nc)}})," ","Use offline model"]}),c.jsx("span",{id:"offline-status",role:"status",children:g})]})]}),c.jsxs("div",{className:"direction-bar",children:[c.jsx("button",{id:"source-language",type:"button",disabled:l,onClick:()=>{n!=="ks-en"&&xe()},children:ue?"Kashmiri":"English"}),c.jsx("button",{id:"swap-languages",type:"button","aria-label":"Swap languages",disabled:l,onClick:xe,children:"⇄"}),c.jsx("button",{id:"target-language",type:"button",disabled:l,onClick:()=>{n!=="en-ks"&&xe()},children:ue?"English":"Kashmiri"})]}),c.jsxs("div",{className:"translation-panes",children:[c.jsxs("div",{className:"translation-pane",children:[c.jsxs("label",{id:"source-label",htmlFor:"sentence-input",children:[ue?"Kashmiri":"English"," sentence"]}),c.jsx("textarea",{id:"sentence-input",dir:ue?"rtl":"ltr",lang:ue?"ks-Arab":"en",maxLength:1e3,placeholder:ue?"اَتہِ کٲشُر جُملہٕ لِکھِو…":"Type an English sentence here…",value:r,disabled:l,onChange:Z=>s(Z.target.value)}),ue&&r.trim()&&c.jsxs("div",{id:"source-transliteration",className:"source-transliteration",children:["Normalized Kashmiri: ",ks(r.trim())," · Romanized reading:"," ",Mr(ks(r.trim()))]}),c.jsxs("div",{className:"live-controls",children:[c.jsxs("label",{children:[c.jsx("input",{id:"live-translate",type:"checkbox",checked:f,onChange:Z=>p(Z.target.checked)})," ","Live server translation after pause"]}),c.jsx("span",{id:"live-status",children:h})]}),c.jsx("div",{id:"live-dictionary-preview",className:"live-dictionary-preview",role:"status",children:le.includes("→")?c.jsxs(c.Fragment,{children:[c.jsx("strong",{children:"Live dictionary:"})," ",le]}):le}),c.jsxs("span",{id:"sentence-count",children:[r.length," / 1,000"]})]}),c.jsxs("div",{className:"translation-pane output-pane",children:[c.jsxs("span",{id:"target-label",className:"field-label",children:[ue?"English":"Kashmiri"," translation"]}),c.jsx("div",{id:"sentence-output",className:`sentence-output ${a?"":"empty"}`,dir:ue?"ltr":"rtl",lang:ue?"en":"ks-Arab",children:a?n==="en-ks"?c.jsxs(c.Fragment,{children:[c.jsx("span",{className:"translated-script",children:a}),c.jsxs("span",{className:"translation-translit",children:["Romanized reading: ",Mr(a)]})]}):a:"Your translation will appear here."}),c.jsx("button",{id:"copy-translation",type:"button",disabled:!a,onClick:Pe,children:w})]})]}),c.jsx("div",{id:"grammar-note",className:"translation-note grammar-note",role:"status",children:E}),c.jsx("div",{id:"dictionary-context",className:"translation-note",role:"status",children:C}),c.jsxs("div",{className:"translation-examples",children:[c.jsx("span",{children:"Try a sentence"}),c.jsx("button",{id:"example-sentence",type:"button",disabled:l,onClick:()=>s(ue?"مےٚ پٔر اَکھ کِتاب":"The weather is good today."),children:ue?"مےٚ پٔر اَکھ کِتاب":"The weather is good today."})]}),c.jsx("div",{id:"translation-note",className:"translation-note",role:"status",children:P}),c.jsxs("div",{className:"book-reference-tools",children:[c.jsx("button",{id:"lookup-koul",type:"button",disabled:Y||l,onClick:ct,children:Y?"Loading Koul references…":"Look up Koul book references"}),c.jsx("button",{id:"lookup-quran",type:"button",disabled:D||l,onClick:U,children:D?"Loading Qur’an corpus…":"Find Qur’an corpus references"}),k!==null&&c.jsx("div",{id:"koul-references",className:"koul-references",children:k.length>0?c.jsxs(c.Fragment,{children:[c.jsxs("p",{children:[c.jsx("strong",{children:"Koul OCR references"}),c.jsx("span",{children:"Machine-matched pages for review; they do not change the neural translation."})]}),k.map(({page:Z,hits:de},Le)=>c.jsxs("a",{href:`https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul/page/n${Math.max(0,Z.page-1)}/mode/1up`,target:"_blank",rel:"noopener noreferrer",children:["PDF page ",Z.page,c.jsxs("span",{children:[de.join(" · ")," · ",String(Z.text||"").replace(/\s+/g," ").slice(0,260)]})]},Le))]}):c.jsxs("p",{children:[c.jsx("strong",{children:"No close Koul OCR reference found"}),c.jsx("span",{children:"Try a distinctive Kashmiri word from the sentence."})]})}),G!==null&&c.jsx("div",{id:"quran-references",className:"koul-references",children:G.length>0?c.jsxs(c.Fragment,{children:[c.jsxs("p",{children:[c.jsx("strong",{children:"Kashmiri Qur’an translation references"}),c.jsx("span",{children:"Raw OCR matches only—verify every quotation against the linked scan."})]}),G.map(({page:Z,hits:de},Le)=>c.jsxs("a",{href:Z.sourceUrl,target:"_blank",rel:"noopener noreferrer",children:["PDF page ",Z.page,c.jsxs("span",{children:[de.join(" · ")," · ",String(Z.text||"").replace(/\s+/g," ").slice(0,300)]})]},Le))]}):c.jsxs("p",{children:[c.jsx("strong",{children:"No close Qur’an corpus reference found"}),c.jsx("span",{children:"This corpus is Kashmiri/Arabic OCR and cannot be searched reliably from English alone."})]})})]}),c.jsxs("div",{className:"translation-actions",children:[c.jsx("button",{id:"translate-sentence",className:"translate-sentence",type:"button",disabled:l,onClick:()=>re(!1),children:l?"Working on server…":"Translate on server"}),l&&c.jsx("button",{id:"cancel-translation",className:"cancel-translation",type:"button",onClick:ye,children:"Stop"})]}),c.jsxs("section",{className:"tts-panel","aria-labelledby":"tts-title",children:[c.jsxs("div",{className:"tts-heading",children:[c.jsxs("div",{children:[c.jsx("p",{className:"eyebrow",children:"STUDIO-GRADE VOICE SYNTHESIS"}),c.jsxs("h2",{id:"tts-title",children:["Kashmiri Voice Studio ",c.jsx("span",{className:"studio-badge",children:"DSP Mastered · 24kHz"})]})]}),c.jsx("a",{href:J==="bolbosh"?"https://github.com/gaash-lab/Bolbosh":"https://deepmind.google/technologies/gemini/",target:"_blank",rel:"noopener noreferrer",children:J==="bolbosh"?"Bolbosh Matcha-TTS ↗":"Gemini 3.8 Audio ↗"})]}),c.jsx("p",{children:"Generates high-fidelity speech from the Kashmiri side (source sentence or translated text) with real-time acoustic mastering."}),c.jsxs("div",{className:"engine-selector",children:[c.jsx("button",{type:"button",className:`engine-tab ${J==="gemini"?"active":""}`,onClick:()=>{he("gemini"),Ze("Studio Ultra-HD Voice selected (24kHz broadcast clarity).")},children:"✨ Studio Ultra-HD Voice (Gemini 3.8)"}),c.jsx("button",{type:"button",className:`engine-tab ${J==="bolbosh"?"active":""}`,onClick:()=>{he("bolbosh"),Ze("Native Bolbosh Matcha-TTS selected (with High ODE & DSP Mastering).")},children:"🏔️ Bolbosh Kashmiri (Native Model)"})]}),c.jsxs("div",{className:"tts-controls",children:[J==="gemini"?c.jsxs("label",{children:["Studio Persona",c.jsxs("select",{id:"gemini-voice",value:we,onChange:Z=>qe(Z.target.value),children:[c.jsx("option",{value:"Kore",children:"Kore — Warm Female Narrator"}),c.jsx("option",{value:"Zephyr",children:"Zephyr — Gentle Female Voice"}),c.jsx("option",{value:"Puck",children:"Puck — Dynamic Crisp Male"}),c.jsx("option",{value:"Fenrir",children:"Fenrir — Deep Resonant Male"}),c.jsx("option",{value:"Charon",children:"Charon — Broadcast Host Male"})]})]}):c.jsxs(c.Fragment,{children:[c.jsxs("label",{children:["Bolbosh Voice",c.jsxs("select",{id:"tts-voice",value:$,onChange:Z=>ae(Z.target.value),children:[c.jsx("option",{value:"Female",children:"Female (Studio Mastered)"}),c.jsx("option",{value:"Male",children:"Male (Studio Mastered)"})]})]}),c.jsxs("label",{children:["Solver Precision",c.jsxs("select",{id:"tts-quality",value:_e,onChange:Z=>ce(Z.target.value),children:[c.jsx("option",{value:"High",children:"High (Cleanest ODE)"}),c.jsx("option",{value:"Medium",children:"Medium"}),c.jsx("option",{value:"Low (fast)",children:"Fast"})]})]})]}),c.jsx("button",{id:"speak-kashmiri",className:"primary-btn",type:"button",disabled:Be,onClick:ve,children:Be?"Synthesizing Studio Audio…":"Generate Studio Speech"})]}),c.jsxs("div",{className:"studio-rack",children:[c.jsxs("div",{className:"studio-rack-header",children:[c.jsx("span",{className:"studio-rack-title",children:"🎛️ Studio DSP Mastering Rack"}),c.jsx("span",{style:{fontSize:11,color:"#267257",fontWeight:600},children:Er[Ce].label})]}),c.jsxs("div",{className:"studio-rack-grid",children:[c.jsxs("label",{children:["Acoustic Profile",c.jsxs("select",{value:Ce,onChange:Z=>{const de=Z.target.value;Ie(de),dr.setPreset(de)},children:[c.jsx("option",{value:"broadcast",children:"Studio Master (Broadcast)"}),c.jsx("option",{value:"warm-radio",children:"Warm Radio Host"}),c.jsx("option",{value:"crisp-learning",children:"Crisp Articulation (Learner)"}),c.jsx("option",{value:"natural-booth",children:"Natural Acoustic Booth"}),c.jsx("option",{value:"bypass",children:"Raw Model Output (Bypass DSP)"})]})]}),c.jsxs("label",{children:["Pacing & Speed",c.jsxs("select",{value:Fe,onChange:Z=>{const de=parseFloat(Z.target.value);dt(de),Te.current&&(Te.current.playbackRate=de)},children:[c.jsx("option",{value:"0.85",children:"0.85x (Language Study)"}),c.jsx("option",{value:"1.0",children:"1.0x (Natural Studio)"}),c.jsx("option",{value:"1.15",children:"1.15x (Brisk Narrator)"})]})]}),c.jsx("p",{className:"preset-desc",children:Er[Ce].description})]}),c.jsx("div",{className:"visualizer-container",children:c.jsx("canvas",{ref:M,className:"visualizer-canvas",width:480,height:48})})]}),c.jsx("p",{id:"tts-status",className:"tts-status",role:"status",children:We}),L&&c.jsxs("div",{className:"audio-player-row",children:[c.jsx("audio",{ref:Te,id:"tts-audio",controls:!0,autoPlay:!0,src:L,onPlay:()=>{dr.resumeContext(),me()},onPause:K,onEnded:K,children:"Your browser does not support the audio element."}),c.jsx("button",{type:"button",className:"download-wav-btn",disabled:be,onClick:ne,title:"Download 24-bit mastered studio WAV file",children:be?"Exporting…":"⬇ Download Mastered WAV"})]})]})]})]})},wy=()=>c.jsxs("section",{id:"about-view",className:"about-view",children:[c.jsx("p",{className:"eyebrow",children:"ABOUT THE PROJECT"}),c.jsxs("h1",{children:["A practical home for",c.jsx("br",{}),c.jsx("em",{children:"Kashmiri words."})]}),c.jsxs("div",{className:"about-grid",children:[c.jsx("p",{children:"Koshur Lughat is a searchable Kashmiri–English dictionary and a server-side neural sentence translator for the Perso-Arabic script."}),c.jsxs("div",{children:[c.jsx("h2",{children:"More than a word list"}),c.jsx("p",{children:"Multiple meanings are grouped by headword. Sourced entries include sense context, transliteration, IPA, examples, inflected forms and related vocabulary where supplied. A separate historical romanized collection preserves 20,643 older entries without presenting them as modern spellings. The complete Koul book OCR is searchable by page and clearly labeled machine output. Form counts are separate from definition counts."})]}),c.jsxs("div",{children:[c.jsx("h2",{children:"Real models, honest limits"}),c.jsx("p",{children:"A public NLLB-200 600M model translates sentences with three-beam decoding online; a browser-compatible quantized copy can also be cached on a device for offline use. Translation is automatic, not native-speaker reviewed. Kashmiri needs much more evaluation; this site does not claim world-leading accuracy."})]}),c.jsxs("div",{children:[c.jsx("h2",{children:"Sources & reuse"}),c.jsx("p",{children:"We import explicitly identified Kashmiri definitions and translation-table pairs, not guessed meanings from monolingual or audio corpora. Gated datasets need their owners’ access approval. Original vocabulary has unresolved licensing; Wiktionary adaptations are CC BY-SA 4.0, and Kaeshir Dictionary data is MIT licensed. Read the source and model documentation and Kaeshir license before redistribution."})]}),c.jsxs("div",{children:[c.jsx("h2",{children:"Reference book"}),c.jsxs("p",{children:["We check existing entries against"," ",c.jsx("a",{href:"https://archive.org/details/tbjU_kashmiri-english-dictionary-for-second-language-learners-omkar-koul",target:"_blank",rel:"noopener noreferrer",children:"Koul, Raina and Bhat’s Kashmiri–English Dictionary for Second Language Learners"})," ","(2000). The project owner reports rights-holder approval for public reuse. We add manually checked entries and page-linked references; the scan’s machine OCR is too unreliable for an unreviewed bulk import."]})]}),c.jsxs("div",{children:[c.jsx("h2",{children:"Privacy & storage"}),c.jsx("p",{children:"Online sentences are sent to the public translation server. Offline mode downloads a quantized NLLB model to this device; after that, translation can run without a server. Recent searches stay in this browser."})]})]})]}),Ty=({onBackToDictionary:t,onGoToOrthography:e})=>c.jsx("div",{className:"guide-wrapper",children:c.jsxs("main",{className:"guide-main",children:[c.jsxs("header",{children:[c.jsx("p",{className:"eyebrow",children:"LANGUAGE · GRAMMAR · PROOFREADING"}),c.jsx("h1",{children:"A working grammar for Kashmiri."}),c.jsx("p",{className:"lede",children:"A practical scheme for reading, writing, checking and teaching modern Kashmiri in the Perso-Arabic script. It brings the writing system, sound patterns, word structure, sentence structure and proofreading decisions into one place."}),c.jsxs("p",{className:"guide-note",children:[c.jsx("strong",{children:"How to use this guide."})," This is a careful working reference, not a claim that every Kashmiri speaker uses one identical form. Kashmiri has regional, social and script traditions. The examples and orthography rules are tied to the sources listed at the end; uncertain grammar should be checked with a fluent speaker before publication."]})]}),c.jsxs("nav",{className:"guide-toc","aria-label":"Guide sections",children:[c.jsx("strong",{children:"On this page"}),c.jsx("a",{href:"#scope",children:"Scope and conventions"}),c.jsx("a",{href:"#script",children:"Script and spelling"}),c.jsx("a",{href:"#sounds",children:"Sounds and transliteration"}),c.jsx("a",{href:"#words",children:"How words are built"}),c.jsx("a",{href:"#nouns",children:"Nouns, pronouns and cases"}),c.jsx("a",{href:"#sentences",children:"Sentences and word order"}),c.jsx("a",{href:"#verbs",children:"Verbs and agreement"}),c.jsx("a",{href:"#negation",children:"Negation and questions"}),c.jsx("a",{href:"#proofreading",children:"Proofreading scheme"}),c.jsx("a",{href:"#machine",children:"How the translator applies it"}),c.jsx("a",{href:"#templates",children:"Writing templates"}),c.jsx("a",{href:"#sources",children:"Sources and limits"})]}),c.jsxs("article",{className:"guide-content",children:[c.jsxs("section",{id:"scope",children:[c.jsx("h2",{children:"1. Scope and conventions"}),c.jsxs("p",{children:[c.jsx("strong",{children:"Kashmiri"}),", or ",c.jsx("span",{lang:"ks-Arab",dir:"rtl",children:"کٲشُر"}),", is an Indo-Aryan language of the Dardic group. This guide is for modern Kashmiri written in the Perso-Arabic Nastaliq tradition. Kashmiri is also written in Devanagari; the language is the same, but the character, direction and spelling rules differ."]}),c.jsxs("p",{children:["Use the language tag ",c.jsx("code",{children:"ks"})," for Kashmiri, ",c.jsx("code",{children:"ks-Arab"})," for Perso-Arabic Kashmiri and ",c.jsx("code",{children:"ks-Deva"})," for Devanagari Kashmiri. Use right-to-left direction for the Arabic script. Keep Kashmiri text, English glosses and transliteration in separate fields so a reader can tell what is original and what is an aid."]}),c.jsxs("p",{children:["The guide uses these labels: ",c.jsx("strong",{children:"word"})," means a dictionary headword; ",c.jsx("strong",{children:"form"})," means an inflection or spelling variant; ",c.jsx("strong",{children:"gloss"})," means a short English meaning; ",c.jsx("strong",{children:"transliteration"})," means a pronunciation-oriented Latin rendering; ",c.jsx("strong",{children:"proofreading"})," means checking an already written sentence, not inventing a translation."]})]}),c.jsxs("section",{id:"script",children:[c.jsx("h2",{children:"2. Script and spelling"}),c.jsx("h3",{children:"Direction, shape and Unicode"}),c.jsx("p",{children:"Kashmiri Arabic text runs right to left and is normally displayed in Nastaliq. Letters join in context, so the visible shape is not a separate character. Store ordinary Unicode letters and combining marks, never screenshots, presentation forms or manually drawn glyphs. Normalize text to NFC before comparison. Do not insert tatweel merely to make a word look longer."}),c.jsx("p",{children:"The modern orthography is unusually vowel-explicit for an Arabic-derived script. Vowel sounds are represented with letters and combining marks, and vowel marks should not be removed from a carefully edited Kashmiri text. A word that looks understandable after the marks are deleted may still become ambiguous or non-standard."}),c.jsx("h3",{children:"Core inventory"}),c.jsxs("p",{children:["The orthography reference describes 21 basic consonant letters, six aspirated consonant digraphs and additional letters used for Persian, Arabic and Urdu loans. Palatalisation has a dedicated Kashmiri sign. Word-initial vowels use a carrier; medial and final vowels can use different Unicode sequences. Follow the character tables in the"," ",c.jsx("button",{type:"button",className:"orthography-nav",style:{background:"none",border:"none",padding:0,cursor:"pointer"},onClick:e,children:"orthography reference"})," ","when choosing a code point."]}),c.jsxs("table",{children:[c.jsx("thead",{children:c.jsxs("tr",{children:[c.jsx("th",{children:"Editing decision"}),c.jsx("th",{children:"Preferred practice"})]})}),c.jsxs("tbody",{children:[c.jsxs("tr",{children:[c.jsx("td",{children:"Kashmiri kaf"}),c.jsxs("td",{children:["Use ",c.jsx("span",{lang:"ks-Arab",children:"ک"}),". The normalizer accepts Arabic ",c.jsx("span",{lang:"ks-Arab",children:"ك"})," as an input variant, but published Kashmiri should use the preferred form."]})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Kashmiri yeh"}),c.jsxs("td",{children:["Use the Kashmiri spelling and marks from the word’s source. Do not replace every ",c.jsx("span",{lang:"ks-Arab",children:"ی"}),", ",c.jsx("span",{lang:"ks-Arab",children:"ي"})," or ",c.jsx("span",{lang:"ks-Arab",children:"ى"})," by eye without checking the word."]})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Heh and heh variants"}),c.jsxs("td",{children:["Use ",c.jsx("span",{lang:"ks-Arab",children:"ہ"})," in Kashmiri forms where the orthography calls for it. Arabic ",c.jsx("span",{lang:"ks-Arab",children:"ه"})," and ",c.jsx("span",{lang:"ks-Arab",children:"ة"})," are accepted OCR/input variants, not an excuse to erase a meaningful spelling distinction."]})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Zero-width characters"}),c.jsx("td",{children:"Remove accidental zero-width spaces and BOM characters. Preserve a joining control only when the orthography record or a native source requires it."})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Numbers and punctuation"}),c.jsxs("td",{children:["Use Kashmiri/Arabic-Indic digits where the document style requires them. Use Kashmiri punctuation such as ",c.jsx("span",{lang:"ks-Arab",children:"، ؛ ؟ ۔"})," in a Kashmiri sentence and keep embedded Latin text left to right."]})]})]})]}),c.jsxs("p",{className:"caution",children:[c.jsx("strong",{children:"Do not over-correct:"})," normalisation can repair a code-point variant, but it cannot decide whether a rare literary word, name or dialect form is right. Preserve the original in a source field and record the preferred spelling separately."]})]}),c.jsxs("section",{id:"sounds",children:[c.jsx("h2",{children:"3. Sounds and transliteration"}),c.jsx("p",{children:"Kashmiri contrasts plain and aspirated stops, dental and retroflex consonants, several fricatives, palatalised consonants and a rich vowel system with central and nasalised qualities. The exact phonetic value of a letter depends on its position and its neighbours. Transliteration is therefore a reading aid, not a reversible replacement for Kashmiri spelling."}),c.jsxs("table",{children:[c.jsx("thead",{children:c.jsxs("tr",{children:[c.jsx("th",{children:"Kashmiri"}),c.jsx("th",{children:"Practical reading"}),c.jsx("th",{children:"What to check"})]})}),c.jsxs("tbody",{children:[c.jsxs("tr",{children:[c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"چ / چھ"}),c.jsx("td",{children:c.jsx("code",{children:"ʧ / ʧʰ"})}),c.jsxs("td",{children:["Do not collapse aspirated ",c.jsx("span",{lang:"ks-Arab",children:"چھ"})," into ",c.jsx("span",{lang:"ks-Arab",children:"چ"}),"."]})]}),c.jsxs("tr",{children:[c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"ٹ / ڈ / ڑ"}),c.jsx("td",{children:c.jsx("code",{children:"ʈ / ɖ / ɽ"})}),c.jsxs("td",{children:["These are retroflex sounds, distinct from dental ",c.jsx("span",{lang:"ks-Arab",children:"ت د ر"}),"."]})]}),c.jsxs("tr",{children:[c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"ک / کھ"}),c.jsx("td",{children:c.jsx("code",{children:"k / kʰ"})}),c.jsx("td",{children:"Keep the aspiration marker in the written form."})]}),c.jsxs("tr",{children:[c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"ی / ؠ"}),c.jsx("td",{children:c.jsx("code",{children:"y / ʲ"})}),c.jsxs("td",{children:[c.jsx("span",{lang:"ks-Arab",children:"ؠ"})," marks palatalisation; it is not an ordinary yeh."]})]}),c.jsxs("tr",{children:[c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"َ ِ ُ ٕ"}),c.jsx("td",{children:c.jsx("code",{children:"a i u ɨ"})}),c.jsx("td",{children:"Combining marks carry vowel information and must stay attached to the right base sequence."})]})]})]}),c.jsxs("p",{children:["Use the site’s generated transliteration for searching and pronunciation support. It follows the orthography mapping, including symbols such as ",c.jsx("code",{children:"ʧ"}),", ",c.jsx("code",{children:"ʈ"}),", ",c.jsx("code",{children:"ɽ"}),", ",c.jsx("code",{children:"ɨ"}),", ",c.jsx("code",{children:"ə̄"})," and ",c.jsx("code",{children:"ɔ"}),". For a publication, show the Kashmiri original first and treat the Latin line as an annotation."]}),c.jsx("h3",{children:"Transliteration key"}),c.jsxs("p",{children:["The following key is the project’s practical, Unicode-friendly reading system. It preserves contrasts that matter to Kashmiri learners. A macron or combining mark may represent vowel quality or length; a superscript ",c.jsx("code",{children:"ʰ"})," marks aspiration; ",c.jsx("code",{children:"ʲ"})," marks palatalisation. The key is more precise than English spelling."]}),c.jsxs("table",{children:[c.jsx("thead",{children:c.jsxs("tr",{children:[c.jsx("th",{children:"Native letters or marks"}),c.jsx("th",{children:"Romanized output"}),c.jsx("th",{children:"Reading note"})]})}),c.jsxs("tbody",{children:[c.jsxs("tr",{children:[c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"پ ب ت د ٹ ڈ"}),c.jsx("td",{children:c.jsx("code",{children:"p b t d ʈ ɖ"})}),c.jsxs("td",{children:["Plain stops; ",c.jsx("span",{lang:"ks-Arab",children:"ٹ ڈ"})," are retroflex."]})]}),c.jsxs("tr",{children:[c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"پھ تھ چھ ٹھ کھ"}),c.jsx("td",{children:c.jsx("code",{children:"pʰ tʰ ʧʰ ʈʰ kʰ"})}),c.jsx("td",{children:"Aspirated digraphs stay distinct from plain stops."})]}),c.jsxs("tr",{children:[c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"چ ژ ج ش خ غ"}),c.jsx("td",{children:c.jsx("code",{children:"ʧ ʦ ʤ ʃ x ġ"})}),c.jsx("td",{children:"Affricates and fricatives use marked symbols rather than English approximations."})]}),c.jsxs("tr",{children:[c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"ر ڑ ی ؠ ہ ن ں"}),c.jsx("td",{children:c.jsx("code",{children:"r ɽ y ʲ h n ñ"})}),c.jsxs("td",{children:[c.jsx("span",{lang:"ks-Arab",children:"ؠ"})," is palatalisation; nasal signs stay visible."]})]}),c.jsxs("tr",{children:[c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"َ ِ ُ ٕ ٟ ٔ ٲ ۄ"}),c.jsx("td",{children:c.jsx("code",{children:"a i u ɨ ɨ̄ ᵊ ə̄ ɔ"})}),c.jsx("td",{children:"Vowel marks and carrier forms are transliterated in place."})]}),c.jsxs("tr",{children:[c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"آ وٗ وٚ"}),c.jsx("td",{children:c.jsx("code",{children:"ã w˔ wᵉ"})}),c.jsx("td",{children:"Long, rounded or modified vowel readings follow the orthography mapping."})]})]})]})]}),c.jsxs("section",{id:"words",children:[c.jsx("h2",{children:"4. How words are built"}),c.jsx("p",{children:"Kashmiri word forms carry information about number, gender, case, person, tense, aspect and agreement. A dictionary headword is only one point in a paradigm. When writing a sentence, check the inflected form rather than forcing the bare headword into every position."}),c.jsx("h3",{children:"Compounds and borrowed words"}),c.jsx("p",{children:"Compounds, reduplication, inherited Indo-Aryan vocabulary and Persian/Arabic/Urdu loans all occur in modern Kashmiri. A borrowed consonant or spelling should not be “purified” into a native sound if the source intentionally preserves the loan. Mark a loan or a proper name as such in editorial metadata."}),c.jsx("h3",{children:"Clitics and short forms"}),c.jsx("p",{children:"Short pronoun, copula and particle forms can attach phonologically to a neighbouring word. In a searchable dictionary, store both the surface phrase and the component analysis when known. In running text, follow the source’s spacing and do not split a clitic simply because English would use a separate word."}),c.jsx("h3",{children:"Inflection"}),c.jsxs("p",{children:["Record a form with its grammatical features: ",c.jsx("code",{children:"singular"}),", ",c.jsx("code",{children:"plural"}),", ",c.jsx("code",{children:"masculine"}),", ",c.jsx("code",{children:"feminine"}),", ",c.jsx("code",{children:"direct"}),", ",c.jsx("code",{children:"oblique"}),", ",c.jsx("code",{children:"ergative"}),", ",c.jsx("code",{children:"past"}),", ",c.jsx("code",{children:"imperfective"})," or ",c.jsx("code",{children:"perfective"}),". If a form is not supported by a source, label it as a hypothesis instead of presenting it as a rule."]})]}),c.jsxs("section",{id:"nouns",children:[c.jsx("h2",{children:"5. Nouns, pronouns and cases"}),c.jsx("h3",{children:"Nouns and adjectives"}),c.jsx("p",{children:"Nouns have grammatical gender and number. Adjectives and participles may agree with the noun, the subject or the absolutive argument, depending on construction. Agreement is a sentence-level check: do not choose an adjective ending from the English noun alone."}),c.jsx("p",{children:"Case is commonly expressed through oblique forms, particles and postpositions. Postpositions follow their noun phrase, as in many Indo-Aryan languages. A noun before a postposition may therefore look different from the same noun used as a bare subject or object."}),c.jsx("h3",{children:"Pronouns"}),c.jsx("p",{children:"Pronoun forms have direct, oblique and case-marked uses. A polite or plural second-person form should not be replaced automatically with a singular form. In proofreading, identify the intended person and number first, then check the pronoun, its case marker and the verb or copula agreement together."}),c.jsx("h3",{children:"Case checklist"}),c.jsxs("table",{children:[c.jsx("thead",{children:c.jsxs("tr",{children:[c.jsx("th",{children:"Question"}),c.jsx("th",{children:"Proofreading action"})]})}),c.jsxs("tbody",{children:[c.jsxs("tr",{children:[c.jsx("td",{children:"Who is the subject?"}),c.jsx("td",{children:"Check whether the clause is present/intransitive or a past transitive construction; the agent may be marked differently."})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Who receives or experiences something?"}),c.jsx("td",{children:"Check dative/accusative marking and the form required by the verb."})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Who owns or is related to something?"}),c.jsx("td",{children:"Check the genitive form and agreement with the possessed noun."})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Where, from where or with what?"}),c.jsx("td",{children:"Use the attested locative, ablative or instrumental postposition; do not translate an English preposition word for word."})]})]})]})]}),c.jsxs("section",{id:"sentences",children:[c.jsx("h2",{children:"6. Sentences and word order"}),c.jsxs("p",{children:["The safe default for a simple Kashmiri clause is ",c.jsx("strong",{children:"subject–object–verb"}),", with modifiers before the noun and postpositions after the noun phrase. Information structure can move a topic or focus to the front, and finite verbs can show a verb-second pattern in independent clauses. A sentence may therefore be grammatical even when it is not a rigid SOV string."]}),c.jsx("p",{children:"Build a sentence in layers: (1) choose the predicate, (2) identify its arguments, (3) assign case, (4) select tense/aspect and agreement, (5) add negation or question marking, and (6) check the orthography. This order prevents an English word order from dictating Kashmiri endings."}),c.jsx("h3",{children:"Phrase structure"}),c.jsxs("ul",{children:[c.jsxs("li",{children:[c.jsx("strong",{children:"Noun phrase:"})," determiner/quantifier + adjective or modifier + noun + case/postposition."]}),c.jsxs("li",{children:[c.jsx("strong",{children:"Verb phrase:"})," lexical verb or participle + auxiliary/copula and agreement material."]}),c.jsxs("li",{children:[c.jsx("strong",{children:"Subordination:"})," the subordinate clause normally comes before the main clause; use the attested linker or participle."]}),c.jsxs("li",{children:[c.jsx("strong",{children:"Coordination:"})," preserve the conjunction and repeat agreement only where the source grammar requires it."]})]})]}),c.jsxs("section",{id:"verbs",children:[c.jsx("h2",{children:"7. Verbs, tense, aspect and agreement"}),c.jsx("h3",{children:"Verb information"}),c.jsxs("p",{children:["Every finite verb should be analysed for ",c.jsx("strong",{children:"lexical root"}),", ",c.jsx("strong",{children:"aspect"}),", ",c.jsx("strong",{children:"tense or mood"}),", ",c.jsx("strong",{children:"person"}),", ",c.jsx("strong",{children:"number"})," and any ",c.jsx("strong",{children:"gender agreement"}),". Kashmiri uses auxiliaries and copular material extensively. The infinitive and the stem are not interchangeable, and a participle is not automatically a finite verb."]}),c.jsx("h3",{children:"Split alignment"}),c.jsx("p",{children:"Descriptions of Kashmiri report a split between present/intransitive patterns and many past transitive patterns. In a past transitive clause, the agent can receive ergative marking and agreement may be controlled by the absolutive argument or object. This is why translating “I read a book” by selecting a generic first-person verb ending can produce an agreement error. Check the tense, transitivity and object together."})]}),c.jsxs("section",{id:"negation",children:[c.jsx("h2",{children:"8. Negation and questions"}),c.jsx("h3",{children:"Negation"}),c.jsxs("p",{children:["Negation is grammatical, not merely punctuation. A negative particle or auxiliary can change the position and form of the copula or verb. Identify the construction first—nominal, copular, existential, verbal or imperative—then use the negative form recorded for that construction. Do not mechanically place English ",c.jsx("em",{children:"not"})," before the Kashmiri verb."]}),c.jsx("h3",{children:"Questions"}),c.jsxs("p",{children:["Yes/no questions use Kashmiri syntax and intonation, with the question mark ",c.jsx("span",{lang:"ks-Arab",children:"؟"})," in writing where appropriate. Question words normally occupy the same argument position as the answer they request; English subject–auxiliary inversion should not be copied."]})]}),c.jsxs("section",{id:"proofreading",children:[c.jsx("h2",{children:"9. The proofreading scheme"}),c.jsxs("ol",{children:[c.jsxs("li",{children:[c.jsx("strong",{children:"Protect spans."})," Mark names, quotations, URLs, email addresses, numbers and code before editing."]}),c.jsxs("li",{children:[c.jsx("strong",{children:"Normalize encoding."})," Apply NFC, remove accidental zero-width characters and reject presentation-form glyphs."]}),c.jsxs("li",{children:[c.jsx("strong",{children:"Check script."})," Confirm the sentence is intentionally Perso-Arabic Kashmiri; flag accidental Urdu, Arabic or Persian substitutions."]}),c.jsxs("li",{children:[c.jsx("strong",{children:"Check graphemes."})," Verify Kashmiri kaf, yeh, heh, palatalisation, aspiration, nasalisation, vowel marks and initial-vowel carriers."]}),c.jsxs("li",{children:[c.jsx("strong",{children:"Check word boundaries."})," Confirm clitics, compounds, postpositions and punctuation against an attested source."]}),c.jsxs("li",{children:[c.jsx("strong",{children:"Check the predicate."})," Identify transitivity and TAM before checking agreement."]}),c.jsxs("li",{children:[c.jsx("strong",{children:"Check noun phrases."})," Verify gender, number, direct/oblique form and case marking."]}),c.jsxs("li",{children:[c.jsx("strong",{children:"Check polarity and questions."})," Ensure the negative or interrogative construction is the intended one."]}),c.jsxs("li",{children:[c.jsx("strong",{children:"Check meaning."})," Compare the sentence with its context; a dictionary gloss cannot decide a homograph or dialect form."]}),c.jsxs("li",{children:[c.jsx("strong",{children:"Generate transliteration last."})," Transliteration should reflect the final Kashmiri spelling, never replace it."]})]}),c.jsxs("p",{className:"caution",children:[c.jsx("strong",{children:"Proofreading rule:"})," a normalizer may fix ",c.jsx("span",{lang:"ks-Arab",children:"ك"})," to ",c.jsx("span",{lang:"ks-Arab",children:"ک"})," or remove a zero-width space, but it must not invent a word ending, case marker or translation. Automatic correction and grammatical proofreading are separate passes."]})]}),c.jsxs("section",{id:"templates",children:[c.jsx("h2",{children:"11. Writing templates"}),c.jsx("p",{className:"ks-example",lang:"ks-Arab",children:"مےٚ پٔر اَکھ کِتاب"}),c.jsxs("p",{className:"romanized",lang:"ks-Latn",children:[c.jsx("strong",{children:"Romanized:"})," mē pᵊr ạ̄akʰ kitạ̄b"]}),c.jsx("p",{className:"translation",children:"I read a book. The dictionary records this as a past transitive example; check the subject, object and agreement together."}),c.jsx("p",{className:"ks-example",lang:"ks-Arab",children:"سٲری اِنسان چھِ آزاد زامٕتؠ۔"}),c.jsxs("p",{className:"romanized",lang:"ks-Latn",children:[c.jsx("strong",{children:"Romanized:"})," sə̄ry ạ̄insạ̄n ʧʰi ãżạ̄d żạ̄mɨtʲ."]}),c.jsx("p",{className:"translation",children:"All human beings are born free. This is the orthography reference sample; preserve its vowel marks and punctuation when citing it."})]}),c.jsxs("section",{id:"sources",children:[c.jsx("h2",{children:"12. Sources, review and limits"}),c.jsx("p",{children:"The script and Unicode rules on this page follow the bundled Kashmiri Arabic orthography notes v32. Examples and lexical evidence come from the attributed dictionary records and the page-linked OCR collections."}),c.jsxs("p",{children:[c.jsx("button",{type:"button",className:"collection-button",style:{width:"auto",display:"inline-block",marginRight:12},onClick:t,children:"← Return to dictionary search"}),c.jsx("button",{type:"button",className:"collection-button",style:{width:"auto",display:"inline-block"},onClick:e,children:"Open Kashmiri orthography reference →"})]})]})]})]})}),Ay=({onBackToDictionary:t,onGoToLanguageGuide:e})=>{const[n,i]=fe.useState(36);return c.jsx("div",{className:"orthography-wrapper",children:c.jsxs("main",{className:"orthography-main",children:[c.jsxs("header",{children:[c.jsx("p",{className:"eyebrow",children:"WRITING SYSTEM · SOURCE NOTES V32"}),c.jsx("h1",{children:"Kashmiri Arabic orthography"}),c.jsx("p",{className:"lede",children:"The complete Kashmiri Perso-Arabic writing and typography reference used by this dictionary: sounds, characters, combining marks, shaping, direction, layout, punctuation and forms."}),c.jsxs("p",{className:"source-credit",children:[c.jsx("strong",{children:"Source and attribution."})," Richard Ishida,"," ",c.jsx("em",{children:"Arabic (Kashmiri), Nastaliq orthography notes v32"}),", updated 27 April 2026. The project owner reports rights-holder permission for this public reuse. The original reference remains available at"," ",c.jsx("a",{href:"https://r12a.github.io/scripts/arab/ks.html",target:"_blank",rel:"noopener noreferrer",children:"r12a.github.io/scripts/arab/ks.html"}),"."]})]}),c.jsxs("nav",{className:"orthography-toc","aria-label":"Orthography sections",children:[c.jsx("strong",{children:"On this page"}),c.jsx("a",{href:"#sample",children:"Interactive sample"}),c.jsx("a",{href:"#features",children:"Basic script features"}),c.jsx("a",{href:"#consonants",children:"Consonant inventory"}),c.jsx("a",{href:"#vowels",children:"Vowel system"}),c.jsx("a",{href:"#confusables",children:"Confusables & spelling errors"}),c.jsx("a",{href:"#numbers",children:"Numbers & punctuation"})]}),c.jsxs("article",{className:"orthography-content",children:[c.jsxs("section",{id:"sample",children:[c.jsx("h2",{children:"Interactive sample"}),c.jsxs("p",{children:["Adjust font size to inspect Nastaliq letter connections and Kashmiri diacritics:",c.jsx("input",{type:"range",min:"18",max:"64",step:"2",value:n,onChange:r=>i(Number(r.target.value)),style:{marginLeft:12,verticalAlign:"middle"}})," ",c.jsxs("span",{children:[n,"px"]})]}),c.jsx("div",{dir:"rtl",lang:"ks",style:{fontSize:`${n}px`,padding:"24px",border:"1px solid var(--line)",borderRadius:"12px",background:"#fdfcf8",fontFamily:'"Noto Nastaliq Urdu", serif',lineHeight:2.2,marginTop:"12px"},children:"سٲری اِنسان چھِ آزاد زامٕتؠ۔ وؠقار تہٕ حۆقوٗق چھِ ہِوی۔ تِمَن چھُ سوچ سَمَج عَطا کَرنہٕ آمُت تہٕ تِمَن پَزِ بٲے بَرادٔری ہٕنٛدِس جَذباتَس تَحَت اکھ أکِس اکار بَکار یُن ۔"}),c.jsx("p",{className:"smallprint",style:{marginTop:"8px",color:"var(--muted)"},children:"Source: Omniglot, article 1 of the Universal Declaration of Human Rights in Kashmiri."})]}),c.jsxs("section",{id:"features",children:[c.jsx("h2",{children:"Basic script features"}),c.jsxs("p",{children:["The Kashmiri Arabic orthography is an ",c.jsx("strong",{children:"alphabet"}),": all vowels are written explicitly alongside consonants. Unlike Arabic, Persian, and Urdu, all vowel diacritics are always visible in carefully edited Kashmiri texts. Representation of several vowel sounds utilizes different code points in medial vs. final positions."]}),c.jsxs("p",{children:["Kashmiri Arabic text runs ",c.jsx("strong",{children:"right to left"})," in horizontal lines, but numbers and embedded Latin text are read left to right. It is principally written using the Nastaliq style of Arabic writing, characterized by sloping baselines, hanging connections, and distinct letterforms."]})]}),c.jsxs("section",{id:"consonants",children:[c.jsx("h2",{children:"Consonant inventory"}),c.jsx("p",{children:"Modern Kashmiri has 21 basic consonant letters and 6 aspirated digraphs, and uses 13 additional letters for words loaned from Persian, Arabic and Urdu."}),c.jsxs("table",{children:[c.jsx("thead",{children:c.jsxs("tr",{children:[c.jsx("th",{children:"Category"}),c.jsx("th",{children:"Native characters"}),c.jsx("th",{children:"IPA reading"}),c.jsx("th",{children:"Notes"})]})}),c.jsxs("tbody",{children:[c.jsxs("tr",{children:[c.jsx("td",{children:"Plain stops & affricates"}),c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"پ ب ت د ٹ ڈ ک گ چ ج ژ"}),c.jsx("td",{children:"p b t d ʈ ɖ k g ʧ ʤ ʦ"}),c.jsxs("td",{children:["Includes retroflex ",c.jsx("span",{lang:"ks-Arab",children:"ٹ ڈ"})," and alveolar affricate ",c.jsx("span",{lang:"ks-Arab",children:"ژ"})]})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Aspirated digraphs"}),c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"پھ تھ ٹھ کھ چھ ژھ"}),c.jsx("td",{children:"pʰ tʰ ʈʰ kʰ ʧʰ ʦʰ"}),c.jsxs("td",{children:["Formed with following do-chashmi heh ",c.jsx("span",{lang:"ks-Arab",children:"ھ"})]})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Nasals & Liquids"}),c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"م ن ر ڑ ل"}),c.jsx("td",{children:"m n r ɽ l"}),c.jsxs("td",{children:["Includes retroflex flap ",c.jsx("span",{lang:"ks-Arab",children:"ڑ"})]})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Palatalisation"}),c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"ؠ"}),c.jsx("td",{children:"ʲ"}),c.jsx("td",{children:"Kashmiri yeh (U+0620); marks palatalized consonants"})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Fricatives & Loans"}),c.jsx("td",{lang:"ks-Arab",dir:"rtl",children:"س ز ش خ غ ف ق ص ض ط ظ ع ح ذ ث"}),c.jsx("td",{children:"s z ʃ x ġ f ḱ s z t z ʔ ħ z s"}),c.jsx("td",{children:"Preserved in literary, historical, and loan vocabulary"})]})]})]})]}),c.jsxs("section",{id:"vowels",children:[c.jsx("h2",{children:"Vowel system"}),c.jsxs("p",{children:["Vowels in Kashmiri use a combination of 10 combining marks and 10 letters. Standalone vowels in word-initial position are preceded by or attached to carrier alef (",c.jsx("span",{lang:"ks-Arab",children:"ا"}),") or ain (",c.jsx("span",{lang:"ks-Arab",children:"ع"}),")."]}),c.jsxs("table",{children:[c.jsx("thead",{children:c.jsxs("tr",{children:[c.jsx("th",{children:"Vowel sound"}),c.jsx("th",{children:"Medial form"}),c.jsx("th",{children:"Initial carrier form"}),c.jsx("th",{children:"Romanization"})]})}),c.jsxs("tbody",{children:[c.jsxs("tr",{children:[c.jsx("td",{children:"Short a"}),c.jsx("td",{lang:"ks-Arab",children:"َ (zer)"}),c.jsx("td",{lang:"ks-Arab",children:"اَ"}),c.jsx("td",{children:"a"})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Long ā"}),c.jsx("td",{lang:"ks-Arab",children:"ا"}),c.jsx("td",{lang:"ks-Arab",children:"آ"}),c.jsx("td",{children:"ã / ạ̄"})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Short i"}),c.jsx("td",{lang:"ks-Arab",children:"ِ (pesh)"}),c.jsx("td",{lang:"ks-Arab",children:"اِ"}),c.jsx("td",{children:"i"})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Long ī"}),c.jsx("td",{lang:"ks-Arab",children:"یٖ"}),c.jsx("td",{lang:"ks-Arab",children:"ایٖ"}),c.jsx("td",{children:"yˌ"})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Short u"}),c.jsx("td",{lang:"ks-Arab",children:"ُ"}),c.jsx("td",{lang:"ks-Arab",children:"اُ"}),c.jsx("td",{children:"u"})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"High central ɨ"}),c.jsx("td",{lang:"ks-Arab",children:"ٕ"}),c.jsx("td",{lang:"ks-Arab",children:"إ"}),c.jsx("td",{children:"ɨ"})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Long central ɨ̄"}),c.jsx("td",{lang:"ks-Arab",children:"ٟ"}),c.jsx("td",{lang:"ks-Arab",children:"اٟ"}),c.jsx("td",{children:"ɨ̄"})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Open central ə̄"}),c.jsx("td",{lang:"ks-Arab",children:"ٲ"}),c.jsx("td",{lang:"ks-Arab",children:"ٲ"}),c.jsx("td",{children:"ə̄"})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Short rounded ɔ"}),c.jsx("td",{lang:"ks-Arab",children:"ۄ"}),c.jsx("td",{lang:"ks-Arab",children:"اۄ"}),c.jsx("td",{children:"ɔ"})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Close-mid rounded o"}),c.jsx("td",{lang:"ks-Arab",children:"وٚ"}),c.jsx("td",{lang:"ks-Arab",children:"اوٚ"}),c.jsx("td",{children:"wᵉ"})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"Long rounded uː"}),c.jsx("td",{lang:"ks-Arab",children:"وٗ"}),c.jsx("td",{lang:"ks-Arab",children:"اوٗ"}),c.jsx("td",{children:"w˔"})]})]})]})]}),c.jsxs("section",{id:"confusables",children:[c.jsx("h2",{children:"Confusables & spelling errors"}),c.jsx("p",{children:"The dictionary's autocorrect engine normalizes documented confusion pairs and OCR artifacts to official Unicode Kashmiri characters:"}),c.jsxs("table",{children:[c.jsx("thead",{children:c.jsxs("tr",{children:[c.jsx("th",{children:"Incorrect / Confusable code point"}),c.jsx("th",{children:"Preferred standard Kashmiri"}),c.jsx("th",{children:"Reason"})]})}),c.jsxs("tbody",{children:[c.jsxs("tr",{children:[c.jsx("td",{children:"U+066E + U+06EA (dotless beh + low stop)"}),c.jsx("td",{lang:"ks-Arab",children:"ؠ (U+0620)"}),c.jsx("td",{children:"Employed when Kashmiri yeh was absent from older fonts; corrupts semantics."})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"U+06CD (Pashto ye)"}),c.jsx("td",{lang:"ks-Arab",children:"ؠ (U+0620)"}),c.jsx("td",{children:"Appears in texts where word-final Kashmiri yeh belongs."})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"U+06C5 (Kirghiz oe)"}),c.jsx("td",{lang:"ks-Arab",children:"ۄ (U+06C4)"}),c.jsx("td",{children:"Misencoded variant for waw with ring."})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"U+065B (Vowel sign)"}),c.jsx("td",{lang:"ks-Arab",children:"ْ (U+0652 jazm)"}),c.jsx("td",{children:"Visual lookalike that breaks text parsing; sukun/jazm is the standard sign."})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"U+0643 (Arabic kaf ك)"}),c.jsx("td",{lang:"ks-Arab",children:"ک (U+06A9)"}),c.jsx("td",{children:"Kashmiri standard kaf has no interior stroke."})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"U+064A / U+0649 (Arabic yeh)"}),c.jsx("td",{lang:"ks-Arab",children:"ی (U+06CC)"}),c.jsx("td",{children:"Standard Farsi/Urdu/Kashmiri dotless yeh in isolated/final positions."})]}),c.jsxs("tr",{children:[c.jsx("td",{children:"U+0647 / U+0629 (Arabic heh / teh marbuta)"}),c.jsx("td",{lang:"ks-Arab",children:"ہ (U+06C1)"}),c.jsx("td",{children:"Heh goal is the standard Kashmiri letter."})]})]})]})]}),c.jsxs("section",{id:"numbers",children:[c.jsx("h2",{children:"Numbers & punctuation"}),c.jsxs("p",{children:["Kashmiri uses Arabic-Indic numerals (",c.jsx("span",{lang:"ks-Arab",children:"۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹"}),") and Kashmiri punctuation symbols such as comma (",c.jsx("span",{lang:"ks-Arab",children:"،"}),"), semicolon (",c.jsx("span",{lang:"ks-Arab",children:"؛"}),"), question mark (",c.jsx("span",{lang:"ks-Arab",children:"؟"}),"), and full stop (",c.jsx("span",{lang:"ks-Arab",children:"۔"}),")."]}),c.jsxs("div",{style:{marginTop:24},children:[c.jsx("button",{type:"button",className:"collection-button",style:{width:"auto",display:"inline-block",marginRight:12},onClick:t,children:"← Return to dictionary"}),c.jsx("button",{type:"button",className:"collection-button",style:{width:"auto",display:"inline-block"},onClick:e,children:"Open Kashmiri language guide →"})]})]})]})]})})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const jh="171",by=0,up=1,Cy=2,xv=1,Ry=2,pi=3,rr=0,un=1,vi=2,er=0,As=1,dp=2,hp=3,fp=4,Py=5,wr=100,Ny=101,Ly=102,Dy=103,Iy=104,Uy=200,ky=201,Fy=202,Oy=203,sd=204,ad=205,zy=206,By=207,jy=208,Hy=209,Vy=210,Gy=211,Wy=212,Xy=213,Ky=214,od=0,ld=1,cd=2,Fs=3,ud=4,dd=5,hd=6,fd=7,yv=0,qy=1,$y=2,tr=0,Yy=1,Zy=2,Qy=3,Jy=4,eS=5,tS=6,nS=7,Sv=300,Os=301,zs=302,pd=303,md=304,nc=306,gd=1e3,Rr=1001,vd=1002,Qn=1003,iS=1004,To=1005,ri=1006,Lc=1007,Pr=1008,Ci=1009,Mv=1010,Ev=1011,Ha=1012,Hh=1013,Or=1014,yi=1015,qa=1016,Vh=1017,Gh=1018,Bs=1020,wv=35902,Tv=1021,Av=1022,$n=1023,bv=1024,Cv=1025,bs=1026,js=1027,Rv=1028,Wh=1029,Pv=1030,Xh=1031,Kh=1033,rl=33776,sl=33777,al=33778,ol=33779,_d=35840,xd=35841,yd=35842,Sd=35843,Md=36196,Ed=37492,wd=37496,Td=37808,Ad=37809,bd=37810,Cd=37811,Rd=37812,Pd=37813,Nd=37814,Ld=37815,Dd=37816,Id=37817,Ud=37818,kd=37819,Fd=37820,Od=37821,ll=36492,zd=36494,Bd=36495,Nv=36283,jd=36284,Hd=36285,Vd=36286,rS=3200,sS=3201,Lv=0,aS=1,Vi="",Rn="srgb",Hs="srgb-linear",Ul="linear",ut="srgb",Gr=7680,pp=519,oS=512,lS=513,cS=514,Dv=515,uS=516,dS=517,hS=518,fS=519,mp=35044,gp="300 es",Si=2e3,kl=2001;class Ks{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Dc=Math.PI/180,Gd=180/Math.PI;function $a(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xt[t&255]+Xt[t>>8&255]+Xt[t>>16&255]+Xt[t>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[n&63|128]+Xt[n>>8&255]+"-"+Xt[n>>16&255]+Xt[n>>24&255]+Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]).toLowerCase()}function Ye(t,e,n){return Math.max(e,Math.min(n,t))}function pS(t,e){return(t%e+e)%e}function Ic(t,e,n){return(1-n)*t+n*e}function sa(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function rn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class lt{constructor(e=0,n=0){lt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(e,n,i,r,s,a,o,l,u){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,u)}set(e,n,i,r,s,a,o,l,u){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=a,f[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],u=i[1],f=i[4],p=i[7],h=i[2],m=i[5],x=i[8],S=r[0],g=r[3],d=r[6],_=r[1],y=r[4],E=r[7],R=r[2],C=r[5],b=r[8];return s[0]=a*S+o*_+l*R,s[3]=a*g+o*y+l*C,s[6]=a*d+o*E+l*b,s[1]=u*S+f*_+p*R,s[4]=u*g+f*y+p*C,s[7]=u*d+f*E+p*b,s[2]=h*S+m*_+x*R,s[5]=h*g+m*y+x*C,s[8]=h*d+m*E+x*b,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],u=e[7],f=e[8];return n*a*f-n*o*u-i*s*f+i*o*l+r*s*u-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],u=e[7],f=e[8],p=f*a-o*u,h=o*l-f*s,m=u*s-a*l,x=n*p+i*h+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/x;return e[0]=p*S,e[1]=(r*u-f*i)*S,e[2]=(o*i-r*a)*S,e[3]=h*S,e[4]=(f*n-r*l)*S,e[5]=(r*s-o*n)*S,e[6]=m*S,e[7]=(i*l-u*n)*S,e[8]=(a*n-i*s)*S,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*a+u*o)+a+e,-r*u,r*l,-r*(-u*a+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(Uc.makeScale(e,n)),this}rotate(e){return this.premultiply(Uc.makeRotation(-e)),this}translate(e,n){return this.premultiply(Uc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Uc=new je;function Iv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Fl(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function mS(){const t=Fl("canvas");return t.style.display="block",t}const vp={};function rs(t){t in vp||(vp[t]=!0,console.warn(t))}function gS(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function vS(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function _S(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const _p=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xp=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xS(){const t={enabled:!0,workingColorSpace:Hs,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ut&&(r.r=Ei(r.r),r.g=Ei(r.g),r.b=Ei(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ut&&(r.r=Cs(r.r),r.g=Cs(r.g),r.b=Cs(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Vi?Ul:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Hs]:{primaries:e,whitePoint:i,transfer:Ul,toXYZ:_p,fromXYZ:xp,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Rn},outputColorSpaceConfig:{drawingBufferColorSpace:Rn}},[Rn]:{primaries:e,whitePoint:i,transfer:ut,toXYZ:_p,fromXYZ:xp,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Rn}}}),t}const tt=xS();function Ei(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Cs(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Wr;class yS{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Wr===void 0&&(Wr=Fl("canvas")),Wr.width=e.width,Wr.height=e.height;const i=Wr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Wr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Fl("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ei(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ei(n[i]/255)*255):n[i]=Ei(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let SS=0;class Uv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:SS++}),this.uuid=$a(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(kc(r[a].image)):s.push(kc(r[a]))}else s=kc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function kc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?yS.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let MS=0;class dn extends Ks{constructor(e=dn.DEFAULT_IMAGE,n=dn.DEFAULT_MAPPING,i=Rr,r=Rr,s=ri,a=Pr,o=$n,l=Ci,u=dn.DEFAULT_ANISOTROPY,f=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:MS++}),this.uuid=$a(),this.name="",this.source=new Uv(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=l,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case gd:e.x=e.x-Math.floor(e.x);break;case Rr:e.x=e.x<0?0:1;break;case vd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case gd:e.y=e.y-Math.floor(e.y);break;case Rr:e.y=e.y<0?0:1;break;case vd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=Sv;dn.DEFAULT_ANISOTROPY=1;class At{constructor(e=0,n=0,i=0,r=1){At.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,u=l[0],f=l[4],p=l[8],h=l[1],m=l[5],x=l[9],S=l[2],g=l[6],d=l[10];if(Math.abs(f-h)<.01&&Math.abs(p-S)<.01&&Math.abs(x-g)<.01){if(Math.abs(f+h)<.1&&Math.abs(p+S)<.1&&Math.abs(x+g)<.1&&Math.abs(u+m+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const y=(u+1)/2,E=(m+1)/2,R=(d+1)/2,C=(f+h)/4,b=(p+S)/4,P=(x+g)/4;return y>E&&y>R?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=C/i,s=b/i):E>R?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=C/r,s=P/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=b/s,r=P/s),this.set(i,r,s,n),this}let _=Math.sqrt((g-x)*(g-x)+(p-S)*(p-S)+(h-f)*(h-f));return Math.abs(_)<.001&&(_=1),this.x=(g-x)/_,this.y=(p-S)/_,this.z=(h-f)/_,this.w=Math.acos((u+m+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this.w=Ye(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this.w=Ye(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ES extends Ks{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new At(0,0,e,n),this.scissorTest=!1,this.viewport=new At(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ri,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new dn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new Uv(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zr extends ES{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class kv extends dn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=Rr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class wS extends dn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Qn,this.minFilter=Qn,this.wrapR=Rr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ya{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],u=i[r+1],f=i[r+2],p=i[r+3];const h=s[a+0],m=s[a+1],x=s[a+2],S=s[a+3];if(o===0){e[n+0]=l,e[n+1]=u,e[n+2]=f,e[n+3]=p;return}if(o===1){e[n+0]=h,e[n+1]=m,e[n+2]=x,e[n+3]=S;return}if(p!==S||l!==h||u!==m||f!==x){let g=1-o;const d=l*h+u*m+f*x+p*S,_=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){const R=Math.sqrt(y),C=Math.atan2(R,d*_);g=Math.sin(g*C)/R,o=Math.sin(o*C)/R}const E=o*_;if(l=l*g+h*E,u=u*g+m*E,f=f*g+x*E,p=p*g+S*E,g===1-o){const R=1/Math.sqrt(l*l+u*u+f*f+p*p);l*=R,u*=R,f*=R,p*=R}}e[n]=l,e[n+1]=u,e[n+2]=f,e[n+3]=p}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],u=i[r+2],f=i[r+3],p=s[a],h=s[a+1],m=s[a+2],x=s[a+3];return e[n]=o*x+f*p+l*m-u*h,e[n+1]=l*x+f*h+u*p-o*m,e[n+2]=u*x+f*m+o*h-l*p,e[n+3]=f*x-o*p-l*h-u*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,u=o(i/2),f=o(r/2),p=o(s/2),h=l(i/2),m=l(r/2),x=l(s/2);switch(a){case"XYZ":this._x=h*f*p+u*m*x,this._y=u*m*p-h*f*x,this._z=u*f*x+h*m*p,this._w=u*f*p-h*m*x;break;case"YXZ":this._x=h*f*p+u*m*x,this._y=u*m*p-h*f*x,this._z=u*f*x-h*m*p,this._w=u*f*p+h*m*x;break;case"ZXY":this._x=h*f*p-u*m*x,this._y=u*m*p+h*f*x,this._z=u*f*x+h*m*p,this._w=u*f*p-h*m*x;break;case"ZYX":this._x=h*f*p-u*m*x,this._y=u*m*p+h*f*x,this._z=u*f*x-h*m*p,this._w=u*f*p+h*m*x;break;case"YZX":this._x=h*f*p+u*m*x,this._y=u*m*p+h*f*x,this._z=u*f*x-h*m*p,this._w=u*f*p-h*m*x;break;case"XZY":this._x=h*f*p-u*m*x,this._y=u*m*p-h*f*x,this._z=u*f*x+h*m*p,this._w=u*f*p+h*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],u=n[2],f=n[6],p=n[10],h=i+o+p;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(f-l)*m,this._y=(s-u)*m,this._z=(a-r)*m}else if(i>o&&i>p){const m=2*Math.sqrt(1+i-o-p);this._w=(f-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+u)/m}else if(o>p){const m=2*Math.sqrt(1+o-i-p);this._w=(s-u)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+f)/m}else{const m=2*Math.sqrt(1+p-i-o);this._w=(a-r)/m,this._x=(s+u)/m,this._y=(l+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,u=n._z,f=n._w;return this._x=i*f+a*o+r*u-s*l,this._y=r*f+a*l+s*o-i*u,this._z=s*f+a*u+i*l-r*o,this._w=a*f-i*o-r*l-s*u,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-n;return this._w=m*a+n*this._w,this._x=m*i+n*this._x,this._y=m*r+n*this._y,this._z=m*s+n*this._z,this.normalize(),this}const u=Math.sqrt(l),f=Math.atan2(u,o),p=Math.sin((1-n)*f)/u,h=Math.sin(n*f)/u;return this._w=a*p+this._w*h,this._x=i*p+this._x*h,this._y=r*p+this._y*h,this._z=s*p+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(e=0,n=0,i=0){H.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(yp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(yp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,u=2*(a*r-o*i),f=2*(o*n-s*r),p=2*(s*i-a*n);return this.x=n+l*u+a*p-o*f,this.y=i+l*f+o*u-s*p,this.z=r+l*p+s*f-a*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Fc.copy(this).projectOnVector(e),this.sub(Fc)}reflect(e){return this.sub(Fc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fc=new H,yp=new Ya;class Za{constructor(e=new H(1/0,1/0,1/0),n=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Hn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Hn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Hn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Hn):Hn.fromBufferAttribute(s,a),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ao.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ao.copy(i.boundingBox)),Ao.applyMatrix4(e.matrixWorld),this.union(Ao)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(aa),bo.subVectors(this.max,aa),Xr.subVectors(e.a,aa),Kr.subVectors(e.b,aa),qr.subVectors(e.c,aa),Di.subVectors(Kr,Xr),Ii.subVectors(qr,Kr),hr.subVectors(Xr,qr);let n=[0,-Di.z,Di.y,0,-Ii.z,Ii.y,0,-hr.z,hr.y,Di.z,0,-Di.x,Ii.z,0,-Ii.x,hr.z,0,-hr.x,-Di.y,Di.x,0,-Ii.y,Ii.x,0,-hr.y,hr.x,0];return!Oc(n,Xr,Kr,qr,bo)||(n=[1,0,0,0,1,0,0,0,1],!Oc(n,Xr,Kr,qr,bo))?!1:(Co.crossVectors(Di,Ii),n=[Co.x,Co.y,Co.z],Oc(n,Xr,Kr,qr,bo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ci=[new H,new H,new H,new H,new H,new H,new H,new H],Hn=new H,Ao=new Za,Xr=new H,Kr=new H,qr=new H,Di=new H,Ii=new H,hr=new H,aa=new H,bo=new H,Co=new H,fr=new H;function Oc(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){fr.fromArray(t,s);const o=r.x*Math.abs(fr.x)+r.y*Math.abs(fr.y)+r.z*Math.abs(fr.z),l=e.dot(fr),u=n.dot(fr),f=i.dot(fr);if(Math.max(-Math.max(l,u,f),Math.min(l,u,f))>o)return!1}return!0}const TS=new Za,oa=new H,zc=new H;class qh{constructor(e=new H,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):TS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;oa.subVectors(e,this.center);const n=oa.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(oa,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(oa.copy(e.center).add(zc)),this.expandByPoint(oa.copy(e.center).sub(zc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ui=new H,Bc=new H,Ro=new H,Ui=new H,jc=new H,Po=new H,Hc=new H;class AS{constructor(e=new H,n=new H(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ui)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ui.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ui.copy(this.origin).addScaledVector(this.direction,n),ui.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Bc.copy(e).add(n).multiplyScalar(.5),Ro.copy(n).sub(e).normalize(),Ui.copy(this.origin).sub(Bc);const s=e.distanceTo(n)*.5,a=-this.direction.dot(Ro),o=Ui.dot(this.direction),l=-Ui.dot(Ro),u=Ui.lengthSq(),f=Math.abs(1-a*a);let p,h,m,x;if(f>0)if(p=a*l-o,h=a*o-l,x=s*f,p>=0)if(h>=-x)if(h<=x){const S=1/f;p*=S,h*=S,m=p*(p+a*h+2*o)+h*(a*p+h+2*l)+u}else h=s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*l)+u;else h=-s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*l)+u;else h<=-x?(p=Math.max(0,-(-a*s+o)),h=p>0?-s:Math.min(Math.max(-s,-l),s),m=-p*p+h*(h+2*l)+u):h<=x?(p=0,h=Math.min(Math.max(-s,-l),s),m=h*(h+2*l)+u):(p=Math.max(0,-(a*s+o)),h=p>0?s:Math.min(Math.max(-s,-l),s),m=-p*p+h*(h+2*l)+u);else h=a>0?-s:s,p=Math.max(0,-(a*h+o)),m=-p*p+h*(h+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Bc).addScaledVector(Ro,h),m}intersectSphere(e,n){ui.subVectors(e.center,this.origin);const i=ui.dot(this.direction),r=ui.dot(ui)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const u=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,h=this.origin;return u>=0?(i=(e.min.x-h.x)*u,r=(e.max.x-h.x)*u):(i=(e.max.x-h.x)*u,r=(e.min.x-h.x)*u),f>=0?(s=(e.min.y-h.y)*f,a=(e.max.y-h.y)*f):(s=(e.max.y-h.y)*f,a=(e.min.y-h.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),p>=0?(o=(e.min.z-h.z)*p,l=(e.max.z-h.z)*p):(o=(e.max.z-h.z)*p,l=(e.min.z-h.z)*p),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,ui)!==null}intersectTriangle(e,n,i,r,s){jc.subVectors(n,e),Po.subVectors(i,e),Hc.crossVectors(jc,Po);let a=this.direction.dot(Hc),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ui.subVectors(this.origin,e);const l=o*this.direction.dot(Po.crossVectors(Ui,Po));if(l<0)return null;const u=o*this.direction.dot(jc.cross(Ui));if(u<0||l+u>a)return null;const f=-o*Ui.dot(Hc);return f<0?null:this.at(f/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pt{constructor(e,n,i,r,s,a,o,l,u,f,p,h,m,x,S,g){Pt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,u,f,p,h,m,x,S,g)}set(e,n,i,r,s,a,o,l,u,f,p,h,m,x,S,g){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=u,d[6]=f,d[10]=p,d[14]=h,d[3]=m,d[7]=x,d[11]=S,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/$r.setFromMatrixColumn(e,0).length(),s=1/$r.setFromMatrixColumn(e,1).length(),a=1/$r.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),u=Math.sin(r),f=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const h=a*f,m=a*p,x=o*f,S=o*p;n[0]=l*f,n[4]=-l*p,n[8]=u,n[1]=m+x*u,n[5]=h-S*u,n[9]=-o*l,n[2]=S-h*u,n[6]=x+m*u,n[10]=a*l}else if(e.order==="YXZ"){const h=l*f,m=l*p,x=u*f,S=u*p;n[0]=h+S*o,n[4]=x*o-m,n[8]=a*u,n[1]=a*p,n[5]=a*f,n[9]=-o,n[2]=m*o-x,n[6]=S+h*o,n[10]=a*l}else if(e.order==="ZXY"){const h=l*f,m=l*p,x=u*f,S=u*p;n[0]=h-S*o,n[4]=-a*p,n[8]=x+m*o,n[1]=m+x*o,n[5]=a*f,n[9]=S-h*o,n[2]=-a*u,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const h=a*f,m=a*p,x=o*f,S=o*p;n[0]=l*f,n[4]=x*u-m,n[8]=h*u+S,n[1]=l*p,n[5]=S*u+h,n[9]=m*u-x,n[2]=-u,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const h=a*l,m=a*u,x=o*l,S=o*u;n[0]=l*f,n[4]=S-h*p,n[8]=x*p+m,n[1]=p,n[5]=a*f,n[9]=-o*f,n[2]=-u*f,n[6]=m*p+x,n[10]=h-S*p}else if(e.order==="XZY"){const h=a*l,m=a*u,x=o*l,S=o*u;n[0]=l*f,n[4]=-p,n[8]=u*f,n[1]=h*p+S,n[5]=a*f,n[9]=m*p-x,n[2]=x*p-m,n[6]=o*f,n[10]=S*p+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bS,e,CS)}lookAt(e,n,i){const r=this.elements;return gn.subVectors(e,n),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),ki.crossVectors(i,gn),ki.lengthSq()===0&&(Math.abs(i.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),ki.crossVectors(i,gn)),ki.normalize(),No.crossVectors(gn,ki),r[0]=ki.x,r[4]=No.x,r[8]=gn.x,r[1]=ki.y,r[5]=No.y,r[9]=gn.y,r[2]=ki.z,r[6]=No.z,r[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],u=i[12],f=i[1],p=i[5],h=i[9],m=i[13],x=i[2],S=i[6],g=i[10],d=i[14],_=i[3],y=i[7],E=i[11],R=i[15],C=r[0],b=r[4],P=r[8],T=r[12],w=r[1],N=r[5],k=r[9],B=r[13],G=r[2],ee=r[6],Y=r[10],te=r[14],D=r[3],Q=r[7],J=r[11],he=r[15];return s[0]=a*C+o*w+l*G+u*D,s[4]=a*b+o*N+l*ee+u*Q,s[8]=a*P+o*k+l*Y+u*J,s[12]=a*T+o*B+l*te+u*he,s[1]=f*C+p*w+h*G+m*D,s[5]=f*b+p*N+h*ee+m*Q,s[9]=f*P+p*k+h*Y+m*J,s[13]=f*T+p*B+h*te+m*he,s[2]=x*C+S*w+g*G+d*D,s[6]=x*b+S*N+g*ee+d*Q,s[10]=x*P+S*k+g*Y+d*J,s[14]=x*T+S*B+g*te+d*he,s[3]=_*C+y*w+E*G+R*D,s[7]=_*b+y*N+E*ee+R*Q,s[11]=_*P+y*k+E*Y+R*J,s[15]=_*T+y*B+E*te+R*he,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],u=e[13],f=e[2],p=e[6],h=e[10],m=e[14],x=e[3],S=e[7],g=e[11],d=e[15];return x*(+s*l*p-r*u*p-s*o*h+i*u*h+r*o*m-i*l*m)+S*(+n*l*m-n*u*h+s*a*h-r*a*m+r*u*f-s*l*f)+g*(+n*u*p-n*o*m-s*a*p+i*a*m+s*o*f-i*u*f)+d*(-r*o*f-n*l*p+n*o*h+r*a*p-i*a*h+i*l*f)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],u=e[7],f=e[8],p=e[9],h=e[10],m=e[11],x=e[12],S=e[13],g=e[14],d=e[15],_=p*g*u-S*h*u+S*l*m-o*g*m-p*l*d+o*h*d,y=x*h*u-f*g*u-x*l*m+a*g*m+f*l*d-a*h*d,E=f*S*u-x*p*u+x*o*m-a*S*m-f*o*d+a*p*d,R=x*p*l-f*S*l-x*o*h+a*S*h+f*o*g-a*p*g,C=n*_+i*y+r*E+s*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/C;return e[0]=_*b,e[1]=(S*h*s-p*g*s-S*r*m+i*g*m+p*r*d-i*h*d)*b,e[2]=(o*g*s-S*l*s+S*r*u-i*g*u-o*r*d+i*l*d)*b,e[3]=(p*l*s-o*h*s-p*r*u+i*h*u+o*r*m-i*l*m)*b,e[4]=y*b,e[5]=(f*g*s-x*h*s+x*r*m-n*g*m-f*r*d+n*h*d)*b,e[6]=(x*l*s-a*g*s-x*r*u+n*g*u+a*r*d-n*l*d)*b,e[7]=(a*h*s-f*l*s+f*r*u-n*h*u-a*r*m+n*l*m)*b,e[8]=E*b,e[9]=(x*p*s-f*S*s-x*i*m+n*S*m+f*i*d-n*p*d)*b,e[10]=(a*S*s-x*o*s+x*i*u-n*S*u-a*i*d+n*o*d)*b,e[11]=(f*o*s-a*p*s-f*i*u+n*p*u+a*i*m-n*o*m)*b,e[12]=R*b,e[13]=(f*S*r-x*p*r+x*i*h-n*S*h-f*i*g+n*p*g)*b,e[14]=(x*o*r-a*S*r-x*i*l+n*S*l+a*i*g-n*o*g)*b,e[15]=(a*p*r-f*o*r+f*i*l-n*p*l-a*i*h+n*o*h)*b,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,u=s*a,f=s*o;return this.set(u*a+i,u*o-r*l,u*l+r*o,0,u*o+r*l,f*o+i,f*l-r*a,0,u*l-r*o,f*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,u=s+s,f=a+a,p=o+o,h=s*u,m=s*f,x=s*p,S=a*f,g=a*p,d=o*p,_=l*u,y=l*f,E=l*p,R=i.x,C=i.y,b=i.z;return r[0]=(1-(S+d))*R,r[1]=(m+E)*R,r[2]=(x-y)*R,r[3]=0,r[4]=(m-E)*C,r[5]=(1-(h+d))*C,r[6]=(g+_)*C,r[7]=0,r[8]=(x+y)*b,r[9]=(g-_)*b,r[10]=(1-(h+S))*b,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=$r.set(r[0],r[1],r[2]).length();const a=$r.set(r[4],r[5],r[6]).length(),o=$r.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Vn.copy(this);const u=1/s,f=1/a,p=1/o;return Vn.elements[0]*=u,Vn.elements[1]*=u,Vn.elements[2]*=u,Vn.elements[4]*=f,Vn.elements[5]*=f,Vn.elements[6]*=f,Vn.elements[8]*=p,Vn.elements[9]*=p,Vn.elements[10]*=p,n.setFromRotationMatrix(Vn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,n,i,r,s,a,o=Si){const l=this.elements,u=2*s/(n-e),f=2*s/(i-r),p=(n+e)/(n-e),h=(i+r)/(i-r);let m,x;if(o===Si)m=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===kl)m=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=f,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=Si){const l=this.elements,u=1/(n-e),f=1/(i-r),p=1/(a-s),h=(n+e)*u,m=(i+r)*f;let x,S;if(o===Si)x=(a+s)*p,S=-2*p;else if(o===kl)x=s*p,S=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*f,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=S,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const $r=new H,Vn=new Pt,bS=new H(0,0,0),CS=new H(1,1,1),ki=new H,No=new H,gn=new H,Sp=new Pt,Mp=new Ya;class li{constructor(e=0,n=0,i=0,r=li.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],u=r[5],f=r[9],p=r[2],h=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Sp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Sp,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Mp.setFromEuler(this),this.setFromQuaternion(Mp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}li.DEFAULT_ORDER="XYZ";class Fv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let RS=0;const Ep=new H,Yr=new Ya,di=new Pt,Lo=new H,la=new H,PS=new H,NS=new Ya,wp=new H(1,0,0),Tp=new H(0,1,0),Ap=new H(0,0,1),bp={type:"added"},LS={type:"removed"},Zr={type:"childadded",child:null},Vc={type:"childremoved",child:null};class hn extends Ks{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:RS++}),this.uuid=$a(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=hn.DEFAULT_UP.clone();const e=new H,n=new li,i=new Ya,r=new H(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Pt},normalMatrix:{value:new je}}),this.matrix=new Pt,this.matrixWorld=new Pt,this.matrixAutoUpdate=hn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Yr.setFromAxisAngle(e,n),this.quaternion.multiply(Yr),this}rotateOnWorldAxis(e,n){return Yr.setFromAxisAngle(e,n),this.quaternion.premultiply(Yr),this}rotateX(e){return this.rotateOnAxis(wp,e)}rotateY(e){return this.rotateOnAxis(Tp,e)}rotateZ(e){return this.rotateOnAxis(Ap,e)}translateOnAxis(e,n){return Ep.copy(e).applyQuaternion(this.quaternion),this.position.add(Ep.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(wp,e)}translateY(e){return this.translateOnAxis(Tp,e)}translateZ(e){return this.translateOnAxis(Ap,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Lo.copy(e):Lo.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),la.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(la,Lo,this.up):di.lookAt(Lo,la,this.up),this.quaternion.setFromRotationMatrix(di),r&&(di.extractRotation(r.matrixWorld),Yr.setFromRotationMatrix(di),this.quaternion.premultiply(Yr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bp),Zr.child=e,this.dispatchEvent(Zr),Zr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(LS),Vc.child=e,this.dispatchEvent(Vc),Vc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bp),Zr.child=e,this.dispatchEvent(Zr),Zr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(la,e,PS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(la,NS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let u=0,f=l.length;u<f;u++){const p=l[u];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,u=this.material.length;l<u;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),u=a(e.textures),f=a(e.images),p=a(e.shapes),h=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),f.length>0&&(i.images=f),p.length>0&&(i.shapes=p),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){const l=[];for(const u in o){const f=o[u];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}hn.DEFAULT_UP=new H(0,1,0);hn.DEFAULT_MATRIX_AUTO_UPDATE=!0;hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Gn=new H,hi=new H,Gc=new H,fi=new H,Qr=new H,Jr=new H,Cp=new H,Wc=new H,Xc=new H,Kc=new H,qc=new At,$c=new At,Yc=new At;class qn{constructor(e=new H,n=new H,i=new H){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Gn.subVectors(e,n),r.cross(Gn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Gn.subVectors(r,n),hi.subVectors(i,n),Gc.subVectors(e,n);const a=Gn.dot(Gn),o=Gn.dot(hi),l=Gn.dot(Gc),u=hi.dot(hi),f=hi.dot(Gc),p=a*u-o*o;if(p===0)return s.set(0,0,0),null;const h=1/p,m=(u*l-o*f)*h,x=(a*f-o*l)*h;return s.set(1-m-x,x,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,fi.x),l.addScaledVector(a,fi.y),l.addScaledVector(o,fi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return qc.setScalar(0),$c.setScalar(0),Yc.setScalar(0),qc.fromBufferAttribute(e,n),$c.fromBufferAttribute(e,i),Yc.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(qc,s.x),a.addScaledVector($c,s.y),a.addScaledVector(Yc,s.z),a}static isFrontFacing(e,n,i,r){return Gn.subVectors(i,n),hi.subVectors(e,n),Gn.cross(hi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),Gn.cross(hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return qn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return qn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;Qr.subVectors(r,i),Jr.subVectors(s,i),Wc.subVectors(e,i);const l=Qr.dot(Wc),u=Jr.dot(Wc);if(l<=0&&u<=0)return n.copy(i);Xc.subVectors(e,r);const f=Qr.dot(Xc),p=Jr.dot(Xc);if(f>=0&&p<=f)return n.copy(r);const h=l*p-f*u;if(h<=0&&l>=0&&f<=0)return a=l/(l-f),n.copy(i).addScaledVector(Qr,a);Kc.subVectors(e,s);const m=Qr.dot(Kc),x=Jr.dot(Kc);if(x>=0&&m<=x)return n.copy(s);const S=m*u-l*x;if(S<=0&&u>=0&&x<=0)return o=u/(u-x),n.copy(i).addScaledVector(Jr,o);const g=f*x-m*p;if(g<=0&&p-f>=0&&m-x>=0)return Cp.subVectors(s,r),o=(p-f)/(p-f+(m-x)),n.copy(r).addScaledVector(Cp,o);const d=1/(g+S+h);return a=S*d,o=h*d,n.copy(i).addScaledVector(Qr,a).addScaledVector(Jr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ov={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fi={h:0,s:0,l:0},Do={h:0,s:0,l:0};function Zc(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class it{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Rn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=tt.workingColorSpace){return this.r=e,this.g=n,this.b=i,tt.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=tt.workingColorSpace){if(e=pS(e,1),n=Ye(n,0,1),i=Ye(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Zc(a,s,e+1/3),this.g=Zc(a,s,e),this.b=Zc(a,s,e-1/3)}return tt.toWorkingColorSpace(this,r),this}setStyle(e,n=Rn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Rn){const i=Ov[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}copyLinearToSRGB(e){return this.r=Cs(e.r),this.g=Cs(e.g),this.b=Cs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rn){return tt.fromWorkingColorSpace(Kt.copy(this),e),Math.round(Ye(Kt.r*255,0,255))*65536+Math.round(Ye(Kt.g*255,0,255))*256+Math.round(Ye(Kt.b*255,0,255))}getHexString(e=Rn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=tt.workingColorSpace){tt.fromWorkingColorSpace(Kt.copy(this),n);const i=Kt.r,r=Kt.g,s=Kt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,u;const f=(o+a)/2;if(o===a)l=0,u=0;else{const p=a-o;switch(u=f<=.5?p/(a+o):p/(2-a-o),a){case i:l=(r-s)/p+(r<s?6:0);break;case r:l=(s-i)/p+2;break;case s:l=(i-r)/p+4;break}l/=6}return e.h=l,e.s=u,e.l=f,e}getRGB(e,n=tt.workingColorSpace){return tt.fromWorkingColorSpace(Kt.copy(this),n),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=Rn){tt.fromWorkingColorSpace(Kt.copy(this),e);const n=Kt.r,i=Kt.g,r=Kt.b;return e!==Rn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Fi),this.setHSL(Fi.h+e,Fi.s+n,Fi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Fi),e.getHSL(Do);const i=Ic(Fi.h,Do.h,n),r=Ic(Fi.s,Do.s,n),s=Ic(Fi.l,Do.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Kt=new it;it.NAMES=Ov;let DS=0;class Qa extends Ks{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:DS++}),this.uuid=$a(),this.name="",this.type="Material",this.blending=As,this.side=rr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sd,this.blendDst=ad,this.blendEquation=wr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=Fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gr,this.stencilZFail=Gr,this.stencilZPass=Gr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==As&&(i.blending=this.blending),this.side!==rr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==sd&&(i.blendSrc=this.blendSrc),this.blendDst!==ad&&(i.blendDst=this.blendDst),this.blendEquation!==wr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Fs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Gr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Gr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ol extends Qa{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=yv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ct=new H,Io=new lt;class oi{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=mp,this.updateRanges=[],this.gpuType=yi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Io.fromBufferAttribute(this,n),Io.applyMatrix3(e),this.setXY(n,Io.x,Io.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ct.fromBufferAttribute(this,n),Ct.applyMatrix3(e),this.setXYZ(n,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ct.fromBufferAttribute(this,n),Ct.applyMatrix4(e),this.setXYZ(n,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ct.fromBufferAttribute(this,n),Ct.applyNormalMatrix(e),this.setXYZ(n,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ct.fromBufferAttribute(this,n),Ct.transformDirection(e),this.setXYZ(n,Ct.x,Ct.y,Ct.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=sa(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=rn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=sa(n,this.array)),n}setX(e,n){return this.normalized&&(n=rn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=sa(n,this.array)),n}setY(e,n){return this.normalized&&(n=rn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=sa(n,this.array)),n}setZ(e,n){return this.normalized&&(n=rn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=sa(n,this.array)),n}setW(e,n){return this.normalized&&(n=rn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=rn(n,this.array),i=rn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=rn(n,this.array),i=rn(i,this.array),r=rn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=rn(n,this.array),i=rn(i,this.array),r=rn(r,this.array),s=rn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==mp&&(e.usage=this.usage),e}}class zv extends oi{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Bv extends oi{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Mn extends oi{constructor(e,n,i){super(new Float32Array(e),n,i)}}let IS=0;const Cn=new Pt,Qc=new hn,es=new H,vn=new Za,ca=new Za,Ft=new H;class Pi extends Ks{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:IS++}),this.uuid=$a(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Iv(e)?Bv:zv)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Cn.makeRotationFromQuaternion(e),this.applyMatrix4(Cn),this}rotateX(e){return Cn.makeRotationX(e),this.applyMatrix4(Cn),this}rotateY(e){return Cn.makeRotationY(e),this.applyMatrix4(Cn),this}rotateZ(e){return Cn.makeRotationZ(e),this.applyMatrix4(Cn),this}translate(e,n,i){return Cn.makeTranslation(e,n,i),this.applyMatrix4(Cn),this}scale(e,n,i){return Cn.makeScale(e,n,i),this.applyMatrix4(Cn),this}lookAt(e){return Qc.lookAt(e),Qc.updateMatrix(),this.applyMatrix4(Qc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Mn(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Za);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];vn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qh);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const i=this.boundingSphere.center;if(vn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];ca.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(vn.min,ca.min),vn.expandByPoint(Ft),Ft.addVectors(vn.max,ca.max),vn.expandByPoint(Ft)):(vn.expandByPoint(ca.min),vn.expandByPoint(ca.max))}vn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ft.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ft));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let u=0,f=o.count;u<f;u++)Ft.fromBufferAttribute(o,u),l&&(es.fromBufferAttribute(e,u),Ft.add(es)),r=Math.max(r,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new oi(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<i.count;P++)o[P]=new H,l[P]=new H;const u=new H,f=new H,p=new H,h=new lt,m=new lt,x=new lt,S=new H,g=new H;function d(P,T,w){u.fromBufferAttribute(i,P),f.fromBufferAttribute(i,T),p.fromBufferAttribute(i,w),h.fromBufferAttribute(s,P),m.fromBufferAttribute(s,T),x.fromBufferAttribute(s,w),f.sub(u),p.sub(u),m.sub(h),x.sub(h);const N=1/(m.x*x.y-x.x*m.y);isFinite(N)&&(S.copy(f).multiplyScalar(x.y).addScaledVector(p,-m.y).multiplyScalar(N),g.copy(p).multiplyScalar(m.x).addScaledVector(f,-x.x).multiplyScalar(N),o[P].add(S),o[T].add(S),o[w].add(S),l[P].add(g),l[T].add(g),l[w].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let P=0,T=_.length;P<T;++P){const w=_[P],N=w.start,k=w.count;for(let B=N,G=N+k;B<G;B+=3)d(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const y=new H,E=new H,R=new H,C=new H;function b(P){R.fromBufferAttribute(r,P),C.copy(R);const T=o[P];y.copy(T),y.sub(R.multiplyScalar(R.dot(T))).normalize(),E.crossVectors(C,T);const N=E.dot(l[P])<0?-1:1;a.setXYZW(P,y.x,y.y,y.z,N)}for(let P=0,T=_.length;P<T;++P){const w=_[P],N=w.start,k=w.count;for(let B=N,G=N+k;B<G;B+=3)b(e.getX(B+0)),b(e.getX(B+1)),b(e.getX(B+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new oi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new H,s=new H,a=new H,o=new H,l=new H,u=new H,f=new H,p=new H;if(e)for(let h=0,m=e.count;h<m;h+=3){const x=e.getX(h+0),S=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(n,x),s.fromBufferAttribute(n,S),a.fromBufferAttribute(n,g),f.subVectors(a,s),p.subVectors(r,s),f.cross(p),o.fromBufferAttribute(i,x),l.fromBufferAttribute(i,S),u.fromBufferAttribute(i,g),o.add(f),l.add(f),u.add(f),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(g,u.x,u.y,u.z)}else for(let h=0,m=n.count;h<m;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),f.subVectors(a,s),p.subVectors(r,s),f.cross(p),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ft.fromBufferAttribute(e,n),Ft.normalize(),e.setXYZ(n,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,l){const u=o.array,f=o.itemSize,p=o.normalized,h=new u.constructor(l.length*f);let m=0,x=0;for(let S=0,g=l.length;S<g;S++){o.isInterleavedBufferAttribute?m=l[S]*o.data.stride+o.offset:m=l[S]*f;for(let d=0;d<f;d++)h[x++]=u[m++]}return new oi(h,f,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Pi,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],u=e(l,i);n.setAttribute(o,u)}const s=this.morphAttributes;for(const o in s){const l=[],u=s[o];for(let f=0,p=u.length;f<p;f++){const h=u[f],m=e(h,i);l.push(m)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const u=a[o];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],f=[];for(let p=0,h=u.length;p<h;p++){const m=u[p];f.push(m.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const u in r){const f=r[u];this.setAttribute(u,f.clone(n))}const s=e.morphAttributes;for(const u in s){const f=[],p=s[u];for(let h=0,m=p.length;h<m;h++)f.push(p[h].clone(n));this.morphAttributes[u]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let u=0,f=a.length;u<f;u++){const p=a[u];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rp=new Pt,pr=new AS,Uo=new qh,Pp=new H,ko=new H,Fo=new H,Oo=new H,Jc=new H,zo=new H,Np=new H,Bo=new H;class yn extends hn{constructor(e=new Pi,n=new Ol){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){zo.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const f=o[l],p=s[l];f!==0&&(Jc.fromBufferAttribute(p,e),a?zo.addScaledVector(Jc,f):zo.addScaledVector(Jc.sub(n),f))}n.add(zo)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Uo.copy(i.boundingSphere),Uo.applyMatrix4(s),pr.copy(e.ray).recast(e.near),!(Uo.containsPoint(pr.origin)===!1&&(pr.intersectSphere(Uo,Pp)===null||pr.origin.distanceToSquared(Pp)>(e.far-e.near)**2))&&(Rp.copy(s).invert(),pr.copy(e.ray).applyMatrix4(Rp),!(i.boundingBox!==null&&pr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,pr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,u=s.attributes.uv,f=s.attributes.uv1,p=s.attributes.normal,h=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,S=h.length;x<S;x++){const g=h[x],d=a[g.materialIndex],_=Math.max(g.start,m.start),y=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let E=_,R=y;E<R;E+=3){const C=o.getX(E),b=o.getX(E+1),P=o.getX(E+2);r=jo(this,d,e,i,u,f,p,C,b,P),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const x=Math.max(0,m.start),S=Math.min(o.count,m.start+m.count);for(let g=x,d=S;g<d;g+=3){const _=o.getX(g),y=o.getX(g+1),E=o.getX(g+2);r=jo(this,a,e,i,u,f,p,_,y,E),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,S=h.length;x<S;x++){const g=h[x],d=a[g.materialIndex],_=Math.max(g.start,m.start),y=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let E=_,R=y;E<R;E+=3){const C=E,b=E+1,P=E+2;r=jo(this,d,e,i,u,f,p,C,b,P),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const x=Math.max(0,m.start),S=Math.min(l.count,m.start+m.count);for(let g=x,d=S;g<d;g+=3){const _=g,y=g+1,E=g+2;r=jo(this,a,e,i,u,f,p,_,y,E),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function US(t,e,n,i,r,s,a,o){let l;if(e.side===un?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===rr,o),l===null)return null;Bo.copy(o),Bo.applyMatrix4(t.matrixWorld);const u=n.ray.origin.distanceTo(Bo);return u<n.near||u>n.far?null:{distance:u,point:Bo.clone(),object:t}}function jo(t,e,n,i,r,s,a,o,l,u){t.getVertexPosition(o,ko),t.getVertexPosition(l,Fo),t.getVertexPosition(u,Oo);const f=US(t,e,n,i,ko,Fo,Oo,Np);if(f){const p=new H;qn.getBarycoord(Np,ko,Fo,Oo,p),r&&(f.uv=qn.getInterpolatedAttribute(r,o,l,u,p,new lt)),s&&(f.uv1=qn.getInterpolatedAttribute(s,o,l,u,p,new lt)),a&&(f.normal=qn.getInterpolatedAttribute(a,o,l,u,p,new H),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const h={a:o,b:l,c:u,normal:new H,materialIndex:0};qn.getNormal(ko,Fo,Oo,h.normal),f.face=h,f.barycoord=p}return f}class Ja extends Pi{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],u=[],f=[],p=[];let h=0,m=0;x("z","y","x",-1,-1,i,n,e,a,s,0),x("z","y","x",1,-1,i,n,-e,a,s,1),x("x","z","y",1,1,e,i,n,r,a,2),x("x","z","y",1,-1,e,i,-n,r,a,3),x("x","y","z",1,-1,e,n,i,r,s,4),x("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Mn(u,3)),this.setAttribute("normal",new Mn(f,3)),this.setAttribute("uv",new Mn(p,2));function x(S,g,d,_,y,E,R,C,b,P,T){const w=E/b,N=R/P,k=E/2,B=R/2,G=C/2,ee=b+1,Y=P+1;let te=0,D=0;const Q=new H;for(let J=0;J<Y;J++){const he=J*N-B;for(let we=0;we<ee;we++){const qe=we*w-k;Q[S]=qe*_,Q[g]=he*y,Q[d]=G,u.push(Q.x,Q.y,Q.z),Q[S]=0,Q[g]=0,Q[d]=C>0?1:-1,f.push(Q.x,Q.y,Q.z),p.push(we/b),p.push(1-J/P),te+=1}}for(let J=0;J<P;J++)for(let he=0;he<b;he++){const we=h+he+ee*J,qe=h+he+ee*(J+1),$=h+(he+1)+ee*(J+1),ae=h+(he+1)+ee*J;l.push(we,qe,ae),l.push(qe,$,ae),D+=6}o.addGroup(m,D,T),m+=D,h+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ja(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Zt(t){const e={};for(let n=0;n<t.length;n++){const i=Vs(t[n]);for(const r in i)e[r]=i[r]}return e}function kS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function jv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const FS={clone:Vs,merge:Zt};var OS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class sr extends Qa{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=OS,this.fragmentShader=zS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vs(e.uniforms),this.uniformsGroups=kS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Hv extends hn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pt,this.projectionMatrix=new Pt,this.projectionMatrixInverse=new Pt,this.coordinateSystem=Si}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Oi=new H,Lp=new lt,Dp=new lt;class Ln extends Hv{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Gd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Dc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gd*2*Math.atan(Math.tan(Dc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,n){return this.getViewBounds(e,Lp,Dp),n.subVectors(Dp,Lp)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Dc*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,u=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/u,r*=a.width/l,i*=a.height/u}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const ts=-90,ns=1;class BS extends hn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ln(ts,ns,e,n);r.layers=this.layers,this.add(r);const s=new Ln(ts,ns,e,n);s.layers=this.layers,this.add(s);const a=new Ln(ts,ns,e,n);a.layers=this.layers,this.add(a);const o=new Ln(ts,ns,e,n);o.layers=this.layers,this.add(o);const l=new Ln(ts,ns,e,n);l.layers=this.layers,this.add(l);const u=new Ln(ts,ns,e,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const u of n)this.remove(u);if(e===Si)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===kl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of n)this.add(u),u.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,u,f]=this.children,p=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,a),e.setRenderTarget(i,2,r),e.render(n,o),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,u),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,r),e.render(n,f),e.setRenderTarget(p,h,m),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Vv extends dn{constructor(e,n,i,r,s,a,o,l,u,f){e=e!==void 0?e:[],n=n!==void 0?n:Os,super(e,n,i,r,s,a,o,l,u,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jS extends zr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Vv(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:ri}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ja(5,5,5),s=new sr({name:"CubemapFromEquirect",uniforms:Vs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:er});s.uniforms.tEquirect.value=n;const a=new yn(r,s),o=n.minFilter;return n.minFilter===Pr&&(n.minFilter=ri),new BS(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}class HS extends hn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new li,this.environmentIntensity=1,this.environmentRotation=new li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const eu=new H,VS=new H,GS=new je;class yr{constructor(e=new H(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=eu.subVectors(i,n).cross(VS.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(eu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||GS.getNormalMatrix(e),r=this.coplanarPoint(eu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mr=new qh,Ho=new H;class Gv{constructor(e=new yr,n=new yr,i=new yr,r=new yr,s=new yr,a=new yr){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Si){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],u=r[4],f=r[5],p=r[6],h=r[7],m=r[8],x=r[9],S=r[10],g=r[11],d=r[12],_=r[13],y=r[14],E=r[15];if(i[0].setComponents(l-s,h-u,g-m,E-d).normalize(),i[1].setComponents(l+s,h+u,g+m,E+d).normalize(),i[2].setComponents(l+a,h+f,g+x,E+_).normalize(),i[3].setComponents(l-a,h-f,g-x,E-_).normalize(),i[4].setComponents(l-o,h-p,g-S,E-y).normalize(),n===Si)i[5].setComponents(l+o,h+p,g+S,E+y).normalize();else if(n===kl)i[5].setComponents(o,p,S,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),mr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mr)}intersectsSprite(e){return mr.center.set(0,0,0),mr.radius=.7071067811865476,mr.applyMatrix4(e.matrixWorld),this.intersectsSphere(mr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Ho.x=r.normal.x>0?e.max.x:e.min.x,Ho.y=r.normal.y>0?e.max.y:e.min.y,Ho.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ho)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pa extends hn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class Wv extends dn{constructor(e,n,i,r,s,a,o,l,u,f=bs){if(f!==bs&&f!==js)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&f===bs&&(i=Or),i===void 0&&f===js&&(i=Bs),super(null,r,s,a,o,l,f,i,u),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=o!==void 0?o:Qn,this.minFilter=l!==void 0?l:Qn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class $h extends Pi{constructor(e=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const u=this;r=Math.floor(r),s=Math.floor(s);const f=[],p=[],h=[],m=[];let x=0;const S=[],g=i/2;let d=0;_(),a===!1&&(e>0&&y(!0),n>0&&y(!1)),this.setIndex(f),this.setAttribute("position",new Mn(p,3)),this.setAttribute("normal",new Mn(h,3)),this.setAttribute("uv",new Mn(m,2));function _(){const E=new H,R=new H;let C=0;const b=(n-e)/i;for(let P=0;P<=s;P++){const T=[],w=P/s,N=w*(n-e)+e;for(let k=0;k<=r;k++){const B=k/r,G=B*l+o,ee=Math.sin(G),Y=Math.cos(G);R.x=N*ee,R.y=-w*i+g,R.z=N*Y,p.push(R.x,R.y,R.z),E.set(ee,b,Y).normalize(),h.push(E.x,E.y,E.z),m.push(B,1-w),T.push(x++)}S.push(T)}for(let P=0;P<r;P++)for(let T=0;T<s;T++){const w=S[T][P],N=S[T+1][P],k=S[T+1][P+1],B=S[T][P+1];(e>0||T!==0)&&(f.push(w,N,B),C+=3),(n>0||T!==s-1)&&(f.push(N,k,B),C+=3)}u.addGroup(d,C,0),d+=C}function y(E){const R=x,C=new lt,b=new H;let P=0;const T=E===!0?e:n,w=E===!0?1:-1;for(let k=1;k<=r;k++)p.push(0,g*w,0),h.push(0,w,0),m.push(.5,.5),x++;const N=x;for(let k=0;k<=r;k++){const G=k/r*l+o,ee=Math.cos(G),Y=Math.sin(G);b.x=T*Y,b.y=g*w,b.z=T*ee,p.push(b.x,b.y,b.z),h.push(0,w,0),C.x=ee*.5+.5,C.y=Y*.5*w+.5,m.push(C.x,C.y),x++}for(let k=0;k<r;k++){const B=R+k,G=N+k;E===!0?f.push(G,G+1,B):f.push(G+1,G,B),P+=3}u.addGroup(d,P,E===!0?1:2),d+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $h(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class eo extends Pi{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),u=o+1,f=l+1,p=e/o,h=n/l,m=[],x=[],S=[],g=[];for(let d=0;d<f;d++){const _=d*h-a;for(let y=0;y<u;y++){const E=y*p-s;x.push(E,-_,0),S.push(0,0,1),g.push(y/o),g.push(1-d/l)}}for(let d=0;d<l;d++)for(let _=0;_<o;_++){const y=_+u*d,E=_+u*(d+1),R=_+1+u*(d+1),C=_+1+u*d;m.push(y,E,C),m.push(E,R,C)}this.setIndex(m),this.setAttribute("position",new Mn(x,3)),this.setAttribute("normal",new Mn(S,3)),this.setAttribute("uv",new Mn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new eo(e.width,e.height,e.widthSegments,e.heightSegments)}}class zl extends Pi{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let u=0;const f=[],p=new H,h=new H,m=[],x=[],S=[],g=[];for(let d=0;d<=i;d++){const _=[],y=d/i;let E=0;d===0&&a===0?E=.5/n:d===i&&l===Math.PI&&(E=-.5/n);for(let R=0;R<=n;R++){const C=R/n;p.x=-e*Math.cos(r+C*s)*Math.sin(a+y*o),p.y=e*Math.cos(a+y*o),p.z=e*Math.sin(r+C*s)*Math.sin(a+y*o),x.push(p.x,p.y,p.z),h.copy(p).normalize(),S.push(h.x,h.y,h.z),g.push(C+E,1-y),_.push(u++)}f.push(_)}for(let d=0;d<i;d++)for(let _=0;_<n;_++){const y=f[d][_+1],E=f[d][_],R=f[d+1][_],C=f[d+1][_+1];(d!==0||a>0)&&m.push(y,E,C),(d!==i-1||l<Math.PI)&&m.push(E,R,C)}this.setIndex(m),this.setAttribute("position",new Mn(x,3)),this.setAttribute("normal",new Mn(S,3)),this.setAttribute("uv",new Mn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ip extends Qa{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lv,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class WS extends Qa{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class XS extends Qa{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class KS extends hn{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new it(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class qS extends Hv{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,a=s+u*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class $S extends KS{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class YS extends Ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}function Up(t,e,n,i){const r=ZS(i);switch(n){case Tv:return t*e;case bv:return t*e;case Cv:return t*e*2;case Rv:return t*e/r.components*r.byteLength;case Wh:return t*e/r.components*r.byteLength;case Pv:return t*e*2/r.components*r.byteLength;case Xh:return t*e*2/r.components*r.byteLength;case Av:return t*e*3/r.components*r.byteLength;case $n:return t*e*4/r.components*r.byteLength;case Kh:return t*e*4/r.components*r.byteLength;case rl:case sl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case al:case ol:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case xd:case Sd:return Math.max(t,16)*Math.max(e,8)/4;case _d:case yd:return Math.max(t,8)*Math.max(e,8)/2;case Md:case Ed:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case wd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Td:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Ad:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case bd:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Cd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Rd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Pd:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Nd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Ld:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Dd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Id:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Ud:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case kd:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Fd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Od:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case ll:case zd:case Bd:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Nv:case jd:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Hd:case Vd:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function ZS(t){switch(t){case Ci:case Mv:return{byteLength:1,components:1};case Ha:case Ev:case qa:return{byteLength:2,components:1};case Vh:case Gh:return{byteLength:2,components:4};case Or:case Hh:case yi:return{byteLength:4,components:1};case wv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:jh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=jh);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Xv(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function QS(t){const e=new WeakMap;function n(o,l){const u=o.array,f=o.usage,p=u.byteLength,h=t.createBuffer();t.bindBuffer(l,h),t.bufferData(l,u,f),o.onUploadCallback();let m;if(u instanceof Float32Array)m=t.FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(u instanceof Int16Array)m=t.SHORT;else if(u instanceof Uint32Array)m=t.UNSIGNED_INT;else if(u instanceof Int32Array)m=t.INT;else if(u instanceof Int8Array)m=t.BYTE;else if(u instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:h,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,u){const f=l.array,p=l.updateRanges;if(t.bindBuffer(u,o),p.length===0)t.bufferSubData(u,0,f);else{p.sort((m,x)=>m.start-x.start);let h=0;for(let m=1;m<p.length;m++){const x=p[h],S=p[m];S.start<=x.start+x.count+1?x.count=Math.max(x.count,S.start+S.count-x.start):(++h,p[h]=S)}p.length=h+1;for(let m=0,x=p.length;m<x;m++){const S=p[m];t.bufferSubData(u,S.start*f.BYTES_PER_ELEMENT,f,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const u=e.get(o);if(u===void 0)e.set(o,n(o,l));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,o,l),u.version=o.version}}return{get:r,remove:s,update:a}}var JS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,eM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,tM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,oM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,lM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,hM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,fM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,pM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,mM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_M=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,xM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,SM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,MM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,EM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,wM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,TM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,AM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,CM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,RM="gl_FragColor = linearToOutputTexel( gl_FragColor );",PM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,NM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,LM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,DM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,IM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,UM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,kM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,FM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,OM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,BM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,HM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,VM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,GM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,WM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,XM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,KM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$M=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,YM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ZM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,QM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,JM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,eE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,aE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,oE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,lE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,uE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,mE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_E=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,SE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ME=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,EE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,TE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,AE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,CE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,RE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,PE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,NE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,LE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,DE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,IE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,UE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,kE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,FE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,OE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,BE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,HE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,VE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,GE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,WE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,XE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,KE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$E=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,YE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ZE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const QE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,JE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ew=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,sw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,aw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ow=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,lw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,fw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,vw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_w=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,xw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,yw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ew=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ww=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Aw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Pw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:JS,alphahash_pars_fragment:eM,alphamap_fragment:tM,alphamap_pars_fragment:nM,alphatest_fragment:iM,alphatest_pars_fragment:rM,aomap_fragment:sM,aomap_pars_fragment:aM,batching_pars_vertex:oM,batching_vertex:lM,begin_vertex:cM,beginnormal_vertex:uM,bsdfs:dM,iridescence_fragment:hM,bumpmap_pars_fragment:fM,clipping_planes_fragment:pM,clipping_planes_pars_fragment:mM,clipping_planes_pars_vertex:gM,clipping_planes_vertex:vM,color_fragment:_M,color_pars_fragment:xM,color_pars_vertex:yM,color_vertex:SM,common:MM,cube_uv_reflection_fragment:EM,defaultnormal_vertex:wM,displacementmap_pars_vertex:TM,displacementmap_vertex:AM,emissivemap_fragment:bM,emissivemap_pars_fragment:CM,colorspace_fragment:RM,colorspace_pars_fragment:PM,envmap_fragment:NM,envmap_common_pars_fragment:LM,envmap_pars_fragment:DM,envmap_pars_vertex:IM,envmap_physical_pars_fragment:WM,envmap_vertex:UM,fog_vertex:kM,fog_pars_vertex:FM,fog_fragment:OM,fog_pars_fragment:zM,gradientmap_pars_fragment:BM,lightmap_pars_fragment:jM,lights_lambert_fragment:HM,lights_lambert_pars_fragment:VM,lights_pars_begin:GM,lights_toon_fragment:XM,lights_toon_pars_fragment:KM,lights_phong_fragment:qM,lights_phong_pars_fragment:$M,lights_physical_fragment:YM,lights_physical_pars_fragment:ZM,lights_fragment_begin:QM,lights_fragment_maps:JM,lights_fragment_end:eE,logdepthbuf_fragment:tE,logdepthbuf_pars_fragment:nE,logdepthbuf_pars_vertex:iE,logdepthbuf_vertex:rE,map_fragment:sE,map_pars_fragment:aE,map_particle_fragment:oE,map_particle_pars_fragment:lE,metalnessmap_fragment:cE,metalnessmap_pars_fragment:uE,morphinstance_vertex:dE,morphcolor_vertex:hE,morphnormal_vertex:fE,morphtarget_pars_vertex:pE,morphtarget_vertex:mE,normal_fragment_begin:gE,normal_fragment_maps:vE,normal_pars_fragment:_E,normal_pars_vertex:xE,normal_vertex:yE,normalmap_pars_fragment:SE,clearcoat_normal_fragment_begin:ME,clearcoat_normal_fragment_maps:EE,clearcoat_pars_fragment:wE,iridescence_pars_fragment:TE,opaque_fragment:AE,packing:bE,premultiplied_alpha_fragment:CE,project_vertex:RE,dithering_fragment:PE,dithering_pars_fragment:NE,roughnessmap_fragment:LE,roughnessmap_pars_fragment:DE,shadowmap_pars_fragment:IE,shadowmap_pars_vertex:UE,shadowmap_vertex:kE,shadowmask_pars_fragment:FE,skinbase_vertex:OE,skinning_pars_vertex:zE,skinning_vertex:BE,skinnormal_vertex:jE,specularmap_fragment:HE,specularmap_pars_fragment:VE,tonemapping_fragment:GE,tonemapping_pars_fragment:WE,transmission_fragment:XE,transmission_pars_fragment:KE,uv_pars_fragment:qE,uv_pars_vertex:$E,uv_vertex:YE,worldpos_vertex:ZE,background_vert:QE,background_frag:JE,backgroundCube_vert:ew,backgroundCube_frag:tw,cube_vert:nw,cube_frag:iw,depth_vert:rw,depth_frag:sw,distanceRGBA_vert:aw,distanceRGBA_frag:ow,equirect_vert:lw,equirect_frag:cw,linedashed_vert:uw,linedashed_frag:dw,meshbasic_vert:hw,meshbasic_frag:fw,meshlambert_vert:pw,meshlambert_frag:mw,meshmatcap_vert:gw,meshmatcap_frag:vw,meshnormal_vert:_w,meshnormal_frag:xw,meshphong_vert:yw,meshphong_frag:Sw,meshphysical_vert:Mw,meshphysical_frag:Ew,meshtoon_vert:ww,meshtoon_frag:Tw,points_vert:Aw,points_frag:bw,shadow_vert:Cw,shadow_frag:Rw,sprite_vert:Pw,sprite_frag:Nw},pe={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},ni={basic:{uniforms:Zt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Zt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new it(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Zt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Zt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Zt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new it(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Zt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Zt([pe.points,pe.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Zt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Zt([pe.common,pe.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Zt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Zt([pe.sprite,pe.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Zt([pe.common,pe.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Zt([pe.lights,pe.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};ni.physical={uniforms:Zt([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const Vo={r:0,b:0,g:0},gr=new li,Lw=new Pt;function Dw(t,e,n,i,r,s,a){const o=new it(0);let l=s===!0?0:1,u,f,p=null,h=0,m=null;function x(y){let E=y.isScene===!0?y.background:null;return E&&E.isTexture&&(E=(y.backgroundBlurriness>0?n:e).get(E)),E}function S(y){let E=!1;const R=x(y);R===null?d(o,l):R&&R.isColor&&(d(R,1),E=!0);const C=t.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(t.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function g(y,E){const R=x(E);R&&(R.isCubeTexture||R.mapping===nc)?(f===void 0&&(f=new yn(new Ja(1,1,1),new sr({name:"BackgroundCubeMaterial",uniforms:Vs(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(C,b,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),gr.copy(E.backgroundRotation),gr.x*=-1,gr.y*=-1,gr.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(gr.y*=-1,gr.z*=-1),f.material.uniforms.envMap.value=R,f.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(Lw.makeRotationFromEuler(gr)),f.material.toneMapped=tt.getTransfer(R.colorSpace)!==ut,(p!==R||h!==R.version||m!==t.toneMapping)&&(f.material.needsUpdate=!0,p=R,h=R.version,m=t.toneMapping),f.layers.enableAll(),y.unshift(f,f.geometry,f.material,0,0,null)):R&&R.isTexture&&(u===void 0&&(u=new yn(new eo(2,2),new sr({name:"BackgroundMaterial",uniforms:Vs(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:rr,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=R,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.toneMapped=tt.getTransfer(R.colorSpace)!==ut,R.matrixAutoUpdate===!0&&R.updateMatrix(),u.material.uniforms.uvTransform.value.copy(R.matrix),(p!==R||h!==R.version||m!==t.toneMapping)&&(u.material.needsUpdate=!0,p=R,h=R.version,m=t.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null))}function d(y,E){y.getRGB(Vo,jv(t)),i.buffers.color.setClear(Vo.r,Vo.g,Vo.b,E,a)}function _(){f!==void 0&&(f.geometry.dispose(),f.material.dispose()),u!==void 0&&(u.geometry.dispose(),u.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(y,E=1){o.set(y),l=E,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,d(o,l)},render:S,addToRenderList:g,dispose:_}}function Iw(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(w,N,k,B,G){let ee=!1;const Y=p(B,k,N);s!==Y&&(s=Y,u(s.object)),ee=m(w,B,k,G),ee&&x(w,B,k,G),G!==null&&e.update(G,t.ELEMENT_ARRAY_BUFFER),(ee||a)&&(a=!1,E(w,N,k,B),G!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return t.createVertexArray()}function u(w){return t.bindVertexArray(w)}function f(w){return t.deleteVertexArray(w)}function p(w,N,k){const B=k.wireframe===!0;let G=i[w.id];G===void 0&&(G={},i[w.id]=G);let ee=G[N.id];ee===void 0&&(ee={},G[N.id]=ee);let Y=ee[B];return Y===void 0&&(Y=h(l()),ee[B]=Y),Y}function h(w){const N=[],k=[],B=[];for(let G=0;G<n;G++)N[G]=0,k[G]=0,B[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:k,attributeDivisors:B,object:w,attributes:{},index:null}}function m(w,N,k,B){const G=s.attributes,ee=N.attributes;let Y=0;const te=k.getAttributes();for(const D in te)if(te[D].location>=0){const J=G[D];let he=ee[D];if(he===void 0&&(D==="instanceMatrix"&&w.instanceMatrix&&(he=w.instanceMatrix),D==="instanceColor"&&w.instanceColor&&(he=w.instanceColor)),J===void 0||J.attribute!==he||he&&J.data!==he.data)return!0;Y++}return s.attributesNum!==Y||s.index!==B}function x(w,N,k,B){const G={},ee=N.attributes;let Y=0;const te=k.getAttributes();for(const D in te)if(te[D].location>=0){let J=ee[D];J===void 0&&(D==="instanceMatrix"&&w.instanceMatrix&&(J=w.instanceMatrix),D==="instanceColor"&&w.instanceColor&&(J=w.instanceColor));const he={};he.attribute=J,J&&J.data&&(he.data=J.data),G[D]=he,Y++}s.attributes=G,s.attributesNum=Y,s.index=B}function S(){const w=s.newAttributes;for(let N=0,k=w.length;N<k;N++)w[N]=0}function g(w){d(w,0)}function d(w,N){const k=s.newAttributes,B=s.enabledAttributes,G=s.attributeDivisors;k[w]=1,B[w]===0&&(t.enableVertexAttribArray(w),B[w]=1),G[w]!==N&&(t.vertexAttribDivisor(w,N),G[w]=N)}function _(){const w=s.newAttributes,N=s.enabledAttributes;for(let k=0,B=N.length;k<B;k++)N[k]!==w[k]&&(t.disableVertexAttribArray(k),N[k]=0)}function y(w,N,k,B,G,ee,Y){Y===!0?t.vertexAttribIPointer(w,N,k,G,ee):t.vertexAttribPointer(w,N,k,B,G,ee)}function E(w,N,k,B){S();const G=B.attributes,ee=k.getAttributes(),Y=N.defaultAttributeValues;for(const te in ee){const D=ee[te];if(D.location>=0){let Q=G[te];if(Q===void 0&&(te==="instanceMatrix"&&w.instanceMatrix&&(Q=w.instanceMatrix),te==="instanceColor"&&w.instanceColor&&(Q=w.instanceColor)),Q!==void 0){const J=Q.normalized,he=Q.itemSize,we=e.get(Q);if(we===void 0)continue;const qe=we.buffer,$=we.type,ae=we.bytesPerElement,_e=$===t.INT||$===t.UNSIGNED_INT||Q.gpuType===Hh;if(Q.isInterleavedBufferAttribute){const ce=Q.data,Ce=ce.stride,Ie=Q.offset;if(ce.isInstancedInterleavedBuffer){for(let Fe=0;Fe<D.locationSize;Fe++)d(D.location+Fe,ce.meshPerAttribute);w.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Fe=0;Fe<D.locationSize;Fe++)g(D.location+Fe);t.bindBuffer(t.ARRAY_BUFFER,qe);for(let Fe=0;Fe<D.locationSize;Fe++)y(D.location+Fe,he/D.locationSize,$,J,Ce*ae,(Ie+he/D.locationSize*Fe)*ae,_e)}else{if(Q.isInstancedBufferAttribute){for(let ce=0;ce<D.locationSize;ce++)d(D.location+ce,Q.meshPerAttribute);w.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ce=0;ce<D.locationSize;ce++)g(D.location+ce);t.bindBuffer(t.ARRAY_BUFFER,qe);for(let ce=0;ce<D.locationSize;ce++)y(D.location+ce,he/D.locationSize,$,J,he*ae,he/D.locationSize*ce*ae,_e)}}else if(Y!==void 0){const J=Y[te];if(J!==void 0)switch(J.length){case 2:t.vertexAttrib2fv(D.location,J);break;case 3:t.vertexAttrib3fv(D.location,J);break;case 4:t.vertexAttrib4fv(D.location,J);break;default:t.vertexAttrib1fv(D.location,J)}}}}_()}function R(){P();for(const w in i){const N=i[w];for(const k in N){const B=N[k];for(const G in B)f(B[G].object),delete B[G];delete N[k]}delete i[w]}}function C(w){if(i[w.id]===void 0)return;const N=i[w.id];for(const k in N){const B=N[k];for(const G in B)f(B[G].object),delete B[G];delete N[k]}delete i[w.id]}function b(w){for(const N in i){const k=i[N];if(k[w.id]===void 0)continue;const B=k[w.id];for(const G in B)f(B[G].object),delete B[G];delete k[w.id]}}function P(){T(),a=!0,s!==r&&(s=r,u(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:P,resetDefaultState:T,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:b,initAttributes:S,enableAttribute:g,disableUnusedAttributes:_}}function Uw(t,e,n){let i;function r(u){i=u}function s(u,f){t.drawArrays(i,u,f),n.update(f,i,1)}function a(u,f,p){p!==0&&(t.drawArraysInstanced(i,u,f,p),n.update(f,i,p))}function o(u,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,f,0,p);let m=0;for(let x=0;x<p;x++)m+=f[x];n.update(m,i,1)}function l(u,f,p,h){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let x=0;x<u.length;x++)a(u[x],f[x],h[x]);else{m.multiDrawArraysInstancedWEBGL(i,u,0,f,0,h,0,p);let x=0;for(let S=0;S<p;S++)x+=f[S]*h[S];n.update(x,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function kw(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(b){return!(b!==$n&&i.convert(b)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const P=b===qa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==Ci&&i.convert(b)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==yi&&!P)}function l(b){if(b==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=n.precision!==void 0?n.precision:"highp";const f=l(u);f!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",f,"instead."),u=f);const p=n.logarithmicDepthBuffer===!0,h=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),y=t.getParameter(t.MAX_VARYING_VECTORS),E=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),R=x>0,C=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:p,reverseDepthBuffer:h,maxTextures:m,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:E,vertexTextures:R,maxSamples:C}}function Fw(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new yr,o=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){const m=p.length!==0||h||i!==0||r;return r=h,i=p.length,m},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,h){n=f(p,h,0)},this.setState=function(p,h,m){const x=p.clippingPlanes,S=p.clipIntersection,g=p.clipShadows,d=t.get(p);if(!r||x===null||x.length===0||s&&!g)s?f(null):u();else{const _=s?0:i,y=_*4;let E=d.clippingState||null;l.value=E,E=f(x,h,y,m);for(let R=0;R!==y;++R)E[R]=n[R];d.clippingState=E,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=_}};function u(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(p,h,m,x){const S=p!==null?p.length:0;let g=null;if(S!==0){if(g=l.value,x!==!0||g===null){const d=m+S*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<d)&&(g=new Float32Array(d));for(let y=0,E=m;y!==S;++y,E+=4)a.copy(p[y]).applyMatrix4(_,o),a.normal.toArray(g,E),g[E+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,g}}function Ow(t){let e=new WeakMap;function n(a,o){return o===pd?a.mapping=Os:o===md&&(a.mapping=zs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===pd||o===md)if(e.has(a)){const l=e.get(a).texture;return n(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const u=new jS(l.height);return u.fromEquirectangularTexture(t,a),e.set(a,u),a.addEventListener("dispose",r),n(u.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const _s=4,kp=[.125,.215,.35,.446,.526,.582],Tr=20,tu=new qS,Fp=new it;let nu=null,iu=0,ru=0,su=!1;const Sr=(1+Math.sqrt(5))/2,is=1/Sr,Op=[new H(-Sr,is,0),new H(Sr,is,0),new H(-is,0,Sr),new H(is,0,Sr),new H(0,Sr,-is),new H(0,Sr,is),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)];class zp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){nu=this._renderer.getRenderTarget(),iu=this._renderer.getActiveCubeFace(),ru=this._renderer.getActiveMipmapLevel(),su=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(nu,iu,ru),this._renderer.xr.enabled=su,e.scissorTest=!1,Go(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Os||e.mapping===zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),nu=this._renderer.getRenderTarget(),iu=this._renderer.getActiveCubeFace(),ru=this._renderer.getActiveMipmapLevel(),su=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:ri,minFilter:ri,generateMipmaps:!1,type:qa,format:$n,colorSpace:Hs,depthBuffer:!1},r=Bp(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bp(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zw(s)),this._blurMaterial=Bw(s,e,n)}return r}_compileMaterial(e){const n=new yn(this._lodPlanes[0],e);this._renderer.compile(n,tu)}_sceneToCubeUV(e,n,i,r){const o=new Ln(90,1,n,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,h=f.toneMapping;f.getClearColor(Fp),f.toneMapping=tr,f.autoClear=!1;const m=new Ol({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1}),x=new yn(new Ja,m);let S=!1;const g=e.background;g?g.isColor&&(m.color.copy(g),e.background=null,S=!0):(m.color.copy(Fp),S=!0);for(let d=0;d<6;d++){const _=d%3;_===0?(o.up.set(0,l[d],0),o.lookAt(u[d],0,0)):_===1?(o.up.set(0,0,l[d]),o.lookAt(0,u[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,u[d]));const y=this._cubeSize;Go(r,_*y,d>2?y:0,y,y),f.setRenderTarget(r),S&&f.render(x,o),f.render(e,o)}x.geometry.dispose(),x.material.dispose(),f.toneMapping=h,f.autoClear=p,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Os||e.mapping===zs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jp());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new yn(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Go(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,tu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Op[(r-s-1)%Op.length];this._blur(e,s-1,s,a,o)}n.autoClear=i}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const l=this._renderer,u=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,p=new yn(this._lodPlanes[r],u),h=u.uniforms,m=this._sizeLods[i]-1,x=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Tr-1),S=s/x,g=isFinite(s)?1+Math.floor(f*S):Tr;g>Tr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Tr}`);const d=[];let _=0;for(let b=0;b<Tr;++b){const P=b/S,T=Math.exp(-P*P/2);d.push(T),b===0?_+=T:b<g&&(_+=2*T)}for(let b=0;b<d.length;b++)d[b]=d[b]/_;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:y}=this;h.dTheta.value=x,h.mipInt.value=y-i;const E=this._sizeLods[r],R=3*E*(r>y-_s?r-y+_s:0),C=4*(this._cubeSize-E);Go(n,R,C,3*E,2*E),l.setRenderTarget(n),l.render(p,tu)}}function zw(t){const e=[],n=[],i=[];let r=t;const s=t-_s+1+kp.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);n.push(o);let l=1/o;a>t-_s?l=kp[a-t+_s-1]:a===0&&(l=0),i.push(l);const u=1/(o-2),f=-u,p=1+u,h=[f,f,p,f,p,p,f,f,p,p,f,p],m=6,x=6,S=3,g=2,d=1,_=new Float32Array(S*x*m),y=new Float32Array(g*x*m),E=new Float32Array(d*x*m);for(let C=0;C<m;C++){const b=C%3*2/3-1,P=C>2?0:-1,T=[b,P,0,b+2/3,P,0,b+2/3,P+1,0,b,P,0,b+2/3,P+1,0,b,P+1,0];_.set(T,S*x*C),y.set(h,g*x*C);const w=[C,C,C,C,C,C];E.set(w,d*x*C)}const R=new Pi;R.setAttribute("position",new oi(_,S)),R.setAttribute("uv",new oi(y,g)),R.setAttribute("faceIndex",new oi(E,d)),e.push(R),r>_s&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Bp(t,e,n){const i=new zr(t,e,n);return i.texture.mapping=nc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Go(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Bw(t,e,n){const i=new Float32Array(Tr),r=new H(0,1,0);return new sr({name:"SphericalGaussianBlur",defines:{n:Tr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Yh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:er,depthTest:!1,depthWrite:!1})}function jp(){return new sr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:er,depthTest:!1,depthWrite:!1})}function Hp(){return new sr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:er,depthTest:!1,depthWrite:!1})}function Yh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jw(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const l=o.mapping,u=l===pd||l===md,f=l===Os||l===zs;if(u||f){let p=e.get(o);const h=p!==void 0?p.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return n===null&&(n=new zp(t)),p=u?n.fromEquirectangular(o,p):n.fromCubemap(o,p),p.texture.pmremVersion=o.pmremVersion,e.set(o,p),p.texture;if(p!==void 0)return p.texture;{const m=o.image;return u&&m&&m.height>0||f&&m&&r(m)?(n===null&&(n=new zp(t)),p=u?n.fromEquirectangular(o):n.fromCubemap(o),p.texture.pmremVersion=o.pmremVersion,e.set(o,p),o.addEventListener("dispose",s),p.texture):null}}}return o}function r(o){let l=0;const u=6;for(let f=0;f<u;f++)o[f]!==void 0&&l++;return l===u}function s(o){const l=o.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function a(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function Hw(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&rs("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Vw(t,e,n,i){const r={},s=new WeakMap;function a(p){const h=p.target;h.index!==null&&e.remove(h.index);for(const x in h.attributes)e.remove(h.attributes[x]);h.removeEventListener("dispose",a),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(p,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,n.memory.geometries++),h}function l(p){const h=p.attributes;for(const m in h)e.update(h[m],t.ARRAY_BUFFER)}function u(p){const h=[],m=p.index,x=p.attributes.position;let S=0;if(m!==null){const _=m.array;S=m.version;for(let y=0,E=_.length;y<E;y+=3){const R=_[y+0],C=_[y+1],b=_[y+2];h.push(R,C,C,b,b,R)}}else if(x!==void 0){const _=x.array;S=x.version;for(let y=0,E=_.length/3-1;y<E;y+=3){const R=y+0,C=y+1,b=y+2;h.push(R,C,C,b,b,R)}}else return;const g=new(Iv(h)?Bv:zv)(h,1);g.version=S;const d=s.get(p);d&&e.remove(d),s.set(p,g)}function f(p){const h=s.get(p);if(h){const m=p.index;m!==null&&h.version<m.version&&u(p)}else u(p);return s.get(p)}return{get:o,update:l,getWireframeAttribute:f}}function Gw(t,e,n){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,m){t.drawElements(i,m,s,h*a),n.update(m,i,1)}function u(h,m,x){x!==0&&(t.drawElementsInstanced(i,m,s,h*a,x),n.update(m,i,x))}function f(h,m,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,h,0,x);let g=0;for(let d=0;d<x;d++)g+=m[d];n.update(g,i,1)}function p(h,m,x,S){if(x===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<h.length;d++)u(h[d]/a,m[d],S[d]);else{g.multiDrawElementsInstancedWEBGL(i,m,0,s,h,0,S,0,x);let d=0;for(let _=0;_<x;_++)d+=m[_]*S[_];n.update(d,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=u,this.renderMultiDraw=f,this.renderMultiDrawInstances=p}function Ww(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Xw(t,e,n){const i=new WeakMap,r=new At;function s(a,o,l){const u=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=f!==void 0?f.length:0;let h=i.get(o);if(h===void 0||h.count!==p){let w=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",w)};var m=w;h!==void 0&&h.texture.dispose();const x=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let E=0;x===!0&&(E=1),S===!0&&(E=2),g===!0&&(E=3);let R=o.attributes.position.count*E,C=1;R>e.maxTextureSize&&(C=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const b=new Float32Array(R*C*4*p),P=new kv(b,R,C,p);P.type=yi,P.needsUpdate=!0;const T=E*4;for(let N=0;N<p;N++){const k=d[N],B=_[N],G=y[N],ee=R*C*4*N;for(let Y=0;Y<k.count;Y++){const te=Y*T;x===!0&&(r.fromBufferAttribute(k,Y),b[ee+te+0]=r.x,b[ee+te+1]=r.y,b[ee+te+2]=r.z,b[ee+te+3]=0),S===!0&&(r.fromBufferAttribute(B,Y),b[ee+te+4]=r.x,b[ee+te+5]=r.y,b[ee+te+6]=r.z,b[ee+te+7]=0),g===!0&&(r.fromBufferAttribute(G,Y),b[ee+te+8]=r.x,b[ee+te+9]=r.y,b[ee+te+10]=r.z,b[ee+te+11]=G.itemSize===4?r.w:1)}}h={count:p,texture:P,size:new lt(R,C)},i.set(o,h),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let x=0;for(let g=0;g<u.length;g++)x+=u[g];const S=o.morphTargetsRelative?1:1-x;l.getUniforms().setValue(t,"morphTargetBaseInfluence",S),l.getUniforms().setValue(t,"morphTargetInfluences",u)}l.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function Kw(t,e,n,i){let r=new WeakMap;function s(l){const u=i.render.frame,f=l.geometry,p=e.get(l,f);if(r.get(p)!==u&&(e.update(p),r.set(p,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==u&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return p}function a(){r=new WeakMap}function o(l){const u=l.target;u.removeEventListener("dispose",o),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:s,dispose:a}}const Kv=new dn,Vp=new Wv(1,1),qv=new kv,$v=new wS,Yv=new Vv,Gp=[],Wp=[],Xp=new Float32Array(16),Kp=new Float32Array(9),qp=new Float32Array(4);function qs(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Gp[r];if(s===void 0&&(s=new Float32Array(r),Gp[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function It(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ut(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function ic(t,e){let n=Wp[e];n===void 0&&(n=new Int32Array(e),Wp[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function qw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function $w(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(It(n,e))return;t.uniform2fv(this.addr,e),Ut(n,e)}}function Yw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(It(n,e))return;t.uniform3fv(this.addr,e),Ut(n,e)}}function Zw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(It(n,e))return;t.uniform4fv(this.addr,e),Ut(n,e)}}function Qw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(It(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Ut(n,e)}else{if(It(n,i))return;qp.set(i),t.uniformMatrix2fv(this.addr,!1,qp),Ut(n,i)}}function Jw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(It(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Ut(n,e)}else{if(It(n,i))return;Kp.set(i),t.uniformMatrix3fv(this.addr,!1,Kp),Ut(n,i)}}function eT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(It(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Ut(n,e)}else{if(It(n,i))return;Xp.set(i),t.uniformMatrix4fv(this.addr,!1,Xp),Ut(n,i)}}function tT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function nT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(It(n,e))return;t.uniform2iv(this.addr,e),Ut(n,e)}}function iT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(It(n,e))return;t.uniform3iv(this.addr,e),Ut(n,e)}}function rT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(It(n,e))return;t.uniform4iv(this.addr,e),Ut(n,e)}}function sT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function aT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(It(n,e))return;t.uniform2uiv(this.addr,e),Ut(n,e)}}function oT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(It(n,e))return;t.uniform3uiv(this.addr,e),Ut(n,e)}}function lT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(It(n,e))return;t.uniform4uiv(this.addr,e),Ut(n,e)}}function cT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Vp.compareFunction=Dv,s=Vp):s=Kv,n.setTexture2D(e||s,r)}function uT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||$v,r)}function dT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Yv,r)}function hT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||qv,r)}function fT(t){switch(t){case 5126:return qw;case 35664:return $w;case 35665:return Yw;case 35666:return Zw;case 35674:return Qw;case 35675:return Jw;case 35676:return eT;case 5124:case 35670:return tT;case 35667:case 35671:return nT;case 35668:case 35672:return iT;case 35669:case 35673:return rT;case 5125:return sT;case 36294:return aT;case 36295:return oT;case 36296:return lT;case 35678:case 36198:case 36298:case 36306:case 35682:return cT;case 35679:case 36299:case 36307:return uT;case 35680:case 36300:case 36308:case 36293:return dT;case 36289:case 36303:case 36311:case 36292:return hT}}function pT(t,e){t.uniform1fv(this.addr,e)}function mT(t,e){const n=qs(e,this.size,2);t.uniform2fv(this.addr,n)}function gT(t,e){const n=qs(e,this.size,3);t.uniform3fv(this.addr,n)}function vT(t,e){const n=qs(e,this.size,4);t.uniform4fv(this.addr,n)}function _T(t,e){const n=qs(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function xT(t,e){const n=qs(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function yT(t,e){const n=qs(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function ST(t,e){t.uniform1iv(this.addr,e)}function MT(t,e){t.uniform2iv(this.addr,e)}function ET(t,e){t.uniform3iv(this.addr,e)}function wT(t,e){t.uniform4iv(this.addr,e)}function TT(t,e){t.uniform1uiv(this.addr,e)}function AT(t,e){t.uniform2uiv(this.addr,e)}function bT(t,e){t.uniform3uiv(this.addr,e)}function CT(t,e){t.uniform4uiv(this.addr,e)}function RT(t,e,n){const i=this.cache,r=e.length,s=ic(n,r);It(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let a=0;a!==r;++a)n.setTexture2D(e[a]||Kv,s[a])}function PT(t,e,n){const i=this.cache,r=e.length,s=ic(n,r);It(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||$v,s[a])}function NT(t,e,n){const i=this.cache,r=e.length,s=ic(n,r);It(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||Yv,s[a])}function LT(t,e,n){const i=this.cache,r=e.length,s=ic(n,r);It(i,s)||(t.uniform1iv(this.addr,s),Ut(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||qv,s[a])}function DT(t){switch(t){case 5126:return pT;case 35664:return mT;case 35665:return gT;case 35666:return vT;case 35674:return _T;case 35675:return xT;case 35676:return yT;case 5124:case 35670:return ST;case 35667:case 35671:return MT;case 35668:case 35672:return ET;case 35669:case 35673:return wT;case 5125:return TT;case 36294:return AT;case 36295:return bT;case 36296:return CT;case 35678:case 36198:case 36298:case 36306:case 35682:return RT;case 35679:case 36299:case 36307:return PT;case 35680:case 36300:case 36308:case 36293:return NT;case 36289:case 36303:case 36311:case 36292:return LT}}class IT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=fT(n.type)}}class UT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=DT(n.type)}}class kT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const au=/(\w+)(\])?(\[|\.)?/g;function $p(t,e){t.seq.push(e),t.map[e.id]=e}function FT(t,e,n){const i=t.name,r=i.length;for(au.lastIndex=0;;){const s=au.exec(i),a=au.lastIndex;let o=s[1];const l=s[2]==="]",u=s[3];if(l&&(o=o|0),u===void 0||u==="["&&a+2===r){$p(n,u===void 0?new IT(o,t,e):new UT(o,t,e));break}else{let p=n.map[o];p===void 0&&(p=new kT(o),$p(n,p)),n=p}}}class cl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),a=e.getUniformLocation(n,s.name);FT(s,a,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function Yp(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const OT=37297;let zT=0;function BT(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const Zp=new je;function jT(t){tt._getMatrix(Zp,tt.workingColorSpace,t);const e=`mat3( ${Zp.elements.map(n=>n.toFixed(4))} )`;switch(tt.getTransfer(t)){case Ul:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Qp(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+BT(t.getShaderSource(e),a)}else return r}function HT(t,e){const n=jT(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function VT(t,e){let n;switch(e){case Yy:n="Linear";break;case Zy:n="Reinhard";break;case Qy:n="Cineon";break;case Jy:n="ACESFilmic";break;case tS:n="AgX";break;case nS:n="Neutral";break;case eS:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Wo=new H;function GT(){tt.getLuminanceCoefficients(Wo);const t=Wo.x.toFixed(4),e=Wo.y.toFixed(4),n=Wo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function WT(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ma).join(`
`)}function XT(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function KT(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function ma(t){return t!==""}function Jp(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function em(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const qT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wd(t){return t.replace(qT,YT)}const $T=new Map;function YT(t,e){let n=He[e];if(n===void 0){const i=$T.get(e);if(i!==void 0)n=He[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Wd(n)}const ZT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tm(t){return t.replace(ZT,QT)}function QT(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function nm(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function JT(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===xv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Ry?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===pi&&(e="SHADOWMAP_TYPE_VSM"),e}function eA(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Os:case zs:e="ENVMAP_TYPE_CUBE";break;case nc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function tA(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case zs:e="ENVMAP_MODE_REFRACTION";break}return e}function nA(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case yv:e="ENVMAP_BLENDING_MULTIPLY";break;case qy:e="ENVMAP_BLENDING_MIX";break;case $y:e="ENVMAP_BLENDING_ADD";break}return e}function iA(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function rA(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=JT(n),u=eA(n),f=tA(n),p=nA(n),h=iA(n),m=WT(n),x=XT(s),S=r.createProgram();let g,d,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(ma).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(ma).join(`
`),d.length>0&&(d+=`
`)):(g=[nm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ma).join(`
`),d=[nm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",n.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==tr?"#define TONE_MAPPING":"",n.toneMapping!==tr?He.tonemapping_pars_fragment:"",n.toneMapping!==tr?VT("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,HT("linearToOutputTexel",n.outputColorSpace),GT(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ma).join(`
`)),a=Wd(a),a=Jp(a,n),a=em(a,n),o=Wd(o),o=Jp(o,n),o=em(o,n),a=tm(a),o=tm(o),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",n.glslVersion===gp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===gp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const y=_+g+a,E=_+d+o,R=Yp(r,r.VERTEX_SHADER,y),C=Yp(r,r.FRAGMENT_SHADER,E);r.attachShader(S,R),r.attachShader(S,C),n.index0AttributeName!==void 0?r.bindAttribLocation(S,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function b(N){if(t.debug.checkShaderErrors){const k=r.getProgramInfoLog(S).trim(),B=r.getShaderInfoLog(R).trim(),G=r.getShaderInfoLog(C).trim();let ee=!0,Y=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(ee=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,S,R,C);else{const te=Qp(r,R,"vertex"),D=Qp(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+k+`
`+te+`
`+D)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(B===""||G==="")&&(Y=!1);Y&&(N.diagnostics={runnable:ee,programLog:k,vertexShader:{log:B,prefix:g},fragmentShader:{log:G,prefix:d}})}r.deleteShader(R),r.deleteShader(C),P=new cl(r,S),T=KT(r,S)}let P;this.getUniforms=function(){return P===void 0&&b(this),P};let T;this.getAttributes=function(){return T===void 0&&b(this),T};let w=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=r.getProgramParameter(S,OT)),w},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=zT++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=R,this.fragmentShader=C,this}let sA=0;class aA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new oA(e),n.set(e,i)),i}}class oA{constructor(e){this.id=sA++,this.code=e,this.usedTimes=0}}function lA(t,e,n,i,r,s,a){const o=new Fv,l=new aA,u=new Set,f=[],p=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(T){return u.add(T),T===0?"uv":`uv${T}`}function g(T,w,N,k,B){const G=k.fog,ee=B.geometry,Y=T.isMeshStandardMaterial?k.environment:null,te=(T.isMeshStandardMaterial?n:e).get(T.envMap||Y),D=te&&te.mapping===nc?te.image.height:null,Q=x[T.type];T.precision!==null&&(m=r.getMaxPrecision(T.precision),m!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",m,"instead."));const J=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,he=J!==void 0?J.length:0;let we=0;ee.morphAttributes.position!==void 0&&(we=1),ee.morphAttributes.normal!==void 0&&(we=2),ee.morphAttributes.color!==void 0&&(we=3);let qe,$,ae,_e;if(Q){const Re=ni[Q];qe=Re.vertexShader,$=Re.fragmentShader}else qe=T.vertexShader,$=T.fragmentShader,l.update(T),ae=l.getVertexShaderID(T),_e=l.getFragmentShaderID(T);const ce=t.getRenderTarget(),Ce=t.state.buffers.depth.getReversed(),Ie=B.isInstancedMesh===!0,Fe=B.isBatchedMesh===!0,dt=!!T.map,We=!!T.matcap,Ze=!!te,L=!!T.aoMap,kt=!!T.lightMap,Be=!!T.bumpMap,Ve=!!T.normalMap,be=!!T.displacementMap,rt=!!T.emissiveMap,Te=!!T.metalnessMap,M=!!T.roughnessMap,v=T.anisotropy>0,I=T.clearcoat>0,z=T.dispersion>0,q=T.iridescence>0,X=T.sheen>0,W=T.transmission>0,ie=v&&!!T.anisotropyMap,le=I&&!!T.clearcoatMap,Oe=I&&!!T.clearcoatNormalMap,re=I&&!!T.clearcoatRoughnessMap,ye=q&&!!T.iridescenceMap,xe=q&&!!T.iridescenceThicknessMap,Pe=X&&!!T.sheenColorMap,Me=X&&!!T.sheenRoughnessMap,$e=!!T.specularMap,ze=!!T.specularColorMap,ct=!!T.specularIntensityMap,U=W&&!!T.transmissionMap,me=W&&!!T.thicknessMap,K=!!T.gradientMap,ne=!!T.alphaMap,ve=T.alphaTest>0,ue=!!T.alphaHash,Z=!!T.extensions;let de=tr;T.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(de=t.toneMapping);const Le={shaderID:Q,shaderType:T.type,shaderName:T.name,vertexShader:qe,fragmentShader:$,defines:T.defines,customVertexShaderID:ae,customFragmentShaderID:_e,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:m,batching:Fe,batchingColor:Fe&&B._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&B.instanceColor!==null,instancingMorph:Ie&&B.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ce===null?t.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Hs,alphaToCoverage:!!T.alphaToCoverage,map:dt,matcap:We,envMap:Ze,envMapMode:Ze&&te.mapping,envMapCubeUVHeight:D,aoMap:L,lightMap:kt,bumpMap:Be,normalMap:Ve,displacementMap:h&&be,emissiveMap:rt,normalMapObjectSpace:Ve&&T.normalMapType===aS,normalMapTangentSpace:Ve&&T.normalMapType===Lv,metalnessMap:Te,roughnessMap:M,anisotropy:v,anisotropyMap:ie,clearcoat:I,clearcoatMap:le,clearcoatNormalMap:Oe,clearcoatRoughnessMap:re,dispersion:z,iridescence:q,iridescenceMap:ye,iridescenceThicknessMap:xe,sheen:X,sheenColorMap:Pe,sheenRoughnessMap:Me,specularMap:$e,specularColorMap:ze,specularIntensityMap:ct,transmission:W,transmissionMap:U,thicknessMap:me,gradientMap:K,opaque:T.transparent===!1&&T.blending===As&&T.alphaToCoverage===!1,alphaMap:ne,alphaTest:ve,alphaHash:ue,combine:T.combine,mapUv:dt&&S(T.map.channel),aoMapUv:L&&S(T.aoMap.channel),lightMapUv:kt&&S(T.lightMap.channel),bumpMapUv:Be&&S(T.bumpMap.channel),normalMapUv:Ve&&S(T.normalMap.channel),displacementMapUv:be&&S(T.displacementMap.channel),emissiveMapUv:rt&&S(T.emissiveMap.channel),metalnessMapUv:Te&&S(T.metalnessMap.channel),roughnessMapUv:M&&S(T.roughnessMap.channel),anisotropyMapUv:ie&&S(T.anisotropyMap.channel),clearcoatMapUv:le&&S(T.clearcoatMap.channel),clearcoatNormalMapUv:Oe&&S(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&S(T.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&S(T.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&S(T.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&S(T.sheenColorMap.channel),sheenRoughnessMapUv:Me&&S(T.sheenRoughnessMap.channel),specularMapUv:$e&&S(T.specularMap.channel),specularColorMapUv:ze&&S(T.specularColorMap.channel),specularIntensityMapUv:ct&&S(T.specularIntensityMap.channel),transmissionMapUv:U&&S(T.transmissionMap.channel),thicknessMapUv:me&&S(T.thicknessMap.channel),alphaMapUv:ne&&S(T.alphaMap.channel),vertexTangents:!!ee.attributes.tangent&&(Ve||v),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!ee.attributes.uv&&(dt||ne),fog:!!G,useFog:T.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:Ce,skinning:B.isSkinnedMesh===!0,morphTargets:ee.morphAttributes.position!==void 0,morphNormals:ee.morphAttributes.normal!==void 0,morphColors:ee.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:we,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:t.shadowMap.enabled&&N.length>0,shadowMapType:t.shadowMap.type,toneMapping:de,decodeVideoTexture:dt&&T.map.isVideoTexture===!0&&tt.getTransfer(T.map.colorSpace)===ut,decodeVideoTextureEmissive:rt&&T.emissiveMap.isVideoTexture===!0&&tt.getTransfer(T.emissiveMap.colorSpace)===ut,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===vi,flipSided:T.side===un,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Z&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Z&&T.extensions.multiDraw===!0||Fe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Le.vertexUv1s=u.has(1),Le.vertexUv2s=u.has(2),Le.vertexUv3s=u.has(3),u.clear(),Le}function d(T){const w=[];if(T.shaderID?w.push(T.shaderID):(w.push(T.customVertexShaderID),w.push(T.customFragmentShaderID)),T.defines!==void 0)for(const N in T.defines)w.push(N),w.push(T.defines[N]);return T.isRawShaderMaterial===!1&&(_(w,T),y(w,T),w.push(t.outputColorSpace)),w.push(T.customProgramCacheKey),w.join()}function _(T,w){T.push(w.precision),T.push(w.outputColorSpace),T.push(w.envMapMode),T.push(w.envMapCubeUVHeight),T.push(w.mapUv),T.push(w.alphaMapUv),T.push(w.lightMapUv),T.push(w.aoMapUv),T.push(w.bumpMapUv),T.push(w.normalMapUv),T.push(w.displacementMapUv),T.push(w.emissiveMapUv),T.push(w.metalnessMapUv),T.push(w.roughnessMapUv),T.push(w.anisotropyMapUv),T.push(w.clearcoatMapUv),T.push(w.clearcoatNormalMapUv),T.push(w.clearcoatRoughnessMapUv),T.push(w.iridescenceMapUv),T.push(w.iridescenceThicknessMapUv),T.push(w.sheenColorMapUv),T.push(w.sheenRoughnessMapUv),T.push(w.specularMapUv),T.push(w.specularColorMapUv),T.push(w.specularIntensityMapUv),T.push(w.transmissionMapUv),T.push(w.thicknessMapUv),T.push(w.combine),T.push(w.fogExp2),T.push(w.sizeAttenuation),T.push(w.morphTargetsCount),T.push(w.morphAttributeCount),T.push(w.numDirLights),T.push(w.numPointLights),T.push(w.numSpotLights),T.push(w.numSpotLightMaps),T.push(w.numHemiLights),T.push(w.numRectAreaLights),T.push(w.numDirLightShadows),T.push(w.numPointLightShadows),T.push(w.numSpotLightShadows),T.push(w.numSpotLightShadowsWithMaps),T.push(w.numLightProbes),T.push(w.shadowMapType),T.push(w.toneMapping),T.push(w.numClippingPlanes),T.push(w.numClipIntersection),T.push(w.depthPacking)}function y(T,w){o.disableAll(),w.supportsVertexTextures&&o.enable(0),w.instancing&&o.enable(1),w.instancingColor&&o.enable(2),w.instancingMorph&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),w.dispersion&&o.enable(20),w.batchingColor&&o.enable(21),T.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reverseDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),T.push(o.mask)}function E(T){const w=x[T.type];let N;if(w){const k=ni[w];N=FS.clone(k.uniforms)}else N=T.uniforms;return N}function R(T,w){let N;for(let k=0,B=f.length;k<B;k++){const G=f[k];if(G.cacheKey===w){N=G,++N.usedTimes;break}}return N===void 0&&(N=new rA(t,w,T,s),f.push(N)),N}function C(T){if(--T.usedTimes===0){const w=f.indexOf(T);f[w]=f[f.length-1],f.pop(),T.destroy()}}function b(T){l.remove(T)}function P(){l.dispose()}return{getParameters:g,getProgramCacheKey:d,getUniforms:E,acquireProgram:R,releaseProgram:C,releaseShaderCache:b,programs:f,dispose:P}}function cA(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function uA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function im(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function rm(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(p,h,m,x,S,g){let d=t[e];return d===void 0?(d={id:p.id,object:p,geometry:h,material:m,groupOrder:x,renderOrder:p.renderOrder,z:S,group:g},t[e]=d):(d.id=p.id,d.object=p,d.geometry=h,d.material=m,d.groupOrder=x,d.renderOrder=p.renderOrder,d.z=S,d.group=g),e++,d}function o(p,h,m,x,S,g){const d=a(p,h,m,x,S,g);m.transmission>0?i.push(d):m.transparent===!0?r.push(d):n.push(d)}function l(p,h,m,x,S,g){const d=a(p,h,m,x,S,g);m.transmission>0?i.unshift(d):m.transparent===!0?r.unshift(d):n.unshift(d)}function u(p,h){n.length>1&&n.sort(p||uA),i.length>1&&i.sort(h||im),r.length>1&&r.sort(h||im)}function f(){for(let p=e,h=t.length;p<h;p++){const m=t[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:f,sort:u}}function dA(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new rm,t.set(i,[a])):r>=s.length?(a=new rm,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function hA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new H,color:new it};break;case"SpotLight":n={position:new H,direction:new H,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new H,color:new it,distance:0,decay:0};break;case"HemisphereLight":n={direction:new H,skyColor:new it,groundColor:new it};break;case"RectAreaLight":n={color:new it,position:new H,halfWidth:new H,halfHeight:new H};break}return t[e.id]=n,n}}}function fA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let pA=0;function mA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function gA(t){const e=new hA,n=fA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new H);const r=new H,s=new Pt,a=new Pt;function o(u){let f=0,p=0,h=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let m=0,x=0,S=0,g=0,d=0,_=0,y=0,E=0,R=0,C=0,b=0;u.sort(mA);for(let T=0,w=u.length;T<w;T++){const N=u[T],k=N.color,B=N.intensity,G=N.distance,ee=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)f+=k.r*B,p+=k.g*B,h+=k.b*B;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(N.sh.coefficients[Y],B);b++}else if(N.isDirectionalLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const te=N.shadow,D=n.get(N);D.shadowIntensity=te.intensity,D.shadowBias=te.bias,D.shadowNormalBias=te.normalBias,D.shadowRadius=te.radius,D.shadowMapSize=te.mapSize,i.directionalShadow[m]=D,i.directionalShadowMap[m]=ee,i.directionalShadowMatrix[m]=N.shadow.matrix,_++}i.directional[m]=Y,m++}else if(N.isSpotLight){const Y=e.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(k).multiplyScalar(B),Y.distance=G,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,i.spot[S]=Y;const te=N.shadow;if(N.map&&(i.spotLightMap[R]=N.map,R++,te.updateMatrices(N),N.castShadow&&C++),i.spotLightMatrix[S]=te.matrix,N.castShadow){const D=n.get(N);D.shadowIntensity=te.intensity,D.shadowBias=te.bias,D.shadowNormalBias=te.normalBias,D.shadowRadius=te.radius,D.shadowMapSize=te.mapSize,i.spotShadow[S]=D,i.spotShadowMap[S]=ee,E++}S++}else if(N.isRectAreaLight){const Y=e.get(N);Y.color.copy(k).multiplyScalar(B),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),i.rectArea[g]=Y,g++}else if(N.isPointLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){const te=N.shadow,D=n.get(N);D.shadowIntensity=te.intensity,D.shadowBias=te.bias,D.shadowNormalBias=te.normalBias,D.shadowRadius=te.radius,D.shadowMapSize=te.mapSize,D.shadowCameraNear=te.camera.near,D.shadowCameraFar=te.camera.far,i.pointShadow[x]=D,i.pointShadowMap[x]=ee,i.pointShadowMatrix[x]=N.shadow.matrix,y++}i.point[x]=Y,x++}else if(N.isHemisphereLight){const Y=e.get(N);Y.skyColor.copy(N.color).multiplyScalar(B),Y.groundColor.copy(N.groundColor).multiplyScalar(B),i.hemi[d]=Y,d++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=h;const P=i.hash;(P.directionalLength!==m||P.pointLength!==x||P.spotLength!==S||P.rectAreaLength!==g||P.hemiLength!==d||P.numDirectionalShadows!==_||P.numPointShadows!==y||P.numSpotShadows!==E||P.numSpotMaps!==R||P.numLightProbes!==b)&&(i.directional.length=m,i.spot.length=S,i.rectArea.length=g,i.point.length=x,i.hemi.length=d,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=E+R-C,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=b,P.directionalLength=m,P.pointLength=x,P.spotLength=S,P.rectAreaLength=g,P.hemiLength=d,P.numDirectionalShadows=_,P.numPointShadows=y,P.numSpotShadows=E,P.numSpotMaps=R,P.numLightProbes=b,i.version=pA++)}function l(u,f){let p=0,h=0,m=0,x=0,S=0;const g=f.matrixWorldInverse;for(let d=0,_=u.length;d<_;d++){const y=u[d];if(y.isDirectionalLight){const E=i.directional[p];E.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(g),p++}else if(y.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(g),m++}else if(y.isRectAreaLight){const E=i.rectArea[x];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(g),a.identity(),s.copy(y.matrixWorld),s.premultiply(g),a.extractRotation(s),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){const E=i.point[h];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(g),h++}else if(y.isHemisphereLight){const E=i.hemi[S];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(g),S++}}}return{setup:o,setupView:l,state:i}}function sm(t){const e=new gA(t),n=[],i=[];function r(f){u.camera=f,n.length=0,i.length=0}function s(f){n.push(f)}function a(f){i.push(f)}function o(){e.setup(n)}function l(f){e.setupView(n,f)}const u={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function vA(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new sm(t),e.set(r,[o])):s>=a.length?(o=new sm(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const _A=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function yA(t,e,n){let i=new Gv;const r=new lt,s=new lt,a=new At,o=new WS({depthPacking:sS}),l=new XS,u={},f=n.maxTextureSize,p={[rr]:un,[un]:rr,[vi]:vi},h=new sr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:_A,fragmentShader:xA}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const x=new Pi;x.setAttribute("position",new oi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new yn(x,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xv;let d=this.type;this.render=function(C,b,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;const T=t.getRenderTarget(),w=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),k=t.state;k.setBlending(er),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const B=d!==pi&&this.type===pi,G=d===pi&&this.type!==pi;for(let ee=0,Y=C.length;ee<Y;ee++){const te=C[ee],D=te.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const Q=D.getFrameExtents();if(r.multiply(Q),s.copy(D.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/Q.x),r.x=s.x*Q.x,D.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/Q.y),r.y=s.y*Q.y,D.mapSize.y=s.y)),D.map===null||B===!0||G===!0){const he=this.type!==pi?{minFilter:Qn,magFilter:Qn}:{};D.map!==null&&D.map.dispose(),D.map=new zr(r.x,r.y,he),D.map.texture.name=te.name+".shadowMap",D.camera.updateProjectionMatrix()}t.setRenderTarget(D.map),t.clear();const J=D.getViewportCount();for(let he=0;he<J;he++){const we=D.getViewport(he);a.set(s.x*we.x,s.y*we.y,s.x*we.z,s.y*we.w),k.viewport(a),D.updateMatrices(te,he),i=D.getFrustum(),E(b,P,D.camera,te,this.type)}D.isPointLightShadow!==!0&&this.type===pi&&_(D,P),D.needsUpdate=!1}d=this.type,g.needsUpdate=!1,t.setRenderTarget(T,w,N)};function _(C,b){const P=e.update(S);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new zr(r.x,r.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,t.setRenderTarget(C.mapPass),t.clear(),t.renderBufferDirect(b,null,P,h,S,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,t.setRenderTarget(C.map),t.clear(),t.renderBufferDirect(b,null,P,m,S,null)}function y(C,b,P,T){let w=null;const N=P.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(N!==void 0)w=N;else if(w=P.isPointLight===!0?l:o,t.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const k=w.uuid,B=b.uuid;let G=u[k];G===void 0&&(G={},u[k]=G);let ee=G[B];ee===void 0&&(ee=w.clone(),G[B]=ee,b.addEventListener("dispose",R)),w=ee}if(w.visible=b.visible,w.wireframe=b.wireframe,T===pi?w.side=b.shadowSide!==null?b.shadowSide:b.side:w.side=b.shadowSide!==null?b.shadowSide:p[b.side],w.alphaMap=b.alphaMap,w.alphaTest=b.alphaTest,w.map=b.map,w.clipShadows=b.clipShadows,w.clippingPlanes=b.clippingPlanes,w.clipIntersection=b.clipIntersection,w.displacementMap=b.displacementMap,w.displacementScale=b.displacementScale,w.displacementBias=b.displacementBias,w.wireframeLinewidth=b.wireframeLinewidth,w.linewidth=b.linewidth,P.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const k=t.properties.get(w);k.light=P}return w}function E(C,b,P,T,w){if(C.visible===!1)return;if(C.layers.test(b.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&w===pi)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,C.matrixWorld);const B=e.update(C),G=C.material;if(Array.isArray(G)){const ee=B.groups;for(let Y=0,te=ee.length;Y<te;Y++){const D=ee[Y],Q=G[D.materialIndex];if(Q&&Q.visible){const J=y(C,Q,T,w);C.onBeforeShadow(t,C,b,P,B,J,D),t.renderBufferDirect(P,null,B,J,C,D),C.onAfterShadow(t,C,b,P,B,J,D)}}}else if(G.visible){const ee=y(C,G,T,w);C.onBeforeShadow(t,C,b,P,B,ee,null),t.renderBufferDirect(P,null,B,ee,C,null),C.onAfterShadow(t,C,b,P,B,ee,null)}}const k=C.children;for(let B=0,G=k.length;B<G;B++)E(k[B],b,P,T,w)}function R(C){C.target.removeEventListener("dispose",R);for(const P in u){const T=u[P],w=C.target.uuid;w in T&&(T[w].dispose(),delete T[w])}}}const SA={[od]:ld,[cd]:hd,[ud]:fd,[Fs]:dd,[ld]:od,[hd]:cd,[fd]:ud,[dd]:Fs};function MA(t,e){function n(){let U=!1;const me=new At;let K=null;const ne=new At(0,0,0,0);return{setMask:function(ve){K!==ve&&!U&&(t.colorMask(ve,ve,ve,ve),K=ve)},setLocked:function(ve){U=ve},setClear:function(ve,ue,Z,de,Le){Le===!0&&(ve*=de,ue*=de,Z*=de),me.set(ve,ue,Z,de),ne.equals(me)===!1&&(t.clearColor(ve,ue,Z,de),ne.copy(me))},reset:function(){U=!1,K=null,ne.set(-1,0,0,0)}}}function i(){let U=!1,me=!1,K=null,ne=null,ve=null;return{setReversed:function(ue){if(me!==ue){const Z=e.get("EXT_clip_control");me?Z.clipControlEXT(Z.LOWER_LEFT_EXT,Z.ZERO_TO_ONE_EXT):Z.clipControlEXT(Z.LOWER_LEFT_EXT,Z.NEGATIVE_ONE_TO_ONE_EXT);const de=ve;ve=null,this.setClear(de)}me=ue},getReversed:function(){return me},setTest:function(ue){ue?ce(t.DEPTH_TEST):Ce(t.DEPTH_TEST)},setMask:function(ue){K!==ue&&!U&&(t.depthMask(ue),K=ue)},setFunc:function(ue){if(me&&(ue=SA[ue]),ne!==ue){switch(ue){case od:t.depthFunc(t.NEVER);break;case ld:t.depthFunc(t.ALWAYS);break;case cd:t.depthFunc(t.LESS);break;case Fs:t.depthFunc(t.LEQUAL);break;case ud:t.depthFunc(t.EQUAL);break;case dd:t.depthFunc(t.GEQUAL);break;case hd:t.depthFunc(t.GREATER);break;case fd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ne=ue}},setLocked:function(ue){U=ue},setClear:function(ue){ve!==ue&&(me&&(ue=1-ue),t.clearDepth(ue),ve=ue)},reset:function(){U=!1,K=null,ne=null,ve=null,me=!1}}}function r(){let U=!1,me=null,K=null,ne=null,ve=null,ue=null,Z=null,de=null,Le=null;return{setTest:function(Re){U||(Re?ce(t.STENCIL_TEST):Ce(t.STENCIL_TEST))},setMask:function(Re){me!==Re&&!U&&(t.stencilMask(Re),me=Re)},setFunc:function(Re,Xe,Ge){(K!==Re||ne!==Xe||ve!==Ge)&&(t.stencilFunc(Re,Xe,Ge),K=Re,ne=Xe,ve=Ge)},setOp:function(Re,Xe,Ge){(ue!==Re||Z!==Xe||de!==Ge)&&(t.stencilOp(Re,Xe,Ge),ue=Re,Z=Xe,de=Ge)},setLocked:function(Re){U=Re},setClear:function(Re){Le!==Re&&(t.clearStencil(Re),Le=Re)},reset:function(){U=!1,me=null,K=null,ne=null,ve=null,ue=null,Z=null,de=null,Le=null}}}const s=new n,a=new i,o=new r,l=new WeakMap,u=new WeakMap;let f={},p={},h=new WeakMap,m=[],x=null,S=!1,g=null,d=null,_=null,y=null,E=null,R=null,C=null,b=new it(0,0,0),P=0,T=!1,w=null,N=null,k=null,B=null,G=null;const ee=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,te=0;const D=t.getParameter(t.VERSION);D.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(D)[1]),Y=te>=1):D.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),Y=te>=2);let Q=null,J={};const he=t.getParameter(t.SCISSOR_BOX),we=t.getParameter(t.VIEWPORT),qe=new At().fromArray(he),$=new At().fromArray(we);function ae(U,me,K,ne){const ve=new Uint8Array(4),ue=t.createTexture();t.bindTexture(U,ue),t.texParameteri(U,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(U,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Z=0;Z<K;Z++)U===t.TEXTURE_3D||U===t.TEXTURE_2D_ARRAY?t.texImage3D(me,0,t.RGBA,1,1,ne,0,t.RGBA,t.UNSIGNED_BYTE,ve):t.texImage2D(me+Z,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ve);return ue}const _e={};_e[t.TEXTURE_2D]=ae(t.TEXTURE_2D,t.TEXTURE_2D,1),_e[t.TEXTURE_CUBE_MAP]=ae(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[t.TEXTURE_2D_ARRAY]=ae(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),_e[t.TEXTURE_3D]=ae(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ce(t.DEPTH_TEST),a.setFunc(Fs),Be(!1),Ve(up),ce(t.CULL_FACE),L(er);function ce(U){f[U]!==!0&&(t.enable(U),f[U]=!0)}function Ce(U){f[U]!==!1&&(t.disable(U),f[U]=!1)}function Ie(U,me){return p[U]!==me?(t.bindFramebuffer(U,me),p[U]=me,U===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=me),U===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=me),!0):!1}function Fe(U,me){let K=m,ne=!1;if(U){K=h.get(me),K===void 0&&(K=[],h.set(me,K));const ve=U.textures;if(K.length!==ve.length||K[0]!==t.COLOR_ATTACHMENT0){for(let ue=0,Z=ve.length;ue<Z;ue++)K[ue]=t.COLOR_ATTACHMENT0+ue;K.length=ve.length,ne=!0}}else K[0]!==t.BACK&&(K[0]=t.BACK,ne=!0);ne&&t.drawBuffers(K)}function dt(U){return x!==U?(t.useProgram(U),x=U,!0):!1}const We={[wr]:t.FUNC_ADD,[Ny]:t.FUNC_SUBTRACT,[Ly]:t.FUNC_REVERSE_SUBTRACT};We[Dy]=t.MIN,We[Iy]=t.MAX;const Ze={[Uy]:t.ZERO,[ky]:t.ONE,[Fy]:t.SRC_COLOR,[sd]:t.SRC_ALPHA,[Vy]:t.SRC_ALPHA_SATURATE,[jy]:t.DST_COLOR,[zy]:t.DST_ALPHA,[Oy]:t.ONE_MINUS_SRC_COLOR,[ad]:t.ONE_MINUS_SRC_ALPHA,[Hy]:t.ONE_MINUS_DST_COLOR,[By]:t.ONE_MINUS_DST_ALPHA,[Gy]:t.CONSTANT_COLOR,[Wy]:t.ONE_MINUS_CONSTANT_COLOR,[Xy]:t.CONSTANT_ALPHA,[Ky]:t.ONE_MINUS_CONSTANT_ALPHA};function L(U,me,K,ne,ve,ue,Z,de,Le,Re){if(U===er){S===!0&&(Ce(t.BLEND),S=!1);return}if(S===!1&&(ce(t.BLEND),S=!0),U!==Py){if(U!==g||Re!==T){if((d!==wr||E!==wr)&&(t.blendEquation(t.FUNC_ADD),d=wr,E=wr),Re)switch(U){case As:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case dp:t.blendFunc(t.ONE,t.ONE);break;case hp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case fp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case As:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case dp:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case hp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case fp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}_=null,y=null,R=null,C=null,b.set(0,0,0),P=0,g=U,T=Re}return}ve=ve||me,ue=ue||K,Z=Z||ne,(me!==d||ve!==E)&&(t.blendEquationSeparate(We[me],We[ve]),d=me,E=ve),(K!==_||ne!==y||ue!==R||Z!==C)&&(t.blendFuncSeparate(Ze[K],Ze[ne],Ze[ue],Ze[Z]),_=K,y=ne,R=ue,C=Z),(de.equals(b)===!1||Le!==P)&&(t.blendColor(de.r,de.g,de.b,Le),b.copy(de),P=Le),g=U,T=!1}function kt(U,me){U.side===vi?Ce(t.CULL_FACE):ce(t.CULL_FACE);let K=U.side===un;me&&(K=!K),Be(K),U.blending===As&&U.transparent===!1?L(er):L(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const ne=U.stencilWrite;o.setTest(ne),ne&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),rt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ce(t.SAMPLE_ALPHA_TO_COVERAGE):Ce(t.SAMPLE_ALPHA_TO_COVERAGE)}function Be(U){w!==U&&(U?t.frontFace(t.CW):t.frontFace(t.CCW),w=U)}function Ve(U){U!==by?(ce(t.CULL_FACE),U!==N&&(U===up?t.cullFace(t.BACK):U===Cy?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Ce(t.CULL_FACE),N=U}function be(U){U!==k&&(Y&&t.lineWidth(U),k=U)}function rt(U,me,K){U?(ce(t.POLYGON_OFFSET_FILL),(B!==me||G!==K)&&(t.polygonOffset(me,K),B=me,G=K)):Ce(t.POLYGON_OFFSET_FILL)}function Te(U){U?ce(t.SCISSOR_TEST):Ce(t.SCISSOR_TEST)}function M(U){U===void 0&&(U=t.TEXTURE0+ee-1),Q!==U&&(t.activeTexture(U),Q=U)}function v(U,me,K){K===void 0&&(Q===null?K=t.TEXTURE0+ee-1:K=Q);let ne=J[K];ne===void 0&&(ne={type:void 0,texture:void 0},J[K]=ne),(ne.type!==U||ne.texture!==me)&&(Q!==K&&(t.activeTexture(K),Q=K),t.bindTexture(U,me||_e[U]),ne.type=U,ne.texture=me)}function I(){const U=J[Q];U!==void 0&&U.type!==void 0&&(t.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function z(){try{t.compressedTexImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function q(){try{t.compressedTexImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function X(){try{t.texSubImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function W(){try{t.texSubImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ie(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Oe(){try{t.texStorage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{t.texStorage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ye(){try{t.texImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xe(){try{t.texImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pe(U){qe.equals(U)===!1&&(t.scissor(U.x,U.y,U.z,U.w),qe.copy(U))}function Me(U){$.equals(U)===!1&&(t.viewport(U.x,U.y,U.z,U.w),$.copy(U))}function $e(U,me){let K=u.get(me);K===void 0&&(K=new WeakMap,u.set(me,K));let ne=K.get(U);ne===void 0&&(ne=t.getUniformBlockIndex(me,U.name),K.set(U,ne))}function ze(U,me){const ne=u.get(me).get(U);l.get(me)!==ne&&(t.uniformBlockBinding(me,ne,U.__bindingPointIndex),l.set(me,ne))}function ct(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),f={},Q=null,J={},p={},h=new WeakMap,m=[],x=null,S=!1,g=null,d=null,_=null,y=null,E=null,R=null,C=null,b=new it(0,0,0),P=0,T=!1,w=null,N=null,k=null,B=null,G=null,qe.set(0,0,t.canvas.width,t.canvas.height),$.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ce,disable:Ce,bindFramebuffer:Ie,drawBuffers:Fe,useProgram:dt,setBlending:L,setMaterial:kt,setFlipSided:Be,setCullFace:Ve,setLineWidth:be,setPolygonOffset:rt,setScissorTest:Te,activeTexture:M,bindTexture:v,unbindTexture:I,compressedTexImage2D:z,compressedTexImage3D:q,texImage2D:ye,texImage3D:xe,updateUBOMapping:$e,uniformBlockBinding:ze,texStorage2D:Oe,texStorage3D:re,texSubImage2D:X,texSubImage3D:W,compressedTexSubImage2D:ie,compressedTexSubImage3D:le,scissor:Pe,viewport:Me,reset:ct}}function EA(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new lt,f=new WeakMap;let p;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(M,v){return m?new OffscreenCanvas(M,v):Fl("canvas")}function S(M,v,I){let z=1;const q=Te(M);if((q.width>I||q.height>I)&&(z=I/Math.max(q.width,q.height)),z<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const X=Math.floor(z*q.width),W=Math.floor(z*q.height);p===void 0&&(p=x(X,W));const ie=v?x(X,W):p;return ie.width=X,ie.height=W,ie.getContext("2d").drawImage(M,0,0,X,W),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+X+"x"+W+")."),ie}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),M;return M}function g(M){return M.generateMipmaps}function d(M){t.generateMipmap(M)}function _(M){return M.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?t.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function y(M,v,I,z,q=!1){if(M!==null){if(t[M]!==void 0)return t[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let X=v;if(v===t.RED&&(I===t.FLOAT&&(X=t.R32F),I===t.HALF_FLOAT&&(X=t.R16F),I===t.UNSIGNED_BYTE&&(X=t.R8)),v===t.RED_INTEGER&&(I===t.UNSIGNED_BYTE&&(X=t.R8UI),I===t.UNSIGNED_SHORT&&(X=t.R16UI),I===t.UNSIGNED_INT&&(X=t.R32UI),I===t.BYTE&&(X=t.R8I),I===t.SHORT&&(X=t.R16I),I===t.INT&&(X=t.R32I)),v===t.RG&&(I===t.FLOAT&&(X=t.RG32F),I===t.HALF_FLOAT&&(X=t.RG16F),I===t.UNSIGNED_BYTE&&(X=t.RG8)),v===t.RG_INTEGER&&(I===t.UNSIGNED_BYTE&&(X=t.RG8UI),I===t.UNSIGNED_SHORT&&(X=t.RG16UI),I===t.UNSIGNED_INT&&(X=t.RG32UI),I===t.BYTE&&(X=t.RG8I),I===t.SHORT&&(X=t.RG16I),I===t.INT&&(X=t.RG32I)),v===t.RGB_INTEGER&&(I===t.UNSIGNED_BYTE&&(X=t.RGB8UI),I===t.UNSIGNED_SHORT&&(X=t.RGB16UI),I===t.UNSIGNED_INT&&(X=t.RGB32UI),I===t.BYTE&&(X=t.RGB8I),I===t.SHORT&&(X=t.RGB16I),I===t.INT&&(X=t.RGB32I)),v===t.RGBA_INTEGER&&(I===t.UNSIGNED_BYTE&&(X=t.RGBA8UI),I===t.UNSIGNED_SHORT&&(X=t.RGBA16UI),I===t.UNSIGNED_INT&&(X=t.RGBA32UI),I===t.BYTE&&(X=t.RGBA8I),I===t.SHORT&&(X=t.RGBA16I),I===t.INT&&(X=t.RGBA32I)),v===t.RGB&&I===t.UNSIGNED_INT_5_9_9_9_REV&&(X=t.RGB9_E5),v===t.RGBA){const W=q?Ul:tt.getTransfer(z);I===t.FLOAT&&(X=t.RGBA32F),I===t.HALF_FLOAT&&(X=t.RGBA16F),I===t.UNSIGNED_BYTE&&(X=W===ut?t.SRGB8_ALPHA8:t.RGBA8),I===t.UNSIGNED_SHORT_4_4_4_4&&(X=t.RGBA4),I===t.UNSIGNED_SHORT_5_5_5_1&&(X=t.RGB5_A1)}return(X===t.R16F||X===t.R32F||X===t.RG16F||X===t.RG32F||X===t.RGBA16F||X===t.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function E(M,v){let I;return M?v===null||v===Or||v===Bs?I=t.DEPTH24_STENCIL8:v===yi?I=t.DEPTH32F_STENCIL8:v===Ha&&(I=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Or||v===Bs?I=t.DEPTH_COMPONENT24:v===yi?I=t.DEPTH_COMPONENT32F:v===Ha&&(I=t.DEPTH_COMPONENT16),I}function R(M,v){return g(M)===!0||M.isFramebufferTexture&&M.minFilter!==Qn&&M.minFilter!==ri?Math.log2(Math.max(v.width,v.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?v.mipmaps.length:1}function C(M){const v=M.target;v.removeEventListener("dispose",C),P(v),v.isVideoTexture&&f.delete(v)}function b(M){const v=M.target;v.removeEventListener("dispose",b),w(v)}function P(M){const v=i.get(M);if(v.__webglInit===void 0)return;const I=M.source,z=h.get(I);if(z){const q=z[v.__cacheKey];q.usedTimes--,q.usedTimes===0&&T(M),Object.keys(z).length===0&&h.delete(I)}i.remove(M)}function T(M){const v=i.get(M);t.deleteTexture(v.__webglTexture);const I=M.source,z=h.get(I);delete z[v.__cacheKey],a.memory.textures--}function w(M){const v=i.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),i.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(v.__webglFramebuffer[z]))for(let q=0;q<v.__webglFramebuffer[z].length;q++)t.deleteFramebuffer(v.__webglFramebuffer[z][q]);else t.deleteFramebuffer(v.__webglFramebuffer[z]);v.__webglDepthbuffer&&t.deleteRenderbuffer(v.__webglDepthbuffer[z])}else{if(Array.isArray(v.__webglFramebuffer))for(let z=0;z<v.__webglFramebuffer.length;z++)t.deleteFramebuffer(v.__webglFramebuffer[z]);else t.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&t.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&t.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let z=0;z<v.__webglColorRenderbuffer.length;z++)v.__webglColorRenderbuffer[z]&&t.deleteRenderbuffer(v.__webglColorRenderbuffer[z]);v.__webglDepthRenderbuffer&&t.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const I=M.textures;for(let z=0,q=I.length;z<q;z++){const X=i.get(I[z]);X.__webglTexture&&(t.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(I[z])}i.remove(M)}let N=0;function k(){N=0}function B(){const M=N;return M>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+r.maxTextures),N+=1,M}function G(M){const v=[];return v.push(M.wrapS),v.push(M.wrapT),v.push(M.wrapR||0),v.push(M.magFilter),v.push(M.minFilter),v.push(M.anisotropy),v.push(M.internalFormat),v.push(M.format),v.push(M.type),v.push(M.generateMipmaps),v.push(M.premultiplyAlpha),v.push(M.flipY),v.push(M.unpackAlignment),v.push(M.colorSpace),v.join()}function ee(M,v){const I=i.get(M);if(M.isVideoTexture&&be(M),M.isRenderTargetTexture===!1&&M.version>0&&I.__version!==M.version){const z=M.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(I,M,v);return}}n.bindTexture(t.TEXTURE_2D,I.__webglTexture,t.TEXTURE0+v)}function Y(M,v){const I=i.get(M);if(M.version>0&&I.__version!==M.version){$(I,M,v);return}n.bindTexture(t.TEXTURE_2D_ARRAY,I.__webglTexture,t.TEXTURE0+v)}function te(M,v){const I=i.get(M);if(M.version>0&&I.__version!==M.version){$(I,M,v);return}n.bindTexture(t.TEXTURE_3D,I.__webglTexture,t.TEXTURE0+v)}function D(M,v){const I=i.get(M);if(M.version>0&&I.__version!==M.version){ae(I,M,v);return}n.bindTexture(t.TEXTURE_CUBE_MAP,I.__webglTexture,t.TEXTURE0+v)}const Q={[gd]:t.REPEAT,[Rr]:t.CLAMP_TO_EDGE,[vd]:t.MIRRORED_REPEAT},J={[Qn]:t.NEAREST,[iS]:t.NEAREST_MIPMAP_NEAREST,[To]:t.NEAREST_MIPMAP_LINEAR,[ri]:t.LINEAR,[Lc]:t.LINEAR_MIPMAP_NEAREST,[Pr]:t.LINEAR_MIPMAP_LINEAR},he={[oS]:t.NEVER,[fS]:t.ALWAYS,[lS]:t.LESS,[Dv]:t.LEQUAL,[cS]:t.EQUAL,[hS]:t.GEQUAL,[uS]:t.GREATER,[dS]:t.NOTEQUAL};function we(M,v){if(v.type===yi&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===ri||v.magFilter===Lc||v.magFilter===To||v.magFilter===Pr||v.minFilter===ri||v.minFilter===Lc||v.minFilter===To||v.minFilter===Pr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(M,t.TEXTURE_WRAP_S,Q[v.wrapS]),t.texParameteri(M,t.TEXTURE_WRAP_T,Q[v.wrapT]),(M===t.TEXTURE_3D||M===t.TEXTURE_2D_ARRAY)&&t.texParameteri(M,t.TEXTURE_WRAP_R,Q[v.wrapR]),t.texParameteri(M,t.TEXTURE_MAG_FILTER,J[v.magFilter]),t.texParameteri(M,t.TEXTURE_MIN_FILTER,J[v.minFilter]),v.compareFunction&&(t.texParameteri(M,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(M,t.TEXTURE_COMPARE_FUNC,he[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Qn||v.minFilter!==To&&v.minFilter!==Pr||v.type===yi&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");t.texParameterf(M,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function qe(M,v){let I=!1;M.__webglInit===void 0&&(M.__webglInit=!0,v.addEventListener("dispose",C));const z=v.source;let q=h.get(z);q===void 0&&(q={},h.set(z,q));const X=G(v);if(X!==M.__cacheKey){q[X]===void 0&&(q[X]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,I=!0),q[X].usedTimes++;const W=q[M.__cacheKey];W!==void 0&&(q[M.__cacheKey].usedTimes--,W.usedTimes===0&&T(v)),M.__cacheKey=X,M.__webglTexture=q[X].texture}return I}function $(M,v,I){let z=t.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(z=t.TEXTURE_2D_ARRAY),v.isData3DTexture&&(z=t.TEXTURE_3D);const q=qe(M,v),X=v.source;n.bindTexture(z,M.__webglTexture,t.TEXTURE0+I);const W=i.get(X);if(X.version!==W.__version||q===!0){n.activeTexture(t.TEXTURE0+I);const ie=tt.getPrimaries(tt.workingColorSpace),le=v.colorSpace===Vi?null:tt.getPrimaries(v.colorSpace),Oe=v.colorSpace===Vi||ie===le?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe);let re=S(v.image,!1,r.maxTextureSize);re=rt(v,re);const ye=s.convert(v.format,v.colorSpace),xe=s.convert(v.type);let Pe=y(v.internalFormat,ye,xe,v.colorSpace,v.isVideoTexture);we(z,v);let Me;const $e=v.mipmaps,ze=v.isVideoTexture!==!0,ct=W.__version===void 0||q===!0,U=X.dataReady,me=R(v,re);if(v.isDepthTexture)Pe=E(v.format===js,v.type),ct&&(ze?n.texStorage2D(t.TEXTURE_2D,1,Pe,re.width,re.height):n.texImage2D(t.TEXTURE_2D,0,Pe,re.width,re.height,0,ye,xe,null));else if(v.isDataTexture)if($e.length>0){ze&&ct&&n.texStorage2D(t.TEXTURE_2D,me,Pe,$e[0].width,$e[0].height);for(let K=0,ne=$e.length;K<ne;K++)Me=$e[K],ze?U&&n.texSubImage2D(t.TEXTURE_2D,K,0,0,Me.width,Me.height,ye,xe,Me.data):n.texImage2D(t.TEXTURE_2D,K,Pe,Me.width,Me.height,0,ye,xe,Me.data);v.generateMipmaps=!1}else ze?(ct&&n.texStorage2D(t.TEXTURE_2D,me,Pe,re.width,re.height),U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,re.width,re.height,ye,xe,re.data)):n.texImage2D(t.TEXTURE_2D,0,Pe,re.width,re.height,0,ye,xe,re.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ze&&ct&&n.texStorage3D(t.TEXTURE_2D_ARRAY,me,Pe,$e[0].width,$e[0].height,re.depth);for(let K=0,ne=$e.length;K<ne;K++)if(Me=$e[K],v.format!==$n)if(ye!==null)if(ze){if(U)if(v.layerUpdates.size>0){const ve=Up(Me.width,Me.height,v.format,v.type);for(const ue of v.layerUpdates){const Z=Me.data.subarray(ue*ve/Me.data.BYTES_PER_ELEMENT,(ue+1)*ve/Me.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,K,0,0,ue,Me.width,Me.height,1,ye,Z)}v.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,K,0,0,0,Me.width,Me.height,re.depth,ye,Me.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,K,Pe,Me.width,Me.height,re.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?U&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,K,0,0,0,Me.width,Me.height,re.depth,ye,xe,Me.data):n.texImage3D(t.TEXTURE_2D_ARRAY,K,Pe,Me.width,Me.height,re.depth,0,ye,xe,Me.data)}else{ze&&ct&&n.texStorage2D(t.TEXTURE_2D,me,Pe,$e[0].width,$e[0].height);for(let K=0,ne=$e.length;K<ne;K++)Me=$e[K],v.format!==$n?ye!==null?ze?U&&n.compressedTexSubImage2D(t.TEXTURE_2D,K,0,0,Me.width,Me.height,ye,Me.data):n.compressedTexImage2D(t.TEXTURE_2D,K,Pe,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?U&&n.texSubImage2D(t.TEXTURE_2D,K,0,0,Me.width,Me.height,ye,xe,Me.data):n.texImage2D(t.TEXTURE_2D,K,Pe,Me.width,Me.height,0,ye,xe,Me.data)}else if(v.isDataArrayTexture)if(ze){if(ct&&n.texStorage3D(t.TEXTURE_2D_ARRAY,me,Pe,re.width,re.height,re.depth),U)if(v.layerUpdates.size>0){const K=Up(re.width,re.height,v.format,v.type);for(const ne of v.layerUpdates){const ve=re.data.subarray(ne*K/re.data.BYTES_PER_ELEMENT,(ne+1)*K/re.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ne,re.width,re.height,1,ye,xe,ve)}v.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ye,xe,re.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Pe,re.width,re.height,re.depth,0,ye,xe,re.data);else if(v.isData3DTexture)ze?(ct&&n.texStorage3D(t.TEXTURE_3D,me,Pe,re.width,re.height,re.depth),U&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ye,xe,re.data)):n.texImage3D(t.TEXTURE_3D,0,Pe,re.width,re.height,re.depth,0,ye,xe,re.data);else if(v.isFramebufferTexture){if(ct)if(ze)n.texStorage2D(t.TEXTURE_2D,me,Pe,re.width,re.height);else{let K=re.width,ne=re.height;for(let ve=0;ve<me;ve++)n.texImage2D(t.TEXTURE_2D,ve,Pe,K,ne,0,ye,xe,null),K>>=1,ne>>=1}}else if($e.length>0){if(ze&&ct){const K=Te($e[0]);n.texStorage2D(t.TEXTURE_2D,me,Pe,K.width,K.height)}for(let K=0,ne=$e.length;K<ne;K++)Me=$e[K],ze?U&&n.texSubImage2D(t.TEXTURE_2D,K,0,0,ye,xe,Me):n.texImage2D(t.TEXTURE_2D,K,Pe,ye,xe,Me);v.generateMipmaps=!1}else if(ze){if(ct){const K=Te(re);n.texStorage2D(t.TEXTURE_2D,me,Pe,K.width,K.height)}U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ye,xe,re)}else n.texImage2D(t.TEXTURE_2D,0,Pe,ye,xe,re);g(v)&&d(z),W.__version=X.version,v.onUpdate&&v.onUpdate(v)}M.__version=v.version}function ae(M,v,I){if(v.image.length!==6)return;const z=qe(M,v),q=v.source;n.bindTexture(t.TEXTURE_CUBE_MAP,M.__webglTexture,t.TEXTURE0+I);const X=i.get(q);if(q.version!==X.__version||z===!0){n.activeTexture(t.TEXTURE0+I);const W=tt.getPrimaries(tt.workingColorSpace),ie=v.colorSpace===Vi?null:tt.getPrimaries(v.colorSpace),le=v.colorSpace===Vi||W===ie?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);const Oe=v.isCompressedTexture||v.image[0].isCompressedTexture,re=v.image[0]&&v.image[0].isDataTexture,ye=[];for(let ne=0;ne<6;ne++)!Oe&&!re?ye[ne]=S(v.image[ne],!0,r.maxCubemapSize):ye[ne]=re?v.image[ne].image:v.image[ne],ye[ne]=rt(v,ye[ne]);const xe=ye[0],Pe=s.convert(v.format,v.colorSpace),Me=s.convert(v.type),$e=y(v.internalFormat,Pe,Me,v.colorSpace),ze=v.isVideoTexture!==!0,ct=X.__version===void 0||z===!0,U=q.dataReady;let me=R(v,xe);we(t.TEXTURE_CUBE_MAP,v);let K;if(Oe){ze&&ct&&n.texStorage2D(t.TEXTURE_CUBE_MAP,me,$e,xe.width,xe.height);for(let ne=0;ne<6;ne++){K=ye[ne].mipmaps;for(let ve=0;ve<K.length;ve++){const ue=K[ve];v.format!==$n?Pe!==null?ze?U&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve,0,0,ue.width,ue.height,Pe,ue.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve,$e,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve,0,0,ue.width,ue.height,Pe,Me,ue.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve,$e,ue.width,ue.height,0,Pe,Me,ue.data)}}}else{if(K=v.mipmaps,ze&&ct){K.length>0&&me++;const ne=Te(ye[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,me,$e,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(re){ze?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ye[ne].width,ye[ne].height,Pe,Me,ye[ne].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,$e,ye[ne].width,ye[ne].height,0,Pe,Me,ye[ne].data);for(let ve=0;ve<K.length;ve++){const Z=K[ve].image[ne].image;ze?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve+1,0,0,Z.width,Z.height,Pe,Me,Z.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve+1,$e,Z.width,Z.height,0,Pe,Me,Z.data)}}else{ze?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Pe,Me,ye[ne]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,$e,Pe,Me,ye[ne]);for(let ve=0;ve<K.length;ve++){const ue=K[ve];ze?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve+1,0,0,Pe,Me,ue.image[ne]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve+1,$e,Pe,Me,ue.image[ne])}}}g(v)&&d(t.TEXTURE_CUBE_MAP),X.__version=q.version,v.onUpdate&&v.onUpdate(v)}M.__version=v.version}function _e(M,v,I,z,q,X){const W=s.convert(I.format,I.colorSpace),ie=s.convert(I.type),le=y(I.internalFormat,W,ie,I.colorSpace),Oe=i.get(v),re=i.get(I);if(re.__renderTarget=v,!Oe.__hasExternalTextures){const ye=Math.max(1,v.width>>X),xe=Math.max(1,v.height>>X);q===t.TEXTURE_3D||q===t.TEXTURE_2D_ARRAY?n.texImage3D(q,X,le,ye,xe,v.depth,0,W,ie,null):n.texImage2D(q,X,le,ye,xe,0,W,ie,null)}n.bindFramebuffer(t.FRAMEBUFFER,M),Ve(v)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,z,q,re.__webglTexture,0,Be(v)):(q===t.TEXTURE_2D||q>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,z,q,re.__webglTexture,X),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ce(M,v,I){if(t.bindRenderbuffer(t.RENDERBUFFER,M),v.depthBuffer){const z=v.depthTexture,q=z&&z.isDepthTexture?z.type:null,X=E(v.stencilBuffer,q),W=v.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ie=Be(v);Ve(v)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ie,X,v.width,v.height):I?t.renderbufferStorageMultisample(t.RENDERBUFFER,ie,X,v.width,v.height):t.renderbufferStorage(t.RENDERBUFFER,X,v.width,v.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,W,t.RENDERBUFFER,M)}else{const z=v.textures;for(let q=0;q<z.length;q++){const X=z[q],W=s.convert(X.format,X.colorSpace),ie=s.convert(X.type),le=y(X.internalFormat,W,ie,X.colorSpace),Oe=Be(v);I&&Ve(v)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Oe,le,v.width,v.height):Ve(v)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Oe,le,v.width,v.height):t.renderbufferStorage(t.RENDERBUFFER,le,v.width,v.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ce(M,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,M),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const z=i.get(v.depthTexture);z.__renderTarget=v,(!z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),ee(v.depthTexture,0);const q=z.__webglTexture,X=Be(v);if(v.depthTexture.format===bs)Ve(v)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,q,0,X):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,q,0);else if(v.depthTexture.format===js)Ve(v)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,q,0,X):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function Ie(M){const v=i.get(M),I=M.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==M.depthTexture){const z=M.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),z){const q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,z.removeEventListener("dispose",q)};z.addEventListener("dispose",q),v.__depthDisposeCallback=q}v.__boundDepthTexture=z}if(M.depthTexture&&!v.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");Ce(v.__webglFramebuffer,M)}else if(I){v.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer[z]),v.__webglDepthbuffer[z]===void 0)v.__webglDepthbuffer[z]=t.createRenderbuffer(),ce(v.__webglDepthbuffer[z],M,!1);else{const q=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer[z];t.bindRenderbuffer(t.RENDERBUFFER,X),t.framebufferRenderbuffer(t.FRAMEBUFFER,q,t.RENDERBUFFER,X)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=t.createRenderbuffer(),ce(v.__webglDepthbuffer,M,!1);else{const z=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,q),t.framebufferRenderbuffer(t.FRAMEBUFFER,z,t.RENDERBUFFER,q)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Fe(M,v,I){const z=i.get(M);v!==void 0&&_e(z.__webglFramebuffer,M,M.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),I!==void 0&&Ie(M)}function dt(M){const v=M.texture,I=i.get(M),z=i.get(v);M.addEventListener("dispose",b);const q=M.textures,X=M.isWebGLCubeRenderTarget===!0,W=q.length>1;if(W||(z.__webglTexture===void 0&&(z.__webglTexture=t.createTexture()),z.__version=v.version,a.memory.textures++),X){I.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(v.mipmaps&&v.mipmaps.length>0){I.__webglFramebuffer[ie]=[];for(let le=0;le<v.mipmaps.length;le++)I.__webglFramebuffer[ie][le]=t.createFramebuffer()}else I.__webglFramebuffer[ie]=t.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){I.__webglFramebuffer=[];for(let ie=0;ie<v.mipmaps.length;ie++)I.__webglFramebuffer[ie]=t.createFramebuffer()}else I.__webglFramebuffer=t.createFramebuffer();if(W)for(let ie=0,le=q.length;ie<le;ie++){const Oe=i.get(q[ie]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=t.createTexture(),a.memory.textures++)}if(M.samples>0&&Ve(M)===!1){I.__webglMultisampledFramebuffer=t.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let ie=0;ie<q.length;ie++){const le=q[ie];I.__webglColorRenderbuffer[ie]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,I.__webglColorRenderbuffer[ie]);const Oe=s.convert(le.format,le.colorSpace),re=s.convert(le.type),ye=y(le.internalFormat,Oe,re,le.colorSpace,M.isXRRenderTarget===!0),xe=Be(M);t.renderbufferStorageMultisample(t.RENDERBUFFER,xe,ye,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.RENDERBUFFER,I.__webglColorRenderbuffer[ie])}t.bindRenderbuffer(t.RENDERBUFFER,null),M.depthBuffer&&(I.__webglDepthRenderbuffer=t.createRenderbuffer(),ce(I.__webglDepthRenderbuffer,M,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(X){n.bindTexture(t.TEXTURE_CUBE_MAP,z.__webglTexture),we(t.TEXTURE_CUBE_MAP,v);for(let ie=0;ie<6;ie++)if(v.mipmaps&&v.mipmaps.length>0)for(let le=0;le<v.mipmaps.length;le++)_e(I.__webglFramebuffer[ie][le],M,v,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,le);else _e(I.__webglFramebuffer[ie],M,v,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);g(v)&&d(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(W){for(let ie=0,le=q.length;ie<le;ie++){const Oe=q[ie],re=i.get(Oe);n.bindTexture(t.TEXTURE_2D,re.__webglTexture),we(t.TEXTURE_2D,Oe),_e(I.__webglFramebuffer,M,Oe,t.COLOR_ATTACHMENT0+ie,t.TEXTURE_2D,0),g(Oe)&&d(t.TEXTURE_2D)}n.unbindTexture()}else{let ie=t.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(ie=M.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ie,z.__webglTexture),we(ie,v),v.mipmaps&&v.mipmaps.length>0)for(let le=0;le<v.mipmaps.length;le++)_e(I.__webglFramebuffer[le],M,v,t.COLOR_ATTACHMENT0,ie,le);else _e(I.__webglFramebuffer,M,v,t.COLOR_ATTACHMENT0,ie,0);g(v)&&d(ie),n.unbindTexture()}M.depthBuffer&&Ie(M)}function We(M){const v=M.textures;for(let I=0,z=v.length;I<z;I++){const q=v[I];if(g(q)){const X=_(M),W=i.get(q).__webglTexture;n.bindTexture(X,W),d(X),n.unbindTexture()}}}const Ze=[],L=[];function kt(M){if(M.samples>0){if(Ve(M)===!1){const v=M.textures,I=M.width,z=M.height;let q=t.COLOR_BUFFER_BIT;const X=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,W=i.get(M),ie=v.length>1;if(ie)for(let le=0;le<v.length;le++)n.bindFramebuffer(t.FRAMEBUFFER,W.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+le,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,W.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+le,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,W.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,W.__webglFramebuffer);for(let le=0;le<v.length;le++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(q|=t.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(q|=t.STENCIL_BUFFER_BIT)),ie){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,W.__webglColorRenderbuffer[le]);const Oe=i.get(v[le]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Oe,0)}t.blitFramebuffer(0,0,I,z,0,0,I,z,q,t.NEAREST),l===!0&&(Ze.length=0,L.length=0,Ze.push(t.COLOR_ATTACHMENT0+le),M.depthBuffer&&M.resolveDepthBuffer===!1&&(Ze.push(X),L.push(X),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,L)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Ze))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ie)for(let le=0;le<v.length;le++){n.bindFramebuffer(t.FRAMEBUFFER,W.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+le,t.RENDERBUFFER,W.__webglColorRenderbuffer[le]);const Oe=i.get(v[le]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,W.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+le,t.TEXTURE_2D,Oe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,W.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){const v=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[v])}}}function Be(M){return Math.min(r.maxSamples,M.samples)}function Ve(M){const v=i.get(M);return M.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function be(M){const v=a.render.frame;f.get(M)!==v&&(f.set(M,v),M.update())}function rt(M,v){const I=M.colorSpace,z=M.format,q=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||I!==Hs&&I!==Vi&&(tt.getTransfer(I)===ut?(z!==$n||q!==Ci)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),v}function Te(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(u.width=M.naturalWidth||M.width,u.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(u.width=M.displayWidth,u.height=M.displayHeight):(u.width=M.width,u.height=M.height),u}this.allocateTextureUnit=B,this.resetTextureUnits=k,this.setTexture2D=ee,this.setTexture2DArray=Y,this.setTexture3D=te,this.setTextureCube=D,this.rebindTextures=Fe,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Ve}function wA(t,e){function n(i,r=Vi){let s;const a=tt.getTransfer(r);if(i===Ci)return t.UNSIGNED_BYTE;if(i===Vh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Gh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===wv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Mv)return t.BYTE;if(i===Ev)return t.SHORT;if(i===Ha)return t.UNSIGNED_SHORT;if(i===Hh)return t.INT;if(i===Or)return t.UNSIGNED_INT;if(i===yi)return t.FLOAT;if(i===qa)return t.HALF_FLOAT;if(i===Tv)return t.ALPHA;if(i===Av)return t.RGB;if(i===$n)return t.RGBA;if(i===bv)return t.LUMINANCE;if(i===Cv)return t.LUMINANCE_ALPHA;if(i===bs)return t.DEPTH_COMPONENT;if(i===js)return t.DEPTH_STENCIL;if(i===Rv)return t.RED;if(i===Wh)return t.RED_INTEGER;if(i===Pv)return t.RG;if(i===Xh)return t.RG_INTEGER;if(i===Kh)return t.RGBA_INTEGER;if(i===rl||i===sl||i===al||i===ol)if(a===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===rl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===al)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ol)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===rl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===sl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===al)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ol)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===_d||i===xd||i===yd||i===Sd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===_d)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===yd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Sd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Md||i===Ed||i===wd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Md||i===Ed)return a===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===wd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Td||i===Ad||i===bd||i===Cd||i===Rd||i===Pd||i===Nd||i===Ld||i===Dd||i===Id||i===Ud||i===kd||i===Fd||i===Od)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Td)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ad)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===bd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Cd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Rd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Pd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Nd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ld)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Dd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Id)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ud)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===kd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Fd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Od)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ll||i===zd||i===Bd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ll)return a===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===zd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Bd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Nv||i===jd||i===Hd||i===Vd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ll)return s.COMPRESSED_RED_RGTC1_EXT;if(i===jd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Hd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Vd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Bs?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const TA={type:"move"};class ou{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,u=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(u&&e.hand){a=!0;for(const S of e.hand.values()){const g=n.getJointPose(S,i),d=this._getHandJoint(u,S);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const f=u.joints["index-finger-tip"],p=u.joints["thumb-tip"],h=f.position.distanceTo(p.position),m=.02,x=.005;u.inputState.pinching&&h>m+x?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&h<=m-x&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(TA)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new pa;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const AA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class CA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new dn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new sr({vertexShader:AA,fragmentShader:bA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new yn(new eo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class RA extends Ks{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,u=null,f=null,p=null,h=null,m=null,x=null;const S=new CA,g=n.getContextAttributes();let d=null,_=null;const y=[],E=[],R=new lt;let C=null;const b=new Ln;b.viewport=new At;const P=new Ln;P.viewport=new At;const T=[b,P],w=new YS;let N=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ae=y[$];return ae===void 0&&(ae=new ou,y[$]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function($){let ae=y[$];return ae===void 0&&(ae=new ou,y[$]=ae),ae.getGripSpace()},this.getHand=function($){let ae=y[$];return ae===void 0&&(ae=new ou,y[$]=ae),ae.getHandSpace()};function B($){const ae=E.indexOf($.inputSource);if(ae===-1)return;const _e=y[ae];_e!==void 0&&(_e.update($.inputSource,$.frame,u||a),_e.dispatchEvent({type:$.type,data:$.inputSource}))}function G(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",ee);for(let $=0;$<y.length;$++){const ae=E[$];ae!==null&&(E[$]=null,y[$].disconnect(ae))}N=null,k=null,S.reset(),e.setRenderTarget(d),m=null,h=null,p=null,r=null,_=null,qe.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||a},this.setReferenceSpace=function($){u=$},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return p},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",G),r.addEventListener("inputsourceschange",ee),g.xrCompatible!==!0&&await n.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0){const ae={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,ae),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),_=new zr(m.framebufferWidth,m.framebufferHeight,{format:$n,type:Ci,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ae=null,_e=null,ce=null;g.depth&&(ce=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ae=g.stencil?js:bs,_e=g.stencil?Bs:Or);const Ce={colorFormat:n.RGBA8,depthFormat:ce,scaleFactor:s};p=new XRWebGLBinding(r,n),h=p.createProjectionLayer(Ce),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new zr(h.textureWidth,h.textureHeight,{format:$n,type:Ci,depthTexture:new Wv(h.textureWidth,h.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),u=null,a=await r.requestReferenceSpace(o),qe.setContext(r),qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function ee($){for(let ae=0;ae<$.removed.length;ae++){const _e=$.removed[ae],ce=E.indexOf(_e);ce>=0&&(E[ce]=null,y[ce].disconnect(_e))}for(let ae=0;ae<$.added.length;ae++){const _e=$.added[ae];let ce=E.indexOf(_e);if(ce===-1){for(let Ie=0;Ie<y.length;Ie++)if(Ie>=E.length){E.push(_e),ce=Ie;break}else if(E[Ie]===null){E[Ie]=_e,ce=Ie;break}if(ce===-1)break}const Ce=y[ce];Ce&&Ce.connect(_e)}}const Y=new H,te=new H;function D($,ae,_e){Y.setFromMatrixPosition(ae.matrixWorld),te.setFromMatrixPosition(_e.matrixWorld);const ce=Y.distanceTo(te),Ce=ae.projectionMatrix.elements,Ie=_e.projectionMatrix.elements,Fe=Ce[14]/(Ce[10]-1),dt=Ce[14]/(Ce[10]+1),We=(Ce[9]+1)/Ce[5],Ze=(Ce[9]-1)/Ce[5],L=(Ce[8]-1)/Ce[0],kt=(Ie[8]+1)/Ie[0],Be=Fe*L,Ve=Fe*kt,be=ce/(-L+kt),rt=be*-L;if(ae.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(rt),$.translateZ(be),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ce[10]===-1)$.projectionMatrix.copy(ae.projectionMatrix),$.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const Te=Fe+be,M=dt+be,v=Be-rt,I=Ve+(ce-rt),z=We*dt/M*Te,q=Ze*dt/M*Te;$.projectionMatrix.makePerspective(v,I,z,q,Te,M),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Q($,ae){ae===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ae.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let ae=$.near,_e=$.far;S.texture!==null&&(S.depthNear>0&&(ae=S.depthNear),S.depthFar>0&&(_e=S.depthFar)),w.near=P.near=b.near=ae,w.far=P.far=b.far=_e,(N!==w.near||k!==w.far)&&(r.updateRenderState({depthNear:w.near,depthFar:w.far}),N=w.near,k=w.far),b.layers.mask=$.layers.mask|2,P.layers.mask=$.layers.mask|4,w.layers.mask=b.layers.mask|P.layers.mask;const ce=$.parent,Ce=w.cameras;Q(w,ce);for(let Ie=0;Ie<Ce.length;Ie++)Q(Ce[Ie],ce);Ce.length===2?D(w,b,P):w.projectionMatrix.copy(b.projectionMatrix),J($,w,ce)};function J($,ae,_e){_e===null?$.matrix.copy(ae.matrixWorld):($.matrix.copy(_e.matrixWorld),$.matrix.invert(),$.matrix.multiply(ae.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ae.projectionMatrix),$.projectionMatrixInverse.copy(ae.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Gd*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function($){l=$,h!==null&&(h.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(w)};let he=null;function we($,ae){if(f=ae.getViewerPose(u||a),x=ae,f!==null){const _e=f.views;m!==null&&(e.setRenderTargetFramebuffer(_,m.framebuffer),e.setRenderTarget(_));let ce=!1;_e.length!==w.cameras.length&&(w.cameras.length=0,ce=!0);for(let Ie=0;Ie<_e.length;Ie++){const Fe=_e[Ie];let dt=null;if(m!==null)dt=m.getViewport(Fe);else{const Ze=p.getViewSubImage(h,Fe);dt=Ze.viewport,Ie===0&&(e.setRenderTargetTextures(_,Ze.colorTexture,h.ignoreDepthValues?void 0:Ze.depthStencilTexture),e.setRenderTarget(_))}let We=T[Ie];We===void 0&&(We=new Ln,We.layers.enable(Ie),We.viewport=new At,T[Ie]=We),We.matrix.fromArray(Fe.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(Fe.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(dt.x,dt.y,dt.width,dt.height),Ie===0&&(w.matrix.copy(We.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),ce===!0&&w.cameras.push(We)}const Ce=r.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")){const Ie=p.getDepthInformation(_e[0]);Ie&&Ie.isValid&&Ie.texture&&S.init(e,Ie,r.renderState)}}for(let _e=0;_e<y.length;_e++){const ce=E[_e],Ce=y[_e];ce!==null&&Ce!==void 0&&Ce.update(ce,ae,u||a)}he&&he($,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),x=null}const qe=new Xv;qe.setAnimationLoop(we),this.setAnimationLoop=function($){he=$},this.dispose=function(){}}}const vr=new li,PA=new Pt;function NA(t,e){function n(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,jv(t)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,_,y,E){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(g,d):d.isMeshToonMaterial?(s(g,d),p(g,d)):d.isMeshPhongMaterial?(s(g,d),f(g,d)):d.isMeshStandardMaterial?(s(g,d),h(g,d),d.isMeshPhysicalMaterial&&m(g,d,E)):d.isMeshMatcapMaterial?(s(g,d),x(g,d)):d.isMeshDepthMaterial?s(g,d):d.isMeshDistanceMaterial?(s(g,d),S(g,d)):d.isMeshNormalMaterial?s(g,d):d.isLineBasicMaterial?(a(g,d),d.isLineDashedMaterial&&o(g,d)):d.isPointsMaterial?l(g,d,_,y):d.isSpriteMaterial?u(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,n(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===un&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,n(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===un&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,n(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,n(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const _=e.get(d),y=_.envMap,E=_.envMapRotation;y&&(g.envMap.value=y,vr.copy(E),vr.x*=-1,vr.y*=-1,vr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(vr.y*=-1,vr.z*=-1),g.envMapRotation.value.setFromMatrix4(PA.makeRotationFromEuler(vr)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,g.aoMapTransform))}function a(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform))}function o(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function l(g,d,_,y){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*_,g.scale.value=y*.5,d.map&&(g.map.value=d.map,n(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function f(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function p(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function h(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function m(g,d,_){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===un&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,d){d.matcap&&(g.matcap.value=d.matcap)}function S(g,d){const _=e.get(d).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function LA(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,y){const E=y.program;i.uniformBlockBinding(_,E)}function u(_,y){let E=r[_.id];E===void 0&&(x(_),E=f(_),r[_.id]=E,_.addEventListener("dispose",g));const R=y.program;i.updateUBOMapping(_,R);const C=e.render.frame;s[_.id]!==C&&(h(_),s[_.id]=C)}function f(_){const y=p();_.__bindingPointIndex=y;const E=t.createBuffer(),R=_.__size,C=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,R,C),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,y,E),E}function p(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const y=r[_.id],E=_.uniforms,R=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,y);for(let C=0,b=E.length;C<b;C++){const P=Array.isArray(E[C])?E[C]:[E[C]];for(let T=0,w=P.length;T<w;T++){const N=P[T];if(m(N,C,T,R)===!0){const k=N.__offset,B=Array.isArray(N.value)?N.value:[N.value];let G=0;for(let ee=0;ee<B.length;ee++){const Y=B[ee],te=S(Y);typeof Y=="number"||typeof Y=="boolean"?(N.__data[0]=Y,t.bufferSubData(t.UNIFORM_BUFFER,k+G,N.__data)):Y.isMatrix3?(N.__data[0]=Y.elements[0],N.__data[1]=Y.elements[1],N.__data[2]=Y.elements[2],N.__data[3]=0,N.__data[4]=Y.elements[3],N.__data[5]=Y.elements[4],N.__data[6]=Y.elements[5],N.__data[7]=0,N.__data[8]=Y.elements[6],N.__data[9]=Y.elements[7],N.__data[10]=Y.elements[8],N.__data[11]=0):(Y.toArray(N.__data,G),G+=te.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,k,N.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(_,y,E,R){const C=_.value,b=y+"_"+E;if(R[b]===void 0)return typeof C=="number"||typeof C=="boolean"?R[b]=C:R[b]=C.clone(),!0;{const P=R[b];if(typeof C=="number"||typeof C=="boolean"){if(P!==C)return R[b]=C,!0}else if(P.equals(C)===!1)return P.copy(C),!0}return!1}function x(_){const y=_.uniforms;let E=0;const R=16;for(let b=0,P=y.length;b<P;b++){const T=Array.isArray(y[b])?y[b]:[y[b]];for(let w=0,N=T.length;w<N;w++){const k=T[w],B=Array.isArray(k.value)?k.value:[k.value];for(let G=0,ee=B.length;G<ee;G++){const Y=B[G],te=S(Y),D=E%R,Q=D%te.boundary,J=D+Q;E+=Q,J!==0&&R-J<te.storage&&(E+=R-J),k.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=E,E+=te.storage}}}const C=E%R;return C>0&&(E+=R-C),_.__size=E,_.__cache={},this}function S(_){const y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),y}function g(_){const y=_.target;y.removeEventListener("dispose",g);const E=a.indexOf(y.__bindingPointIndex);a.splice(E,1),t.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function d(){for(const _ in r)t.deleteBuffer(r[_]);a=[],r={},s={}}return{bind:l,update:u,dispose:d}}class DA{constructor(e={}){const{canvas:n=mS(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const x=new Uint32Array(4),S=new Int32Array(4);let g=null,d=null;const _=[],y=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Rn,this.toneMapping=tr,this.toneMappingExposure=1;const E=this;let R=!1,C=0,b=0,P=null,T=-1,w=null;const N=new At,k=new At;let B=null;const G=new it(0);let ee=0,Y=n.width,te=n.height,D=1,Q=null,J=null;const he=new At(0,0,Y,te),we=new At(0,0,Y,te);let qe=!1;const $=new Gv;let ae=!1,_e=!1;const ce=new Pt,Ce=new Pt,Ie=new H,Fe=new At,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function Ze(){return P===null?D:1}let L=i;function kt(A,F){return n.getContext(A,F)}try{const A={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${jh}`),n.addEventListener("webglcontextlost",ne,!1),n.addEventListener("webglcontextrestored",ve,!1),n.addEventListener("webglcontextcreationerror",ue,!1),L===null){const F="webgl2";if(L=kt(F,A),L===null)throw kt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Be,Ve,be,rt,Te,M,v,I,z,q,X,W,ie,le,Oe,re,ye,xe,Pe,Me,$e,ze,ct,U;function me(){Be=new Hw(L),Be.init(),ze=new wA(L,Be),Ve=new kw(L,Be,e,ze),be=new MA(L,Be),Ve.reverseDepthBuffer&&h&&be.buffers.depth.setReversed(!0),rt=new Ww(L),Te=new cA,M=new EA(L,Be,be,Te,Ve,ze,rt),v=new Ow(E),I=new jw(E),z=new QS(L),ct=new Iw(L,z),q=new Vw(L,z,rt,ct),X=new Kw(L,q,z,rt),Pe=new Xw(L,Ve,M),re=new Fw(Te),W=new lA(E,v,I,Be,Ve,ct,re),ie=new NA(E,Te),le=new dA,Oe=new vA(Be),xe=new Dw(E,v,I,be,X,m,l),ye=new yA(E,X,Ve),U=new LA(L,rt,Ve,be),Me=new Uw(L,Be,rt),$e=new Gw(L,Be,rt),rt.programs=W.programs,E.capabilities=Ve,E.extensions=Be,E.properties=Te,E.renderLists=le,E.shadowMap=ye,E.state=be,E.info=rt}me();const K=new RA(E,L);this.xr=K,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const A=Be.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Be.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(A){A!==void 0&&(D=A,this.setSize(Y,te,!1))},this.getSize=function(A){return A.set(Y,te)},this.setSize=function(A,F,j=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=A,te=F,n.width=Math.floor(A*D),n.height=Math.floor(F*D),j===!0&&(n.style.width=A+"px",n.style.height=F+"px"),this.setViewport(0,0,A,F)},this.getDrawingBufferSize=function(A){return A.set(Y*D,te*D).floor()},this.setDrawingBufferSize=function(A,F,j){Y=A,te=F,D=j,n.width=Math.floor(A*j),n.height=Math.floor(F*j),this.setViewport(0,0,A,F)},this.getCurrentViewport=function(A){return A.copy(N)},this.getViewport=function(A){return A.copy(he)},this.setViewport=function(A,F,j,V){A.isVector4?he.set(A.x,A.y,A.z,A.w):he.set(A,F,j,V),be.viewport(N.copy(he).multiplyScalar(D).round())},this.getScissor=function(A){return A.copy(we)},this.setScissor=function(A,F,j,V){A.isVector4?we.set(A.x,A.y,A.z,A.w):we.set(A,F,j,V),be.scissor(k.copy(we).multiplyScalar(D).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(A){be.setScissorTest(qe=A)},this.setOpaqueSort=function(A){Q=A},this.setTransparentSort=function(A){J=A},this.getClearColor=function(A){return A.copy(xe.getClearColor())},this.setClearColor=function(){xe.setClearColor.apply(xe,arguments)},this.getClearAlpha=function(){return xe.getClearAlpha()},this.setClearAlpha=function(){xe.setClearAlpha.apply(xe,arguments)},this.clear=function(A=!0,F=!0,j=!0){let V=0;if(A){let O=!1;if(P!==null){const oe=P.texture.format;O=oe===Kh||oe===Xh||oe===Wh}if(O){const oe=P.texture.type,ge=oe===Ci||oe===Or||oe===Ha||oe===Bs||oe===Vh||oe===Gh,Ee=xe.getClearColor(),Ae=xe.getClearAlpha(),Ue=Ee.r,ke=Ee.g,Ne=Ee.b;ge?(x[0]=Ue,x[1]=ke,x[2]=Ne,x[3]=Ae,L.clearBufferuiv(L.COLOR,0,x)):(S[0]=Ue,S[1]=ke,S[2]=Ne,S[3]=Ae,L.clearBufferiv(L.COLOR,0,S))}else V|=L.COLOR_BUFFER_BIT}F&&(V|=L.DEPTH_BUFFER_BIT),j&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ne,!1),n.removeEventListener("webglcontextrestored",ve,!1),n.removeEventListener("webglcontextcreationerror",ue,!1),xe.dispose(),le.dispose(),Oe.dispose(),Te.dispose(),v.dispose(),I.dispose(),X.dispose(),ct.dispose(),U.dispose(),W.dispose(),K.dispose(),K.removeEventListener("sessionstart",ht),K.removeEventListener("sessionend",pt),mt.stop()};function ne(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ve(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const A=rt.autoReset,F=ye.enabled,j=ye.autoUpdate,V=ye.needsUpdate,O=ye.type;me(),rt.autoReset=A,ye.enabled=F,ye.autoUpdate=j,ye.needsUpdate=V,ye.type=O}function ue(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Z(A){const F=A.target;F.removeEventListener("dispose",Z),de(F)}function de(A){Le(A),Te.remove(A)}function Le(A){const F=Te.get(A).programs;F!==void 0&&(F.forEach(function(j){W.releaseProgram(j)}),A.isShaderMaterial&&W.releaseShaderCache(A))}this.renderBufferDirect=function(A,F,j,V,O,oe){F===null&&(F=dt);const ge=O.isMesh&&O.matrixWorld.determinant()<0,Ee=io(A,F,j,V,O);be.setMaterial(V,ge);let Ae=j.index,Ue=1;if(V.wireframe===!0){if(Ae=q.getWireframeAttribute(j),Ae===void 0)return;Ue=2}const ke=j.drawRange,Ne=j.attributes.position;let Qe=ke.start*Ue,st=(ke.start+ke.count)*Ue;oe!==null&&(Qe=Math.max(Qe,oe.start*Ue),st=Math.min(st,(oe.start+oe.count)*Ue)),Ae!==null?(Qe=Math.max(Qe,0),st=Math.min(st,Ae.count)):Ne!=null&&(Qe=Math.max(Qe,0),st=Math.min(st,Ne.count));const bt=st-Qe;if(bt<0||bt===1/0)return;ct.setup(O,V,Ee,j,Ae);let Et,et=Me;if(Ae!==null&&(Et=z.get(Ae),et=$e,et.setIndex(Et)),O.isMesh)V.wireframe===!0?(be.setLineWidth(V.wireframeLinewidth*Ze()),et.setMode(L.LINES)):et.setMode(L.TRIANGLES);else if(O.isLine){let De=V.linewidth;De===void 0&&(De=1),be.setLineWidth(De*Ze()),O.isLineSegments?et.setMode(L.LINES):O.isLineLoop?et.setMode(L.LINE_LOOP):et.setMode(L.LINE_STRIP)}else O.isPoints?et.setMode(L.POINTS):O.isSprite&&et.setMode(L.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)et.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))et.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const De=O._multiDrawStarts,Bt=O._multiDrawCounts,at=O._multiDrawCount,Bn=Ae?z.get(Ae).bytesPerElement:1,Hr=Te.get(V).currentProgram.getUniforms();for(let mn=0;mn<at;mn++)Hr.setValue(L,"_gl_DrawID",mn),et.render(De[mn]/Bn,Bt[mn])}else if(O.isInstancedMesh)et.renderInstances(Qe,bt,O.count);else if(j.isInstancedBufferGeometry){const De=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Bt=Math.min(j.instanceCount,De);et.renderInstances(Qe,bt,Bt)}else et.render(Qe,bt)};function Re(A,F,j){A.transparent===!0&&A.side===vi&&A.forceSinglePass===!1?(A.side=un,A.needsUpdate=!0,zn(A,F,j),A.side=rr,A.needsUpdate=!0,zn(A,F,j),A.side=vi):zn(A,F,j)}this.compile=function(A,F,j=null){j===null&&(j=A),d=Oe.get(j),d.init(F),y.push(d),j.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(d.pushLight(O),O.castShadow&&d.pushShadow(O))}),A!==j&&A.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(d.pushLight(O),O.castShadow&&d.pushShadow(O))}),d.setupLights();const V=new Set;return A.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const oe=O.material;if(oe)if(Array.isArray(oe))for(let ge=0;ge<oe.length;ge++){const Ee=oe[ge];Re(Ee,j,O),V.add(Ee)}else Re(oe,j,O),V.add(oe)}),y.pop(),d=null,V},this.compileAsync=function(A,F,j=null){const V=this.compile(A,F,j);return new Promise(O=>{function oe(){if(V.forEach(function(ge){Te.get(ge).currentProgram.isReady()&&V.delete(ge)}),V.size===0){O(A);return}setTimeout(oe,10)}Be.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let Xe=null;function Ge(A){Xe&&Xe(A)}function ht(){mt.stop()}function pt(){mt.start()}const mt=new Xv;mt.setAnimationLoop(Ge),typeof self<"u"&&mt.setContext(self),this.setAnimationLoop=function(A){Xe=A,K.setAnimationLoop(A),A===null?mt.stop():mt.start()},K.addEventListener("sessionstart",ht),K.addEventListener("sessionend",pt),this.render=function(A,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(F),F=K.getCamera()),A.isScene===!0&&A.onBeforeRender(E,A,F,P),d=Oe.get(A,y.length),d.init(F),y.push(d),Ce.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),$.setFromProjectionMatrix(Ce),_e=this.localClippingEnabled,ae=re.init(this.clippingPlanes,_e),g=le.get(A,_.length),g.init(),_.push(g),K.enabled===!0&&K.isPresenting===!0){const oe=E.xr.getDepthSensingMesh();oe!==null&&Fn(oe,F,-1/0,E.sortObjects)}Fn(A,F,0,E.sortObjects),g.finish(),E.sortObjects===!0&&g.sort(Q,J),We=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,We&&xe.addToRenderList(g,A),this.info.render.frame++,ae===!0&&re.beginShadows();const j=d.state.shadowsArray;ye.render(j,A,F),ae===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=g.opaque,O=g.transmissive;if(d.setupLights(),F.isArrayCamera){const oe=F.cameras;if(O.length>0)for(let ge=0,Ee=oe.length;ge<Ee;ge++){const Ae=oe[ge];cr(V,O,A,Ae)}We&&xe.render(A);for(let ge=0,Ee=oe.length;ge<Ee;ge++){const Ae=oe[ge];Ni(g,A,Ae,Ae.viewport)}}else O.length>0&&cr(V,O,A,F),We&&xe.render(A),Ni(g,A,F);P!==null&&(M.updateMultisampleRenderTarget(P),M.updateRenderTargetMipmap(P)),A.isScene===!0&&A.onAfterRender(E,A,F),ct.resetDefaultState(),T=-1,w=null,y.pop(),y.length>0?(d=y[y.length-1],ae===!0&&re.setGlobalState(E.clippingPlanes,d.state.camera)):d=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function Fn(A,F,j,V){if(A.visible===!1)return;if(A.layers.test(F.layers)){if(A.isGroup)j=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(F);else if(A.isLight)d.pushLight(A),A.castShadow&&d.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||$.intersectsSprite(A)){V&&Fe.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ce);const ge=X.update(A),Ee=A.material;Ee.visible&&g.push(A,ge,Ee,j,Fe.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||$.intersectsObject(A))){const ge=X.update(A),Ee=A.material;if(V&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Fe.copy(A.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Fe.copy(ge.boundingSphere.center)),Fe.applyMatrix4(A.matrixWorld).applyMatrix4(Ce)),Array.isArray(Ee)){const Ae=ge.groups;for(let Ue=0,ke=Ae.length;Ue<ke;Ue++){const Ne=Ae[Ue],Qe=Ee[Ne.materialIndex];Qe&&Qe.visible&&g.push(A,ge,Qe,j,Fe.z,Ne)}}else Ee.visible&&g.push(A,ge,Ee,j,Fe.z,null)}}const oe=A.children;for(let ge=0,Ee=oe.length;ge<Ee;ge++)Fn(oe[ge],F,j,V)}function Ni(A,F,j,V){const O=A.opaque,oe=A.transmissive,ge=A.transparent;d.setupLightsView(j),ae===!0&&re.setGlobalState(E.clippingPlanes,j),V&&be.viewport(N.copy(V)),O.length>0&&pn(O,F,j),oe.length>0&&pn(oe,F,j),ge.length>0&&pn(ge,F,j),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function cr(A,F,j,V){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[V.id]===void 0&&(d.state.transmissionRenderTarget[V.id]=new zr(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?qa:Ci,minFilter:Pr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const oe=d.state.transmissionRenderTarget[V.id],ge=V.viewport||N;oe.setSize(ge.z,ge.w);const Ee=E.getRenderTarget();E.setRenderTarget(oe),E.getClearColor(G),ee=E.getClearAlpha(),ee<1&&E.setClearColor(16777215,.5),E.clear(),We&&xe.render(j);const Ae=E.toneMapping;E.toneMapping=tr;const Ue=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),d.setupLightsView(V),ae===!0&&re.setGlobalState(E.clippingPlanes,V),pn(A,j,V),M.updateMultisampleRenderTarget(oe),M.updateRenderTargetMipmap(oe),Be.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let Ne=0,Qe=F.length;Ne<Qe;Ne++){const st=F[Ne],bt=st.object,Et=st.geometry,et=st.material,De=st.group;if(et.side===vi&&bt.layers.test(V.layers)){const Bt=et.side;et.side=un,et.needsUpdate=!0,On(bt,j,V,Et,et,De),et.side=Bt,et.needsUpdate=!0,ke=!0}}ke===!0&&(M.updateMultisampleRenderTarget(oe),M.updateRenderTargetMipmap(oe))}E.setRenderTarget(Ee),E.setClearColor(G,ee),Ue!==void 0&&(V.viewport=Ue),E.toneMapping=Ae}function pn(A,F,j){const V=F.isScene===!0?F.overrideMaterial:null;for(let O=0,oe=A.length;O<oe;O++){const ge=A[O],Ee=ge.object,Ae=ge.geometry,Ue=V===null?ge.material:V,ke=ge.group;Ee.layers.test(j.layers)&&On(Ee,F,j,Ae,Ue,ke)}}function On(A,F,j,V,O,oe){A.onBeforeRender(E,F,j,V,O,oe),A.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),O.onBeforeRender(E,F,j,V,A,oe),O.transparent===!0&&O.side===vi&&O.forceSinglePass===!1?(O.side=un,O.needsUpdate=!0,E.renderBufferDirect(j,F,V,O,A,oe),O.side=rr,O.needsUpdate=!0,E.renderBufferDirect(j,F,V,O,A,oe),O.side=vi):E.renderBufferDirect(j,F,V,O,A,oe),A.onAfterRender(E,F,j,V,O,oe)}function zn(A,F,j){F.isScene!==!0&&(F=dt);const V=Te.get(A),O=d.state.lights,oe=d.state.shadowsArray,ge=O.state.version,Ee=W.getParameters(A,O.state,oe,F,j),Ae=W.getProgramCacheKey(Ee);let Ue=V.programs;V.environment=A.isMeshStandardMaterial?F.environment:null,V.fog=F.fog,V.envMap=(A.isMeshStandardMaterial?I:v).get(A.envMap||V.environment),V.envMapRotation=V.environment!==null&&A.envMap===null?F.environmentRotation:A.envMapRotation,Ue===void 0&&(A.addEventListener("dispose",Z),Ue=new Map,V.programs=Ue);let ke=Ue.get(Ae);if(ke!==void 0){if(V.currentProgram===ke&&V.lightsStateVersion===ge)return no(A,Ee),ke}else Ee.uniforms=W.getUniforms(A),A.onBeforeCompile(Ee,E),ke=W.acquireProgram(Ee,Ae),Ue.set(Ae,ke),V.uniforms=Ee.uniforms;const Ne=V.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ne.clippingPlanes=re.uniform),no(A,Ee),V.needsLights=Qv(A),V.lightsStateVersion=ge,V.needsLights&&(Ne.ambientLightColor.value=O.state.ambient,Ne.lightProbe.value=O.state.probe,Ne.directionalLights.value=O.state.directional,Ne.directionalLightShadows.value=O.state.directionalShadow,Ne.spotLights.value=O.state.spot,Ne.spotLightShadows.value=O.state.spotShadow,Ne.rectAreaLights.value=O.state.rectArea,Ne.ltc_1.value=O.state.rectAreaLTC1,Ne.ltc_2.value=O.state.rectAreaLTC2,Ne.pointLights.value=O.state.point,Ne.pointLightShadows.value=O.state.pointShadow,Ne.hemisphereLights.value=O.state.hemi,Ne.directionalShadowMap.value=O.state.directionalShadowMap,Ne.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ne.spotShadowMap.value=O.state.spotShadowMap,Ne.spotLightMatrix.value=O.state.spotLightMatrix,Ne.spotLightMap.value=O.state.spotLightMap,Ne.pointShadowMap.value=O.state.pointShadowMap,Ne.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=ke,V.uniformsList=null,ke}function to(A){if(A.uniformsList===null){const F=A.currentProgram.getUniforms();A.uniformsList=cl.seqWithValue(F.seq,A.uniforms)}return A.uniformsList}function no(A,F){const j=Te.get(A);j.outputColorSpace=F.outputColorSpace,j.batching=F.batching,j.batchingColor=F.batchingColor,j.instancing=F.instancing,j.instancingColor=F.instancingColor,j.instancingMorph=F.instancingMorph,j.skinning=F.skinning,j.morphTargets=F.morphTargets,j.morphNormals=F.morphNormals,j.morphColors=F.morphColors,j.morphTargetsCount=F.morphTargetsCount,j.numClippingPlanes=F.numClippingPlanes,j.numIntersection=F.numClipIntersection,j.vertexAlphas=F.vertexAlphas,j.vertexTangents=F.vertexTangents,j.toneMapping=F.toneMapping}function io(A,F,j,V,O){F.isScene!==!0&&(F=dt),M.resetTextureUnits();const oe=F.fog,ge=V.isMeshStandardMaterial?F.environment:null,Ee=P===null?E.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Hs,Ae=(V.isMeshStandardMaterial?I:v).get(V.envMap||ge),Ue=V.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,ke=!!j.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ne=!!j.morphAttributes.position,Qe=!!j.morphAttributes.normal,st=!!j.morphAttributes.color;let bt=tr;V.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(bt=E.toneMapping);const Et=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,et=Et!==void 0?Et.length:0,De=Te.get(V),Bt=d.state.lights;if(ae===!0&&(_e===!0||A!==w)){const Yt=A===w&&V.id===T;re.setState(V,A,Yt)}let at=!1;V.version===De.__version?(De.needsLights&&De.lightsStateVersion!==Bt.state.version||De.outputColorSpace!==Ee||O.isBatchedMesh&&De.batching===!1||!O.isBatchedMesh&&De.batching===!0||O.isBatchedMesh&&De.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&De.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&De.instancing===!1||!O.isInstancedMesh&&De.instancing===!0||O.isSkinnedMesh&&De.skinning===!1||!O.isSkinnedMesh&&De.skinning===!0||O.isInstancedMesh&&De.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&De.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&De.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&De.instancingMorph===!1&&O.morphTexture!==null||De.envMap!==Ae||V.fog===!0&&De.fog!==oe||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==re.numPlanes||De.numIntersection!==re.numIntersection)||De.vertexAlphas!==Ue||De.vertexTangents!==ke||De.morphTargets!==Ne||De.morphNormals!==Qe||De.morphColors!==st||De.toneMapping!==bt||De.morphTargetsCount!==et)&&(at=!0):(at=!0,De.__version=V.version);let Bn=De.currentProgram;at===!0&&(Bn=zn(V,F,O));let Hr=!1,mn=!1,$s=!1;const _t=Bn.getUniforms(),An=De.uniforms;if(be.useProgram(Bn.program)&&(Hr=!0,mn=!0,$s=!0),V.id!==T&&(T=V.id,mn=!0),Hr||w!==A){be.buffers.depth.getReversed()?(ce.copy(A.projectionMatrix),vS(ce),_S(ce),_t.setValue(L,"projectionMatrix",ce)):_t.setValue(L,"projectionMatrix",A.projectionMatrix),_t.setValue(L,"viewMatrix",A.matrixWorldInverse);const nn=_t.map.cameraPosition;nn!==void 0&&nn.setValue(L,Ie.setFromMatrixPosition(A.matrixWorld)),Ve.logarithmicDepthBuffer&&_t.setValue(L,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&_t.setValue(L,"isOrthographic",A.isOrthographicCamera===!0),w!==A&&(w=A,mn=!0,$s=!0)}if(O.isSkinnedMesh){_t.setOptional(L,O,"bindMatrix"),_t.setOptional(L,O,"bindMatrixInverse");const Yt=O.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),_t.setValue(L,"boneTexture",Yt.boneTexture,M))}O.isBatchedMesh&&(_t.setOptional(L,O,"batchingTexture"),_t.setValue(L,"batchingTexture",O._matricesTexture,M),_t.setOptional(L,O,"batchingIdTexture"),_t.setValue(L,"batchingIdTexture",O._indirectTexture,M),_t.setOptional(L,O,"batchingColorTexture"),O._colorsTexture!==null&&_t.setValue(L,"batchingColorTexture",O._colorsTexture,M));const bn=j.morphAttributes;if((bn.position!==void 0||bn.normal!==void 0||bn.color!==void 0)&&Pe.update(O,j,Bn),(mn||De.receiveShadow!==O.receiveShadow)&&(De.receiveShadow=O.receiveShadow,_t.setValue(L,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(An.envMap.value=Ae,An.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&F.environment!==null&&(An.envMapIntensity.value=F.environmentIntensity),mn&&(_t.setValue(L,"toneMappingExposure",E.toneMappingExposure),De.needsLights&&Zv(An,$s),oe&&V.fog===!0&&ie.refreshFogUniforms(An,oe),ie.refreshMaterialUniforms(An,V,D,te,d.state.transmissionRenderTarget[A.id]),cl.upload(L,to(De),An,M)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(cl.upload(L,to(De),An,M),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&_t.setValue(L,"center",O.center),_t.setValue(L,"modelViewMatrix",O.modelViewMatrix),_t.setValue(L,"normalMatrix",O.normalMatrix),_t.setValue(L,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Yt=V.uniformsGroups;for(let nn=0,rc=Yt.length;nn<rc;nn++){const ur=Yt[nn];U.update(ur,Bn),U.bind(ur,Bn)}}return Bn}function Zv(A,F){A.ambientLightColor.needsUpdate=F,A.lightProbe.needsUpdate=F,A.directionalLights.needsUpdate=F,A.directionalLightShadows.needsUpdate=F,A.pointLights.needsUpdate=F,A.pointLightShadows.needsUpdate=F,A.spotLights.needsUpdate=F,A.spotLightShadows.needsUpdate=F,A.rectAreaLights.needsUpdate=F,A.hemisphereLights.needsUpdate=F}function Qv(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(A,F,j){Te.get(A.texture).__webglTexture=F,Te.get(A.depthTexture).__webglTexture=j;const V=Te.get(A);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=j===void 0,V.__autoAllocateDepthBuffer||Be.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,F){const j=Te.get(A);j.__webglFramebuffer=F,j.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(A,F=0,j=0){P=A,C=F,b=j;let V=!0,O=null,oe=!1,ge=!1;if(A){const Ae=Te.get(A);if(Ae.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(L.FRAMEBUFFER,null),V=!1;else if(Ae.__webglFramebuffer===void 0)M.setupRenderTarget(A);else if(Ae.__hasExternalTextures)M.rebindTextures(A,Te.get(A.texture).__webglTexture,Te.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ne=A.depthTexture;if(Ae.__boundDepthTexture!==Ne){if(Ne!==null&&Te.has(Ne)&&(A.width!==Ne.image.width||A.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(A)}}const Ue=A.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(ge=!0);const ke=Te.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(ke[F])?O=ke[F][j]:O=ke[F],oe=!0):A.samples>0&&M.useMultisampledRTT(A)===!1?O=Te.get(A).__webglMultisampledFramebuffer:Array.isArray(ke)?O=ke[j]:O=ke,N.copy(A.viewport),k.copy(A.scissor),B=A.scissorTest}else N.copy(he).multiplyScalar(D).floor(),k.copy(we).multiplyScalar(D).floor(),B=qe;if(be.bindFramebuffer(L.FRAMEBUFFER,O)&&V&&be.drawBuffers(A,O),be.viewport(N),be.scissor(k),be.setScissorTest(B),oe){const Ae=Te.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ae.__webglTexture,j)}else if(ge){const Ae=Te.get(A.texture),Ue=F||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ae.__webglTexture,j||0,Ue)}T=-1},this.readRenderTargetPixels=function(A,F,j,V,O,oe,ge){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=Te.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ge!==void 0&&(Ee=Ee[ge]),Ee){be.bindFramebuffer(L.FRAMEBUFFER,Ee);try{const Ae=A.texture,Ue=Ae.format,ke=Ae.type;if(!Ve.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ve.textureTypeReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=A.width-V&&j>=0&&j<=A.height-O&&L.readPixels(F,j,V,O,ze.convert(Ue),ze.convert(ke),oe)}finally{const Ae=P!==null?Te.get(P).__webglFramebuffer:null;be.bindFramebuffer(L.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(A,F,j,V,O,oe,ge){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=Te.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ge!==void 0&&(Ee=Ee[ge]),Ee){const Ae=A.texture,Ue=Ae.format,ke=Ae.type;if(!Ve.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ve.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=A.width-V&&j>=0&&j<=A.height-O){be.bindFramebuffer(L.FRAMEBUFFER,Ee);const Ne=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ne),L.bufferData(L.PIXEL_PACK_BUFFER,oe.byteLength,L.STREAM_READ),L.readPixels(F,j,V,O,ze.convert(Ue),ze.convert(ke),0);const Qe=P!==null?Te.get(P).__webglFramebuffer:null;be.bindFramebuffer(L.FRAMEBUFFER,Qe);const st=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await gS(L,st,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ne),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,oe),L.deleteBuffer(Ne),L.deleteSync(st),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,F=null,j=0){A.isTexture!==!0&&(rs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,A=arguments[1]);const V=Math.pow(2,-j),O=Math.floor(A.image.width*V),oe=Math.floor(A.image.height*V),ge=F!==null?F.x:0,Ee=F!==null?F.y:0;M.setTexture2D(A,0),L.copyTexSubImage2D(L.TEXTURE_2D,j,0,0,ge,Ee,O,oe),be.unbindTexture()};const Jv=L.createFramebuffer(),e_=L.createFramebuffer();this.copyTextureToTexture=function(A,F,j=null,V=null,O=0,oe=null){A.isTexture!==!0&&(rs("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,A=arguments[1],F=arguments[2],oe=arguments[3]||0,j=null),oe===null&&(O!==0?(rs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),oe=O,O=0):oe=0);let ge,Ee,Ae,Ue,ke,Ne,Qe,st,bt;const Et=A.isCompressedTexture?A.mipmaps[oe]:A.image;if(j!==null)ge=j.max.x-j.min.x,Ee=j.max.y-j.min.y,Ae=j.isBox3?j.max.z-j.min.z:1,Ue=j.min.x,ke=j.min.y,Ne=j.isBox3?j.min.z:0;else{const bn=Math.pow(2,-O);ge=Math.floor(Et.width*bn),Ee=Math.floor(Et.height*bn),A.isDataArrayTexture?Ae=Et.depth:A.isData3DTexture?Ae=Math.floor(Et.depth*bn):Ae=1,Ue=0,ke=0,Ne=0}V!==null?(Qe=V.x,st=V.y,bt=V.z):(Qe=0,st=0,bt=0);const et=ze.convert(F.format),De=ze.convert(F.type);let Bt;F.isData3DTexture?(M.setTexture3D(F,0),Bt=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(M.setTexture2DArray(F,0),Bt=L.TEXTURE_2D_ARRAY):(M.setTexture2D(F,0),Bt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const at=L.getParameter(L.UNPACK_ROW_LENGTH),Bn=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Hr=L.getParameter(L.UNPACK_SKIP_PIXELS),mn=L.getParameter(L.UNPACK_SKIP_ROWS),$s=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Et.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Et.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ue),L.pixelStorei(L.UNPACK_SKIP_ROWS,ke),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ne);const _t=A.isDataArrayTexture||A.isData3DTexture,An=F.isDataArrayTexture||F.isData3DTexture;if(A.isDepthTexture){const bn=Te.get(A),Yt=Te.get(F),nn=Te.get(bn.__renderTarget),rc=Te.get(Yt.__renderTarget);be.bindFramebuffer(L.READ_FRAMEBUFFER,nn.__webglFramebuffer),be.bindFramebuffer(L.DRAW_FRAMEBUFFER,rc.__webglFramebuffer);for(let ur=0;ur<Ae;ur++)_t&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Te.get(A).__webglTexture,O,Ne+ur),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Te.get(F).__webglTexture,oe,bt+ur)),L.blitFramebuffer(Ue,ke,ge,Ee,Qe,st,ge,Ee,L.DEPTH_BUFFER_BIT,L.NEAREST);be.bindFramebuffer(L.READ_FRAMEBUFFER,null),be.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(O!==0||A.isRenderTargetTexture||Te.has(A)){const bn=Te.get(A),Yt=Te.get(F);be.bindFramebuffer(L.READ_FRAMEBUFFER,Jv),be.bindFramebuffer(L.DRAW_FRAMEBUFFER,e_);for(let nn=0;nn<Ae;nn++)_t?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,bn.__webglTexture,O,Ne+nn):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,bn.__webglTexture,O),An?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Yt.__webglTexture,oe,bt+nn):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Yt.__webglTexture,oe),O!==0?L.blitFramebuffer(Ue,ke,ge,Ee,Qe,st,ge,Ee,L.COLOR_BUFFER_BIT,L.NEAREST):An?L.copyTexSubImage3D(Bt,oe,Qe,st,bt+nn,Ue,ke,ge,Ee):L.copyTexSubImage2D(Bt,oe,Qe,st,Ue,ke,ge,Ee);be.bindFramebuffer(L.READ_FRAMEBUFFER,null),be.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else An?A.isDataTexture||A.isData3DTexture?L.texSubImage3D(Bt,oe,Qe,st,bt,ge,Ee,Ae,et,De,Et.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(Bt,oe,Qe,st,bt,ge,Ee,Ae,et,Et.data):L.texSubImage3D(Bt,oe,Qe,st,bt,ge,Ee,Ae,et,De,Et):A.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,oe,Qe,st,ge,Ee,et,De,Et.data):A.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,oe,Qe,st,Et.width,Et.height,et,Et.data):L.texSubImage2D(L.TEXTURE_2D,oe,Qe,st,ge,Ee,et,De,Et);L.pixelStorei(L.UNPACK_ROW_LENGTH,at),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Bn),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Hr),L.pixelStorei(L.UNPACK_SKIP_ROWS,mn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,$s),oe===0&&F.generateMipmaps&&L.generateMipmap(Bt),be.unbindTexture()},this.copyTextureToTexture3D=function(A,F,j=null,V=null,O=0){return A.isTexture!==!0&&(rs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,V=arguments[1]||null,A=arguments[2],F=arguments[3],O=arguments[4]||0),rs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,F,j,V,O)},this.initRenderTarget=function(A){Te.get(A).__webglFramebuffer===void 0&&M.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?M.setTextureCube(A,0):A.isData3DTexture?M.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?M.setTexture2DArray(A,0):M.setTexture2D(A,0),be.unbindTexture()},this.resetState=function(){C=0,b=0,P=null,be.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=tt._getDrawingBufferColorSpace(e),n.unpackColorSpace=tt._getUnpackColorSpace()}}const Xd=[{id:"introduction",title:"Introduction",page:"8",pairs:[{english:"Beyond a shadow of doubt, the biography of Prophet Muhammad ﷺ represents a complete embodiment of the sublime Divine Message that he communicated to deliver humanity from darkness and polytheism to light and monotheism. Therefore, understanding this message requires careful study of the historical background and circumstances surrounding his mission.",kashmiri:"بلا شبہ چھہ رسول اللہ صلی اللہ علیہ وآلہ وسلم سنز زندگی ہنز داستان پزۍ پاٹھۍ تمہ حیرت انگیز خدایہ پیغامچ مکمل جوہر ہاوان یُس تِمو لوٗکَن تاریکی تہٕ شِرک مَنٛزٕ گاشَس مَنٛز تہٕ اَکھ خُدایَس پؠٹھ یَقیٖن تھاونہٕ خٲطرٕ پَیش کوٚر۔ لہذا، یہ پیغام پٔزۍ پٲٹھۍ حٲصل کرنہٕ خٲطرٕ، چُھ تۄہہ تٲریخی سیاق و سباق تہٕ تٔمۍ سٕنٛدِس مشنَس أندۍ پٔکۍ حالاتن پیٹھ اصل نظر تراونٕچ ضرورت۔"},{english:"For this reason, this chapter presents the nature and development of the Arab tribes before Islam, together with the circumstances that surrounded the mission of the Prophet ﷺ.",kashmiri:"چنانچہ اتھ بابس منز چھہ اتھ متعلق کتھ کرنہ آمژ زِ عرب قبیلہ کِتھہ پاٹھۍ ٲسۍ اسلام برونہہ ترقی کٔرمٕژ، تہ تمن صورتحالن منز ییلہ رسول صلى الله عليه وسلم پنن مشن شروع کوٚر۔"}]},{id:"location",title:"Location of the Arabs",page:"8",pairs:[{english:"Linguistically, the word “Arab” means deserts and barren land, nearly without water or trees. Since the beginning of history, the Arabian Peninsula and its people have been called by this name.",kashmiri:"لسانی لحاظہٕ چُھ لفظ 'عرب' ہُک مطلب صحرا تہٕ بنجر زمین، تقریباً کُنہِ آب یا کُلۍ ورٲے ۔ تٲریخ کہ آغاز پیٹھے چھ جزیرٕ نما عرب تہٕ امکۍ لوٗکن یہ ناوو ستی وننہٕ یوان۔"},{english:"The Arabian Peninsula is bordered in the west by the Red Sea and Sinai, in the east by the Arabian Gulf, in the south by the Arabian Sea—an extension of the Indian Ocean—and in the north by ancient Syria and part of Iraq.",kashmiri:"جزیرٕ نما عربچ سرحد چِھ مغرب منٛز بحر احمر تہٕ سینا سٔتۍ، مشرقس منٛز خلیج عرب، جنوبس منٛز بحیرہ عرب سٔتۍ- یُس بحر ہندُک حصہٕ چُھ- تہٕ شمالس منٛز قدیم شام تہٕ عراقک حصہٕ سٔتۍ۔"},{english:"Its area is estimated at between one million and one million two hundred and fifty thousand square miles.",kashmiri:"امیُک رقبہٕ چُھ اکھ ملین پیٹھہٕ اکھ ملین زٕ پنژاہ ساس مربع میلس درمیان۔"},{english:"Most of the peninsula consists of deserts and sandy regions, making it difficult for foreigners and invaders to enter.",kashmiri:"جزیرٕ نما ہُک زیادٕ تر حصہٕ چھُ ریگستانن تہٕ سیٚکہِ علاقَن ہُنٛد بنیومُت، ییٚمہِ کِنۍ نیبرِمین تہٕ حملہ آورَن خٲطرٕ اژُن مُشکِل چھُ گژھان۔"},{english:"This allowed its people to preserve freedom and independence throughout the ages, despite the presence of two powerful neighbouring empires.",kashmiri:"امہ سۭتۍ دِژ امکۍ لوٗکن پنٕنۍ آزٲدی تہٕ آزٲدی ؤری وادن تام برقرار تھاون، یوٚتام زٕ طاقتور ہمسایہ سلطنتہٕ آسنہٕ باوجود تہِ۔"},{english:"Its external position, on the other hand, made it the centre of the ancient world and gave it sea and land connections with most nations of that time.",kashmiri:"نیبریم طرفہٕ، امک محل وقوع بنوو یہٕ قدیم دنیاہک مرکز تہٕ اتھ اوس تمہٕ وقتہٕ زیادٕ تر قومن سۭتۍ سمندرٕ تہٕ زمینہٕ کہ ذریعہٕ جوڑان۔"},{english:"Because of this strategic position, the Arabian Peninsula became a centre of trade, culture, religion and art.",kashmiri:"امہٕ اسٹریٹجک محل وقوع کہ وجہ سۭتۍ، جزیرٕ نما عرب تجارت، ثقافت، مذہب تہٕ فنک مرکز بنیوو۔"}]},{id:"tribes",title:"The Arab tribes",page:"8",pairs:[{english:"According to their lineage, the Arab tribes were divided into three groups.",kashmiri:"تہندٕ خاندٲنی نسبن ہنٛدس بنیادس پیٹھ، عرب قبائل ٲس ترین گروپن منٛز تقسیم کرنہٕ آمت۔"},{english:"The first group was the Perishing Arabs, the ancient Arabs about whom little is known.",kashmiri:"گوڈنیک گروپ اوس فنا گمتی عرب، قدیم عرب یمن متعلق اسہِ واریاہ کینہہ پتاہ چھہِ۔"},{english:"The second group was the Pure Arabs, who descended from Ya‘rub bin Yashjub bin Qahtan. They were also called Qahtanian Arabs.",kashmiri:"دۄیم قِسم ٲسۍ خالِص عَرَب، یِم یَعرُب بِن یَشجُب بِن قَحطانَس نَسِل نِش آمٕتۍ ٲسۍ۔ تِمَن اسی وٲنَان قَحطٲنی عَرَب۔"},{english:"The third group was the Arabized Arabs, who descended from Ishmael. They were also called Adnanian Arabs.",kashmiri:"تریم گروپ اوس عربی عرب، یم اسماعیل پیٹھہ آمت ٲسۍ۔ تمن اوس عدنانی عرب تہٕ وننہٕ یوان۔"},{english:"The Pure Arabs, the people of Qahtan, originally lived in Yemen and consisted of many tribes.",kashmiri:"خالص عرب، قحطانٕکۍ لوک ٲسۍ اصلی یمن منٛز روزان تہٕ تم ٲسۍ واریاہن قبیلن پیٹھ مشتمل۔"},{english:"Two of their tribes were especially famous: Himyar and Kahlan.",kashmiri:"یِہنٛدۍ زٕ قٔبیٖلہٕ ٲسۍ خاص پٲٹھۍ مشہوٗر: حِمیار تہٕ کہلان۔"},{english:"The most famous branches of Himyar were Zaid Al-Jamhur, Quda‘a and Sakasic.",kashmiri:"حمیرچ ساروی کھوتہٕ مشہور شاخہٕ ٲس زید الجمہور، قدعا تہٕ سکاسیک۔"},{english:"The most famous branches of Kahlan were Hamdan, Anmar, Tai’, Mudhhij, Kinda, Lakhm, Judham, Azd, Aws, Khazraj and the descendants of Jafna, the kings of ancient Syria.",kashmiri:"کہلانٕچ ساروی کھوتہٕ مشہور شاخہٕ ٲس ہمدان، انمار، تائی، مدھیج، کندہ، لکھم، یہدم، ازد، اوس، خزرج تہٕ جافناہک اولاد، یم قدیم شامک بادشاہ ٲسۍ۔"}]},{id:"migration",title:"Migration from Yemen",page:"9",pairs:[{english:"Before the great flood of the Ma’rib Dam, the Kahlan branches migrated from Yemen to different parts of the Arabian Peninsula.",kashmiri:"بٔڑۍ مارب ڈیم سٔہلاب برونٛہہ گٔیہٕ کہلان شاخہٕ یمن پیٹھٕ جزیرٕ نما عرب کین مختلف حصن منٛز منتقل۔"},{english:"This migration occurred because trade declined under Roman control of the sea and land routes after the Roman occupation of Egypt and Syria.",kashmiri:"یہٕ تحریک گیہٕ امہٕ وجہ سۭتۍ زِ تجارت گو تمہٕ وقتہٕ کم ییلہٕ رومیو مصر تہٕ شامس پیٹھ قبضہٕ کرنہٕ پتہٕ سمندرٕ تہٕ زمینی وتن پیٹھ کنٹرول کوٚر۔"},{english:"Competition between Kahlan and Himyar naturally led to the migration of the former and the settlement of the latter in Yemen.",kashmiri:"کہلان تہٕ ہِمیارَس درمیان دُشمنِی کِنۍ بنیوو قۄدرتی طور کہلان منتقل تہٕ ہِیار گوٚو یمنَس منٛز بسن۔"},{english:"The migrating branches of Kahlan can be divided into four groups.",kashmiri:"کہلانٕچ حرکت پذیر شاخہٕ ہیکون ژۄن گروپن منٛز تقسیم کٔرتھ۔"},{english:"The first group was Azd, led by ‘Imran bin ‘Amr Muzaiqiya, who travelled through Yemen and eventually headed north.",kashmiri:"گوڈنیک گروپ اوس ازد، یمچ قیادت عمران بن عمرو مزیقیہ کران ٲس۔ تِمو کوٚر یمن کِنۍ سفر تہٕ ٲخر کار گٔیہِ شمالس کُن۔"},{english:"Tha‘labah bin ‘Amr left his tribe, Al-Azd, for the Hijaz and settled between Tha‘labiyah and Dhi Qar.",kashmiri:"ثعلبہ بن عمرو ترٲو پنُن قبیلہٕ الازد تہٕ گو حجاز کُن تہٕ ثلبیہ تہٕ ذی قارس درمیان کُنہِ جایہ آباد گومُت۔"},{english:"Haritha bin ‘Amr, known as Khuza‘a, travelled with his people through the Hijaz until they reached Mar Az-Zahran.",kashmiri:"حارثہ بن عمرو یس خزعہ ونان چھہ، رود پننین لوکن سیتۍ حجاز کہ ذریعہ سفر یوٚت تام تم مار الزہران وٲتۍ۔"},{english:"Later, they conquered the Sacred Territory, drove out the tribe of Jurhum, and settled in Makkah.",kashmiri:"پتہٕ کوٚر تِمو مُقدس علاقس پٮ۪ٹھ قبضہٕ، جُرہم قبیلہٕ کٔرِکھ لَتھ تہٕ بنووُکھ مکہ پنُن گرٕ۔"},{english:"‘Imran bin ‘Amr and his people went to Oman, where they established the tribe of Azd.",kashmiri:"عمران بن عمرو تہٕ تہند لوک گیہ عمان، ییتہ تمو ازد قبیلچ بنیاد ترٲو۔"},{english:"Jafna bin ‘Amr and his family headed towards Syria, where he established the kingdom of Ghassan.",kashmiri:"جعفنہ بن عمر تہٕ تٔمۍ سُنٛد عیال گوٚو شام، ییتہ تٔمۍ غسان سلطنت قٲیم کٔر۔"},{english:"It was named Ghassan after a spring of water in the Hijaz, where they stopped on their way to Syria.",kashmiri:"اَتھ اوس حجازَس منٛز آبہٕ کِس چشمہٕ کِس ناوس پیٹھ غسان ناو تھونہٕ آمُت، ییٚتہِ تِم شام گژھَن وِزِ رُکۍ۔"},{english:"Lakhm and Judham included Nasr bin Rabi‘a, the father of Manadhira, the kings of Heerah.",kashmiri:"لکھم تہٕ یہدمس منٛز اوس نصر بن ربیعہ شٲمل، یُس ہیرہ کین بادشاہن منادھیرا سُنٛد مول اوس۔"},{english:"Banu Tai’ migrated north and settled near the mountains known as Aja and Salma, which were later called the Tai’ Mountains.",kashmiri:"بنو تائی گو شمالس کُن تہٕ بسیو اجا تہٕ سلمیٰ نٲمی پہاڑن نزدیک، یم پتہٕ تائی پہاڑ ناوٕ سٔتۍ مشہور۔"},{english:"Kinda lived in Bahrain, but they were expelled to Hadramout and Najd, where they established a powerful government.",kashmiri:"تِم ٲسۍ بحرینَس منٛز روزان، مگر پتہٕ آیہِ تِم حضرموت تہٕ نجد کٔڑِتھ کڑنہٕ، ییٚتہِ تِمو اکھ مضبوٗط حکومت قٲیِم کٔر۔"},{english:"This government did not last long, because the whole tribe soon disappeared.",kashmiri:"یہٕ حکومت رود نہٕ زیادٕ کالس چلتھ تکیازِ سورے قبیلہٕ گوو جلدی غٲب۔"},{english:"Another Himyarite tribe, known as Quda‘a, also left Yemen and settled in the Samawa desert on the borders of Iraq.",kashmiri:"بیاکھ اکھ ہمیری قبیلہٕ، یتھ قدعہ ونان چھِ، تہِ تروو یمن تہٕ عراق کِس سرحدس نزدیٖک سماوا ریگستانس منٛز آباد گومُت۔"}]},{id:"abraham",title:"The ancestry of the Arabized Arabs",page:"9–10",pairs:[{english:"The Arabized Arabs traced their ancestry to their great forefather Abraham, who came from a town called Ur near Kufa on the western bank of the Euphrates in Iraq.",kashmiri:"عرب عربو کٔر پنٕنۍ موٗل پننِس آباؤ اجداد ابراہیم سٕتۍ وابستہٕ، یُس عراقس منٛز فرات کِس مغربی کنارس پیٹھ یور نکھٕ کوفہ ناوٕ کہِ قصبہٕ پٮ۪ٹھٕ اوس آمُت۔"},{english:"Archaeological excavations revealed important details about that town, Abraham’s family, and the religions and social conditions that existed there.",kashmiri:"کھدائی کٔر امہٕ قصبہٕ، ابراہم سنٛد خاندان، تہٕ تمہٕ وقتہٕ آس پاس موجود مذہبن تہٕ سمٲجی زندگی کس بارس منٛز کنہہ اہم معلومات۔"},{english:"It is known that Abraham left Ur for Harran and then went to Palestine, which he made the centre of his mission.",kashmiri:"یہ کتھ چھیہ معلوم زِ ابراہیم دراو یور ہاران کُن تہٕ پتہٕ گو فلسطین، یُس تٔمۍ پننہ مشنُک مرکز بنیوو۔"},{english:"He travelled throughout the region. When he went to Egypt, Pharaoh tried to harm his wife Sarah, but Allah saved her and turned the Pharaoh’s evil plan back upon him.",kashmiri:"تٔمۍ کوٚر سٲرۍسٕے علاقس أنٛدۍ پٔکۍ سفر۔ ییلہ سُہ مصر گوٚو، فرعونن کٔر پننہ زنانہِ سارہ تکلیف دنچ کوشش، مگر اللہ تعالیٰ کٔر تٔمِس رٲچھ تہٕ فرعون سُند بدکار منصوبہٕ کوٚرن ناکام۔"}]}],IA=Xd.reduce((t,e)=>t+e.pairs.length,0);function UA(){const t=fe.useRef(null);return fe.useEffect(()=>{const e=t.current;if(!e)return;let n;try{n=new DA({antialias:!0,alpha:!0})}catch{return}const i=new HS,r=new Ln(45,1,.1,100);r.position.set(0,1.3,5),n.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.appendChild(n.domElement);const s=new yn(new zl(.28,32,32),new Ol({color:16767370}));s.position.set(1.8,1.8,-1),i.add(s);const a=new yn(new eo(12,8),new Ol({color:14132589}));a.rotation.x=-Math.PI/2,a.position.y=-.35,i.add(a);const o=new pa,l=new yn(new $h(.08,.14,1.4,10),new Ip({color:7028261}));l.position.y=.35,o.add(l);for(let m=0;m<7;m++){const x=new yn(new zl(.28,12,12),new Ip({color:4157510}));x.position.set((m%3-.9)*.35,.95+Math.floor(m/3)*.18,(m%2-.5)*.15),o.add(x)}o.position.set(-1.2,0,0),i.add(o),i.add(new $S(16777215,1.5));const u=()=>{r.aspect=e.clientWidth/e.clientHeight,r.updateProjectionMatrix(),n.setSize(e.clientWidth,e.clientHeight)},f=new ResizeObserver(u);f.observe(e),u();let p=0;const h=()=>{p=requestAnimationFrame(h),window.matchMedia("(prefers-reduced-motion: reduce)").matches||(o.rotation.y=Math.sin(Date.now()/2400)*.04),n.render(i,r)};return h(),()=>{cancelAnimationFrame(p),f.disconnect(),n.dispose(),e.removeChild(n.domElement)}},[]),c.jsx("div",{className:"seerah-scene",ref:t,"aria-hidden":"true"})}const kA=()=>{const[t,e]=fe.useState(null),n=async(i,r)=>{try{await navigator.clipboard.writeText(i),e(r),window.setTimeout(()=>e(null),2e3)}catch{e(null)}};return c.jsxs("section",{className:"seerah-page",children:[c.jsxs("div",{className:"seerah-hero",children:[c.jsxs("div",{children:[c.jsx("span",{className:"seerah-eyebrow",children:"کٲشُر سیرتھ"}),c.jsxs("h1",{children:["The Sealed",c.jsx("br",{}),c.jsx("em",{children:"Nectar."})]}),c.jsx("p",{children:"Read the Seerah in English and Kashmiri, passage by passage. Your reviewed Chapter 1 translations are gathered here."}),c.jsxs("div",{className:"seerah-actions",children:[c.jsx("button",{className:"primary-action",type:"button",onClick:()=>{var i;return(i=document.getElementById("seerah-chapter-one"))==null?void 0:i.scrollIntoView({behavior:"smooth"})},children:"Read Chapter 1 ↓"}),c.jsxs("span",{children:[IA," reviewed passages · Audio narration coming later"]})]})]}),c.jsx(UA,{})]}),c.jsxs("div",{className:"chapter-grid",id:"seerah-chapter-one",children:[c.jsxs("aside",{className:"seerah-contents",children:[c.jsx("div",{className:"chapter-label",children:"Chapter 01 · The Arabian Peninsula"}),c.jsx("h2",{children:"Location and nature of the Arab tribes"}),c.jsx("p",{children:"Choose a section to jump to its paired English and Kashmiri passages."}),Xd.map((i,r)=>c.jsxs("button",{className:"chapter-pill",type:"button",onClick:()=>{var s;return(s=document.getElementById(`seerah-${i.id}`))==null?void 0:s.scrollIntoView({behavior:"smooth"})},children:[c.jsxs("span",{children:[c.jsx("small",{children:String(r+1).padStart(2,"0")})," ",i.title]}),c.jsxs("span",{children:[i.pairs.length," ↗"]})]},i.id))]}),c.jsxs("div",{className:"seerah-reading-list",children:[Xd.map((i,r)=>c.jsxs("section",{className:"seerah-reading-section",id:`seerah-${i.id}`,children:[c.jsxs("div",{className:"reading-section-heading",children:[c.jsxs("span",{className:"chapter-label",children:[String(r+1).padStart(2,"0")," / Chapter 1"]}),c.jsx("h2",{children:i.title}),c.jsxs("span",{children:["Original book · page ",i.page]})]}),i.pairs.map((s,a)=>{const o=`${i.id}-${a}`;return c.jsxs("article",{className:"reading-card",children:[c.jsxs("div",{className:"reading-meta",children:[c.jsxs("span",{children:["Passage ",String(a+1).padStart(2,"0")]}),c.jsx("span",{children:"Owner reviewed"})]}),c.jsx("p",{className:"english-text",lang:"en",children:s.english}),c.jsx("p",{className:"kashmiri-text",lang:"ks-Arab",dir:"rtl",children:s.kashmiri}),c.jsx("div",{className:"reading-footer",children:c.jsx("button",{className:"small-button",type:"button",onClick:()=>n(s.kashmiri,o),children:t===o?"✓ Copied Kashmiri":"Copy Kashmiri"})})]},o)})]},i.id)),c.jsx("div",{className:"seerah-next-batch",children:"The next passage, beginning with Abraham’s return to Palestine, is awaiting your review."})]})]})]})},FA=()=>{const[t,e]=fe.useState(()=>{const p=window.location.hash.replace("#","").toLowerCase();return p==="translator"?"translator":p==="about"?"about":p==="guide"||p==="language-guide"?"guide":p==="orthography"?"orthography":p==="seerah"?"seerah":"dictionary"}),[n,i]=fe.useState([]),[r,s]=fe.useState(new Set),[a,o]=fe.useState(0),[l,u]=fe.useState(!0);fe.useEffect(()=>{const p=()=>{const h=window.location.hash.replace("#","").toLowerCase();e(h==="translator"?"translator":h==="about"?"about":h==="guide"||h==="language-guide"?"guide":h==="orthography"?"orthography":h==="seerah"?"seerah":"dictionary")};return window.addEventListener("hashchange",p),()=>window.removeEventListener("hashchange",p)},[]);const f=p=>{e(p),window.location.hash=`#${p}`,window.scrollTo({top:0,behavior:"smooth"})};return fe.useEffect(()=>{const p=["/assets/dictionary.json",...Array.from({length:8},(h,m)=>`/assets/dictionary-kashir-${m+1}.json`),"/assets/dictionary-corpus.json"];Promise.allSettled(p.map(h=>fetch(h).then(m=>{if(!m.ok)throw new Error(`Status ${m.status}`);return m.json()}))).then(h=>{const m=[];h.forEach(g=>{g.status==="fulfilled"&&Array.isArray(g.value)&&m.push(...g.value)});const x=_v(m),S=new Set(m.flatMap(g=>[g.e,g.x,...(g.examples||[]).flatMap(d=>[d.e])]).flatMap(g=>String(g||"").toLowerCase().match(/[a-z][a-z'-]*/g)||[]));i(x),s(S),o(m.length),u(!1)}).catch(h=>{console.error("Failed to load dictionary records:",h),u(!1)})},[]),c.jsxs("div",{className:"app-shell",children:[c.jsx(L0,{currentView:t,onSelectView:f}),c.jsxs("main",{children:[t==="dictionary"&&c.jsx(O0,{words:n,loadingDictionary:l,totalRecords:a}),t==="translator"&&c.jsx(Ey,{words:n,englishTokens:r}),t==="about"&&c.jsx(wy,{}),t==="guide"&&c.jsx(Ty,{onBackToDictionary:()=>f("dictionary"),onGoToOrthography:()=>f("orthography")}),t==="orthography"&&c.jsx(Ay,{onBackToDictionary:()=>f("dictionary"),onGoToLanguageGuide:()=>f("guide")}),t==="seerah"&&c.jsx(kA,{})]}),c.jsx(D0,{totalRecords:a})]})};lu.createRoot(document.getElementById("root")).render(c.jsx(x_.StrictMode,{children:c.jsx(FA,{})}));
