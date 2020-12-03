///<<reference path="@types/jquery"/>
import "../css/searchHistorySug.css";
const CrossStorageClient = require("../../../utils/kfz-cross-storage-client");

declare var window: any;
declare var KFZ: any;
declare var $: any;

window.isinitOldSearchHistory = 0;

export class SearchHistorySug {
    version: string;
    storage: any;
    data: {
        isLogin: boolean,
        isMac: any,
        site: any,
        currentSugIndex: any,
        keyUpTimeIndex: any,
        maxSearchHistory: any,
        searchHistoryList: any
    }
    dom: {
        searchPut: any,
        searchForm: any,
        searchLabel: any,
        searchInputBox: any,
        searchHistoryBox: any
    }
    tpl: {
        searchHistoryTpl: any
    }

    constructor(option: any) {
        this.version = '1.0.0';
        // 本地LocalStorage存储
        this.storage = new CrossStorageClient('https://www.kongfz.com/search-suggest-history-iframe.html');
        // 搜索历史本地存储器
        this.data = {
            isLogin: true,
            isMac: /mac os/.test(navigator.userAgent.toLowerCase()),
            site: {},
            currentSugIndex: 0,
            keyUpTimeIndex: 0,
            maxSearchHistory: 100,               // 本地搜索历史最多存储数量
            searchHistoryList: []
        };
        this.dom = {
            searchPut: option.searchPut,
            searchForm: option.searchForm,
            searchLabel: option.searchLabel,
            searchInputBox: option.searchInputBox,
            searchHistoryBox: option.searchHistoryBox
        };
        this.tpl = {
            searchHistoryTpl: require('../dot/searchHistorySug.dot')
        };

        this.init();
    }

    init() {
        const that = this;
        that.data.site.search = location.protocol == 'https:' ? KFZ.site.searchs : KFZ.site.search;
        //Safari下本地搜索历史最多存储数量 为20个
        if (window.KFZ.tools.browserInfo() == 'Safari') {
            that.data.maxSearchHistory = 20;
        }

        if (!window.isinitOldSearchHistory) {
            that.initOldSearchHistory(function () {
                that.getSearchHistory();
            });
        }
        window.isinitOldSearchHistory++; //防止重复执行
        that.initEvent();
    }

    initEvent() {
        const that = this;
        that.setEvent({dom: that.dom.searchPut, event: 'searchPutFocus'});
        that.setEvent({dom: that.dom.searchPut, event: 'searchPutClick'});
        that.setEvent({dom: that.dom.searchPut, event: 'searchPutBlur'});
        that.setEvent({dom: that.dom.searchPut, event: 'searchPutKeyDown'});
        that.setEvent({dom: that.dom.searchPut, event: 'searchPutKeyUp'});
        that.setEvent({dom: $('body'), event: 'hideSearchHistoryBox'});
        that.setEvent({dom: that.dom.searchInputBox, event: 'stopPropagationHide'});
        that.setEvent({dom: that.dom.searchHistoryBox, event: 'searchHistoryClick'});
        that.setEvent({dom: that.dom.searchHistoryBox, event: 'searchSubClick'});
        that.setEvent({dom: that.dom.searchHistoryBox, event: 'editHistory'});
        that.setEvent({dom: that.dom.searchHistoryBox, event: 'editFinish'});
        that.setEvent({dom: that.dom.searchHistoryBox, event: 'clearSearchHistory'});
    }

