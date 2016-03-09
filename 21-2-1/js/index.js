$(function(){
    var flag=true;
    var ts=setInterval(move1,1);
    function move1(){
        if(!flag){
            return;
        }
        flag=false;
        $('#fanOne div').eq(0).animate({marginTop:'-37px'},1000,'linear',function(){
            $('#fanOne div').eq(0).css({marginTop:0});
            $('#fanOne div').eq(0).appendTo($('#fanOne'));
            flag=true;
        })
    }
    $('#fanOne').hover(function(){
        clearInterval(ts);
    },function(){
        ts=setInterval(move1,1);
    });
})