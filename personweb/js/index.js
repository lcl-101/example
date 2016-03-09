$(function(){
    var flag=true;
    $(".top-box-r1").click(function(){
        if(!flag){
            return;
        }
        flag=false;
        $(".top-box-list").slideToggle(function(){
            flag=true;
        });
        $(".top-middle").fadeToggle({top:100});
    });
    //轮播手机
    var imgbox=$(".inner");
    var imgs=$(".inner li");
    var imgw=$(imgs).width();
    $(".inner").css({width:"imgw*imgs.length"});
    var flag=true;
    var t=setInterval(move,3000);
    function move(){
        $(imgbox).animate({marginLeft:-imgw},function(){
            $(".inner li:eq(0)").appendTo(imgbox);
            $(imgbox).css({marginLeft:0});
            flag=true;
        });
    }
    function move2(){
        $(".inner li:last").prependTo(imgbox);
        $(imgbox).css({marginLeft:-imgw});
        $(imgbox).animate({marginLeft:0},function(){
            flag=true;
        });
    }
    $(".lefts,.rights").hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,3000);
    });
    $(".lefts").click(function(){
        if(!flag){
            return;
        }
        flag=false;
        move();
    });
    $(".rights").click(function(){
        if(!flag){
            return;
        }
        flag=false;
        move2();
    });
    //电脑轮播
    setInterval(function(){
        var chs=$('.computer-web img').eq(0).height()-180;
        $('.computer-web img').eq(0).animate({marginTop:-chs},5000,function(){
            $('.computer-web img').eq(0).appendTo($('.computer-web'));
            $('.computer-web img').eq(0).css({marginTop:0});
            $('.computer-web img').eq(1).css({marginTop:1129});
        });
    },10000);

    $('.web-img>div').hover(function(){
        var index=$('.web-img>div').index(this);
        $(".web-img>div img").eq(index).css({'max-width':'120%',transition:'all 0.8s ease',opacity:0.7});
    },function(){
        var index=$('.web-img>div').index(this);
        $(".web-img>div img").eq(index).css({'max-width':'100%',transition:'all 0.8s ease',opacity:1});
    })
    //页面跳转
    var tops,tops1,tops2,tops3;
    tops = $('.about-section').offset().top;
    tops1 = $('.Experience').offset().top;
    tops2 = $('.skill').offset().top;
    tops3 = $('.footer').offset().top;
    $(window).resize(function() {
        tops = $('.about-section').offset().top;
        tops1 = $('.Experience').offset().top;
        tops2 = $('.skill').offset().top;
        tops3 = $('.footer').offset().top;
    })
    $(".top-down").click(function(){
        $("body,html").animate({scrollTop: tops - 30});
    })
    $(".top-box-r>ul>li").each(function (index) {
        $(".top-box-r>ul>li").eq(index).click(function () {
            $("body,html").eq(index).animate({scrollTop: tops - 30});
        })
        $(".top-box-r>ul>li").eq(index + 1).click(function () {
            $("body,html").eq(index).animate({scrollTop: tops1});
        })
        $(".top-box-r>ul>li").eq(index + 2).click(function () {
            $("body,html").eq(index).animate({scrollTop: tops2});
        })
        $(".top-box-r>ul>li").eq(index + 3).click(function () {
            $("body,html").eq(index).animate({scrollTop: tops3});
        })
    });
    $(".top-box-list>ul>li").each(function (index) {
        $(".top-box-list>ul>li").eq(index).click(function () {
            $("body,html").eq(index).animate({scrollTop: tops - 30});
        })
        $(".top-box-list>ul>li").eq(index + 1).click(function () {
            $("body,html").eq(index).animate({scrollTop: tops1});
        })
        $(".top-box-list>ul>li").eq(index + 2).click(function () {
            $("body,html").eq(index).animate({scrollTop: tops2});
        })
        $(".top-box-list>ul>li").eq(index + 3).click(function () {
            $("body,html").eq(index).animate({scrollTop: tops3});
        })
    });
    var ch=$(window).height();
    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            $('.back').fadeIn(500);
        } else {
            $('.back').fadeOut(500);
        }
        //about me
        if($(window).scrollTop()>tops-ch/2&&$(window).scrollTop()<tops+ch/2){
            $('.about-section h3').css({
                transform:'translateX(0)',
                opacity:1
            })
            $('.about-section h4').css({
                transform:'translateX(0)',
                opacity:1
            })
            $('.about-section p').css({
                transform:'translateX(0)',
                opacity:1
            })
        }
        if($(window).scrollTop()>tops+ch||$(window).scrollTop()<tops-ch){
            $('.about-section h3').css({
                transform:'translateX(-800px)',
                opacity:0
            })
            $('.about-section h4').css({
                transform:'translateX(-800px)',
                opacity:0
            })
            $('.about-section p').css({
                transform:'translateX(-800px)',
                opacity:0
            })
        }
        //experience
        if($(window).scrollTop()>tops1-ch/2&&$(window).scrollTop()<tops1+ch/2){
            $('.Experience-left').css({
                transform:'translateX(0)',
                opacity:1
            })
            $('.Experience-right').css({
                transform:'translateX(0)',
                opacity:1
            })
        }
        if($(window).scrollTop()>tops1+ch||$(window).scrollTop()<tops1-ch){
            $('.Experience-left').css({
                transform:'translateX(-800px)',
                opacity:0
            })
            $('.Experience-right').css({
                transform:'translateX(800px)',
                opacity:0
            })
        }
    })
    $('.back').click(function () {
        $("body,html").animate({scrollTop: 0});
    })
})