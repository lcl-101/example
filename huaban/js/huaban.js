$(function(){
    var mycanvasH=$('.mycanvas').height();
    var mycanvasW=$('.mycanvas').width();
    var muneH=$('.menu').height();
    $('.lists').css({height:mycanvasH-muneH,width:'3%',float:'left'});
    var listW=$('.lists').width();
    $('.canvas').css({
        height:mycanvasH-muneH,
        width:'97%'
    });
    var cw=$('.canvas').width();
    $('canvas').attr({
        height:mycanvasH-muneH,
        width:cw
    });
    /*���ò˵�*/
    $('.option').hover(function(){
        $(this).find('.son').css('display','block')
    },function(){
        $(this).find('.son').css('display','none')
    });
    /*����*/
    $(".lists div").eq(0).css({border:'2px dashed red'});
    $(".lists div").click(function(){
        $(".lists div").css({border:'2px dashed rgb(0,175,233)'});
        $(this).css({border:'2px dashed red'});
        drawObj.style.strokeColor="#000";
    });
    var canvas=document.getElementsByTagName("canvas")[0];
    var cobj=canvas.getContext('2d');
    /*��ͼ*/
    var drawObj=new draw(canvas,cobj);
    drawObj.drawfun();
    $('.type li').click(function(){
        $(".lists div").css({border:'2px dashed rgb(0,175,233)'});
        drawObj.type=$(this).attr('data-role');
    });
    $(".lists div").not($('.lines-w')).click(function(){
        drawObj.type=$(this).attr('data-role');
    });

    /*���*/
    $('.drawStyle li').click(function(){
        drawObj.drawStyle=$(this).attr('data-role');
    });
    /*��ɫ*/
    $('#stroke').change(function(){
        drawObj.style.strokeColor=$(this).val();
    });
    $('.color-piece div').click(function(){
        drawObj.style.strokeColor=$(this).attr('data-color');
        drawObj.style.fillColor=$(this).attr('data-color');
    })
    $('#fill').change(function(){
        drawObj.style.fillColor=$(this).val();
    });
    /*������ϸ*/
    $('.lineWidth li').click(function(){
        drawObj.style.lineWidth=$(this).attr('line-width');
    });
    /*����������ϸ*/
    $('.lines-w').click(function(){
        $('.line-weight li').slideToggle();
    });
    $('.line-weight li').click(function(){
        var index=$('.line-weight li').index(this);
        drawObj.style.lineWidth=$('.line-weight li').eq(index).attr('line-width');
    });
    /*����*/
    $('#cancel').click(function(){
        drawObj.pop();
    });
    /*�����ļ�*/
    $('#save').click(function(){
        var yes=window.confirm('Do You Want Save this?');
        if(yes==true){
            var data=canvas.toDataURL();
            location.href=data.replace('image/png','image/octent-stream');
        }else{
            drawObj.dataArr=drawObj.dataArr.slice(0);
            cobj.clearRect(0,0,canvas.width,canvas.height);
        }
    });
    /*��Ƥ*/
    $("#rubber").click(function(){
        drawObj.type=$(this).attr('data-role');
        drawObj.style.strokeColor="white";
    });
    /*����*/
    $('#clear').click(function(){
        drawObj.dataArr=drawObj.dataArr.slice(0);
        cobj.clearRect(0,0,canvas.width,canvas.height);
    });
    /*�½��ļ��ͱ����ļ�*/
    $('.file li').click(function(){
        var index=$('.file li').index(this);
        if(index==0){
            var yes=window.confirm('Do You Want Save this?');
            if(yes==true){
                var data=canvas.toDataURL();
                location.href=data.replace('image/png','image/octent-stream');
            }else{
                drawObj.dataArr=drawObj.dataArr.slice(0);
                cobj.clearRect(0,0,canvas.width,canvas.height);
            }
        }else if(index==1){
            var data=canvas.toDataURL();
            location.href=data.replace('image/png','image/octent-stream');
        }
    })
})