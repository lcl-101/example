$(function(){
    var islogin = $("#islogin").val();
    islogin=1;
    //签到
    var dateobj=new Date();
    var datas=dateobj. getDate();
    datas=datas-3;
    function qiandao(){
        var swiper = new Swiper('.swiper-container', {
            initialSlide:datas,
            direction: "horizontal",
            pagination: '.swiper-pagination',
            paginationClickable: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 5,
            spaceBetween: 50,
            hashnav: true,
            breakpoints: {
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 0
                },
                768: {
                    slidesPerView: 5,
                    spaceBetween: 0
                },
                640: {
                    slidesPerView: 5,
                    spaceBetween: 0
                },
                320: {
                    slidesPerView: 5,
                    spaceBetween: 0
                }
            }
        });
    }
    $.ajax({
        type: "post",
        dataType: "text",
        //url:'http://apptest2.wangcaigu.cn/active/sign16/sign-calendar',
        success: function (data) {
            data={
                "code": 200,
                "calendar": {
                    "20151129": {
                        "zhWeek": "星期日",  //当天为周几
                        "currentDay": true,   //是否为今天
                        "continueDayAward": false,  //是否显示每5天蓝圈
                        "continueMonthAward": false, //是否显示月底奖杯
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-01"

                    },
                    "20151130": {
                        "zhWeek": "星期一",
                        "currentDay": true,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-02"
                    },
                    "20151201": {
                        "zhWeek": "星期二",
                        "currentDay": true,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-03"
                    },
                    "20151202": {
                        "zhWeek": "星期三",
                        "currentDay": true,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-04"
                    },
                    "20151203": {
                        "zhWeek": "星期四",
                        "currentDay": false,
                        "continueDayAward": true,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-05"
                    },
                    "20151204": {
                        "zhWeek": "星期五",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":true,
                        "isSign":true,
                        "signDate":"12-06"
                    },
                    "20151205": {
                        "zhWeek": "星期六",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":true,
                        "isSign":true,
                        "signDate":"12-07"
                    },
                    "20151206": {
                        "zhWeek": "星期日",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-08"
                    },
                    "20151207": {
                        "zhWeek": "星期一",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-09"
                    },
                    "20151208": {
                        "zhWeek": "星期二",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-10"
                    },
                    "20151209": {
                        "zhWeek": "星期三",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-11"
                    },
                    "20151210": {
                        "zhWeek": "星期四",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-12"
                    },
                    "20151211": {
                        "zhWeek": "星期五",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":true,
                        "isSign":true,
                        "signDate":"12-13"
                    },
                    "20151212": {
                        "zhWeek": "星期六",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":true,
                        "isSign":true,
                        "signDate":"12-14"
                    },
                    "20151213": {
                        "zhWeek": "星期日",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-15"
                    },
                    "20151214": {
                        "zhWeek": "星期一",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-16"
                    },
                    "20151215": {
                        "zhWeek": "星期二",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-17"
                    },
                    "20151216": {
                        "zhWeek": "星期三",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-18"
                    },
                    "20151217": {
                        "zhWeek": "星期四",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-19"
                    },
                    "20151218": {
                        "zhWeek": "星期五",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":true,
                        "isSign":true,
                        "signDate":"12-20"
                    },
                    "20151219": {
                        "zhWeek": "星期六",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":true,
                        "isSign":true,
                        "signDate":"12-21"
                    },
                    "20151220": {
                        "zhWeek": "星期日",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-22"
                    },
                    "20151221": {
                        "zhWeek": "星期一",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-23"
                    },
                    "20151222": {
                        "zhWeek": "星期二",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-24"
                    },
                    "20151223": {
                        "zhWeek": "星期三",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-25"
                    },
                    "20151224": {
                        "zhWeek": "星期四",
                        "currentDay": true,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-26"
                    },
                    "20151225": {
                        "zhWeek": "星期五",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":true,
                        "isSign":true,
                        "signDate":"12-27"
                    },
                    "20151226": {
                        "zhWeek": "星期六",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":true,
                        "isSign":true,
                        "signDate":"12-28"
                    },
                    "20151227": {
                        "zhWeek": "星期日",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-29"
                    },
                    "20151228": {
                        "zhWeek": "星期一",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-30"
                    },
                    "20151229": {
                        "zhWeek": "星期二",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": true,
                        "currentMonth":true,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-31"
                    },
                    "20151230": {
                        "zhWeek": "星期三",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":false,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-01"
                    },
                    "20151231": {
                        "zhWeek": "星期四",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":false,
                        "isWeekend":false,
                        "isSign":true,
                        "signDate":"12-02"
                    },
                    "20160101": {
                        "zhWeek": "星期五",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":false,
                        "isWeekend":true,
                        "isSign":true,
                        "signDate":"12-03"
                    },
                    "20160102": {
                        "zhWeek": "星期六",
                        "currentDay": false,
                        "continueDayAward": false,
                        "continueMonthAward": false,
                        "currentMonth":false,
                        "isWeekend":true,
                        "isSign":true,
                        "signDate":"12-04"
                    }
                },
                "current_day": "20151224",
                "draw_num": "1",
                "signday":'10'
            }
            var current_day=data.current_day;
            var yue=current_day.slice(4,6);
            yue=(yue.substring(0,1)==0)? yue.slice(1,2) :yue;
            $('.month').html(yue+'月');
            if(data.code==200){
                var html='';
                var content='';
                var signday=data.signday;  //连续签到数
                $.each(data.calendar,function(i,item){
                    var signDate=item.signDate;
                    //var yue=signDate.slice(0,2);
                    //yue=(yue.substring(0,1)==0)? yue.slice(1,2) :yue;
                    //$('.month').html(yue+'月');
                    var currentDay=item.currentDay;     //是否为今天
                    var continueDayAward=item.continueDayAward;  //是否显示每5天蓝圈
                    var continueMonthAward=item.continueMonthAward; //是否显示月底奖杯
                    var currentMonth=item.currentMonth; // 是否是当月
                    var qiandao1 = (currentDay==true)?"qiandao":"";
                    var showis=(currentMonth==true)?"":"show";
                    var cup1=(continueMonthAward==true)?'<img src="images/cup.png" alt="">':'<div class="'+qiandao1+' '+showis+'"></div> <span>';
                    //签到日历日
                    if(continueDayAward==true){
                        html+='<div class="swiper-slide '+showis+'"> <img src="images/star.png" alt="" ><span>'+signDate+'<p>+1抽奖机会</p></span></div>';
                    }else {
                        html+='<div class="swiper-slide '+showis+'"> '+cup1+' <span class="'+showis+'">'+signDate+'</span></div>';
                    }
                    //签到日历
                    var isWeekend=item.isWeekend;   //是否是周末
                    var monthred=(isWeekend==true)?"month-red":"";
                    var monthhui1=(currentMonth==true)?"":"month-hui";
                    var qiandaohou1 = (currentDay==true)?"qiandaohou":"";
                    var cups1=(continueMonthAward==true)?'cups':'';
                    signDate=signDate.slice(3,5);
                    signDate=(signDate.substring(0,1)==0)? signDate.slice(1,2) :signDate;
                    if(continueDayAward==true){
                        content+='<li class="'+cups1+' '+monthred+' '+monthhui1+'"><div class="qiandaofive">'+signDate+' <img class="starts" src="images/stars.png" alt=""></div></li>'
                    }else {
                        content+='<li class="'+cups1+' '+monthred+' '+monthhui1+'"><div class="'+qiandaohou1+'">'+signDate+'</div></li>';
                    }
                })
                $('#calender-qiandao i').html(signday);
                $('#rili').html(html);
                $('#month-day').html(content);
                qiandao();
                $('#drawnum span').html(data.draw_num);
            }
        }
    })
    //签到轮播
    $.ajax({
        type: "post",
        dataType: "text",
        //url:'http://apptest2.wangcaigu.cn/active/sign16/draw-award-show',
        success: function (data) {
            data= {
                "code": 200,
                "records": [
                    {
                        "username": "licai_231",
                        "award": "加湿器"
                    },
                    {
                        "username": "licai_231",
                        "award": "日历"
                    }
                ]
            }
            if(data.code==200){
                var html='';
                $.each(data.records,function(i,item){
                    var username=item.username;
                    var award=item.award;
                    html+='<div class="sounds"><span>'+username+'</span> <i>刚刚获取了</i> <em>'+award+'</em></div>'
                })
                $('.sound-box').html(html);
            }else if(data==404){

            }
        }
    })
    //小熊
    var num=0;
    setInterval(function(){
        num++;
        if(num>1){
            num=0;
        }
        $('.shan img').eq(0).css({display:'none'});
        $('.shan img').eq(1).css({display:'none'});
        $('.shan img').eq(num).css({display:'block'});
    },500)

    //日历
    $('.qiandao-btn').on('click',function(){
        $('.calendar-box').css({display:'block'});
        $('.calender').css({display:'none'});
    })
    $('.calendar-close').on('click',function(){
        $('.calendar-box').css({display:'none'});
        $('.calender').css({display:'block'});
    })

    //sounds
    setInterval(function(){
        $('.sounds').eq(0).animate({marginTop:'-50px'},1000,function(){
            $('.sounds').eq(0).css({marginTop:0});
            $('.sounds').eq(0).appendTo($('.sound-box'));
        })
    },3000)

    //close-yu
    $('.yu-close').on('click',function(){
        $('.hide-box').css({display:'none'});
        $('.mask').css({display:'none'});

    })
    //虚拟物品
    $('.juans').on('click',function(){
        $('.hide-box').css({display:'none'});
        $('.tan-juan-box').css({display:'block'});
    })
    $('.tan-juan-box').on('click',function(){
        $('.mask').css({display:'none'});
        $('.tan-juan-box').css({display:'none'});
    })
    $('#linqu').on('click',function(){
        $('.mask').css({display:'none'});
        $('.tan-yun-box').css({display:'none'});
    })
    //实物
    $('.shiwu').on('click',function(){
        $('.hide-box').css({display:'none'});
        $('.tan-dizhi').css({display:'block'});
    })
    //摇一摇
    var myShakeEvent = new Shake({
        threshold: 15
    });

    myShakeEvent.start();
    window.addEventListener('shake', shakeEventDidOccur, false);

    var draws=''
    function shakeEventDidOccur () {
        $.ajax({
            type: "post",
            dataType: "text",
            //url:'http://apptest2.wangcaigu.cn/active/sign16/draw',
            success: function (data) {
                data={
                    "code": 200,
                    "msg": "很遗憾,您未中奖",
                    "draw": 0,
                    "draw_num": 98,
                    "award": false,
                    "real": false,
                    "award_name": "2016限量版台历",
                    "award_img": "images/juan5.png",
                    "more_chance": false
                }
                if(data.code==100){
                    location.href='';
                }else if(data.code==101) {
                    $('#drawnum span').html(data.draw_num);
                }else if(data.code==200){
                    $('.mask').css({display:'block'});
                    $('.tan-yu-box').css({display:'block'});
                    $('#drawnum span').html(data.draw_num);
                    $('.tan-yu div').html('好可惜~');
                }else if(data.code==201) {
                    $('.mask').css({display:'block'});
                    $('.tan-juan-content span').html(data.award_name);
                    $('.tan-twenty-juan')[2].src=data.award_img;
                    $('.tan-yun-box').css({display:'block'});
                    $('#tan-juan-content').html(data.award_name);
                    $('#drawnum span').html(data.draw_num);
                }else if(data.code==202){
                    $('.mask').css({display:'block'});
                    $('.tan-juan-content span').html(data.award_name);
                    $('.tan-twenty-juan')[1].src=data.award_img;
                    $('.tan-taili-box').css({display:'block'});
                    $('#drawnum span').html(data.draw_num);
                    draws=data.draw;
                }else if(data.code==203){
                    $('.mask').css({display:'block'});
                    $('.tan-juan-content span').html(data.award_name);
                    $('.tan-twenty-juan')[0].src=data.award_img;
                    $('.tan-ten-box').css({display:'block'});
                    $('#tan-juan-content').html(data.award_name);
                    $('#drawnum span').html(data.draw_num);
                }
                if(data.draw==0){
                    $('.mask').css({display:'block'});
                    $('.tan-yu-box').css({display:'block'});
                    $('#drawnum span').html(data.draw_num);
                    $('.tan-yu div').html('没有抽奖机会了~');
                    alert(1);
                }
                window.removeEventListener('shake', shakeEventDidOccur, false);
            }
        })
    }


    //提交地址
    $('.tan-dizhi-btn').on('click',function(){
        var username;//姓名
        var mobile;//手机号
        var address;//验证码
        username = $("#txt_username").val();
        mobile = $("#txt_mobile").val();
        address = $("#txt_address").val();
        if($.trim(username)=="" || $.trim(mobile)=="" || $.trim(address)==""){

        }else{
            $.ajax({
                type: 'GET',
                //url: "http://apptest2.wangcaigu.cn/active/sign16/save-draw-address",
                //data: {username:username,mobile:mobile,address:address,draws:draws},
                dataType: 'text',
                success: function(data) {
                    data={
                        "code": 200,
                        "msg": "您还未登陆,请先登陆"
                    }
                    if(data.code==200){
                        $('.tan-dizhi').css({display:'none'});
                        $('.mask').css({display:'none'});
                    }else{

                    }
                }
            })
        }
    })
    if(islogin=="0"){
        location.href='';
    }
})