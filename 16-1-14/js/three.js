$(function(){
    var lottery = new Lottery('lotteryContainer', 'images/gua.png', 'image', 500, 100, drawPercent);
    lottery.init('images/jiang.png', 'image');
    var drawPercentNode = document.getElementById('drawPercent');
    var phone='';
    $.ajax({
        //type: "post",
        //dataType: "json",
        //url:'/active/wcgoneyear/check-user',
        success:function(data){
            data={
                "code": 0,
                "status": "success",
                "message": "成功",
                "data": {
                    "result": "success",
                    "msg": "成功",
                    "code": 0,
                    "content": {
                        "ischeck": 0, //1=》一验证  （只有已验证的时候 会返回   usertype 和 phone ）
                        "usertype": "3", // 用户类型   1=》未注册 2=》2014-2015 之间 注册未投资 3=》2014-2015=》注册并投资  4=》2016 注册或者投资
                        "phone": ""
                    }
                }
            }
            if(data.code==0){
                if(data.data.code==0){
                    if(data.data.content.ischeck==0){
                        if(data.data.content.usertype==1||data.data.content.usertype==2){
                            for(var i=0;i<5;i++){
                                $('.swiper-slide').eq(i).hide();
                            }
                            $('.six-box img')[0].src='images/content6-title1.png';
                            $('.down').hide();
                        }else if(data.data.content.usertype==3){
                            phone=data.data.content.phone;
                            //数据
                            $.ajax({
                                //type: "post",
                                //dataType: "json",
                                //url:'/active/wcgoneyear/get-user-data?phone='+phone+'',
                                success:function(data){
                                    data={
                                        "code": 0,
                                        "status": "success",
                                        "message": "成功",
                                        "data": {
                                            "result": "success",
                                            "msg": "成功",
                                            "code": 0,
                                            "content": {
                                                "days": 559, // 注册天数
                                                "time": "2014.06.20",//注册时间
                                                "invest_time": "2014-08-07",//投资时间
                                                "invest_money": "20.20",//投资金额
                                                "repay_money": 333,//回款金额
                                                "repay_time": "2014-08-07",//回款时间
                                                "invite_code": "800004",//邀请码
                                                "friend_register_time":"2014.09.21", //好友注册时间      (为空的时候 就取邀请码)
                                                "friend_name":"王晓",                       //(为空的时候 就取邀请码)
                                                "coupon_total": "10",//代金券金额
                                                "hongbao_total": "110",//红包金额
                                                "income_total": "1000",//总收益
                                                "more_bank": "10",//比银行多赚
                                                "is_exchange": "1" //1=>已兑换过
                                            }
                                        }
                                    }
                                    if(data.code==0){
                                        if(data.data.code==0){
                                            var days=data.data.content.days;
                                            var time=data.data.content.time;
                                            var invest_time=data.data.content.invest_time;
                                            var invest_money=data.data.content.invest_money;
                                            var repay_money=data.data.content.repay_money;
                                            var repay_time=data.data.content.repay_time;
                                            var invite_code=data.data.content.invite_code;
                                            var friend_register_time=data.data.content.friend_register_time;
                                            var friend_name=data.data.content.friend_name;
                                            var hongbao_total=data.data.content.hongbao_total;
                                            var coupon_total=data.data.content.coupon_total;
                                            var income_total=data.data.content.income_total;
                                            var more_bank=data.data.content.more_bank;
                                            var is_exchange=data.data.content.is_exchange;
                                            //1
                                            $('.ani span').eq(0).html(time);
                                            $('.ani span').eq(1).html(days);
                                            //2
                                            $('.ani span').eq(2).html(invest_time);
                                            $('.ani span').eq(3).html(repay_time);
                                            $('.ani i').eq(0).html(invest_money);
                                            $('.ani i').eq(1).html(repay_money);
                                            //3
                                            $('.ani span').eq(4).html(friend_register_time);
                                            $('.ani').eq(5).html('<span>'+friend_name+'</span><br>是第一个分享我的秘密的好友');//"我邀请好友<span>'+friend_name+'</span>第一个分享我的秘密"
                                            //4
                                            $('.ani span').eq(6).html(hongbao_total);
                                            $('.ani span').eq(7).html(coupon_total);
                                            //5
                                            $('.ani span').eq(8).html(income_total);
                                            $('.ani span').eq(9).html(more_bank);
                                            $('.six-box img')[0].src='images/content6-title.png';
                                            if(is_exchange==1){
                                                var aa=$('#lotteryContainer canvas')[0];
                                                lottery.maskCtx.drawImage(aa, 0, 0);
                                                lottery.maskCtx.globalCompositeOperation = 'destination-out';
                                                $('.share img').css({display:'block'});
                                            }
                                        }
                                    }
                                }
                            })
                        }else if(data.data.content.usertype==4){
                            for(var i=0;i<5;i++){
                                $('.swiper-slide').eq(i).hide();
                            }
                            $('.six-box img')[0].src='images/content6-title.png';
                            $('.down').hide();
                        }
                    }else{
                        location.href='four.html';
                    }
                }
            }
        }
    })
    //页面
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical',
        mousewheelControl : true,
        onInit: function(swiper){
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
            setTimeout(function(){
                $('.first-bottom-box img')[0].src='images/content1.gif';
            },3000);
        },
        onSlideChangeStart:function(){
            $('.first-bottom-box img')[0].src='images/c1.png';
            $('.first-bottom-box img')[1].src='images/c2.png';
            $('.first-bottom-box img')[2].src='images/c3.png';
            $('.first-bottom-box img')[3].src='images/c4.png';
            $('.first-bottom-box img')[4].src='images/c5.png';
            if(swiper.activeIndex==5){
                $('.down').hide();
            }else {
                $('.down').show();
            }
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper);
            $('.first-bottom-box img')[0].src='images/c1.png';
            var t,t1,t2,t3,t4='';
            t=setTimeout(function(){
                $('.first-bottom-box img')[0].src='images/content1.gif';
            },3000,function(){
                clearTimeout(t);
            });
            $('.first-bottom-box img')[1].src='images/c2.png';
            t1=setTimeout(function(){
                $('.first-bottom-box img')[1].src='images/content2.gif';
            },3000,function(){
                clearTimeout(t1);
            });
            $('.first-bottom-box img')[2].src='images/c3.png';
            t2=setTimeout(function(){
                $('.first-bottom-box img')[2].src='images/content3.gif';
            },3000,function(){
                clearTimeout(t2);
            });
            $('.first-bottom-box img')[3].src='images/c4.png';
            t3=setTimeout(function(){
                $('.first-bottom-box img')[3].src='images/content4.gif';
            },3000,function(){
                clearTimeout(t3);
            });
            $('.first-bottom-box img')[4].src='images/c5.png';
            t4=setTimeout(function(){
                $('.first-bottom-box img')[4].src='images/content5.gif';
            },3000,function(){
                clearTimeout(t4);
            });
        },
        onTransitionEnd: function(swiper){
            swiperAnimate(swiper);
        },
        onSetTransition: function(swiper, speed) {
            for (var i = 0; i < swiper.slides.length; i++){
                es = swiper.slides[i].style;
                es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';

            }
        },
    });
    //刮奖

    function drawPercent(percent) {
        if(percent>=50){
            $.ajax({
                //type: "post",
                //dataType: "json",
                //url:'/exchange-coupon?phone='+phone+'',
                success:function(data){
                    data={
                        "code": 0,
                        "status": "success",
                        "message": "成功",
                        "data": {
                            "result": "success",
                            "msg": "成功",
                            "code": 0,  // 0 成功  -1  失败
                            "content": null
                        }
                    }
                    if(data.code==0){
                        if(data.data.code==0){
                            var aa=$('#lotteryContainer canvas')[0];
                            lottery.maskCtx.drawImage(aa, 0, 0);
                            lottery.maskCtx.globalCompositeOperation = 'destination-out';
                            $('.share img').css({display:'block'});
                        }
                    }
                }
            })
        }
    }
    //share
    $('.share img').on('click',function(){
        $('.mask').fadeIn();
        $('.shareTo').fadeIn();
    })
    $('.shareTo').on('click',function(){
        $('.mask').fadeOut();
        $('.shareTo').fadeOut();
    })
})