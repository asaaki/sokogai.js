/**
 * @license MIT/X11
 * (c) 2012 Christoph Grabo <chris@dinarrr.com>
 */

;
(function(){

  Storage.prototype.keys = function(){
    var klist = []
    for(i=0;i<this.length;i++){
      klist.push(this.key(i))
    }
    return klist
  }

})()
;
function mStorage(){
  this.length = 0
}

(function(){

  mStorage.prototype._data = {}
  mStorage.prototype._keys = []

  mStorage.prototype.clear = function(){
    mStorage.prototype._data = {}
    mStorage.prototype._keys = []
    this.length = 0
  }

  mStorage.prototype.key = function(idx){
    return mStorage.prototype._keys[idx] || null
  }

  mStorage.prototype.keys = function(){
    return mStorage.prototype._keys
  }

  mStorage.prototype.getItem = function(key){
    if(!key) { return }
    return mStorage.prototype._data[key] || null
  }

  mStorage.prototype.setItem = function(key, value){
    if(!key) { return }
    mStorage.prototype._keys.push(key)
    mStorage.prototype._data[key] = value
    this[key] = mStorage.prototype._data[key]
    this.length++
  }

  mStorage.prototype.removeItem = function(key){
    if(!key) { return }
    var klist = mStorage.prototype._keys
    var pos = klist.indexOf(key)
    if(pos < 0) { return }
    var rest = klist.splice(pos)
    rest.shift()
    mStorage.prototype._keys = klist.concat(rest)
    delete mStorage.prototype._data[key]
    delete this[key]
    this.length--
  }

  mStorage.prototype.hasOwnProperty = function(key){
    return mStorage.prototype._keys.indexOf(key) > -1
  }

  var non_enumerables = [
    "_data", "_keys",
    "key", "keys", "clear",
    "getItem", "setItem", "removeItem",
    "hasOwnProperty"
  ]

  for(var prop in non_enumerables){
    Object.defineProperty(mStorage.prototype,
                          non_enumerables[prop],
                          { enumerable: false })
  }

  window.memoryStorage = new mStorage()
})()
;
function Sokogai(){
  var ls = window.localStorage || null
    , ss = window.sessionStorage || null
    , ms = window.memoryStorage || null

  return {
    stores: {
      local: ls,
      session: ss,
      memory: ms
    }
  }
}
window.sokogai = new Sokogai()
;
// jQuery wrapper for sokogai.js
(function($) {
  $.sokogai = window.sokogai
})(jQuery)
;
