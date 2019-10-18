import {kfzCookie} from '../utils/tool';
module.exports ={
    appAwake: function (page,agr) {
        var userAgent = navigator.userAgent,protocol='',link='';
        if(userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1){
            protocol='kongfzApp://';
        }else{
            protocol='kongfz://';
        }
        switch (page){
            case 'home':
                link='app.kongfz.com?page=home';
                break;
            case 'detail':
                link='app.kongfz.com?page=detail&shopId='+ agr.shopId +'&itemId='+ agr.itemId;
                break;
            case 'pmdetail':
                link='app.kongfz.com?page=auctionDetail&itemId='+ agr.itemId;
                break;
            default:
                link = 'app.kongfz.com?page=web&url=' + agr.url;
                break;
        }
        var isIos = userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1 ? true : false;
        var isAndroid = userAgent.indexOf('Android') > -1 ? true : false;
        var isShowed = kfzCookie.get('isShowed');
        // 是iOS并且没有展示过
        if(isIos && !isShowed){
            kfzCookie.set('isShowed',1,1);
            location.href = protocol+link;
        }else if(isAndroid) {
            location.href = protocol+link;
        }

    },
    appDown: function (page,agr) {
        var downUrl='http://app.kongfz.com/downloads/kong.html?';
        switch (page) {
            case 'home':
                downUrl+='isHome=1';
                break;
            case 'detail':
                downUrl+='isDetail=1&shopId=' +agr.shopId +'&itemId='+ agr.itemId;
                break;
            case 'pay':
                downUrl+='isPay=1&&paymentId=' +agr.paymentId +'&incomeUserID'+ agr.incomeUserID+'&tradeNum='+agr.tradeNum;
                break;
            default:
                downUrl += 'mUrl=' + encodeURIComponent(agr.url);
                break;
        }
        location.href = downUrl;
    }
};