    setEvent(option: any) {
        var that = this;
        switch (option.event) {
            case "searchPutFocus":
                option.dom.on('focus', function () {

                });
                break;
            case "searchPutClick":
                option.dom.on('click', function (event: Event) {
                    // @ts-ignore
                    that.searchPutFocus(this);
                });
                break;
            case "searchPutBlur":
                option.dom.on('blur', function (event: Event) {
                    // @ts-ignore
                    that.searchPutBlur(this);
                });
                break;
            case "searchPutKeyDown":
                option.dom.on('keydown', function (event: Event) {
                    that.searchPutKeyDown(event);
                });
                break;
            case "searchPutKeyUp":
                if (window.KFZ.tools.browserInfo() == 'IE8' || window.KFZ.tools.browserInfo() == 'IE9') {
                    option.dom.on('keyup', function (event: Event) {
                        // @ts-ignore
                        that.searchPutKeyUp(this, event);
                    });
                } else {
                    option.dom.on('input', function (event: Event) {
                        // @ts-ignore
                        that.searchPutInput(this, event);
                    });
                }
                break;
            case "hideSearchHistoryBox":
                option.dom.on('click', function () {
                    that.dom.searchHistoryBox.hide();
                });
                break;
            case "stopPropagationHide":
                option.dom.on('click', function (event: Event) {
                    event.stopPropagation();
                });
                break;
            case "searchHistoryClick":
                option.dom.delegate('.search-history-item', 'click', function () {
                    // @ts-ignore
                    that.searchHistoryClick(this);
                });
                break;
            case "searchSubClick":
                option.dom.delegate('.search-sug-item', 'click', function () {
                    // @ts-ignore
                    that.searchSubClick(this);
                });
                break;
            case "editHistory":
                option.dom.delegate('.icon_delete_btn', 'click', function () {
                    $('.icon_delete_box').addClass('editor');
                    $('.search-history-list').addClass('editor');
                });
                break;
            case "editFinish":
                option.dom.delegate('.finish_btn', 'click', function () {
                    $('.icon_delete_box').removeClass('editor');
                    $('.search-history-list').removeClass('editor');
                });
                break;
            case "clearSearchHistory":
                option.dom.delegate('.delete_all_btn', 'click', function () {
                    that.clearSearchHistory();
                });
                break;
        }
    }

    /* 将旧本地搜索历史数据格式更新为新的 */
    initOldSearchHistory(callback: any) {
        const that = this;
        that.getLocalSearchHistory(function (list: any) {
            if (!list) {
                that.storage.onConnect().then(function () {
                    that.storage.get('historyOfSearch').then(function (data: any) {
                        let list = data ? JSON.parse(data) : [],
                            searchHistoryList = [];
                        if (list.length > 0 && typeof list[0] == 'string') {
                            for (var i = 0; i < list.length; i++) {
                                searchHistoryList.push({
                                    keyword: list[i],
                                    search_time: 0,
                                    type: 0
                                });
                            }
                            that.setLocalSearchHistory(searchHistoryList);
                        }
                        callback && callback();
                    });
                });
            } else {
                callback && callback();
            }
        });
    }

    getSearchHistory(callback?: any) {
        const that = this;
        if (that.data.isLogin) {
            /* 已登录用户从接口拿数据 */
            $.ajax({
                type: 'GET',
                url: that.data.site.search + 'Pc/History/history',
                dataType: 'jsonp',
                success: function (res: any) {
                    if (res.status) {
                        callback && callback(res);
                        /* 判断是否需要同步 */
                        that.historyOfSearchSync();
                    } else {
                        if (res.message == 'unlogin') {
                            that.data.isLogin = false;
                        }
                    }
                },
                error: function () {

                }
            });
        } else {
            /* 未登录用户从LocalStorage拿数据 */
            that.getLocalSearchHistory(function (list: any) {
                let searchHistoryList = [];
                if (list.length == 0) return;
                that.data.searchHistoryList = list;
                for (let i = 0; i < list.length; i++) {
                    searchHistoryList.push(list[i].keyword);
                }
                callback && callback({data: {historyList: searchHistoryList}});
            });
        }
    }

