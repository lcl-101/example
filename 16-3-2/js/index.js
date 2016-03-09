$(function(){
    //用户
    var isChange = false;
    var changeNum = function (data) {
        if (data != "" && typeof (data) == "string" && data != 0) {
            var arr = data.replace(".", "").replace(",", "").replace(",", "").split("");
            var i = 0;
            var j = 0;
            var index = arr.length - 1;
            var timeout = 0;
            var scroll = function () {
                ////延时器timeout
                timeout = setTimeout(function () {
                    if (j < arr.length - 1) {
                        $(".num" + i).html(j);
                        j++;
                        scroll();///?
                    }
                    else {
                        j = 0;
                        var k = 0;
                        ////定时器interval
                        var interval = setInterval(function () {
                            if (k != arr[index]) {
                                $(".num" + i).html(k);
                                k++;
                            }
                            else {
                                $(".num" + i).html(k);
                                clearInterval(interval);
                                i++;
                                index--;
                                scroll();
                            }
                        }, 15)
                    }
                    ;
                    if (i > arr.length - 1) {
                        clearTimeout(timeout);
                    }
                }, 15);
            }

            scroll();
        }
    }

    if (!isChange)
    {
        $.ajax({
            type: "get",
            url: "/apireg/paidairegcount",
            dataType: "json",
            success: function (data) {
                var count=String(data.count);
                changeNum(count);
                isChange = true;
            }

        });
    }


    var isOnEvent = false;
    var islogin = $("#islogin").val();
    var is_new_user=$('#is_new_user').val();


    //底部轮播
    $('.investment-lunbos img').eq(2).css({left:'-300px',width:'300px',top:'40px',zIndex:1});
    $('.investment-lunbos img').eq(1).css({left:'413px',width:'300px',top:'40px',zIndex:2});
    $('.investment-lunbos img').eq(0).css({zIndex:3});
    var img=$(".investment-lunbos img");
    var index=0;
    var next=1;
    var after=2;
    var a;


    var flag=true;
    function move(){
        if(!flag){
            return;
        }
        flag=false;
        $('.investment-lunbos img').eq(index).animate({left:'-300px',width:'300px',top:'40px',zIndex:1},300,function(){
            flag=true;
        });
        $('.investment-lunbos img').eq(after).animate({left:'413px',width:'300px',top:'40px',zIndex:2},300);
        $('.investment-lunbo img').eq(next).animate({left:'0px',width:'414px',top:'0px',zIndex:3},300);
        a=index;
        index=next;
        next=after;
        after=a;
    }
    function move1(){
        if(!flag){
            return;
        }
        flag=false;
        $('.investment-lunbos img').eq(next).animate({left:'-300px',width:'300px',top:'40px',zIndex:2},300,function(){
            flag=true;
        });
        $('.investment-lunbos img').eq(index).animate({left:'413px',width:'300px',top:'40px',zIndex:1},300);
        $('.investment-lunbo img').eq(after).animate({left:'0px',width:'414px',top:'0px',zIndex:3},300);
        a=index;
        index=after;
        after=next;
        next=a;
    }
    $('.left').on('click',function(){
        move()
    })
    $('.right').on('click',function(){
        move1()
    })
    var s=setTimeout(function(){
        $('#banner-data').hide();
        $('<div></div>').addClass('investment-datas').html('领取派代专属特权').appendTo($('.banner-data'));
        clearTimeout(s);
        resign();
    },5000);
    //注册
    function resign(){
        $('.investment-datas').on('click',function(){
            if(!islogin){
                $('.mask').show();
                $('.resign-box').show();
                $('#resign-box').show();
                $('.resign-btn').on('click',function(){
                    checkShowVerify();
                })
            }else  if(islogin==1){
                if(is_new_user==1){
                    alert('该活动仅限新用户参与');
                }else {
                    window.location.href = "/experiencedeal";
                }
            }
        });
    }
    resign();

    function checkShowVerify(){
        var isOkma=checkverify();
        var isOk = checkphone();
        var xinok=checkphonecode();
        if (isOk && isOkma && xinok) {
            $('#resign-box').hide();
            $('#resign-next').show();
        }
    }

    //检查手机号是否存在
    $("#phone-box").on('blur', function () {
        checkphone();
        getphonecode();
    });
    //输入验证码
    $("#ma-box").on('click', function () {
        checkphone();
    });
    //验证图形验证码
    $("#ma-box").on('blur',function(){
        checkverify();
    });
    //输入短信验证码
    $('#yanma-box').on('click',function(){
        checkverify();
        checkphone();
    });
    //验证短信验证码
    $("input[name='phonecode']").on('blur', function () {
        checkphonecode();
    });

    //发送短信
    $(".yanma-img").on('click', function () {
        var isOkma=checkverify();
        var isOk = checkphone();
        if (isOk==true && isOkma==true) {
            sendphonecode();
        }
    });
    //刷新验证码
    $('.ma-img').on('click', function () {
        $(".ma-img")[0].src="/apireg/verifyimg?" + Math.random();
    })

    //验证短信验证码
    function checkphonecode() {
        var phoneOk=false;
        var phone_value = $.trim($("#phone-box").val());
        var phonecode_value = $.trim($("#yanma-box").val());
        if (phone_value == undefined || phone_value == "") {
            $(".tishi").text("*手机号不能为空");
            return phoneOk;
        }
        if (phonecode_value == undefined || phonecode_value == "") {
            $(".tishi").text("*验证码不能为空");
            return phoneOk;
        }
        $.ajax({
            type: "post",
            url: "/apireg/phonecode",
            data: {
                phone: phone_value,
                phoneCode: phonecode_value,
            },
            async: false,
            dataType: "json",
            success: function (response) {
                if (response.code == 1) {
                    $('.tishi').text('*' + response.msg);
                    phoneOk=false;
                } else  if (response.code == 0){
                    isOnEvent = true;
                    $('.tishi').text('');
                    phoneOk=true;
                }
            }
        })
        return phoneOk;
    }
    //是否显示验证码
    function getphonecode() {
        $.ajax({
            type: "post",
            url: "/apireg/showverifyimg",
            dataType: "json",
            success: function (response) {
                if (response.code == 1) {
                    $('.ma-box').show();
                } else {
                    $('.ma-box').hide();
                    sendphonecode();
                }
            }
        })

    }

    //验证图形验证码
    function checkverify() {
        var maOk=false;
        var checkverifycode = $.trim($("#ma-box").val());
        if (checkverifycode == undefined || checkverifycode == "") {
            $('.tishi').text('*请输入正确的验证码');
            return maOk;
        }
        $.ajax({
            type: "post",
            url: "/apireg/verifycode",
            data: {
                verify: checkverifycode
            },
            async: false,
            dataType: "json",
            success: function (response) {
                if (response.code == 1) {
                    $('.tishi').html('*' + response.msg);
                    maOk=false;
                } else if (response.code == 0){
                    $('.tishi').html('');
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
        var phone_value = $.trim($("#phone-box").val());
        var checkverifycode = $.trim($("#ma-box").val());
        if (!phone_value) {
            $('.tishi').text('*手机号不能为空');
            return xinOk;
        }

        if (!phonereg.test(phone_value)) {
            $('.tishi').text('*手机号格式错误');
            return xinOk;
        }
        $.ajax({
            type: "post",
            url: "/apireg/verifyphone",
            async: false,
            data: {
                phone: phone_value,
                verify: checkverifycode
            },
            dataType: "json",
            success: function (response) {
                if (response.code == 1) {
                    $('.tishi').html('*' + response.msg);
                    xinOk=false;
                } else if (response.code == 0) {
                    $('.tishi').html('');
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
            $('.yanma-img').val(time).attr("disabled", true);;
            time--;
            if (time < 0) {
                $(".yanma-img").val('发送验证码').removeAttr('disabled');
                clearInterval(t);
                time = 60;
            }
        },1000)
    }

    //验证手机号
    function checkphone() {
        var isok = false;
        var phone_value = $.trim($("#phone-box").val());
        var phonereg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}|18[0-9]{9}$/g;
        if (phone_value == '') {
            $('.tishi').html('*手机号不能为空');
            return isok;
        }

        if (!phonereg.test(phone_value)) {
            $('.tishi').html('*手机号格式错误');
            return isok;
        }

        $.ajax({
            type: "post",
            url: "/apireg/phoneexists",
            async: false,
            data: {
                phone: phone_value,
            },
            dataType: "json",
            success: function (response) {
                if (response.code == 2 || response.code == 1) {
                    $('.tishi').html('*' + response.msg);
                } else if (response.code == 0 ) {
                    $('.tishi').html('');
                    isok = true;
                }
            }
        })
        return isok;
    }


    $("#username").on('blur', function () {
        checkusername();
    });
    $("#password").on('blur', function () {
        checkpassword();
    });

    //完成
    $('.resign-next-btn').on('click',function(){
        registersubmit();
    });
    //验证密码
    function checkpassword() {
        var passOk=false;
        var password_value = $.trim($("#password").val());
        var enoughRegex = new RegExp("(?=.{6,}).*", "g");
        if (false === enoughRegex.test(password_value)) {
            var msg = '密码必须最少6位字母、数字和符号';
            $('.tishis').text('*' + msg);
            passOk=false;
            return passOk;
        } else {
            $('.tishis').text('');
            passOk=true;
            return passOk;
        }

    }
    //验证用户名是否存在
    function checkusername() {
        var nameOk=false;
        var username_value = $.trim($("#username").val());
        var reg = /^[0-9a-z]+[0-9a-z_]*[0-9a-z]+$/i;
        if (username_value == "") {
            $('.tishis').html('用户名不可以为空');
            return nameOk;
        } else if (!reg.test(username_value) || username_value.length < 6) {
            var msg = '*用户名必须要6-16位字母、数字和下划线';
            $('.tishis').html(msg);
            return nameOk;
        } else {
            $.ajax({
                type: "post",
                url: " /apireg/nameexists",
                data: {
                    name: username_value,
                },
                async: false,
                dataType: "json",
                success: function (response) {
                    if (response.code == 1 || response.code == 2) {
                        $('.tishis').text('*' + response.msg);
                        nameOk=false;
                    } else if (response.code == 0){
                        $('.tishis').text('');
                        nameOk=true;
                    }
                }
            })
            return nameOk;
        }
    }

    //注册
    function registersubmit() {
        if (isOnEvent == false) {
            return false;
        }
        var namOk=checkusername();
        var passOk=checkpassword();
        if(!namOk && !passOk){
            return;
        }
        var isagree = $("input[name='isagree']").val();
        if (isagree == 'no') {
            $('.tishis').text('*您未同意协议');
            return false;
        }
        var phone_value = $.trim($("#phone-box").val());
        var phonecode_value = $.trim($("#yanma-box").val());
        var username_value = $.trim($("#username").val());
        var password_value = $.trim($("#password").val());
        $.ajax({
            type: "post",
            url: "/apireg/userreg",
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
        window.location.href = "/experiencedeal";
    }

    $('.resign-close').on('click',function(){
        $('.resign-box').hide();
        $('.mask').hide();
    })


    var isChange = false;
    var changeNum = function (data,name) {
        if (data != "" && typeof (data) == "string" && data != 0) {
            var arr = data.replace(".", "").replace(",", "").replace(",", "").split("");
            var i = 0;
            var j = 0;
            var index = arr.length - 1;
            var timeout = 0;
            var scroll = function () {
                ////延时器timeout
                timeout = setTimeout(function () {
                    if (j < arr.length - 1) {
                        $("."+name+ i).html(j);
                        j++;
                        scroll();///?
                    }
                    else {
                        j = 0;
                        var k = 0;
                        ////定时器interval
                        var interval = setInterval(function () {
                            if (k != arr[index]) {
                                $("."+name+ i).html(k);
                                k++;
                            }
                            else {
                                $("."+name+ i).html(k);
                                clearInterval(interval);
                                i++;
                                index--;
                                scroll();
                            }
                        }, 15)
                    }
                    ;
                    if (i > arr.length - 1) {
                        clearTimeout(timeout);
                    }
                }, 15);
            }

            scroll();
        }
    }

    var ischang=false;
    if (!ischang)
    {
        var tops1;
        tops1 = $('.data-box').offset().top;
        $(window).resize(function() {
            tops1 = $('.data-box').offset().top;
        });
        var ch1=$(window).height();
        $(window).bind('scroll',function () {
            if($(window).scrollTop()>tops1-ch1){
                changeNum('89073279500','a');
                changeNum('1480673207','b');
                shuju('1320','shuju1');
                shuju('995','shuju2');
                $(window).unbind('scroll');
                //数据
                var tops;
                tops = $('.profit-img').offset().top;
                $(window).resize(function() {
                    tops = $('.profit-img').offset().top;
                });
                var ch=$(window).height();
                $(window).bind('scroll',function () {
                    if($(window).scrollTop()>tops-ch/2&&$(window).scrollTop()<tops+ch/2){
                        $('.profit-img').animate({width:'665px'},800,function(){
                            $(window).unbind('scroll');
                        });
                    }
                });
                ischang = true;
            }
        });

    }

    function shuju(data,name){
        if(data != "" && typeof (data) == "string" && data != 0){
            var nums=0;
            var t=setInterval(function(){
                if(data%2==0){
                    nums+=4;
                }else {
                    nums+=5;
                }
                if(nums>data){
                    clearInterval(t);
                    return;
                }
                $("."+name).html(nums+'个');
            },1)
        }
    }
})