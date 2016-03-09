/**
 * Created by Administrator on 2015/10/2.
 */
    $(function() {
        //xiaoxiaoworld
        $('.wd3').hover(function () {
                $('.mask3').css({transition: 'all 1s ease', width: '300px', height: '150px'})
            },
            function () {
                $('.mask3').css({transition: 'all 1s ease', width: '', height: ''})
            })
        //big-nav
        $(".menu").hover(function () {
            $(".xpnav").css('display', 'block');
        }, function () {
            $(".xpnav").css('display', 'none');
        })
        //samll-nav
        $(".navs1").css({'color': '#E83A93'});
        $(".navs").hover(function () {
            $(".nav li .navs1").css({'color': ''});
        }, function () {
            $(".nav li .navs1").css({'color': '#E83A93'});
        })

        //animation
        $('.aa').each(function(){
            $(this).hover(function(){
                $(this).find('div').css({'-webkit-animation':'quxian 4s linear infinite'})
            },function(){
                $(this).find('div').css({'-webkit-animation':''})
            });
        });

        //img-shade
        var flag = true;
        $(".webpages li").hover(function () {
            if (!flag) {
                return;
            }
            flag = false;
            var index = $(".webpages li").index(this);
            $($('.mask2')[index]).animate({top: 0}, 1000, function () {
                flag = true;
            })
        }, function () {
            var index = $(".webpages li").index(this);
            $($('.mask2')[index]).animate({top: -220}, 1000, function () {
                flag = true;
            })
        });

//轮播
        var imgbox = $(".img-box");
        var img = $(".img-box li");
        lunbo(1);
        function lunbo(num) {
            var imgbW = $(img).width();
            var flag = true;
            var imgbL = img.length;
            imgbox.css("width", imgbL * imgbW);
            var t = setInterval(move, 3000);
            function move() {
                $(imgbox).animate({marginLeft: -imgbW * num}, 600, function () {

                    for (var i = 0; i < num; i++) {
                        $(".img-box li").first(i).appendTo(imgbox);
                    }
                    $(imgbox).css({marginLeft: 0});
                    flag = true;
                });
            }

            function move2() {
                for (var i = 0; i < num; i++) {
                    $(".img-box li").last(i).prependTo(imgbox);
                }
                $(imgbox).css({marginLeft: -imgbW * num});
                $(imgbox).animate({marginLeft: 0}, 600, function () {
                    flag = true;
                });
            }

            $(".left,.right").hover(function () {
                clearInterval(t);
            }, function () {
                t = setInterval(move, 3000)
            });
            $(".left").click(function () {
                if (!flag) {
                    return;
                }
                flag = false;
                move();
            });

            $(".right").click(function () {
                if (!flag) {
                    return;
                }
                flag = false;
                move2();
            })
            $(img).hover(function(){
                clearInterval(t);
            },function(){
                t=setInterval(move,1000);
            })

        }

      //电商

        $('.wd16').css({
            opacity: 0
        });
        $('.ds').each(function(){
            $(this).hover(function () {
                 var that=this;
                 $(that).find('.wd16').css({'transform': 'translate(0,0)',opacity: 1})
                },
                function () {
                    var that=this;
                    $(that).find('.wd16').css({'transform': 'translate(0,90px)',opacity: 0})
                });
        })

        //AboutMe

        window.onscroll=function() {
            var doc = document.body.scrollTop ? document.body : document.documentElement;
            var infom=$(".information");
            var numform=$(infom).offset().top;
            var aboutme=$(infom).height();
            $('.myhead').each(function (index, obj) {
                if (doc.scrollTop>=(numform-aboutme)) {
                    $(this).css({'transform': 'translate(0,0)'})
                }
                else{
                    $(this).css({'transform': 'translate(-100px,0)'})
                }
            });
            $('.myintroduce').each(function (index, obj) {
                if (doc.scrollTop >= (numform-aboutme)) {
                    $(this).css({'transform': 'translate(0,0)'})
                }
                else{
                    $(this).css({'transform': 'translate(300px,0)'})
                }
            })
            //返回顶部
            $('.top').click(function(){
                doc.scrollTop=0;
            })
            //固定导航
            var navstop=$('.nav2').offset().top;
            if (doc.scrollTop >= navstop+200) {
                $('.fixeds').css({'display': 'block'})
            }
            else{
                $(this).css({'display': 'none'})
            }
            //导航跳转
        var tiao1=$('.tiao1').offset().top;
        $('.navskill').click(function(){
            doc.scrollTop=tiao1-50;
        })
        var tiao2=$('.tiao2').offset().top;
        $('.navworks').click(function(){
            doc.scrollTop=tiao2-50;
        })

         var tiao3=$('.tiao3').offset().top;
            $('.navabout').click(function(){
                doc.scrollTop=tiao3-50;
            })
         var tiao4=$('.tiao4').offset().top;
            $('.navcontact').click(function(){
                doc.scrollTop=tiao4-50;
            })

        }


    })
