"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var site = require("../../../config/kfz_sys").site;
var searchTools_1 = require("./searchTools");
var KfzTools = /** @class */ (function () {
    function KfzTools() {
        /**
         * 模块通信管理器
         * 管理各模块之间的通信
         * .on( eventName, callback, options ) 向管理器中注册指定事件
         * eventName 事件名称
         * callback 事件回调
         * options 事件配置 调试用
         *      options.from 事件触发来源
         *      options.description 事件描述信息
         * return {number} 返回该回调的id
         *
         * .watch( eventNameList, callback, options ) 监听指定事件
         * eventNameList 事件名称数组
         * callback 事件回调
         * options 事件配置 调试用
         *      options.from 事件触发来源
         *      options.description 事件描述信息
         * return {object} 返回该事件数组回调的id表
         *
         * .off( eventName, type, id ) 销毁管理器中指定事件
         * eventName 事件名称
         * type 事件类型 watch || on
         * id 回调id
         *
         * .run( eventName, params, options ) 触发管理器中的指定事件
         * eventName 事件名称
         * options 事件配置
         *      options.param 事件回调参数
         *      options.from 事件触发来源 调试用
         *      options.description 事件触发条件 调试用
         */
        this.contactManager = {
            debug: false,
            events: {},
            eventsWatch: {},
            on: function (eventName, callback, options) {
                var optionInfo = options || {};
                this.events[eventName] = this.events[eventName] || [];
                this.events[eventName].push({
                    description: optionInfo.description,
                    from: optionInfo.from,
                    once: optionInfo.once,
                    run: typeof callback == "function" ? callback : function () { }
                });
                return this.events[eventName].length;
            },
            watch: function (eventNameList, callback, options) {
                var optionInfo = options || {}, len = eventNameList.length, info = {};
                while (len--) {
                    if (!this.events[eventNameList[len]]) {
                        this.on(eventNameList[len]);
                    }
                    this.eventsWatch[eventNameList[len]] = this.eventsWatch[eventNameList[len]] || [];
                    this.eventsWatch[eventNameList[len]].push({
                        description: optionInfo.description,
                        from: optionInfo.from,
                        run: typeof callback == "function" ? callback : function () { }
                    });
                    // @ts-ignore
                    info[eventNameList[len]] = this.eventsWatch[eventNameList[len]].length;
                }
                return info;
            },
            off: function (eventName, type, id) {
                if (eventName) {
                    if (type == 'watch') {
                        if (id >= 0) {
                            if (this.eventsWatch[eventName] && this.eventsWatch[eventName][id]) {
                                this.eventsWatch[eventName][id] = null;
                            }
                        }
                        else {
                            if (this.eventsWatch[eventName]) {
                                delete this.eventsWatch[eventName];
                            }
                        }
                    }
                    else if (type == 'on') {
                        if (id >= 0) {
                            if (this.events[eventName] && this.events[eventName][id]) {
                                this.events[eventName][id] = null;
                            }
                        }
                        else {
                            if (this.events[eventName]) {
                                delete this.events[eventName];
                            }
                        }
                    }
                    else {
                        if (this.events[eventName]) {
                            delete this.events[eventName];
                        }
                    }
                }
                else {
                    this.events = {};
                }
                return this;
            },
            run: function (eventName, options) {
                var optionInfo = options || {};
                if (this.events[eventName]) {
                    var callbacks = this.events[eventName], callbackLen = callbacks.length;
                    while (callbackLen--) {
                        // 异步执行 防止阻塞
                        this.eventRun(callbacks[callbackLen], optionInfo.param);
                        // 同步执行
                        // callbacks[callbackLen].run(optionInfo.param);
                        var callbackInfo = {
                            eventName: eventName,
                            onFrom: callbacks[callbackLen].from,
                            onDescription: callbacks[callbackLen].description,
                            runFrom: optionInfo.from,
                            runDescription: optionInfo.description,
                            runParam: optionInfo.param
                        };
                        this.console(callbackInfo);
                    }
                }
                if (this.eventsWatch[eventName]) {
                    var watchCallbacks = this.eventsWatch[eventName], watchCallbackLen = watchCallbacks.length;
                    while (watchCallbackLen--) {
                        // 异步执行 防止阻塞
                        this.eventRun(watchCallbacks[watchCallbackLen], optionInfo.param);
                        // 同步执行
                        // watchCallbacks[watchCallbackLen].run(optionInfo.param);
                    }
                }
                return this;
            },
            eventRun: function (info, param) {
                setTimeout(function () {
                    info.run(param);
                }, 0);
            },
            console: function (info) {
                if (this.debug && window.console) {
                    window.console.group(info.eventName);
                    window.console.log('注册来源：', (info.onFrom ? info.onFrom : '未知来源'));
                    window.console.log('事件描述：', info.onDescription ? info.onDescription : '未知描述');
                    window.console.log('触发来源：', (info.runFrom ? info.runFrom : '未知来源'));
                    window.console.log('触发条件：', (info.runDescription ? info.runDescription : '未知条件'));
                    window.console.log('触发时间：', new Date().toLocaleString());
                    window.console.log('传递的参数：', info.runParam);
                    window.console.groupEnd();
                }
            }
        };
    }
    /**
     * 图片加载失败处理
     * @param {String} errSrc 默认图地址
     * @param {object} imgObj 图片dom元素
     */
    KfzTools.prototype.onErrorReplace = function (errSrc, imgObj, $imgObj) {
        if (this.parseURL(imgObj.src).path == errSrc) {
            imgObj.onerror = null;
            if ($imgObj)
                $imgObj.off('error');
        }
        imgObj.src = errSrc;
    };
    /**
     * 图片加载器 loadImage
     * @param { String } url 图片地址
     * @param { Function } callback 成功加载后回调
     */
    KfzTools.prototype.loadImage = function (url, callback) {
        var img = new Image();
        img.onload = function () {
            img.onload = null;
            callback && callback(img);
        };
        img.src = url;
    };
    /**
     * 解析URL
     * 该函数在没有传递参数的情况下默认解析的是当前URL
     * @param {string} url 完整的URL地址、若URL没有带上协议、端口号,那么函数解析的URL将默认在首部加上当前URL
     * @returns {object} 返回解析后的url对象
     * 解析后的url对象
     * source       {String}      当前URL
     * protocol     {String}      协议
     * host         {String}      域名
     * port         {String}      端口号
     * path         {String}      路径
     * file         {String}      文件名(路径的最后一部分)
     * query        {String}      查询部分(?后面的部分)
     * hash         {String}      哈希(#后面的部分)
     * relative     {String}      端口号后面的部分(路径+查询部分+哈希)
     * segments     {String[]}    路径解析
     * params       {Object}      解析后的查询部分(俗称URL参数)
     */
    KfzTools.prototype.parseURL = function (url) {
        url = url || location.href;
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/'),
            params: (function () {
                var ret = {}, seg = a.search.replace(/^\?/, '').split('&'), len = seg.length, i = 0, s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    // @ts-ignore
                    ret[s[0]] = s[1];
                }
                return ret;
            })()
        };
    };
    /**
     * cookies操作
     * 支持三种传参方式
     * @param {String} name cookies名称
     * @param {String} value cookies值
     * value === 'null'                                 该函数将删除名称为name的cookie
     * value === 'undefined'                            该函数将返回名称为name的cookie值
     * value != 'undefined' && value != 'null'          该函数将设置一个名为name的cookie
     * @param {Object} options cookies设置
     */
    KfzTools.prototype.cookies = function (name, value, options) {
        if (typeof value != 'undefined') {
            options || (options = {});
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                }
                else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        }
        else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var c_start = document.cookie.indexOf(name + "=");
                if (c_start != -1) {
                    c_start = c_start + name.length + 1;
                    var c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1)
                        c_end = document.cookie.length;
                    cookieValue = decodeURIComponent(document.cookie.substring(c_start, c_end));
                }
            }
            return cookieValue;
        }
    };
    /**
     * 浏览器信息
     * @returns {String} 返回浏览器信息
     * 返回值示例
     * "IE7" "IE8" "IE9" "IE10" "IE11" "Edge" "FF" "Opera" "Safari" "Chrome"
     */
    KfzTools.prototype.browserInfo = function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return "IE7";
            }
            else if (fIEVersion == 8) {
                return "IE8";
            }
            else if (fIEVersion == 9) {
                return "IE9";
            }
            else if (fIEVersion == 10) {
                return "IE10";
            }
            else if (fIEVersion == 11) {
                return "IE11";
            }
            else {
                return "0";
            } //IE版本过低
        }
        if (isFF) {
            return "FF";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isSafari) {
            return "Safari";
        }
        if (isChrome) {
            return "Chrome";
        }
        if (isEdge) {
            return "Edge";
        }
    };
    /**
     * 过滤emoj表情
     * @param objVal    过滤对象需要传的值
     * @returns {void|string|XML}   过滤后返回的值
     */
    KfzTools.prototype.receiverName = function (objVal) {
        var ranges = [
            '\ud83c[\udf00-\udfff]',
            '\ud83d[\udc00-\ude4f]',
            '\ud83d[\ude80-\udeff]'
        ];
        return objVal.replace(new RegExp(ranges.join('|'), 'g'), '?');
    };
    ;
    return KfzTools;
}());
window.KFZ = {
    tools: new KfzTools(),
    site: site,
    searchTools: new searchTools_1.SearchTools()
};
