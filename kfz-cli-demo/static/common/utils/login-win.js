window.loginWin = function(loginSite,type,hashAction){
    var src,
        mask = document.createElement('div'),
        tipView = document.createElement('div'),
        view = document.getElementsByTagName("BODY")[0],
        doc = document.getElementsByTagName("HTML")[0];
        mask.id = 'loginWinMask';
        tipView.id = 'loginWin';
        mask.style.cssText = "position: fixed;top: 0px;left: 0px;z-index: 100000000;width: 100%;height: 100%;background-color: #000;filter: alpha(opacity=50); opacity: .5;";
        tipView.style.cssText = "position: fixed;top: 50%;left: 50%;z-index: 100000001;width: 450px;height: 472px;margin-top: -236px;margin-left: -200px;font-family: 'microsoft yahei';";
        var url = location.href;
        if(hashAction){
            if(url.charAt(url.length-1) == '#'){
                if(type == 'login'){
                    src = loginSite+'Pc/Login/iframe?returnUrl=' + url +'hashAction-'+hashAction;
                }else if(type == 'register'){
                    src = loginSite+'Pc/Login/iframe#tab-2?returnUrl=' + url +'hashAction-'+hashAction;
                }
            }else {
                if(type == 'login'){
                    src = loginSite+'Pc/Login/iframe?returnUrl=' + url +'#hashAction-'+hashAction;
                }else if(type == 'register'){
                    src = loginSite+'Pc/Login/iframe#tab-2?returnUrl=' + url +'#hashAction-'+hashAction;
                }
            }
        }else {
            if(url.charAt(url.length-1) == '#'){
                if(type == 'login'){
                    src = loginSite+'Pc/Login/iframe?returnUrl=' + url;
                }else if(type == 'register'){
                    src = loginSite+'Pc/Login/iframe#tab-2?returnUrl=' + url;
                }
            }else {
                if(type == 'login'){
                    src = loginSite+'Pc/Login/iframe?returnUrl=' + url;
                }else if(type == 'register'){
                    src = loginSite+'Pc/Login/iframe#tab-2?returnUrl=' + url;
                }
            }
        }
        var tipViewHtml = "<div class='closeBtn' style='position: absolute;z-index: 1;top: 0;right: -52px;width: 32px;height: 32px;'><a id='loginWinCloseBtn' href='javascript:;' style='display: none;cursor: pointer;width: 32px;height: 32px;background: url("+loginSite+"/pc/images/login/close.png) no-repeat center;background-size: 100%;' title='关闭'></a></div><iframe src='"+ src +"' width='450px' height='472px' frameborder='0' scrolling='no' id='iframe_login'  allowtransparency='true'></iframe>";
        tipView.innerHTML = tipViewHtml;
        view.appendChild(mask);
        view.appendChild(tipView);
        var closeBtin = document.getElementById('loginWinCloseBtn');
        closeBtin.onclick = function(){
            removeElement(mask);
            removeElement(tipView);
        };
        var iframe = document.getElementById("iframe_login");
        if (iframe.attachEvent){
            iframe.attachEvent("onload", function(){
                closeBtin.style.display = 'block';
            });
        } else {
            iframe.onload = function(){
                closeBtin.style.display = 'block';
            };
        }
        function removeElement(_element){
            var _parentElement = _element.parentNode;
            if(_parentElement){
                _parentElement.removeChild(_element);
            }
        }
};
$(function(){
　　var i, paramsArr = window.location.search.substr(1).split('&'), params = {}, aParamArr;
    for (i = 0; i<paramsArr.length; i++){
        aParamArr = paramsArr[i].split('=');
        if (aParamArr[0].length) {
            params[aParamArr[0]] = decodeURI(aParamArr[1]);
        }
    }
    if(params.jsAction){
        typeof window[params.jsAction] == 'function' && window[params.jsAction]();
    }
});
window.lodingTip = function(text){
    text = text?text:'';
    var lodingbox =   document.createElement('div'),
        lodingMark = document.createElement('div'),
        loginText = document.createElement('i'),
        img = document.createElement('img'),
        br = document.createElement('br'),
        view = document.getElementsByTagName("BODY")[0];
    if(text == 'close'){
        removeElement(lodingbox);
        removeElement(lodingMark);
        removeElement(loginText);
    }
    lodingbox.style.cssText = 'position: fixed;top:50%;left: 50%;width: 235px;height: 118px;line-height:54px;margin-top: -59px;margin-left: -117px;z-index: 100000;border-radius: 6px;text-align: center;font-size: 16px;color: #fff;background:url('+loginSite+'/pc/images/login/successbg.png) no-repeat 0 0;';
    lodingMark.style.cssText = "position:fixed;left:0;top:0;z-index:10000;width:100%;height:100%;";
    loginText.style.cssText = ' position:relative;top:-3px;margin-left: 4px;font-style:normal;';
    img.style.cssText = 'position:relative;top:26px;width:26px;height:26px;';
    img.src=loginSite+'/pc/images/login/loading1.gif';
    loginText.innerHTML = text;
    lodingbox.appendChild(img);
    lodingbox.appendChild(br);
    lodingbox.appendChild(loginText);
    lodingbox.appendChild(lodingMark);
    view.appendChild(lodingbox);
    return lodingbox;
};
