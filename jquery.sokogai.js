/*
 * Storage extensions
 *
 */
(function(){

  Storage.prototype.keys = function(){
    var klist = []
    for(i=0;i<this.length;i++){
      klist.push(this.key(i))
    }
    return klist
  }

})();
/*
 * mStorage - the missing memoryStorage, the most volatile storage backend
 *
 * Can be used for single page apps which do not have any reloads
 * (also location.href='...' should not be allowed!)
 *
 */
(function(){

  var mStorage = function(){
    this.length = 0
  }

  mStorage.prototype._data = {}

  mStorage.prototype.clear = function(){
    mStorage.prototype._data = {}
    this.length = 0
  }

  mStorage.prototype.key = function(){
    return "NotYetImplemented"
  }

  mStorage.prototype.keys = function(){
    return "NotYetImplemented"
  }

  mStorage.prototype.getItem = function(key){
    if(!key) { return }
    return window.memoryStorage._data[key] || null
  }

  mStorage.prototype.setItem = function(key, value){
    if(!key) { return }
    window.memoryStorage._data[key] = value
    this.length++
  }

  mStorage.prototype.removeItem = function(key){
    if(!key) { return }
    delete window.memoryStorage._data[key]
    this.length--
  }

  window.memoryStorage = new mStorage()

})()
;
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

};
// jQuery wrapper for sokogai.js
// $.sokogai[funcs]

(function($) {
  $.fn.sokogai = function(){

    return (new sokogai)

  }
})(jQuery)
;
