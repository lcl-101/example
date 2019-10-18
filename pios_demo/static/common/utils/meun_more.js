// 创建右侧菜单并且绑定事件
export default function createMore(tag){
    var moreStr = '<span class="more-icon"></span>';
    moreStr += '<section class="nav_header"><div class="nav_top">';
    moreStr += '<a class="group shouye" target="_self"><span class="i-shouye"></span></a>';
    moreStr += '<a class="group sousuo" target="_self"><span class=" i-sousuo"></span></a>';
    moreStr += '<a class="group close"><span class=" i-guanbi1"></span></a>';
    moreStr += '</div>';
    moreStr += '<div class="nav_content"><div class="nav_content_scroll">';
    moreStr += '<a class="item item_msg item_02" target="_self"><span class=" i-xiaoxi3"></span><span class="item_text">我的消息</span><span class="i_header num"></span></a>';
    moreStr += '<a class="item item_cart" target="_self"><span class="i-gouwuche1"></span><span class="item_text">购物车</span><span class="i_header num" ></span></a>';
    moreStr += '<a class="item item_person" target="_self"><span class="i-gerenzhongxin"></span><span class="item_text">个人中心</span></a>';
    moreStr += '<a class="item item_maijia" target="_self"> <span class="i_t i-maijia"></span><span class="item_text">卖家中心</span></a>';
    moreStr += '<div class="line_gray"></div>';
    moreStr += '<a class="item item_02 item_order" target="_self"><span class="text">我的订</span></a>';
    moreStr += '<a class="item item_02 item_bid" target="_self"><span class="text">我的拍卖交易</span></a>';
    moreStr += '<a class="item item_jingpai" target="_self"><span class="text">我的竞拍</span></a>';
    moreStr += '<a class="item item_trace" target="_self"><span class="text">资金账户</span></a>';
    moreStr += '<a class="item item_zu" target="_self"><span class="text">我的足迹</span></a>';
    moreStr += '<div class="line_gray"></div>';
    moreStr += '<a class="item item_02 item_dian" target="_self"><span class="text">书店区</span></a>';
    moreStr += '<a class="item item_02 item_paimai" target="_self"><span class="text">在线拍卖</span></a>';
    moreStr += '<a class="item item_02 item_zixun" target="_self"><span class="text">资讯</span></a>';
    moreStr += '<a class="item item_02 item_shequ" target="_self"><span class="text">社区</span></a>';
    moreStr += '</div></div></section>';
    moreStr += ' <div class="kfz-overlay"></div>';
    $(tag).html(moreStr);
    randHref();
    getMsgNum();
    getCarNumn();

}
// 渲染跳转链接
function randHref(){
    var  $navTop = $('.nav_top'),
         $navContent = $('.nav_content'),
         $more = $('.more-icon'),
         $overlay = $('.kfz-overlay'),
         $close = $('.close');
        $navTop.find('.shouye').attr('href',KFZ.site.m);
        $navTop.find('.sousuo').attr('href',KFZ.site.m + 'search');
        $navContent.find('.item_msg').attr('href',KFZ.site.m + 'm/#/message/msg/inbox/');
        $navContent.find('.item_cart').attr('href',KFZ.site.m + 'm/#/shop/cart/list');
        $navContent.find('.item_person').attr('href',KFZ.site.m + 'm/#/user/personal');
        $navContent.find('.item_maijia').attr('href',KFZ.site.m + 'm/#/shop/seller/sellerpersonal');
        $navContent.find('.item_order').attr('href',KFZ.site.m + 'm/#/shop/buyer/orderlist/1?status=Trading');
        $navContent.find('.item_bid').attr('href',KFZ.site.m + 'm/#/pm/tradelist/');
        $navContent.find('.item_jingpai').attr('href',KFZ.site.m + 'm/#/pm/bidding/');
        $navContent.find('.item_trace').attr('href',KFZ.site.m + 'm/#/pay/platform');
        $navContent.find('.item_zu').attr('href',KFZ.site.m + 'm/#/user/personal-myfoot-goods/');
        $navContent.find('.item_dian').attr('href',KFZ.site.m + 'shop/');
        $navContent.find('.item_paimai').attr('href',KFZ.site.mpm);
        $navContent.find('.item_zixun').attr('href',KFZ.site.mzixun);
        $navContent.find('.item_shequ').attr('href',KFZ.site.shequ);
        $more.click(function(){
            navShow();
        });
        $overlay.click(function(){
            navHide();
        });
        $close.click(function(){
            navHide();
        });
}
function navShow(){
     var $navHeader = $('.nav_header'),
         $overlay = $('.kfz-overlay'),
         $body = $('body');
     $overlay.show();
     $navHeader.addClass("slide-right").show();
     $body.css('height',$(window).height()+"px");
     $navHeader.css('height',$(window).height()+"px");
     $body.css('overflow','hidden');
};
function navHide(){
    var $navHeader = $('.nav_header'),
         $overlay = $('.kfz-overlay');
    $overlay.hide();
    $navHeader.hide();
    $('body').css('overflow','auto');
};
function getMsgNum(){
    $.ajax({
        type: "get",
        url: KFZ.site.m + 'api-msg/Interface/User/getUnreadNum',
        dataType: "jsonp",
        success: function (n) {
            if (n > 0) {
                var num = n;
                if (num > 100) {
                    num = "99+";
                }
                $('.more-icon').html('<i class="msg_num">' + num + '</i>');
                $('.item_msg').append('<span class="msg-link_num">' + num + '</span >');
            }
        },
        error: function (err) {
        }
    });
};
function getCarNumn(){
    $.ajax({
        type: "get",
        url: KFZ.site.m + 'cart/jsonp/getCartNum',
        dataType: "jsonp",
        success: function (data) {
            if (data.result > 0) {
                var num = data.result;
                if (num > 100) {
                    num = "99+";
                }
                $('.item_cart').append('<span class="car-link_num">' + num + '</span >');
            }
        },
        error: function (err) {
        }
    });
};