/**
 * Created by lcl on 2015/10/10.
 */
$(function () {
    var lists=$("ul[data-role=list][list-style=horizontal]");
    lists.each(function (index,obj) {
        var li=$(obj).children("li");
        li.css({width:100/li.length+"%",float:"left"});
    })
    var flag=true;
    $(".title li:nth-last-child(1)").click(function(){
        var h=$(this).height();
        if(flag){
            $('.title').find("div").css({
                transition:'all 1s ease',
                transform:"rotate(180deg)"
            });
            $(".title1>li").css({
                transition:'all 1s ease',
                height:h+10,
                opacity:1,
                padding:'0.3rem'
            })
            flag=false;
        }else{
            $('.title').find("div").css({
                transition:'all 1s ease',
                transform:"rotate(0deg)"
            });
            $(".title1>li").css({
                transition:'all 1s ease',
                height:0,
                opacity:0,
                padding:0
            })
            flag=true;
        }
    })
    //var imgbox=$(".inner");
    //var imgs=$(".inner li img");
    //var imgw=$(imgs).width();
    //var imgh=$(imgs).height();
    //$(".box").css({width:imgw,height:imgh});
    //$(".inner").css({width:"imgw*imgs.length"});
    //var t=setInterval(move,3000);
    //function move(){
    //    $(imgbox).animate({marginLeft:-imgw},function(){
    //        $(".inner li:first-child").appendTo(imgbox);
    //        $(imgbox).css({marginLeft:0});
    //    });
    //}
})