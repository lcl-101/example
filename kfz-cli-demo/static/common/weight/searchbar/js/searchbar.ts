import "../css/searchbar.css";
import { SearchHistorySug } from "../../searchHistorySug/js/searchHistorySug";

declare var window: any;
declare var KFZ: any;

window.searchHistorySug = SearchHistorySug;

class Searchbar {
    dom: any;
    data: {
        pageType: any,
        search_type: string,
        search_pos: any,
        search_key: any,
        searcchHistoryType: any,
        searchInfo: any,
        searchPlaceholder: any
    }
    tpl: {
        searchSugTpl: any,
        historyOfSearchTpl: any
    }
    searchHistorySug: any;
    searchTool: any;

    constructor() {
        this.dom = {
            searchForm: $('#searchForm'),
            searchInputBox: $('.search-input-box'),
            searchPut: $('input[name=searchWord]'),
            searchLabel: $('.search-label'),
            hotwordsItem: $('.hotwords-item'),
            searchHistoryBox: $('#searchHistoryBox')
        }
        this.data = {
            pageType: '',
            search_type: 'active',    // 触发搜索的type: 'active','history','suggest','hot'
            search_pos: '',           // 搜索历史和 搜索建议的 index 值
            search_key: '',           // 搜索关键字
            searcchHistoryType: {
                default: 0,
                isbn: 1,
                shop: 2,
                pm: 3,
                store: 4,
                storeItem: 5
            },
            searchInfo: {
                searchType: 'shop',
                status: '0',
                shop: ['在售', '已售'],
                pm: ['在拍', '已结束']
            },
            searchPlaceholder: {
                shop: '商品名称、作者、出版社、ISBN',
                pm: '拍品名称',
                pmended: '拍品名称、拍品作者、拍主昵称'
            }
        }
        this.tpl = {
            searchSugTpl: $("#search-sug-tpl").html(),
            historyOfSearchTpl: $("#history-of-search-tpl").html()
        }
        // 搜索历史+搜索建议组件
        this.searchHistorySug = '';
        // 搜索解析工具
        this.searchTool = window.KFZ.searchTools;
        /**
         * 初始化方法
         */
        this.init();
    }

    init() {
        const that = this;
        const pageType = $('.header-search-box').attr('pageType');
        that.data.pageType = pageType || 'page';
        KFZ.searchInfo = {};

        /* 实例化搜索历史组件 */
        window.searchHistorySugTools = new window.searchHistorySug({
            searchHistoryBox:that.dom.searchHistoryBox,
            searchInputBox:that.dom.searchInputBox,
            searchForm:that.dom.searchForm,
            searchLabel:that.dom.searchLabel,
            searchPut:that.dom.searchPut
        });
        window.searchHistorySugTools.init();

        that.initEvent();
        if (pageType == 'search' || pageType == 'isbnsearch') that.initSearchKey();
        if (pageType == 'index' || pageType == 'search' || pageType == 'shop') {
            that.dom.searchPut.focus();
        }
    }

    /* 如果是搜索结果页，初始化搜索词 */
    initSearchKey() {
        var that = this,
            urlParam = that.getUrlParam();
        var key = decodeURIComponent(urlParam.key || '');
        if (key != '') {
            that.dom.searchLabel.hide();
            that.dom.searchPut.val(key);
        }
    }

    initEvent() {
        var that = this;
        that.setEvent({dom: $('.search-type .item-type'), event: 'searchTypeTab'});
        that.setEvent({dom: $('.search-status-box .status-other'), event: 'searchStatusTab'});
        that.setEvent({dom: $('.search-status-box'), event: 'searchStatusMouseOver'});
        that.setEvent({dom: $('.search-status-box'), event: 'searchStatusMouseOut'});
        that.setEvent({dom: that.dom.hotwordsItem, event: 'hotwordsItem'});
        that.setEvent({dom: $('#searchBtn'), event: 'searchSubmit'});
        that.setEvent({dom: $('#searchForm'), event: 'searchFormSubmit'});
        that.setEvent({dom: $('.adv-search-btn'), event: 'advSearch'});
    }

    setEvent(option: any) {
        const that = this;
        switch (option.event) {
            case "searchTypeTab":
                option.dom.on('click', function (): void {
                    // @ts-ignore
                    that.searchTypeTab(this);
                });
                break;
            case "searchStatusTab":
                option.dom.on('click', function () {
                    // @ts-ignore
                    that.searchStatusTab(this);
                });
                $('.search-status-box .cur-status').on('touchend', function () {
                    if ($('.search-status-box').hasClass('search-status-box-hover')) {
                        $('.search-status-box').removeClass('search-status-box-hover');
                    } else {
                        $('.search-status-box').addClass('search-status-box-hover');
                    }
                });
                break;
            case "searchStatusMouseOver":
                option.dom.on('mouseenter', function () {
                    // @ts-ignore
                    $(this).addClass('search-status-box-hover');
                });
                break;
            case "searchStatusMouseOut":
                option.dom.on('mouseleave', function () {
                    // @ts-ignore
                    $(this).removeClass('search-status-box-hover');
                });
                break;
            case "hotwordsItem":
                option.dom.on('click', function (event: Event): void {
                    // @ts-ignore
                    that.hotwordsItem(this);
                });
                break;
            case "searchSubmit":
                option.dom.on('click', function () {
                    that.searchSubmit();
                });
                break;
            case "searchFormSubmit":
                option.dom.submit(function () {
                    that.searchSubmit();
                    return false;
                });
                break;
            case "advSearch":
                option.dom.click(function () {
                    that.advSearch();
                    return false;
                });
                break;
        }
    }