    getSearchSug(callback: any) {
        const that = this,
            val = that.dom.searchPut.val();
        $.ajax({
            type: 'GET',
            url: that.data.site.search + 'Pc/History/relateHistory',
            dataType: 'jsonp',
            data: {query: val},
            success: function (res: any) {
                if (res.status) {
                    var value = val.replace(/(^\s*)/g, "");
                    if (that.data.isLogin) {
                        /* 已登录用户后端匹配关联的搜索历史 */
                        callback && callback(res, value);
                    } else {
                        /* 未登录用户从LocalStorage匹配关联的搜索历史*/
                        that.getLocalSearchHistory(function (list:any) {
                            var searchHistoryList = [];
                            if (list.length) {
                                that.data.searchHistoryList = list;
                                for (var i = 0; i < list.length; i++) {
                                    if (list[i].keyword != value && list[i].keyword.slice(0, value.length) == value && searchHistoryList.length < 3) {
                                        /* 搜索建议搜索历史去重 */
                                        if (res.data.suggestList.indexOf(list[i].keyword) != -1) {
                                            res.data.suggestList.splice(res.data.suggestList.indexOf(list[i].keyword), 1);
                                        }
                                        searchHistoryList.push(list[i].keyword);
                                    }
                                }
                                res.data.historyList = searchHistoryList;
                            }
                            callback && callback(res, value);
                        });
                    }
                }
            },
            error: function () {

            }
        });
    }

    deleteSearchHistory(dom: any) {
        var that = this,
            val = $(dom).find('.text').text();
        if (that.data.isLogin) {
            /* 已登录用户修改数据库数据 */
            $.ajax({
                type: 'GET',
                url: that.data.site.search + 'Pc/History/delHistory',
                dataType: 'jsonp',
                data: {query: val},
                success: function (res:any) {
                    if (res.status) {
                        $(dom).remove();
                        if ($('.search-history-item').length == 0) {
                            that.dom.searchHistoryBox.hide();
                        }
                    } else {
                        console.log('删除搜索历史失败');
                    }
                },
                error: function () {
                    console.log('删除搜索历史接口异常');
                }
            });
        } else {
            /* 未登录用户修改LocalStorage数据 */
            that.data.searchHistoryList.splice($(dom).index(), 1);
            $(dom).remove();
            that.setLocalSearchHistory(that.data.searchHistoryList);
            if ($('.search-history-item').length == 0) {
                that.dom.searchHistoryBox.hide();
            }
        }

    }

    getLocalSearchHistory(callback: any) {
        const that = this;
        //Safari下通过cookie获取搜素历史
        if (window.KFZ.tools.browserInfo() == 'Safari') {
            var list = window.KFZ.tools.cookies('searchHistoryList') ? JSON.parse(window.KFZ.tools.cookies('searchHistoryList')) : [];
            callback && callback(list);
        } else {
            that.storage.onConnect().then(function () {
                that.storage.get('searchHistoryList').then(function (data:any) {
                    var list = data ? JSON.parse(data) : [];
                    callback && callback(list);
                });
            });
        }
    }

    setLocalSearchHistory(list: any) {
        const that = this;
        /* 未登录用户修改LocalStorage数据 */
        that.data.searchHistoryList = list;
        /* 最大存储限制 */
        if (that.data.searchHistoryList.length > that.data.maxSearchHistory) {
            that.data.searchHistoryList.splice(that.data.maxSearchHistory);
        }
        //Safari下通过cookie存储搜素历史
        if (window.KFZ.tools.browserInfo() == 'Safari') {
            window.KFZ.tools.cookies('searchHistoryList', JSON.stringify(that.data.searchHistoryList), {
                domain: ".kongfz.com",
                expires: 30,
                path: "/"
            });
        } else {
            that.storage.onConnect().then(function () {
                that.storage.set('searchHistoryList', JSON.stringify(that.data.searchHistoryList));
            });
        }
    }

    getHistoryOfSearchSynchronized(callback: any) {
        const that = this;
        //Safari下通过cookie获取搜索已同步标记
        if (window.KFZ.tools.browserInfo() == 'Safari') {
            if (window.KFZ.tools.cookies('historyOfSearchSynchronized')) {
                var synchronized = window.KFZ.tools.cookies('historyOfSearchSynchronized');
                callback && callback(synchronized);
            }
        } else {
            that.storage.onConnect().then(function () {
                that.storage.get('historyOfSearchSynchronized').then(function (data:any) {
                    let synchronized: any = data;
                    callback && callback(synchronized);
                });
            });
        }
    }

