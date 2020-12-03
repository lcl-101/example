/*
 * name:KfzJSBridge.js
 * intro:JS与native交互框架，此框架对调用native端进行统一封装
 * version: v2.0.0
 * author: luoronghang
 * date: 2018/03/29
 */

window.KfzJSBridge = {};

//OS
// android userAgent: ANDROID_KFZ_COM_2.0.16_KIW-AL10_6.0.1
// ios userAgent: IOS_KFZ_COM_2.0.14_iPhone 7_11.2.1
const userAgent = navigator.userAgent;
const OS = {};
OS.isKfzApp = userAgent.match(/KFZ_COM/) ? true : false;
OS.android = userAgent.match(/ANDROID/) ? true : false;
/*OS.iphone = userAgent.match(/iPhone/) ? true : false;
OS.ipad = userAgent.match(/iPad/) ? true : false;*/
OS.IOS = userAgent.match(/IOS/) ? true : false;
// function setupWebViewJavascriptBridge(callback) {
// 	if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
// 	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
// 	window.WVJBCallbacks = [callback];
// 	var WVJBIframe = document.createElement('iframe');
// 	WVJBIframe.style.display = 'none';
// 	WVJBIframe.src = 'https://__bridge_loaded__';
// 	document.documentElement.appendChild(WVJBIframe);
// 	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
// }
// alert("OS.isKfzApp:"+ OS.isKfzApp);
// alert("OS.iphone:"+ OS.iphone);
// alert("OS.android:"+ OS.android);
if(OS.isKfzApp && OS.IOS){ // 基于 setupWebViewJavascriptBridge 的精简 在ios环境下发送 bridge_loaded 请求 以帮助ios WebViewJavascriptBridge 初始化
    // alert("from native22222 ios....");
    // console.log('from ios.... ');
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
    // setupWebViewJavascriptBridge(function(bridge) {

    /* Initialize your app here */

    // bridge.registerHandler('jstest', function(data, responseCallback) {
    //     console.log("JS Echo called with:", data)
    //     responseCallback(data)
    // })
    // bridge.callHandler('ObjCtest', {'key':'value'}, function responseCallback(responseData) {
    //     console.log("JS received response:", responseData)
    // })
    // });
}
// console.log('进入 KfzJsBridge .........');

if(OS.android && OS.isKfzApp){
    // console.log('进入android 系统.........');
    // console.log('kongfz app.........');
    require("./WebViewJsBridgeForAndroid");   
}

//调用native统一入口
KfzJSBridge.callNative = function(param){
    if(typeof param == 'undefined' || typeof param != 'object'){
        console.log("param error!");
        return;
    }
    var methodname = '',
        methodparam ='',
        callback ='';
    if(param.methodname){
        methodname = param.methodname;
    }
    if(param.methodparam){
        methodparam = JSON.stringify(param.methodparam);
    }
    if(param.callback){
        callback = param.callback;
    }
    console.log("mhdname:"+methodname+"\n"+"mhdparam:"+methodparam+"\n"+"callback:"+callback);
    //alert('WebViewJavascriptBridge:' + WebViewJavascriptBridge);
    try{
        //window.WebViewJavascriptBridge.callHandler(methodname,methodparam,callback);
        if(OS.IOS){
            if(typeof WebViewJavascriptBridge == 'object'){
                window.WebViewJavascriptBridge.callHandler(methodname,methodparam,callback);
            }else{
                var callnativeinit;
                callnativeinit = setInterval(function(){
                    if(typeof WebViewJavascriptBridge == 'object'){
                        clearInterval(callnativeinit);
                        window.WebViewJavascriptBridge.callHandler(methodname,methodparam,callback);
                    }
                },100);
            }
        }else{
            window.WebViewJavascriptBridge.callHandler(methodname,methodparam,callback);
        }
        //window.WebViewJavascriptBridge.callHandler(methodname,methodparam,callback);
    }catch(e){
        //alert("WebViewJavascriptBridge:" + e.message);
        console.log(e.message);
    }
};

//通用方法封装
KfzJSBridge.methods = {};

/*
 * 协议详解，请查看wiki
 * http://wiki.kongfz.com/confluence/pages/viewpage.action?pageId=1869152
 * */

/*
* 加载web页面(旧框架)
* @params
* {"title":"商品详情","url":"http://seller.kongfz.com/pc/upbook/index#/"}
* title:标题，
* url：跳转的链接地址
* */
KfzJSBridge.methods.loadPageV2=function(params){
    var param = { "methodname":"loadPageV2","methodparam":params};
    KfzJSBridge.callNative(param);
};
/*
* 加载web页面(新框架)
* @params
* {"title":"商品详情","url":"http://seller.kongfz.com/pc/upbook/index#/"}
* title:标题，
* url：跳转的链接地址
* */
KfzJSBridge.methods.loadPage=function(params){
    var param = {"methodname":"loadPage","methodparam":params};
    KfzJSBridge.callNative(param);
};


