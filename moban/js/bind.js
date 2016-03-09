/**
 * Created by lcl on 2015/11/22.
 */
$(function(){
    alertTrueAndFalse('.yanzhengma',function(){
        alert('true');
    },function(){
        alert('false');
    });

    //有确定取消的弹窗
    function alertTrueAndFalse(btn,tured,falsed){
        $(btn).on('click',function(){
            var tishi=$('<div class="mask" style="display: block"></div> <div class="bing-info"> <div class="bing-tishi">提示</div> <p>绑定的银行卡将作为唯一充值，提现银行卡</p> <div class="bind-btn"> <span class="bind-xian">取消</span> <span>确定</span> </div> </div>');
            $(tishi).insertAfter($('form'));
            $('.bind-btn span').on('click',function(){
                var index= $('.bind-btn span').index(this);
                if(index==1){
                    $(tishi).remove();
                    tured();
                }else if(index==0){
                    $(tishi).remove();
                    falsed();
                }
            });
        });
    }

    //没有遮罩的弹窗
    //toast('.notice','您输入的卡号有误');
    function toast(btn,val){
        $(btn).on('click',function(){
            var kahao=$('<div class="error-info" style="display: block">'+val+'</div>');
            $(kahao).insertAfter($('form'));
            setTimeout(function(){
                $(kahao).fadeOut();
                setTimeout(function(){
                    $(kahao).remove();
                },1000);
            },2000);
        })
    }

    //只有确定按钮的弹窗
    //alertTrue('.notice');
    function alertTrue(btn,trued){
        $(btn).on('click',function(){
            var chongzhi=$('<div class="bing-info show"> <div class="bing-tishi">充值失败</div> <p class="tishi-p"> 请检查当前网络是否正常</p> <div class="bind-btn"> <span class="true">确定</span> </div> </div>');
            $(chongzhi).insertAfter($('form'));
            $('.bing-info').on('click',function(){
                $(chongzhi).remove();
                trued();
            })
        })
    }

    toastWithMast('.notice');
    //有遮罩的弹窗
    function toastWithMast(btn,val){
        $(btn).on('click',function(){
            var kahao=$('<div class="mask" style="display: block"></div><div class="succeed-info show"> <div class="col-xs-12"><img src="images/succeed.png" alt="对钩"> </div> <div class="col-xs-12">充值成功</div> </div>');
            $(kahao).insertAfter($('form'));
            setTimeout(function(){
                $(kahao).animate({opacity:0},1000,function(){
                    $(this).remove();
                });
            },2000);
        })
    }

    var swiper = new Swiper('.swiper-container', {
        direction: "vertical",
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 7,
        spaceBetween: 50,
        breakpoints: {
            1800: {
                slidesPerView: 3,
                spaceBetween: 50
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            320: {
                slidesPerView: 3,
                spaceBetween: 10
            }
        }
    });

    $('.close img').bind('click',function(){
        $('.mask').css({display:'none'});
        $('.banks').css({left:-10000});
        $('.banks1').css({left:-10000});
    });
    $('.mask').bind('click',function(){
        $('.mask').css({display:'none'});
        $('.banks').css({left:-10000});
        $('.banks1').css({left:-10000});
    });
    $('.swiper-slide').click(function(){
        var index=$('.swiper-slide').index(this);
        var imgs=$('.swiper-slide img').eq(index).attr('src');
        var banks=$('.swiper-slide span').eq(index).html();
        $('.kaihu').css({display:'none'});
        $('.kaihu1').css({display:'block'});
        $('.xian img')[0].src=imgs;
        $('.xian span')[0].innerHTML=banks;

        $('.mask').css({display:'none'});
        $('.banks').css({left:-10000});
        $('.banks1').css({left:-10000});
    })

});