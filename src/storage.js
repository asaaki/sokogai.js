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

})()