import '../css/topbar.css';
var site = topbar_site;

var header = {
    site: site,
    dom: {
        $header: $('header'),
        $block: $('.block'),
        $forUser: $('#forUser'),
        $body: $('body')
    },
    init: function () {
        var that = this;
        that.wxCheck();
        that.initEvent();
        that.getMsgNum();
    },
    initEvent: function () {
        var that = this;
        that.dom.$header.on('click', '.more-icon', function () {
            that.menuToggle.apply(this);
        })
        that.dom.$header.find('.go_search').click(function(){
            window.location.href = that.site.m + 'search/#/pm/bidding/'
        });
    },
    menuToggle: function () {
        var _this = $(this),
            flag = $(this).attr('data-toggle');
        if (flag == '1') {
            $('.nav-lay-out').hide();
            $('.lay_bg').remove();
            _this.attr('data-toggle', '0');
        } else {
            $('.nav-lay-out').show();
            _this.attr('data-toggle', '1');
            // 透明背景
            var loadStr = '<div class="lay_bg"></div>';
            $('body').append(loadStr);
            $('.lay_bg').on('touchstart', function (event) {
                $('.nav-lay-out').hide();
                $('.more-icon').attr('data-toggle', '0');
                setTimeout(function () {
                    $('.lay_bg').remove();
                }, 400);
                event.stopPropagation();
            });
        }
    },
    //getMsgNum
    getMsgNum: function () {
        var that = this;
        $.ajax({
            type: "get",
            url: that.site.m + 'api-msg/Interface/User/getUnreadNum',
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "jsonpCallback",
            success: function (n) {

                if (n > 0) {
                    var num = n;
                    if (num > 100) {
                        num = "99+";
                    }
                    $('.more-icon').html('<i class="msg_num">' + num + '</i>');
                    $('.msg-link').append('<span class="msg-link_num">' + num + '</span >');
                }
            },
            error: function (err) {
            }
        });
    },
    wxCheck: function(){
        var ua = navigator.userAgent.toLowerCase(),
            that = this;
        if(ua.match(/MicroMessenger/i)=="micromessenger"){
            if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
                document.addEventListener('WeixinJSBridgeReady', that.miniTopBar.apply(that), false)
                } else {
                    that.miniTopBar();
                }
        }else if(typeof(swan) != 'undefined' && ua.match(/baiduboxapp/i)=="baiduboxapp"){   //是否在百度小程序环境
            swan.webView.getEnv(function(res) {
                if(res.smartprogram){
                    that.miniTopBar();
                }else{
                    //that.miniProgramCheck();
                    that.appTopBar();
                }
            })
        }else{
            that.appTopBar();
        }
    },
    miniTopBar: function(){
        var that = this;
        if(window.__wxjs_environment && window.__wxjs_environment === 'miniprogram'){
            that.dom.$header.hide();
            that.dom.$block.hide();
        }else if(navigator.userAgent.toLowerCase().match(/baiduboxapp/i) == "baiduboxapp"){
            that.dom.$header.hide();
            that.dom.$block.hide();
        }else{
            that.dom.$header.hide();
            that.dom.$block.hide();

        }
    },
    appTopBar: function(){
        var that = this,
            userAgent = navigator.userAgent,
            isApp = userAgent.indexOf('KFZ_COM') > -1;
        if (isApp) {
            that.dom.$header.hide();
            that.dom.$block.hide();
        }else{
            that.dom.$header.show();
            that.dom.$block.show();
        }
    }
}
header.init();
