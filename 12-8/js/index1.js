$(function(){
    //nav
    $('.nav li a').on('click',function(){
        var index=$('.nav li a').index(this);
        $('.nav li a').removeClass('nav-click');
        $('.nav li a').eq(index).addClass('nav-click');
    });
    //轮播图
    $(".banner-box div").css({display:'none'});
    $(".banner-box div").eq(0).css({display:'block'});
    $('.banner-btn1 li div').eq(0).css({opacity:1});
    var lengths=$('.banner-btn li').length;
    var t=setInterval(move,5000);
    var index=0;
    var next=0;
    var flag=true;
    function move(){
        //if(!flag){
        //    return;
        //}
        next++;
        if(next==lengths){
            next=0;
        }
        //flag=false;
        $(".banner-box div").eq(index).fadeOut();
        $(".banner-box div").eq(next).fadeIn();
        $('.banner-btn1 li div').css({opacity:0.6});
        $('.banner-btn1 li div').eq(next).css({opacity:1});
        index=next;
    }

    $(".banner-box").hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,5000);
    });
    $(".banner-content").hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,5000);
    });
    $('.banner-btn1 li').hover(function(){
        clearInterval(t);
            var that=$('.banner-btn1 li').index(this);
            if(index==that){
                return;
            }
            $(".banner-box div").eq(index).stop(true,false).fadeOut();
            $(".banner-box div").eq(that).stop(true,false).fadeIn();
            $('.banner-btn1 li div').css({opacity:0.6});
            $('.banner-btn1 li div').eq(that).css({opacity:1});

            index=next=that;

    },function(){
        t=setInterval(move,5000);
    })
    //应收标
    //$('.yingshou').hover(function(){
    //    var index=$('.yingshou').index(this);
    //    $('.yingshou').eq(index).css({border:"1px solid #ff9800",boxShadow: "5px 5px 10px #dddddd",top:'-2px'});
    //},function(){
    //    var index=$('.yingshou').index(this);
    //    $('.yingshou').eq(index).css({border:"1px solid #e4e4e8",boxShadow: "",top:0});
    //})
    //news
    //$('.news-left-img').hover(function(){
    //    $('.news-left-img img').css({'max-width':'110%',left:'-10px'});
    //},function(){
    //    $('.news-left-img img').css({'max-width':'100%',left:0});
    //})

    //理财公告轮播图
    var ts=setInterval(move1,2000);
    function move1(){
        if(!flag){
            return;
        }
        flag=false;
        $('.licai-lunbo div').eq(0).animate({marginTop:'-20px'},1000,function(){
            $('.licai-lunbo div').eq(0).css({marginTop:0});
            $('.licai-lunbo div').eq(0).appendTo($('.licai-lunbo'));
            flag=true;
        })
    }
    $('.licai-lunbo div').hover(function(){
        clearInterval(ts);
    },function(){
        ts=setInterval(move1,2000);
    });
    //应收标轮播图
    var imgbox=$(".yingshou-inner1");
    var imgs=$(".yingshou-inner1 li");
    var imgw=$(imgs).width();   //获取单个应收标的宽度
    $(".yingshou-inner1").css({width:imgw*imgs.length});  //ul的总宽度
    //var flag=true;
    imgw=imgw*3;
    var yw=$(".yingshou-inner1").width();   //获取ul的总宽度
    var num=(yw-0.01)/imgw;    //计算有几个块
    for(var i=0;i<num;i++){
        var lis=$('<li></li>');  //创建小点
        $(lis).appendTo($('.yingshou-btn-box'));
    }
    var lisw=$('.yingshou-btn-box li').width()*$('.yingshou-btn-box li').length;
    $('.yingshou-btn-box').css({width:lisw+(num+1)*14});   //计算包小点的ul的宽度
    if(Math.floor(num)==0){
        $('.y-lefts').hide();
        $('.y-rights').hide();
    }
    var currentindex=0;
    if(currentindex==0){
        $('.y-lefts').hide();
    }
    $('.yingshou-btn-box li').eq(0).css({background:'#99999d'});
    $('.y-rights').on('click',function(){
        //if(!flag){
        //    return;
        //}
        //flag=false;
        currentindex++;
        $('.yingshou-btn-box li').css({background:'#d5d5d8'});
        $('.yingshou-btn-box li').eq(currentindex).css({background:'#99999d'});
        if(currentindex>0){
            $('.y-lefts').show();
        }
        console.log(Math.floor(num))
        console.log(currentindex);
        if(currentindex==Math.floor(num)){
            $('.y-rights').hide();
        }
        $(imgbox).stop(true,false).animate({marginLeft:-imgw*currentindex},500);
    });
    $('.y-lefts').on('click',function(){
        //if(!flag){
        //    return;
        //}
        //flag=false;
        currentindex--;
        $('.yingshou-btn-box li').css({background:'#d5d5d8'});
        $('.yingshou-btn-box li').eq(currentindex).css({background:'#99999d'});
        if(currentindex==0){
            $('.y-lefts').hide();
        }
        if(currentindex<Math.floor(num)){
            $('.y-rights').show();
        }
        $(imgbox).stop(true,true).animate({marginLeft:-imgw*currentindex},500);
    });
    $('.yingshou-btn-box li').on('click',function(){
        var index=$('.yingshou-btn-box li').index(this);
        $('.yingshou-btn-box li').css({background:'#d5d5d8'});
        $('.yingshou-btn-box li').eq(index).css({background:'#99999d'});
        $(imgbox).stop(true,true).animate({marginLeft:-imgw*index},500);
        if(index>0){
            $('.y-lefts').show();
        }
        if(index==Math.floor(num)){
            $('.y-rights').hide();
        }
        if(index==0){
            $('.y-lefts').hide();
        }
        if(index<Math.floor(num)){
            $('.y-rights').show();
        }
        currentindex=index;
    });
    //about
    $(function(){
        $('.message').hover(function(){
            var index=$('.message').index(this);
            $('.message span').eq(index).stop(true,false).animate({right:'0px',opacity: 1},600);
        },function(){
            $('.message1').animate({right:'-300px',opacity: 0},600);
        })
    })
    $('.about-img1').on('click',function(){
        $("body,html").animate({scrollTop:0});
    })

    $('.footer-weixin').hover(function(){
        $('.footer-weixin-code').css({display:'block'});
    },function(){
        $('.footer-weixin-code').css({display:'none'});
    })

    //进度条
    var tops,tops1,tops2;
    tops = $('#new-box .new-jindutiao1').offset().top;
    tops1 = $('#tuijian .new-jindutiao1').offset().top;
    tops2 = $('.yingshou-jindutiao1').offset().top;
    var ch=$(window).height();
    var num1=0;
    var num2=0;
    var num3=0;
    var t;
    var Top=$(window).scrollTop();
    $(window).scroll(function () {
        if($(window).scrollTop()>(tops-ch)){
            var progressbar1=$('#new-box .new-jindutiao1').attr('progressbar');
            scrollbar1(progressbar1);
        }
        if($(window).scrollTop()>(tops1-ch)){
            var progressbar2 = $('#tuijian .new-jindutiao1').attr('progressbar');
            scrollbar2(progressbar2);
        }
        if($(window).scrollTop()>(tops2-ch)){
            for(var i=0;i<$('.yingshou-jindutiao1').length;i++){
                var bars=$('.yingshou-jindutiao1').eq(i).attr('progressbar');
                scrollbar3(bars,i,num3);
            }
        }
    })
    if(Top>tops||Top>tops1||Top>tops2){
        var progressbar1=$('#new-box .new-jindutiao1').attr('progressbar');
        var progressbar2 = $('#tuijian .new-jindutiao1').attr('progressbar');
        scrollbar1(progressbar1);
        scrollbar2(progressbar2);
        for(var i=0;i<$('.yingshou-jindutiao1').length;i++){
            var bars=$('.yingshou-jindutiao1').eq(i).attr('progressbar');
            if(num3!=101){
                scrollbar3(bars,i,num3);
            }

        }
    }
    function scrollbar1(bar1){
        if(bar1!=undefined&&bar1!=0&&bar1!=''){
            $('.new-jindutiao1').eq(0).animate({width:bar1+'%'},1000);
            var t2=setInterval(function(){
                num1++;
                if(num1>bar1){
                    clearInterval(t2);
                    return;
                }
                $('.new-left-jindu span').eq(0).html(num1+'%');
            },15)
        }
    }
    function scrollbar2(bar2){
        if(bar2!=undefined&&bar2!=0&&bar2!=''){
            var t1=setInterval(function(){
                num2++;
                if(num2>bar2){
                    clearInterval(t1);
                    return;
                }
                $('.new-left-jindu span').eq(1).html(num2+'%');
            },15)
            $('.new-jindutiao1').eq(1).animate({width:bar2+'%'},1000);
        }
    }
    function scrollbar3(progressbars,index,num){
        if(progressbars!=undefined&&progressbars!=0&&progressbars!=''){
            var nums=Math.round(progressbars);
            $('.yingshou-jindutiao1').eq(index).animate({width:nums+'%'},1000);
            t=setInterval(function(){
                num++;
                if(num>nums){
                    clearInterval(t);
                    num3=101;
                    return;
                }
                $('.yingshou-jindu span').eq(index).html(num+'%');
            },15)
        }
    }
})