/*
* 打开native上书页
* @params
* {"cmd":"add/clone/edit/copy","addWay":" scan/search/manual_input","itemId":"231123123"}
* */
KfzJSBridge.methods.toAddBook=function(params){
    var param = {"methodname":"toAddBook","methodparam":params};
    KfzJSBridge.callNative(param);
};

/*
* 打开native 商品详情页
* @params
* {"itemId":"231123123","shopId":"333333"}
* */
KfzJSBridge.methods.toDetail=function(params){
    var param = {"methodname":"toDetail","methodparam":params};
    KfzJSBridge.callNative(param);
};

/*
* 打开客户端扫一扫
* @params 无
* @callback
* */
KfzJSBridge.methods.openScanCode=function(callback){
    var param = {"methodname":"openScanCode","callback":callback};
    KfzJSBridge.callNative(param);
};

/*
* 打开客户端日期控件
* @params
* @callback
* */
KfzJSBridge.methods.openDatePicker=function(params,callback){
    var param = {"methodname":"openDatePicker","methodparam":params,"callback":callback};
    KfzJSBridge.callNative(param);
};

/*
* 弹出toast提示，3秒后消失
* @params
* {"text":"提示信息文本"}
* text:需要提示文字信息
* */
KfzJSBridge.methods.toast=function(params){
    var param = {"methodname":"toast","methodparam":params};
    KfzJSBridge.callNative(param);
};

/*
* dialog
* @params
* {“title”:”温馨提示”,"content":"确定支付吗？","btn_txt":["取消","确定"]}
* @callback
* */
KfzJSBridge.methods.dialog=function(params,callback){
    var param = {"methodname":"dialogv2","methodparam":params,"callback":callback};
    KfzJSBridge.callNative(param);
};

/*
* 显示或隐藏 loadingbar
* @params
* {"type":"0/1","cmd":"show/hide","text":"加载中提示文字"}
* type:loadingbar类型，0：非阻塞，1：阻塞
* cmd: show 显示，hide 隐藏
* text:提示文字
* */
KfzJSBridge.methods.loadingbar=function(params){
    var param = {"methodname":"loadingbar","methodparam":params};
    KfzJSBridge.callNative(param);
};

/*
  * 通知native返回时重新加载上一级页面,也可指定加载 某个url地址
  * 使用场景：加载完下一个页面后才通知native返回上一级重新加载
  * @params
  * {"url":"http://h5.m.ccc.com/orders/h5/get_order_list"}
  * */
KfzJSBridge.methods.backReload=function(params){
    var param = {"methodname":"back_reload","methodparam":params};
    KfzJSBridge.callNative(param);
};

/*
  * 获取网络类型
  * callback：客户端的回调，带返回值：1表示wifi，2表示非wifi 包含(2g,3g,4g),0表示无网络状态
  * */
KfzJSBridge.methods.getNetworkStatus=function(callback){
    var param = {"methodname":"network_status","callback":callback};
    KfzJSBridge.callNative(param);
};

/*
  * 通知客户端回首页
  * */
KfzJSBridge.methods.goToHome=function(){
    var param = {"methodname":"goto_home"};
    KfzJSBridge.callNative(param);
};

/*
  * 通知客户端启动系统浏览器访问页面
  * {"url":"http://m.kongfz.com"}
  * Url:表示要打开的页面地址：地址中带有“http”则打开系统浏览器，带有“taobao://”则启动淘宝客户端走淘宝scheme方式
  * */
KfzJSBridge.methods.openBrowser=function(params){
    var param = {"methodname":"open_browser","methodparam":params};
    KfzJSBridge.callNative(param);
};

/*
  * 获取客户端支持的所有协议方法
  * callback: 客户端的回调，带有返回值 为json数据
  * 举例数据：{"login":"true","loadingbar":"true"}
  * */
KfzJSBridge.methods.getAllMethod=function(callback){
    var param = {"methodname":"get_allmethod","callback":callback};
    KfzJSBridge.callNative(param);
};

/*
*通知native是否正常执行返回上一级页面
*{"status":"true/false"}
* status:表示具体状态，true 执行正常返回上一级，false不做任何动作(不返回上一级)
* */
KfzJSBridge.methods.isGoBack=function(params){
    var param = {"methodname":"isgoback","methodparam":params};
    KfzJSBridge.callNative(param);
};

