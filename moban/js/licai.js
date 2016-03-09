/**
 * Created by lcl on 2015/11/22.
 */
$(function(){
    var swiper = new Swiper('.swiper-container', {
        direction: "horizontal",
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerView: 5,
        spaceBetween: 50,
        breakpoints: {
            1024: {
                slidesPerView: 5,
                spaceBetween: 40
            },
            768: {
                slidesPerView: 5,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 5,
                spaceBetween: 20
            },
            320: {
                slidesPerView: 5,
                spaceBetween: 10
            }
        }
    });

    //nav
    $('.swiper-wrapper div').on('click',function(){
        var index=$('.swiper-wrapper div').index(this);
        $('.swiper-wrapper div').removeClass('dian');
        $('.swiper-wrapper div').eq(index).addClass('dian');
    })
});
