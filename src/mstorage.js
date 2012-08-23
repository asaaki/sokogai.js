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
