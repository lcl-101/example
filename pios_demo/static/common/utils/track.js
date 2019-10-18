/**
 *  通用统计埋点工具方法
 *  author：luorh
 *  date:20190703
 *  version:1.0.2
 * */
;(function(win){
    var _selfUrl = encodeURIComponent(location.href),
        _refUrl  = encodeURIComponent(document.referrer),
        winWidth = window.screen.width,
        winHeight= window.screen.height;
    var commonData = {
        resolution:winWidth + 'x' + winHeight,
        selfUrl:_selfUrl,
        refUrl:_refUrl
    };
    var track = function(){
        this.v = '1.0.2';
    };
    track.prototype.send = function(ev,data){
        var dataStr = '';
        if(data && typeof data =='object'){
            dataStr = encodeURIComponent(JSON.stringify(data));
        }
        var __imgurl = '//tj.kongfz.com/web/collect/1.gif';
        if(window.location.href.indexOf('neibu') > -1){
            __imgurl = '//neibutj.kongfz.com/web/collect/1.gif';
        }
        __imgurl += '?event=' + ev + '&resolution=' + commonData.resolution + '&selfUrl=' + commonData.selfUrl + '&refUrl=' + commonData.refUrl + '&eventAttr=' + dataStr + "&n_" + Math.random();
        var trackImg = document.getElementById('__trackImg');
        if(trackImg){
            trackImg.src = __imgurl;
        }else{
            var _img = document.createElement('img');
            _img.src = __imgurl;
            _img.id = '__trackImg';
            _img.style.display = 'none';
            document.body.appendChild(_img);
        }
    };
    win.track = new track();
})(window);