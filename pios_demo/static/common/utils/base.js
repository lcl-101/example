// 暴露的工具方法
// {
//   cookie: {get, set, remove}
//   url: {protocol, domain}
//   removeUrlKeyPair              删除指定url上的字段
//   getUrlKeyVal                  获取当前URL上指定参数值
//   getPlatform                   获取平台
//   addProtocol                   给url增加协议头
//   changeImgSize                 改变图片尺寸
// }


const baseUrl = window.location.href
const baseUrlProtocol = window.location.protocol
const baseUrlDomain = baseUrl.substr(0, baseUrl.indexOf('.com') + 4)
const baseUrlSplitArr = baseUrlDomain.split('.')
const baseUrlTopLevelStr = baseUrlSplitArr[baseUrlSplitArr.length - 2] // 获取当前url一级域名去除后缀的字符串，项目中'zhe800'
const userAgent = navigator.userAgent;

// cookie操作
const ZHECOOKIE = {
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
      domain = (argc > 4) ? argv[4] : "." + urlDomain + ".com"
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
const filterDomain = param => {
  let u = ''
  if (param === 'passport') {
    u = 'https://' + param
  } else {
    u = baseUrlProtocol + '//' + param
  }
  // if(p == 'wx') {
  //   u += ".m2.tuan800.com"
  // } else {
  u += '.' + baseUrlTopLevelStr + '.com'
  // }
  return u
}
// 获取url信息
const ZHEURL = {
  protocol: baseUrlProtocol,
  domain: baseUrlDomain,
  outDomain: filterDomain('out'),
  mDomain: filterDomain('m'), // 对应之前 m.zhe800.com
  imDomain: filterDomain('im'), // 对应之前 im.zhe800.com
  passportDomain: filterDomain('passport'), // 对应之前 passport.zhe800.com
  mApiDomain: filterDomain('m.api'), // 对应之前 m.api.zhe800.com
  tDomain: filterDomain('t'), // 对应之前 t.zhe800.com
  zapiDomain: filterDomain('zapi'), // 对应之前 zapi.zhe800.com
  mshopMDomain: filterDomain('mshop.m'), // 对应之前 mshop.m.zhe800.com
  pinaMDomain: filterDomain('pina.m'), // 对应之前 pina.m.zhe800.com
  th5MDomain: filterDomain('th5.m'), // 对应之前 th5.m.zhe800.com
  gHdDomain: filterDomain('g'), // 对应之前 g.hd.zhe800.com
  miaoMDomain: filterDomain('miao.m') // 对应之前 miao.m.zhe800.com
}

/**
* 删除指定url上的字段
* @param  url   要替换的url
* @param  key   替换的字段
*/
export function removeUrlKeyPair(url, key) {
  const reg = new new RegExp(key + "=[^&]*", "gmi")
  url = url.replace(reg, "");
  if (url.indexOf('&') == url.length - 1) url = url.substring(0, url.length - 1)
  if (url.indexOf('?') == url.length - 1) url = url.substring(0, url.length - 1)
  url = url.replace("?&", "?").replace('&&', '&')
  return url
}

/**
* 获取当前URL上指定参数值
* @param  name  要获取的参数名
*/
export function getUrlKeyVal(name) {
  const regex = new RegExp("[?&]" + encodeURIComponent(name) + "\\=([^&#]+)")
  const value = (location.search.match(regex) || ["", ""])[1]
  return decodeURIComponent(value)
}

/**
* 获取平台（微信 or m站 or 客户端）
*/
export function getPlatform() {
  const ua = navigator.userAgent.toLowerCase()
  const mtvdi = ZHECOOKIE.get('mtvdi') || ''
  if (ua.match(/MicroMessenger/i) == 'micromessenger' || getUrlKeyVal('pub_page_from') === 'wx') {
    return 'wx'
  } else if (mtvdi || (getUrlKeyVal('pub_page_from') === 'zheclient')) {
    return 'zheclient'
  } else {
    return getUrlKeyVal('platformType') ? getUrlKeyVal('platformType') : 'm'
  }
}

/**
*                                                                           

/**
* 改变图片大小
* @param img   图片路径
* @param size  目标尺寸
*/
export function changeImgSize(img, size) {
    var img_arr = img.split("/");
    var img_arr_length = img_arr.length;
    var img_name = img;
    if (img_arr_length > 1) {
        img_name = img_arr[img_arr_length - 1];
    }
    img_name = img_name.replace(".webp", "");
    var img_name_arr = img_name.split(".");
    if (img_name_arr.length == 3) {
        img_name_arr.splice(img_name_arr.length - 1, 0, size);
    }
    if (img_name_arr.length == 4) {
        img_name_arr.splice(img_name_arr.length - 2, 1, size);
    }
    var new_img_name = img_name_arr.join(".");
    return img.replace(img_name, new_img_name);
};

/**
 *  版本比较
 *  @param nowVersion   当前的版本
 *  @param goalVersion   参照的版本
 *  @param type   比较运算符
 */
export function compareVersion(nowVersion, goalVersion, type) {
  let nowStr = '',
      goalStr = '',
      nowArr = nowVersion.split('.'),
      goalArr = goalVersion.split('.');
  let result = false;
  let STRLEN = 4;
  let PrefixInteger = function (num, n) { // num传入的数字，n需要的字符长度
      return (Array(n).join(0) + num).slice(-n);
  }
  for (let i = 0; i < Math.max(nowArr.length, goalArr.length); i++) {
      nowStr += PrefixInteger(~~nowArr[i], STRLEN);
      goalStr += PrefixInteger(~~goalArr[i], STRLEN);
  }
  switch (type) {
      case "==":
          (parseInt(nowStr) == parseInt(goalStr)) && (result = true)
          break;
      case ">":
          (parseInt(nowStr) > parseInt(goalStr)) && (result = true)
          break;
      case ">=":
          (parseInt(nowStr) >= parseInt(goalStr)) && (result = true)
          break;
      case "<":
          (parseInt(nowStr) < parseInt(goalStr)) && (result = true)
          break;
      case "<=":
          (parseInt(nowStr) <= parseInt(goalStr)) && (result = true)
          break;
      default:
          // statements_def
          break;
  }
  return result;
};
/**
 * [addProtocol 添加协议头]
 * @param  {[type]}  url [description]
 * @return {Boolean}   [description]
 */
export function addProtocol(url) {
   let dataUrl = "";
   if (url) {
       if (baseUrlProtocol == 'https:') {
           dataUrl = url.indexOf("https://") > -1 ? url : url.replace("http:", baseUrlProtocol)
       } else {
           dataUrl = url;
       }
   }
   return dataUrl;
}


const OS = {}
OS.webkit = userAgent.match(/WebKit\/([\d.]+)/) ? true : false;
OS.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) ? true : false;
OS.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
OS.iphone = !OS.ipad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
OS.webos = userAgent.match(/(webOS|hpwOS)[\s\/]([\d.]+)/) ? true : false;
OS.touchpad = OS.webos && userAgent.match(/TouchPad/) ? true : false;
OS.ios = OS.ipad || OS.iphone;
OS.blackberry = userAgent.match(/BlackBerry/) || userAgent.match(/PlayBook/) ? true : false;
OS.opera = userAgent.match(/Opera Mobi/) ? true : false;
OS.fennec = userAgent.match(/fennec/i) ? true : false;
OS.isIos4 = (OS.ios && navigator.appVersion.toLowerCase().indexOf("os 4") > -1) ? true : false;
OS.desktop = !(OS.ios || OS.android || OS.blackberry || OS.opera || OS.fennec);

const BROWSER = {
  miui: /miuibrowser/.test(userAgent),
  uc: /ucbrowser/.test(userAgent),
  qq: /mqqbrowser/.test(userAgent),
  baidu: /baidubrowser/.test(userAgent),
  safari: /Safari/.test(userAgent)
}


export {ZHECOOKIE, ZHEURL, OS, BROWSER}
