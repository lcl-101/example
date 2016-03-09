$(function(){
    $('.seven-all').hover(function(){
        var index=$('.seven-all').index(this);
        $('.seven-all').eq(index).css({opacity:1});
        $('.seven-dian1').eq(index).css({'-webkit-transform':'scale(2,2)'});
        $('.seven-one-title').eq(index).css({'-webkit-transform':'scale(1.2,1.2)'});
    },function(){
        var index=$('.seven-all').index(this);
        $('.seven-all').eq(index).css({transition: 'all 0.5s ease',opacity:0.5});
        $('.seven-dian1').eq(index).css({transition: 'all 0.5s ease','-webkit-transform':'scale(1,1)'});
        $('.seven-one-title').eq(index).css({transition: 'all 0.5s ease','-webkit-transform':'scale(1,1)'});
    })

    var w=$(window).width();
    $('.eleven-left').on('click',function(){
        $('.slide').eq(0).stop(false,true).animate({marginLeft:0});
    });
    $('.eleven-right').on('click',function(){
        $('.slide').eq(0).stop(false,true).animate({marginLeft:-w},function(){
            $('.eleven-box-top1').eq(1).addClass('eleven-box-tops1');
            $('.eleven-box-top2').eq(1).addClass('eleven-box-tops2');
            $('.eleven-box-top3').eq(1).addClass('eleven-box-tops3');
            $('.eleven-box-top4').eq(1).addClass('eleven-box-tops4');
            $('.eleven-box-bottom1').eq(1).addClass('eleven-box-bottoms1');
            $('.eleven-box-bottom2').eq(1).addClass('eleven-box-bottoms2');
            $('.eleven-box-bottom3').eq(1).addClass('eleven-box-bottoms3');
            $('.eleven-box-bottom4').eq(1).addClass('eleven-box-bottoms4');
        });
    });
    $('.eleven-left').hover(function(){
        $('.eleven-left').css({background:'url("images/left1.png")no-repeat 0 0','background-size':' 40px'});
    },function(){
        $('.eleven-left').css({background:'url("images/left.png")no-repeat 0 0','background-size':' 40px'});
    })
    $('.eleven-right').hover(function(){
        $('.eleven-right').css({background:'url("images/right1.png")no-repeat 0 0','background-size':' 40px'});
    },function(){
        $('.eleven-right').css({background:'url("images/right.png")no-repeat 0 0','background-size':' 40px'});
    })
})