$(function(){
    //$(".challenge-lf img").mouseover(function(){ //
    //
    //    $(".lef-mask").animate({width:404},1000);
    //})
    //var flag=true;
    //$('.challenge-lf').hover(function(){
    //    if(!flag){
    //        return;
    //    }
    //    flag=false;
    //    $(".lef-mask").animate({width:434},1000,function(){
    //        flag=true;
    //    });
    //},function(){
    //    $(".lef-mask").animate({width:0},1000);
    //})
    //var flag=true;
    $('.challenge-lf').bind('mouseenter',function(){
        //if(!flag){
        //    return;
        //}
        //flag=false;
        alert($(".lef-mask"));
        $(".lef-mask").animate({width:434},500,function(){
            //flag=true;
        });
    })
    $('.challenge-lf').bind('mouseleave',function(){
        $(".lef-mask").animate({width:0},1000,function(){
            //flag=true;
        });
    })


})