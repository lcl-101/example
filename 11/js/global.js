//文本框默认提示文字
function textFocus(el) {
    if (el.defaultValue == el.value) { el.value = ''; el.style.color = '#727272'; }
}
function textBlur(el) {
    if (el.value == '') { el.value = el.defaultValue; el.style.color = '#A9A9A9'; }
}
//注册页面的提示文字
$(function(){
    $('.btn_submit').click(function(){
        if( $(".phone").val()==""|| $(".phone").val()=="请输入您的手机号")
        {
            $(".phone").addClass("errorC");
            $(".error1").html("请输入您的手机号");
            $(".error1").css("display","block");
        }
        if( $(".psd_num").val()==""|| $(".psd_num").val()=="请输入您的密码")
        {
            $(".psd_num").addClass("errorC");
            $(".error4").html("请输入您的密码");
            $(".error4").css("display","block");
        }
        if( $(".kapkey").val()=="" || $(".kapkey").val()=="请输入验证码")
        {
            $(".kapkey").addClass("errorD");
            $(".error2").html("请填写验证码");
            $(".error2").css("display","block");
        }
        //if( $(".phonekey").val()=="" ||$(".phonekey").val()=="动态密码")
        //{
        //    $(".phonekey").addClass("errorC");
        //    $(".error3").html("动态密码不能为空");
        //    $(".error3").css("display","block");
        //}
    })
    //姓名栏失去焦点
    //$(".user").blur(function(){
    //    reg=/^1[3|4|5|8][0-9]\d{4,8}$/i;//验证手机正则(输入前7位至11位)
    //
    //    if( $(".user").val()==""|| $(".user").val()=="请填写真实姓名")
    //    {
    //        $(".user").addClass("errorC");
    //        $(".error0").html("请输入您的姓名");
    //        $(".error0").css("display","block");
    //    }
    //    else
    //    {
    //        $(".user").addClass("checkedN");
    //        $(".user").removeClass("errorC");
    //        $(".error0").css("display","none");
    //    }
    //});
   //手机号栏失去焦点
    $(".phone").blur(function(){
        reg=/^1[3|4|5|8][0-9]\d{4,8}$/i;//验证手机正则(输入前7位至11位)

        if( $(".phone").val()==""|| $(".phone").val()=="请输入您的手机号")
        { 
            $(".phone").addClass("errorC");
            $(".error1").html("请输入您的手机号");
            $(".error1").css("display","block");
        }
        else if($(".phone").val().length<11)
        {   
            $(".phone").addClass("errorC");
            $(".error1").html("手机号长度有误！");
            $(".error1").css("display","block");
        }
        else if(!reg.test($(".phone").val()))
        {   
            $(".phone").addClass("errorC");
            $(".error1").html("你确定这是你的手机号!!");
            $(".error1").css("display","block");
        }
        else
        {
            $(".phone").addClass("checkedN");
            $(".phone").removeClass("errorC");
            $(".error1").css("display","none");
        }
    });
    //密码栏失去焦点
    $(".psd_num").blur(function(){
        reg=/^1[3|4|5|8][0-9]\d{4,8}$/i;//验证手机正则(输入前7位至11位)

        if( $(".psd_num").val()==""|| $(".psd_num").val()=="请输入您的密码")
        {
            $(".psd_num").addClass("errorC");
            $(".error4").html("请输入您的密码");
            $(".error4").css("display","block");
        }
        else if($(".psd_num").val().length<6)
        {
            $(".psd_num").addClass("errorC");
            $(".error4").html("密码长度有误！");
            $(".error4").css("display","block");
        }
        else if(!reg.test($(".psd_num").val()))
        {
            $(".psd_num").addClass("errorC");
            $(".error4").html("密码错误，请重新输入!!");
            $(".error4").css("display","block");
        }
        else
        {
            $(".psd_num").addClass("checkedN");
            $(".psd_num").removeClass("errorC");
            $(".error4").css("display","none");
        }
    });

    //验证码栏失去焦点
    $(".kapkey").blur(function(){
        reg=/^.*[\u4e00-\u9fa5]+.*$/;
        if( $(".kapkey").val()=="" || $(".kapkey").val()=="请输入验证码")
        {
            $(".kapkey").addClass("errorC");
            $(".error2").html("请填写验证码");
            $(".error2").css("display","block");
        }
        else if($(".kapkey").val().length<6)
        {   
            $(".kapkey").addClass("errorC");
            $(".error2").html("验证码长度有误！");
            $(".error2").css("display","block");
        }
        else if(!reg.test($(".kapkey").val()))
        {
            $(".kapkey").addClass("errorC");
            $(".error2").html("验证码里无中文！");
            $(".error2").css("display","block");
        }
        else 
        {
            $(".kapkey").removeClass("errorC");
            $(".error2").css("display","none");
            $(".kapkey").addClass("checkedN");
      }
    });


   //动态密码栏失去焦点
   // $(".phonekey").blur(function(){
   //     reg=/^.*[\u4e00-\u9fa5]+.*$/;
   //     if( $(".phonekey").val()=="" ||$(".phonekey").val()=="动态密码")
   //     {
   //         $(".phonekey").addClass("errorC");
   //         $(".error3").html("动态密码不能为空");
   //         $(".error3").css("display","block");
   //     }
   //     else if($(".phonekey").val().length<6)
   //     {
   //         $(".phonekey").addClass("errorC");
   //         $(".error3").html("动态密码长度有误！");
   //         $(".error3").css("display","block");
   //     }
   //     else if(!reg.test($(".phonekey").val()))
   //     {
   //         $(".phonekey").addClass("errorC");
   //         $(".error3").html("动态密码无中文！");
   //         $(".error3").css("display","block");
   //     }
   //     else
   //     {
   //         $(".phonekey").removeClass("errorC");
   //         $(".error3").css("display","none");
   //         $(".phonekey").addClass("checkedN");
   //     }
   // });



})