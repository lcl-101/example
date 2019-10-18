const MessageUrl=(url) => {
    return url.indexOf('neibu')!==-1? 'http://neibummessage.kongfz.com/?type=chat#/': 'http://mmessage.kongfz.com/?type=chat#/'
}
const loginUrl=(url) => {
    return url.indexOf('neibu')!==-1? 'https://neibum.kongfz.com/m/?mustLogin=1&returnUrl=': 'https://m.kongfz.com/m/?mustLogin=1&returnUrl='
}
const picUrl=(url) => {
    return url.indexOf('neibu')!==-1? 'http://neibuimage-upload.kongfz.com/photo/preview?filename=': 'http://image-upload.kongfz.com/photo/preview?filename='
}
const baseUrl = window.location.href
const baseUrlDomain = baseUrl.substr(0, baseUrl.indexOf('.cn') + 3)
// cookie操作
const kfzCookie = {
  get: function(name, encode) {
    const arg = name + "="
    const len = arg.length
    const cookieLen = document.cookie.length
    let i = 0,
      j = 0
    while(i < cookieLen) {
      j = i + len
      if(document.cookie.substring(i, j) === arg) {
        return this.getCookieVal(j, encode)
      }
      i = document.cookie.indexOf(' ', i) + 1
      if(i === 0) {
        break
      }
    }
    return ""
  }
  , set: function(name, value, expires, path, domain, secure) {
      const argv = arguments
      const argc = arguments.length
      const urlDomainArr = baseUrlDomain.split(".")
      const urlDomain = urlDomainArr[urlDomainArr.length - 2]
      //let expires = (argc > 2) ? argv[2] : null;
      const now = new Date();
      expires = (argc > 2) ?
        new Date(new Date().getTime() + parseInt(expires) * 24 * 60 * 60 * 1000)
        : new Date(now.getFullYear(), now.getMonth() + 1, now.getUTCDate())
      path = (argc > 3) ? argv[3] : '/'
      domain = (argc > 4) ? argv[4] : "." + urlDomain + ".cn"
      secure = (argc > 5) ? argv[5] : false
      document.cookie = name + "=" + escape(value)
        + ((expires == null) ? "" : ("; expires=" + expires.toGMTString()))
        + ((path == null) ? "" : ("; path=" + path))
        + ((domain == null) ? "" : ("; domain=" + domain))
        + ((secure == true) ? "; secure" : "")
  }
  , remove: function(name) {
        if(this.get(name)) {
          this.set(name, "", -1)
        }
  }
  , getCookieVal: function(offset, encode) {
      let endStr = document.cookie.indexOf(";", offset)
      if(endStr === -1) {
        endStr = document.cookie.length
      }
      if(!encode) {
        return document.cookie.substring(offset, endStr)
      }else {
        return unescape(document.cookie.substring(offset, endStr))
      }
  }
}

const tost = function(data){
  var html = '';
  window.alertWinTime = window.alertWinTime? window.alertWinTime:'';
  function domAppend(){
      html = '<span class="animated cpt-toast fadeOut alert alert-success alert-tishi" id="alert-tishi" style="position: fixed;top: 50%; left: 50%;padding: 10px 20px; background: rgba(7, 17, 27, 0.66); font-size: 14px; border-radius: 6px; color: rgb(255, 255, 255); z-index: 1000001; transform: translate3d(-50%, -50%, 0px); animation-duration: 0.5s;">'+data+'</span>'
      $('body').append(html);
      $('#alert-tishi').show();
      var t=setTimeout(function(){
        $('#alert-tishi').remove();
      },2000);
      window.alertWinTime=t;
  }
  if(window.alertWinTime){
      clearTimeout(window.alertWinTime);
      $('#alert-tishi').remove();
      domAppend();
  }else {
      domAppend();
  }
}

export {
  loginUrl,
  MessageUrl,
  picUrl,
  kfzCookie,
  tost
}
