$(function(){
    //点我运动轨迹
    var t;
    function move(left){
        var dian=$('.dian')[0];
        var r=10;
        var ang=0;
        var ang1=0;
        t=setInterval(function(){
            ang+=4;
            ang1+=8;
            var x=Math.cos(ang*Math.PI/180)*r;
            var y=Math.sin(ang1*Math.PI/90)*r;
            dian.style.top=-85+y+"px";
            dian.style.marginLeft=x+"px";
        },5)
    }
    move();

    $('.tab div').on('click',function(){
        var index=$('.tab div').index(this);
        $('.tab div').removeClass('tab-wnj');
        $('.tab div').eq(index).addClass('tab-wnj');
        if(index==0){
            var html='老用户新增理财';
            $('.tab1')[0].innerHTML='';
            $('.tab1').append(html);
            $('.tab1').removeClass('content-hover');
            $('.tab2')[0].innerHTML='邀请好友理财再1%';
            $('.tab .dian').css({left:'760px'});
            $('.tab .jiao').css({left:'296px'});
            $('.tab .xi').css({left:'369px'});
            $('.content1').css({display:'block'});
            $('.content2').css({display:'none'});
            $('.yaoqing').css({display:'none'});
            $('.new').css({display:'block'});
            $('.check').css({height:'580px'});
        }else if(index==1){
            $('.tab1')[0].innerHTML='老用户新增理财加息1%';
            var html='邀请好友理财加';
            $('.tab2')[0].innerHTML='';
            $('.tab2').append(html);
            $('.tab2').removeClass('content-hover');
            $('.tab .dian').css({left:'180px'});
            $('.tab .jiao').css({left:'672px'});
            $('.tab .xi').css({left:'748px'});
            $('.content1').css({display:'none'});
            $('.content2').css({display:'block'});
            $('.yaoqing').css({display:'block'});
            $('.new').css({display:'none'});
            $('.check').css({height:'430px'});
        }
    });

    $('.tab div').hover(function(){
        if(!($(this).hasClass('tab-wnj'))){
            $(this).addClass('content-hover');
        }
    },function(){
        if(!($(this).hasClass('tab-wnj'))){
            $(this).removeClass('content-hover');
        }
    });

    $('.liji').hover(function(){
        $('.liji').css({background:'#ca2622'});
    },function(){
        $('.liji').css({background:'#e53935'});
    })



})