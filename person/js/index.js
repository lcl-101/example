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
        $(".top-middle").fadeToggle({top:100})
    })
    $(".skills-inner .row div div").css({display:"none"});
    $(window).scroll(function(){
        var doc=document.body.scrollTop?document.body:document.documentElement;
        var val=doc.scrollTop;
        if(val>700){
            //$(".skills-inner .row div div").css({display:"block"});
            $(".skills-inner .row div div").fadeIn("slow");
        }
    })

    $(".in-grid1").bind("mouseenter",function(){
        $(this).find(".mask").css({
            transition:"all 0.6s ease",
            marginTop:0
        });
        $(this).find(".mask1").css({
            transition:"all 0.6s ease",
            marginTop:0
        });
    })
    $(".in-grid1").bind("mouseleave",function(){
        $(this).find(".mask").css({
            transition:"all 0.6s ease",
            marginTop:-200
        });
        $(this).find(".mask1").css({
            transition:"all 0.6s ease",
            marginTop:-200
        });
    })

    $(".ps-inner1>div").bind("mouseenter",function(){
        $(this).find(".zhezao").css({
            transition:"all 0.9s ease",
            width:'100%',
            height:'100%'
        });
        $(this).find(".zhezao1").css({
            transition:"all 0.9s ease",
            display:'block',
            width:'100%',
            height:'100%'
        });
        $(this).find(".z-inner").css({
            transition:"all 0.9s ease",
            color:'white',
            border:"2px solid white"

        })
    })
    $(".ps-inner1>div").bind("mouseleave",function(){
        $(this).find(".zhezao").css({
            transition:"all 0.9s ease",
            width:0,
            height:0
        });
        $(this).find(".zhezao1").css({
            transition:"all 0.9s ease",
            display:'none',
            width:0,
            height:0
        });
        $(this).find(".z-inner").css({
            transition:"all 0.9s ease",
            color:'transparent',
            border:"2px solid transparent"

        })
    })
    var ch=$(document).height();
    $(".z-inner").click(function(){
        var index=$(".z-inner").index(this);
        $(".mask2").css({
            transition:"all 0.9s ease",
            width:'100%',
            height:ch
        });
        $("body").css({
            overflowY:"hidden"
        });


        //ÂÖ²¥
        var cw=$(document).width();
        var ch=$(document).height();
        $(".lunbo").css({marginLeft:cw});
        var iw=$(".lunbo").eq(0).width();
        var t=setInterval(move,2000);
            function move(){
                $(".lunbo").eq(index).animate({marginLeft:(cw-800)/2,width:'800px'},2000,function(){
                    $(this).animate({marginLeft:-cw+1000,width:0},2000,function(){
                        $(".lunbo").css({marginLeft:cw});
                    }).appendTo($(".ps-design"));
                });
            }

    });

})