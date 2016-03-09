$(function(){
    var tops=0;
    var obj =  $(window)[0];
    obj.addEventListener('touchmove', function(event) {
        if($(window).scrollTop()>tops){
            $('#footer-box').show();
            $('#footer-boxs').show();
        }else {
            $('#footer-box').hide();
            $('#footer-boxs').hide();
        }
    }, false);
})