$(function(){
    var num1=0;
    var progressbar1=$('.experienceGrants-jindu1').attr('progressbar');
    scrollbar1(progressbar1)
    function scrollbar1(bar1){
        if(bar1!=undefined&&bar1!=0&&bar1!=''){
            var t2=setInterval(function(){
                num1++;
                if(num1>bar1){
                    clearInterval(t2);
                    return;
                }
                $('#experienceGrants span').html(num1+'%');
                $('.experienceGrants-jindu1').css('width',num1+'%');
            },10)
        }
    }

    $.ajax({
        type: "get",
        //dataType: "json",
        //url:'/experiencedeal/experiencedeal/experience-deal-order',
        success:function(data){
            data={
                "code": 0,
                "status": "success",
                "message": "成功",
                "data": {
                    "result": "success",
                    "msg": "成功",
                    "code": 0,
                    "content": null
                }
            };
            if(data.code==0){
                if(data.data.code==0){
                    $('.experienceGrants-btn a').addClass('orange');
                    $('.experienceGrants-btn a').html('立即投资');
                    $('.experienceGrants-btn a').on('click',function(){
                        location.href='/experiencedeal/experiencedeal/order-success';
                    })
                }else if(data.data.code==1){
                    $('.experienceGrants-btn a').addClass('hui');
                    $('.experienceGrants-btn a').html('立即投资');
                }else if(data.data.code==2){
                    $('.experienceGrants-btn a').addClass('orange');
                    $('.experienceGrants-btn a').html('投资正式项目');
                    $('.experienceGrants-btn').on('click',function(){
                        location.href='/site/getlists';
                    })
                }else if(data.data.code==3){
                    $('.experienceGrants-btn a').addClass('hui');
                    $('.experienceGrants-btn a').html('立即投资');
                }else if(data.data.code==4){
                    $('.experienceGrants-btn a').addClass('hui');
                    $('.experienceGrants-btn a').html('立即投资');
                }
            }
        }
    })
})