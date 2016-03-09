$(function(){
    $('.ma').on('click',function(){
        var phone;
        var verifycode;
        phone = $("#phone").val();
        verifycode = $("verifycode").val();
        $.ajax({
            //type: "post",
            //dataType: "json",
            //url:'/active/wcgoneyear/get-verify-code?phone='+phone+'',
            success:function(data){
                data= {
                    "code": 0,
                    "status": "success",
                    "message": "成功",
                    "data": {
                        "result": "success",
                        "msg": "成功",
                        "code": 0,
                        "content": {
                            "code": 0,
                            "message": "发送成功"
                        }
                    }
                };
                if(data.code==0){
                    if(data.data.code==0){
                        var num=50;
                        $('.ma').css({display:'none'});
                        $('.daojishi').css({display:'block'});
                        $('.daojishi').html(num+'s');

                        var t=setInterval(function(){
                            num--;
                            $('.daojishi').html(num+'s');
                            if(num==0){
                                clearInterval(t);
                                $('.ma').css({display:'block'});
                                $('.daojishi').css({display:'none'});
                            }
                        },1000);
                    }
                }
            }
        })
    })
    $('.next').on('click',function(){
        var phone;
        var verifycode;
        phone = $("#phone").val();
        verifycode = $("verifycode").val();
        $.ajax({
            //type: "post",
            //dataType: "json",
            //url:'/active/wcgoneyear/do-check-user?phone='+phone+'&verifycode='+verifycode+'',
            success:function(data){
                data={
                    "code": 0,
                    "status": "success",
                    "message": "成功",
                    "data": {
                        "result": "success",
                        "msg": "成功",
                        "code": 0,
                        "content": {
                            "usertype": 2 // 用户类型     1=》未注册 2=》2014-2015 之间 注册未投资 3=》2014-2015=》注册并投资  4=》2016 注册或者投资
                        }
                    }
                };
                if(data.code==0){
                    if(data.data.code==0){
                        $('.next')[0].href='three.html';
                    }
                    else {
                        $('.tishi').show();
                    }
                }
            }
        })
    })
})