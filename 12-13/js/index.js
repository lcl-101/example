$(function(){
    $('.message').hover(function(){
        var index=$('.message').index(this);
        $('.message span').eq(index).stop(true,false).animate({right:'0px',opacity: 1},600);
    },function(){
        $('.message1').animate({right:'-300px',opacity: 0},600);
    });
    $('.about-img1').on('click',function(){
        $("body").animate({scrollTop:0});
    });
    $('.about-img3').hover(function(){
        $('.about-left').stop(true,false).animate({right:0,opacity:1},600);
    },function(){
        $('.about-left').animate({right:'-200px',opacity:0},600);
    });
})