import{dm as o}from"./main-D1-kaBPI.js";function a(r,e){return new Promise((n,t)=>{r.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?n():(e(o(r,"canplay",n)),e(o(r,"error",t)))})}export{a as r};
