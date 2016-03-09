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
    $("#click").click(function(){
        var h=$(this).height();
        if(flag){
            $('#click').find('div').css({
                transition:'all 1s ease',
                transform:"rotate(90deg)"
            });
            $(".list1>li").css({
                transition:'all 1s ease',
                height:h,
                opacity:1,
            })
            flag=false;
        }else{
            $('#click').find('div').css({
                transition:'all 1s ease',
                transform:"rotate(0deg)"
            });
            $(".list1>li").css({
                transition:'all 1s ease',
                height:0,
                opacity:0,
            })
            flag=true;
        }

    })
})