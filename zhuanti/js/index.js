$(function(){
    var img=$(".computer-content img");
    $('.computer-content img').css({opacity:0});
    $('.computer-content img').eq(0).css({opacity:1});
    $('.btn').eq(0).css({background:'#28a7e1',color:'#fff'});
    var index=0;
    var next=0;
    var flag=true;
    var t=setInterval(move,3000);
    function move(){
        next++;
        if(next==img.length){
            next=0;
        }
        $(img).eq(index).animate({opacity:0},1000);
        $(img).eq(next).animate({opacity:1},1000);
        $('.btn').css({background:'#e5e5e5',color:'#595757'});
        $('.btn').eq(next).css({background:'#28a7e1',color:'#fff'});
        index=next;
    }
    $('.btn').hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,3000);
    })
    $('.btn').bind('click',function(){
        var index=$('.btn').index(this);
        $('.btn').css({background:'#e5e5e5',color:'#595757'});
        $('.btn').eq(index).css({background:'#28a7e1',color:'#fff'});
        $(img).css({opacity:0});
        $(img).eq(index).css({opacity:1});
        next=index;
    })
})