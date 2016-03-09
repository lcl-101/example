/**
 * Created by lcl on 2015/11/22.
 */
$(function(){
    var swiper = new Swiper('.swiper-container', {
        direction: "vertical",
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 7,
        spaceBetween: 50,
        breakpoints: {
            1800: {
                slidesPerView: 4,
                spaceBetween: 50
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 40
            },
            768: {
                slidesPerView: 6,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 6,
                spaceBetween: 20
            },
            320: {
                slidesPerView: 6,
                spaceBetween: 10
            }
        }
    });
    //选择省份
    $('.selecter').bind('click',function(){
        $('.mask').css({display:'block'});
        $('.banks').css({left:'0'});
        $('.banks1').css({left:'0'});
    });
    $('.close img').bind('click',function(){
        $('.mask').css({display:'none'});
        $('.banks').css({left:'-10000px'});
        $('.banks1').css({left:'-10000px'});
    });
    $('.mask').bind('click',function(){
        $('.mask').css({display:'none'});
        $('.banks').css({left:'-10000px'});
        $('.banks1').css({left:'-10000px'});
    });
    $('.sheng').click(function(){
        var index=$('.swiper-slide').index(this);
        var banks=$('.swiper-slide span').eq(index).html();
        $('.kaihu').css({display:'none'});
        $('.kaihu1').css({display:'block'});
        $('.xian span')[0].innerHTML=banks;

        $('.mask').css({display:'none'});
        $('.banks').css({left:'-10000px'});
        $('.banks1').css({left:'-10000px'});
    });
    //选择城市
    $('.selecter-city').bind('click',function(){
        $('.mask').css({display:'block'});
        $('.citys').css({left:0});
        $('.citys1').css({left:0});
    });
    $('.close img').bind('click',function(){
        $('.mask').css({display:'none'});
        $('.citys').css({left:'-10000px'});
        $('.citys1').css({left:'-10000px'});
    });
    $('.mask').bind('click',function(){
        $('.mask').css({display:'none'});
        $('.citys').css({left:'-10000px'});
        $('.citys1').css({left:'-10000px'});
    });
    $('.shi span').click(function(){
        var index=$('.swiper-slide').index(this);
        var banks=$('.shi span').eq(index).html();
        $('.kaihu').css({display:'none'});
        $('.kaihu1').css({display:'block'});
        $('.selecter-city')[0].innerHTML=banks;

        $('.mask').css({display:'none'});
        $('.citys').css({left:'-10000px'});
        $('.citys1').css({left:'-10000px'});
    });
});