/*
  * 通知native销毁历史页面
  * {"hisnum":"2/-1"}
  * hisnum:表示要销毁的历史页面层级数，从最近的页面往前推，比如：1表示销毁上1级，2表示销毁上2级，依次类推 3,4,5 等；-1 表示 销毁所有历史页面，即：回到首页。
  * */
KfzJSBridge.methods.destroyHistory=function(params){
    var param = {"methodname":"destroy_history","methodparam":params};
    KfzJSBridge.callNative(param);
};

/*
  * 通知native webview重新被显示时回调js
  * callback：客户端的回调, webview重新被显示时回调js的方法，由js完成对页面内的处理逻辑
  * 使用场景：
  * 1)、A页面跳转至B页面后，通过返回bar 再次回到A页面时 native回调传入的callback方法通知页面 ，
  *  由js根据自身业务需求完成功能处理，比如某个数据局部更新。
  * */
KfzJSBridge.methods.viewDidAppear=function(callback){
    var param = {"methodname":"viewDidAppear","callback":callback};
    KfzJSBridge.callNative(param);
};

/*
  * 获取客户端是否支持某个urlscheme协议
  * @params
  * {"urlkey":"22"}
  * urlkey: 表示为当前urlscheme key值
  * 所有urlscheme列表地址：
  * callback: 客户端返回值，为number类型，0 表示支持，1表示不支持
  * */
KfzJSBridge.methods.isSupportScheme=function(params,callback){
    var param = {"methodname":"issupport_scheme","methodparam":params,"callback":callback};
    KfzJSBridge.callNative(param);
};

/*
  * 通知native返回上一级页面（关闭当前窗口）
  * methodparam："" 空
  * callback:"" 空
  * 使用场景：页面A中 有“返回”按钮，点击此按钮 通知native 关闭当前窗口，返回上一级页面。
  * */
KfzJSBridge.methods.goBack=function(){
    var param = {"methodname":"goback"};
    KfzJSBridge.callNative(param);
};

// test callback
KfzJSBridge.methods.testCallFunc = function(params,callback){
    //alert('开始执行 testCallFunc');
    var param = {"methodname":"testCallFunc","methodparam":params,"callback":callback};
    KfzJSBridge.callNative(param);
};

/*
  * 返回上一页并且执行reload
  * methodparam："" 空
  * callback:"" 空
  * 使用场景：仅用在native 新框架返回至老框架时 重新加载H5页面。
  * 注：如果新开发H5页面，建议使用viewDidAppear来实现此功能。
  * */
KfzJSBridge.methods.backReload=function(){
    var param = {"methodname":"backReload"};
    KfzJSBridge.callNative(param);
};
/*
  * 客户端topbar 右侧快捷入口
  * methodparam：""
  * param = {
        share:{
            isShow:true,
            data:{
                "baseInfo":{
                    "title":"",
                    "desc":"",
                    "img":"",
                    "url":""
                },
                "miniProgram":{
                    "userName":'',
                    "path":"",
                    "img":"",
                    "url":""
                },
                "posterImg":"",
                "eventAttr":{ //统计相关参数

                }
            }
        },
        menuItem:{
            isShow:true,
            data:''
        }
    }
  * 使用场景：在页面onload之后发送此消息。
  * 注：H5页面控制客户端头部导航条右侧快捷入口的显示或隐藏
  * */
KfzJSBridge.methods.quickMenuItems=function(param){
    var params = {"methodname":"quickMenuItems","methodparam":param,"callback":""};
    KfzJSBridge.callNative(params);
};

//sendTrackLogs 向客户端发送统计数据
/** 
 * param: {
    selfUrl：“https://m.kongfz.com/”,

    event:"v_detail",

    eventAttr:{

        "shopid":"121323",

        "itemid":"2324233"

    }
    }
*/
KfzJSBridge.methods.sendTrackLogs=function(param){
    var params = {"methodname":"sendTrackLogs","methodparam":param,"callback":""};
    KfzJSBridge.callNative(params);
};

//loadNativePage 打开客户端原生页面
/** 
 * param: {
    url:原生页面url

    destroyWebPage:true/false true 销毁当前H5页面， false 不做任何处理
    }
*/
KfzJSBridge.methods.loadNativePage=function(param){
    var params = {"methodname":"loadNativePage","methodparam":param,"callback":""};
    KfzJSBridge.callNative(params);
};


KfzJSBridge.callback = {}; // 暂时不用！！！！！  所有需要native回调的方法基于 KfzJSBridge.callback 创建 ,如：KfzJSBridge.callback.getAllMethod()
KfzJSBridge.callJs = {}; // native直接调用js方法定义，前端提供，所有方法在 callJs 创建，如：KfzJSBridge.callJs.isgoback()


module.exports = KfzJSBridge


