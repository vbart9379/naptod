/* Copyright (C) 1998-2017 DYNAMIC+. All rights reserved. */
(function(){if(window.dl&&dl.bLoaded)return;var fDl=function(){fDl.aQueue.push(arguments);if(fDl.bRunning)return;fDl.bRunning=true;var fQueue=function(mLibrary,fCallBack,iTimeOut){var aLibraries=[];if(mLibrary instanceof Array)aLibraries=mLibrary;else aLibraries=[""+mLibrary];var fLoad=function(sScript){if(!sScript){try{if(fCallBack&&typeof fCallBack==typeof function(){})fCallBack.apply(window)}catch(_){}if(!fDl.aQueue.length){fDl.bRunning=false;return}fQueue.apply(this,fDl.aQueue.shift());return}if(sScript in
fDl.aLibraries){fLoad(aLibraries.shift());return}var hTimeout=null;var bScript=false;var fScript=function(){if(bScript)return;bScript=true;if(hTimeout){clearTimeout(hTimeout);hTimeout=null}fDl.aLibraries[sScript]=1*new Date;fLoad(aLibraries.shift())};var oScript=document.createElement("script");oScript.type="text/javascript";oScript.async=true;oScript.onload=oScript.onerror=function(){oScript.onload=oScript.onerror=oScript.onreadystatechange=null;fScript()};oScript.onreadystatechange=function(){if(oScript.readyState!=
"loaded"&&oScript.readyState!="complete")return;oScript.onload=oScript.onerror=oScript.onreadystatechange=null;fScript()};oScript.src=sScript;hTimeout=setTimeout(function(){hTimeout=null;fScript()},iTimeOut||45E3);try{var oLastScript=document.getElementsByTagName("script")[0];oLastScript.parentNode.insertBefore(oScript,oLastScript)}catch(_$0){fScript()}};fLoad(aLibraries.shift())};fQueue.apply(this,fDl.aQueue.shift())};fDl.bLoaded=true;fDl.bRunning=false;fDl.aQueue=[];fDl.aLibraries={};if(window.dl&&
window.dl.bStub&&window.dl.aQueue&&window.dl.aQueue.length)for(var i=0;i<window.dl.aQueue.length;++i)fDl.apply(window,window.dl.aQueue[i]);window.dl=fDl})();