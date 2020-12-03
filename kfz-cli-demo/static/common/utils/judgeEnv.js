// 判断平台环境
// https://www.jb51.net/article/164278.htm

/**
 * 判断各个平台环境
 * @returns {string}
 * WEB                      浏览器环境
 * WX_WEB                   微信环境下的WEB
 * WX_MINIPROGRAM           微信小程序环境
 * BAIDU_MINIPROGRAM        百度小程序环境
 * BYTEDANCE_MINIPROGRAM    头条小程序环境
 * APP                      App环境
 * ALIPAY_MINIPROGRAM       支付宝小程序环境
 * ALIPAY_WEB               支付宝客户端环境
 */
const judgePlatform = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if(userAgent.indexOf('micromessenger') > -1){
        if (userAgent.indexOf('miniprogram') > -1  || window.__wxjs_environment === 'miniprogram') {
            return 'WX_MINIPROGRAM';
        } else {
            return 'WX_WEB'
        }
    }else if(userAgent.indexOf('kfz_com') > -1) {
        return 'APP';
    } else if(userAgent.indexOf('swan-baiduboxapp') > -1){ //是否在百度小程序环境
        return 'BAIDU_MINIPROGRAM';
    }else if(userAgent.indexOf('toutiaomicroapp') > -1){ //判断是今日头条小程序
        return 'BYTEDANCE_MINIPROGRAM';
    }else if(userAgent.indexOf('alipayclient') > -1 && userAgent.indexOf('miniprogram') > -1){ //判断是支付宝小程序
        return 'ALIPAY_MINIPROGRAM';
    }else {
        return 'WEB';
    }
};


export default judgePlatform;