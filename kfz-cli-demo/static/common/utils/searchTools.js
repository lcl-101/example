"use strict";
/**
 * Created by ChenHui on 2017/5/13.
 * 搜索公用工具 构造器
 * 实例化
 * var search = new window.KFZ.searchTools();
 *
 *
 * 属性
 * params                   { object  }                    搜索参数
 * paramStr                 { object  }                    参数字符串 normal 正常参数字符串  code 编码后的字符串
 * orderParams              { array   }                    用户操作顺序参数
 * encodeArr                { array   }                    需要编码的参数集合
 * paramDictionary          { object  }                    param  =>  code   对应关系
 * ConfDictionary           { array   }                    [{param: 'catnum', code: 'cat_'}] code 不能以a-f开头
 * codeRegOrder             { object  }                    code  解析顺序
 *
 *
 * 方法
 *
 * setConfDictionary 设置新配置的对应关系
 * @params      {object} dictionary    要设置的对应关系 形如: {param : 'catnum', code : 'cat_'}
 * @return      this
 *
 * setCodeDictionary 设置搜索参数对应关系
 * @params      {object} dictionary    要设置的对应关系 形如: {param : 'catnum', code : 'cat_'}
 * @return      this
 *
 * setParam 设置搜索参数 并同步到 (搜索串 : 'paramStr') 属性、 (搜索参数对象 : 'params') 属性、 (用户操作顺序 : 'orderParams') 属性
 * @params      {object} param       要设置的参数对象 形如: {catnum : 1}
 * @return      this
 *
 * delParam 删除搜索参数 并同步到 (搜索串 : 'paramStr') 属性、 (搜索参数对象 : 'params') 属性、 (用户操作顺序 : 'orderParams') 属性
 * @params      {sting} paramName     要删除的参数名称 形如: 'catnum'
 * @return      this
 *
 * setParamStr 设置搜索串 并同步到 (搜索串 : 'paramStr') 属性、 (搜索参数对象 : 'params') 属性、 (用户操作顺序 : 'orderParams') 属性
 * @params      {string} paramStr     搜索串
 * @params      {string} type         搜索串的类型  code 形如: 'cat_1'         normal: 形如: 'catnum=1'
 * @return      this
 *
 * getParam 获取参数对象 并解析
 * @params      {string} paramName    要获取的参数对象的名称
 * @return      {string|array}        参数对象
 *
 * getParams 获取参数对象集合 并解析
 * @return      {object}            参数对象
 *
 * paramSwitch
 * 描述: 参数 => code 转换器
 * 转换规则: 匹配 paramDictionary
 * @param       {string} param      要转换的参数
 * @return      {string}            code
 *
 * codeSwitch
 * 描述: code => 参数 转换器
 * 转换规则: 匹配 codeDictionary
 * @param       {string} code       要转换的code
 * @return      {object}            参数对象 形如: {paramName : 'catnum', reg : ''}
 *
 * paramToCodeStr
 * 描述: 将单个参数对象转换为code形式
 * 转换规则: {catnum : 1} => 'cat_1'
 * @param       {object} param       要转换的参数对象 形如: {catnum : 1}
 * @return      {string}             code形式参数串 形如: 'cat_1'
 *
 * encoded
 * 描述: 按 (用户操作顺序 : orderParams) 执行编码操作 并同步到 paramStr 属性
 * @return      this
 *
 * updateParams 更新 (搜索参数对象 : params) 属性
 * @params      {object} param       要更新的参数名称 形如: {catnum : 1}
 * @return      this
 *
 * delParams 删除 (搜索参数对象 : params) 属性
 * @params      {string} paramName   要删除的参数对象 形如: 'catnum'
 * @return      this
 *
 * uniqueOrderParam 对 (用户操作顺序 : orderParams) 进行去重
 * @params      {object} param       要检测的参数对象 形如: {catnum : 1}
 * @return      this
 *
 * updateOrderParam 更新 (用户操作顺序 : orderParams) 属性
 * @params      {object} param       要更新的参数对象 形如: {catnum : 1}
 * @return      this
 *
 * delOrderParam 删除 (用户操作顺序 : orderParams) 属性
 * @params      {string} paramName    要删除的参数名称 形如: 'catnum'
 * @return      this
 *
 * encharCode 对参数对象进行 中文 => Unicode 编码
 * @params      {object} param       要编码的参数对象 形如: {catnum : 1}
 * @return      {object}             参数对象
 *
 * paramStrToNormal 将code编码转换为正常参数形式
 * 转换规则: 将参数对象的参数名称替换为 code  (匹配 codeDictionary)
 * @return      this
 *
 * decode 将code解码为正常参数形式并执行 setParam
 * @params      {string} type         搜索串的类型 若为code则需要进行paramStrToNormal 若为normal则不需要进行paramStrToNormal
 * @return      this
 *
 * unicodeToChar 将 Unicode 编码 转为 汉字
 * @params      {string} unicode      Unicode码 形如: 'k31' => '1' 'k31k32' => '12'
 * @return      {string}              转换后的字符串
 *
 * charToUnicode 将 汉字 解码转为 Unicode
 * @params      {string} str          汉字 形如: '1' => 'k31' '12' => 'k31k32'
 * @return      {string}              转换后的 Unicode
 *
 * splitParam 根据'h'连接符来拆分参数对象 并进行 unicodeToChar
 * @params      {object} param        要拆分的参数对象 形如: {author : '24382437277805089hk5929k6d25k5e02k653fk5e9ck79d8k4e66k5904'}
 * @return      {object} param        拆分后的参数对象 形如: '24382437277805089' && '天津市政府秘书处'
 *
 * parserParam 解析参数对象 并进行 splitParam
 * @params      {object} param        要解析的参数对象 形如: {author : '24382437277805089hk5929k6d25k5e02k653fk5e9ck79d8k4e66k5904'}
 * @return      {object} param        解析后的参数对象 形如: '24382437277805089' && '天津市政府秘书处'
 *
 * cookies操作
 * 支持三种传参方式
 * @param {String} name cookies名称
 * @param {String} value cookies值
 * value === 'null'                                 该函数将删除名称为name的cookie
 * value === 'undefined'                            该函数将返回名称为name的cookie值
 * value != 'undefined' && value != 'null'          该函数将设置一个名为name的cookie
 * @param {Object} options cookies设置
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchTools = void 0;
var SearchTools = /** @class */ (function () {
    function SearchTools() {
        this.params = {};
        this.paramStr = { normal: '', code: '' };
        this.encodeArr = ['shopname', 'itemname', 'key', 'author', 'press', 'location', 'exkey'];
        this.orderParams = [];
        this.paramDictionary = {
            'superdebug': 'debug_',
            'mycatid': 'myc_',
            'type': 'type_',
            'ajaxdata': 'ajaxdata_',
            'showtype': 'st_',
            'addtime': 'g',
            'tag': 'tag_',
            'binding': 'bind_',
            'catnum': 'cat_',
            'shopid': 'sid_',
            'sibu': 'sibu_',
            'shopname': 'r',
            'select': 'sel',
            'itemname': 's',
            'status': 'y',
            'key': 'z',
            'price': 't',
            'quality': 'qua_',
            'quaselect': 'qsel_',
            'author': 'l',
            'press': 'm',
            'pubdate': 'pub_',
            'years': 'n',
            'location': 'u',
            'vcat': 'vc_',
            'order': 'v',
            'pagenum': 'w',
            'xinshu': 'xs',
            'exkey': 'x',
            'special1': 'o',
            'special2': 'p',
            'special3': 'q',
            'getmore': 'more_',
            'exact': 'i_',
            'itemfilter': 'if_',
            'perfect': 'iq_',
            'isfuzzy': 'j' // 是否为模糊搜索
        };
        this.codeRegOrder = [
            'debug_',
            'myc_',
            'ajaxdata_',
            'type_',
            'bind_',
            'cat_',
            'tag_',
            'g',
            't',
            'sid_',
            'sibu_',
            'st_',
            'sel',
            'pub_',
            'p',
            'more_',
            'm',
            'o',
            'qua_',
            'qsel_',
            'q',
            'if_',
            'iq_',
            'i_',
            'r',
            's',
            'y',
            'z',
            'l',
            'n',
            'u',
            'vc_',
            'v',
            'w',
            'xs',
            'x',
            'j'
        ];
        this.confDictionary = [
        // {param : 'cx', code : 'ca'}示例
        ];
        this.setConfDictionary();
    }
    SearchTools.prototype.setConfDictionary = function () {
        var that = this;
        $.each(this.confDictionary, function (index, item) {
            that.setCodeDictionary(item);
        });
        return this;
    };
    SearchTools.prototype.setCodeDictionary = function (dictionary) {
        if (dictionary.param && dictionary.code) {
            var insertIndex_1 = '';
            if (this.paramDictionary[dictionary.param] != undefined) {
                return this;
            }
            this.paramDictionary[dictionary.param] = dictionary.code;
            $.each(this.codeRegOrder, function (index, item) {
                if (dictionary.code == item) {
                    return false;
                }
                if (dictionary.code.length < item.length && item.indexOf(dictionary.code) != -1) {
                    // @ts-ignore
                    insertIndex_1 = index + 1;
                }
            });
            if (insertIndex_1 !== '') {
                this.codeRegOrder.splice(insertIndex_1, 0, dictionary.code);
            }
            else {
                this.codeRegOrder.push(dictionary.code);
            }
        }
        return this;
    };
    SearchTools.prototype.setParam = function (param, type) {
        this.updateParams(param);
        this.updateOrderParam(param, type);
        this.encoded();
        return this;
    };
    SearchTools.prototype.delParam = function (paramName) {
        this.delParams(paramName);
        this.delOrderParam(paramName);
        this.encoded();
        return this;
    };
    SearchTools.prototype.setParamStr = function (paramStr, type) {
        this.paramStr[type] = paramStr;
        this.decode(type);
        return this;
    };
    SearchTools.prototype.getParam = function (paramName) {
        var param = this.params[paramName];
        if (param) {
            param = this.parserParam(param);
        }
        return param;
    };
    SearchTools.prototype.getParams = function () {
        var that = this, params = $.extend(true, {}, this.params);
        $.each(params, function (paramName, paramInfo) {
            params[paramName] = that.getParam(paramName);
        });
        return params;
    };
    SearchTools.prototype.paramSwitch = function (param) {
        return this.paramDictionary[param];
    };
    SearchTools.prototype.codeSwitch = function (code) {
        var param = '';
        $.each(this.paramDictionary, function (paramName, paramValue) {
            if (code == paramValue) {
                param = paramName;
                return false;
            }
        });
        return param;
    };
    SearchTools.prototype.paramToCodeStr = function (param, type) {
        var that = this, paramCode = type == 'code' ? param : this.encharCode(param), CodeStr = '';
        $.each(paramCode, function (key, value) {
            CodeStr = that.paramSwitch(key) + value;
        });
        return CodeStr;
    };
    SearchTools.prototype.encoded = function () {
        var paramStrArr = [], codeStrArr = [];
        $.each(this.orderParams, function (index, item) {
            paramStrArr.push(item.paramStr);
            codeStrArr.push(item.codeStr);
        });
        this.paramStr = {
            normal: '?' + paramStrArr.join('&'),
            code: codeStrArr.join('')
        };
        return this;
    };
    SearchTools.prototype.updateParams = function (param) {
        $.extend(this.params, param);
        return this;
    };
    SearchTools.prototype.delParams = function (paramName) {
        this.params[paramName] = null;
        delete this.params[paramName];
        return this;
    };
    SearchTools.prototype.uniqueOrderParam = function (param) {
        var spliceIndex = '';
        $.each(this.orderParams, function (index, item) {
            $.each(param, function (key) {
                if (item.param[key] != undefined) {
                    spliceIndex = index;
                    return false;
                }
            });
            if (spliceIndex) {
                return false;
            }
        });
        if (spliceIndex !== '') {
            this.orderParams.splice(spliceIndex, 1);
        }
        return this;
    };
    SearchTools.prototype.updateOrderParam = function (param, type) {
        this.uniqueOrderParam(param);
        var orderParamInfo = {
            param: param,
            paramStr: '',
            codeStr: this.paramToCodeStr($.extend(true, {}, param), type)
        };
        $.each(param, function (name, value) {
            orderParamInfo.paramStr = name + "=" + value;
        });
        this.orderParams.push(orderParamInfo);
        return this;
    };
    SearchTools.prototype.delOrderParam = function (paramName) {
        var paramIndex = '';
        $.each(this.orderParams, function (index, item) {
            if (item.param[paramName]) {
                paramIndex = index;
                return false;
            }
        });
        if (paramIndex !== '') {
            this.orderParams.splice(paramIndex, 1);
        }
        return this;
    };
    SearchTools.prototype.encharCode = function (param) {
        var that = this, reg = /[\u4e00-\u9fa5]/gm;
        $.each(param, function (paramName, paramValue) {
            $.each(that.encodeArr, function (index, item) {
                if (paramName == item) {
                    param[paramName] = that.charToUnicode(paramValue);
                }
            });
        });
        return param;
    };
    SearchTools.prototype.paramStrToNormal = function () {
        var that = this, code = this.paramStr.code, codeRegOrder = this.codeRegOrder, codeReg = codeRegOrder.join('|'), codeArr = [], normal = '';
        var reg = new RegExp(codeReg, 'gm');
        codeArr = code.replace(reg, function (word) {
            return ',' + word;
        }).substring(1).split(',');
        $.each(codeArr, function (index, item) {
            normal += item.replace(reg, function (word) {
                var replaceWord = that.codeSwitch(word);
                if (replaceWord) {
                    return '&' + replaceWord + '=';
                }
                else {
                    return word;
                }
            });
        });
        that.paramStr.normal = '?' + normal.substring(1);
        return this;
    };
    SearchTools.prototype.decode = function (type) {
        if (type === 'code') {
            this.paramStrToNormal();
        }
        var that = this, paramStr = this.paramStr.normal.substring(1), paramList = paramStr.split("&");
        $.each(paramList, function (index, item) {
            var paramInfo = {}, splitIndex = item.indexOf('=');
            if (splitIndex != -1) {
                var paramName = item.substring(0, splitIndex), paramValue = item.substring(splitIndex + 1);
                // @ts-ignore
                paramInfo[paramName] = paramValue;
                that.setParam(paramInfo, type);
            }
        });
        return this;
    };
    SearchTools.prototype.unicodeToChar = function (unicode) {
        if (typeof unicode === 'undefined')
            return '';
        var str = '', arr = unicode.split('k'), i = 0, len = arr.length;
        for (; i < len; i++) {
            var oneUnicode = arr[i], oneStr = void 0;
            if (!oneUnicode)
                continue;
            oneUnicode = parseInt(oneUnicode, 16).toString(10);
            oneStr = String.fromCharCode(oneUnicode);
            str += oneStr;
        }
        return str;
    };
    SearchTools.prototype.charToUnicode = function (str) {
        if (!str)
            return '';
        var unicode = '', i = 0, len = (str = '' + str).length;
        for (; i < len; i++) {
            unicode += 'k' + str.charCodeAt(i).toString(16).toLowerCase();
        }
        return unicode;
    };
    SearchTools.prototype.splitParam = function (param) {
        var that = this, paramConnector = param.split('h'), params = [];
        $.each(paramConnector, function (index, item) {
            var paramInfo = {
                code: item,
                param: item
            };
            if (item.indexOf('k') != -1) {
                paramInfo.param = that.unicodeToChar(item);
            }
            params.push(paramInfo);
        });
        return params;
    };
    SearchTools.prototype.parserParam = function (param) {
        param = param.toString();
        var hasConnector = param.indexOf('h');
        if (hasConnector != -1) {
            var paramInfo = this.splitParam(param);
            return paramInfo;
        }
        else if (param.indexOf('k') != -1) {
            return this.unicodeToChar(param);
        }
        return param;
    };
    SearchTools.prototype.cookies = function (name, value, options) {
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
    SearchTools.prototype.addSearchHistory = function (domain, text) {
        var name = 'history_' + domain, list = this.getSearchHistory(domain) || [];
        if (list.length <= 15) {
            for (var i = 0; i < list.length; i++) {
                if (text == list[i]) {
                    list.splice(i, 1);
                    break;
                }
            }
            list.unshift(text);
        }
        else {
            list.pop();
            list.unshift(text);
        }
        text = JSON.stringify(list);
        if (typeof window.localStorage == 'undefined') {
            this.cookies(name, text, {
                domain: domain
            });
        }
        else {
            window.localStorage.setItem(name, text);
        }
        return this;
    };
    SearchTools.prototype.getSearchHistory = function (domain) {
        var name = 'history_' + domain, list;
        if (typeof window.localStorage == 'undefined') {
            // @ts-ignore
            list = this.cookies(name) || "[]";
        }
        else {
            list = window.localStorage.getItem(name) || "[]";
        }
        return JSON.parse(list);
    };
    SearchTools.prototype.sug = function (params, sucFn) {
        $.ajax({
            url: window.KFZ.site.searchs + 'sug/suggest_server.jsp',
            type: "GET",
            cache: false,
            dataType: "script",
            data: params,
            success: function () {
                sucFn();
            }
        });
    };
    return SearchTools;
}());
exports.SearchTools = SearchTools;
