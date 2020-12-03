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

declare var window: any;

export class SearchTools {
    public params: any;
    public paramStr: any;
    public encodeArr: any;
    public orderParams: any;
    public paramDictionary: any;
    public codeRegOrder: any;
    public confDictionary: any;
    constructor() {
        this.params = {};
        this.paramStr = { normal : '', code : '' };
        this.encodeArr = ['shopname','itemname','key','author','press','location','exkey'];
        this.orderParams = [];
        this.paramDictionary = {
            'superdebug':    'debug_',                          // 超级debug
            'mycatid'   :    'myc_',                            // 本店分类
            'type'      :    'type_',                           // 异步接口标识 1：接口
            'ajaxdata'  :    'ajaxdata_',                       // 异步接口数据类型标识 1：列表 2：筛选项 3：ISBN
            'showtype'  :    'st_',                             // 显示方式 图文||文字
            'addtime'   :    'g',                               // 上书时间
            'tag'       :    'tag_',                            // 标签
            'binding'   :    'bind_',                           // 装订
            'catnum'    :    'cat_',                            // 分类
            'shopid'    :    'sid_',                            // 店铺ID
            'sibu'      :    'sibu_',                           // 四部分类
            'shopname'  :    'r',                               // 店铺名称
            'select'    :    'sel',                             // 搜索框选择项
            'itemname'  :    's',                               // 商品名称
            'status'    :    'y',                               // 已售or未售   1已售 2全部 默认未售
            'key'       :    'z',                               // 搜索关键字
            'price'     :    't',                               // 价格
            'quality'   :    'qua_',                            // 品相
            'quaselect' :    'qsel_',                           // 品相选择类别 2 => 古|旧|二手
            'author'    :    'l',                               // 作者
            'press'     :    'm',                               // 出版社
            'pubdate'   :    'pub_',                            // 出版时间
            'years'     :    'n',                               // 年代
            'location'  :    'u',                               // 地区
            'vcat'      :    'vc_',                             // 虚拟分类
            'order'     :    'v',                               // 排序        1价格升  2价格降  3出版时间升  4出版时间降  5上架时间升  6上架时间降  7更新时间升  8更新时间降  9店铺等级升  10店铺等级降
            'pagenum'   :    'w',                               // 当前页码
            'xinshu'    :    'xs',                              // 新书
            'exkey'     :    'x',                               // 排除关键字
            'special1'  :    'o',                               // 特殊项1
            'special2'  :    'p',                               // 特殊项2
            'special3'  :    'q',                               // 特殊项3
            'getmore'   :    'more_',                           // 获取更多结果
            'exact'     :    'i_',                              // 是否为精确搜索
            'itemfilter':    'if_',                             // 是否显示在结果中筛选
            'perfect'   :    'iq_',                             // 是否为完全匹配
            'isfuzzy'   :    'j'                                // 是否为模糊搜索
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
    setConfDictionary (){
        const that = this;
        $.each(this.confDictionary, function(index, item){
            that.setCodeDictionary(item);
        });
        return this;
    }
    setCodeDictionary ( dictionary:any ){
        if(dictionary.param && dictionary.code){
            let insertIndex = '';
            if(this.paramDictionary[dictionary.param] != undefined){
                return this;
            }
            this.paramDictionary[dictionary.param] = dictionary.code;
            $.each(this.codeRegOrder, function(index, item){
                if(dictionary.code == item){
                    return false;
                }
                if(dictionary.code.length < item.length && item.indexOf(dictionary.code) != -1){
                    // @ts-ignore
                    insertIndex = index + 1;
                }
            });
            if(insertIndex !== ''){
                this.codeRegOrder.splice(insertIndex,0,dictionary.code);
            }else{
                this.codeRegOrder.push(dictionary.code);
            }
        }
        return this;
    }
    setParam ( param:any, type:any ){
        this.updateParams(param);
        this.updateOrderParam(param, type);
        this.encoded();
        return this;
    }
    delParam ( paramName:any ){
        this.delParams( paramName );
        this.delOrderParam( paramName );
        this.encoded();
        return this;
    }
    setParamStr ( paramStr:any, type:any ){
        this.paramStr[type] = paramStr;
        this.decode(type);
        return this;
    }
    getParam ( paramName:any ){
        var param = this.params[paramName];
        if(param){
            param = this.parserParam( param );
        }
        return param;
    }
    getParams (){
        var that = this,
            params = $.extend(true, {}, this.params);
        $.each(params, function(paramName, paramInfo){
            params[paramName] = that.getParam(paramName);
        });
        return params;
    }
    paramSwitch ( param:any ){
        return this.paramDictionary[param];
    }
    codeSwitch ( code:any ){
        let param: any = '';
        $.each(this.paramDictionary, function(paramName, paramValue){
            if(code == paramValue){
                param = paramName;
                return false;
            }
        });
        return param;
    }
    paramToCodeStr ( param:any, type:any ){
        let that = this,
            paramCode = type=='code'?param:this.encharCode( param ),
            CodeStr = '';
        $.each(paramCode, function( key, value ){
            CodeStr = that.paramSwitch(key) + value;
        });
        return CodeStr;
    }
    encoded (){
        let paramStrArr: any[] = [],
            codeStrArr: any[] = [];
        $.each( this.orderParams, function( index, item ){
            paramStrArr.push(item.paramStr);
            codeStrArr.push(item.codeStr);
        });
        this.paramStr = {
            normal : '?' + paramStrArr.join('&'),
            code : codeStrArr.join('')
        };
        return this;
    }
    updateParams ( param:any ){
        $.extend( this.params, param );
        return this;
    }
    delParams ( paramName:any ){
        this.params[paramName] = null;
        delete this.params[paramName];
        return this;
    }
    uniqueOrderParam ( param:any ){
        let spliceIndex: any = '';
        $.each(this.orderParams,function(index, item){
            $.each(param,function(key){
                if(item.param[key] != undefined){
                    spliceIndex = index;
                    return false;
                }
            });
            if(spliceIndex){
                return false;
            }
        });
        if(spliceIndex !== ''){
            this.orderParams.splice(spliceIndex, 1);
        }
        return this;
    }
    updateOrderParam ( param:any, type:any ){
        this.uniqueOrderParam(param);
        let orderParamInfo = {
            param : param,
            paramStr : '',
            codeStr : this.paramToCodeStr($.extend(true,{},param), type)
        };
        $.each(param,function(name:any,value:any){
            orderParamInfo.paramStr = name + "=" + value;
        });
        this.orderParams.push( orderParamInfo );
        return this;
    }
    delOrderParam ( paramName:any ){
        let paramIndex: any = '';
        $.each(this.orderParams, function(index, item){
            if(item.param[paramName]){
                paramIndex = index;
                return false;
            }
        });
        if(paramIndex !== ''){
            this.orderParams.splice(paramIndex, 1);
        }
        return this;
    }
    encharCode ( param:any ){
        let  that = this,
            reg = /[\u4e00-\u9fa5]/gm;
        $.each(param, function(paramName, paramValue){
            $.each(that.encodeArr, function(index, item){
                if(paramName == item){
                    param[paramName] = that.charToUnicode(paramValue);
                }
            });
        });
        return param;
    }
    paramStrToNormal (){
        let that = this,
            code = this.paramStr.code,
            codeRegOrder = this.codeRegOrder,
            codeReg = codeRegOrder.join('|'),
            codeArr = [],
            normal = '';
        let reg = new RegExp(codeReg, 'gm');
        codeArr = code.replace(reg, function( word:any){
            return ',' + word;
        }).substring(1).split(',');
        $.each(codeArr,function(index, item){
            normal += item.replace(reg, function( word:any ){
                var replaceWord = that.codeSwitch(word);
                if(replaceWord){
                    return '&' + replaceWord + '=';
                }else{
                    return word;
                }
            });
        });
        that.paramStr.normal = '?' + normal.substring(1);
        return this;
    }
    decode ( type:any ){
        if(type === 'code'){
            this.paramStrToNormal();
        }
        let that = this,
            paramStr = this.paramStr.normal.substring(1),
            paramList = paramStr.split("&");
        $.each(paramList, function( index, item ){
            let paramInfo = {},
                splitIndex = item.indexOf('=');
            if( splitIndex != -1 ){
                let paramName = item.substring(0, splitIndex),
                    paramValue = item.substring(splitIndex + 1);
                // @ts-ignore
                paramInfo[paramName] = paramValue;
                that.setParam(paramInfo, type);
            }
        });
        return this;
    }
    unicodeToChar (unicode:any){
        if (typeof unicode === 'undefined') return '';
        let str = '', arr = unicode.split('k'), i = 0, len = arr.length;
        for (; i < len; i ++) {
            let oneUnicode = arr[i], oneStr;
            if (!oneUnicode) continue;
            oneUnicode = parseInt(oneUnicode, 16).toString(10);
            oneStr = String.fromCharCode(oneUnicode);
            str += oneStr;
        }
        return str;
    }
    charToUnicode (str:any){
        if (!str) return '';
        let unicode = '', i = 0, len = (str = '' + str).length;
        for (; i < len; i ++) {
            unicode += 'k' + str.charCodeAt(i).toString(16).toLowerCase();
        }
        return unicode;
    }
    splitParam ( param:any ){
        let that = this,
            paramConnector = param.split('h'),
            params: any = [];
        $.each(paramConnector, function( index, item ){
            var paramInfo = {
                code: item,
                param: item
            };
            if(item.indexOf('k') != -1){
                paramInfo.param = that.unicodeToChar(item);
            }
            params.push(paramInfo);
        });
        return params;
    }
    parserParam ( param:any ){
        param = param.toString();
        const hasConnector = param.indexOf('h');
        if(hasConnector != -1){
            let paramInfo:any = this.splitParam( param );
            return paramInfo;
        }else if(param.indexOf('k') != -1){
            return this.unicodeToChar(param);
        }
        return param;
    }
    cookies (name:any, value:any, options:any) {
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
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var c_start = document.cookie.indexOf(name + "=");
                if (c_start != -1) {
                    c_start = c_start + name.length + 1;
                    var c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) c_end = document.cookie.length;
                    cookieValue = decodeURIComponent(document.cookie.substring(c_start, c_end));
                }
            }
            return cookieValue;
        }
    }
    addSearchHistory ( domain:any, text:any ){
        let name = 'history_' + domain,
            list = this.getSearchHistory(domain) || [];
        if(list.length <= 15){
            for(var i = 0;i< list.length;i++){
                if(text == list[i]){
                    list.splice(i,1);
                    break;
                }
            }
            list.unshift(text);
        }else{
            list.pop();
            list.unshift(text);
        }
        text = JSON.stringify(list);
        if(typeof window.localStorage == 'undefined'){
            this.cookies(name,text,{
                domain : domain
            });
        }else{
            window.localStorage.setItem(name,text);
        }
        return this;
    }
    getSearchHistory ( domain:any ){
        var name = 'history_' + domain,list;
        if(typeof window.localStorage == 'undefined'){
            // @ts-ignore
            list = this.cookies(name)||"[]";
        }else{
            list = window.localStorage.getItem(name)||"[]";
        }
        return JSON.parse(list);
    }
    sug (params:any, sucFn:any) {
        $.ajax({
            url : window.KFZ.site.searchs + 'sug/suggest_server.jsp',
            type: "GET",
            cache: false,
            dataType: "script",
            data : params,
            success : function(){
                sucFn();
            }
        });
    }
}