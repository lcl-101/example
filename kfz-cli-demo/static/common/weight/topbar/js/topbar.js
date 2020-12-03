"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../utils/login-win");
require("../css/topbar.css");
require("../../../utils/kfzTools");
var Topbar = /** @class */ (function () {
    function Topbar() {
        var that = this;
        this.base = '/';
        this.cartTime = 0;
        this.dom = {
            navHeader: $('#navHeader'),
            areaText: $('#areaText'),
            areaWin: $('#areaWin'),
            msgNum: $('#msgNum'),
            nickName: $('#nickName'),
            loginWin: $('#loginWin'),
            sellerWin: $('#sellerWin'),
            cartListWin: $('#cartListWin'),
            cartLink: $('#cartLink'),
            cartNum: $('#cartNum'),
            unReadNum: $('#unReadNum'),
            codeWim: $('#codeWim')
        };
        this.tpl = {
            areaTpl: require('../dot/area-tpl.dot'),
            nickNameTpl: require('../dot/nick-name-tpl.dot'),
            sellerCenterTpl: require('../dot/seller-center-tpl.dot'),
            loginTpl: require('../dot/login-tpl.dot'),
            noLoginTpl: require('../dot/no-login-tpl.dot'),
            cartNoneTpl: require('../dot/cart-none-tpl.dot'),
            noLoginCartNoneTpl: require('../dot/no-login-cart-none-tpl.dot'),
            cartListTpl: require('../dot/cart-list-tpl.dot'),
            navLoadTpl: require('../dot/nav-load-tpl.dot'),
            qrCodeTpl: require('../dot/qr-code-tpl.dot') // 二维码模板
        };
        this.areaInfo = {
            '1000000000': '北京',
            '2000000000': '上海',
            '3000000000': '天津',
            '4000000000': '重庆',
            '5000000000': '安徽',
            '6000000000': '福建',
            '7000000000': '甘肃',
            '8000000000': '广东',
            '9000000000': '广西',
            '10000000000': '贵州',
            '11000000000': '海南',
            '12000000000': '河北',
            '13000000000': '河南',
            '14000000000': '黑龙江',
            '15000000000': '湖北',
            '16000000000': '湖南',
            '17000000000': '吉林',
            '18000000000': '江苏',
            '19000000000': '江西',
            '20000000000': '辽宁',
            '21000000000': '内蒙古',
            '22000000000': '宁夏',
            '23000000000': '青海',
            '24000000000': '山东',
            '25000000000': '山西',
            '26000000000': '陕西',
            '27000000000': '四川',
            '28000000000': '西藏',
            '29000000000': '新疆',
            '30000000000': '云南',
            '31000000000': '浙江',
            '32000000000': '澳门',
            '33000000000': '台湾',
            '34000000000': '香港',
            '40000000000': '海外'
        };
        this.status = {
            userInfo: true,
            getCarList: true
        };
        this.initNav();
        setTimeout(function () {
            that.loadRender();
            that.codeRender();
            // @ts-ignore
            that.getUserInfo();
            that.getCartList(true);
        });
    }
    /**
     * 初始化导航方法
     * 1. 模块通信管理器通知配置
     * 2. 根据用户信息展示不同状态信息
     * 3. 导航展开收起事件处理
     * 4. 初始化购物车
     * 5. 登录按钮点击统一处理
     */
    Topbar.prototype.initNav = function () {
        this.contactManagerConf();
        this.statusInit();
        this.navFocusWatch();
        this.cartListInit();
        this.loginInit();
    };
    /**
     * 模块通信管理器通知配置
     * 1. 监听未读消息变化通知 -> 同步未读消息数量
     * 2. 监听购物车数量变化通知 -> 同步购物车数量
     */
    Topbar.prototype.contactManagerConf = function () {
        var that = this;
        window.KFZ.tools.contactManager.on('msgNotice', function (unreadNum) {
            that.UnreadNumRender(unreadNum);
        }, {
            from: '公共头部',
            description: '未读消息数量发生变化 -> 同步头部消息数量 contactManagerConf'
        });
        window.KFZ.tools.contactManager.on('areaNotice', function (area) {
            area = area || window.KFZ.tools.cookies('reciever_area');
            if (area && area.length > 9) {
                area = area.slice(0, area.length - 9) + '000000000';
                that.userInfo.area = area;
                // @ts-ignore
                that.updateArea(area);
            }
        }, {
            from: '公共头部',
            description: '监听用户所在地变化通知 -> 同步用户所在地信息 contactManagerConf'
        });
        window.KFZ.tools.contactManager.on('cartNotice', function () {
            // @ts-ignore
            that.getCartList();
        }, {
            from: '公共头部',
            description: '监听购物车数量变化通知 -> 同步购物车数量 contactManagerConf'
        });
    };
    /**
     * 根据用户信息展示不同状态信息
     * 已登录
     *          -> 渲染 nickName -> 渲染 loginWin
     *          -> 是卖家 -> 渲染 sellerWin
     *          -> 不是卖家 -> 渲染 noSellerWin
     * 未登录
     *      渲染 noLoginWin -> 渲染 noSellerWin
     */
    Topbar.prototype.statusInit = function () {
        // 是否登录
        if (this.userInfo && this.userInfo.isLogin) {
            this.nickNameRender();
            this.loginWinRender();
            this.sellerWinRender();
        }
        else {
            this.noLoginWinRender();
            this.sellerWinRender();
        }
    };
    /**
     * 导航展开收起事件处理
     * 监听导航各选项鼠标移入移除事件
     * 购物车列表获取做限流处理
     */
    Topbar.prototype.navFocusWatch = function () {
        var that = this;
        if (this.isPc() === 'PC') {
            this.dom.navHeader.find('.item-info').mouseenter(function () {
                // @ts-ignore
                var $tag = $(this), name = $tag.attr('name');
                $tag.addClass("info-focus-active");
            }).mouseleave(function () {
                // @ts-ignore
                $(this).removeClass("info-focus-active");
                that.dom.cartListWin.find('.revoke-btn').hide();
                that.delCartDom && that.delCartDom.remove();
            });
        }
        else {
            this.dom.navHeader.find('.item-info').mouseenter(function () {
                // @ts-ignore
                var $tag = $(this), name = $tag.attr('name');
                $tag.addClass("info-focus-active");
            }).mouseleave(function () {
                // @ts-ignore
                $(this).removeClass("info-focus-active");
                that.dom.cartListWin.find('.revoke-btn').hide();
                that.delCartDom && that.delCartDom.remove();
            });
            this.dom.navHeader.find('.dest').click(function () {
                // @ts-ignore
                var $tag = $(this), name = $tag.attr('name');
                $tag.addClass("info-focus-active");
            });
        }
        this.dom.cartLink.mouseenter(function () {
            var curTime = new Date().getTime();
            if (curTime - that.cartTime > 1000) {
                that.cartTime = curTime;
                // @ts-ignore
                that.getCartList();
            }
        });
    };
    /**
     * 初始化购物车
     * 监听 '删除' '撤销' '登录' 事件
     * 删除事件 -> 请求删除购物车
     * 撤销事件 -> 将最近一次删除的商品请求加入购物车
     * 登录事件 -> 调用登录widget方法
     */
    Topbar.prototype.cartListInit = function () {
        var that = this;
        this.dom.cartListWin.delegate('.del-btn', 'click', function () {
            // @ts-ignore
            var $tag = $(this), cartDom = $tag.parents('.item'), shopId = cartDom.attr('shopid'), itemId = cartDom.attr('itemid'), cartId = cartDom.attr('cartid'), delParam = {
                carts: [{ cartId: cartId, itemId: itemId }]
            };
            that.delCartInfo = {
                shopId: shopId,
                itemId: itemId,
                num: 1
            };
            that.delCartItem(delParam, cartDom);
        }).delegate('.revoke-btn', 'click', function () {
            that.addCartItem();
            // @ts-ignore
            $(this).hide();
        }).delegate('.login-btn', 'click', function () {
            that.getUserInfo(true);
        });
    };
    /**
     * 登录按钮点击统一处理
     */
    Topbar.prototype.loginInit = function () {
        var that = this;
        this.dom.loginWin.delegate('.login-btn', 'click', function () {
            that.getUserInfo(true);
        }).delegate('.register-btn', 'click', function () {
            typeof window.loginWin == "function" && window.loginWin(KFZ.site.login, 'register');
        });
    };
    /**
     * 删除购物车操作
     * 请求删除接口 -> 隐藏该商品 -> 同步页面购物车数量 -> 显示撤销按钮 -> 调用删除回调函数
     * @param {Object} delParam 删除购物车请求参数
     * @param {Object} cartDom 删除的商品dom元素
     */
    Topbar.prototype.delCartItem = function (delParam, cartDom) {
        var that = this;
        $.ajax({
            url: KFZ.site.s_cn_cart + 'jsonp/delCartItem',
            type: 'GET',
            dataType: 'jsonp',
            data: delParam,
            success: function (res) {
                if (res.status) {
                    cartDom.hide();
                    that.cartNum -= 1;
                    that.dom.cartNum.html(that.cartNum);
                    that.delCartDom = cartDom;
                    that.dom.cartListWin.find('.revoke-btn').show();
                    that.delCartNotice(delParam, '删除购物车操作成功后 delCartItem');
                }
                else {
                    console.log('删除失败，请重试！');
                }
            }
        });
    };
    /**
     * 加入购物车操作
     * 请求删除接口 -> 移动删除商品位置到第一位 -> 显示该商品 -> 同步页面购物车数量 -> 隐藏撤销按钮 -> 调用撤销回调函数
     */
    Topbar.prototype.addCartItem = function () {
        var that = this;
        $.ajax({
            url: KFZ.site.s_cn_cart + 'jsonp/add/',
            type: 'GET',
            dataType: 'jsonp',
            data: that.delCartInfo,
            success: function (res) {
                if (res.status) {
                    that.dom.cartListWin.find('.item-list').prepend(that.delCartDom);
                    that.delCartDom.show();
                    that.cartNum += 1;
                    that.dom.cartNum.html(that.cartNum);
                    that.revokeCartNotice('加入购物车成功后 addCartItem');
                }
                else {
                    console.log('撤销失败，请重新添加该商品！');
                }
            }
        });
    };
    /**
     * 渲染loginWin
     */
    Topbar.prototype.noLoginWinRender = function () {
        var that = this;
        this.dom.loginWin.html(this.tpl.noLoginTpl());
        this.dom.loginWin.find('.icon-btn').click(function () {
            // @ts-ignore
            var $tag = $(this), type = $tag.attr('type'), typeUrl = '';
            switch (type) {
                case 'weixin':
                    typeUrl = 'Pc/Openweixin/loginOAuth2';
                    break;
                case 'qq':
                    typeUrl = '/Pc/Openqq/loginOAuth2';
                    break;
                case 'weibo':
                    typeUrl = 'Pc/Openweibo/loginOAuth2';
                    break;
            }
            location.href = window.KFZ.site.login + typeUrl + that.currentUrl();
        });
    };
    /**
     * 获取当前页面url 用来登录后跳转
     */
    Topbar.prototype.currentUrl = function () {
        var hash = window.location.hash.substr(1).replace(/\?.*/g, ''), href = window.location.href.replace(/#[\w-\/]*/gi, '').replace(/\?returnUrl=.*$/, '');
        href = '?returnUrl=' + encodeURIComponent(href + (hash ? (/\?/.test(href) ? '&' : '?') + 'hash=' + hash : ''));
        return href;
    };
    /**
     * 渲染未读消息数
     * @param {String} type 显示状态
     * 'normal' -> 没有未读消息
     * != 'normal' -> 有未读消息
     */
    Topbar.prototype.UnreadNumRender = function (unreadNum) {
        var type = unreadNum > 0 ? '' : 'normal';
        if (type == 'normal') {
            this.dom.msgNum.removeClass('msg-un-read').addClass('msg-normal');
            this.dom.unReadNum.html('');
        }
        else {
            this.dom.msgNum.removeClass('msg-normal').addClass('msg-un-read');
            if (unreadNum > 99) {
                this.dom.unReadNum.html('99+');
            }
            else {
                this.dom.unReadNum.html(unreadNum);
            }
        }
    };
    /**
     * 获取用户信息
     */
    Topbar.prototype.getUserInfo = function (openLoginWin) {
        var that = this;
        if (!this.status.userInfo) {
            return;
        }
        this.status.userInfo = false;
        $.ajax({
            url: '/common-api/api/getUserInfo',
            type: 'GET',
            cache: false,
            timeout: 5000,
            success: function (res) {
                if (res.status) {
                    if (res.data.isLogin) {
                        that.userInfo = res.data;
                        that.userInfoLoadedNotice(res.data, '用户信息加载完成 init');
                        that.statusInit();
                        that.areaInit();
                        that.imNoticeConnectNotice('进行消息连接');
                    }
                    else {
                        that.areaInit();
                        openLoginWin && typeof window.loginWin == "function" && window.loginWin(KFZ.site.login, 'login');
                    }
                }
                else {
                    that.areaInit();
                    openLoginWin && typeof window.loginWin == "function" && window.loginWin(KFZ.site.login, 'login');
                }
            },
            error: function () {
                that.areaInit();
                openLoginWin && typeof window.loginWin == "function" && window.loginWin(KFZ.site.login, 'login');
            },
            complete: function () {
                that.status.userInfo = true;
            }
        });
    };
    /**
     * 获取购物车列表
     * 渲染购物车列表
     */
    Topbar.prototype.getCartList = function (UserInfoFlag) {
        var that = this;
        if (!that.status.getCarList) {
            return;
        }
        that.status.getCarList = false;
        $.ajax({
            url: KFZ.site.s_cn_cart + 'jsonp/listcart',
            type: 'GET',
            dataType: 'jsonp',
            data: { limit: 5 },
            success: function (res) {
                if (res.status && res.result.data) {
                    if (!UserInfoFlag && !that.userInfo.isLogin) {
                        // @ts-ignore
                        that.getUserInfo();
                    }
                    that.cartListRender(res.result);
                }
            },
            complete: function () {
                that.status.getCarList = true;
            }
        });
    };
    /**
     * 设置用户地址信息cookies
     * 请求会员系统设置用户地址信息
     * @param {Object} param 设置用户地址信息请求参数
     */
    Topbar.prototype.setArea = function (param) {
        var that = this;
        $.ajax({
            url: '/common-api/api/setUserArea',
            type: 'GET',
            data: param,
            success: function (res) {
                if (res.status) {
                    that.updateAreaNotice(param.area, '选择用户所在地 areaInit');
                    that.setAreaCookies(param.area);
                }
            }
        });
    };
    /**
     * 更新 areaWin
     */
    Topbar.prototype.updateArea = function (area, activeDom) {
        area = area;
        var areaName = this.areaInfo[area];
        var $tag = activeDom || this.dom.areaWin.find('.text[code=' + area + ']');
        var flag = $tag.parent().hasClass('active');
        if (flag) {
            return false;
        }
        $tag.parent().addClass('active').siblings('.active').removeClass('active').parents('.item-info').removeClass('info-focus-active');
        this.dom.areaText.html('送至 ' + areaName);
        this.userInfo.area = area;
        this.userInfo.areaName = areaName;
        return true;
    };
    Topbar.prototype.areaInit = function () {
        var that = this, area = (this.userInfo && this.userInfo.area) || window.KFZ.tools.cookies('reciever_area');
        if (!area) {
            area = '1000000000';
        }
        var topArea = area.slice(0, area.length - 9) + '000000000';
        if (!this.areaInfo[topArea]) {
            topArea = area = '1000000000';
        }
        this.setArea({ area: area });
        if (this.userInfo) {
            this.userInfo.area = topArea;
        }
        this.dom.areaText.html('送至 ' + this.areaInfo[topArea]);
        this.areaRender();
        this.dom.areaWin.find('.text').click(function (e) {
            e.stopPropagation();
            // @ts-ignore
            var $tag = $(this), area = $tag.attr('code');
            if (that.updateArea(area, $tag)) {
                that.setArea({ area: area });
            }
        });
    };
    /**
     * 设置用户地址信息cookies
     * @param {Number|String} area 地址编号
     */
    Topbar.prototype.setAreaCookies = function (area) {
        window.KFZ.tools.cookies('reciever_area', area, {
            path: '/',
            domain: '.kongfz.cn',
            expires: 365
        });
    };
    /**
     * 渲染购物车列表
     * @param {Array} result 购物车列表
     * 购物车列表数 == 0
     *      已登录 -> 渲染 已登录购物车无商品模板
     *      未登录 -> 渲染 未登录购物车无商品模板
     * 购物车列表数 != 0
     *      渲染 购物车列表模板
     */
    Topbar.prototype.cartListRender = function (result) {
        var that = this, cartListView = '', cartList = result.data, cartNum = result.page.recordCount;
        this.cartNum = cartNum * 1;
        if (result.data.length == 0) {
            this.dom.cartNum.html('');
            if (this.userInfo.isLogin) {
                cartListView = this.tpl.cartNoneTpl();
            }
            else {
                cartListView = this.tpl.noLoginCartNoneTpl();
            }
        }
        else {
            this.dom.cartNum.html(result.page.recordCount);
            cartListView = this.tpl.cartListTpl({ cartList: cartList, cartNum: cartNum, base: this.base });
        }
        this.dom.cartListWin.html(cartListView);
        this.dom.cartListWin.find('img').on('error', function () {
            // @ts-ignore
            window.KFZ.tools.onErrorReplace(that.base + 'dist/assets/images/error.jpg', this, $(this));
        });
    };
    Topbar.prototype.isPc = function () {
        if (/phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent)) {
            return "WEB";
        }
        else {
            return "PC";
        }
    };
    /**
     * 渲染loginWin
     */
    Topbar.prototype.loginWinRender = function () {
        var that = this;
        this.dom.loginWin.html(this.tpl.loginTpl({
            site: KFZ.site
        }));
        that.userInfo.photo && window.KFZ.tools.loadImage(that.userInfo.photo, function (img) {
            that.dom.loginWin.find('.pic-img').attr('src', that.userInfo.photo).removeClass('hide');
            that.dom.loginWin.find('.pic-ico').hide();
        });
        this.dom.loginWin.find('.logout-btn').click(function () {
            location.href = window.KFZ.site.login + 'logout/' + that.currentUrl();
        });
    };
    /**
     * 渲染loading
     */
    Topbar.prototype.loadRender = function () {
        this.dom.cartListWin.find('.load-box').html(this.tpl.navLoadTpl({ base: this.base }));
    };
    /**
     * 渲染二维码
     */
    Topbar.prototype.codeRender = function () {
        this.dom.codeWim.html(this.tpl.qrCodeTpl({ base: this.base, site: KFZ.site }));
    };
    /**
     * 渲染nickName
     */
    Topbar.prototype.nickNameRender = function () {
        this.dom.nickName.html(this.tpl.nickNameTpl({ nickName: this.userInfo && this.userInfo.nickname }));
    };
    /**
     * 渲染sellerWin
     */
    Topbar.prototype.sellerWinRender = function () {
        this.dom.sellerWin.html(this.tpl.sellerCenterTpl({ userType: this.userInfo && this.userInfo.userType || [], site: KFZ.site }));
    };
    /**
     * 渲染areaWin
     */
    Topbar.prototype.areaRender = function () {
        this.dom.areaWin.html(this.tpl.areaTpl({ areaList: this.areaInfo, active: (this.userInfo && this.userInfo.area) || '' }));
    };
    /**
     * 通知模块通信管理器'delCart'
     */
    Topbar.prototype.delCartNotice = function (param, description) {
        window.KFZ.tools.contactManager.run('delCart', {
            param: param,
            from: '公共头部',
            description: description || '未知描述'
        });
    };
    /**
     * 通知模块通信管理器'imNoticeConnect'
     */
    Topbar.prototype.imNoticeConnectNotice = function (description) {
        window.KFZ.tools.contactManager.run('imNoticeConnect', {
            from: '公共头部',
            description: description || '未知描述'
        });
    };
    /**
     * 通知模块通信管理器'revokeCart'
     */
    Topbar.prototype.revokeCartNotice = function (description) {
        window.KFZ.tools.contactManager.run('revokeCart', {
            from: '公共头部',
            description: description || '未知描述'
        });
    };
    /**
     * 通知模块通信管理器'userInfoLoaded'
     */
    Topbar.prototype.userInfoLoadedNotice = function (userInfo, description) {
        window.KFZ.tools.contactManager.run('userInfoLoaded', {
            param: userInfo,
            from: '公共头部',
            description: description || '未知描述'
        });
    };
    /**
     * 初始化地址信息
     * 用户信息中有地址信息 -> 设置地址cookies -> 渲染地址信息
     * 用户信息中没有地址信息 -> 获取地址cookies
     *      cookies 中存在地址信息 -> 请求会员设置cookies接口 -> 渲染地址信息
     *      cookies 中不存在地址信息 -> 不进行操作
     * 渲染地址选择框
     * 监听地址选择事件
     *      交互 -> 同步 this.userInfo 地址信息 -> 触发模块通信管理器'updateArea' -> 请求会员系统设置用户地址信息
     */
    /**
     * 通知模块通信管理器'updateArea'
     */
    Topbar.prototype.updateAreaNotice = function (area, description) {
        window.KFZ.tools.contactManager.run('updateArea', {
            param: area,
            from: '公共头部',
            description: description || '未知描述'
        });
    };
    return Topbar;
}());
new Topbar();