    searchTypeTab(dom: any) {
        const that = this;
        const type: any = $(dom).attr('type');
        that.data.searchInfo.searchType = type;
        that.data.searchInfo.status = 0;
        that.dom.searchLabel.text(that.data.searchPlaceholder[type]);
        $('.status-other').attr('status', 1);
        $('.search-type').removeClass('shop pm').addClass(type);
        $('.cur-status .text').text(that.data.searchInfo[type][0]);
        $('.status-other .text').text(that.data.searchInfo[type][1]);
        $('.status-other').removeClass('status-other-end');
    }

    searchStatusTab(dom: any) {
        const that = this;
        const status: any = $(dom).attr('status');
        let otherStatus: any = status == 1 ? 0 : 1;
        $('.status-other').removeClass('status-other-end');
        if (that.data.searchInfo.searchType == 'pm') {
            that.dom.searchLabel.text(that.data.searchPlaceholder[status == '1' ? 'pmended' : 'pm']);
            if (status == 1) {
                $('.status-other').addClass('status-other-end');
            }
        }
        that.data.searchInfo.status = status;
        $(dom).attr('status', otherStatus);
        $('.cur-status .text').text(that.data.searchInfo[that.data.searchInfo.searchType][status]);
        $('.status-other .text').text(that.data.searchInfo[that.data.searchInfo.searchType][otherStatus]);
        $('.search-status-box').removeClass('search-status-box-hover');
    }

    hotwordsItem(dom: any) {
        var that = this,
            index = $(dom).index(),
            _url = $(dom).attr('url') || '',
            _stpmt = that.baseEncode({search_type: 'hot'}),
            val = $(dom).text();
        KFZ.searchInfo.search_type = 'hot';
        KFZ.searchInfo.search_pos = index;
        if (_url) {
            //如果存在_stpmt,则改为 hot
            _url = _url.replace(/(_stpmt=)+[\w+\/=]*/, '_stpmt=' + _stpmt);
            /* 搜索埋点 */
            window.open(_url);
            // window.location.href = _url;
        } else {
            that.dom.searchLabel.hide();
            that.dom.searchPut.val(val);
            that.dom.searchForm.submit();
        }
    }

    searchSubmit() {
        const that = this;
        let _stpmt = ''
        const urlParam = that.getUrlParam().xinshu;
        const xinshu = urlParam;
        const searchWord = $.trim(that.dom.searchPut.val());
        that.data.search_type = KFZ.searchInfo.search_type || 'active';
        that.data.search_pos = KFZ.searchInfo.search_pos || '';
        that.data.search_key = searchWord;
        if (that.data.search_type == 'suggest') {
            _stpmt = that.baseEncode({
                search_type: that.data.search_type,
                search_pos: that.data.search_pos,
                search_key: that.data.search_key
            });
        } else {
            _stpmt = that.baseEncode({search_type: that.data.search_type});
        }
        if (searchWord == '') return;
        /* 未登录用户设置本地搜索历史 */
        window.searchHistorySugTools.addLocalSearchHistory({
            keyword: searchWord,
            search_time: Math.floor(new Date().getTime() / 1000),
            type: that.data.searcchHistoryType[that.data.searchInfo.searchType] || 0
        });
        /* 搜索埋点 */


        if (that.data.searchInfo.searchType == 'shop') {
            if (that.data.pageType == 'isbnsearch') {
                window.location.href = window.KFZ.site.search + 'item_result/?key=' + encodeURIComponent(searchWord) + '&status=' + that.data.searchInfo.status + '&_stpmt=' + _stpmt;
            } else {
                if (xinshu) {
                    window.location.href = window.KFZ.site.search + 'product_result/?key=' + encodeURIComponent(searchWord) + '&xinshu=1&status=' + that.data.searchInfo.status + '&_stpmt=' + _stpmt;
                } else {
                    window.location.href = window.KFZ.site.search + 'product_result/?key=' + encodeURIComponent(searchWord) + '&status=' + that.data.searchInfo.status + '&_stpmt=' + _stpmt;
                }
            }
        }
        if (that.data.searchInfo.searchType == 'pm') {
            if (that.data.searchInfo.status == '1') {
                window.location.href = window.KFZ.site.search + 'pm/' + that.searchTool.setParam({key: searchWord}).paramStr.code + '?_stpmt=' + _stpmt;
            } else {
                window.location.href = window.KFZ.site.pm + 'search_result/?sc=' + encodeURIComponent(searchWord) + '&_stpmt=' + _stpmt;
            }
        }
    }

    advSearch() {
        let that = this,
            key = $.trim(that.dom.searchPut.val()),
            url = '';
        if (that.data.searchInfo.searchType == 'shop') {
            url = KFZ.site.search + 'adv.html?key=' + key + '&status=' + that.data.searchInfo.status;
        } else {
            url = KFZ.site.search + 'adv_pm.html?key=' + key + '&status=' + that.data.searchInfo.status;
        }
        window.open(url);
    }

    getUrlParam() {
        let param: any = {};
        // @ts-ignore
        location.search.replace(/([^&=?]+)=([^&]+)/g, function (m, $1, $2) {
            param[$1] = $2
        });
        return param;
    }

    // base64加密
    baseEncode(input: any): string {
        let that = this,
            _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            output = "",
            chr1, chr2, chr3, enc1, enc2, enc3, enc4,
            i = 0;
        input = that._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    _utf8_encode(string: any): string {
        string = JSON.stringify(string).replace(/\r\n/g, "\n");
        let utftext: string = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }
}

new Searchbar();