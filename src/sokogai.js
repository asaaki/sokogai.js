sokogai = function(){
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