    setHistoryOfSearchSynchronized(synchronized: any) {
        const that = this;
        //Safari下通过cookie存储
        if (window.KFZ.tools.browserInfo() == 'Safari') {
            window.KFZ.tools.cookies('historyOfSearchSynchronized', synchronized, {
                domain: ".kongfz.com",
                expires: 30,
                path: "/"
            });
        } else {
            that.storage.onConnect().then(function () {
                that.storage.set('historyOfSearchSynchronized', synchronized);
            });
        }
    }

    /* 同步本地搜索历史到服务器 */
    historyOfSearchSync() {
        const that = this;
        that.getHistoryOfSearchSynchronized(function (synchronized: any) {
            /* 判断已同步标识是否为 0 */
            if (!+synchronized) {
                that.getLocalSearchHistory(function (list: any) {
                    $.ajax({
                        type: 'GET',
                        url: that.data.site.search + 'Pc/History/uploadHistory',
                        dataType: 'jsonp',
                        data: {history: list},
                        success: function (res: any) {
                            if (res.status) {
                                that.setHistoryOfSearchSynchronized(1);
                            }
                        },
                        error: function () {

                        }
                    });
                });
            }
        });
    }

    searchPutFocus(dom: any) {
        const that = this,
            val: any = $.trim($(dom).val());
        that.dom.searchLabel.hide();
        $('.search-history-box-flag').hide();
        /* 内容为空才会显示搜索历史 */
        if (val == '') {
            that.renderSearchHistory();
        } else {
            that.renderSearchSug();
        }
    }

    searchPutBlur(dom: any) {
        const that = this,
            val = $(dom).val();
        if (val == '') {
            that.dom.searchLabel.show();
        }
    }

    searchPutKeyDown(event: any) {
        const that = this,
            val = that.dom.searchPut.val(),
            code = event.keyCode || event.charCode;
        that.dom.searchLabel.hide();
        /* 使用上下按钮选择模糊搜索词 */
        if (code == 38 || code == 40) {
            event.preventDefault();
            let searchWord: any = val,
                currText = '',
                items = that.dom.searchHistoryBox.find('.search-sug-item'),
                itemsLen = items.length;
            if (searchWord == '') return;
            if (itemsLen == 0) return;
            if (code == 38) {
                that.data.currentSugIndex--;
            } else if (code == 40) {
                that.data.currentSugIndex++;
            }
            if (that.data.currentSugIndex > itemsLen) {
                that.data.currentSugIndex = 1;
            }
            if (that.data.currentSugIndex < 1) {
                that.data.currentSugIndex = itemsLen;
            }
            items.removeClass('sug_hover');
            items.eq(that.data.currentSugIndex - 1).addClass('sug_hover');
            currText = $.trim(items.eq(that.data.currentSugIndex - 1).text());
            that.dom.searchPut.val(currText);
            return;
        }
        if (that.data.keyUpTimeIndex && val != '') {
            clearTimeout(that.data.keyUpTimeIndex);
            that.data.keyUpTimeIndex = 0;
        }
    }

    searchPutKeyUp(dom: any, event: any) {
        const that = this,
            code = event.keyCode || event.charCode;
        if (code == 13) {
            that.dom.searchHistoryBox.hide();
            return;
        }
        if (code == 38 || code == 40) return;
        that.data.keyUpTimeIndex = setTimeout(function () {
            const $input = $(dom),
                searchWord = $.trim($input.val());
            if (searchWord == '') {
                that.renderSearchHistory();
                return false;
            } else {
                that.renderSearchSug();
            }
        }, 200);
    }

    // 非ie8和ie9浏览器执行input事件
    searchPutInput(dom: any, event: any) {
        const that = this;
        that.data.keyUpTimeIndex = setTimeout(function () {
            var $input = $(dom),
                searchWord = $.trim($input.val());
            if (searchWord == '') {
                that.renderSearchHistory();
                return false;
            } else {
                that.renderSearchSug();
            }
        }, 200);
    }

