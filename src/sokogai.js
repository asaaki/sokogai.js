/*!
 * sokogai.js - wrapper for the storage backend in browsers
 *
 * It uses localStorage, sessionStorage and memory in this order as fallbacks.
 *
 */


sokogai = function(){
  var ls = window.localStorage
    , ss = window.sessionStorage
    , ms = window.memoryStorage

}