$(function(){
    var flag=false;
    $('#isagree').on('click',function(){
        if(!flag){
            $('#isagree')[0].src='/static/default/luodiye/images/luodiye/false.png';
            $('.isagree').val('no');
            flag=true;
        }else if(flag){
            $('#isagree')[0].src='/static/default/luodiye/images/luodiye/true.png';
            $('.isagree').val('yes');
            flag=false;
        }

    });
    //*************注册第一步*****************************************
    //检查手机号是否存在
    $("#phone").on('blur', function () {
        var isOk = checkphone();//验证手机号
        if(isOk) {
            getphonecode();//是否显示验证码
        }
    });
    //刷新验证码
    $('.verification-code').on('click', function () {
        $(".verification-code img")[0].src="/api/common/captcha?" + Math.random();
    });
    //发送短信(验证手机号+验证图形验证码)
    $(".codes").on('click', function () {
        var isOk = checkphone();//验证手机号
        var isOks= true;
        if(isOk) {
            isOks= getphonecode();//是否显示验证码
        }

        //显示图形验证码
        if (isOks==false){
            var isOkma=checkverify();
            if(isOk==true && isOkma==true){
                sendphonecode();
            }else{
                $('#ma-box').val('');
                $('.ma-img').trigger('click');
            }
        }else if (isOk==true && isOks==true) {
            sendphonecode();
        }

    });

    //注册第一步按钮(验证手机号+验证图形验证码+验证短信验证码)
    $('.resign-btn').on('click',function(){
        checkShowVerify();
    });
    //注册第一步验证所有信息
    function checkShowVerify(){
        //验证协议是否同意
        var isagree=idAgree();
        if(isagree==false){
            $('.error-agreement').html('您未同意协议');
        }

        //验证手机号
        var isOk = checkphone();
        //if(isOk==false){
        //    return;
        //}

        //验证是否需要图形验证码
        //var checkverifycode = $.trim($("#verification").val());
        var isOks= getphonecode();
        //是否需要显示图形验证码
        //需要验证码
        if(isOks==false){
            var isOkma=checkverify();
        }

        //验证短信验证码
        var codeOk=checkphonecode();

        if(isOk&&isOkma&&codeOk&&isagree){
            $('#resign-bag').hide();
            $('.resign').show();
            $('.resign-btn').hide();
            $('.resign-btns').show();
        }
    }

    //验证手机号
    function checkphone() {
        var isok = false;
        var phone_value = $.trim($("#phone").val());
        var phonereg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}|18[0-9]{9}$/g;
        if (phone_value == '') {
            $('.error-phone').html('*手机号不能为空');
            return isok;
        }

        if (!phonereg.test(phone_value)) {
            $('.error-phone').html('*手机号格式错误');
            return isok;
        }

        $.ajax({
            type: "post",
            url: "/api/common/phone-exists",
            async: false,
            data: {
                phone: phone_value,
            },
            dataType: "json",
            success: function (response) {
                if (response.code == 2 || response.code == 1) {
                    $('.error-phone').html('*' + response.msg);
                } else if (response.code == 0 ) {
                    $('.error-phone').html('');
                    isok = true;
                }
            }
        })
        return isok;
    }
    //是否显示验证码
    function getphonecode() {
        var maOks=false;
        $.ajax({
            type: "post",
            url: "/api/register/show-verify-code",
            async: false,
            dataType: "json",
            success: function (response) {
                if (response.code == 1) {
                    $('.error-verification').show();
                    $('.verification-box').show();
                    maOks=false;
                } else {
                    $('.error-verification').hide();
                    $('.verification-box').hide();
                    //sendphonecode();
                    maOks=true;
                }
            }
        })
        return maOks;
    }
    //验证图形验证码
    function checkverify() {
        var maOk=false;
        var checkverifycode = $.trim($("#verification").val());
        if (checkverifycode == undefined || checkverifycode == "") {
            $('.error-verification').text('*请输入正确的验证码');
            return maOk;
        }
        $.ajax({
            type: "post",
            url: "/api/common/verify-code",
            data: {
                verify: checkverifycode
            },
            async: false,
            dataType: "json",
            success: function (response) {
                if (response.code == 1) {
                    $('.error-verification').html('*' + response.msg);
                    maOk=false;
                } else if (response.code == 0){
                    $('.error-verification').html('');
                    maOk=true;
                }
            }

        })
        return maOk;
    }
    //发送短信验证码
    function sendphonecode() {
        var xinOk=false;
        var phonereg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}|18[0-9]{9}$/g;
        var phone_value = $.trim($("#phone").val());
        var checkverifycode = $.trim($("#verification").val());
        if (!phone_value) {
            $('.error-phone').text('*手机号不能为空');
            return xinOk;
        }

        if (!phonereg.test(phone_value)) {
            $('.error-phone').text('*手机号格式错误');
            return xinOk;
        }
        $.ajax({
            type: "post",
            url: "/api/register/verify-phone",
            async: false,
            data: {
                phone: phone_value,
                verify: checkverifycode
            },
            dataType: "json",
            success: function (response) {
                if (response.code == 1) {
                    $('.error-code').html('*' + response.msg);
                    xinOk=false;
                } else if (response.code == 0) {
                    $('.error-code').html('');
                    downTime();
                    xinOk=true;
                }
            }
        })
        return xinOk;
    }
    function downTime(){
        var time=60;
        var t=setInterval(function(){
            $('.codes').val(time).attr("disabled", true).css({background:'#D4D4D4'});
            time--;
            if (time < 0) {
                $(".codes").val('发送验证码').removeAttr('disabled').css({background:'#eaa427'});
                clearInterval(t);
                time = 60;
            }
        },1000)
    }
    //验证短信验证码
    function checkphonecode() {
        var phoneOk=false;
        var phone_value = $.trim($("#phone").val());
        var phonecode_value = $.trim($("#code").val());
        if (phone_value == undefined || phone_value == "") {
            $(".error-phone").text("*手机号不能为空");
            //return phoneOk;
        }
        if (phonecode_value == undefined || phonecode_value == "") {
            $(".error-code").text("*验证码不能为空");
            return phoneOk;
        }
        $.ajax({
            type: "post",
            url: "/api/common/phone-code",
            data: {
                phone: phone_value,
                phoneCode: phonecode_value,
            },
            async: false,
            dataType: "json",
            success: function (response) {
                if (response.code == 1) {
                    $('.error-code').text('*' + response.msg);
                    phoneOk=false;
                } else  if (response.code == 0){
                    $('.error-code').text('');
                    phoneOk=true;
                }
            }
        })
        return phoneOk;
    }
    //验证协议是否同意
    function idAgree(){
        var isagree=$('.isagree').val();
        if(isagree=='no'){
            return false;
        }else if(isagree=='yes'){
            $('.error-agreement').html('');
            return true;
        }
    }
    //***注册第二步*******************************************************

    $("#user").on('blur', function () {
        checkusername();
    });
    $("#password").on('blur', function () {
        checkpassword();
    });
    //完成注册
    $('.resign-btns').on('click',function(){
        registersubmit();
    });
    //验证用户名是否存在
    function checkusername() {
        var nameOk=false;
        var username_value = $.trim($("#user").val());
        var reg = /^[0-9a-z]+[0-9a-z_]*[0-9a-z]+$/i;
        if (username_value == "") {
            $('.error-user').html('用户名不可以为空');
            return nameOk;
        } else if (!reg.test(username_value) || username_value.length < 6) {
            var msg = '*用户名必须要6-16位字母、数字和下划线';
            $('.error-user').html(msg);
            return nameOk;
        } else {
            $.ajax({
                type: "post",
                url: "/api/common/name-exists",
                data: {
                    name: username_value,
                },
                async: false,
                dataType: "json",
                success: function (response) {
                    if (response.code == 1 || response.code == 2) {
                        $('.error-user').text('*' + response.msg);
                        nameOk=false;
                    } else if (response.code == 0){
                        $('.error-user').text('');
                        nameOk=true;
                    }
                }
            })
            return nameOk;
        }
    }
    //验证密码
    function checkpassword() {
        var passOk=false;
        var password_value = $.trim($("#password").val());
        var enoughRegex = new RegExp("(?=.{6,}).*", "g");
        if (false === enoughRegex.test(password_value)) {
            var msg = '密码必须最少6位字母、数字和符号';
            $('.error-password').text('*' + msg);
            passOk=false;
            return passOk;
        } else {
            $('.error-password').text('');
            passOk=true;
            return passOk;
        }
    }
    //注册
    function registersubmit() {
        //验证协议是否同意
        var isagree=idAgree();
        if(isagree==false){
            $('.error-agreement').html('您未同意协议');
        }
        var namOk=checkusername();
        var passOk=checkpassword();
        if(!namOk&&!passOk){
            return;
        }

        var phone_value = $.trim($("#phone").val());
        var phonecode_value = $.trim($("#code").val());
        var username_value = $.trim($("#user").val());
        var password_value = $.trim($("#password").val());
        $.ajax({
            type: "post",
            url: "/api/register/user-reg",
            data: {
                phone: phone_value,
                phoneCode: phonecode_value,
                userName: username_value,
                passWord: password_value
            },
            dataType: "json",
            success: function (response) {
                if (response.code == 1) {
                    alert(response.msg);
                    return false;
                } else {
                    registerjump();
                    $('.resign-next-btn').unbind().on('click', function () {});
                }
            }
        })
    }
    function registerjump() {
        window.location.href = "/luodiye/third";
    }
})