    searchHistoryClick(dom: any) {
        const that = this,
            index = $(dom).index(),
            val = $.trim($(dom).find('.text').text());
        // 是否在编辑状态
        if ($('.search-history-list').hasClass('editor')) {
            that.deleteSearchHistory(dom);
        } else {
            KFZ.searchInfo.search_type = 'history';
            KFZ.searchInfo.search_pos = index;
            that.dom.searchLabel.hide();
            that.dom.searchPut.attr('orikey', that.dom.searchPut.val());
            that.dom.searchPut.val(val);
            that.dom.searchForm.submit();
        }
    }

    searchSubClick (dom:any){
        const that = this,
            index = $(dom).index(),
            val  = $.trim($(dom).text());
        KFZ.searchInfo.search_type = 'suggest';
        KFZ.searchInfo.search_pos  = index;
        that.dom.searchLabel.hide();
        that.dom.searchPut.attr('orikey',that.dom.searchPut.val());
        that.dom.searchPut.val(val);
        that.dom.searchForm.submit();
    }

    /* 清空搜索历史 */
    clearSearchHistory () {
        const that = this;
        if(that.data.isLogin){
            /* 已登录用户修改数据库数据 */
            $.ajax({
                type:'GET',
                url:that.data.site.search + 'Pc/History/clearHistory',
                dataType:'jsonp',
                success:function (res:any) {
                    if(res.status){
                        that.dom.searchHistoryBox.hide();
                    }
                },
                error:function () {

                }
            });
        }else{
            /* 未登录用户修改LocalStorage数据 */
            that.dom.searchHistoryBox.hide();
            that.setLocalSearchHistory([]);
        }
    }

    renderSearchHistory() {
        const that = this;
        that.getSearchHistory(function (res: any) {
            if (res.data.historyList.length == 0) return;
            that.dom.searchHistoryBox.html(that.tpl.searchHistoryTpl({data: res.data})).show();
        });
    }

    renderSearchSug() {
        const that = this;
        that.data.currentSugIndex = 0;
        that.getSearchSug(function (res: any, val: any) {
            if (res.data.historyList.length == 0 && res.data.suggestList.length == 0) {
                that.dom.searchHistoryBox.hide();
            } else {
                that.dom.searchHistoryBox.show();
            }
            const data: any = {data: res.data};
            /* 判断搜索建议是否包含关键字 */
            if (res.data.suggestList.length > 0 && res.data.suggestList[0].indexOf(val) != -1) {
                data.key = val;
            }
            that.dom.searchHistoryBox.html(that.tpl.searchHistoryTpl(data));
        });
    }

    //对外方法,添加本地历史记录
    addLocalSearchHistory (params:any) {
        const that = this;
        /* 未登录用户修改LocalStorage数据 */
        if(!that.data.isLogin){
            /* 去重 */
            if(that.getIndexOf(that.data.searchHistoryList,params) != -1){
                that.data.searchHistoryList.splice(that.getIndexOf(that.data.searchHistoryList,params),1);
            }
            //Safari下通过每个历史记录最多存储长度为20
            if(window.KFZ.tools.browserInfo() == 'Safari'){
                params.keyword = params.keyword.slice(0,20);
            }
            that.data.searchHistoryList.unshift(params);
            /* 最大存储限制 */
            if(that.data.searchHistoryList.length > that.data.maxSearchHistory){
                that.data.searchHistoryList.splice(that.data.maxSearchHistory);
            }
            //Safari下通过cookie存储搜素历史
            if(window.KFZ.tools.browserInfo() == 'Safari'){
                window.KFZ.tools.cookies('searchHistoryList',JSON.stringify(that.data.searchHistoryList),{domain:".kongfz.com",expires:30,path:"/"});
            }else{
                that.storage.onConnect().then(function () {
                    that.storage.set('searchHistoryList', JSON.stringify(that.data.searchHistoryList));
                });
            }
            /* 添加本地搜索历史后，更新已同步标记 */
            that.setHistoryOfSearchSynchronized(0);
        }
    }

    /* 获取搜索历史在LocalStorage列表中的index值 */
    getIndexOf (obj:any,item:any) {
        for(let i = 0;i < obj.length;i++){
            if (obj[i].keyword == item.keyword) {
                return i;
            }
        }
        return -1;
    }
}
